export function isValidTikTokUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const validHosts = [
      "tiktok.com",
      "www.tiktok.com",
      "vm.tiktok.com",
      "vt.tiktok.com",
      "m.tiktok.com",
    ];
    return validHosts.some(
      (host) => parsed.hostname === host || parsed.hostname.endsWith("." + host)
    );
  } catch {
    return false;
  }
}

export function isValidInstagramUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const validHosts = [
      "instagram.com",
      "www.instagram.com",
      "m.instagram.com",
    ];
    const hostOk = validHosts.some(
      (host) => parsed.hostname === host || parsed.hostname.endsWith("." + host)
    );
    if (!hostOk) return false;
    return (
      /\/(reel|reels|p|tv)\/[A-Za-z0-9_-]+/.test(parsed.pathname) ||
      // Stories and highlights: /stories/<user>/<id> or /stories/highlights/<id>
      /^\/stories\/[^/]+/.test(parsed.pathname)
    );
  } catch {
    return false;
  }
}

export function isValidFacebookUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const validHosts = [
      "facebook.com",
      "www.facebook.com",
      "m.facebook.com",
      "web.facebook.com",
      "mbasic.facebook.com",
      "fb.com",
    ];
    // fb.watch short links: any non-empty path is a video
    if (parsed.hostname === "fb.watch") {
      return parsed.pathname.length > 1;
    }
    const hostOk = validHosts.some(
      (host) => parsed.hostname === host || parsed.hostname.endsWith("." + host)
    );
    if (!hostOk) return false;
    return (
      /\/(?:videos?|watch|reels?|share\/[vr]|video\.php|story\.php|live)(?:\/|$)/i.test(
        parsed.pathname
      ) || parsed.searchParams.has("v")
    );
  } catch {
    return false;
  }
}

export function isValidYouTubeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    // youtu.be short links: /<video-id>
    if (parsed.hostname === "youtu.be") {
      return /^\/[A-Za-z0-9_-]{6,}/.test(parsed.pathname);
    }
    const validHosts = [
      "youtube.com",
      "www.youtube.com",
      "m.youtube.com",
      "music.youtube.com",
    ];
    const hostOk = validHosts.some(
      (host) => parsed.hostname === host || parsed.hostname.endsWith("." + host)
    );
    if (!hostOk) return false;
    if (parsed.pathname === "/watch") {
      return !!parsed.searchParams.get("v");
    }
    return /^\/(?:shorts|embed|live|v)\/[A-Za-z0-9_-]{6,}/.test(
      parsed.pathname
    );
  } catch {
    return false;
  }
}

export function isValidTwitterUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const validHosts = [
      "twitter.com",
      "www.twitter.com",
      "mobile.twitter.com",
      "x.com",
      "www.x.com",
      "mobile.x.com",
    ];
    const hostOk = validHosts.some((host) => parsed.hostname === host);
    if (!hostOk) return false;
    return /^\/(?:[A-Za-z0-9_]+|i\/web)\/status(?:es)?\/\d+/.test(
      parsed.pathname
    );
  } catch {
    return false;
  }
}

/** Pure playlist pages (youtube.com/playlist?list=…) — not watch links. */
export function isYouTubePlaylistUrl(url: string): boolean {
  return extractYouTubePlaylistId(url) !== null;
}

export function extractYouTubePlaylistId(url: string): string | null {
  try {
    const parsed = new URL(url);
    const validHosts = [
      "youtube.com",
      "www.youtube.com",
      "m.youtube.com",
      "music.youtube.com",
    ];
    const hostOk = validHosts.some(
      (host) => parsed.hostname === host || parsed.hostname.endsWith("." + host)
    );
    if (!hostOk || parsed.pathname !== "/playlist") return null;
    const id = parsed.searchParams.get("list");
    return id && /^[A-Za-z0-9_-]{10,60}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

export function isValidRedditUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname;
    // Short links and direct video hosts
    if (host === "redd.it" || host === "v.redd.it") {
      return parsed.pathname.length > 1;
    }
    if (!(host === "reddit.com" || host.endsWith(".reddit.com"))) return false;
    return (
      /\/comments\/[a-z0-9]+/i.test(parsed.pathname) ||
      /^\/r\/[^/]+\/s\/[A-Za-z0-9]+/.test(parsed.pathname)
    );
  } catch {
    return false;
  }
}

export function isValidPinterestUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname;
    if (host === "pin.it") return parsed.pathname.length > 1;
    // pinterest.com plus country domains (pinterest.ca, pinterest.co.uk, …)
    if (!/(^|\.)pinterest\.[a-z]{2,3}(\.[a-z]{2})?$/.test(host)) return false;
    return /^\/pin\/[^/]+/.test(parsed.pathname);
  } catch {
    return false;
  }
}

export type Platform =
  | "tiktok"
  | "instagram"
  | "facebook"
  | "youtube"
  | "twitter"
  | "reddit"
  | "pinterest"
  | null;

export function detectPlatform(url: string): Platform {
  if (isValidTikTokUrl(url)) return "tiktok";
  if (isValidInstagramUrl(url)) return "instagram";
  if (isValidFacebookUrl(url)) return "facebook";
  if (isValidYouTubeUrl(url)) return "youtube";
  if (isValidTwitterUrl(url)) return "twitter";
  if (isValidRedditUrl(url)) return "reddit";
  if (isValidPinterestUrl(url)) return "pinterest";
  return null;
}

export const MAX_BATCH_SIZE = 10;

export interface ExtractedUrls {
  /** Supported, deduped video links in the order they appeared (capped) */
  urls: string[];
  /** How many http(s) links were found but aren't from a supported platform */
  unsupported: number;
  /** True when more supported links were found than the batch cap allows */
  truncated: boolean;
}

/**
 * Pull every supported video link out of a blob of text — pasted lists,
 * share-sheet text, chat messages. Links are deduped and capped at `max`.
 */
export function extractSupportedUrls(
  text: string,
  max = MAX_BATCH_SIZE
): ExtractedUrls {
  const matches = text.match(/https?:\/\/[^\s<>"'`]+/gi) ?? [];
  const seen = new Set<string>();
  const urls: string[] = [];
  let unsupported = 0;
  for (const raw of matches) {
    // Strip punctuation that commonly trails links in prose
    const cleaned = raw.replace(/[),.;\]!?]+$/, "");
    if (!detectPlatform(cleaned)) {
      unsupported++;
      continue;
    }
    if (seen.has(cleaned)) continue;
    seen.add(cleaned);
    urls.push(cleaned);
  }
  return {
    urls: urls.slice(0, max),
    unsupported,
    truncated: urls.length > max,
  };
}

export function isValidUrl(url: string): boolean {
  return detectPlatform(url) !== null;
}
