import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PLATFORMS, PLATFORM_IDS } from "@/lib/platforms";
import { LANDING_FOR_PLATFORM } from "@/lib/landing";
import { getMessages, landingNames, localePath, type Locale } from "@/lib/i18n";
import PlatformIcon from "./PlatformIcon";

// Grid of every supported platform, each card linking to its dedicated
// downloader page. Server component: pure HTML, no client bundle.
export default function PlatformsSection({ locale = "en" }: { locale?: Locale }) {
  const { platforms } = getMessages(locale).site;
  const names = landingNames(locale);
  return (
    <section
      id="platforms"
      className="mx-auto w-full max-w-page scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20"
      aria-labelledby="platforms-title"
    >
      <div className="reveal mb-10 text-center">
        <p className="eyebrow mb-2">{platforms.eyebrow}</p>
        <h2 id="platforms-title" className="text-2xl font-extrabold text-ink-hi sm:text-3xl">
          {platforms.title}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-2">
          {platforms.body}
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PLATFORM_IDS.map((id) => {
          const meta = PLATFORMS[id];
          const slug = LANDING_FOR_PLATFORM[id];
          return (
            <li key={id} className="reveal">
              <Link
                href={localePath(locale, `/${slug}`)}
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
                  {names[slug]}
                </h3>
                <ul className="space-y-1.5">
                  {platforms.supports[id].map((line) => (
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
