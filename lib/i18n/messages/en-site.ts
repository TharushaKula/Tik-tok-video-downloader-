import { HOME_FAQS } from "../../faq";
import { HOME_FEATURES } from "../../features";
import { PLATFORMS } from "../../platforms";
import type { PlatformId } from "../../types";

// English page-chrome and marketing strings, rendered on the server only.
// See en.ts for the rules every language follows.

// ── Server-rendered strings ───────────────────────────────────────────
// Page chrome and marketing sections. Never sent to the browser as data;
// only the rendered HTML is.

export const site = {
  meta: {
    homeTitle: "ClipKoala: Free Video Downloader, No Sign-Up",
    homeShortTitle: "ClipKoala: Free Video Downloader",
    description:
      "Free online video downloader for TikTok, YouTube, Instagram and six more platforms. Save in HD without watermarks, or take the audio as MP3. No sign-up.",
    shortDescription:
      "Free video downloader for TikTok, YouTube, Instagram, and six more platforms. HD, watermark-free, MP3. No sign-up.",
    tagline: "Save any clip. Keep it clean.",
    ogAlt:
      "ClipKoala: free video downloader for TikTok, YouTube, Instagram and more",
    ogEyebrow: "Free video downloader",
    ogSubtitle:
      "Download videos from 9 platforms in HD without watermarks, or grab the audio as MP3. No sign-up, no limits.",
    skipToContent: "Skip to content",
  },

  nav: {
    homeAria: "ClipKoala home",
    primaryAria: "Primary",
    downloaders: "Downloaders",
    useCases: "Use cases",
    guides: "Guides",
    answers: "Answers",
    faq: "FAQ",
    howItWorks: "How it works",
    downloadVideo: "Download a video",
    about: "About",
    extension: "Browser extension",
    changelog: "What's new",
    status: "Status",
    glossary: "Glossary",
    privacy: "Privacy",
  },

  footer: {
    blurb:
      "ClipKoala is a free online video downloader for nine platforms. HD, watermark-free, no sign-up.",
    downloaders: "Downloaders",
    guides: "Guides",
    allGuides: "All guides",
    answers: "Answers",
    allAnswers: "All answers",
    audiences: "Who it's for",
    allUseCases: "All use cases",
    product: "Product",
    company: "Company",
    languages: "Languages",
    videoDownloader: "Video downloader",
    features: "Features",
    extension: "Browser extension",
    batch: "Batch downloads",
    changelog: "What's new",
    roadmap: "Roadmap",
    status: "Status",
    rss: "RSS feed",
    about: "About ClipKoala",
    faq: "FAQ",
    glossary: "Glossary",
    press: "Press kit",
    accessibility: "Accessibility",
    terms: "Terms of service",
    privacy: "Privacy policy",
    dmca: "Copyright & DMCA",
    security: "Report a problem",
    /** Shown on translated pages beside links that lead to English pages */
    inEnglish: "in English",
    disclaimer:
      "ClipKoala is not affiliated with TikTok, YouTube, Instagram, Facebook, X, Reddit, Pinterest, Twitch, or SoundCloud. Download only content you own or have permission to save.",
  },

  hero: {
    badge: "Free forever · No sign-up · 9 platforms",
    titleLine1: "Download any video.",
    titleLine2: "Clean, fast, yours.",
    body: "ClipKoala saves videos from TikTok, YouTube, Instagram, Facebook, X, Reddit, Pinterest, Twitch, and SoundCloud in HD, without watermarks. Paste a link, pick a quality, done. Or grab just the audio as MP3.",
    platformsAria: "Supported platforms",
    mascotAlt:
      "ClipKoala mascot: a koala hugging a clapperboard with a play button",
  },

  features: {
    eyebrow: "Why ClipKoala",
    title: "Everything a video downloader should do, nothing it should not",
    body: "Clean files, real quality choices, and a tool that respects your time and your privacy.",
    seeAll: "See all features",
    /** Same order as HOME_FEATURES in lib/features.ts (icons and links) */
    items: HOME_FEATURES.map(({ title, body }) => ({ title, body })),
  },

  how: {
    eyebrow: "How it works",
    title: "Three steps, about ten seconds",
    body: "No account, no app, nothing to install. Works on any phone or computer.",
    steps: [
      {
        title: "Copy a link",
        desc: "Tap Share in TikTok, YouTube, Instagram, or any supported app and copy the video link.",
      },
      {
        title: "Paste it into ClipKoala",
        desc: "The platform is detected automatically and the video appears with every available format in about two seconds.",
      },
      {
        title: "Save your file",
        desc: "Pick a quality, MP4 in HD or audio as MP3, and it lands in your downloads, named after the video.",
      },
    ],
  },

  platforms: {
    eyebrow: "Supported platforms",
    title: "One downloader for every feed",
    body: "Paste a link from any of these platforms. ClipKoala detects it and fetches the best quality available.",
    supports: Object.fromEntries(
      Object.entries(PLATFORMS).map(([id, meta]) => [id, meta.supports])
    ) as Record<PlatformId, string[]>,
  },

  trust: {
    eyebrow: "Built on trust",
    title: "A downloader you can recommend to your least technical friend",
    body: "Most download sites are a maze of fake buttons and pop-ups. ClipKoala is one box, one result, and a clear list of what you are about to save.",
    mascotAlt: "The ClipKoala koala hugging a clapperboard with a play button",
    /** Order matters: the second links to /privacy, the fourth to /status */
    points: [
      {
        title: "Free, with no catch",
        body: "No account, no paywall, no download limits, no 'premium' quality tier. Every format is available to everyone.",
      },
      {
        title: "We do not keep your links",
        body: "Links are resolved and discarded. Files stream through, never stored. History and favorites live only in your browser.",
      },
      {
        title: "Never asks for your passwords",
        body: "ClipKoala only reads public posts. It cannot access private accounts and never requests platform credentials.",
      },
      {
        title: "Honest about uptime",
        body: "A public status page runs live checks against every platform, so you can see for yourself when something is down.",
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Questions, answered",
    more: "More questions?",
    readFull: "Read the full FAQ",
    landingTitle: "{name} questions",
    home: HOME_FAQS.map(({ q, a }) => ({ q, a })),
  },

  cta: {
    title: "Ready to save your first clip?",
    body: "Paste a link from any of nine platforms. Free, no sign-up, about two seconds.",
    label: "Download a video",
    homeTitle: "Save your first clip in the next ten seconds",
    homeBody:
      "Scroll up, paste a link, and pick a quality. No account, no limits, no watermark.",
    homeLabel: "Back to the downloader",
    aria: "Get started",
  },

  landing: {
    allPlatforms: "All platforms",
    aboutAria: "About this downloader",
    guideEyebrow: "Step-by-step guide",
    answersBefore: "If a link fails, the most common causes are covered in",
    and: "and",
    audienceBefore: "If you are doing this as part of a bigger job, the",
    audienceLink: "workflow for {name}",
    audienceAfter: "sets out the whole thing.",
    moreDownloaders: "More downloaders",
    ogEyebrowPlatform: "{platform} downloader",
    ogEyebrowGeneric: "Free video downloader",
    ogAlt: "ClipKoala video downloader",
  },

  breadcrumbs: {
    aria: "Breadcrumb",
    home: "Home",
  },

  notFound: {
    title: "Page not found",
    heading: "This branch is empty",
    body: "The page you were looking for has moved or never existed. The downloader is one click away, and every platform has its own page.",
    cta: "Open the downloader",
  },
};
