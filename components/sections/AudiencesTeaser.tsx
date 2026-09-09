import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AUDIENCES, AUDIENCE_SLUGS } from "@/lib/audiences";
import { ANSWERS } from "@/lib/answers";

// The home page's link into the two content clusters that are not the tool
// itself: the job-shaped pages under /for, and the problem pages under
// /answers. A visitor who arrived on a generic query lands here; one of these
// is usually much closer to what they were actually trying to do.
const FEATURED_ANSWERS = [
  "reddit-video-no-sound",
  "tiktok-save-greyed-out",
  "youtube-mp3-sounds-bad",
  "instagram-story-expired",
  "link-not-supported",
];

export default function AudiencesTeaser() {
  return (
    <section
      id="use-cases"
      className="mx-auto w-full max-w-page scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20"
      aria-labelledby="use-cases-title"
    >
      <div className="reveal mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow mb-2">Use cases</p>
          <h2
            id="use-cases-title"
            className="text-2xl font-extrabold text-ink-hi sm:text-3xl"
          >
            What are you actually trying to do?
          </h2>
        </div>
        <Link href="/for" className="btn-secondary btn-sm self-start sm:self-auto">
          All use cases
          <ArrowRight size={14} aria-hidden />
        </Link>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {AUDIENCE_SLUGS.map((slug) => {
          const a = AUDIENCES[slug];
          return (
            <li key={slug} className="reveal">
              <Link
                href={`/for/${slug}`}
                className="focus-ring card card-hover group flex h-full flex-col p-5"
              >
                <span className="mb-3 text-xs font-medium uppercase tracking-wider text-ink-3">
                  {a.name}
                </span>
                <h3 className="text-[15px] font-extrabold leading-snug text-ink-hi">
                  {a.h1}
                </h3>
                <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-ink-3">
                  {a.jobLine}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                  See the workflow
                  <ArrowRight
                    size={12}
                    className="transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="reveal mt-6 rounded-2xl border border-veil/[0.08] bg-veil/[0.02] p-6">
        <h3 className="text-sm font-bold text-ink-hi">
          Or something already went wrong
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-3">
          Each of these starts with the direct answer, including the few cases
          where the honest answer is that nothing can be done.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {FEATURED_ANSWERS.map((slug) => (
            <Link key={slug} href={`/answers/${slug}`} className="chip">
              {ANSWERS[slug].shortTitle}
            </Link>
          ))}
          <Link href="/answers" className="chip border-accent/30 text-ink-1">
            All answers
          </Link>
        </div>
      </div>
    </section>
  );
}
