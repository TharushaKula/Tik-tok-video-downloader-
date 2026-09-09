import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Check } from "lucide-react";

import PageShell from "@/components/PageShell";
import Breadcrumbs from "@/components/Breadcrumbs";
import DownloaderTool from "@/components/DownloaderTool";
import FaqSection from "@/components/FaqSection";
import HowItWorks from "@/components/HowItWorks";
import PlatformBadge from "@/components/PlatformBadge";
import JsonLd from "@/components/JsonLd";
import CtaBanner from "@/components/sections/CtaBanner";

import { LANDING_PAGES, LANDING_SLUGS } from "@/lib/landing";
import { ANSWERS } from "@/lib/answers";
import { AUDIENCES, AUDIENCE_SLUGS } from "@/lib/audiences";
import { GUIDES } from "@/lib/guides";
import { PLATFORMS } from "@/lib/platforms";
import { faqSchema, graph, pageMetadata, webPageSchema } from "@/lib/seo";

interface LandingParams {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return LANDING_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: LandingParams): Promise<Metadata> {
  const { slug } = await params;
  const copy = LANDING_PAGES[slug];
  if (!copy) return {};
  return pageMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: `/${copy.slug}`,
  });
}

export default async function LandingPage({ params }: LandingParams) {
  const { slug } = await params;
  const copy = LANDING_PAGES[slug];
  if (!copy) notFound();

  const meta = copy.platform ? PLATFORMS[copy.platform] : null;
  const accentText = meta ? meta.text : "text-accent";
  const related = copy.related.map((s) => LANDING_PAGES[s]).filter(Boolean);
  const others = LANDING_SLUGS.filter(
    (s) => s !== copy.slug && !copy.related.includes(s)
  );
  const guides = copy.guides.map((g) => GUIDES[g]).filter(Boolean);
  const answers = (copy.answers ?? []).map((a) => ANSWERS[a]).filter(Boolean);
  // One audience page whose job list mentions this tool, for a prose link.
  const audienceSlug = AUDIENCE_SLUGS.find((a) =>
    AUDIENCES[a].tools.includes(copy.slug)
  );
  const audience = audienceSlug ? AUDIENCES[audienceSlug] : null;

  return (
    <PageShell tool>
      <section className="mx-auto w-full max-w-page px-4 pb-8 pt-8 sm:px-6 sm:pt-12">
        <Breadcrumbs crumbs={[{ name: copy.name, path: `/${copy.slug}` }]} />
        <div className="rise mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          {copy.platform ? (
            <PlatformBadge platform={copy.platform} />
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent">
              All platforms
            </span>
          )}
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
              <Check size={13} className={accentText} aria-hidden />
              {h}
            </li>
          ))}
        </ul>
      </section>

      {/* Supporting content that answers the search intent */}
      <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6" aria-label="About this downloader">
        <div className="grid gap-4 md:grid-cols-2">
          {copy.sections.map((s) => (
            <article key={s.heading} className="reveal card prose-ck p-6">
              <h2 className="mb-3 text-lg font-extrabold text-ink-hi">{s.heading}</h2>
              <div className="space-y-3">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        {guides.length > 0 && (
          <div className="reveal mt-4 grid gap-4 sm:grid-cols-2">
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
                    Step-by-step guide
                  </span>
                  <span className="block text-[15px] font-bold text-ink-hi">{g.h1}</span>
                </span>
                <ArrowRight
                  size={16}
                  className="shrink-0 text-ink-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            ))}
          </div>
        )}
        {(answers.length > 0 || audience) && (
          <p className="reveal mt-6 text-sm leading-relaxed text-ink-3">
            {answers.length > 0 && (
              <>
                If a link fails, the most common causes are covered in{" "}
                {answers.map((a, i) => (
                  <span key={a.slug}>
                    {i > 0 && (i === answers.length - 1 ? " and " : ", ")}
                    <Link href={`/answers/${a.slug}`} className="link-quiet">
                      {a.shortTitle.toLowerCase()}
                    </Link>
                  </span>
                ))}
                .{" "}
              </>
            )}
            {audience && (
              <>
                If you are doing this as part of a bigger job, the{" "}
                <Link href={`/for/${audience.slug}`} className="link-quiet">
                  workflow for {audience.name.toLowerCase()}
                </Link>{" "}
                sets out the whole thing.
              </>
            )}
          </p>
        )}
      </section>

      <HowItWorks />

      <FaqSection
        faqs={copy.faqs}
        title={`${copy.name} questions`}
        moreLink
      />

      {/* Internal links to related and remaining downloaders */}
      <section className="mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6" aria-labelledby="more-title">
        <h2 id="more-title" className="mb-4 text-center text-sm font-bold uppercase tracking-wider text-ink-3">
          More downloaders
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {related.map((r) => (
            <Link key={r.slug} href={`/${r.slug}`} className="chip border-accent/30 text-ink-1">
              {r.platform && (
                <span className={`h-1.5 w-1.5 rounded-full ${PLATFORMS[r.platform].dot}`} aria-hidden />
              )}
              {r.name}
            </Link>
          ))}
          {others.map((s) => {
            const other = LANDING_PAGES[s];
            return (
              <Link key={s} href={`/${s}`} className="chip">
                {other.platform && (
                  <span className={`h-1.5 w-1.5 rounded-full ${PLATFORMS[other.platform].dot}`} aria-hidden />
                )}
                {other.name}
              </Link>
            );
          })}
          <Link href="/" className="chip">
            All platforms
          </Link>
        </div>
      </section>

      <CtaBanner />

      <JsonLd
        data={graph(
          webPageSchema({
            path: `/${copy.slug}`,
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
