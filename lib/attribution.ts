import { STORAGE_PREFIX } from "./site";

// First-touch acquisition context. Captured once per browser, then attached
// to every funnel event so each channel can be judged by activated users
// rather than by sessions.
//
// Nothing here identifies a person: it is the campaign tags the visitor
// arrived with plus the page they landed on. No cookies, no third party, and
// it never leaves the browser except as event properties on our own events.

const KEY = `${STORAGE_PREFIX}attribution`;

export interface FirstTouch {
  /** utm_source, or a referrer host, or "direct" */
  source: string;
  /** utm_medium, or "referral" / "none" */
  medium: string;
  /** utm_campaign, or "none" */
  campaign: string;
  /** Path (never the query string) the visitor first landed on */
  landing: string;
  /** First-seen timestamp */
  ts: number;
}

const UNKNOWN: FirstTouch = {
  source: "direct",
  medium: "none",
  campaign: "none",
  landing: "/",
  ts: 0,
};

/** Trim a tag to something safe and bounded for an analytics dimension. */
function tag(value: string | null, fallback: string): string {
  const clean = (value ?? "").trim().toLowerCase().slice(0, 48);
  return clean.replace(/[^a-z0-9._~-]/g, "-") || fallback;
}

/** Referrer host, or "direct" when there isn't one (or it is our own site). */
function referrerSource(): string {
  try {
    if (!document.referrer) return "direct";
    const host = new URL(document.referrer).hostname.replace(/^www\./, "");
    if (host === window.location.hostname.replace(/^www\./, "")) return "direct";
    return tag(host, "direct");
  } catch {
    return "direct";
  }
}

/**
 * Read the stored first touch, capturing it on this visit if none exists.
 * Safe to call on every event; only the first call in a browser writes.
 */
export function firstTouch(): FirstTouch {
  if (typeof window === "undefined") return UNKNOWN;

  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<FirstTouch>;
      if (typeof parsed.source === "string") {
        return {
          source: parsed.source,
          medium: parsed.medium ?? "none",
          campaign: parsed.campaign ?? "none",
          landing: parsed.landing ?? "/",
          ts: parsed.ts ?? Date.now(),
        };
      }
    }
  } catch {
    // Private mode or blocked storage: fall through and report this visit.
  }

  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get("utm_source");
  const captured: FirstTouch = {
    source: utmSource ? tag(utmSource, "direct") : referrerSource(),
    medium: tag(
      params.get("utm_medium"),
      utmSource ? "none" : document.referrer ? "referral" : "none"
    ),
    campaign: tag(params.get("utm_campaign"), "none"),
    // Path only. The query can carry a pasted video link, which must never
    // reach analytics.
    landing: window.location.pathname.slice(0, 96),
    ts: Date.now(),
  };

  try {
    localStorage.setItem(KEY, JSON.stringify(captured));
  } catch {
    // Best effort; the event still carries this visit's values.
  }
  return captured;
}

/** Visitor recency bucket, so new and returning traffic can be compared. */
export function visitorAge(): "new" | "1d" | "7d" | "30d" | "older" {
  const { ts } = firstTouch();
  if (!ts) return "new";
  const days = (Date.now() - ts) / 86_400_000;
  if (days < 1) return "new";
  if (days < 2) return "1d";
  if (days < 8) return "7d";
  if (days < 31) return "30d";
  return "older";
}
