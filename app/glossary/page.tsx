import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import CtaBanner from "@/components/sections/CtaBanner";

import { GLOSSARY_SORTED } from "@/lib/glossary";
import { absoluteUrl } from "@/lib/site";
import { graph, pageMetadata, webPageSchema } from "@/lib/seo";

const TITLE = "Video Download Glossary: Bitrate, Codec, MP4, FLAC";
const DESCRIPTION =
  "Plain-English definitions of the terms you meet when downloading video and audio: bitrate, codec, container, muxing, watermark, and MP3 vs FLAC.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/glossary",
});

export default function GlossaryPage() {
  return (
    <PageShell>
      <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <PageHeader
          crumbs={[{ name: "Glossary", path: "/glossary" }]}
          eyebrow="Glossary"
          title="Video download terms, explained"
          lede="Short definitions of the words that show up when you save video and audio, and where each one matters in ClipKoala."
        />

        <nav aria-label="Terms" className="mt-8 flex flex-wrap gap-2">
          {GLOSSARY_SORTED.map((t) => (
            <a key={t.slug} href={`#${t.slug}`} className="chip">
              {t.term}
            </a>
          ))}
        </nav>

        <dl className="mt-10 space-y-4">
          {GLOSSARY_SORTED.map((t) => (
            <div key={t.slug} id={t.slug} className="reveal card scroll-mt-24 p-6">
              <dt className="text-lg font-extrabold text-ink-hi">{t.term}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-ink-2">
                {t.definition}
                {t.link && (
                  <Link
                    href={t.link.href}
                    className="focus-ring mt-2 inline-flex items-center gap-1 rounded text-sm font-semibold text-accent hover:underline"
                  >
                    {t.link.label}
                    <ArrowRight size={13} aria-hidden />
                  </Link>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <CtaBanner />
      <JsonLd
        data={graph(
          webPageSchema({ path: "/glossary", name: TITLE, description: DESCRIPTION }),
          {
            "@type": "DefinedTermSet",
            "@id": absoluteUrl("/glossary#terms"),
            name: "ClipKoala video download glossary",
            hasDefinedTerm: GLOSSARY_SORTED.map((t) => ({
              "@type": "DefinedTerm",
              name: t.term,
              description: t.definition,
              url: absoluteUrl(`/glossary#${t.slug}`),
            })),
          }
        )}
      />
    </PageShell>
  );
}
