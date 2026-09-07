import { SITE } from "./site";

// Content for the Terms, Privacy, and DMCA pages. Plain data so the three
// routes share one renderer. This is honest, plain-language policy text for a
// free, no-account, no-logging downloader; it is not legal advice.

export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalDoc {
  slug: "terms" | "privacy" | "dmca";
  title: string;
  metaTitle: string;
  metaDescription: string;
  updated: string; // ISO date
  intro: string;
  sections: LegalSection[];
}

export const LEGAL_DOCS: Record<string, LegalDoc> = {
  terms: {
    slug: "terms",
    title: "Terms of Service",
    metaTitle: "Terms of Service",
    metaDescription:
      "The terms for using ClipKoala, a free online video downloader with no account and no limits. Short, readable, and honest.",
    updated: "2026-09-07",
    intro:
      "By using ClipKoala you agree to these terms. We have kept them short and readable.",
    sections: [
      {
        heading: "What ClipKoala is",
        body: [
          "ClipKoala is a free tool that fetches publicly accessible videos and audio from supported platforms and hands them to your browser as a download. There is no account, no payment, and no usage limit.",
          "ClipKoala is provided as-is, without warranty. Supported platforms change how they work often, so we cannot guarantee any specific link will always resolve.",
        ],
      },
      {
        heading: "Acceptable use",
        body: [
          "You may only download content you own, content you have permission to download, or content that is in the public domain or offered under a license that permits it.",
          "You are responsible for how you use downloaded files. Respect the rights of creators and the terms of service of each platform. Do not use ClipKoala to infringe copyright, harass anyone, or break the law.",
          "Do not attempt to overload, scrape, or abuse the service, or to bypass rate limits and protections.",
        ],
      },
      {
        heading: "Not affiliated",
        body: [
          "ClipKoala is an independent tool and is not affiliated with, endorsed by, or sponsored by TikTok, Instagram, Facebook, YouTube, X, Reddit, Pinterest, Twitch, SoundCloud, or any other platform. All trademarks belong to their respective owners.",
        ],
      },
      {
        heading: "Changes",
        body: [
          "We may update these terms as the service evolves. Continued use after a change means you accept the updated terms. The date at the top of this page tells you when it last changed.",
        ],
      },
      {
        heading: "Contact",
        body: [
          `Questions about these terms can be sent to ${SITE.contactEmail}.`,
        ],
      },
    ],
  },
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    metaTitle: "Privacy Policy",
    metaDescription:
      "How ClipKoala handles your data: links are processed and discarded, nothing is stored server-side, and your history stays in your own browser.",
    updated: "2026-09-07",
    intro:
      "ClipKoala is built to need as little of your data as possible. Here is exactly what happens.",
    sections: [
      {
        heading: "Links you paste",
        body: [
          "When you paste a link, it is sent to our server only to resolve the download, then discarded. We do not keep a log tying links to you, and we never sell or share this data.",
        ],
      },
      {
        heading: "What stays on your device",
        body: [
          "Your recent downloads, saved (starred) videos, theme choice, sound preference, and filename template live only in your browser's local storage. They never leave your device, and you can clear them anytime from the app.",
        ],
      },
      {
        heading: "Files",
        body: [
          "Downloads stream through our server to your browser and are not stored afterward. We keep no copies of the media you download.",
        ],
      },
      {
        heading: "Analytics",
        body: [
          "We use privacy-friendly, cookie-less analytics to count page views and understand which features are used. It does not build a profile of you or track you across other sites. We do not run advertising trackers.",
        ],
      },
      {
        heading: "Third parties",
        body: [
          "To resolve some platforms, links are passed to third-party resolver services. Those services have their own privacy practices, which we do not control.",
        ],
      },
      {
        heading: "Contact",
        body: [
          `Privacy questions can be sent to ${SITE.contactEmail}.`,
        ],
      },
    ],
  },
  dmca: {
    slug: "dmca",
    title: "Copyright & DMCA Policy",
    metaTitle: "Copyright & DMCA Policy",
    metaDescription:
      "ClipKoala respects copyright. How the tool works, what it does and does not store, and how to submit a takedown request.",
    updated: "2026-09-07",
    intro:
      "ClipKoala respects intellectual property rights and expects its users to do the same.",
    sections: [
      {
        heading: "How ClipKoala works",
        body: [
          "ClipKoala does not host, store, or index any videos. It fetches publicly accessible media on demand at your request and passes it to your browser. We hold no library of content and keep no copies.",
          "Because nothing is stored on our side, there is generally no hosted material for us to remove. Content remains under the control of the platform that hosts it.",
        ],
      },
      {
        heading: "Your responsibility",
        body: [
          "Only download content you own or have permission to download. Downloading copyrighted material you do not have rights to may violate the law and the source platform's terms.",
        ],
      },
      {
        heading: "Takedown requests",
        body: [
          `If you believe ClipKoala is facilitating access to material that infringes your copyright, email ${SITE.contactEmail} with: your contact details, identification of the work, the specific link involved, and a good-faith statement that the use is unauthorized.`,
          "For infringing content itself, the fastest resolution is to contact the platform actually hosting it, since that is where the file lives.",
        ],
      },
    ],
  },
};

export const LEGAL_SLUGS = Object.keys(LEGAL_DOCS);
