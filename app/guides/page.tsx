import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import CtaBanner from "@/components/sections/CtaBanner";

import { GUIDES, GUIDE_SLUGS } from "@/lib/guides";
import { PLATFORMS } from "@/lib/platforms";
import { absoluteUrl } from "@/lib/site";
import { graph, pageMetadata, webPageSchema } from "@/lib/seo";

const TITLE = "How-to Guides: Download Videos from Any Platform";
const DESCRIPTION =
  "Step-by-step guides for saving videos from TikTok, YouTube, Instagram, X, Facebook, Reddit, Pinterest, Twitch, and SoundCloud: watermark-free downloads, MP3 conversion, and batch downloading.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/guides",
});

export default function GuidesIndexPage() {
  return (
    <PageShell>
      <div className="mx-auto w-full max-w-page px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <PageHeader
          crumbs={[{ name: "Guides", path: "/guides" }]}
          eyebrow="Guides"
          title="How-to guides for saving videos"
          lede="Short, honest walkthroughs with real screenshots. Each guide covers one task from copying the link to the saved file, and links to the matching downloader."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDE_SLUGS.map((slug) => {
            const guide = GUIDES[slug];
            const meta = guide.platform ? PLATFORMS[guide.platform] : null;
            return (
              <li key={slug} className="reveal">
                <Link
                  href={`/guides/${slug}`}
                  className="focus-ring card card-hover group flex h-full flex-col p-6"
                >
                  <span className="mb-4 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs font-medium text-ink-3">
                      <BookOpen size={13} className={meta ? meta.text : "text-accent"} aria-hidden />
                      {meta ? meta.name : "All platforms"}
                    </span>
                    <span className="text-[11px] text-ink-4">
                      {guide.steps.length} steps
                    </span>
                  </span>
                  <h2 className="text-[17px] font-extrabold leading-snug text-ink-hi">
                    {guide.h1}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-3">
                    {guide.metaDescription}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                    Read the guide
                    <ArrowRight
                      size={12}
                      className="transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <CtaBanner />
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/guides",
            name: TITLE,
            description: DESCRIPTION,
            type: "CollectionPage",
          }),
          {
            "@type": "ItemList",
            itemListElement: GUIDE_SLUGS.map((slug, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: GUIDES[slug].h1,
              url: absoluteUrl(`/guides/${slug}`),
            })),
          }
        )}
      />
    </PageShell>
  );
}
