import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Lightbulb } from "lucide-react";

import Navbar from "@/components/Navbar";
import Backdrop from "@/components/Backdrop";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

import { GUIDES, GUIDE_SLUGS } from "@/lib/guides";
import { LANDING_PAGES } from "@/lib/landing";
import { PLATFORMS } from "@/lib/platforms";
import { SITE_URL } from "@/lib/site";

interface GuideParams {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: GuideParams): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES[slug];
  if (!guide) return {};
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    keywords: guide.keywords,
    alternates: { canonical: `${SITE_URL}/guides/${guide.slug}` },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: `${SITE_URL}/guides/${guide.slug}`,
      siteName: "SnapLoad",
      type: "article",
    },
  };
}

export default async function GuidePage({ params }: GuideParams) {
  const { slug } = await params;
  const guide = GUIDES[slug];
  if (!guide) notFound();

  const meta = guide.platform ? PLATFORMS[guide.platform] : null;
  const landing = guide.landingSlug ? LANDING_PAGES[guide.landingSlug] : null;
  const others = GUIDE_SLUGS.filter((s) => s !== guide.slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: guide.h1,
      description: guide.metaDescription,
      datePublished: guide.published,
      step: guide.steps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
        text: s.body,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <div id="top" className="relative min-h-screen text-ink-1">
      <Backdrop />
      <Navbar />

      <main className="relative z-10 mx-auto w-full max-w-2xl px-4 pb-24 pt-16 sm:px-6">
        <Link
          href="/guides"
          className="focus-ring mb-8 inline-flex items-center gap-1.5 rounded-lg text-sm text-ink-3 transition-colors hover:text-ink-1"
        >
          <ArrowLeft size={14} />
          All guides
        </Link>

        <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
          Guide
          {meta && (
            <span className="flex items-center gap-1.5 normal-case tracking-normal text-ink-3">
              <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} aria-hidden />
              {meta.name}
            </span>
          )}
        </p>
        <h1 className="text-3xl font-semibold leading-[1.15] tracking-tight text-ink-hi sm:text-4xl">
          {guide.h1}
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-2">
          {guide.intro}
        </p>

        {/* Steps */}
        <ol className="mt-10 space-y-4">
          {guide.steps.map((step, i) => (
            <li key={step.title} className="card flex gap-4 p-5">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent"
                aria-hidden
              >
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-[15px] font-semibold text-ink-hi">
                  {step.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-2">
                  {step.body}
                </p>
                {step.images && step.images.length > 0 && (
                  <div
                    className={`mt-4 grid gap-3 ${
                      step.images.length > 1 ? "sm:grid-cols-2" : ""
                    }`}
                  >
                    {step.images.map((img) => (
                      <figure key={img.src} className="min-w-0">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          width={img.width}
                          height={img.height}
                          sizes="(max-width: 640px) 90vw, 280px"
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
        <div className="card mt-8 flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-[15px] font-semibold text-ink-hi">
              Ready to try it?
            </p>
            <p className="mt-1 text-sm text-ink-2">
              Free, no sign-up, works on any device.
            </p>
          </div>
          <Link
            href={landing ? `/${landing.slug}` : "/"}
            className="focus-ring inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl bg-btn px-4 text-sm font-semibold text-btn-ink transition-all hover:opacity-90 active:scale-[0.98]"
          >
            {landing ? `Open the ${meta?.name} downloader` : "Open SnapLoad"}
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Tips */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight text-ink-hi">
            Good to know
          </h2>
          <ul className="mt-4 space-y-2.5">
            {guide.tips.map((tip) => (
              <li
                key={tip}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-2"
              >
                <Lightbulb size={14} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                {tip}
              </li>
            ))}
          </ul>
        </section>

        <FaqSection faqs={guide.faqs} />

        {/* Other guides */}
        <section className="mt-4">
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-wider text-ink-3">
            More guides
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {others.map((slug) => {
              const other = GUIDES[slug];
              const otherMeta = other.platform ? PLATFORMS[other.platform] : null;
              return (
                <Link
                  key={slug}
                  href={`/guides/${slug}`}
                  className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-veil/[0.07] px-3 py-1.5 text-xs text-ink-2 transition-colors hover:border-veil/20 hover:text-ink-1"
                >
                  {otherMeta && (
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${otherMeta.dot}`}
                      aria-hidden
                    />
                  )}
                  {other.h1}
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
