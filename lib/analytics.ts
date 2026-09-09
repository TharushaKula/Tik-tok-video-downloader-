import { track } from "@vercel/analytics";
import { firstTouch, visitorAge } from "./attribution";
import type { PlatformId } from "./types";

// The activation funnel.
//
// Page views alone cannot show where people fall out, so every step of the
// real job is an event: paste → resolve → result → preview → download, plus
// the two questions we ask (what stopped you / what were you saving).
//
// Privacy rules, enforced here rather than left to call sites:
//   - The pasted URL, the video title, the author, and the filename are
//     NEVER sent. Only a platform id and a coarse error class.
//   - Free text from the user is never sent; the prompts are fixed choices.
//   - Every event carries the first-touch source so channels can be judged
//     by activated users. That comes from our own localStorage, not a cookie.
// Keep lib/legal.ts (Privacy → Analytics) in step with anything added here.

export type FunnelEvent =
  | "submit" // a link was submitted (single or batch)
  | "resolve_start" // request sent to /api/download
  | "resolve_success" // metadata and download options came back
  | "resolve_error" // the resolve failed
  | "preview_play" // the in-page preview was started
  | "download_start" // the north-star action: a file transfer began
  | "zip_download" // a carousel/slideshow was bundled
  | "batch_start" // a multi-link batch began
  | "share" // the tool was shared from the success state
  | "qr_handoff" // the result was sent to a phone
  | "install_prompt" // the PWA install prompt was accepted
  | "exit_reason" // a non-activated visitor told us what stopped them
  | "job_done"; // a successful visitor told us what they were saving

/** Coarse, non-identifying failure buckets. Never a raw error string. */
export type ErrorClass =
  | "unsupported_url"
  | "private_or_restricted"
  | "not_found"
  | "no_media"
  | "resolver_down"
  | "rate_limited"
  | "network"
  | "unknown";

/**
 * Bucket a resolver error message into a safe class. The message can quote
 * a platform's own wording, so it must never be sent as-is.
 */
export function classifyError(message: string): ErrorClass {
  const m = message.toLowerCase();
  if (
    /from a supported platform|unsupported|not supported|invalid link|isn.t a valid/.test(
      m
    )
  ) {
    return "unsupported_url";
  }
  if (/private|age-restricted|age restricted|members-only|login|sign in|protected|region/.test(m))
    return "private_or_restricted";
  if (/not found|deleted|removed|no longer available|expired|404/.test(m))
    return "not_found";
  if (/no video|no media|no downloadable|nothing to download/.test(m))
    return "no_media";
  if (/rate limit|too many|429|slow down/.test(m)) return "rate_limited";
  if (/failed to fetch|network|timed out|timeout|econn|socket/.test(m))
    return "network";
  if (/unexpected|server|500|502|503|resolver|upstream/.test(m))
    return "resolver_down";
  return "unknown";
}

/** Latency bucket, so slow resolves are visible without storing timings. */
export function latencyBucket(ms: number): string {
  if (ms < 1000) return "<1s";
  if (ms < 3000) return "1-3s";
  if (ms < 6000) return "3-6s";
  if (ms < 15000) return "6-15s";
  return ">15s";
}

export interface FunnelProps {
  /** Which platform the action was for */
  platform?: PlatformId | "mixed" | "unknown";
  /** Coarse failure bucket, on resolve_error only */
  error?: ErrorClass;
  /** mp4 / mp3 / m4a / wav / flac / jpg / zip */
  format?: string;
  /** Quality label the user picked, e.g. "1080p", "hd" */
  quality?: string;
  /** Bucketed duration, from latencyBucket() */
  latency?: string;
  /** How the link arrived: type, paste, share, deeplink, batch, history */
  via?: string;
  /** Number of items, for batches and ZIPs */
  count?: number;
  /** Fixed choice id from a feedback prompt (never free text) */
  choice?: string;
}

/**
 * Record one funnel event. Always safe to call: it swallows its own errors,
 * no-ops during SSR, and strips anything not on the allowed property list.
 */
export function trackFunnel(event: FunnelEvent, props: FunnelProps = {}): void {
  if (typeof window === "undefined") return;
  try {
    const touch = firstTouch();
    const payload: Record<string, string | number | boolean> = {
      source: touch.source,
      medium: touch.medium,
      campaign: touch.campaign,
      landing: touch.landing,
      visitor: visitorAge(),
      // Which page the action happened on, path only.
      page: window.location.pathname.slice(0, 96),
    };
    if (props.platform) payload.platform = props.platform;
    if (props.error) payload.error = props.error;
    if (props.format) payload.format = props.format.slice(0, 16);
    if (props.quality) payload.quality = props.quality.slice(0, 16);
    if (props.latency) payload.latency = props.latency;
    if (props.via) payload.via = props.via.slice(0, 16);
    if (typeof props.count === "number") payload.count = props.count;
    if (props.choice) payload.choice = props.choice.slice(0, 32);

    track(event, payload);
  } catch {
    // Analytics must never break the download path.
  }
}

/** Has this browser ever reached the north-star action? Drives the prompts. */
const ACTIVATED_KEY = "clipkoala:activated";

export function markActivated(): void {
  try {
    localStorage.setItem(ACTIVATED_KEY, "1");
  } catch {
    // ignore
  }
}

export function hasActivated(): boolean {
  try {
    return localStorage.getItem(ACTIVATED_KEY) === "1";
  } catch {
    return false;
  }
}
