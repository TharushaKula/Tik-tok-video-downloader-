import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { GUIDES } from "@/lib/guides";
import { PLATFORMS } from "@/lib/platforms";

const FEATURED = [
  "how-to-download-tiktok-videos-without-watermark",
  "how-to-convert-youtube-to-mp3",
  "how-to-download-instagram-reels",
  "how-to-download-reddit-videos-with-sound",
];

export default function GuidesTeaser() {
  return (
    <section
      id="guides"
      className="mx-auto w-full max-w-page scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20"
      aria-labelledby="guides-title"
    >
      <div className="reveal mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow mb-2">Guides</p>
          <h2 id="guides-title" className="text-2xl font-extrabold text-ink-hi sm:text-3xl">
            Step-by-step, with real screenshots
          </h2>
        </div>
        <Link href="/guides" className="btn-secondary btn-sm self-start sm:self-auto">
          All guides
          <ArrowRight size={14} aria-hidden />
        </Link>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURED.map((slug) => {
          const g = GUIDES[slug];
          const meta = g.platform ? PLATFORMS[g.platform] : null;
          return (
            <li key={slug} className="reveal">
              <Link
                href={`/guides/${slug}`}
                className="focus-ring card card-hover group flex h-full flex-col p-5"
              >
                <span className="mb-4 flex items-center gap-2 text-xs font-medium text-ink-3">
                  <BookOpen size={13} className={meta ? meta.text : "text-accent"} aria-hidden />
                  {meta ? meta.name : "All platforms"}
                </span>
                <h3 className="text-[15px] font-extrabold leading-snug text-ink-hi">{g.h1}</h3>
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-ink-3">{g.metaDescription}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                  Read the guide
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
