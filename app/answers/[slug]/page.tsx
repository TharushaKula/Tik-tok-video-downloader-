import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Lightbulb } from "lucide-react";

import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import PlatformBadge from "@/components/PlatformBadge";
import CtaBanner from "@/components/sections/CtaBanner";

import { ANSWERS, ANSWER_SLUGS } from "@/lib/answers";
import { LANDING_PAGES } from "@/lib/landing";
import { GUIDES } from "@/lib/guides";
import {
  articleSchema,
  faqSchema,
  graph,
  pageMetadata,
  webPageSchema,
} from "@/lib/seo";

interface AnswerParams {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return ANSWER_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: AnswerParams): Promise<Metadata> {
  const { slug } = await params;
  const copy = ANSWERS[slug];
  if (!copy) return {};
  return pageMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: `/answers/${copy.slug}`,
    type: "article",
    publishedTime: copy.published,
    modifiedTime: copy.updated,
  });
}

const KIND_LABEL = {
  problem: "Troubleshooting",
  comparison: "Comparison",
  question: "Answer",
} as const;

export default async function AnswerPage({ params }: AnswerParams) {
  const { slug } = await params;
  const copy = ANSWERS[slug];
  if (!copy) notFound();

  const tools = copy.tools.map((s) => LANDING_PAGES[s]).filter(Boolean);
  const guides = copy.guides.map((g) => GUIDES[g]).filter(Boolean);
  const related = copy.related.map((r) => ANSWERS[r]).filter(Boolean);

  return (
    <PageShell>
      <article className="mx-auto w-full max-w-3xl px-4 pb-12 pt-8 sm:px-6 sm:pt-12">
        <PageHeader
          crumbs={[
            { name: "Answers", path: "/answers" },
            { name: copy.shortTitle, path: `/answers/${copy.slug}` },
          ]}
          eyebrow={KIND_LABEL[copy.kind]}
          title={copy.h1}
        >
          {copy.platform ? (
            <div className="mt-4">
              <PlatformBadge platform={copy.platform} />
            </div>
          ) : null}
        </PageHeader>

        {/* The direct answer, before any steps or background */}
        <div className="reveal mt-8 rounded-2xl border border-accent/25 bg-accent/[0.06] p-6">
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
            <Lightbulb size={13} aria-hidden />
            Short answer
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-1">
            {copy.answer}
          </p>
        </div>

        {copy.steps && copy.steps.length > 0 && (
          <section className="mt-10" aria-labelledby="steps-title">
            <h2
              id="steps-title"
              className="mb-5 text-xl font-extrabold text-ink-hi"
            >
              What to do
            </h2>
            <ol className="space-y-3">
              {copy.steps.map((step, i) => (
                <li
                  key={step.title}
                  id={`step-${i + 1}`}
                  className="reveal card flex scroll-mt-24 gap-4 p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-sm font-black text-accent">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-bold text-ink-hi">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-2">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {copy.table && (
          <section className="mt-10" aria-labelledby="table-title">
            <h2
              id="table-title"
              className="mb-4 text-xl font-extrabold text-ink-hi"
            >
              Side by side
            </h2>
            {/* Wide tables scroll inside their own box, never the page */}
            <div className="reveal card overflow-x-auto">
              <table className="w-full min-w-[32rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-veil/[0.08]">
                    {copy.table.columns.map((c) => (
                      <th
                        key={c}
                        scope="col"
                        className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-ink-3"
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {copy.table.rows.map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-veil/[0.05] last:border-0"
                    >
                      <th
                        scope="row"
                        className="px-4 py-3 text-left font-semibold text-ink-hi"
                      >
                        {row.label}
                      </th>
                      {row.cells.map((cell, i) => (
                        <td key={i} className="px-4 py-3 text-ink-2">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <div className="prose-ck mt-10 space-y-8">
          {copy.sections.map((s) => (
            <section key={s.heading} className="reveal">
              <h2 className="mb-3 text-xl font-extrabold text-ink-hi">
                {s.heading}
              </h2>
              <div className="space-y-3">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Straight into the tool that solves it */}
        {(tools.length > 0 || guides.length > 0) && (
          <section className="mt-10 grid gap-3 sm:grid-cols-2" aria-label="Next steps">
            {tools.map((t) => (
              <Link
                key={t.slug}
                href={`/${t.slug}`}
                className="focus-ring card card-hover group flex items-center gap-4 p-5"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-medium uppercase tracking-wider text-ink-3">
                    Try it
                  </span>
                  <span className="block text-[15px] font-bold text-ink-hi">
                    {t.name}
                  </span>
                </span>
                <ArrowRight
                  size={16}
                  className="shrink-0 text-ink-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            ))}
            {guides.map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="focus-ring card card-hover group flex items-center gap-4 p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <BookOpen size={16} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-medium uppercase tracking-wider text-ink-3">
                    Guide
                  </span>
                  <span className="block text-[15px] font-bold text-ink-hi">
                    {g.shortTitle}
                  </span>
                </span>
                <ArrowRight
                  size={16}
                  className="shrink-0 text-ink-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            ))}
          </section>
        )}

        <p className="mt-8 text-xs text-ink-4">
          Last checked{" "}
          <time dateTime={copy.updated}>
            {new Date(copy.updated).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          .
        </p>
      </article>

      <FaqSection faqs={copy.faqs} title="Related questions" moreLink />

      {related.length > 0 && (
        <section
          className="mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6"
          aria-labelledby="related-title"
        >
          <h2
            id="related-title"
            className="mb-4 text-center text-sm font-bold uppercase tracking-wider text-ink-3"
          >
            Related answers
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {related.map((r) => (
              <Link key={r.slug} href={`/answers/${r.slug}`} className="chip">
                {r.shortTitle}
              </Link>
            ))}
            <Link href="/answers" className="chip">
              All answers
            </Link>
          </div>
        </section>
      )}

      <CtaBanner />

      <JsonLd
        data={graph(
          webPageSchema({
            path: `/answers/${copy.slug}`,
            name: copy.metaTitle,
            description: copy.metaDescription,
            datePublished: copy.published,
            dateModified: copy.updated,
          }),
          articleSchema({
            headline: copy.h1,
            description: copy.answer,
            path: `/answers/${copy.slug}`,
            published: copy.published,
            modified: copy.updated,
          }),
          faqSchema(copy.faqs)
        )}
      />
    </PageShell>
  );
}
