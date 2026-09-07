import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Lightbulb } from "lucide-react";

import PageShell from "@/components/PageShell";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import CtaBanner from "@/components/sections/CtaBanner";

import { GUIDES, GUIDE_SLUGS } from "@/lib/guides";
import { LANDING_PAGES } from "@/lib/landing";
import { PLATFORMS } from "@/lib/platforms";
import {
  articleSchema,
  faqSchema,
  graph,
  howToSchema,
  pageMetadata,
} from "@/lib/seo";

interface GuideParams {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: GuideParams): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES[slug];
  if (!guide) return {};
  return pageMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: `/guides/${guide.slug}`,
    type: "article",
    publishedTime: guide.published,
    modifiedTime: guide.updated,
  });
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function GuidePage({ params }: GuideParams) {
  const { slug } = await params;
  const guide = GUIDES[slug];
  if (!guide) notFound();

  const meta = guide.platform ? PLATFORMS[guide.platform] : null;
  const landing = guide.landingSlug ? LANDING_PAGES[guide.landingSlug] : null;
  const others = GUIDE_SLUGS.filter((s) => s !== guide.slug).slice(0, 6);
  const firstImage = guide.steps.find((s) => s.images?.length)?.images?.[0]?.src;

  return (
    <PageShell>
      <article className="mx-auto w-full max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <Breadcrumbs
          crumbs={[
            { name: "Guides", path: "/guides" },
            { name: guide.shortTitle, path: `/guides/${guide.slug}` },
          ]}
        />
        <header className="rise">
          <p className="eyebrow mb-3 flex flex-wrap items-center gap-2">
            Guide
            {meta && (
              <span className="flex items-center gap-1.5 normal-case tracking-normal text-ink-3">
                <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} aria-hidden />
                {meta.name}
              </span>
            )}
          </p>
          <h1 className="text-balance text-3xl font-black leading-[1.1] text-ink-hi sm:text-[2.6rem]">
            {guide.h1}
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-2 sm:text-base">
            {guide.intro}
          </p>
          <p className="mt-3 text-xs text-ink-4">
            Updated <time dateTime={guide.updated}>{formatDate(guide.updated)}</time> ·{" "}
            {guide.steps.length} steps · about a minute
          </p>
        </header>

        {/* Steps */}
        <ol className="mt-10 space-y-4">
          {guide.steps.map((step, i) => (
            <li key={step.title} id={`step-${i + 1}`} className="reveal card flex gap-4 p-5 sm:p-6">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-extrabold text-white"
                aria-hidden
              >
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-extrabold text-ink-hi">{step.title}</h2>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{step.body}</p>
                {step.images && step.images.length > 0 && (
                  <div className={`mt-4 grid gap-3 ${step.images.length > 1 ? "sm:grid-cols-2" : ""}`}>
                    {step.images.map((img) => (
                      <figure key={img.src} className="min-w-0">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          width={img.width}
                          height={img.height}
                          sizes="(max-width: 640px) 90vw, 320px"
                          className="h-auto w-full rounded-xl border border-veil/[0.08] bg-raised"
                        />
                        <figcaption className="mt-1.5 text-xs leading-relaxed text-ink-4">
                          {img.caption}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>

        {/* CTA */}
        {landing && (
          <div className="reveal mt-8 flex flex-col items-start gap-4 rounded-2xl bg-brand p-6 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-extrabold">Try it now</p>
              <p className="mt-1 text-sm text-white/80">
                Open the {landing.name.toLowerCase()} and paste your link. Free, no sign-up.
              </p>
            </div>
            <Link
              href={`/${landing.slug}`}
              className="focus-ring inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-[#18192a]"
            >
              Open the {landing.name}
              <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        )}

        {/* Tips */}
        <section className="reveal mt-10" aria-labelledby="tips-title">
          <h2 id="tips-title" className="text-xl font-extrabold text-ink-hi">Good to know</h2>
          <ul className="mt-4 space-y-3">
            {guide.tips.map((tip) => (
              <li key={tip} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-2">
                <Lightbulb size={16} className="mt-1 shrink-0 text-accent" aria-hidden />
                {tip}
              </li>
            ))}
          </ul>
        </section>
      </article>

      <FaqSection faqs={guide.faqs} title="Common questions" />

      {/* Other guides */}
      <section className="mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6" aria-labelledby="more-guides">
        <h2 id="more-guides" className="mb-4 text-center text-sm font-bold uppercase tracking-wider text-ink-3">
          More guides
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {others.map((s) => {
            const other = GUIDES[s];
            const otherMeta = other.platform ? PLATFORMS[other.platform] : null;
            return (
              <Link key={s} href={`/guides/${s}`} className="chip">
                {otherMeta && (
                  <span className={`h-1.5 w-1.5 rounded-full ${otherMeta.dot}`} aria-hidden />
                )}
                {other.shortTitle}
              </Link>
            );
          })}
          <Link href="/guides" className="chip">
            All guides
          </Link>
        </div>
      </section>

      <CtaBanner
        href={landing ? `/${landing.slug}` : "/"}
        label={landing ? `Open the ${landing.name}` : "Download a video"}
      />

      <JsonLd
        data={graph(
          articleSchema({
            headline: guide.h1,
            description: guide.metaDescription,
            path: `/guides/${guide.slug}`,
            published: guide.published,
            modified: guide.updated,
            image: firstImage,
          }),
          howToSchema({
            name: guide.h1,
            description: guide.metaDescription,
            path: `/guides/${guide.slug}`,
            published: guide.published,
            image: firstImage,
            steps: guide.steps.map((s) => ({
              name: s.title,
              text: s.body,
              image: s.images?.[0]?.src,
            })),
          }),
          faqSchema(guide.faqs)
        )}
      />
    </PageShell>
  );
}
