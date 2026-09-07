// Feature catalogue used by the home page highlights and the /features page.
// Icons are referenced by name and mapped to lucide components at render time
// so this file stays plain data.

export type FeatureIcon =
  | "eraser"
  | "sparkles"
  | "music"
  | "layers"
  | "shield"
  | "gauge"
  | "clipboard"
  | "star"
  | "smartphone"
  | "puzzle"
  | "file"
  | "activity";

export interface Feature {
  icon: FeatureIcon;
  title: string;
  body: string;
  href?: string;
}

/** The six shown on the home page */
export const HOME_FEATURES: Feature[] = [
  {
    icon: "eraser",
    title: "No watermarks",
    body: "TikTok videos arrive as the clean original file. Nothing is cropped, blurred, or re-encoded.",
    href: "/tiktok-downloader",
  },
  {
    icon: "sparkles",
    title: "Best quality available",
    body: "HD and Full HD up to 1080p, chosen per download. You always see what you are getting before you save.",
  },
  {
    icon: "music",
    title: "Audio in any format",
    body: "MP3 at 320kbps, M4A, WAV, or lossless FLAC from YouTube. MP3 soundtracks from TikTok and SoundCloud.",
    href: "/youtube-to-mp3",
  },
  {
    icon: "layers",
    title: "Batch downloads",
    body: "Paste up to 10 links, import a .txt or .csv, or drop a YouTube playlist. Save all in one click.",
    href: "/batch-video-downloader",
  },
  {
    icon: "shield",
    title: "Private by design",
    body: "No account, no logs tied to you, nothing stored. Your history lives only in your browser.",
    href: "/privacy",
  },
  {
    icon: "gauge",
    title: "Fast on any device",
    body: "Results in about two seconds. A lightweight page that works on slow connections and old phones.",
  },
];

export interface FeatureGroup {
  title: string;
  lede: string;
  features: Feature[];
}

/** The full catalogue for /features */
export const FEATURE_GROUPS: FeatureGroup[] = [
  {
    title: "Downloading",
    lede: "The core of ClipKoala: paste a link, get the best file the platform offers.",
    features: [
      HOME_FEATURES[0],
      HOME_FEATURES[1],
      HOME_FEATURES[2],
      {
        icon: "layers",
        title: "Carousels and slideshows as ZIP",
        body: "Instagram carousels and TikTok photo slideshows list every item, plus a one-click ZIP of the whole set.",
        href: "/instagram-downloader",
      },
      {
        icon: "file",
        title: "Thumbnails and cover art",
        body: "Save any video's cover image in full quality, or a SoundCloud track's artwork, with one button.",
      },
      {
        icon: "sparkles",
        title: "In-page preview",
        body: "Play the video inside the result card before you download, with seeking, on every platform except YouTube.",
      },
    ],
  },
  {
    title: "Speed and scale",
    lede: "Built to save one clip in seconds or a whole playlist while you make coffee.",
    features: [
      HOME_FEATURES[3],
      {
        icon: "layers",
        title: "Playlists and channels",
        body: "Paste a YouTube playlist, channel, or @handle and its latest videos queue up as a batch.",
        href: "/youtube-downloader",
      },
      {
        icon: "clipboard",
        title: "Paste, drop, or share",
        body: "Paste anywhere on the page, drag a link or a link file onto it, or share into the installed app on Android. Copied a link before opening the page? We offer to fetch it.",
      },
      {
        icon: "gauge",
        title: "Live conversion progress",
        body: "YouTube conversions show progress right on the button, and a notification fires if you switch tabs. A soft chime tells you when a file is ready.",
      },
    ],
  },
  {
    title: "Organization",
    lede: "Small touches that make the tool pleasant to come back to.",
    features: [
      {
        icon: "star",
        title: "Saved videos with tags",
        body: "Star anything to keep it in a Saved list, tag it into collections, and re-fetch it later with one click.",
      },
      {
        icon: "clipboard",
        title: "Recent history",
        body: "Your last downloads are one click away. Stored only in your browser, cleared whenever you like.",
      },
      {
        icon: "file",
        title: "Custom filename patterns",
        body: "Name downloads with the title, author, platform, quality, or date using a simple template.",
      },
      {
        icon: "smartphone",
        title: "Send to phone",
        body: "Scan a QR code to continue any download on another device, already fetched and ready to save.",
      },
    ],
  },
  {
    title: "Trust",
    lede: "A downloader you can recommend to someone who is not technical.",
    features: [
      HOME_FEATURES[4],
      {
        icon: "activity",
        title: "Public status page",
        body: "Live health checks for every platform, refreshed every few minutes, so you can tell whether a problem is on our side.",
        href: "/status",
      },
      {
        icon: "puzzle",
        title: "Browser extension",
        body: "One click sends the video you are watching to ClipKoala. Manifest V3, no tracking, no access to your browsing.",
        href: "/extension",
      },
      {
        icon: "shield",
        title: "Accessible and considerate",
        body: "Keyboard shortcuts, a command palette, focus states, reduced-motion support, and light and dark themes.",
      },
    ],
  },
];
