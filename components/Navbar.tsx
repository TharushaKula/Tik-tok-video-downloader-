"use client";

import { Download } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import FilenameSettings from "./FilenameSettings";

const NAV_LINKS = [
  { href: "#platforms", label: "Platforms" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-veil/[0.06] bg-base/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <a
          href="#top"
          className="focus-ring flex shrink-0 items-center gap-2.5 rounded-lg"
          aria-label="SnapLoad  back to top"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-[0_0_18px_rgba(139,92,246,0.35)]">
            <Download size={14} className="text-white" strokeWidth={2.5} />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-ink-hi">
            SnapLoad
          </span>
        </a>

        {/* Section navigation */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Sections">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="focus-ring rounded-lg px-3 py-1.5 text-sm text-ink-2 transition-colors hover:bg-veil/[0.04] hover:text-ink-1"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-veil/[0.08] px-2.5 py-1 text-xs font-medium text-ink-2 sm:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-ok" />
            Free forever
          </span>
          <FilenameSettings />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
