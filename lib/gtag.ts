// Google Analytics 4 measurement ID and the event helper.
//
// Hardcoded on purpose rather than read from the environment, so the tag
// works identically in every deployment without configuration. The tag is
// injected in app/layout.tsx.
//
// Note this is a real tracker: GA4 sets first-party cookies (_ga and
// _ga_<stream>) and sends data to Google. That is a different privacy
// posture from the cookie-less Vercel Analytics the site also runs, and both
// are described in lib/legal.ts (Privacy, Analytics). Keep that page in step
// with anything changed here.
export const GA_MEASUREMENT_ID = "G-K05HX7EKRP";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Values GA4 accepts as an event parameter. */
export type GaValue = string | number | boolean;

// GA4 rejects or silently mangles parameter values over 100 characters, so
// everything is clamped before it is sent.
const MAX_PARAM_LENGTH = 100;

/**
 * Send one custom event to GA4.
 *
 * Safe to call at any point in the page lifecycle. The gtag shim is defined
 * by an inline script, but that script runs after hydration, so an event
 * fired by a deep link on mount can beat it. In that case the command is
 * pushed onto dataLayer directly, in exactly the shape the shim would have
 * pushed, and gtag.js replays it once it loads. Nothing is lost and nothing
 * throws if the script is blocked entirely.
 */
export function gtagEvent(
  name: string,
  params: Record<string, GaValue> = {}
): void {
  if (typeof window === "undefined") return;

  try {
    const safe: Record<string, GaValue> = {};
    for (const [key, value] of Object.entries(params)) {
      safe[key] =
        typeof value === "string" ? value.slice(0, MAX_PARAM_LENGTH) : value;
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", name, safe);
      return;
    }

    // The tag has not initialised yet. Queue the command ourselves.
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(["event", name, safe]);
  } catch {
    // Analytics must never break the download path.
  }
}
