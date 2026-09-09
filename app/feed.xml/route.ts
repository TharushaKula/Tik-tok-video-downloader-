import { GUIDES, GUIDE_SLUGS } from "@/lib/guides";
import { ANSWERS, ANSWER_SLUGS } from "@/lib/answers";
import { CHANGELOG } from "@/lib/changelog";
import { SITE, absoluteUrl } from "@/lib/site";

// An RSS feed for guides, answers, and product updates.
//
// The playbook's reasoning: people who want to follow the project should be
// able to, without handing over an email address. RSS costs nothing to run,
// collects nothing, and needs no consent banner.

export const dynamic = "force-static";
export const revalidate = 3600;

interface FeedItem {
  title: string;
  link: string;
  description: string;
  date: string;
  category: string;
}

/** Escape the five characters that are not legal as raw text in XML. */
function xml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(iso: string): string {
  return new Date(`${iso}T09:00:00Z`).toUTCString();
}

export function GET() {
  const items: FeedItem[] = [
    ...GUIDE_SLUGS.map((slug) => ({
      title: GUIDES[slug].h1,
      link: absoluteUrl(`/guides/${slug}`),
      description: GUIDES[slug].metaDescription,
      date: GUIDES[slug].updated,
      category: "Guide",
    })),
    ...ANSWER_SLUGS.map((slug) => ({
      title: ANSWERS[slug].h1,
      link: absoluteUrl(`/answers/${slug}`),
      // The direct answer makes a far better feed entry than a meta blurb.
      description: ANSWERS[slug].answer,
      date: ANSWERS[slug].updated,
      category: "Answer",
    })),
    ...CHANGELOG.map((entry) => ({
      title: entry.title,
      link: absoluteUrl("/changelog"),
      description: entry.items.join(" "),
      date: entry.date,
      category: "Release",
    })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(SITE.name)}: guides, answers, and updates</title>
    <link>${SITE.url}</link>
    <description>${xml(SITE.shortDescription)}</description>
    <language>en</language>
    <lastBuildDate>${rfc822(items[0]?.date ?? "2026-09-09")}</lastBuildDate>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
${items
  .map(
    (item) => `    <item>
      <title>${xml(item.title)}</title>
      <link>${item.link}</link>
      <guid isPermaLink="false">${item.link}#${item.date}</guid>
      <category>${item.category}</category>
      <pubDate>${rfc822(item.date)}</pubDate>
      <description>${xml(item.description)}</description>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
