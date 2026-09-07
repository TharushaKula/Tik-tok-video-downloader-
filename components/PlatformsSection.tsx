import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PLATFORMS, PLATFORM_IDS } from "@/lib/platforms";
import { LANDING_FOR_PLATFORM, LANDING_PAGES } from "@/lib/landing";
import PlatformIcon from "./PlatformIcon";

// Grid of every supported platform, each card linking to its dedicated
// downloader page. Server component: pure HTML, no client bundle.
export default function PlatformsSection() {
  return (
    <section
      id="platforms"
      className="mx-auto w-full max-w-page scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20"
      aria-labelledby="platforms-title"
    >
      <div className="reveal mb-10 text-center">
        <p className="eyebrow mb-2">Supported platforms</p>
        <h2 id="platforms-title" className="text-2xl font-extrabold text-ink-hi sm:text-3xl">
          One downloader for every feed
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-2">
          Paste a link from any of these platforms. ClipKoala detects it and
          fetches the best quality available.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PLATFORM_IDS.map((id) => {
          const meta = PLATFORMS[id];
          const slug = LANDING_FOR_PLATFORM[id];
          const page = LANDING_PAGES[slug];
          return (
            <li key={id} className="reveal">
              <Link
                href={`/${slug}`}
                className={`focus-ring card card-hover group flex h-full flex-col p-6 ${meta.hoverBorder}`}
              >
                <span className="mb-4 flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-veil/[0.06] bg-veil/[0.04]">
                    <PlatformIcon platform={id} size={20} className={meta.text} />
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-ink-4 transition-transform group-hover:translate-x-0.5 group-hover:text-ink-1"
                    aria-hidden
                  />
                </span>
                <h3 className="mb-2.5 text-base font-extrabold text-ink-hi">
                  {page.name}
                </h3>
                <ul className="space-y-1.5">
                  {meta.supports.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2 text-sm leading-relaxed text-ink-2"
                    >
                      <Check size={14} className={`mt-0.5 shrink-0 ${meta.text}`} aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
