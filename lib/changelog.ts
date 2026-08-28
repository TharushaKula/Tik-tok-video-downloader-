export interface ChangelogEntry {
  date: string; // ISO date
  title: string;
  items: string[];
}

// Newest first. Keep entries short and user-facing.
export const CHANGELOG: ChangelogEntry[] = [
  {
    date: "2026-08-28",
    title: "A browser extension",
    items: [
      "New Chrome/Edge extension: one click sends the video you're watching straight to SnapLoad",
      "Right-click any link and choose Download with SnapLoad",
      "Privacy-first: no tracking, no access to your browsing, it only acts when you click",
    ],
  },
  {
    date: "2026-08-28",
    title: "A faster, more secure engine",
    items: [
      "SnapLoad now runs on the latest web stack (Next.js 16 + React 19): pages build and load faster",
      "Every known dependency vulnerability is cleared  0 audit findings",
    ],
  },
  {
    date: "2026-08-28",
    title: "How-to guides, and a gentle chime",
    items: [
      "New Guides section: step-by-step walkthroughs for watermark-free TikToks, YouTube to MP3, Reels, X, Facebook, and batch downloading",
      "A soft chime and a phone vibration tell you when a conversion finishes (toggle it in the command palette)",
    ],
  },
  {
    date: "2026-08-27",
    title: "A status page, and link lists",
    items: [
      "New status page shows live health for every platform, so you can tell if a problem is on our side",
      "Import a .txt or .csv of links into a batch, or just drop the file anywhere on the page",
      "YouTube MP3s are confirmed max-quality 320kbps, now labeled as such",
    ],
  },
  {
    date: "2026-08-27",
    title: "More audio formats, and a personal tally",
    items: [
      "YouTube audio now downloads as MP3, M4A, WAV, or lossless FLAC",
      "A quiet counter shows how many videos you've saved, and from where",
    ],
  },
  {
    date: "2026-08-27",
    title: "Organize your saves, and hop to your phone",
    items: [
      "Tag saved videos and filter your Saved list by tag",
      "Send any video to your phone: scan a QR code to continue the download there",
    ],
  },
  {
    date: "2026-08-27",
    title: "A command palette, and the fine print",
    items: [
      "Press Cmd/Ctrl+K to open a command palette: search, jump to saved and recent videos, switch theme, or navigate anywhere",
      "Added proper Terms, Privacy, and Copyright/DMCA pages",
    ],
  },
  {
    date: "2026-08-27",
    title: "Paste, drop, or just switch tabs",
    items: [
      "Drag a link from any window and drop it anywhere on the page",
      "Paste anywhere on the page, no need to click the link box first",
      "Copied a link elsewhere? We offer to fetch it the moment you return",
    ],
  },
  {
    date: "2026-08-27",
    title: "Whole channels & custom filenames",
    items: [
      "Paste a YouTube channel or @handle to grab its latest uploads as a batch",
      "Name your downloads your way with a custom filename pattern",
      "A first-visit tip helps newcomers get started",
    ],
  },
  {
    date: "2026-08-27",
    title: "Twitch, SoundCloud & saved videos",
    items: [
      "Download Twitch clips as MP4 in up to 1080p",
      "Save SoundCloud tracks as MP3 with cover art",
      "Star any video to keep it in your Saved list for later",
      "Light and dark themes with a system-aware toggle",
    ],
  },
  {
    date: "2026-08-27",
    title: "Bundles, smart filenames & thumbnails",
    items: [
      "Photo carousels and slideshows can now be saved in one click as a ZIP",
      "Downloads are named after the video title instead of generic filenames",
      "New thumbnail button saves any video's cover image in full quality",
      "Light theme with a system-aware toggle in the navbar",
    ],
  },
  {
    date: "2026-08-27",
    title: "Reddit, Pinterest & playlists",
    items: [
      "Reddit videos download with sound (video and audio merged automatically)",
      "Pinterest video and image pins, including pin.it short links",
      "YouTube playlists expand into a batch of their latest videos",
      "Instagram Stories and Highlights links are now accepted",
      "TikTok automatically fails over to a backup resolver when the primary is down",
      "Get notified when a YouTube conversion finishes while you're in another tab",
    ],
  },
  {
    date: "2026-08-27",
    title: "X (Twitter), slideshows & live progress",
    items: [
      "X (Twitter) videos and GIFs are now supported",
      "TikTok photo slideshows download as images plus the soundtrack",
      "YouTube conversions show live progress right on the button",
      "Preview videos in the result card before saving",
      "Install SnapLoad as an app and share links straight into it from Android",
      "Dedicated downloader pages for every platform",
    ],
  },
  {
    date: "2026-08-27",
    title: "Batch downloads",
    items: [
      "Paste several links at once  they fetch in parallel with per-video status",
      "Save all grabs the best quality for every video in the batch",
      "Failed fetches can be retried individually",
    ],
  },
  {
    date: "2026-08-27",
    title: "A brand-new SnapLoad",
    items: [
      "Complete redesign: cleaner, faster, and easier to use",
      "Paste-to-fetch: a copied link starts fetching the moment you paste it",
      "Recent downloads let you re-fetch anything with one click",
      "YouTube support with quality selection up to 1080p and MP3",
      "Facebook videos and Reels, including fb.watch and share links",
    ],
  },
];
