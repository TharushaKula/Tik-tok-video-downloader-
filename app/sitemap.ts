import type { MetadataRoute } from "next";
import { LANDING_SLUGS } from "@/lib/landing";
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
      url: `${SITE_URL}/changelog`,
      changeFrequency: "weekly" as const,
      priority: 0.3,
    },
  ];
}
