import type { PlatformId } from "./types";

// Single source of truth for how each platform is presented in the UI.
// Colors reference per-platform CSS variables (--p-<name>, defined for both
// themes in globals.css) so dark mode gets bright 400-tier tints and light
// mode gets readable 600-tier ones automatically.
//
// IMPORTANT: every Tailwind class below must be a COMPLETE LITERAL string 
// the JIT compiler only emits CSS for class names it can see verbatim.
export interface PlatformMeta {
  name: string;
  /** Colored identity dot */
  dot: string;
  /** Icon / text tint */
  text: string;
  /** Chip styling when this platform is detected */
  activeChip: string;
  /** Card hover border on the platforms grid */
  hoverBorder: string;
  /** Focus glow color for the URL bar (rgba) */
  glow: string;
  /** What the platform supports, shown in the platforms grid */
  supports: string[];
}

export const PLATFORMS: Record<PlatformId, PlatformMeta> = {
  tiktok: {
    name: "TikTok",
    dot: "bg-[rgb(var(--p-tiktok))]",
    text: "text-[rgb(var(--p-tiktok))]",
    activeChip:
      "border-[rgb(var(--p-tiktok)/0.45)] bg-[rgb(var(--p-tiktok)/0.12)] text-[rgb(var(--p-tiktok))]",
    hoverBorder: "hover:border-[rgb(var(--p-tiktok)/0.35)]",
    glow: "rgba(244, 63, 94, 0.18)",
    supports: ["Videos without watermark", "Photo slideshows", "MP3 audio"],
  },
  instagram: {
    name: "Instagram",
    dot: "bg-[rgb(var(--p-instagram))]",
    text: "text-[rgb(var(--p-instagram))]",
    activeChip:
      "border-[rgb(var(--p-instagram)/0.45)] bg-[rgb(var(--p-instagram)/0.12)] text-[rgb(var(--p-instagram))]",
    hoverBorder: "hover:border-[rgb(var(--p-instagram)/0.35)]",
    glow: "rgba(217, 70, 239, 0.18)",
    supports: ["Reels & video posts", "Photo posts", "Stories & highlights"],
  },
  facebook: {
    name: "Facebook",
    dot: "bg-[rgb(var(--p-facebook))]",
    text: "text-[rgb(var(--p-facebook))]",
    activeChip:
      "border-[rgb(var(--p-facebook)/0.45)] bg-[rgb(var(--p-facebook)/0.12)] text-[rgb(var(--p-facebook))]",
    hoverBorder: "hover:border-[rgb(var(--p-facebook)/0.35)]",
    glow: "rgba(59, 130, 246, 0.18)",
    supports: ["Videos & Reels", "Watch & share links", "HD quality"],
  },
  youtube: {
    name: "YouTube",
    dot: "bg-[rgb(var(--p-youtube))]",
    text: "text-[rgb(var(--p-youtube))]",
    activeChip:
      "border-[rgb(var(--p-youtube)/0.45)] bg-[rgb(var(--p-youtube)/0.12)] text-[rgb(var(--p-youtube))]",
    hoverBorder: "hover:border-[rgb(var(--p-youtube)/0.35)]",
    glow: "rgba(239, 68, 68, 0.18)",
    supports: ["Videos, Shorts & playlists", "MP4 up to 1080p", "MP3 audio"],
  },
  twitter: {
    name: "X (Twitter)",
    dot: "bg-[rgb(var(--p-twitter))]",
    text: "text-[rgb(var(--p-twitter))]",
    activeChip:
      "border-[rgb(var(--p-twitter)/0.45)] bg-[rgb(var(--p-twitter)/0.12)] text-[rgb(var(--p-twitter))]",
    hoverBorder: "hover:border-[rgb(var(--p-twitter)/0.35)]",
    glow: "rgba(14, 165, 233, 0.18)",
    supports: ["Tweet videos", "GIFs as MP4", "HD quality"],
  },
  reddit: {
    name: "Reddit",
    dot: "bg-[rgb(var(--p-reddit))]",
    text: "text-[rgb(var(--p-reddit))]",
    activeChip:
      "border-[rgb(var(--p-reddit)/0.45)] bg-[rgb(var(--p-reddit)/0.12)] text-[rgb(var(--p-reddit))]",
    hoverBorder: "hover:border-[rgb(var(--p-reddit)/0.35)]",
    glow: "rgba(249, 115, 22, 0.18)",
    supports: ["Videos with sound", "GIFs as MP4", "Share links & redd.it"],
  },
  pinterest: {
    name: "Pinterest",
    dot: "bg-[rgb(var(--p-pinterest))]",
    text: "text-[rgb(var(--p-pinterest))]",
    activeChip:
      "border-[rgb(var(--p-pinterest)/0.45)] bg-[rgb(var(--p-pinterest)/0.12)] text-[rgb(var(--p-pinterest))]",
    hoverBorder: "hover:border-[rgb(var(--p-pinterest)/0.35)]",
    glow: "rgba(225, 29, 72, 0.18)",
    supports: ["Video pins", "Image pins in HD", "pin.it short links"],
  },
  twitch: {
    name: "Twitch",
    dot: "bg-[rgb(var(--p-twitch))]",
    text: "text-[rgb(var(--p-twitch))]",
    activeChip:
      "border-[rgb(var(--p-twitch)/0.45)] bg-[rgb(var(--p-twitch)/0.12)] text-[rgb(var(--p-twitch))]",
    hoverBorder: "hover:border-[rgb(var(--p-twitch)/0.35)]",
    glow: "rgba(145, 70, 255, 0.18)",
    supports: ["Clips in HD", "Up to 1080p", "clips.twitch.tv links"],
  },
  soundcloud: {
    name: "SoundCloud",
    dot: "bg-[rgb(var(--p-soundcloud))]",
    text: "text-[rgb(var(--p-soundcloud))]",
    activeChip:
      "border-[rgb(var(--p-soundcloud)/0.45)] bg-[rgb(var(--p-soundcloud)/0.12)] text-[rgb(var(--p-soundcloud))]",
    hoverBorder: "hover:border-[rgb(var(--p-soundcloud)/0.35)]",
    glow: "rgba(255, 85, 0, 0.18)",
    supports: ["Tracks as MP3", "Original quality", "Cover art"],
  },
};

export const PLATFORM_IDS: PlatformId[] = [
  "tiktok",
  "instagram",
  "facebook",
  "youtube",
  "twitter",
  "reddit",
  "pinterest",
  "twitch",
  "soundcloud",
];
