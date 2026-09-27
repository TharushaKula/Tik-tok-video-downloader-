import type { Metadata } from "next";
import { Check } from "lucide-react";

import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import CtaBanner from "@/components/sections/CtaBanner";

import { CHANGELOG } from "@/lib/changelog";
import { graph, pageMetadata, webPageSchema } from "@/lib/seo";

const TITLE = "What's New in ClipKoala";
const DESCRIPTION =
  "Every improvement to ClipKoala: new platforms, features, fixes, and design updates, newest first.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/changelog",
});

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
    <PageShell>
      <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <PageHeader
          crumbs={[{ name: "What's new", path: "/changelog" }]}
          eyebrow="Changelog"
          title="What's new"
          lede="Every improvement to ClipKoala: new platforms, features, and fixes, newest first."
        />

        <ol className="mt-10 space-y-4">
          {CHANGELOG.map((entry, i) => (
            <li key={`${entry.date}-${entry.title}`} className="reveal card p-6">
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-lg font-extrabold text-ink-hi">{entry.title}</h2>
                <time className="text-xs text-ink-4" dateTime={entry.date}>
                  {formatDate(entry.date)}
                  {i === 0 ? " · Latest" : ""}
                </time>
              </div>
              <ul className="space-y-2">
                {entry.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-2">
                    <Check size={14} className="mt-1 shrink-0 text-ok" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
      <CtaBanner />
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/changelog",
            name: TITLE,
            description: DESCRIPTION,
            dateModified: CHANGELOG[0]?.date,
          })
        )}
      />
    </PageShell>
  );
}
