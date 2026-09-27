import type { Metadata } from "next";
import Link from "next/link";

import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import CtaBanner from "@/components/sections/CtaBanner";

import { ROADMAP, ROADMAP_STATUS, type RoadmapStatus } from "@/lib/roadmap";
import { SITE } from "@/lib/site";
import { graph, pageMetadata, webPageSchema } from "@/lib/seo";

const TITLE = "Roadmap: What's Next for ClipKoala";
const DESCRIPTION =
  "What is being built, what is queued, what is under consideration, and what has been deliberately turned down. No dates, because dates would be a promise.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/roadmap",
});

const ORDER: RoadmapStatus[] = ["building", "next", "considering", "declined"];

const TONE: Record<RoadmapStatus, string> = {
  building: "border-accent/30 bg-accent/[0.06] text-accent",
  next: "border-veil/[0.12] bg-veil/[0.04] text-ink-2",
  considering: "border-veil/[0.08] bg-veil/[0.02] text-ink-3",
  declined: "border-veil/[0.08] bg-veil/[0.02] text-ink-3",
};

export default function RoadmapPage() {
  return (
    <PageShell>
      <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <PageHeader
          crumbs={[{ name: "Roadmap", path: "/roadmap" }]}
          eyebrow="Roadmap"
          title="What's next, and what isn't"
          lede="Nothing here carries a date. ClipKoala is a small project working against nine platforms that change without warning, and a dated roadmap would be a promise it could not keep. Items are ordered by how confident they are instead."
        />

        <div className="mt-10 space-y-10">
          {ORDER.map((status) => {
            const items = ROADMAP.filter((r) => r.status === status);
            if (items.length === 0) return null;
            const meta = ROADMAP_STATUS[status];
            return (
              <section key={status} aria-labelledby={`rm-${status}`}>
                <h2
                  id={`rm-${status}`}
                  className="text-xl font-extrabold text-ink-hi"
                >
                  {meta.label}
                </h2>
                <p className="mt-1 text-sm text-ink-3">{meta.blurb}</p>
                <ul className="mt-4 space-y-3">
                  {items.map((item) => (
                    <li
                      key={item.title}
                      className={`reveal rounded-2xl border p-5 ${TONE[status]}`}
                    >
                      <h3 className="text-[15px] font-bold text-ink-hi">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-2">
                        {item.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-veil/[0.08] bg-veil/[0.02] p-6">
          <h2 className="text-sm font-bold text-ink-hi">Want to push something up the list?</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-2">
            Email{" "}
            <a href={`mailto:${SITE.contactEmail}`} className="link-quiet">
              {SITE.contactEmail}
            </a>{" "}
            and say which one and why. What actually moves an item is a
            concrete description of the job it would let you finish. Anything
            that ships leaves this page and appears in the{" "}
            <Link href="/changelog" className="link-quiet">
              changelog
            </Link>
            , which is the honest record of what has already happened.
          </p>
        </div>
      </div>

      <CtaBanner />

      <JsonLd
        data={graph(
          webPageSchema({
            path: "/roadmap",
            name: TITLE,
            description: DESCRIPTION,
          })
        )}
      />
    </PageShell>
  );
}
