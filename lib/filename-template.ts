import type { PlatformId, VideoInfo, DownloadOption } from "./types";
import { PLATFORMS } from "./platforms";

// User-configurable download filename template. Persisted in the browser.
// Variables use {curly} syntax and are filled from the video metadata.
export const STORAGE_KEY = "snapload:filename-template";
export const DEFAULT_TEMPLATE = "{title}";

export const TEMPLATE_VARS: { key: string; label: string; example: string }[] =
  [
    { key: "title", label: "Video title", example: "My summer trip" },
    { key: "author", label: "Author / channel", example: "traveler" },
    { key: "platform", label: "Platform", example: "tiktok" },
    { key: "quality", label: "Quality", example: "1080p" },
    { key: "date", label: "Today's date", example: "2026-08-27" },
  ];

export function loadTemplate(): string {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw && raw.trim() ? raw : DEFAULT_TEMPLATE;
  } catch {
    return DEFAULT_TEMPLATE;
  }
}

export function saveTemplate(template: string): void {
  try {
    const clean = template.trim();
    if (!clean || clean === DEFAULT_TEMPLATE) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, clean);
    }
  } catch {
    // best-effort
  }
}

/** ISO date (YYYY-MM-DD) in the viewer's locale, safe for filenames. */
function today(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/**
 * Apply a template to a video + option, producing a filename base (no
 * extension). Unknown variables are dropped. The server sanitizes further,
 * so this only needs to produce a reasonable string.
 */
export function applyTemplate(
  template: string,
  info: Pick<VideoInfo, "title" | "author" | "platform">,
  option?: Pick<DownloadOption, "quality">
): string {
  const values: Record<string, string> = {
    title: info.title || "video",
    author: info.author || "",
    platform: PLATFORMS[info.platform as PlatformId]?.name ?? info.platform,
    quality: option?.quality ?? "",
    date: today(),
  };
  const out = template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in values ? values[key] : ""
  );
  // Collapse whitespace/separators left by empty vars
  const cleaned = out
    .replace(/\s{2,}/g, " ")
    .replace(/(^[\s\-_·|]+)|([\s\-_·|]+$)/g, "")
    .trim();
  return cleaned || info.title || "video";
}
