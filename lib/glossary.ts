// Plain-English definitions of the terms people meet when downloading video.
// Each entry is short, accurate, and links back to where the concept shows
// up in ClipKoala. Sorted alphabetically at render time.

export interface GlossaryTerm {
  term: string;
  slug: string;
  definition: string;
  /** Optional related page */
  link?: { href: string; label: string };
}

export const GLOSSARY: GlossaryTerm[] = [
  {
    term: "Bitrate",
    slug: "bitrate",
    definition:
      "How much data is used per second of audio or video, usually measured in kilobits per second (kbps). Higher bitrate means more detail and a larger file. MP3 tops out at 320kbps, which is what ClipKoala uses for YouTube audio.",
    link: { href: "/youtube-to-mp3", label: "YouTube to MP3" },
  },
  {
    term: "Batch download",
    slug: "batch-download",
    definition:
      "Downloading several files in one operation instead of one at a time. In ClipKoala, pasting two or more links switches the tool into batch mode, which fetches up to 10 links in parallel.",
    link: { href: "/batch-video-downloader", label: "Batch downloader" },
  },
  {
    term: "Carousel",
    slug: "carousel",
    definition:
      "An Instagram post that contains several photos or videos you swipe through. ClipKoala lists every item in a carousel separately and offers a ZIP of the whole set.",
    link: { href: "/instagram-downloader", label: "Instagram downloader" },
  },
  {
    term: "Codec",
    slug: "codec",
    definition:
      "The method used to compress and decompress video or audio, such as H.264 for video or AAC for audio. The codec lives inside a container format like MP4. Almost every device plays H.264 in MP4, which is why ClipKoala saves video that way.",
  },
  {
    term: "Container format",
    slug: "container-format",
    definition:
      "The file type that wraps compressed video and audio streams together, for example MP4, MKV, or WebM. The container is what the file extension refers to; the codec inside can vary.",
  },
  {
    term: "Deep link",
    slug: "deep-link",
    definition:
      "A URL that opens a specific screen or pre-fills specific data. ClipKoala's /?url= deep link prefills and fetches a video automatically; the browser extension and QR phone handoff use it.",
    link: { href: "/extension", label: "Browser extension" },
  },
  {
    term: "FLAC",
    slug: "flac",
    definition:
      "Free Lossless Audio Codec. Compresses audio without discarding any detail, so the result is identical to the original at roughly half the size of WAV. Ideal for archiving music; not every phone plays it natively.",
    link: { href: "/youtube-to-mp3", label: "YouTube to MP3" },
  },
  {
    term: "HD, Full HD, and SD",
    slug: "hd-full-hd-sd",
    definition:
      "Resolution tiers. SD (standard definition) is 480p or lower, HD is 720p, and Full HD is 1080p. Higher resolution shows more detail on large screens but produces bigger files.",
  },
  {
    term: "M4A",
    slug: "m4a",
    definition:
      "An audio-only file in the MPEG-4 container, usually holding AAC audio. Sounds similar to MP3 at smaller sizes and is the native format for Apple devices.",
  },
  {
    term: "MP3",
    slug: "mp3",
    definition:
      "The most widely supported compressed audio format. Discards some inaudible detail to keep files small. At 320kbps the loss is very hard to hear, which is why ClipKoala encodes MP3s at that rate.",
  },
  {
    term: "MP4",
    slug: "mp4",
    definition:
      "The most widely supported video container. Plays on every phone, computer, TV, and editing app. All ClipKoala video downloads are MP4.",
  },
  {
    term: "Muxing",
    slug: "muxing",
    definition:
      "Combining separate video and audio streams into one file. Reddit and YouTube serve picture and sound separately; ClipKoala muxes them on the server so the download plays with sound everywhere.",
    link: { href: "/reddit-downloader", label: "Reddit downloader" },
  },
  {
    term: "Photo slideshow",
    slug: "photo-slideshow",
    definition:
      "A TikTok post made of still images set to music rather than a video. ClipKoala saves every slide as an image, the soundtrack as MP3, and the whole set as a ZIP.",
    link: { href: "/tiktok-downloader", label: "TikTok downloader" },
  },
  {
    term: "Progressive Web App (PWA)",
    slug: "pwa",
    definition:
      "A website that can be installed like an app, with its own icon and, on Android, a place in the share sheet. ClipKoala is a PWA, so you can share a TikTok or Reel straight into it.",
  },
  {
    term: "Resolver",
    slug: "resolver",
    definition:
      "The server-side component that turns a public post link into direct media URLs and metadata. ClipKoala runs one resolver per platform and shows their live health on the status page.",
    link: { href: "/status", label: "Status page" },
  },
  {
    term: "Share link / short link",
    slug: "share-link",
    definition:
      "The shortened URL an app produces when you tap Share, such as vm.tiktok.com, youtu.be, fb.watch, pin.it, or redd.it links. ClipKoala accepts these and follows them to the original post.",
  },
  {
    term: "WAV",
    slug: "wav",
    definition:
      "Uncompressed audio. Perfect fidelity and very large files (about 10 MB per minute). Useful when you plan to edit the audio; otherwise FLAC gives the same quality at half the size.",
  },
  {
    term: "Watermark",
    slug: "watermark",
    definition:
      "A logo or username overlaid on a video, like the bouncing TikTok logo on videos saved through the app. ClipKoala fetches the clean original file, so no watermark is ever present.",
    link: { href: "/tiktok-downloader", label: "TikTok downloader" },
  },
];

export const GLOSSARY_SORTED = [...GLOSSARY].sort((a, b) =>
  a.term.localeCompare(b.term)
);
