import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import PageShell from "@/components/PageShell";
import { LANDING_PAGES, PLATFORM_LANDING_SLUGS } from "@/lib/landing";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

// Friendly 404: says what happened, offers the tool and the most-visited
// pages, and returns a real 404 status so search engines drop the URL.
export default function NotFound() {
  return (
    <PageShell>
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 pb-24 pt-16 text-center sm:px-6">
        <Image
          src="/brand/mascot-256.png"
          alt=""
          width={128}
          height={128}
          className="h-32 w-32 opacity-90"
          priority
        />
        <p className="eyebrow mt-6">404</p>
        <h1 className="mt-2 text-3xl font-black text-ink-hi sm:text-4xl">
          This branch is empty
        </h1>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-2">
          The page you were looking for has moved or never existed. The
          downloader is one click away, and every platform has its own page.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-primary btn-md">
            Open the downloader
            <ArrowRight size={15} aria-hidden />
          </Link>
          <Link href="/guides" className="btn-secondary btn-md">
            Browse the guides
          </Link>
        </div>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {PLATFORM_LANDING_SLUGS.map((slug) => (
            <li key={slug}>
              <Link href={`/${slug}`} className="chip">
                {LANDING_PAGES[slug].name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
