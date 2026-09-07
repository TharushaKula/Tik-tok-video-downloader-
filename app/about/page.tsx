import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import CtaBanner from "@/components/sections/CtaBanner";

import { SITE } from "@/lib/site";
import { graph, pageMetadata, webPageSchema } from "@/lib/seo";

const TITLE = "About ClipKoala";
const DESCRIPTION =
  "ClipKoala is a free, privacy-respecting video downloader for nine platforms. Learn how it works, what it stores (nothing), and the principles behind it.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/about",
});

const PRINCIPLES = [
  {
    title: "One box, one result",
    body: "No fake download buttons, no pop-ups, no countdown timers. You paste a link and see exactly what you can save, with the quality and format spelled out.",
  },
  {
    title: "Original files, not re-encodes",
    body: "ClipKoala fetches the file the platform actually serves. TikToks arrive without the watermark because we get the clean original, not because we blur it out.",
  },
  {
    title: "Nothing stored, nothing tracked",
    body: "Links are resolved and discarded. Files stream through and are never kept. Your history and favorites live in your own browser. Analytics are cookie-less page counts.",
  },
  {
    title: "Free means free",
    body: "There is no account, no paid tier, and no cap on quality or quantity. If the tool is useful, tell a friend.",
  },
  {
    title: "Respect for creators",
    body: "ClipKoala only reads public posts and never touches private accounts. Download what you own or have permission to save, and credit the people who made it.",
  },
  {
    title: "Honest about problems",
    body: "The platforms change constantly and resolvers break. A public status page shows live health for every platform, and the changelog records every fix.",
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      <div className="mx-auto w-full max-w-page px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <PageHeader
          crumbs={[{ name: "About", path: "/about" }]}
          eyebrow="About"
          title="The calm way to save a video"
          lede="ClipKoala is a free online video downloader that covers TikTok, YouTube, Instagram, Facebook, X, Reddit, Pinterest, Twitch, and SoundCloud. It exists because saving a clip you are allowed to keep should take ten seconds, not ten pop-ups."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-start">
          <div className="prose-ck space-y-5">
            <h2 className="text-2xl font-extrabold text-ink-hi">How it works</h2>
            <p>
              When you paste a link, ClipKoala detects the platform and asks that platform&apos;s
              public endpoints for the media behind the post: the direct video and audio files,
              the title, the author, and a thumbnail. Where a platform splits video and audio
              (Reddit, YouTube), we merge them on the server. Where it applies a watermark on
              download (TikTok), we fetch the clean original instead.
            </p>
            <p>
              The result is streamed straight to your browser as a normal download, named after
              the video. Nothing is written to disk on our side, and the link is forgotten as
              soon as the response is sent. The whole flow, from paste to saved file, usually
              takes about two seconds; YouTube conversions to a specific quality can take a
              little longer and show live progress.
            </p>
            <h2 className="pt-4 text-2xl font-extrabold text-ink-hi">Why a koala</h2>
            <p>
              Koalas are unbothered. They pick a branch, settle in, and take their time. That is
              the feeling we want from a downloader: no urgency, no tricks, a tool that quietly
              does the job and gets out of the way. The clapperboard is the clip; the koala is
              the calm.
            </p>
            <h2 className="pt-4 text-2xl font-extrabold text-ink-hi">Contact</h2>
            <p>
              Found a bug, have a platform request, or need to report a copyright concern? Email{" "}
              <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>. For takedown
              requests see the{" "}
              <Link href="/dmca">copyright policy</Link>.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute inset-10 rounded-full bg-brand opacity-25 blur-3xl" aria-hidden />
            <Image
              src="/brand/lockup-vertical.webp"
              alt="ClipKoala logo: the koala mascot above the ClipKoala wordmark"
              width={480}
              height={480}
              sizes="(max-width: 640px) 80vw, 480px"
              className="relative h-auto w-full rounded-3xl bg-white p-6 shadow-xl"
            />
          </div>
        </div>

        <section className="mt-16" aria-labelledby="principles-title">
          <h2 id="principles-title" className="text-2xl font-extrabold text-ink-hi">
            What we hold ourselves to
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <li key={p.title} className="reveal card p-6">
                <h3 className="text-base font-extrabold text-ink-hi">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{p.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <CtaBanner />
      <JsonLd
        data={graph(
          webPageSchema({ path: "/about", name: TITLE, description: DESCRIPTION, type: "AboutPage" })
        )}
      />
    </PageShell>
  );
}
