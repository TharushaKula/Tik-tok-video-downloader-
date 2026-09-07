import type { PlatformId } from "./types";

// How-to guides: the educational layer of the site. Each guide answers one
// "how do I..." query end to end, links to the matching downloader page, and
// carries HowTo + FAQ structured data. Keep copy honest and specific.

export interface GuideImage {
  /** Path under /public */
  src: string;
  alt: string;
  /** Intrinsic pixel size (2x retina; render at half) */
  width: number;
  height: number;
  caption: string;
}

export interface GuideStep {
  title: string;
  body: string;
  /** Annotated screenshots for this step (0-2) */
  images?: GuideImage[];
}

export interface GuideCopy {
  slug: string;
  /** Accent platform; null for cross-platform guides */
  platform: PlatformId | null;
  /** <title> without the brand suffix */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** Short label for menus and footer */
  shortTitle: string;
  intro: string;
  steps: GuideStep[];
  tips: string[];
  faqs: { q: string; a: string }[];
  /** Landing page to point the CTA at (home when null) */
  landingSlug: string | null;
  /** ISO dates for structured data */
  published: string;
  updated: string;
}

export const GUIDES: Record<string, GuideCopy> = {
  "how-to-download-tiktok-videos-without-watermark": {
    slug: "how-to-download-tiktok-videos-without-watermark",
    platform: "tiktok",
    metaTitle: "How to Download TikTok Videos Without a Watermark (2026)",
    metaDescription:
      "Save any TikTok video without the watermark in HD, free and in under a minute. A step-by-step guide that works on phone and desktop, no app required.",
    h1: "How to download TikTok videos without a watermark",
    shortTitle: "TikTok without watermark",
    intro:
      "TikTok's own Save video option stamps a moving watermark over the clip. ClipKoala fetches the original clean file instead, so nothing is cropped, blurred, or re-encoded. Here is the whole process, start to finish.",
    steps: [
      {
        title: "Copy the video link from TikTok",
        body: "Open the video in the TikTok app or on tiktok.com, tap the Share arrow, and choose Copy link. Short vm.tiktok.com share links work too.",
        images: [
          {
            src: "/guides/how-to-download-tiktok-videos-without-watermark/step-share.webp",
            alt: "TikTok video page with the Share arrow highlighted on the action rail",
            width: 1280,
            height: 960,
            caption: "The Share arrow on the action rail (tiktok.com)",
          },
          {
            src: "/guides/how-to-download-tiktok-videos-without-watermark/step-copy.webp",
            alt: "TikTok Share dialog with the Copy button highlighted",
            width: 1280,
            height: 800,
            caption: "Pick Copy in the Share dialog",
          },
        ],
      },
      {
        title: "Paste the link into ClipKoala",
        body: "Go to the ClipKoala TikTok downloader and paste the link. If you copied it before opening the page, we detect it and offer to fetch it for you, so you may not even need to paste.",
      },
      {
        title: "Pick a quality",
        body: "In a second or two you will see the video with its title, author, and stats. Choose Download HD for the best quality or Download SD for a smaller file. Both are watermark-free.",
      },
      {
        title: "Save the file",
        body: "The download starts immediately and lands in your browser's Downloads folder, named after the video title. On a phone you can send it straight to your gallery.",
      },
    ],
    tips: [
      "Photo slideshows work too: every slide arrives as a separate image plus the soundtrack as MP3",
      "Only want the sound? Use the Download Audio button to grab the track as MP3",
      "Downloading several videos? Paste all the links at once and ClipKoala switches to batch mode",
    ],
    faqs: [
      {
        q: "Is the watermark really gone, not just hidden?",
        a: "Yes. ClipKoala fetches the original file TikTok stores before the watermark is stamped on, so there is no cropping or blurring involved and quality is untouched.",
      },
      {
        q: "Does this work with private videos?",
        a: "No. Only public videos can be fetched. Private, friends-only, or deleted videos will fail with an error.",
      },
      {
        q: "Do I need to install an app?",
        a: "No. Everything runs in your browser on any device. If you like, you can install ClipKoala as a lightweight web app and share TikToks straight into it from the share sheet.",
      },
    ],
    landingSlug: "tiktok-downloader",
    published: "2026-08-28",
    updated: "2026-09-07",
  },

  "how-to-convert-youtube-to-mp3": {
    slug: "how-to-convert-youtube-to-mp3",
    platform: "youtube",
    metaTitle: "How to Convert YouTube to MP3 for Free at 320kbps",
    metaDescription:
      "Turn any YouTube video into a 320kbps MP3, or lossless FLAC and WAV, free and without installing anything. Step-by-step guide with live conversion progress.",
    h1: "How to convert YouTube videos to MP3",
    shortTitle: "YouTube to MP3",
    intro:
      "Whether it is a podcast episode, a mix, or a lecture you want offline, converting a YouTube video to audio takes under a minute. ClipKoala converts at maximum quality, 320kbps for MP3, and also offers M4A, WAV, and lossless FLAC.",
    steps: [
      {
        title: "Copy the YouTube link",
        body: "Grab the URL from the address bar, or tap Share and Copy link in the YouTube app. Regular watch links, youtu.be short links, and Shorts all work.",
        images: [
          {
            src: "/guides/how-to-convert-youtube-to-mp3/step-share.webp",
            alt: "YouTube video page with the Share button highlighted under the title",
            width: 780,
            height: 660,
            caption: "The Share button under the video",
          },
          {
            src: "/guides/how-to-convert-youtube-to-mp3/step-copy.webp",
            alt: "YouTube share sheet with the video link highlighted",
            width: 780,
            height: 760,
            caption: "Tap the link in the share sheet to copy it",
          },
        ],
      },
      {
        title: "Paste it into ClipKoala",
        body: "Paste the link on the YouTube to MP3 page. The video appears with its title and thumbnail plus every available format.",
      },
      {
        title: "Choose your audio format",
        body: "Pick Download MP3 for the universal option at 320kbps. Prefer something else? M4A is smaller at similar quality, WAV is uncompressed, and FLAC is lossless.",
      },
      {
        title: "Watch the conversion finish",
        body: "The button shows live progress while the audio is extracted, usually a few seconds for songs. The file then downloads automatically, named after the video.",
      },
    ],
    tips: [
      "Converting something long? Switch tabs freely; ClipKoala notifies you when the file is ready",
      "MP3s are always 320kbps, the maximum the format offers, with no quality setting to fiddle with",
      "Need a whole playlist? Paste the playlist link and its latest videos queue up as a batch",
    ],
    faqs: [
      {
        q: "What bitrate are the MP3s?",
        a: "320kbps, the highest bitrate MP3 supports. There is nothing to configure; every MP3 conversion runs at maximum quality.",
      },
      {
        q: "What is the difference between MP3, M4A, WAV, and FLAC?",
        a: "MP3 plays everywhere and is the safe default. M4A sounds similar at smaller sizes. WAV is uncompressed and huge, useful for editing. FLAC is lossless compression, ideal for archiving music.",
      },
      {
        q: "How long can the video be?",
        a: "Typical videos, podcasts, and mixes convert fine. Extremely long videos take proportionally longer to convert, and the progress bar keeps you posted throughout.",
      },
    ],
    landingSlug: "youtube-to-mp3",
    published: "2026-08-28",
    updated: "2026-09-07",
  },

  "how-to-download-instagram-reels": {
    slug: "how-to-download-instagram-reels",
    platform: "instagram",
    metaTitle: "How to Download Instagram Reels in HD (2026 Guide)",
    metaDescription:
      "Save Instagram Reels, videos, photos, and Stories in full quality, free and without logging in. A quick step-by-step guide for phone and desktop.",
    h1: "How to download Instagram Reels",
    shortTitle: "Instagram Reels",
    intro:
      "Instagram has no save-to-device button for Reels, only in-app bookmarks that disappear if the post is deleted. Here is how to keep a real copy in your gallery, in the original quality and without logging in to anything.",
    steps: [
      {
        title: "Copy the Reel's link",
        body: "On the Reel, tap the three-dot menu (or the Share arrow) and choose Copy link. On desktop, just copy the URL from the address bar.",
        images: [
          {
            src: "/guides/how-to-download-instagram-reels/step-share.webp",
            alt: "Instagram Reel with the share (paper plane) icon highlighted",
            width: 1240,
            height: 860,
            caption: "The share icon under the Reel",
          },
          {
            src: "/guides/how-to-download-instagram-reels/step-copy.webp",
            alt: "Instagram share dialog with Copy link highlighted",
            width: 1240,
            height: 860,
            caption: "Copy link in the Share to dialog",
          },
        ],
      },
      {
        title: "Paste it into ClipKoala",
        body: "Head to the Instagram downloader and paste. The Reel appears with its cover, caption, and author in a couple of seconds.",
      },
      {
        title: "Download the video",
        body: "Click Download Video and the full-quality MP4 saves to your device, named after the caption.",
      },
    ],
    tips: [
      "Photo posts and carousels work the same way, and carousels can be saved in one click as a ZIP",
      "Public Stories and Highlights are supported too; paste the story link while it is live",
      "No Instagram login is ever asked for. ClipKoala only reads public posts",
    ],
    faqs: [
      {
        q: "Can I download from private accounts?",
        a: "No. Only public posts, Reels, and Stories can be fetched. Content from private accounts fails with an error.",
      },
      {
        q: "Will the quality be reduced?",
        a: "No. You get the highest-quality file Instagram serves, the same one that streams in the app.",
      },
      {
        q: "Can I save a whole carousel at once?",
        a: "Yes. Carousel posts show every photo and video separately, plus a Download all as ZIP button that bundles everything into one archive.",
      },
    ],
    landingSlug: "instagram-downloader",
    published: "2026-08-28",
    updated: "2026-09-07",
  },

  "how-to-download-twitter-videos": {
    slug: "how-to-download-twitter-videos",
    platform: "twitter",
    metaTitle: "How to Download Twitter / X Videos and GIFs",
    metaDescription:
      "Save videos and GIFs from X (Twitter) posts in HD, free and with no login. Step-by-step guide that works on any device.",
    h1: "How to download videos from X (Twitter)",
    shortTitle: "X (Twitter) videos",
    intro:
      "X has no built-in way to save a video from a post. With ClipKoala you paste the post link and get the raw MP4, including animated GIFs, which X actually stores as videos.",
    steps: [
      {
        title: "Copy the post link",
        body: "Tap the Share icon under the post and choose Copy link. Both x.com and twitter.com URLs work.",
        images: [
          {
            src: "/guides/how-to-download-twitter-videos/step-copy.webp",
            alt: "X post share menu with Copy link highlighted",
            width: 1280,
            height: 840,
            caption: "The share icon on the post opens this menu; choose Copy link",
          },
        ],
      },
      {
        title: "Paste it into ClipKoala",
        body: "Paste the link on the X downloader page and the post's video appears with the author and text.",
      },
      {
        title: "Save the MP4",
        body: "Click Download Video. GIFs arrive as short MP4 clips, which every gallery and editor accepts.",
      },
    ],
    tips: [
      "Posts with multiple videos show each one as a separate download",
      "The post text becomes the filename, so clips stay recognizable in your Downloads folder",
      "Age-gated or subscriber-only posts cannot be fetched",
    ],
    faqs: [
      {
        q: "Can I download GIFs from X?",
        a: "Yes. X stores GIFs as looping MP4 videos, and that is exactly what you get: a small MP4 that loops perfectly and plays anywhere.",
      },
      {
        q: "Do I need an X account?",
        a: "No login is needed for public posts. Posts from protected accounts cannot be fetched.",
      },
      {
        q: "What quality is the download?",
        a: "The highest quality X serves for that post, typically the same resolution it was uploaded in.",
      },
    ],
    landingSlug: "twitter-downloader",
    published: "2026-08-28",
    updated: "2026-09-07",
  },

  "how-to-download-facebook-videos": {
    slug: "how-to-download-facebook-videos",
    platform: "facebook",
    metaTitle: "How to Download Facebook Videos and Reels in HD",
    metaDescription:
      "Save Facebook videos, Reels, and Watch links in HD for free. Works with fb.watch short links and share URLs, no login or app needed.",
    h1: "How to download Facebook videos",
    shortTitle: "Facebook videos",
    intro:
      "Facebook lets you save videos to a watch-later list, but not to your device. This guide shows how to download any public Facebook video or Reel as a normal MP4 you actually own.",
    steps: [
      {
        title: "Copy the video link",
        body: "Tap Share on the video and choose Copy link. Regular facebook.com links, fb.watch short links, and share/v/ links all work.",
        images: [
          {
            src: "/guides/how-to-download-facebook-videos/step-share.webp",
            alt: "Facebook video with the Share button highlighted in the action row",
            width: 1280,
            height: 860,
            caption: "Share under any public video, then choose Copy link",
          },
        ],
      },
      {
        title: "Paste it into ClipKoala",
        body: "Paste on the Facebook downloader page. The video appears with its title and thumbnail in a few seconds.",
      },
      {
        title: "Download in HD",
        body: "Click Download HD for the best quality Facebook serves, or the smaller SD option if you are short on space.",
      },
    ],
    tips: [
      "Reels work exactly the same way as regular videos",
      "Videos inside private groups or events cannot be fetched; the post must be public",
      "Live streams can be saved once the broadcast has ended and the replay is public",
    ],
    faqs: [
      {
        q: "Why does my Facebook link fail?",
        a: "The most common reason is privacy: the video must be public. Links from private groups, friends-only posts, or logged-in-only pages cannot be fetched.",
      },
      {
        q: "Do fb.watch links work?",
        a: "Yes. Every public link format works: facebook.com/watch, fb.watch short links, share links, and Reel links.",
      },
      {
        q: "Is there a limit on video length?",
        a: "No fixed limit. Long videos simply take a little longer to start downloading.",
      },
    ],
    landingSlug: "facebook-downloader",
    published: "2026-08-28",
    updated: "2026-09-07",
  },

  "how-to-download-reddit-videos-with-sound": {
    slug: "how-to-download-reddit-videos-with-sound",
    platform: "reddit",
    metaTitle: "How to Download Reddit Videos With Sound",
    metaDescription:
      "Reddit videos usually save without audio. Here is how to download any public Reddit video with sound as a single MP4, free and without an account.",
    h1: "How to download Reddit videos with sound",
    shortTitle: "Reddit videos with sound",
    intro:
      "Save a Reddit video the obvious way and you get silence: Reddit stores the picture and the audio as separate streams. ClipKoala merges them for you, so the file you save plays with sound in any player. Here is how.",
    steps: [
      {
        title: "Copy the post link",
        body: "On the post, tap Share and choose Copy link. Full reddit.com post links, mobile share links (reddit.com/r/.../s/...), redd.it short links, and direct v.redd.it links all work.",
      },
      {
        title: "Paste it into ClipKoala",
        body: "Paste the link on the Reddit downloader page. The post appears with its title, subreddit, and a preview thumbnail.",
      },
      {
        title: "Download the merged MP4",
        body: "Click Download Video. ClipKoala fetches the video and audio streams, merges them on the server, and streams the finished MP4 to your browser. The post title becomes the filename.",
      },
    ],
    tips: [
      "Reddit GIFs are silent videos; they download as small MP4 files that loop cleanly",
      "Crossposts work: paste the link you have and ClipKoala follows it to the original video",
      "Posts in private or quarantined subreddits cannot be fetched",
    ],
    faqs: [
      {
        q: "Why does my Reddit video have no sound when I save it normally?",
        a: "Reddit's video host serves audio and video as two separate files. Saving the video file alone gives you silence. ClipKoala downloads both and merges them into one MP4.",
      },
      {
        q: "Do I need a Reddit account?",
        a: "No. Any publicly visible post can be fetched without logging in.",
      },
      {
        q: "Can I download videos from a private subreddit?",
        a: "No. Only posts that are publicly visible can be fetched.",
      },
    ],
    landingSlug: "reddit-downloader",
    published: "2026-09-07",
    updated: "2026-09-07",
  },

  "how-to-download-pinterest-videos": {
    slug: "how-to-download-pinterest-videos",
    platform: "pinterest",
    metaTitle: "How to Download Pinterest Videos and Images in Full Quality",
    metaDescription:
      "Save Pinterest video pins as MP4 and image pins at their original resolution. Works with pin.it links from the app. Free, no account needed.",
    h1: "How to download Pinterest videos and images",
    shortTitle: "Pinterest pins",
    intro:
      "Right-clicking a pin only gives you a downsized preview, and video pins cannot be saved from the app at all. This guide shows how to get the original file, video or image, in under a minute.",
    steps: [
      {
        title: "Copy the pin link",
        body: "Open the pin, tap the share icon, and choose Copy link. On desktop, copy the URL from the address bar. Regional domains like pinterest.co.uk and pin.it short links from the app all work.",
      },
      {
        title: "Paste it into ClipKoala",
        body: "Paste the link on the Pinterest downloader page. The pin appears with its title and a preview.",
      },
      {
        title: "Save the original",
        body: "Click Download Video for video pins or Download Image for image pins. You get the original upload, not the compressed preview Pinterest shows in the feed.",
      },
    ],
    tips: [
      "Idea pins with several pages list each page as its own download",
      "Image pins are saved as full-resolution JPGs, so they hold up when printed or used in a design",
      "Pins on secret boards cannot be fetched",
    ],
    faqs: [
      {
        q: "Can I download Pinterest videos on my phone?",
        a: "Yes. Copy the pin link from the Pinterest app, open ClipKoala in your browser, and paste. The MP4 saves to your phone and can be moved to your gallery.",
      },
      {
        q: "Do pin.it links work?",
        a: "Yes. pin.it short links copied from the app are supported, as is every regional Pinterest domain.",
      },
      {
        q: "Is the image quality the same as the original?",
        a: "Yes. ClipKoala looks up the original upload rather than the resized preview shown in the feed.",
      },
    ],
    landingSlug: "pinterest-downloader",
    published: "2026-09-07",
    updated: "2026-09-07",
  },

  "how-to-download-twitch-clips": {
    slug: "how-to-download-twitch-clips",
    platform: "twitch",
    metaTitle: "How to Download Twitch Clips as MP4",
    metaDescription:
      "Save any Twitch clip as an MP4 in up to 1080p, free and without an account. Step-by-step guide for creators, editors, and fans.",
    h1: "How to download Twitch clips",
    shortTitle: "Twitch clips",
    intro:
      "Twitch lets you create and share clips, but downloading them is limited to the clip's owner and buried in the Creator Dashboard. ClipKoala saves any public clip as an MP4 in the quality you choose. Here is the whole flow.",
    steps: [
      {
        title: "Copy the clip link",
        body: "On the clip page, click Share and copy the link. Both clips.twitch.tv/... links and twitch.tv/channel/clip/... links work.",
      },
      {
        title: "Paste it into ClipKoala",
        body: "Paste the link on the Twitch clip downloader page. The clip appears with its title, the streamer's name, and every available quality.",
      },
      {
        title: "Pick a quality and save",
        body: "Choose 1080p for editing or reposting, or a smaller resolution for sharing in chat. The MP4 downloads immediately, named after the clip title.",
      },
    ],
    tips: [
      "Clips made from a deleted VOD still download as long as the clip itself is public",
      "For editing, pick the highest quality; you can always compress later",
      "Full VODs and live streams are not supported yet, only clips",
    ],
    faqs: [
      {
        q: "Do I need to be the clip's owner?",
        a: "No. Any public clip can be saved, whoever created it. Please credit the streamer when you repost.",
      },
      {
        q: "Which qualities are available?",
        a: "Whatever Twitch offers for that clip, usually 360p through 1080p. ClipKoala lists each one separately.",
      },
      {
        q: "Can I download a whole VOD?",
        a: "Not yet. Only clips are supported. VODs and live streams cannot be downloaded.",
      },
    ],
    landingSlug: "twitch-clip-downloader",
    published: "2026-09-07",
    updated: "2026-09-07",
  },

  "how-to-download-soundcloud-tracks": {
    slug: "how-to-download-soundcloud-tracks",
    platform: "soundcloud",
    metaTitle: "How to Download SoundCloud Tracks as MP3",
    metaDescription:
      "Save any public SoundCloud track as an MP3 with cover art, free and without a subscription. Step-by-step guide that works on phone and desktop.",
    h1: "How to download SoundCloud tracks as MP3",
    shortTitle: "SoundCloud to MP3",
    intro:
      "SoundCloud's offline mode needs a paid plan and keeps the files locked inside the app. This guide shows how to save a normal MP3 you can play anywhere, tagged with the title and artist and bundled with the cover art.",
    steps: [
      {
        title: "Copy the track link",
        body: "Tap Share on the track and choose Copy link. Both soundcloud.com/artist/track links and on.soundcloud.com short links from the app work.",
      },
      {
        title: "Paste it into ClipKoala",
        body: "Paste the link on the SoundCloud downloader page. The track appears with its artwork, title, and artist.",
      },
      {
        title: "Download the MP3",
        body: "Click Download MP3. The file saves in the best quality the uploader made available, named after the track, and the cover art is available as a separate download.",
      },
    ],
    tips: [
      "Tracks the artist has set to preview-only cannot be saved, and that is by their choice",
      "Playlists are not supported yet; paste tracks one at a time or use batch mode with several track links",
      "Support artists you love: buy the track or follow them when you can",
    ],
    faqs: [
      {
        q: "What quality is the MP3?",
        a: "The best stream the uploader made available, usually 128kbps for standard uploads and higher for SoundCloud Go+ tracks that allow it.",
      },
      {
        q: "Do I need a SoundCloud account?",
        a: "No. Any public track can be saved without logging in.",
      },
      {
        q: "Can I download a whole playlist?",
        a: "Not yet. Paste individual track links, or paste several at once to fetch them as a batch.",
      },
    ],
    landingSlug: "soundcloud-downloader",
    published: "2026-09-07",
    updated: "2026-09-07",
  },

  "how-to-batch-download-videos": {
    slug: "how-to-batch-download-videos",
    platform: null,
    metaTitle: "How to Batch Download Videos from Any Platform",
    metaDescription:
      "Download many videos at once: paste a list of links, import a .txt or .csv file, or drop a whole YouTube playlist. Free batch video downloading, step by step.",
    h1: "How to download many videos at once",
    shortTitle: "Batch downloading",
    intro:
      "Collecting clips for an edit, archiving your own posts, or saving a playlist for a flight? ClipKoala's batch mode fetches up to 10 links in parallel, from any mix of the nine supported platforms at the same time.",
    steps: [
      {
        title: "Gather your links",
        body: "Copy the links you want, one per line, from anywhere: a notes app, a spreadsheet column, or a chat thread. Any text works; the links are picked out automatically.",
      },
      {
        title: "Paste them all at once",
        body: "Paste the whole blob into ClipKoala. Two or more links switch the tool into batch mode automatically and fetching starts immediately.",
      },
      {
        title: "Or import a file",
        body: "Have the links in a .txt or .csv file? Click Import file in batch mode, or simply drag the file onto the page. Spreadsheet exports with quotes and commas are handled fine.",
        images: [
          {
            src: "/guides/how-to-batch-download-videos/step-import.webp",
            alt: "ClipKoala batch mode with the Import file button highlighted",
            width: 1440,
            height: 722,
            caption: "Import file accepts .txt and .csv link lists",
          },
        ],
      },
      {
        title: "Save everything",
        body: "Each video shows its own status and download options as it arrives. Use Save all to grab the best quality of every finished video in one go, and retry any link that failed.",
        images: [
          {
            src: "/guides/how-to-batch-download-videos/step-saveall.webp",
            alt: "ClipKoala batch results with the Save all button highlighted",
            width: 1440,
            height: 638,
            caption: "Save all grabs the best quality of every finished video",
          },
        ],
      },
    ],
    tips: [
      "YouTube playlist and channel links expand into their latest videos automatically",
      "You can mix platforms freely: TikTok, YouTube, and Instagram links in one batch is fine",
      "Batches are capped at 10 links at a time; paste the next 10 when the first batch finishes",
    ],
    faqs: [
      {
        q: "How many videos can I download at once?",
        a: "Up to 10 per batch. The cap keeps every fetch fast and reliable. You can run as many batches as you like, one after another.",
      },
      {
        q: "What file formats can I import links from?",
        a: "Plain .txt files with one link per line, and .csv exports from spreadsheets. Quoting, commas, and semicolons are all handled; junk columns are ignored.",
      },
      {
        q: "Can I batch download a whole YouTube channel?",
        a: "Paste the channel URL or @handle and its latest uploads queue up as a batch automatically, via the channel's public feed.",
      },
    ],
    landingSlug: "batch-video-downloader",
    published: "2026-08-28",
    updated: "2026-09-07",
  },
};

export const GUIDE_SLUGS = Object.keys(GUIDES);

/** The guide to cross-link from a platform landing page, if one exists. */
export const GUIDE_FOR_PLATFORM: Partial<Record<PlatformId, string>> = {
  tiktok: "how-to-download-tiktok-videos-without-watermark",
  youtube: "how-to-convert-youtube-to-mp3",
  instagram: "how-to-download-instagram-reels",
  twitter: "how-to-download-twitter-videos",
  facebook: "how-to-download-facebook-videos",
  reddit: "how-to-download-reddit-videos-with-sound",
  pinterest: "how-to-download-pinterest-videos",
  twitch: "how-to-download-twitch-clips",
  soundcloud: "how-to-download-soundcloud-tracks",
};
