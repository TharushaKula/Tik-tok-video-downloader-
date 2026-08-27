import type { PlatformId } from "./types";

export interface LandingCopy {
  slug: string;
  platform: PlatformId;
  /** <title> for the page */
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  sub: string;
  /** What this downloader handles, shown as a check strip */
  highlights: string[];
  faqs: { q: string; a: string }[];
}

export const LANDING_PAGES: Record<string, LandingCopy> = {
  "tiktok-downloader": {
    slug: "tiktok-downloader",
    platform: "tiktok",
    metaTitle: "TikTok Video Downloader  No Watermark, HD & Free | SnapLoad",
    metaDescription:
      "Download TikTok videos without watermark in HD, save photo slideshows, or extract MP3 audio. Free, fast, no sign-up, no app needed.",
    keywords: [
      "tiktok downloader",
      "tiktok video downloader",
      "tiktok no watermark",
      "tiktok mp3",
      "tiktok slideshow downloader",
    ],
    h1: "Download TikTok videos, without the watermark.",
    sub: "Paste any TikTok link and save the clean HD version  plus photo slideshows and MP3 audio.",
    highlights: [
      "No watermark, ever",
      "HD & SD quality",
      "Photo slideshows as images",
      "Soundtrack as MP3",
    ],
    faqs: [
      {
        q: "How do I download a TikTok without the watermark?",
        a: "Open TikTok, tap Share on the video, copy the link, and paste it above. SnapLoad fetches the original watermark-free file  no editing or cropping involved.",
      },
      {
        q: "Can I download TikTok photo slideshows?",
        a: "Yes. Paste a slideshow link and every slide appears as a separate image download, along with the soundtrack as MP3.",
      },
      {
        q: "Can I save just the sound?",
        a: "Yes  every TikTok result includes a Download Audio option that saves the soundtrack as an MP3 file.",
      },
    ],
  },
  "instagram-downloader": {
    slug: "instagram-downloader",
    platform: "instagram",
    metaTitle: "Instagram Reels & Video Downloader  HD & Free | SnapLoad",
    metaDescription:
      "Download Instagram Reels, videos, and photos in HD. Free, fast, no login and no app required.",
    keywords: [
      "instagram downloader",
      "instagram reels downloader",
      "instagram video downloader",
      "download reels",
      "instagram photo downloader",
    ],
    h1: "Download Instagram Reels & posts in HD.",
    sub: "Paste a Reel, video, or photo post link and save the full-quality original.",
    highlights: [
      "Reels & video posts",
      "Photo posts",
      "Full HD quality",
      "No login required",
    ],
    faqs: [
      {
        q: "How do I download an Instagram Reel?",
        a: "Tap the three dots (or Share) on the Reel, choose Copy Link, and paste it above. The HD file is ready in seconds.",
      },
      {
        q: "Do I need to log in to Instagram?",
        a: "No. SnapLoad works with any public post without your account  we never ask for credentials.",
      },
      {
        q: "Can I download private posts?",
        a: "No  only public posts can be fetched. Private and followers-only content stays private by design.",
      },
    ],
  },
  "facebook-downloader": {
    slug: "facebook-downloader",
    platform: "facebook",
    metaTitle: "Facebook Video Downloader  Videos & Reels in HD | SnapLoad",
    metaDescription:
      "Download Facebook videos and Reels in HD  including fb.watch and share links. Free, no sign-up, works in your browser.",
    keywords: [
      "facebook video downloader",
      "facebook reels downloader",
      "fb watch downloader",
      "download facebook video",
    ],
    h1: "Download Facebook videos & Reels.",
    sub: "Works with watch links, share links, fb.watch shortlinks, and Reels  saved in the best available quality.",
    highlights: [
      "Videos & Reels",
      "fb.watch & share links",
      "HD quality",
      "No account needed",
    ],
    faqs: [
      {
        q: "Which Facebook links work?",
        a: "Video pages, /watch links, Reels, share links (facebook.com/share/v/…), and fb.watch shortlinks  paste whichever the app gives you.",
      },
      {
        q: "Why does it say the video is private?",
        a: "Only public videos can be fetched. Videos restricted to friends, groups, or logged-in viewers can't be accessed  that's intentional.",
      },
      {
        q: "What quality do I get?",
        a: "The best quality Facebook serves for that video  typically HD 720p when available.",
      },
    ],
  },
  "youtube-downloader": {
    slug: "youtube-downloader",
    platform: "youtube",
    metaTitle: "YouTube Video Downloader  MP4 up to 1080p & MP3 | SnapLoad",
    metaDescription:
      "Download YouTube videos and Shorts as MP4 in 360p–1080p, or convert to MP3 audio. Live conversion progress, free and unlimited.",
    keywords: [
      "youtube downloader",
      "youtube video downloader",
      "youtube to mp3",
      "youtube to mp4",
      "youtube shorts downloader",
      "1080p youtube download",
    ],
    h1: "Download YouTube videos & Shorts.",
    sub: "Pick your quality  MP4 in 360p, 720p, or Full HD 1080p  or convert straight to MP3, with live progress.",
    highlights: [
      "Videos & Shorts",
      "MP4 up to 1080p",
      "YouTube to MP3",
      "Live conversion progress",
    ],
    faqs: [
      {
        q: "How do I convert YouTube to MP3?",
        a: "Paste the video link, then choose Download Audio. The file is converted on the fly and lands in your downloads as an MP3.",
      },
      {
        q: "Why does the download take a moment to start?",
        a: "YouTube files are converted to your chosen quality on demand. You'll see live progress on the button  most files are ready within seconds.",
      },
      {
        q: "Do Shorts work too?",
        a: "Yes  youtube.com/shorts links, youtu.be shortlinks, and regular watch links are all supported.",
      },
    ],
  },
  "twitter-downloader": {
    slug: "twitter-downloader",
    platform: "twitter",
    metaTitle: "X (Twitter) Video Downloader  Videos & GIFs in HD | SnapLoad",
    metaDescription:
      "Download videos and GIFs from X (Twitter) in HD. Paste any x.com or twitter.com post link  free, no sign-up.",
    keywords: [
      "twitter video downloader",
      "x video downloader",
      "twitter gif downloader",
      "download twitter video",
      "x.com video download",
    ],
    h1: "Download videos from X (Twitter).",
    sub: "Paste any x.com or twitter.com post link and save the video or GIF in the best available quality.",
    highlights: [
      "Tweet videos",
      "GIFs saved as MP4",
      "HD quality",
      "x.com & twitter.com links",
    ],
    faqs: [
      {
        q: "How do I copy a post link on X?",
        a: "Tap the share icon under the post and choose Copy Link  then paste it above. Both x.com and twitter.com links work.",
      },
      {
        q: "Can I download GIFs from X?",
        a: "Yes  GIF posts are saved as short MP4 clips, which play everywhere and keep the original quality.",
      },
      {
        q: "Why can't a post be fetched?",
        a: "Posts from private or age-restricted accounts, and posts without any media, can't be downloaded.",
      },
    ],
  },
};

LANDING_PAGES["reddit-downloader"] = {
  slug: "reddit-downloader",
  platform: "reddit",
  metaTitle: "Reddit Video Downloader  With Sound, HD & Free | SnapLoad",
  metaDescription:
    "Download Reddit videos with sound in HD. Works with post links, share links, and redd.it shortlinks. Free, no sign-up.",
  keywords: [
    "reddit video downloader",
    "download reddit video with sound",
    "v.redd.it downloader",
    "reddit gif downloader",
  ],
  h1: "Download Reddit videos, with sound.",
  sub: "Reddit stores video and audio separately  SnapLoad merges them so your download plays with sound everywhere.",
  highlights: [
    "Video + audio merged",
    "GIFs as MP4",
    "Share links & redd.it",
    "No account needed",
  ],
  faqs: [
    {
      q: "Why do Reddit videos usually download without sound?",
      a: "Reddit serves the video and audio as separate streams. SnapLoad merges them server-side, so the file you save plays with sound in any player.",
    },
    {
      q: "Which Reddit links work?",
      a: "Full post links (reddit.com/r/…/comments/…), mobile share links (reddit.com/r/…/s/…), and redd.it shortlinks.",
    },
    {
      q: "Can I download from private subreddits?",
      a: "No  only posts that are publicly visible can be fetched.",
    },
  ],
};

LANDING_PAGES["pinterest-downloader"] = {
  slug: "pinterest-downloader",
  platform: "pinterest",
  metaTitle: "Pinterest Video Downloader  Pins in HD & Free | SnapLoad",
  metaDescription:
    "Download Pinterest video pins and images in HD. Works with pinterest.com and pin.it links. Free, no sign-up, no watermark.",
  keywords: [
    "pinterest video downloader",
    "pinterest downloader",
    "pin.it downloader",
    "download pinterest video",
    "pinterest image downloader",
  ],
  h1: "Download Pinterest videos & pins.",
  sub: "Paste a pin link  video pins save as MP4 and image pins as full-resolution originals.",
  highlights: [
    "Video pins as MP4",
    "Images in original quality",
    "pin.it short links",
    "All country domains",
  ],
  faqs: [
    {
      q: "How do I copy a pin link?",
      a: "Open the pin, tap the share icon, and choose Copy Link. Both pinterest.com links and pin.it shortlinks work.",
    },
    {
      q: "Can I download image pins too?",
      a: "Yes  image pins download as the original full-resolution file, not a compressed preview.",
    },
    {
      q: "Do country domains like pinterest.co.uk work?",
      a: "Yes  every regional Pinterest domain is supported, along with pin.it shortlinks from the app.",
    },
  ],
};

export const LANDING_SLUGS = Object.keys(LANDING_PAGES);
