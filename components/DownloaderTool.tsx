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
import Favorites from "@/components/Favorites";
import CommandPalette from "@/components/CommandPalette";
import UsageStats from "@/components/UsageStats";
import { DOWNLOAD_EVENT } from "@/components/DownloadOptionRow";
import OnboardingHint, {
  hasOnboarded,
  markOnboarded,
} from "@/components/OnboardingHint";
import { type UsageStats as Stats, loadStats } from "@/lib/stats";

import {
  detectPlatform,
  extractSupportedUrls,
  extractYouTubePlaylistId,
  isYouTubeChannelUrl,
  normalizeLinkFileText,
  MAX_BATCH_SIZE,
} from "@/lib/validators";
import {
  type FavoriteEntry,
  loadFavorites,
  toggleFavorite,
  removeFavorite,
  clearFavorites,
  setFavoriteTags,
} from "@/lib/favorites";
import type { PlatformId, VideoInfo } from "@/lib/types";
import toast from "react-hot-toast";

type FetchState =
  | { kind: "idle" }
  | { kind: "loading"; platform: PlatformId | null }
  | { kind: "error"; message: string; url: string }
  | { kind: "success"; info: VideoInfo; url: string }
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
  const [favorites, setFavorites] = useState<FavoriteEntry[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const batchRunning =
    state.kind === "batch" &&
    batchItems.some((i) => i.status === "queued" || i.status === "loading");
  const busy = state.kind === "loading" || batchRunning;

  // History + favorites live in localStorage  read after mount to keep SSR
  // markup stable.
  useEffect(() => {
    setRecent(loadRecent());
    setFavorites(loadFavorites());
    setStats(loadStats());
    // First-visit tip: only for users with no history at all
    setShowHint(!hasOnboarded() && loadRecent().length === 0);
  }, []);

  // Keep the usage tally live as downloads are started anywhere in the tool.
  useEffect(() => {
    const onDownload = () => setStats(loadStats());
    window.addEventListener(DOWNLOAD_EVENT, onDownload);
    return () => window.removeEventListener(DOWNLOAD_EVENT, onDownload);
  }, []);

  // PWA share target / deep link: links shared into the installed app land
  // here as ?url= / ?text= query params  pick them up and fetch right away.
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

  // Refs so window-level listeners never see stale state
  const busyRef = useRef(busy);
  busyRef.current = busy;
  const recentRef = useRef(recent);
  recentRef.current = recent;

  // Route any incoming text (drop, page-level paste, clipboard detection):
  // several links start a batch, one link fetches directly.
  // Returns false when no supported link was found.
  function routeIncomingText(text: string): boolean {
    const found = extractSupportedUrls(text);
    if (found.urls.length >= 2 && !busyRef.current) {
      setBatchMode(true);
      setBatchText(found.urls.join("\n"));
      void handleBatchSubmit(found.urls);
      toast.success(`${found.urls.length} links detected  fetching all`);
      return true;
    }
    if (found.urls.length === 1 && !busyRef.current) {
      setUrl(found.urls[0]);
      void handleSubmit(found.urls[0]);
      return true;
    }
    return false;
  }
  const routeRef = useRef(routeIncomingText);
  routeRef.current = routeIncomingText;

  // Read the clipboard and route whatever's there (used by the command
  // palette's "Paste and fetch" action).
  async function pasteAndFetch() {
    let text = "";
    try {
      text = (await navigator.clipboard.readText()).trim();
    } catch {
      toast.error("Clipboard access was denied by the browser");
      return;
    }
    if (!text) {
      toast("Your clipboard is empty");
      return;
    }
    if (!routeRef.current(text)) {
      setUrl(text.split(/\s+/)[0].slice(0, 500));
      toast("That doesn't look like a supported link");
    }
  }

  // Cmd/Ctrl+K opens the command palette from anywhere
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Drag-and-drop a link (or a .txt/.csv of links) anywhere on the page
  const [dragging, setDragging] = useState(false);
  const dragDepth = useRef(0);
  useEffect(() => {
    const accepts = (e: DragEvent) =>
      Array.from(e.dataTransfer?.types ?? []).some(
        (t) => t === "text/plain" || t === "text/uri-list" || t === "Files"
      );
    const isLinkFile = (f: File) =>
      /\.(txt|csv)$/i.test(f.name) ||
      f.type === "text/plain" ||
      f.type === "text/csv";
    function onDragEnter(e: DragEvent) {
      if (!accepts(e)) return;
      e.preventDefault();
      dragDepth.current += 1;
      setDragging(true);
    }
    function onDragOver(e: DragEvent) {
      if (accepts(e)) e.preventDefault();
    }
    function onDragLeave(e: DragEvent) {
      if (!accepts(e)) return;
      dragDepth.current = Math.max(0, dragDepth.current - 1);
      if (dragDepth.current === 0) setDragging(false);
    }
    function onDrop(e: DragEvent) {
      dragDepth.current = 0;
      setDragging(false);
      if (!accepts(e)) return;
      e.preventDefault();
      const file = e.dataTransfer?.files?.[0];
      if (file) {
        if (!isLinkFile(file)) {
          toast("Drop a link, or a .txt/.csv file of links");
          return;
        }
        void file
          .text()
          .then((content) => {
            if (!routeRef.current(normalizeLinkFileText(content))) {
              toast("No supported links found in that file");
            }
          })
          .catch(() => toast.error("Couldn't read that file"));
        return;
      }
      const text =
        e.dataTransfer?.getData("text/uri-list") ||
        e.dataTransfer?.getData("text/plain") ||
        "";
      if (text.trim() && !routeRef.current(text.trim())) {
        setUrl(text.trim().split(/\s+/)[0]);
        toast("That doesn't look like a supported link");
      }
    }
    window.addEventListener("dragenter", onDragEnter);
    window.addEventListener("dragover", onDragOver);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("drop", onDrop);
    return () => {
      window.removeEventListener("dragenter", onDragEnter);
      window.removeEventListener("dragover", onDragOver);
      window.removeEventListener("dragleave", onDragLeave);
      window.removeEventListener("drop", onDrop);
    };
  }, []);

  // Paste anywhere on the page (outside the inputs) to fetch immediately
  useEffect(() => {
    function onPaste(e: ClipboardEvent) {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return; // the inputs have their own paste handling
      }
      const text = e.clipboardData?.getData("text")?.trim() ?? "";
      if (!text) return;
      if (routeRef.current(text)) {
        e.preventDefault();
      } else {
        setUrl(text.split(/\s+/)[0].slice(0, 500));
      }
    }
    document.addEventListener("paste", onPaste);
    return () => document.removeEventListener("paste", onPaste);
  }, []);

  // Clipboard detection on tab focus: if the clipboard holds a fresh
  // supported link, offer to fetch it. Reading silently fails until the
  // user has granted clipboard permission (e.g. via the Paste button).
  const lastClipboard = useRef("");
  useEffect(() => {
    async function onFocus() {
      if (busyRef.current) return;
      let text = "";
      try {
        text = (await navigator.clipboard.readText()).trim();
      } catch {
        return; // permission not granted  stay quiet
      }
      if (!text || text === lastClipboard.current) return;
      lastClipboard.current = text;
      const { urls } = extractSupportedUrls(text);
      if (urls.length === 0) return;
      // Don't re-offer something that was just fetched
      if (
        urls.length === 1 &&
        recentRef.current.some((r) => r.url === urls[0])
      ) {
        return;
      }
      const label =
        urls.length > 1 ? `${urls.length} links` : "a link";
      toast(
        (t) => (
          <span className="flex items-center gap-3">
            <span className="text-[13px]">
              We noticed {label} in your clipboard
            </span>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                routeRef.current(text);
              }}
              className="shrink-0 rounded-lg bg-btn px-2.5 py-1 text-xs font-semibold text-btn-ink"
            >
              Fetch
            </button>
          </span>
        ),
        { duration: 8000, id: "clipboard-offer" }
      );
    }
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

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

  // Expand a YouTube playlist or channel into a batch of its latest videos.
  async function expandYouTubeFeed(
    endpoint: string,
    target: string,
    kind: "playlist" | "channel"
  ) {
    setState({ kind: "loading", platform: "youtube" });
    try {
      const res = await fetch(endpoint);
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.success) {
        throw new Error(json?.error || `Couldn't load that ${kind}`);
      }
      const urls: string[] = json.urls;
      const label = kind === "playlist" ? "Playlist" : "Channel";
      toast.success(
        json.total > urls.length
          ? `${label} loaded  fetching the ${urls.length} most recent videos`
          : `${label} loaded  fetching ${urls.length} ${urls.length === 1 ? "video" : "videos"}`
      );
      await handleBatchSubmit(urls);
    } catch (err: unknown) {
      setState({
        kind: "error",
        message:
          err instanceof Error ? err.message : `Couldn't load that ${kind}`,
        url: target,
      });
    }
  }

  async function handleSubmit(explicitUrl?: string) {
    const target = (explicitUrl ?? url).trim();
    if (!target || busy) return;

    // YouTube playlists and channels expand into a batch of their videos
    const playlistId = extractYouTubePlaylistId(target);
    if (playlistId) {
      if (explicitUrl) setUrl(explicitUrl);
      await expandYouTubeFeed(
        `/api/youtube/playlist?list=${playlistId}`,
        target,
        "playlist"
      );
      return;
    }
    if (isYouTubeChannelUrl(target)) {
      if (explicitUrl) setUrl(explicitUrl);
      await expandYouTubeFeed(
        `/api/youtube/channel?url=${encodeURIComponent(target)}`,
        target,
        "channel"
      );
      return;
    }

    const platform = detectPlatform(target);
    if (!platform) {
      setState({
        kind: "error",
        message:
          "That link isn't from a supported platform. Paste a link from TikTok, Instagram, Facebook, YouTube, X, Reddit, Pinterest, Twitch, or SoundCloud.",
        url: target,
      });
      return;
    }

    if (explicitUrl) setUrl(explicitUrl);
    setBatchMode(false);
    setState({ kind: "loading", platform });

    try {
      const info = await fetchVideoInfo(target);
      setState({ kind: "success", info, url: target });
      rememberDownload(target, info);
      if (showHint) {
        setShowHint(false);
        markOnboarded();
      }
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

  function handleToggleFavorite(info: VideoInfo, sourceUrl: string) {
    const { list, favorited } = toggleFavorite({
      url: sourceUrl,
      title: info.title,
      platform: info.platform,
      thumbnail: info.thumbnail,
      ts: Date.now(),
    });
    setFavorites(list);
    toast.success(favorited ? "Saved to favorites" : "Removed from favorites");
  }

  function handleRemoveFavorite(url: string) {
    setFavorites(removeFavorite(url));
  }

  function handleSetFavoriteTags(url: string, tags: string[]) {
    setFavorites(setFavoriteTags(url, tags));
  }

  function handleClearFavorites() {
    clearFavorites();
    setFavorites([]);
  }

  return (
    <div className="flex w-full flex-col items-center gap-8">
      {/* Full-page drop target while dragging a link */}
      {dragging && (
        <div
          className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-base/80 backdrop-blur-sm"
          aria-hidden
        >
          <div className="rounded-2xl border-2 border-dashed border-accent/60 bg-accent/[0.06] px-10 py-8 text-center">
            <p className="text-lg font-semibold text-ink-hi">
              Drop a link, or a .txt/.csv of links
            </p>
            <p className="mt-1 text-sm text-ink-2">
              We&apos;ll detect the platform and fetch everything right away
            </p>
          </div>
        </div>
      )}

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        recent={recent}
        favorites={favorites}
        onSelectUrl={(u) => handleSubmit(u)}
        onPasteFetch={pasteAndFetch}
      />

      <OnboardingHint
        visible={showHint}
        onDismiss={() => {
          setShowHint(false);
          markOnboarded();
        }}
      />
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

      {/* Fetch state  skeleton, error, result, or batch queue */}
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
              <VideoResult
                info={state.info}
                onReset={handleReset}
                favorited={favorites.some((f) => f.url === state.url)}
                onToggleFavorite={() =>
                  handleToggleFavorite(state.info, state.url)
                }
                sourceUrl={state.url}
              />
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

      {/* Saved videos */}
      {state.kind !== "loading" && (
        <Favorites
          entries={favorites}
          onSelect={(u) => handleSubmit(u)}
          onRemove={handleRemoveFavorite}
          onClear={handleClearFavorites}
          onSetTags={handleSetFavoriteTags}
          disabled={busy}
        />
      )}

      {/* Recent history */}
      {state.kind !== "loading" && (
        <RecentDownloads
          entries={recent}
          onSelect={(u) => handleSubmit(u)}
          onClear={handleClearRecent}
          disabled={busy}
        />
      )}

      {/* Personal usage tally (appears after a few downloads) */}
      {stats && <UsageStats stats={stats} />}

      {/* Trust row */}
      <p className="flex flex-wrap items-center justify-center gap-x-2 text-xs text-ink-4">
        <span>Free forever</span>
        <span aria-hidden>·</span>
        <span>No sign-up</span>
        <span aria-hidden>·</span>
        <span>Unlimited downloads</span>
        <span aria-hidden className="hidden sm:inline">
          ·
        </span>
        <span className="hidden items-center gap-1 sm:inline-flex">
          <kbd className="rounded border border-veil/10 bg-veil/[0.04] px-1 py-0.5 font-mono text-[10px] text-ink-3">
            /
          </kbd>{" "}
          link box
        </span>
        <span aria-hidden className="hidden sm:inline">
          ·
        </span>
        <button
          onClick={() => setPaletteOpen(true)}
          className="focus-ring hidden items-center gap-1 rounded sm:inline-flex hover:text-ink-2"
        >
          <kbd className="rounded border border-veil/10 bg-veil/[0.04] px-1 py-0.5 font-mono text-[10px] text-ink-3">
            {"⌘"}K
          </kbd>{" "}
          commands
        </button>
      </p>
    </div>
  );
}
