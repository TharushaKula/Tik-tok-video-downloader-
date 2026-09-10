import type { PlatformId } from "./types";

// Copy for every tool landing page. Nine platform pages plus intent pages
// ("YouTube to MP3", "batch downloader") that share the same renderer.
// Each page targets one distinct search intent; the body sections exist so
// the page answers the query properly rather than only wrapping the tool.

export interface LandingSection {
  heading: string;
  body: string[];
}

export interface LandingCopy {
  slug: string;
  /** Accent platform; null for cross-platform intent pages */
  platform: PlatformId | null;
  /** Short label used in navigation, footer, and command palette */
  name: string;
  /** <title> without the brand suffix */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  sub: string;
  /** What this downloader handles, shown as a check strip */
  highlights: string[];
  /** Supporting content that answers the search intent */
  sections: LandingSection[];
  faqs: { q: string; a: string }[];
  /** Related guides (slugs under /guides) */
  guides: string[];
  /** Related landing pages to cross-link first */
  related: string[];
  /** Problem and comparison pages under /answers worth linking in-sentence */
  answers?: string[];
  /** ISO date of the last meaningful copy change */
  updated: string;
}

export const LANDING_PAGES: Record<string, LandingCopy> = {
  "tiktok-downloader": {
    slug: "tiktok-downloader",
    platform: "tiktok",
    name: "TikTok Downloader",
    metaTitle: "TikTok Video Downloader Without Watermark (HD, Free)",
    metaDescription:
      "Download TikTok videos without a watermark in HD, save photo slideshows, or extract the sound as MP3. Free, fast, no sign-up or app needed.",
    h1: "Download TikTok videos without the watermark",
    sub: "Paste any TikTok link and save the clean HD original. Photo slideshows and MP3 soundtracks included.",
    highlights: [
      "No watermark, ever",
      "HD and SD quality",
      "Photo slideshows as images",
      "Soundtrack as MP3",
    ],
    sections: [
      {
        heading: "Why the watermark is gone, not hidden",
        body: [
          "TikTok's own Save video button burns a moving watermark into the file. ClipKoala fetches the original clean version TikTok stores before the watermark is applied, so nothing is cropped, blurred, or re-encoded. You get the same resolution and bitrate the creator uploaded.",
          "Every result offers HD and SD MP4 files, and an MP3 of the soundtrack. Photo slideshows show each slide as a separate image with a one-click ZIP for the whole set.",
        ],
      },
      {
        heading: "Which TikTok links work",
        body: [
          "Full video links (tiktok.com/@user/video/...), short share links from the app (vm.tiktok.com and vt.tiktok.com), and photo slideshow links. Private, friends-only, and deleted videos cannot be fetched.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I download a TikTok without the watermark?",
        a: "Open TikTok, tap Share on the video, choose Copy link, and paste it into ClipKoala. Pick Download HD and the watermark-free MP4 saves to your device. No editing or cropping is involved.",
      },
      {
        q: "Can I download TikTok photo slideshows?",
        a: "Yes. Paste a slideshow link and every slide appears as a separate image download, along with the soundtrack as MP3 and a Download all as ZIP button.",
      },
      {
        q: "Can I save just the sound from a TikTok?",
        a: "Yes. Every TikTok result includes a Download Audio option that saves the soundtrack as an MP3 file.",
      },
      {
        q: "Does it work on iPhone and Android?",
        a: "Yes. ClipKoala runs in any mobile browser. On Android you can also install it as an app and share TikToks straight into it from the share sheet.",
      },
    ],
    guides: ["how-to-download-tiktok-videos-without-watermark"],
    answers: ["tiktok-save-greyed-out", "link-not-supported"],
    related: ["instagram-downloader", "youtube-downloader", "batch-video-downloader"],
    updated: "2026-09-07",
  },

  "instagram-downloader": {
    slug: "instagram-downloader",
    platform: "instagram",
    name: "Instagram Downloader",
    metaTitle: "Instagram Reels & Video Downloader (HD, No Login)",
    metaDescription:
      "Download Instagram Reels, videos, photos, carousels, and public Stories in full quality. Free, fast, no login and no app required.",
    h1: "Download Instagram Reels, videos, and photos in HD",
    sub: "Paste a Reel, post, carousel, or public Story link and save the full-quality original to your device.",
    highlights: [
      "Reels and video posts",
      "Photos and carousels",
      "Public Stories and Highlights",
      "No login required",
    ],
    sections: [
      {
        heading: "Everything Instagram lets you see, saved properly",
        body: [
          "Instagram only offers in-app bookmarks, which vanish when a post is deleted. ClipKoala gives you a real file: Reels and videos as MP4 in the highest quality Instagram serves, photos as full-resolution JPGs, and carousels with every item listed plus a ZIP of the whole set.",
          "Public Stories and Highlights work while they are live. Nothing requires your Instagram account, and we never ask for a password.",
        ],
      },
      {
        heading: "Which Instagram links work",
        body: [
          "instagram.com/reel/..., instagram.com/p/..., instagram.com/tv/..., story links, and highlight links from public accounts. Posts from private accounts cannot be fetched, by design.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I download an Instagram Reel?",
        a: "Tap the three dots or the Share arrow on the Reel, choose Copy link, and paste it into ClipKoala. The HD MP4 is ready in seconds.",
      },
      {
        q: "Do I need to log in to Instagram?",
        a: "No. ClipKoala works with any public post without your account. We never ask for credentials.",
      },
      {
        q: "Can I download from a private account?",
        a: "No. Only public posts, Reels, and Stories can be fetched. Private and followers-only content stays private.",
      },
      {
        q: "Can I save a whole carousel at once?",
        a: "Yes. Each photo and video in the carousel is listed separately, and a Download all as ZIP button bundles the whole post into one file.",
      },
    ],
    guides: ["how-to-download-instagram-reels"],
    answers: ["instagram-story-expired", "private-post-error"],
    related: ["tiktok-downloader", "facebook-downloader", "pinterest-downloader"],
    updated: "2026-09-07",
  },

  "facebook-downloader": {
    slug: "facebook-downloader",
    platform: "facebook",
    name: "Facebook Downloader",
    metaTitle: "Facebook Video Downloader: Videos & Reels in HD",
    metaDescription:
      "Download Facebook videos and Reels in HD, including fb.watch and share links. Free, no sign-up, works in your browser on any device.",
    h1: "Download Facebook videos and Reels in HD",
    sub: "Works with watch links, share links, fb.watch short links, and Reels. Saved in the best quality Facebook serves.",
    highlights: [
      "Videos and Reels",
      "fb.watch and share links",
      "HD when available",
      "No account needed",
    ],
    sections: [
      {
        heading: "From a watch-later list to a file you own",
        body: [
          "Facebook lets you save videos to a list inside Facebook, but not to your phone or computer. Paste any public video link into ClipKoala and you get a normal MP4: HD when Facebook provides it, SD as a smaller alternative.",
          "Live streams can be saved once the broadcast has ended and the replay is public. Reels work exactly like regular videos.",
        ],
      },
      {
        heading: "Which Facebook links work",
        body: [
          "facebook.com/watch links, video post links, Reel links, facebook.com/share/v/... links, and fb.watch short links. Videos inside private groups, events, or friends-only posts cannot be fetched.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which Facebook links work?",
        a: "Video pages, /watch links, Reels, share links (facebook.com/share/v/...), and fb.watch short links. Paste whichever the app gives you.",
      },
      {
        q: "Why does it say the video is private?",
        a: "Only public videos can be fetched. Videos restricted to friends, groups, or logged-in viewers cannot be accessed. That is intentional.",
      },
      {
        q: "What quality do I get?",
        a: "The best quality Facebook serves for that video, typically HD 720p or 1080p when available, with an SD option for smaller files.",
      },
    ],
    guides: ["how-to-download-facebook-videos"],
    answers: ["private-post-error", "link-not-supported"],
    related: ["instagram-downloader", "youtube-downloader", "twitter-downloader"],
    updated: "2026-09-07",
  },

  "youtube-downloader": {
    slug: "youtube-downloader",
    platform: "youtube",
    name: "YouTube Downloader",
    metaTitle: "YouTube Video Downloader: MP4 up to 1080p & MP3",
    metaDescription:
      "Download YouTube videos and Shorts as MP4 in 360p to 1080p, or convert to MP3 audio. Live conversion progress, free and unlimited, no software to install.",
    h1: "Download YouTube videos and Shorts",
    sub: "Pick your quality, from 360p to Full HD 1080p, or convert straight to MP3 with live progress. Playlists and channels queue up as a batch.",
    highlights: [
      "Videos and Shorts",
      "MP4 up to 1080p",
      "MP3, M4A, WAV, FLAC audio",
      "Playlists and channels",
    ],
    sections: [
      {
        heading: "Quality you choose, converted on demand",
        body: [
          "YouTube streams video and audio separately, so a downloader has to merge them. ClipKoala does that on the fly at the quality you pick, from 360p up to 1080p, and shows live progress right on the button. Most files are ready within seconds; long HD videos can take up to a minute.",
          "Prefer audio? Choose MP3 at 320kbps, M4A, WAV, or lossless FLAC. Paste a playlist or channel link and its latest videos line up as a batch you can save in one click.",
        ],
      },
      {
        heading: "Which YouTube links work",
        body: [
          "youtube.com/watch, youtu.be short links, youtube.com/shorts, playlist links, and channel or @handle links. Age-restricted, members-only, and private videos cannot be fetched.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I convert a YouTube video to MP3?",
        a: "Paste the video link, then choose Download MP3. The audio is converted at 320kbps and saved to your downloads. See the dedicated YouTube to MP3 page for details on M4A, WAV, and FLAC.",
      },
      {
        q: "Why does the download take a moment to start?",
        a: "YouTube files are converted to your chosen quality on demand. You will see live progress on the button; most files are ready within seconds.",
      },
      {
        q: "Do Shorts and playlists work?",
        a: "Yes. youtube.com/shorts links download like any video, and playlist or channel links expand into a batch of their latest videos.",
      },
      {
        q: "Can I download 4K YouTube videos?",
        a: "Not yet. Downloads go up to 1080p Full HD, which covers the large majority of use cases while keeping conversions fast.",
      },
    ],
    guides: ["how-to-convert-youtube-to-mp3", "how-to-batch-download-videos"],
    answers: ["youtube-mp3-sounds-bad", "downloader-not-working"],
    related: ["youtube-to-mp3", "batch-video-downloader", "tiktok-downloader"],
    updated: "2026-09-07",
  },

  "youtube-to-mp3": {
    slug: "youtube-to-mp3",
    platform: "youtube",
    name: "YouTube to MP3",
    metaTitle: "YouTube to MP3 Converter: Free, 320kbps, No Software",
    metaDescription:
      "Convert YouTube videos to MP3 at 320kbps, or to M4A, WAV, and lossless FLAC. Free online converter with live progress, no sign-up and nothing to install.",
    h1: "Convert YouTube to MP3, free and at full quality",
    sub: "Paste a YouTube link and save the audio as a 320kbps MP3, or choose M4A, WAV, or lossless FLAC. Live progress, no software.",
    highlights: [
      "MP3 at 320kbps",
      "M4A, WAV, FLAC too",
      "Live conversion progress",
      "Playlists as a batch",
    ],
    sections: [
      {
        heading: "Which audio format should you pick?",
        body: [
          "MP3 plays on every device and is the safe default; ClipKoala always encodes it at 320kbps, the highest bitrate the format supports. M4A (AAC) sounds about the same at smaller file sizes and is the native format for Apple devices. WAV is uncompressed and large, useful when you plan to edit the audio. FLAC is lossless compression: the exact original audio at roughly half the size of WAV, ideal for archiving music.",
          "Whichever you choose, the conversion runs on our servers and streams to your browser as soon as it is ready. Nothing is installed on your device.",
        ],
      },
      {
        heading: "Podcasts, lectures, mixes, and whole playlists",
        body: [
          "Long recordings convert fine; the progress bar keeps you posted and a notification fires if you switch tabs. To convert many videos, paste a playlist link and choose the audio format on each item, or use Save all for the best available option.",
        ],
      },
    ],
    faqs: [
      {
        q: "What bitrate are the MP3 files?",
        a: "320kbps, the maximum MP3 supports. There is nothing to configure; every MP3 conversion runs at top quality.",
      },
      {
        q: "Is YouTube to MP3 conversion free?",
        a: "Yes. There is no account, no limit on the number of conversions, and no length restriction beyond the time a very long video takes to process.",
      },
      {
        q: "Is it legal to convert YouTube videos to MP3?",
        a: "Converting your own uploads, Creative Commons content, or audio you have permission to use is fine. Downloading copyrighted music you do not have rights to may break the law and YouTube's terms. Respect creators' rights.",
      },
      {
        q: "Why is FLAC better than MP3 for archiving?",
        a: "FLAC keeps every bit of the original audio while MP3 discards some detail to shrink the file. If you want the best possible copy for a music library, choose FLAC; if you want compatibility and small size, choose MP3.",
      },
    ],
    guides: ["how-to-convert-youtube-to-mp3"],
    answers: ["youtube-mp3-sounds-bad", "mp3-vs-m4a-vs-wav-vs-flac"],
    related: ["youtube-downloader", "soundcloud-downloader", "tiktok-downloader"],
    updated: "2026-09-07",
  },

  "twitter-downloader": {
    slug: "twitter-downloader",
    platform: "twitter",
    name: "X (Twitter) Downloader",
    metaTitle: "X (Twitter) Video Downloader: Videos & GIFs in HD",
    metaDescription:
      "Download videos and GIFs from X (Twitter) in HD. Paste any x.com or twitter.com post link. Free, no sign-up, works on phone and desktop.",
    h1: "Download videos and GIFs from X (Twitter)",
    sub: "Paste any x.com or twitter.com post link and save the video or GIF in the best available quality.",
    highlights: [
      "Post videos in HD",
      "GIFs saved as MP4",
      "x.com and twitter.com links",
      "No account needed",
    ],
    sections: [
      {
        heading: "The raw MP4, including GIFs",
        body: [
          "X has no built-in way to save a video from a post. ClipKoala fetches the highest-quality MP4 X serves, usually the resolution it was uploaded in. Animated GIFs on X are actually short looping videos, so they arrive as small MP4 files that play anywhere.",
          "Posts with several videos list each one separately. The post text becomes the filename so clips stay recognizable in your downloads.",
        ],
      },
      {
        heading: "Which X links work",
        body: [
          "x.com/user/status/... and twitter.com/user/status/... links, including links copied from the app. Posts from protected accounts, age-gated media, and subscriber-only posts cannot be fetched.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I copy a post link on X?",
        a: "Tap the share icon under the post and choose Copy link, then paste it into ClipKoala. Both x.com and twitter.com links work.",
      },
      {
        q: "Can I download GIFs from X?",
        a: "Yes. GIF posts are saved as short MP4 clips, which play everywhere and keep the original quality.",
      },
      {
        q: "Why can't a post be fetched?",
        a: "Posts from private or age-restricted accounts, and posts without any media, cannot be downloaded.",
      },
    ],
    guides: ["how-to-download-twitter-videos"],
    answers: ["private-post-error", "link-not-supported"],
    related: ["reddit-downloader", "tiktok-downloader", "facebook-downloader"],
    updated: "2026-09-07",
  },

  "reddit-downloader": {
    slug: "reddit-downloader",
    platform: "reddit",
    name: "Reddit Downloader",
    metaTitle: "Reddit Video Downloader With Sound (HD, Free)",
    metaDescription:
      "Download Reddit videos with sound in HD. Video and audio are merged automatically. Works with post links, share links, and redd.it short links. Free, no sign-up.",
    h1: "Download Reddit videos, with the sound",
    sub: "Reddit stores video and audio separately. ClipKoala gives you them already merged, so your download plays with sound in any player.",
    highlights: [
      "Video and audio merged",
      "GIFs as MP4",
      "Share links and redd.it",
      "No account needed",
    ],
    sections: [
      {
        heading: "Why most Reddit downloads are silent, and why ours are not",
        body: [
          "Reddit's video host, v.redd.it, serves the picture and the audio as two separate streams. Save the video file directly and you get silence. ClipKoala resolves the post through a service that merges the two into one file, and streams that to you, so the MP4 you save plays with sound everywhere, from your phone gallery to a video editor.",
          "Reddit GIFs and image posts download too, and the post title becomes the filename.",
        ],
      },
      {
        heading: "Which Reddit links work",
        body: [
          "Full post links (reddit.com/r/.../comments/...), mobile share links (reddit.com/r/.../s/...), redd.it short links, and direct v.redd.it links. Posts in private or quarantined subreddits cannot be fetched.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why do Reddit videos usually download without sound?",
        a: "Reddit serves the video and audio as separate streams. They are merged into one file before it reaches you, so what you save plays with sound in any player.",
      },
      {
        q: "Which Reddit links work?",
        a: "Full post links, mobile share links (reddit.com/r/.../s/...), redd.it short links, and direct v.redd.it links.",
      },
      {
        q: "Can I download from private subreddits?",
        a: "No. Only posts that are publicly visible can be fetched.",
      },
    ],
    guides: ["how-to-download-reddit-videos-with-sound"],
    answers: ["reddit-video-no-sound", "link-not-supported"],
    related: ["twitter-downloader", "youtube-downloader", "twitch-clip-downloader"],
    updated: "2026-09-07",
  },

  "pinterest-downloader": {
    slug: "pinterest-downloader",
    platform: "pinterest",
    name: "Pinterest Downloader",
    metaTitle: "Pinterest Video Downloader: Pins & Images in HD",
    metaDescription:
      "Download Pinterest video pins as MP4 and image pins in original resolution. Works with pinterest.com and pin.it links from any country. Free, no sign-up.",
    h1: "Download Pinterest videos and image pins",
    sub: "Paste a pin link. Video pins save as MP4 and image pins as full-resolution originals, not compressed previews.",
    highlights: [
      "Video pins as MP4",
      "Images in original quality",
      "pin.it short links",
      "All country domains",
    ],
    sections: [
      {
        heading: "Originals, not thumbnails",
        body: [
          "Right-clicking a pin usually saves a downsized preview. ClipKoala looks up the original upload, so image pins arrive at full resolution and video pins as proper MP4 files. Idea pins with several pages list each item separately.",
        ],
      },
      {
        heading: "Which Pinterest links work",
        body: [
          "pinterest.com/pin/... links from any regional domain (pinterest.co.uk, pinterest.de, and so on) and pin.it short links copied from the app. Secret boards cannot be fetched.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I copy a pin link?",
        a: "Open the pin, tap the share icon, and choose Copy link. Both pinterest.com links and pin.it short links work.",
      },
      {
        q: "Can I download image pins too?",
        a: "Yes. Image pins download as the original full-resolution file, not a compressed preview.",
      },
      {
        q: "Do country domains like pinterest.co.uk work?",
        a: "Yes. Every regional Pinterest domain is supported, along with pin.it short links from the app.",
      },
    ],
    guides: ["how-to-download-pinterest-videos"],
    answers: ["link-not-supported", "private-post-error"],
    related: ["instagram-downloader", "tiktok-downloader", "facebook-downloader"],
    updated: "2026-09-07",
  },

  "twitch-clip-downloader": {
    slug: "twitch-clip-downloader",
    platform: "twitch",
    name: "Twitch Clip Downloader",
    metaTitle: "Twitch Clip Downloader: Save Clips as MP4 in HD",
    metaDescription:
      "Download Twitch clips as MP4 in up to 1080p. Paste any clips.twitch.tv or twitch.tv/clip link and pick your quality. Free, no sign-up.",
    h1: "Download Twitch clips in HD",
    sub: "Paste any clip link and save it as an MP4 in your choice of quality, up to 1080p.",
    highlights: [
      "Clips as MP4",
      "Up to 1080p",
      "clips.twitch.tv and /clip links",
      "No account needed",
    ],
    sections: [
      {
        heading: "Keep the moment after Twitch moves on",
        body: [
          "Clips are the easiest part of Twitch to share and the easiest to lose when a channel is deleted or a clip is removed. ClipKoala lists every quality Twitch offers for a clip, typically 360p through 1080p, and saves the one you pick as an MP4 ready for editing or reposting.",
        ],
      },
      {
        heading: "Which Twitch links work",
        body: [
          "clips.twitch.tv/... links and twitch.tv/channel/clip/... links. VODs, full past broadcasts, and live streams are not supported yet.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I get a Twitch clip link?",
        a: "On the clip, click Share and copy the link. Both clips.twitch.tv/... and twitch.tv/channel/clip/... links work.",
      },
      {
        q: "Which qualities can I download?",
        a: "Whatever the clip offers, usually 360p up to 1080p. ClipKoala lists each available quality separately.",
      },
      {
        q: "Can I download full VODs or live streams?",
        a: "Not yet. Only clips are supported. Channels, VODs, and live streams cannot be downloaded.",
      },
    ],
    guides: ["how-to-download-twitch-clips"],
    answers: ["link-not-supported", "downloader-not-working"],
    related: ["youtube-downloader", "reddit-downloader", "twitter-downloader"],
    updated: "2026-09-07",
  },

  "soundcloud-downloader": {
    slug: "soundcloud-downloader",
    platform: "soundcloud",
    name: "SoundCloud Downloader",
    metaTitle: "SoundCloud Downloader: Save Tracks as MP3",
    metaDescription:
      "Download SoundCloud tracks as MP3 in the best quality the uploader allows, with cover art. Paste any track link. Free, no sign-up.",
    h1: "Download SoundCloud tracks as MP3",
    sub: "Paste a track link and save the audio in the best quality the uploader allows, with the cover art included.",
    highlights: [
      "Tracks as MP3",
      "Original quality",
      "Cover art included",
      "No account needed",
    ],
    sections: [
      {
        heading: "Offline copies of the tracks you love",
        body: [
          "SoundCloud's offline listening is locked behind a subscription and stays inside the app. ClipKoala saves a normal MP3 you can play anywhere, tagged with the track title and artist and bundled with the cover art. Quality matches what the uploader made available.",
        ],
      },
      {
        heading: "Which SoundCloud links work",
        body: [
          "soundcloud.com/artist/track links and on.soundcloud.com short links from the app. Tracks the uploader has set to preview-only, and private tracks, cannot be saved. Playlists and profile links are not supported yet.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I copy a SoundCloud track link?",
        a: "Tap Share on the track and choose Copy link. Both soundcloud.com and on.soundcloud.com short links work.",
      },
      {
        q: "Why can't some tracks be downloaded?",
        a: "Some uploaders disable downloads or offer preview-only streams. Those tracks cannot be saved.",
      },
      {
        q: "Can I download whole playlists?",
        a: "Not yet. Paste individual track links. Playlist and profile links are not supported.",
      },
    ],
    guides: ["how-to-download-soundcloud-tracks"],
    answers: ["mp3-vs-m4a-vs-wav-vs-flac", "link-not-supported"],
    related: ["youtube-to-mp3", "tiktok-downloader", "youtube-downloader"],
    updated: "2026-09-07",
  },

  "batch-video-downloader": {
    slug: "batch-video-downloader",
    platform: null,
    name: "Batch Downloader",
    metaTitle: "Batch Video Downloader: Many Videos at Once",
    metaDescription:
      "Download many videos at once from TikTok, YouTube, Instagram, and more. Paste a list of links, import a .txt or .csv, or drop a whole YouTube playlist. Free.",
    h1: "Download multiple videos at once",
    sub: "Paste up to 10 links from any mix of platforms, import a .txt or .csv of links, or drop a YouTube playlist. Everything fetches in parallel.",
    highlights: [
      "Up to 10 links per batch",
      "Mix platforms freely",
      "Import .txt or .csv",
      "Save all in one click",
    ],
    sections: [
      {
        heading: "Built for editors, archivists, and the impatient",
        body: [
          "Collecting clips for an edit, backing up your own posts, or saving a playlist before a flight should not mean pasting links one at a time. Paste a whole list into ClipKoala and it switches to batch mode automatically: every link gets its own row with live status, quality options, and a retry button, and Save all grabs the best quality of everything in one go.",
          "Links can come from a notes app, a spreadsheet column, or a chat thread. You can also import a .txt or .csv file, or simply drag it onto the page. YouTube playlist and channel links expand into their latest videos.",
        ],
      },
      {
        heading: "How batches are kept fast",
        body: [
          "Batches are capped at 10 links and fetched three at a time, which keeps each result quick and avoids overloading the platforms. When one batch finishes, paste the next.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many videos can I download at once?",
        a: "Up to 10 per batch. You can run as many batches as you like, one after another.",
      },
      {
        q: "Can I mix TikTok, YouTube, and Instagram links in one batch?",
        a: "Yes. The platform is detected per link, so any mix of the nine supported platforms works in a single batch.",
      },
      {
        q: "What file types can I import?",
        a: "Plain .txt files with one link per line and .csv exports from spreadsheets. Quotes, commas, and extra columns are handled automatically.",
      },
      {
        q: "Does Save all pick the best quality?",
        a: "Yes. Save all takes the top option for each video. Expand any row to choose a different format or quality first.",
      },
    ],
    guides: ["how-to-batch-download-videos"],
    answers: ["link-not-supported", "downloader-not-working"],
    related: ["youtube-downloader", "tiktok-downloader", "instagram-downloader"],
    updated: "2026-09-07",
  },
};

export const LANDING_SLUGS = Object.keys(LANDING_PAGES);

/** Landing pages that represent a single platform (for grids and menus). */
export const PLATFORM_LANDING_SLUGS = LANDING_SLUGS.filter(
  (s) => LANDING_PAGES[s].platform !== null
);

/** First landing page for a platform (used for internal links). */
export const LANDING_FOR_PLATFORM: Record<PlatformId, string> = {
  tiktok: "tiktok-downloader",
  instagram: "instagram-downloader",
  facebook: "facebook-downloader",
  youtube: "youtube-downloader",
  twitter: "twitter-downloader",
  reddit: "reddit-downloader",
  pinterest: "pinterest-downloader",
  twitch: "twitch-clip-downloader",
  soundcloud: "soundcloud-downloader",
};
