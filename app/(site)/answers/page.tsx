import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import CtaBanner from "@/components/sections/CtaBanner";

import { ANSWERS, ANSWER_GROUPS, ANSWER_SLUGS } from "@/lib/answers";
import { PLATFORMS } from "@/lib/platforms";
import { absoluteUrl } from "@/lib/site";
import { graph, pageMetadata, webPageSchema } from "@/lib/seo";

const TITLE = "Answers: Why a Download Failed and What to Do";
const DESCRIPTION =
  "Straight answers to the problems people hit: Reddit videos with no sound, TikTok's Save greyed out, expired Stories, and which audio format to pick.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/answers",
});

export default function AnswersIndexPage() {
  return (
    <PageShell>
      <div className="mx-auto w-full max-w-page px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <PageHeader
          crumbs={[{ name: "Answers", path: "/answers" }]}
          eyebrow="Answers"
          title="Why it failed, and what to do about it"
          lede="Every page here starts with the direct answer, then explains it. Some problems have a fix; a few honestly do not, and those pages say so rather than sending you round in circles."
        />

        <div className="mt-10 space-y-12">
          {ANSWER_GROUPS.map((group) => {
            const items = ANSWER_SLUGS.filter(
              (s) => ANSWERS[s].kind === group.kind
            );
            if (items.length === 0) return null;
            return (
              <section key={group.kind} aria-labelledby={`group-${group.kind}`}>
                <h2
                  id={`group-${group.kind}`}
                  className="text-xl font-extrabold text-ink-hi"
                >
                  {group.title}
                </h2>
                <p className="mt-1 text-sm text-ink-3">{group.blurb}</p>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((slug) => {
                    const a = ANSWERS[slug];
                    const meta = a.platform ? PLATFORMS[a.platform] : null;
                    return (
                      <li key={slug} className="reveal">
                        <Link
                          href={`/answers/${slug}`}
                          className="focus-ring card card-hover group flex h-full flex-col p-6"
                        >
                          <span className="mb-3 flex items-center gap-2 text-xs font-medium text-ink-3">
                            {meta ? (
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${meta.dot}`}
                                aria-hidden
                              />
                            ) : null}
                            {meta ? meta.name : "All platforms"}
                          </span>
                          <h3 className="text-[17px] font-extrabold leading-snug text-ink-hi">
                            {a.h1}
                          </h3>
                          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-3">
                            {a.answer}
                          </p>
                          <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                            Read the answer
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
              </section>
            );
          })}
        </div>

        <p className="mt-12 max-w-2xl text-sm leading-relaxed text-ink-3">
          Looking for how to do something rather than why it broke? The{" "}
          <Link href="/guides" className="link-quiet">
            step-by-step guides
          </Link>{" "}
          cover each task end to end. If a platform seems to be having a bad
          day, the{" "}
          <Link href="/status" className="link-quiet">
            status page
          </Link>{" "}
          reports each resolver separately.
        </p>
      </div>

      <CtaBanner />

      <JsonLd
        data={graph(
          webPageSchema({
            path: "/answers",
            name: TITLE,
            description: DESCRIPTION,
            type: "CollectionPage",
          }),
          {
            "@type": "ItemList",
            itemListElement: ANSWER_SLUGS.map((slug, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: ANSWERS[slug].h1,
              url: absoluteUrl(`/answers/${slug}`),
            })),
          }
        )}
      />
    </PageShell>
  );
}
