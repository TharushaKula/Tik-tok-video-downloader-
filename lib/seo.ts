import type { Metadata } from "next";
import { SITE, absoluteUrl } from "./site";

// ── Metadata ──────────────────────────────────────────────────────────

interface PageMetaInput {
  /** Page title without the brand suffix (the layout template appends it) */
  title: string;
  description: string;
  /** Path starting with "/" */
  path: string;
  /** Open Graph type */
  type?: "website" | "article";
  /** Absolute title that should NOT get the "| ClipKoala" suffix */
  absoluteTitle?: boolean;
  /** Article dates (ISO) */
  publishedTime?: string;
  modifiedTime?: string;
  /** Override the auto-generated OG image */
  image?: string;
  noindex?: boolean;
}

/**
 * Build consistent, complete metadata for a page: canonical URL, Open Graph,
 * Twitter card, and robots. Every route should use this so nothing drifts.
 */
export function pageMetadata(input: PageMetaInput): Metadata {
  const url = absoluteUrl(input.path);
  const title = input.absoluteTitle ? { absolute: input.title } : input.title;
  const fullTitle = input.absoluteTitle
    ? input.title
    : `${input.title} | ${SITE.name}`;
  const images = input.image
    ? [{ url: input.image, width: 1200, height: 630, alt: fullTitle }]
    : undefined;

  return {
    title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: input.description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: input.type ?? "website",
      ...(input.type === "article"
        ? {
            publishedTime: input.publishedTime,
            modifiedTime: input.modifiedTime ?? input.publishedTime,
            authors: [SITE.name],
          }
        : {}),
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: input.description,
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
    ...(input.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

// ── Structured data (Schema.org) ──────────────────────────────────────
// Every builder returns a plain object; render with <JsonLd data={...} />.
// Only describe what is visibly on the page.

export const ORGANIZATION_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;
export const APP_ID = `${SITE.url}/#app`;

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE.name,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/icons/icon-512.png"),
      width: 512,
      height: 512,
    },
    foundingDate: SITE.foundingYear,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SITE.contactEmail,
      availableLanguage: ["English"],
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.shortDescription,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en",
  };
}

export function softwareApplicationSchema() {
  return {
    "@type": ["SoftwareApplication", "WebApplication"],
    "@id": APP_ID,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Download TikTok videos without watermark",
      "Download YouTube videos as MP4 up to 1080p",
      "Convert YouTube to MP3, M4A, WAV, or FLAC",
      "Download Instagram Reels, posts, and Stories",
      "Download Facebook videos and Reels",
      "Download X (Twitter) videos and GIFs",
      "Download Reddit videos with sound",
      "Download Pinterest video and image pins",
      "Download Twitch clips",
      "Download SoundCloud tracks as MP3",
      "Batch download up to 10 links at once",
    ],
    publisher: { "@id": ORGANIZATION_ID },
    image: absoluteUrl("/icons/icon-512.png"),
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function webPageSchema(input: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "CollectionPage" | "AboutPage" | "FAQPage" | "ContactPage";
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@type": input.type ?? "WebPage",
    "@id": `${absoluteUrl(input.path)}#webpage`,
    url: absoluteUrl(input.path),
    name: input.name,
    description: input.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": APP_ID },
    inLanguage: "en",
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
  };
}

export function howToSchema(input: {
  name: string;
  description: string;
  path: string;
  published: string;
  steps: { name: string; text: string; image?: string }[];
  image?: string;
}) {
  return {
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    datePublished: input.published,
    totalTime: "PT1M",
    estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
    tool: [{ "@type": "HowToTool", name: SITE.name }],
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
    step: input.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${absoluteUrl(input.path)}#step-${i + 1}`,
      ...(s.image ? { image: absoluteUrl(s.image) } : {}),
    })),
  };
}

export function articleSchema(input: {
  headline: string;
  description: string;
  path: string;
  published: string;
  modified?: string;
  image?: string;
}) {
  return {
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    mainEntityOfPage: absoluteUrl(input.path),
    datePublished: input.published,
    dateModified: input.modified ?? input.published,
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    image: absoluteUrl(input.image ?? `${input.path}/opengraph-image`),
    inLanguage: "en",
  };
}

/** Wrap one or more schema nodes into a single @graph document. */
export function graph(...nodes: Record<string, unknown>[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
