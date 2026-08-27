import type { PlatformId } from "./types";

// Single source of truth for how each platform is presented in the UI.
// All Tailwind classes are complete literals so the JIT compiler sees them.
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
    dot: "bg-rose-400",
    text: "text-rose-400",
    activeChip: "border-rose-400/40 bg-rose-400/10 text-rose-300",
    hoverBorder: "hover:border-rose-400/30",
    glow: "rgba(251, 113, 133, 0.18)",
    supports: ["Videos without watermark", "HD & SD quality", "MP3 audio"],
  },
  instagram: {
    name: "Instagram",
    dot: "bg-fuchsia-400",
    text: "text-fuchsia-400",
    activeChip: "border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-300",
    hoverBorder: "hover:border-fuchsia-400/30",
    glow: "rgba(232, 121, 249, 0.18)",
    supports: ["Reels & video posts", "Photo posts", "HD quality"],
  },
  facebook: {
    name: "Facebook",
    dot: "bg-blue-400",
    text: "text-blue-400",
    activeChip: "border-blue-400/40 bg-blue-400/10 text-blue-300",
    hoverBorder: "hover:border-blue-400/30",
    glow: "rgba(96, 165, 250, 0.18)",
    supports: ["Videos & Reels", "Watch & share links", "HD quality"],
  },
  youtube: {
    name: "YouTube",
    dot: "bg-red-500",
    text: "text-red-500",
    activeChip: "border-red-400/40 bg-red-400/10 text-red-300",
    hoverBorder: "hover:border-red-400/30",
    glow: "rgba(248, 113, 113, 0.18)",
    supports: ["Videos & Shorts", "MP4 up to 1080p", "MP3 audio"],
  },
  twitter: {
    name: "X (Twitter)",
    dot: "bg-sky-400",
    text: "text-sky-400",
    activeChip: "border-sky-400/40 bg-sky-400/10 text-sky-300",
    hoverBorder: "hover:border-sky-400/30",
    glow: "rgba(56, 189, 248, 0.18)",
    supports: ["Tweet videos", "GIFs as MP4", "HD quality"],
  },
  reddit: {
    name: "Reddit",
    dot: "bg-orange-400",
    text: "text-orange-400",
    activeChip: "border-orange-400/40 bg-orange-400/10 text-orange-300",
    hoverBorder: "hover:border-orange-400/30",
    glow: "rgba(251, 146, 60, 0.18)",
    supports: ["Videos with sound", "GIFs as MP4", "Share links & redd.it"],
  },
  pinterest: {
    name: "Pinterest",
    dot: "bg-red-400",
    text: "text-red-400",
    activeChip: "border-red-400/40 bg-red-400/10 text-red-300",
    hoverBorder: "hover:border-red-400/30",
    glow: "rgba(248, 113, 113, 0.18)",
    supports: ["Video pins", "Image pins in HD", "pin.it short links"],
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
];
