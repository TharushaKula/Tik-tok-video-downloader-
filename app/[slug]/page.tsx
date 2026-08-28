import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, Check } from "lucide-react";

import Navbar from "@/components/Navbar";
import Backdrop from "@/components/Backdrop";
import DownloaderTool from "@/components/DownloaderTool";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import PlatformBadge from "@/components/PlatformBadge";

import { LANDING_PAGES, LANDING_SLUGS } from "@/lib/landing";
import { GUIDE_FOR_PLATFORM } from "@/lib/guides";
import { PLATFORMS } from "@/lib/platforms";
import { SITE_URL } from "@/lib/site";

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
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    keywords: copy.keywords,
    alternates: { canonical: `${SITE_URL}/${copy.slug}` },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      url: `${SITE_URL}/${copy.slug}`,
      siteName: "SnapLoad",
      type: "website",
    },
  };
}

export default async function LandingPage({ params }: LandingParams) {
  const { slug } = await params;
  const copy = LANDING_PAGES[slug];
  if (!copy) notFound();

  const meta = PLATFORMS[copy.platform];
  const others = LANDING_SLUGS.filter((s) => s !== copy.slug);
  const guideSlug = GUIDE_FOR_PLATFORM[copy.platform];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div id="top" className="relative min-h-screen text-ink-1">
      <Backdrop />
      <Navbar />

      <main className="relative z-10">
        {/* Platform hero + tool */}
        <section className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 px-4 pb-6 pt-16 sm:px-6 sm:pt-20">
          <div className="flex flex-col items-center gap-4 text-center">
            <PlatformBadge platform={copy.platform} />
            <h1 className="text-3xl font-semibold leading-[1.15] tracking-tight text-ink-hi sm:text-[2.6rem]">
              {copy.h1}
            </h1>
            <p className="mx-auto max-w-md text-[15px] leading-relaxed text-ink-2">
              {copy.sub}
            </p>
          </div>

          <DownloaderTool />

          {/* Highlights strip */}
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {copy.highlights.map((h) => (
              <li
                key={h}
                className="flex items-center gap-1.5 text-xs text-ink-3"
              >
                <Check size={12} className={meta.text} aria-hidden />
                {h}
              </li>
            ))}
          </ul>

          {guideSlug && (
            <Link
              href={`/guides/${guideSlug}`}
              className="focus-ring -mt-2 inline-flex items-center gap-1.5 rounded-lg text-xs font-medium text-ink-3 underline decoration-veil/30 underline-offset-4 transition-colors hover:text-ink-1"
            >
              <BookOpen size={12} aria-hidden />
              New to this? Read the step-by-step guide
            </Link>
          )}
        </section>

        <FaqSection faqs={copy.faqs} />

        {/* Internal links to the other downloaders */}
        <section className="mx-auto w-full max-w-2xl px-4 pb-20 sm:px-6">
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-wider text-ink-3">
            More downloaders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <Link
              href="/"
              className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-veil/[0.07] px-3 py-1.5 text-xs text-ink-2 transition-colors hover:border-veil/20 hover:text-ink-1"
            >
              All platforms
            </Link>
            {others.map((slug) => {
              const other = LANDING_PAGES[slug];
              const otherMeta = PLATFORMS[other.platform];
              return (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-veil/[0.07] px-3 py-1.5 text-xs text-ink-2 transition-colors hover:border-veil/20 hover:text-ink-1"
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${otherMeta.dot}`}
                    aria-hidden
                  />
                  {otherMeta.name}
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  );
}
