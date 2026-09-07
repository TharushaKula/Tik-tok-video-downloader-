// Site-wide FAQ. The home page shows the first few; /faq shows everything,
// grouped, with FAQPage structured data. Questions are written the way
// people actually search for them.

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: "The basics",
    items: [
      {
        q: "What is ClipKoala?",
        a: "ClipKoala is a free online video downloader. Paste a link from TikTok, YouTube, Instagram, Facebook, X, Reddit, Pinterest, Twitch, or SoundCloud and save the video in HD, without watermarks, or grab the audio as MP3. It runs in your browser with no account and no software to install.",
      },
      {
        q: "Is ClipKoala really free?",
        a: "Yes. Every download, in every quality, with no account, no limits, and no hidden fees.",
      },
      {
        q: "Do I need to install an app or extension?",
        a: "No. ClipKoala works in any modern browser on phone, tablet, and desktop. There is an optional browser extension for one-click sending and an installable web app for Android's share sheet, but neither is required.",
      },
      {
        q: "Which platforms and formats are supported?",
        a: "TikTok (watermark-free videos, photo slideshows, MP3), Instagram Reels, posts, carousels, and public Stories, Facebook videos and Reels, YouTube videos, Shorts, playlists, and channels (MP4 up to 1080p or MP3, M4A, WAV, FLAC), X (Twitter) videos and GIFs, Reddit videos with sound, Pinterest video and image pins, Twitch clips, and SoundCloud tracks as MP3.",
      },
    ],
  },
  {
    title: "Downloads and quality",
    items: [
      {
        q: "How do I download a video with ClipKoala?",
        a: "Open the video in its app or website, tap Share, copy the link, and paste it into ClipKoala. The platform is detected automatically. Pick a quality and the file saves to your device.",
      },
      {
        q: "Are TikTok downloads really watermark-free?",
        a: "Yes. ClipKoala fetches the original file TikTok stores before the watermark is applied. Nothing is cropped, blurred, or re-encoded.",
      },
      {
        q: "What quality can I download in?",
        a: "The best quality each platform serves. YouTube goes up to 1080p Full HD with a quality picker; other platforms offer HD and SD where available. Audio downloads are MP3 at 320kbps for YouTube, with M4A, WAV, and FLAC as alternatives.",
      },
      {
        q: "Can I download several videos at once?",
        a: "Yes. Paste multiple links together, or use the Batch button, and ClipKoala fetches up to 10 at a time. Each video gets its own row with quality options, and Save all grabs the best quality for everything in one go.",
      },
      {
        q: "Why do YouTube downloads take longer to start?",
        a: "YouTube files are converted to your chosen quality on the fly. Most start within seconds, but long HD videos can take up to a minute. Keep the tab open and the file will land in your downloads automatically.",
      },
      {
        q: "Where do downloaded files go?",
        a: "Into your browser's default Downloads folder, named after the video title (you can change the naming pattern in the filename settings). On phones you can move the file to your gallery or camera roll.",
      },
    ],
  },
  {
    title: "Privacy and limits",
    items: [
      {
        q: "Can I download private videos?",
        a: "No. Only public posts can be fetched. Private, followers-only, or age-restricted content is not accessible, by design, to respect creators' privacy.",
      },
      {
        q: "Do you store my links or downloads?",
        a: "No. Links are processed on the fly and discarded immediately. Files stream through our server to your browser and are never kept. Your recent-downloads list lives only in your own browser and can be cleared anytime.",
      },
      {
        q: "Do I need to create an account or log in to the platforms?",
        a: "No. ClipKoala never asks for your credentials to any platform, and there is no ClipKoala account.",
      },
      {
        q: "Is downloading videos allowed?",
        a: "Downloading is fine for your own content, content you have permission to save, and public-domain or Creative Commons media. Always respect creators' rights and each platform's terms of service.",
      },
    ],
  },
  {
    title: "Troubleshooting",
    items: [
      {
        q: "Why did my link fail?",
        a: "The most common reasons are that the post is private or deleted, the link was copied incorrectly, or the platform is temporarily blocking requests. Check the status page to see whether a platform is having trouble, then try copying the link again from the app's share button.",
      },
      {
        q: "The download opened in a new tab instead of saving. What now?",
        a: "Some mobile browsers preview media instead of saving it. Long-press the video and choose Save, or use a browser like Chrome or Firefox that honors download prompts.",
      },
      {
        q: "How do I know if ClipKoala is down?",
        a: "The status page runs a live check against every supported platform every few minutes and shows which ones are operational.",
      },
    ],
  },
];

export const ALL_FAQS: FaqItem[] = FAQ_GROUPS.flatMap((g) => g.items);

/** The handful shown on the home page. */
export const HOME_FAQS: FaqItem[] = [
  ALL_FAQS[0],
  ALL_FAQS[3],
  ALL_FAQS[1],
  ALL_FAQS[5],
  ALL_FAQS[7],
  ALL_FAQS[10],
  ALL_FAQS[11],
  ALL_FAQS[13],
];
