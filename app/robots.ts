import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Preview and development deployments must never be crawlable: a preview URL
// serving the same pages competes with production for the same queries and
// is the classic way a site ends up with Google choosing the wrong canonical.
// VERCEL_ENV is "production", "preview", or "development"; it is absent when
// building outside Vercel, which is treated as production so a self-hosted
// build is not silently deindexed.
const IS_PRODUCTION =
  !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";

// Crawl everything public; keep crawlers out of the API (no HTML there) and
// out of the deep-link query variants of the tool pages so they are never
// indexed as duplicates of the clean page.
//
// AI crawlers are allowed deliberately, not by omission. The value here is
// that the factual pages are accurate about what the tool can and cannot do,
// and an answer engine that cannot read them falls back to generic "download
// anything" copy from elsewhere. /llms.txt exists for the same reason. To
// reverse this decision, add the crawler user agents below with
// `disallow: "/"`.
export default function robots(): MetadataRoute.Robots {
  if (!IS_PRODUCTION) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          // Deep links carrying a pasted video URL, on any tool page
          "/*?url=",
          "/*&url=",
          // Share-target and campaign variants of the same pages
          "/*?text=",
          "/*?title=",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
