// Single source of truth for the ClipKoala brand and public origin.
//
// Set NEXT_PUBLIC_SITE_URL in the Vercel project if you ever deploy to a
// different origin (preview environments, a staging domain). Sitemaps,
// canonicals, Open Graph URLs, and structured data all derive from it.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://clipkoala.com"
).replace(/\/+$/, "");

export const SITE = {
  name: "ClipKoala",
  domain: "clipkoala.com",
  url: SITE_URL,
  tagline: "Save any clip. Keep it clean.",
  /** One-line positioning used in default metadata and the manifest */
  description:
    "ClipKoala is a free online video downloader for TikTok, YouTube, Instagram, Facebook, X, Reddit, Pinterest, Twitch, and SoundCloud. Save videos in HD without watermarks, or grab the audio as MP3. No sign-up, no limits.",
  /** Short description for app stores, manifest, and the extension */
  shortDescription:
    "Free video downloader for TikTok, YouTube, Instagram, and six more platforms. HD, watermark-free, MP3. No sign-up.",
  /**
   * Public contact address printed on the legal pages. Make sure this
   * mailbox exists (or forwards) before launch.
   */
  contactEmail: "support@clipkoala.com",
  /** Year the product launched, used in the Organization schema */
  foundingYear: "2026",
  /** Locale for Open Graph */
  locale: "en_US",
  /** Number of supported platforms, kept in copy across the site */
  platformCount: 9,
} as const;

/** localStorage key prefix. Legacy "snapload:" keys are migrated on load. */
export const STORAGE_PREFIX = "clipkoala:";
export const LEGACY_STORAGE_PREFIX = "snapload:";

/** Build an absolute URL on the public origin. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
