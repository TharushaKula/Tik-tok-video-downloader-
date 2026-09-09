import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import CtaBanner from "@/components/sections/CtaBanner";

import { PLATFORMS, PLATFORM_IDS } from "@/lib/platforms";
import { SITE } from "@/lib/site";
import { graph, pageMetadata, webPageSchema } from "@/lib/seo";

const TITLE = "Press Kit: Logos, Facts, and Contact";
const DESCRIPTION =
  "Brand assets, accurate product facts, and contact details for anyone writing about ClipKoala, listing it in a directory, or reviewing it.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/press",
});

// Facts a directory or a journalist will otherwise guess at. Keeping them on
// one page, derived from the same constants the product uses, is what stops
// a listing claiming "unlimited 4K downloads" six months from now.
const FACTS: { label: string; value: string }[] = [
  { label: "Name", value: SITE.name },
  { label: "Website", value: SITE.domain },
  { label: "What it is", value: "A free, browser-based video and audio downloader" },
  { label: "Launched", value: SITE.foundingYear },
  { label: "Price", value: "Free. No account, no paid tier, no trial." },
  {
    label: "Platforms",
    value: `${SITE.platformCount}: ${PLATFORM_IDS.map((id) => PLATFORMS[id].name).join(", ")}`,
  },
  { label: "Video formats", value: "MP4, up to 1080p. No 4K." },
  { label: "Audio formats", value: "MP3 (320kbps), M4A, WAV, FLAC" },
  { label: "Batch limit", value: "10 links per batch, fetched 3 at a time" },
  { label: "Platforms it runs on", value: "Any modern browser, installable as a PWA, plus a Chrome and Edge extension" },
  { label: "Data stored", value: "None. No accounts, no saved files, no server-side history." },
  { label: "Contact", value: SITE.contactEmail },
];

const ASSETS = [
  {
    src: "/brand/lockup-horizontal.webp",
    label: "Horizontal lockup",
    note: "Primary mark. Use on light or dark backgrounds with clear space around it.",
    width: 640,
    height: 160,
  },
  {
    src: "/brand/lockup-vertical.webp",
    label: "Vertical lockup",
    note: "For square and portrait placements.",
    width: 400,
    height: 400,
  },
  {
    src: "/brand/mascot-256.png",
    label: "Mascot",
    note: "The koala on its own, for avatars and small placements.",
    width: 256,
    height: 256,
  },
];

export default function PressPage() {
  return (
    <PageShell>
      <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <PageHeader
          crumbs={[{ name: "Press kit", path: "/press" }]}
          eyebrow="Press kit"
          title="Everything you need to write about ClipKoala"
          lede="Accurate facts, the logos, and a person who answers email. If a number here disagrees with something you read elsewhere, this page is the one that is kept current."
        />

        <section className="mt-10" aria-labelledby="facts-title">
          <h2 id="facts-title" className="text-xl font-extrabold text-ink-hi">
            Product facts
          </h2>
          <div className="card mt-4 overflow-x-auto">
            <table className="w-full min-w-[30rem] text-left text-sm">
              <tbody>
                {FACTS.map((f) => (
                  <tr
                    key={f.label}
                    className="border-b border-veil/[0.05] last:border-0"
                  >
                    <th
                      scope="row"
                      className="w-44 px-4 py-3 align-top text-left font-semibold text-ink-hi"
                    >
                      {f.label}
                    </th>
                    <td className="px-4 py-3 text-ink-2">{f.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10" aria-labelledby="assets-title">
          <h2 id="assets-title" className="text-xl font-extrabold text-ink-hi">
            Brand assets
          </h2>
          <p className="mt-1 text-sm text-ink-3">
            Right-click and save. Please use them as supplied.
          </p>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {ASSETS.map((a) => (
              <li key={a.src} className="card p-5">
                <div className="flex h-24 items-center justify-center rounded-xl bg-veil/[0.04] p-3">
                  <Image
                    src={a.src}
                    alt={`ClipKoala ${a.label.toLowerCase()}`}
                    width={a.width}
                    height={a.height}
                    className="max-h-full w-auto object-contain"
                  />
                </div>
                <p className="mt-3 text-sm font-bold text-ink-hi">{a.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-3">
                  {a.note}
                </p>
                <a
                  href={a.src}
                  download
                  className="focus-ring mt-3 inline-block rounded text-xs font-semibold text-accent"
                >
                  Download asset
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="usage-title">
          <h2 id="usage-title" className="text-xl font-extrabold text-ink-hi">
            Using the brand
          </h2>
          <div className="prose-ck mt-4 space-y-3">
            <p>
              You may use these assets to write about, review, or list
              ClipKoala without asking. Please do not stretch, recolour, or
              rebuild the mark, place it on a busy background, or use it in a
              way that implies ClipKoala endorses your product.
            </p>
            <p>
              The name and the koala mark belong to ClipKoala. The platform
              names and logos that appear across the site belong to their
              owners, and ClipKoala is not affiliated with, endorsed by, or
              sponsored by any of them.
            </p>
          </div>
        </section>

        <section className="mt-10" aria-labelledby="angle-title">
          <h2 id="angle-title" className="text-xl font-extrabold text-ink-hi">
            What the story actually is
          </h2>
          <div className="prose-ck mt-4 space-y-3">
            <p>
              An independent tool with no accounts, no stored files, and no
              paid tier, built against nine platforms that change how they
              serve media without warning. The interesting parts are the
              engineering ones: failing over between resolvers, merging
              Reddit&apos;s separate audio and video streams, and running the
              whole thing without keeping anything about the people who use it.
            </p>
            <p>
              What it is not is a way around copyright, paywalls, or private
              accounts. Those requests simply fail, deliberately. If a pitch
              you receive frames it that way, it did not come from here. The{" "}
              <Link href="/terms">terms</Link>,{" "}
              <Link href="/privacy">privacy policy</Link>, and{" "}
              <Link href="/dmca">DMCA policy</Link> set out the position, and
              the <Link href="/roadmap">roadmap</Link> lists what has been
              turned down on purpose.
            </p>
            <p>
              Questions, review copies of anything, or a quote:{" "}
              <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
            </p>
          </div>
        </section>
      </div>

      <CtaBanner />

      <JsonLd
        data={graph(
          webPageSchema({
            path: "/press",
            name: TITLE,
            description: DESCRIPTION,
          })
        )}
      />
    </PageShell>
  );
}
