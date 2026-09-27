import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import CtaBanner from "@/components/sections/CtaBanner";

import { AUDIENCES, AUDIENCE_SLUGS } from "@/lib/audiences";
import { absoluteUrl } from "@/lib/site";
import { graph, pageMetadata, webPageSchema } from "@/lib/seo";

const TITLE = "Who ClipKoala Is For: Four Jobs It Does Well";
const DESCRIPTION =
  "Creators backing up their own posts, editors collecting reference clips, teachers saving lecture audio, and social managers archiving campaigns.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/for",
});

export default function AudienceIndexPage() {
  return (
    <PageShell>
      <div className="mx-auto w-full max-w-page px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <PageHeader
          crumbs={[{ name: "Who it's for", path: "/for" }]}
          eyebrow="Who it's for"
          title="Four jobs this tool does well"
          lede="The same downloader, framed around the work you are actually trying to finish. Each page has the workflow for that job, the honest limits, and the tools worth starting with."
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {AUDIENCE_SLUGS.map((slug) => {
            const a = AUDIENCES[slug];
            return (
              <li key={slug} className="reveal">
                <Link
                  href={`/for/${slug}`}
                  className="focus-ring card card-hover group flex h-full flex-col p-6"
                >
                  <span className="text-xs font-medium uppercase tracking-wider text-ink-3">
                    For {a.name.toLowerCase()}
                  </span>
                  <h2 className="mt-3 text-[19px] font-extrabold leading-snug text-ink-hi">
                    {a.h1}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">
                    {a.jobLine}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                    See the workflow
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

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-3">
          None of these quite fit? The{" "}
          <Link href="/" className="link-quiet">
            downloader itself
          </Link>{" "}
          works the same way for every job: paste a public link, pick a
          quality, get the file. The{" "}
          <Link href="/guides" className="link-quiet">
            guides
          </Link>{" "}
          cover individual tasks, and the{" "}
          <Link href="/answers" className="link-quiet">
            answers
          </Link>{" "}
          section covers what to do when something fails.
        </p>
      </div>

      <CtaBanner />

      <JsonLd
        data={graph(
          webPageSchema({
            path: "/for",
            name: TITLE,
            description: DESCRIPTION,
            type: "CollectionPage",
          }),
          {
            "@type": "ItemList",
            itemListElement: AUDIENCE_SLUGS.map((slug, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: AUDIENCES[slug].h1,
              url: absoluteUrl(`/for/${slug}`),
            })),
          }
        )}
      />
    </PageShell>
  );
}
