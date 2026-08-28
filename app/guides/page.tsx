import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";

import Navbar from "@/components/Navbar";
import Backdrop from "@/components/Backdrop";
import Footer from "@/components/Footer";

import { GUIDES, GUIDE_SLUGS } from "@/lib/guides";
import { PLATFORMS } from "@/lib/platforms";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "How-to Guides  Download Videos from Any Platform | SnapLoad",
  description:
    "Step-by-step guides for saving videos from TikTok, YouTube, Instagram, X, Facebook, and more: watermark-free downloads, MP3 conversion, batch downloading.",
  alternates: { canonical: `${SITE_URL}/guides` },
};

export default function GuidesIndexPage() {
  return (
    <div id="top" className="relative min-h-screen text-ink-1">
      <Backdrop />
      <Navbar />

      <main className="relative z-10 mx-auto w-full max-w-2xl px-4 pb-24 pt-16 sm:px-6">
        <Link
          href="/"
          className="focus-ring mb-8 inline-flex items-center gap-1.5 rounded-lg text-sm text-ink-3 transition-colors hover:text-ink-1"
        >
          <ArrowLeft size={14} />
          Back to the downloader
        </Link>

        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
          Guides
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-ink-hi sm:text-4xl">
          How-to guides
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-2">
          Short, honest walkthroughs for getting the most out of SnapLoad, from
          watermark-free TikToks to batch downloading.
        </p>

        <div className="mt-10 space-y-4">
          {GUIDE_SLUGS.map((slug) => {
            const guide = GUIDES[slug];
            const meta = guide.platform ? PLATFORMS[guide.platform] : null;
            return (
              <Link
                key={slug}
                href={`/guides/${slug}`}
                className="focus-ring group card flex items-center gap-4 p-5 transition-colors hover:border-veil/20"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-veil/[0.07] bg-raised"
                  aria-hidden
                >
                  <BookOpen size={16} className={meta ? meta.text : "text-accent"} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold text-ink-hi">
                    {guide.h1}
                  </span>
                  <span className="mt-0.5 block truncate text-sm text-ink-3">
                    {guide.intro}
                  </span>
                </span>
                <ArrowRight
                  size={16}
                  className="shrink-0 text-ink-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
