import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Check, Info } from "lucide-react";

import PageShell from "@/components/PageShell";
import Breadcrumbs from "@/components/Breadcrumbs";
import DownloaderTool from "@/components/DownloaderTool";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import CtaBanner from "@/components/sections/CtaBanner";

import { AUDIENCES, AUDIENCE_SLUGS } from "@/lib/audiences";
import { LANDING_FOR_PLATFORM, LANDING_PAGES } from "@/lib/landing";
import { GUIDES } from "@/lib/guides";
import { PLATFORMS } from "@/lib/platforms";
import { faqSchema, graph, pageMetadata, webPageSchema } from "@/lib/seo";

interface AudienceParams {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return AUDIENCE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: AudienceParams): Promise<Metadata> {
  const { slug } = await params;
  const copy = AUDIENCES[slug];
  if (!copy) return {};
  return pageMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: `/for/${copy.slug}`,
  });
}

export default async function AudiencePage({ params }: AudienceParams) {
  const { slug } = await params;
  const copy = AUDIENCES[slug];
  if (!copy) notFound();

  const tools = copy.tools.map((s) => LANDING_PAGES[s]).filter(Boolean);
  const guides = copy.guides.map((g) => GUIDES[g]).filter(Boolean);
  const others = AUDIENCE_SLUGS.filter((s) => s !== copy.slug);

  return (
    <PageShell tool>
      <section className="mx-auto w-full max-w-page px-4 pb-8 pt-8 sm:px-6 sm:pt-12">
        <Breadcrumbs
          crumbs={[
            { name: "Who it's for", path: "/for" },
            { name: copy.name, path: `/for/${copy.slug}` },
          ]}
        />
        <div className="rise mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent">
            For {copy.name.toLowerCase()}
          </span>
          <h1 className="text-balance text-3xl font-black leading-[1.08] text-ink-hi sm:text-[2.75rem]">
            {copy.h1}
          </h1>
          <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-ink-2 sm:text-base">
            {copy.sub}
          </p>
        </div>

        <div className="rise rise-2 mx-auto mt-8 w-full max-w-3xl">
          <DownloaderTool />
        </div>

        <ul className="rise rise-3 mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {copy.highlights.map((h) => (
            <li key={h} className="flex items-center gap-1.5 text-xs text-ink-2">
              <Check size={13} className="text-accent" aria-hidden />
              {h}
            </li>
          ))}
        </ul>
      </section>

      {/* The job, stated once, in the visitor's own words */}
      <section className="mx-auto w-full max-w-3xl px-4 pb-4 sm:px-6">
        <p className="reveal border-l-2 border-accent/40 pl-4 text-[17px] font-medium leading-relaxed text-ink-1">
          {copy.jobLine}
        </p>
      </section>

      {/* The workflow for this job specifically */}
      <section
        className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6"
        aria-labelledby="workflow-title"
      >
        <h2
          id="workflow-title"
          className="mb-5 text-xl font-extrabold text-ink-hi"
        >
          The workflow
        </h2>
        <ol className="space-y-3">
          {copy.workflow.map((step, i) => (
            <li key={step.title} className="reveal card flex gap-4 p-5">
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

      {/* Supporting prose */}
      <section
        className="mx-auto w-full max-w-3xl px-4 pb-10 sm:px-6"
        aria-label="Background"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {copy.sections.map((s) => (
            <article key={s.heading} className="reveal card prose-ck p-6">
              <h2 className="mb-3 text-lg font-extrabold text-ink-hi">
                {s.heading}
              </h2>
              <div className="space-y-3">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* The honest boundary, on the page rather than in a footnote */}
      <section className="mx-auto w-full max-w-3xl px-4 pb-10 sm:px-6">
        <div className="reveal rounded-2xl border border-veil/[0.08] bg-veil/[0.02] p-6">
          <h2 className="flex items-center gap-2 text-sm font-bold text-ink-hi">
            <Info size={14} className="text-ink-3" aria-hidden />
            What this will not do
          </h2>
          <ul className="mt-3 space-y-2">
            {copy.limits.map((l) => (
              <li
                key={l}
                className="flex gap-2 text-sm leading-relaxed text-ink-2"
              >
                <span className="text-ink-4" aria-hidden>
                  ·
                </span>
                {l}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Straight into the tools and guides this job needs */}
      <section
        className="mx-auto w-full max-w-3xl px-4 pb-10 sm:px-6"
        aria-labelledby="start-title"
      >
        <h2 id="start-title" className="mb-4 text-xl font-extrabold text-ink-hi">
          Start here
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {tools.map((t) => (
            <Link
              key={t.slug}
              href={`/${t.slug}`}
              className="focus-ring card card-hover group flex items-center gap-4 p-5"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-medium uppercase tracking-wider text-ink-3">
                  Downloader
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
        </div>
      </section>

      <FaqSection faqs={copy.faqs} title={`Questions from ${copy.name.toLowerCase()}`} moreLink />

      {/* Cross-links to the other audience pages */}
      <section
        className="mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6"
        aria-labelledby="others-title"
      >
        <h2
          id="others-title"
          className="mb-4 text-center text-sm font-bold uppercase tracking-wider text-ink-3"
        >
          Other jobs people bring here
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {others.map((s) => (
            <Link key={s} href={`/for/${s}`} className="chip">
              {AUDIENCES[s].name}
            </Link>
          ))}
          {copy.platforms.map((p) => (
            <Link key={p} href={`/${LANDING_FOR_PLATFORM[p]}`} className="chip">
              <span
                className={`h-1.5 w-1.5 rounded-full ${PLATFORMS[p].dot}`}
                aria-hidden
              />
              {PLATFORMS[p].name}
            </Link>
          ))}
        </div>
      </section>

      <CtaBanner />

      <JsonLd
        data={graph(
          webPageSchema({
            path: `/for/${copy.slug}`,
            name: copy.metaTitle,
            description: copy.metaDescription,
            dateModified: copy.updated,
          }),
          faqSchema(copy.faqs)
        )}
      />
    </PageShell>
  );
}
