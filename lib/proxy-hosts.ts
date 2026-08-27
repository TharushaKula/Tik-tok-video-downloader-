// Host allowlist shared by every route that fetches remote media on a
// user-supplied URL (proxy-download, zip). Suffix matching only  a URL is
// allowed when its hostname equals an entry or ends with "." + entry.

export const TIKTOK_HOSTS = [
  "tikwm.com",
  "tiktok.com",
  "tiktokcdn.com",
  "tiktokcdn-us.com",
  "tiktokv.com",
];

// Every non-TikTok platform's media/CDN hosts. Several platforms share CDNs
// (fbcdn serves both Meta apps; rapidcdn tokens front the Snapsave family),
// so the platform hint from the client decides referer and filename.
export const MEDIA_HOSTS = [
  "cdninstagram.com",
  "fbcdn.net",
  "instagram.com",
  "facebook.com",
  "rapidcdn.app",
  "snapcdn.app",
  "snapsave.app",
  "twimg.com",
  "rapidsave.com",
  "redd.it",
  "pinimg.com",
  "pinterest.com",
  "ytimg.com", // YouTube thumbnails
  "sndcdn.com", // SoundCloud audio
  "cloudfront.net", // Twitch clip MP4s
  "ttvnw.net",
  "jtvnw.net",
  "twitch.tv", // Twitch clip thumbnails
];

export const HINTABLE_PLATFORMS = new Set([
  "tiktok",
  "instagram",
  "facebook",
  "twitter",
  "reddit",
  "pinterest",
  "youtube",
  "twitch",
  "soundcloud",
]);

export const REFERERS: Record<string, string> = {
  tiktok: "https://www.tiktok.com/",
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  twitter: "https://x.com/",
  reddit: "https://www.reddit.com/",
  pinterest: "https://www.pinterest.com/",
  youtube: "https://www.youtube.com/",
  twitch: "https://clips.twitch.tv/",
  soundcloud: "https://soundcloud.com/",
};

export function matchHost(hostname: string, suffixes: string[]): boolean {
  return suffixes.some(
    (suffix) => hostname === suffix || hostname.endsWith("." + suffix)
  );
}

export function isAllowedMediaUrl(raw: string): boolean {
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return false;
    }
    return (
      matchHost(parsed.hostname, TIKTOK_HOSTS) ||
      matchHost(parsed.hostname, MEDIA_HOSTS)
    );
  } catch {
    return false;
  }
}

/** Turn arbitrary text into a safe download filename (extension excluded). */
export function sanitizeFilename(raw: string, fallback: string): string {
  const cleaned = raw
    .replace(/[\\/:*?"<>|#%&{}$!'@+`=]/g, " ") // filesystem + header-unsafe
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120)
    .replace(/[. ]+$/, "");
  return cleaned || fallback;
}
