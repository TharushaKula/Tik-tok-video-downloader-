import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Crawl everything public; keep crawlers out of the API (no HTML there) and
// out of the deep-link query variant of the home page so it is never indexed
// as a duplicate.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/?url=", "/*?url="],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
