import type { MetadataRoute } from "next";
import { GUIDE_SLUGS } from "@/lib/guides";
import { LANDING_SLUGS } from "@/lib/landing";
import { LEGAL_SLUGS } from "@/lib/legal";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...LANDING_SLUGS.map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/guides`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    ...GUIDE_SLUGS.map((slug) => ({
      url: `${SITE_URL}/guides/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${SITE_URL}/changelog`,
      changeFrequency: "weekly" as const,
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/status`,
      changeFrequency: "always" as const,
      priority: 0.3,
    },
    ...LEGAL_SLUGS.map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
