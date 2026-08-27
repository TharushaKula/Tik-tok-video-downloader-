"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import UrlInput from "@/components/UrlInput";
import VideoResult from "@/components/VideoResult";
import ResultSkeleton from "@/components/ResultSkeleton";
import ErrorCard from "@/components/ErrorCard";
import BatchResults, { type BatchItem } from "@/components/BatchResults";
import RecentDownloads, {
  type RecentEntry,
  loadRecent,
  saveRecent,
  clearRecent,
} from "@/components/RecentDownloads";

import {
  detectPlatform,
  extractSupportedUrls,
  extractYouTubePlaylistId,
  MAX_BATCH_SIZE,
} from "@/lib/validators";
import type { PlatformId, VideoInfo } from "@/lib/types";
import toast from "react-hot-toast";

type FetchState =
  | { kind: "idle" }
  | { kind: "loading"; platform: PlatformId | null }
  | { kind: "error"; message: string; url: string }
  | { kind: "success"; info: VideoInfo }
  | { kind: "batch" };

const BATCH_CONCURRENCY = 3;

async function fetchVideoInfo(target: string): Promise<VideoInfo> {
  const res = await fetch("/api/download", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: target }),
  });
  // The body may not be JSON if the server hits a hard failure.
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) {
    throw new Error(
      json?.error ||
        "The server hit an unexpected problem. Give it a second and try again."
    );
  }
  return json.data as VideoInfo;
}

// The complete interactive downloader: command bar, fetch states, batch
// queue, and recent history. Self-contained so the home page and every
// platform landing page share the exact same tool.
export default function DownloaderTool() {
  const [url, setUrl] = useState("");
  const [batchMode, setBatchMode] = useState(false);
  const [batchText, setBatchText] = useState("");
  const [batchItems, setBatchItems] = useState<BatchItem[]>([]);
  const [state, setState] = useState<FetchState>({ kind: "idle" });
  const [recent, setRecent] = useState<RecentEntry[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const batchRunning =
    state.kind === "batch" &&
    batchItems.some((i) => i.status === "queued" || i.status === "loading");
  const busy = state.kind === "loading" || batchRunning;

  // History lives in localStorage — read it after mount to keep SSR markup stable.
  useEffect(() => {
    setRecent(loadRecent());
  }, []);

  // PWA share target / deep link: links shared into the installed app land
  // here as ?url= / ?text= query params — pick them up and fetch right away.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shared = [params.get("url"), params.get("text"), params.get("title")]
      .filter(Boolean)
      .join("\n");
    if (!shared) return;

    window.history.replaceState(null, "", window.location.pathname);

    const { urls } = extractSupportedUrls(shared);
    if (urls.length >= 2) {
      setBatchMode(true);
      setBatchText(urls.join("\n"));
      void handleBatchSubmit(urls);
    } else if (urls.length === 1) {
      setUrl(urls[0]);
      void handleSubmit(urls[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      state.kind === "success" ||
      state.kind === "error" ||
      state.kind === "batch"
    ) {
      resultRef.current?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "nearest",
      });
    }
  }, [state.kind, reduce]);

  function rememberDownload(target: string, info: VideoInfo) {
    setRecent(
      saveRecent({
        url: target,
        title: info.title,
        platform: info.platform,
        ts: Date.now(),
      })
    );
  }

  async function handleSubmit(explicitUrl?: string) {
    const target = (explicitUrl ?? url).trim();
    if (!target || busy) return;

    // YouTube playlists expand into a batch of their videos
    const playlistId = extractYouTubePlaylistId(target);
    if (playlistId) {
      if (explicitUrl) setUrl(explicitUrl);
      try {
        const res = await fetch(`/api/youtube/playlist?list=${playlistId}`);
        const json = await res.json().catch(() => null);
        if (!res.ok || !json?.success) {
          throw new Error(json?.error || "Couldn't load that playlist");
        }
        const urls: string[] = json.urls;
        toast.success(
          json.total > urls.length
            ? `Playlist loaded — fetching the ${urls.length} most recent videos`
            : `Playlist loaded — fetching ${urls.length} ${urls.length === 1 ? "video" : "videos"}`
        );
        await handleBatchSubmit(urls);
      } catch (err: unknown) {
        setState({
          kind: "error",
          message:
            err instanceof Error ? err.message : "Couldn't load that playlist",
          url: target,
        });
      }
      return;
    }

    const platform = detectPlatform(target);
    if (!platform) {
      setState({
        kind: "error",
        message:
          "That link isn't from a supported platform. Paste a TikTok, Instagram, Facebook, YouTube, X, Reddit, or Pinterest link.",
        url: target,
      });
      return;
    }

    if (explicitUrl) setUrl(explicitUrl);
    setBatchMode(false);
    setState({ kind: "loading", platform });

    try {
      const info = await fetchVideoInfo(target);
      setState({ kind: "success", info });
      rememberDownload(target, info);
    } catch (err: unknown) {
      setState({
        kind: "error",
        message: err instanceof Error ? err.message : "Unexpected error",
        url: target,
      });
    }
  }

  function updateBatchItem(id: string, patch: Partial<BatchItem>) {
    setBatchItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item))
    );
  }

  async function fetchBatchItem(id: string, target: string) {
    updateBatchItem(id, { status: "loading", error: undefined });
    try {
      const info = await fetchVideoInfo(target);
      updateBatchItem(id, { status: "success", info });
      rememberDownload(target, info);
    } catch (err: unknown) {
      updateBatchItem(id, {
        status: "error",
        error: err instanceof Error ? err.message : "Unexpected error",
      });
    }
  }

  async function handleBatchSubmit(urls: string[]) {
    if (busy || urls.length === 0) return;

    // A batch of one is just a normal fetch
    if (urls.length === 1) {
      setBatchMode(false);
      setUrl(urls[0]);
      void handleSubmit(urls[0]);
      return;
    }

    const items: BatchItem[] = urls.slice(0, MAX_BATCH_SIZE).map((u, i) => ({
      id: `${Date.now()}-${i}`,
      url: u,
      platform: detectPlatform(u) as PlatformId,
      status: "queued",
    }));
    setBatchItems(items);
    setState({ kind: "batch" });

    // Small worker pool so slow resolvers don't serialize the whole batch
    const queue = [...items];
    const worker = async () => {
      for (;;) {
        const next = queue.shift();
        if (!next) return;
        await fetchBatchItem(next.id, next.url);
      }
    };
    await Promise.all(
      Array.from({ length: Math.min(BATCH_CONCURRENCY, items.length) }, worker)
    );
  }

  function handleRetryItem(id: string) {
    const item = batchItems.find((i) => i.id === id);
    if (!item || item.status === "loading") return;
    void fetchBatchItem(id, item.url);
  }

  function handleReset() {
    setState({ kind: "idle" });
    setUrl("");
    setBatchItems([]);
    setBatchMode(false);
    setBatchText("");
  }

  function handleClearRecent() {
    clearRecent();
    setRecent([]);
  }

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
        className="w-full"
      >
        <UrlInput
          value={url}
          onChange={setUrl}
          onSubmit={handleSubmit}
          loading={busy}
          batchMode={batchMode}
          onBatchModeChange={setBatchMode}
          batchText={batchText}
          onBatchTextChange={setBatchText}
          onBatchSubmit={handleBatchSubmit}
        />
      </motion.div>

      {/* Fetch state — skeleton, error, result, or batch queue */}
      <div ref={resultRef} className="w-full scroll-mt-24" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {state.kind === "loading" && (
            <motion.div
              key="skeleton"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ResultSkeleton platform={state.platform} />
            </motion.div>
          )}
          {state.kind === "error" && (
            <motion.div
              key="error"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ErrorCard
                message={state.message}
                onRetry={() => handleSubmit(state.url)}
                onDismiss={handleReset}
              />
            </motion.div>
          )}
          {state.kind === "success" && (
            <motion.div
              key="result"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <VideoResult info={state.info} onReset={handleReset} />
            </motion.div>
          )}
          {state.kind === "batch" && (
            <motion.div
              key="batch"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <BatchResults
                items={batchItems}
                running={batchRunning}
                onRetry={handleRetryItem}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Recent history */}
      {state.kind !== "loading" && (
        <RecentDownloads
          entries={recent}
          onSelect={(u) => handleSubmit(u)}
          onClear={handleClearRecent}
          disabled={busy}
        />
      )}

      {/* Trust row */}
      <p className="flex flex-wrap items-center justify-center gap-x-2 text-xs text-slate-600">
        <span>Free forever</span>
        <span aria-hidden>·</span>
        <span>No sign-up</span>
        <span aria-hidden>·</span>
        <span>Unlimited downloads</span>
        <span aria-hidden className="hidden sm:inline">
          ·
        </span>
        <span className="hidden items-center gap-1 sm:inline-flex">
          Press{" "}
          <kbd className="rounded border border-white/10 bg-white/[0.04] px-1 py-0.5 font-mono text-[10px] text-slate-500">
            /
          </kbd>{" "}
          to jump to the link box
        </span>
      </p>
    </div>
  );
}
