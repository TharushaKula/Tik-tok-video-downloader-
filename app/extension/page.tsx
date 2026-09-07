import type { Metadata } from "next";
import Link from "next/link";
import { Check, MousePointerClick, ShieldCheck, Zap } from "lucide-react";

import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import CtaBanner from "@/components/sections/CtaBanner";

import { graph, pageMetadata, webPageSchema } from "@/lib/seo";

const TITLE = "ClipKoala Browser Extension for Chrome & Edge";
const DESCRIPTION =
  "Send the video you are watching to ClipKoala with one click, or right-click any link to download it. A privacy-first Manifest V3 extension with no tracking and no access to your browsing.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/extension",
});

const BENEFITS = [
  {
    icon: MousePointerClick,
    title: "One click from any video page",
    body: "On TikTok, YouTube, Instagram, X, Facebook, Reddit, Pinterest, Twitch, or SoundCloud, the toolbar button detects the page and opens it in ClipKoala with the video already fetched.",
  },
  {
    icon: Zap,
    title: "Right-click any link",
    body: "See a video link in a chat or feed? Right-click it and choose Download with ClipKoala. No need to open the post first.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy first",
    body: "Manifest V3, no content scripts injected into sites, no host permissions, no analytics. It only reads the current tab's address when you click the button.",
  },
];

const PERMISSIONS = [
  ["activeTab", "Read the current tab's URL, only when you click the button"],
  ["contextMenus", "Add the right-click Download with ClipKoala items"],
  ["storage", "Remember the ClipKoala address if you self-host it"],
];

export default function ExtensionPage() {
  return (
    <PageShell>
      <div className="mx-auto w-full max-w-page px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <PageHeader
          crumbs={[{ name: "Browser extension", path: "/extension" }]}
          eyebrow="Browser extension"
          title="One click to save the video you are watching"
          lede="The ClipKoala extension for Chrome, Edge, Brave, and other Chromium browsers is a thin launcher: it detects the platform of your current tab and opens ClipKoala with the video ready to download. Nothing runs in the background."
        />

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {BENEFITS.map(({ icon: Icon, title, body }) => (
            <li key={title} className="reveal card p-6">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white">
                <Icon size={18} aria-hidden />
              </span>
              <h2 className="text-base font-extrabold text-ink-hi">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <section className="card p-6 sm:p-8" aria-labelledby="install-title">
            <h2 id="install-title" className="text-xl font-extrabold text-ink-hi">Install</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">
              The extension is open source and ships in the ClipKoala repository. Until it is
              listed in the Chrome Web Store, install it unpacked:
            </p>
            <ol className="mt-4 space-y-3 text-sm leading-relaxed text-ink-2">
              {[
                "Download or clone the repository and find the extension folder.",
                "Open chrome://extensions (or edge://extensions) and turn on Developer mode.",
                "Click Load unpacked and select the extension folder.",
                "Pin the koala to your toolbar. Open any supported video and click it.",
              ].map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section className="card p-6 sm:p-8" aria-labelledby="perm-title">
            <h2 id="perm-title" className="text-xl font-extrabold text-ink-hi">
              Permissions, explained
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">
              Three permissions, each with one job. No tabs permission, no host permissions,
              no access to your browsing history.
            </p>
            <ul className="mt-4 space-y-3">
              {PERMISSIONS.map(([perm, why]) => (
                <li key={perm} className="flex items-start gap-3 text-sm leading-relaxed text-ink-2">
                  <Check size={15} className="mt-1 shrink-0 text-ok" aria-hidden />
                  <span>
                    <code className="rounded bg-veil/[0.06] px-1.5 py-0.5 font-mono text-xs text-ink-1">{perm}</code>{" "}
                    {why}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-ink-4">
              Prefer not to install anything? ClipKoala also works as an installable web app.
              On Android, share any video into it from the share sheet. See the{" "}
              <Link href="/faq" className="underline decoration-accent/50 underline-offset-2 hover:text-ink-1">
                FAQ
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
      <CtaBanner />
      <JsonLd data={graph(webPageSchema({ path: "/extension", name: TITLE, description: DESCRIPTION }))} />
    </PageShell>
  );
}
