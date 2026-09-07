import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import CtaBanner from "@/components/sections/CtaBanner";

import { ALL_FAQS, FAQ_GROUPS } from "@/lib/faq";
import { faqSchema, graph, pageMetadata, webPageSchema } from "@/lib/seo";

const TITLE = "Frequently Asked Questions";
const DESCRIPTION =
  "Answers about ClipKoala: supported platforms, video quality, watermark-free TikTok downloads, YouTube to MP3, batch downloads, privacy, and troubleshooting.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/faq",
});

export default function FaqPage() {
  return (
    <PageShell>
      <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <PageHeader
          crumbs={[{ name: "FAQ", path: "/faq" }]}
          eyebrow="FAQ"
          title="Frequently asked questions"
          lede="Everything people ask about ClipKoala, in plain language. If your question is not here, the status page and the guides cover the rest."
        />

        <nav aria-label="FAQ sections" className="mt-8 flex flex-wrap gap-2">
          {FAQ_GROUPS.map((g) => (
            <a key={g.title} href={`#${slugify(g.title)}`} className="chip">
              {g.title}
            </a>
          ))}
        </nav>

        <div className="mt-10 space-y-10">
          {FAQ_GROUPS.map((group) => (
            <section key={group.title} id={slugify(group.title)} className="scroll-mt-24" aria-labelledby={`${slugify(group.title)}-title`}>
              <h2 id={`${slugify(group.title)}-title`} className="mb-4 text-xl font-extrabold text-ink-hi">
                {group.title}
              </h2>
              <div className="card divide-y divide-veil/[0.06] overflow-hidden">
                {group.items.map((faq) => (
                  <details key={faq.q} className="group">
                    <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-veil/[0.03] [&::-webkit-details-marker]:hidden">
                      <h3 className="text-[15px] font-semibold text-ink-1">{faq.q}</h3>
                      <ChevronDown size={16} className="shrink-0 text-ink-3 transition-transform duration-200 group-open:rotate-180" aria-hidden />
                    </summary>
                    <p className="px-5 pb-5 text-sm leading-relaxed text-ink-2">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-10 text-sm text-ink-3">
          Still stuck? Check the{" "}
          <Link href="/status" className="font-medium text-ink-1 underline decoration-accent/50 underline-offset-4 hover:text-accent">
            status page
          </Link>{" "}
          or read the{" "}
          <Link href="/guides" className="font-medium text-ink-1 underline decoration-accent/50 underline-offset-4 hover:text-accent">
            step-by-step guides
          </Link>
          .
        </p>
      </div>
      <CtaBanner />
      <JsonLd
        data={graph(
          webPageSchema({ path: "/faq", name: TITLE, description: DESCRIPTION, type: "FAQPage" }),
          faqSchema(ALL_FAQS)
        )}
      />
    </PageShell>
  );
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
