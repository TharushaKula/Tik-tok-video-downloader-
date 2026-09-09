import type { Metadata } from "next";
import Link from "next/link";
import { Check, CircleDashed } from "lucide-react";

import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import CtaBanner from "@/components/sections/CtaBanner";

import { SITE } from "@/lib/site";
import { graph, pageMetadata, webPageSchema } from "@/lib/seo";

const TITLE = "Accessibility Statement";
const DESCRIPTION =
  "What works today in ClipKoala for keyboard and screen reader users, the known gaps that have not been fixed yet, and how to report a barrier.";
const UPDATED = "2026-09-09";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/accessibility",
});

// Claims here must be things that are actually true of the shipped site.
// An accessibility statement that overstates is worse than none at all.
const WORKS = [
  "Every control is reachable and operable with a keyboard alone, in a logical order, with a visible focus ring that is never removed.",
  "A Skip to content link is the first thing a keyboard or screen reader user reaches on every page.",
  "The downloader announces its state changes (loading, error, result) through a live region, so a result is not silent.",
  "Buttons that show only an icon carry an accessible name, and decorative images and icons are hidden from assistive technology.",
  "Headings run in order, one H1 per page, so a screen reader's heading list is a usable table of contents.",
  "Text and interface colours meet WCAG 2.1 AA contrast in both the light and dark themes.",
  "The theme follows your system preference until you override it, and the choice is remembered.",
  "Animations and scroll effects are disabled when your system asks for reduced motion.",
  "Layouts reflow to a single column and stay usable at 200% zoom and on small screens.",
  "Form fields have real labels, and errors are described in words rather than by colour alone.",
];

const GAPS = [
  "The command palette (Cmd or Ctrl + K) has not been tested end to end with a screen reader. Everything it does is reachable through the normal interface, so nothing is exclusive to it.",
  "Long batch queues announce each row's status individually, which can be verbose. Grouping those announcements is not done yet.",
  "The QR handoff dialog traps focus but has not been audited against every screen reader and browser combination.",
  "Guide screenshots have descriptive alt text, but there are no long descriptions for the more complex annotated images.",
  "No formal third-party audit has been carried out. Everything above is self-assessed, and this page says so rather than implying a certification that does not exist.",
];

export default function AccessibilityPage() {
  return (
    <PageShell>
      <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <PageHeader
          crumbs={[{ name: "Accessibility", path: "/accessibility" }]}
          eyebrow="Accessibility"
          title="Accessibility statement"
          lede="ClipKoala aims to meet WCAG 2.1 level AA. This page says what genuinely works today, what does not yet, and how to tell us when something blocks you."
        />

        <section className="mt-10" aria-labelledby="works-title">
          <h2 id="works-title" className="text-xl font-extrabold text-ink-hi">
            What works today
          </h2>
          <ul className="mt-4 space-y-2.5">
            {WORKS.map((w) => (
              <li key={w} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                <Check size={15} className="mt-0.5 shrink-0 text-ok" aria-hidden />
                {w}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="gaps-title">
          <h2 id="gaps-title" className="text-xl font-extrabold text-ink-hi">
            Known gaps
          </h2>
          <p className="mt-1 text-sm text-ink-3">
            Listed because pretending they do not exist helps nobody.
          </p>
          <ul className="mt-4 space-y-2.5">
            {GAPS.map((g) => (
              <li key={g} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                <CircleDashed
                  size={15}
                  className="mt-0.5 shrink-0 text-ink-4"
                  aria-hidden
                />
                {g}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="report-title">
          <h2 id="report-title" className="text-xl font-extrabold text-ink-hi">
            Reporting a barrier
          </h2>
          <div className="prose-ck mt-4 space-y-3">
            <p>
              Email{" "}
              <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>{" "}
              with the page, what you were trying to do, and the browser and
              assistive technology you were using. A specific report is worth
              far more than a general one, and accessibility reports go to the
              front of the queue.
            </p>
            <p>
              If something blocks you completely, say so in the subject line.
              Anything reported here that turns into a fix appears in the{" "}
              <Link href="/changelog">changelog</Link>, and anything that will
              take a while appears on the{" "}
              <Link href="/roadmap">roadmap</Link>.
            </p>
            <p className="text-xs text-ink-4">
              Last reviewed{" "}
              <time dateTime={UPDATED}>
                {new Date(UPDATED).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              . Self-assessed against WCAG 2.1 AA; no external audit has been
              carried out.
            </p>
          </div>
        </section>
      </div>

      <CtaBanner />

      <JsonLd
        data={graph(
          webPageSchema({
            path: "/accessibility",
            name: TITLE,
            description: DESCRIPTION,
            dateModified: UPDATED,
          })
        )}
      />
    </PageShell>
  );
}
