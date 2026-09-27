"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  AudioLines,
  Bot,
  Clipboard,
  Facebook,
  FileUp,
  Instagram,
  Link2,
  ListPlus,
  ListX,
  Loader2,
  Music2,
  Pin,
  Twitch,
  Twitter,
  X,
  Youtube,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  detectPlatform,
  extractSupportedUrls,
  isYouTubePlaylistUrl,
  isYouTubeChannelUrl,
  normalizeLinkFileText,
  MAX_BATCH_SIZE,
} from "@/lib/validators";
import { PLATFORMS, PLATFORM_IDS } from "@/lib/platforms";
import type { PlatformId } from "@/lib/types";
import { useI18n } from "@/lib/i18n/client";
import { fmt } from "@/lib/i18n/format";

const PLATFORM_ICONS: Record<PlatformId, typeof Music2> = {
  tiktok: Music2,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  twitter: Twitter,
  reddit: Bot,
  pinterest: Pin,
  twitch: Twitch,
  soundcloud: AudioLines,
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
  const { t, plural, href } = useI18n();
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  /** Import a .txt/.csv of links into the batch box (appends, dedupes later). */
  async function handleImportFile(file: File | null) {
    if (!file) return;
    try {
      const text = await file.text();
      const { urls } = extractSupportedUrls(normalizeLinkFileText(text));
      if (urls.length === 0) {
        toast.error(t.tool.noLinksInFile);
        return;
      }
      const block = urls.join("\n");
      onBatchTextChange(
        batchText.trim() ? `${batchText.trimEnd()}\n${block}` : block
      );
      toast.success(plural(urls.length, t.url.importedLinks, { file: file.name }));
      textareaRef.current?.focus();
    } catch {
      toast.error(t.tool.fileReadError);
    }
  }

  const trimmed = value.trim();
  const isPlaylist = trimmed ? isYouTubePlaylistUrl(trimmed) : false;
  const isChannel = trimmed ? isYouTubeChannelUrl(trimmed) : false;
  const platform =
    isPlaylist || isChannel
      ? "youtube"
      : trimmed
      ? detectPlatform(trimmed)
      : null;
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
      toast.success(plural(found.urls.length, t.tool.linksDetected));
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
        toast(t.tool.clipboardEmpty);
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
      toast.error(t.tool.clipboardDenied);
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
      : "0 0 0 1px rgb(var(--c-accent) / 0.55), 0 0 32px rgb(var(--c-accent) / 0.16)"
    : "none";

  const singleHint = !trimmed
    ? t.url.hintEmpty
    : isPlaylist
    ? t.url.hintPlaylist
    : isChannel
    ? t.url.hintChannel
    : meta
    ? fmt(t.url.hintDetected, { platform: meta.name })
    : trimmed.length > 12
    ? t.url.hintUnsupported
    : " ";

  const batchHint = !batchText.trim()
    ? t.url.batchHintEmpty
    : [
        plural(batch.urls.length, t.url.batchValid),
        batch.unsupported > 0
          ? fmt(t.url.batchUnsupported, { count: batch.unsupported })
          : null,
        batch.truncated ? fmt(t.url.batchCapped, { max: MAX_BATCH_SIZE }) : null,
        batch.urls.length > 0 ? t.url.batchShortcut : null,
      ]
        .filter(Boolean)
        .join(" · ");

  const showWarn = !batchMode && !!trimmed && !meta && trimmed.length > 12;

  return (
    <div className="w-full space-y-4">
      {/* Command bar */}
      <div
        className="rounded-2xl border border-veil/[0.09] bg-raised p-1.5 transition-shadow duration-200"
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
              placeholder={t.url.batchPlaceholder}
              rows={4}
              disabled={loading}
              spellCheck={false}
              className="min-h-[96px] w-full resize-y rounded-xl bg-transparent px-3 py-2.5 text-sm leading-relaxed text-ink-1 placeholder-ink-3 outline-none disabled:opacity-60"
              aria-label={t.url.batchTextAria}
            />
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-1.5 px-1">
                <button
                  onClick={handlePasteButton}
                  disabled={loading}
                  className="focus-ring flex shrink-0 items-center gap-1.5 rounded-lg border border-veil/[0.08] px-2.5 py-1.5 text-xs font-medium text-ink-2 transition-colors hover:border-veil/20 hover:text-ink-1 disabled:opacity-50"
                  aria-label={t.url.pasteLinksAria}
                >
                  <Clipboard size={12} />
                  {t.common.paste}
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".txt,.csv,text/plain,text/csv"
                  className="hidden"
                  onChange={(e) => {
                    void handleImportFile(e.target.files?.[0] ?? null);
                    e.target.value = "";
                  }}
                  aria-hidden
                  tabIndex={-1}
                />
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={loading}
                  className="focus-ring flex shrink-0 items-center gap-1.5 rounded-lg border border-veil/[0.08] px-2.5 py-1.5 text-xs font-medium text-ink-2 transition-colors hover:border-veil/20 hover:text-ink-1 disabled:opacity-50"
                  aria-label={t.url.importFileAria}
                >
                  <FileUp size={12} />
                  {t.url.importFile}
                </button>
                <button
                  onClick={exitBatchMode}
                  disabled={loading}
                  className="focus-ring flex shrink-0 items-center gap-1.5 rounded-lg border border-veil/[0.08] px-2.5 py-1.5 text-xs font-medium text-ink-2 transition-colors hover:border-veil/20 hover:text-ink-1 disabled:opacity-50"
                  aria-label={t.url.singleLinkAria}
                >
                  <ListX size={12} />
                  {t.url.singleLink}
                </button>
              </div>
              <button
                onClick={() => onBatchSubmit(batch.urls)}
                disabled={loading || batch.urls.length === 0}
                className="btn-primary btn-md shrink-0"
              >
                {loading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    {t.common.fetching}
                  </>
                ) : (
                  <>
                    {batch.urls.length > 0
                      ? plural(batch.urls.length, t.url.fetchCount)
                      : t.url.fetchVideos}
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
                  meta ? meta.text : "text-ink-3"
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
                placeholder={t.url.placeholder}
                disabled={loading}
                className="h-11 min-w-0 flex-1 bg-transparent text-[15px] text-ink-1 placeholder-ink-3 outline-none disabled:opacity-60"
                aria-label={t.url.aria}
              />
              {value && !loading && (
                <button
                  onClick={handleClear}
                  className="focus-ring shrink-0 rounded-md p-1 text-ink-3 transition-colors hover:text-ink-1"
                  aria-label={t.url.clearLink}
                >
                  <X size={15} />
                </button>
              )}
              <button
                onClick={handlePasteButton}
                disabled={loading}
                className="focus-ring flex shrink-0 items-center gap-1.5 rounded-lg border border-veil/[0.08] px-2.5 py-1.5 text-xs font-medium text-ink-2 transition-colors hover:border-veil/20 hover:text-ink-1 disabled:opacity-50"
                aria-label={t.url.pasteLinkAria}
              >
                <Clipboard size={12} />
                {t.common.paste}
              </button>
              <button
                onClick={enterBatchMode}
                disabled={loading}
                className="focus-ring flex shrink-0 items-center gap-1.5 rounded-lg border border-veil/[0.08] px-2.5 py-1.5 text-xs font-medium text-ink-2 transition-colors hover:border-veil/20 hover:text-ink-1 disabled:opacity-50"
                aria-label={t.url.batchAria}
                title={t.url.batchAria}
              >
                <ListPlus size={13} />
                <span className="hidden sm:inline">{t.url.batch}</span>
              </button>
            </div>

            <button
              onClick={() => onSubmit()}
              disabled={loading || !trimmed}
              className="btn-primary btn-md shrink-0 sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  {t.common.fetching}
                </>
              ) : (
                <>
                  {t.url.getVideo}
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
                  active ? p.activeChip : "border-veil/[0.07] text-ink-3"
                } ${dimmed ? "opacity-40" : ""}`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    active ? p.dot : "bg-ink-4"
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
          className={`text-xs ${showWarn ? "text-warn" : "text-ink-3"}`}
          aria-live="polite"
        >
          {batchMode ? batchHint : singleHint}
          {showWarn && (
            <>
              {" · "}
              <Link href={href("/answers/link-not-supported")} className="underline underline-offset-2 hover:text-ink-1">
                {t.url.whichLinksWork}
              </Link>
            </>
          )}
        </p>

        {/* The boundary, stated at the moment of hesitation rather than in a
            footnote: this is where people decide whether to trust the box. */}
        <p className="text-center text-[11px] leading-relaxed text-ink-4">
          {t.url.trustLine}{" "}
          <Link
            href="/answers/private-post-error"
            className="focus-ring rounded underline underline-offset-2 transition-colors hover:text-ink-2"
          >
            {t.url.privateWhy}
          </Link>
        </p>
      </div>
    </div>
  );
}
