"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Clipboard,
  Facebook,
  Instagram,
  Link2,
  Loader2,
  Music2,
  X,
  Youtube,
} from "lucide-react";
import toast from "react-hot-toast";
import { detectPlatform } from "@/lib/validators";
import { PLATFORMS, PLATFORM_IDS } from "@/lib/platforms";
import type { PlatformId } from "@/lib/types";

const PLATFORM_ICONS: Record<PlatformId, typeof Music2> = {
  tiktok: Music2,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
};

interface UrlInputProps {
  value: string;
  onChange: (v: string) => void;
  /** Fetch video info. Pass a url to submit a value set in the same tick. */
  onSubmit: (url?: string) => void;
  loading: boolean;
}

export default function UrlInput({
  value,
  onChange,
  onSubmit,
  loading,
}: UrlInputProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const trimmed = value.trim();
  const platform = trimmed ? detectPlatform(trimmed) : null;
  const meta = platform ? PLATFORMS[platform] : null;
  const PlatformIcon = platform ? PLATFORM_ICONS[platform] : Link2;

  // "/" focuses the input from anywhere on the page
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const typing =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  async function handlePasteButton() {
    try {
      const text = (await navigator.clipboard.readText()).trim();
      if (!text) {
        toast("Your clipboard is empty");
        return;
      }
      onChange(text);
      // Zero-friction path: a valid link starts fetching immediately
      if (detectPlatform(text) && !loading) {
        onSubmit(text);
      } else {
        inputRef.current?.focus();
      }
    } catch {
      toast.error("Clipboard access was denied by the browser");
      inputRef.current?.focus();
    }
  }

  function handleNativePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const text = e.clipboardData.getData("text").trim();
    if (text && detectPlatform(text) && !loading) {
      e.preventDefault();
      onChange(text);
      onSubmit(text);
    }
  }

  function handleClear() {
    onChange("");
    inputRef.current?.focus();
  }

  const glowShadow =
    focused && meta
      ? `0 0 0 1px ${meta.glow.replace("0.18", "0.6")}, 0 0 32px ${meta.glow}`
      : focused
      ? "0 0 0 1px rgba(139,92,246,0.5), 0 0 32px rgba(139,92,246,0.14)"
      : "none";

  const hint = !trimmed
    ? "Paste a link — the platform is detected automatically"
    : meta
    ? `${meta.name} link detected — press Enter to fetch`
    : trimmed.length > 12
    ? "This doesn't look like a supported link yet"
    : " ";

  return (
    <div className="w-full space-y-4">
      {/* Command bar */}
      <div
        className="flex flex-col gap-1.5 rounded-2xl border border-white/[0.09] bg-[#101017] p-1.5 transition-shadow duration-200 sm:flex-row sm:items-center"
        style={{ boxShadow: glowShadow }}
      >
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

      {/* Platform detection chips + hint */}
      <div className="flex flex-col items-center gap-2.5">
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {PLATFORM_IDS.map((id) => {
            const p = PLATFORMS[id];
            const active = platform === id;
            const dimmed = platform !== null && !active;
            return (
              <span
                key={id}
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-all duration-200 ${
                  active
                    ? p.activeChip
                    : "border-white/[0.07] text-slate-500"
                } ${dimmed ? "opacity-40" : ""}`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    active ? p.dot : "bg-slate-600"
                  }`}
                />
                {p.name}
              </span>
            );
          })}
        </div>
        <p
          className={`text-xs ${
            trimmed && !meta && trimmed.length > 12
              ? "text-amber-400/90"
              : "text-slate-500"
          }`}
          aria-live="polite"
        >
          {hint}
        </p>
      </div>
    </div>
  );
}
