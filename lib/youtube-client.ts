// Client-side YouTube download flow: start a conversion job through our API,
// poll the resolver's progress endpoint directly from the browser (it's
// CORS-open), then hand the finished CDN link to the browser as a download.
// Nothing here runs on the server.

import type { DownloadOption } from "./types";
import { playCompletionChime, vibrate } from "./sound";

/** Thrown when the browser can't reach the resolver (adblock, network). */
export class PollBlockedError extends Error {
  constructor() {
    super("Progress polling was blocked by the browser");
    this.name = "PollBlockedError";
  }
}

export function youtubeFormatFor(option: DownloadOption): string {
  // Audio: the option's format is already the loader.to format (mp3/m4a/wav/flac)
  if (option.isAudio) return option.format;
  if (option.quality === "1080p") return "1080";
  if (option.quality === "720p") return "720";
  return "360";
}

export async function startYouTubeJob(
  url: string,
  format: string
): Promise<string> {
  const res = await fetch("/api/youtube/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, format }),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success || typeof json.progressUrl !== "string") {
    throw new Error(json?.error || "Could not start the YouTube conversion");
  }
  return json.progressUrl;
}

interface ProgressPayload {
  progress?: number; // 0–1000
  download_url?: string | null;
  text?: string;
}

export async function pollYouTubeJob(
  progressUrl: string,
  onProgress?: (percent: number) => void,
  { intervalMs = 2500, budgetMs = 280000 } = {}
): Promise<string> {
  const started = Date.now();
  let consecutiveFailures = 0;

  while (Date.now() - started < budgetMs) {
    await new Promise((r) => setTimeout(r, intervalMs));

    let data: ProgressPayload;
    try {
      const res = await fetch(progressUrl, { mode: "cors" });
      data = (await res.json()) as ProgressPayload;
      consecutiveFailures = 0;
    } catch {
      // Content blockers commonly block downloader domains  give the
      // caller a chance to fall back to the server-side flow.
      consecutiveFailures++;
      if (consecutiveFailures >= 3) throw new PollBlockedError();
      continue;
    }

    if (typeof data?.progress === "number") {
      onProgress?.(Math.min(99, Math.round(data.progress / 10)));
    }
    if (
      typeof data?.download_url === "string" &&
      data.download_url.startsWith("https://")
    ) {
      onProgress?.(100);
      return data.download_url;
    }
    if (/error|fail/i.test(data?.text || "")) {
      throw new Error(`Conversion failed: ${data.text || "unknown error"}`);
    }
  }

  throw new Error("Conversion timed out. Try a lower quality or a shorter video.");
}

export function triggerBrowserDownload(url: string) {
  const a = document.createElement("a");
  a.href = url;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Conversions take a while, so users tab away  ask (once, on a real click)
// for permission to ping them when the file is ready.
function requestNotifyPermission() {
  if (
    typeof Notification !== "undefined" &&
    Notification.permission === "default"
  ) {
    void Notification.requestPermission();
  }
}

function notifyIfHidden(title: string, body: string) {
  if (typeof Notification === "undefined") return;
  if (!document.hidden || Notification.permission !== "granted") return;
  try {
    new Notification(title, { body, icon: "/icons/icon-192.png" });
  } catch {
    // Some platforms only allow notifications from service workers  fine.
  }
}

/** Full flow: start → poll (with progress callbacks) → hand off to browser. */
export async function downloadYouTubeOption(
  option: DownloadOption,
  onProgress?: (percent: number) => void
): Promise<void> {
  requestNotifyPermission();
  const progressUrl = await startYouTubeJob(
    option.url,
    youtubeFormatFor(option)
  );
  const downloadUrl = await pollYouTubeJob(progressUrl, onProgress);
  triggerBrowserDownload(downloadUrl);
  playCompletionChime();
  vibrate(35);
  notifyIfHidden(
    "Your download is ready",
    "The converted file is saving to your downloads now."
  );
}
