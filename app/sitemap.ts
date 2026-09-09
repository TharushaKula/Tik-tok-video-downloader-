import type { MetadataRoute } from "next";
import { GUIDES, GUIDE_SLUGS } from "@/lib/guides";
import { ANSWERS, ANSWER_SLUGS } from "@/lib/answers";
import { AUDIENCES, AUDIENCE_SLUGS } from "@/lib/audiences";
import { LANDING_PAGES, LANDING_SLUGS } from "@/lib/landing";
import { LEGAL_DOCS, LEGAL_SLUGS } from "@/lib/legal";
import { CHANGELOG } from "@/lib/changelog";
import { SITE_URL } from "@/lib/site";

// Every indexable page, with real lastModified dates where the content has
// one. API routes and image routes are deliberately absent.
const SITE_UPDATED = new Date("2026-09-09");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 1 },
    ...LANDING_SLUGS.map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified: new Date(LANDING_PAGES[slug].updated),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    { url: `${SITE_URL}/guides`, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 0.7 },
    ...GUIDE_SLUGS.map((slug) => ({
      url: `${SITE_URL}/guides/${slug}`,
      lastModified: new Date(GUIDES[slug].updated),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${SITE_URL}/for`, lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    ...AUDIENCE_SLUGS.map((slug) => ({
      url: `${SITE_URL}/for/${slug}`,
      lastModified: new Date(AUDIENCES[slug].updated),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/answers`, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 0.7 },
    ...ANSWER_SLUGS.map((slug) => ({
      url: `${SITE_URL}/answers/${slug}`,
      lastModified: new Date(ANSWERS[slug].updated),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${SITE_URL}/features`, lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/faq`, lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/extension`, lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/glossary`, lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/about`, lastModified: SITE_UPDATED, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/roadmap`, lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/press`, lastModified: SITE_UPDATED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/accessibility`, lastModified: SITE_UPDATED, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/security`, lastModified: SITE_UPDATED, changeFrequency: "yearly", priority: 0.2 },
    {
      url: `${SITE_URL}/changelog`,
      lastModified: new Date(CHANGELOG[0]?.date ?? SITE_UPDATED),
      changeFrequency: "weekly",
      priority: 0.4,
    },
    { url: `${SITE_URL}/status`, lastModified: SITE_UPDATED, changeFrequency: "always", priority: 0.3 },
    ...LEGAL_SLUGS.map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      lastModified: new Date(LEGAL_DOCS[slug].updated),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
