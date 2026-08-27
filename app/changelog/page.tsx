import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";

import Navbar from "@/components/Navbar";
import Backdrop from "@/components/Backdrop";
import Footer from "@/components/Footer";
import { CHANGELOG } from "@/lib/changelog";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "What's new  SnapLoad",
  description:
    "Every improvement to SnapLoad  new platforms, features, and fixes.",
  alternates: { canonical: `${SITE_URL}/changelog` },
};

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function ChangelogPage() {
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
          Changelog
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-ink-hi sm:text-4xl">
          What&apos;s new
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-2">
          Every improvement to SnapLoad  new platforms, features, and fixes.
        </p>

        <div className="mt-10 space-y-4">
          {CHANGELOG.map((entry, i) => (
            <article key={`${entry.date}-${entry.title}`} className="card p-5">
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-[15px] font-semibold text-ink-hi">
                  {entry.title}
                </h2>
                <time className="text-xs text-ink-4" dateTime={entry.date}>
                  {formatDate(entry.date)}
                  {i === 0 ? " · Latest" : ""}
                </time>
              </div>
              <ul className="space-y-1.5">
                {entry.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm leading-relaxed text-ink-2"
                  >
                    <Check size={13} className="mt-1 shrink-0 text-ok" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
