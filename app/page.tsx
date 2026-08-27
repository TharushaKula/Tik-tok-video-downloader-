"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import Navbar from "@/components/Navbar";
import Backdrop from "@/components/Backdrop";
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
import PlatformsSection from "@/components/PlatformsSection";
import HowItWorks from "@/components/HowItWorks";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

import { detectPlatform, MAX_BATCH_SIZE } from "@/lib/validators";
import type { PlatformId, VideoInfo } from "@/lib/types";

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

export default function HomePage() {
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

    const platform = detectPlatform(target);
    if (!platform) {
      setState({
        kind: "error",
        message:
          "That link isn't from a supported platform. Paste a TikTok, Instagram, Facebook, or YouTube video link.",
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
    <div id="top" className="relative min-h-screen text-slate-300">
      <Backdrop />
      <Navbar />

      <main className="relative z-10">
        {/* Hero + tool */}
        <section className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 px-4 pb-6 pt-16 sm:px-6 sm:pt-24">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
              Download any video,
              <br />
              <span className="text-slate-500">clean and watermark-free.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-slate-400">
              Paste a link from TikTok, Instagram, Facebook, or YouTube and
              save it in HD — or grab just the audio as MP3.
            </p>
          </motion.div>

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
        </section>

        <PlatformsSection />
        <HowItWorks />
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}
