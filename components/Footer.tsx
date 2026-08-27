import Link from "next/link";
import { Download } from "lucide-react";
import { LANDING_PAGES, LANDING_SLUGS } from "@/lib/landing";
import { PLATFORMS } from "@/lib/platforms";

const LINKS = [
  { href: "/#platforms", label: "Platforms" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
  { href: "/changelog", label: "What's new" },
];

const LEGAL_LINKS = [
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/dmca", label: "Copyright" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-veil/[0.06]">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <a
            href="#top"
            className="focus-ring flex items-center gap-2.5 rounded-lg"
            aria-label="SnapLoad  back to top"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
              <Download size={14} className="text-white" strokeWidth={2.5} />
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-ink-hi">
              SnapLoad
            </span>
          </a>

          <nav className="flex items-center gap-1" aria-label="Footer">
            {LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="focus-ring rounded-lg px-3 py-1.5 text-sm text-ink-3 transition-colors hover:text-ink-1"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Per-platform downloader pages */}
        <nav
          className="mt-8 flex flex-wrap items-center justify-center gap-x-1 gap-y-1 border-t border-veil/[0.05] pt-6 sm:justify-start"
          aria-label="Downloaders"
        >
          {LANDING_SLUGS.map((slug) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="focus-ring rounded-lg px-2.5 py-1 text-xs text-ink-4 transition-colors hover:text-ink-1"
            >
              {PLATFORMS[LANDING_PAGES[slug].platform].name} Downloader
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-veil/[0.05] pt-6 text-center sm:flex-row sm:text-left">
          <p className="max-w-md text-xs leading-relaxed text-ink-4">
            SnapLoad isn&apos;t affiliated with any of the supported platforms.
            Download only content you own or have permission to save.
          </p>
          <nav
            className="flex shrink-0 items-center gap-1"
            aria-label="Legal"
          >
            {LEGAL_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="focus-ring rounded-md px-2 py-1 text-xs text-ink-4 transition-colors hover:text-ink-1"
              >
                {label}
              </Link>
            ))}
            <span className="ml-1 text-xs text-ink-4">© {year}</span>
          </nav>
        </div>
      </div>
    </footer>
  );
}
