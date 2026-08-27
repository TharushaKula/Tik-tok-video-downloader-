"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Bot,
  Clipboard,
  Facebook,
  Instagram,
  Link2,
  ListPlus,
  ListX,
  Loader2,
  Music2,
  Pin,
  Twitter,
  X,
  Youtube,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  detectPlatform,
  extractSupportedUrls,
  isYouTubePlaylistUrl,
  MAX_BATCH_SIZE,
} from "@/lib/validators";
import { PLATFORMS, PLATFORM_IDS } from "@/lib/platforms";
import type { PlatformId } from "@/lib/types";

const PLATFORM_ICONS: Record<PlatformId, typeof Music2> = {
  tiktok: Music2,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  twitter: Twitter,
  reddit: Bot,
  pinterest: Pin,
};

interface UrlInputProps {
  value: string;
  onChange: (v: string) => void;
  /** Fetch one video. Pass a url to submit a value set in the same tick. */
  onSubmit: (url?: string) => void;
  loading: boolean;
  batchMode: boolean;
  onBatchModeChange: (v: boolean) => void;
  batchText: string;
  onBatchTextChange: (v: string) => void;
  /** Fetch several videos at once. */
  onBatchSubmit: (urls: string[]) => void;
}

export default function UrlInput({
  value,
  onChange,
  onSubmit,
  loading,
  batchMode,
  onBatchModeChange,
  batchText,
  onBatchTextChange,
  onBatchSubmit,
}: UrlInputProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const trimmed = value.trim();
  const isPlaylist = trimmed ? isYouTubePlaylistUrl(trimmed) : false;
  const platform = isPlaylist ? "youtube" : trimmed ? detectPlatform(trimmed) : null;
  const meta = platform ? PLATFORMS[platform] : null;
  const PlatformIcon = platform ? PLATFORM_ICONS[platform] : Link2;

  const batch = extractSupportedUrls(batchText);
  const batchCounts = batch.urls.reduce(
    (acc, u) => {
      const p = detectPlatform(u);
      if (p) acc[p] = (acc[p] ?? 0) + 1;
      return acc;
    },
    {} as Partial<Record<PlatformId, number>>
  );

  // "/" focuses the link box from anywhere on the page
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const typing =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        (batchMode ? textareaRef : inputRef).current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [batchMode]);

  /** Route pasted text: 2+ links start a batch, one link fetches directly. */
  function handleIncomingText(text: string): boolean {
    const found = extractSupportedUrls(text);
    if (found.urls.length >= 2 && !loading) {
      onBatchModeChange(true);
      onBatchTextChange(found.urls.join("\n"));
      onBatchSubmit(found.urls);
      toast.success(`${found.urls.length} links detected — fetching all`);
      return true;
    }
    if (found.urls.length === 1 && !loading) {
      onChange(found.urls[0]);
      onSubmit(found.urls[0]);
      return true;
    }
    return false;
  }

  async function handlePasteButton() {
    try {
      const text = (await navigator.clipboard.readText()).trim();
      if (!text) {
        toast("Your clipboard is empty");
        return;
      }
      if (batchMode) {
        // Append to the list rather than replacing what's there
        onBatchTextChange(batchText.trim() ? `${batchText.trimEnd()}\n${text}` : text);
        textareaRef.current?.focus();
        return;
      }
      if (!handleIncomingText(text)) {
        onChange(text);
        inputRef.current?.focus();
      }
    } catch {
      toast.error("Clipboard access was denied by the browser");
      (batchMode ? textareaRef : inputRef).current?.focus();
    }
  }

  function handleNativePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const text = e.clipboardData.getData("text").trim();
    if (text && handleIncomingText(text)) {
      e.preventDefault();
    }
  }

  function handleClear() {
    onChange("");
    inputRef.current?.focus();
  }

  function enterBatchMode() {
    onBatchModeChange(true);
    onBatchTextChange(trimmed ? `${trimmed}\n` : "");
    requestAnimationFrame(() => textareaRef.current?.focus());
  }

  function exitBatchMode() {
    onBatchModeChange(false);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  const glowShadow = focused
    ? meta && !batchMode
      ? `0 0 0 1px ${meta.glow.replace("0.18", "0.6")}, 0 0 32px ${meta.glow}`
      : "0 0 0 1px rgba(139,92,246,0.5), 0 0 32px rgba(139,92,246,0.14)"
    : "none";

  const singleHint = !trimmed
    ? "Paste a link — or several at once — platforms are detected automatically"
    : isPlaylist
    ? "YouTube playlist detected — we'll fetch its latest videos as a batch"
    : meta
    ? `${meta.name} link detected — press Enter to fetch`
    : trimmed.length > 12
    ? "This doesn't look like a supported link yet"
    : " ";

  const batchHint = !batchText.trim()
    ? "One link per line — or paste any text, the links are picked out for you"
    : [
        `${batch.urls.length} valid ${batch.urls.length === 1 ? "link" : "links"}`,
        batch.unsupported > 0 ? `${batch.unsupported} unsupported` : null,
        batch.truncated ? `capped at ${MAX_BATCH_SIZE} per batch` : null,
        batch.urls.length > 0 ? "Ctrl/⌘ + Enter to fetch" : null,
      ]
        .filter(Boolean)
        .join(" · ");

  const showWarn = !batchMode && !!trimmed && !meta && trimmed.length > 12;

  return (
    <div className="w-full space-y-4">
      {/* Command bar */}
      <div
        className="rounded-2xl border border-white/[0.09] bg-[#101017] p-1.5 transition-shadow duration-200"
        style={{ boxShadow: glowShadow }}
      >
        {batchMode ? (
          <div className="flex flex-col gap-1.5">
            <textarea
              ref={textareaRef}
              value={batchText}
              onChange={(e) => onBatchTextChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && !loading) {
                  e.preventDefault();
                  if (batch.urls.length > 0) onBatchSubmit(batch.urls);
                }
              }}
              placeholder={
                "Paste links, one per line…\nhttps://www.tiktok.com/…\nhttps://youtu.be/…"
              }
              rows={4}
              disabled={loading}
              spellCheck={false}
              className="min-h-[96px] w-full resize-y rounded-xl bg-transparent px-3 py-2.5 text-sm leading-relaxed text-slate-100 placeholder-slate-500 outline-none disabled:opacity-60"
              aria-label="Video URLs, one per line"
            />
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-1.5 px-1">
                <button
                  onClick={handlePasteButton}
                  disabled={loading}
                  className="focus-ring flex shrink-0 items-center gap-1.5 rounded-lg border border-white/[0.08] px-2.5 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:border-white/20 hover:text-slate-100 disabled:opacity-50"
                  aria-label="Paste links from clipboard"
                >
                  <Clipboard size={12} />
                  Paste
                </button>
                <button
                  onClick={exitBatchMode}
                  disabled={loading}
                  className="focus-ring flex shrink-0 items-center gap-1.5 rounded-lg border border-white/[0.08] px-2.5 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:border-white/20 hover:text-slate-100 disabled:opacity-50"
                  aria-label="Back to single link"
                >
                  <ListX size={12} />
                  Single link
                </button>
              </div>
              <button
                onClick={() => onBatchSubmit(batch.urls)}
                disabled={loading || batch.urls.length === 0}
                className="focus-ring flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-[#0a0a0f] transition-all hover:bg-slate-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Fetching…
                  </>
                ) : (
                  <>
                    Fetch{" "}
                    {batch.urls.length > 0
                      ? `${batch.urls.length} ${batch.urls.length === 1 ? "video" : "videos"}`
                      : "videos"}
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-2.5 px-3">
              <PlatformIcon
                size={17}
                className={`shrink-0 transition-colors ${
                  meta ? meta.text : "text-slate-500"
                }`}
                aria-hidden
              />
              <input
                ref={inputRef}
                type="url"
                inputMode="url"
                enterKeyHint="go"
                autoComplete="off"
                spellCheck={false}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onPaste={handleNativePaste}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !loading) onSubmit();
                  if (e.key === "Escape") handleClear();
                }}
                placeholder="Paste a video link…"
                disabled={loading}
                className="h-11 min-w-0 flex-1 bg-transparent text-[15px] text-slate-100 placeholder-slate-500 outline-none disabled:opacity-60"
                aria-label="Video URL"
              />
              {value && !loading && (
                <button
                  onClick={handleClear}
                  className="focus-ring shrink-0 rounded-md p-1 text-slate-500 transition-colors hover:text-slate-200"
                  aria-label="Clear link"
                >
                  <X size={15} />
                </button>
              )}
              <button
                onClick={handlePasteButton}
                disabled={loading}
                className="focus-ring flex shrink-0 items-center gap-1.5 rounded-lg border border-white/[0.08] px-2.5 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:border-white/20 hover:text-slate-100 disabled:opacity-50"
                aria-label="Paste link from clipboard"
              >
                <Clipboard size={12} />
                Paste
              </button>
              <button
                onClick={enterBatchMode}
                disabled={loading}
                className="focus-ring flex shrink-0 items-center gap-1.5 rounded-lg border border-white/[0.08] px-2.5 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:border-white/20 hover:text-slate-100 disabled:opacity-50"
                aria-label="Batch mode — paste several links"
                title="Batch mode — paste several links"
              >
                <ListPlus size={13} />
                <span className="hidden sm:inline">Batch</span>
              </button>
            </div>

            <button
              onClick={() => onSubmit()}
              disabled={loading || !trimmed}
              className="focus-ring flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-[#0a0a0f] transition-all hover:bg-slate-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Fetching…
                </>
              ) : (
                <>
                  Get video
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Platform detection chips + hint */}
      <div className="flex flex-col items-center gap-2.5">
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {PLATFORM_IDS.map((id) => {
            const p = PLATFORMS[id];
            const count = batchCounts[id] ?? 0;
            const active = batchMode ? count > 0 : platform === id;
            const dimmed = batchMode
              ? batch.urls.length > 0 && count === 0
              : platform !== null && !active;
            return (
              <span
                key={id}
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-all duration-200 ${
                  active ? p.activeChip : "border-white/[0.07] text-slate-500"
                } ${dimmed ? "opacity-40" : ""}`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    active ? p.dot : "bg-slate-600"
                  }`}
                />
                {p.name}
                {batchMode && count > 0 ? (
                  <span className="font-semibold">×{count}</span>
                ) : null}
              </span>
            );
          })}
        </div>
        <p
          className={`text-xs ${showWarn ? "text-amber-400/90" : "text-slate-500"}`}
          aria-live="polite"
        >
          {batchMode ? batchHint : singleHint}
        </p>
      </div>
    </div>
  );
}
