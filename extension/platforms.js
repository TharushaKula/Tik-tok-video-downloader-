// Compact platform detection for the extension. Mirrors lib/validators.ts on
// the site; the site remains the source of truth (it re-validates on fetch),
// so this only needs to be good enough to label pages and enable the button.

export const PLATFORMS = {
  tiktok: { name: "TikTok", color: "#f43f5e" },
  instagram: { name: "Instagram", color: "#d946ef" },
  facebook: { name: "Facebook", color: "#3b82f6" },
  youtube: { name: "YouTube", color: "#ef4444" },
  twitter: { name: "X (Twitter)", color: "#38bdf8" },
  reddit: { name: "Reddit", color: "#f97316" },
  pinterest: { name: "Pinterest", color: "#ec4899" },
  twitch: { name: "Twitch", color: "#a78bfa" },
  soundcloud: { name: "SoundCloud", color: "#fb923c" },
};

function host(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function path(url) {
  try {
    return new URL(url).pathname;
  } catch {
    return "";
  }
}

/**
 * Returns a platform id when the URL looks like a downloadable post/page
 * SnapLoad can handle (including YouTube playlists and channels, which the
 * site expands into batches), or null.
 */
export function detectPlatform(url) {
  const h = host(url);
  const p = path(url);
  if (!h) return null;

  if (h === "vm.tiktok.com" || h === "vt.tiktok.com") {
    return p.length > 1 ? "tiktok" : null;
  }
  if (h === "tiktok.com" || h === "m.tiktok.com") {
    if (/^\/@[^/]+\/(?:video|photo)\/\d+/.test(p)) return "tiktok";
    if (/^\/(?:v|t|embed)\/[A-Za-z0-9._-]+/.test(p)) return "tiktok";
    return null;
  }
  if (h === "instagram.com" || h.endsWith(".instagram.com")) {
    return /^\/(?:reel|reels|p|tv|stories)\//.test(p) ? "instagram" : null;
  }
  if (h === "fb.watch") return p.length > 1 ? "facebook" : null;
  if (h === "facebook.com" || h.endsWith(".facebook.com")) {
    return /watch|video|reel|\/share\/|story\.php/.test(url) ? "facebook" : null;
  }
  if (h === "youtu.be") return p.length > 1 ? "youtube" : null;
  if (h === "youtube.com" || h.endsWith(".youtube.com")) {
    if (/^\/(?:watch|shorts\/|playlist)/.test(p) || p.startsWith("/live/"))
      return "youtube";
    // Channels: the site expands these into a batch of latest uploads
    if (/^\/(?:@[^/]+|channel\/|c\/|user\/)/.test(p)) return "youtube";
    return null;
  }
  if (h === "x.com" || h === "twitter.com" || h.endsWith(".twitter.com")) {
    return /^\/[^/]+\/status\/\d+/.test(p) ? "twitter" : null;
  }
  if (h === "redd.it") return p.length > 1 ? "reddit" : null;
  if (h === "reddit.com" || h.endsWith(".reddit.com")) {
    return /\/comments\/|\/s\//.test(p) ? "reddit" : null;
  }
  if (h === "pin.it") return p.length > 1 ? "pinterest" : null;
  if (h === "pinterest.com" || /(^|\.)pinterest\.[a-z.]+$/.test(h)) {
    return /^\/pin\//.test(p) ? "pinterest" : null;
  }
  if (h === "clips.twitch.tv") return p.length > 1 ? "twitch" : null;
  if (h === "twitch.tv" || h.endsWith(".twitch.tv")) {
    return /^\/[^/]+\/clip\//.test(p) ? "twitch" : null;
  }
  if (h === "soundcloud.com" || h === "on.soundcloud.com") {
    return p.split("/").filter(Boolean).length >= 1 ? "soundcloud" : null;
  }
  return null;
}

export const DEFAULT_BASE_URL = "https://snapload.app";

/** The SnapLoad deep link that prefills and auto-fetches a URL. */
export function snapLoadUrl(base, videoUrl) {
  const origin = (base || DEFAULT_BASE_URL).replace(/\/+$/, "");
  return `${origin}/?url=${encodeURIComponent(videoUrl)}`;
}
