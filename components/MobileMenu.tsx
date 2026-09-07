"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { LANDING_PAGES, LANDING_SLUGS } from "@/lib/landing";

interface MobileMenuProps {
  links: { href: string; label: string }[];
}

// Full-screen sheet on small screens. Rendered through a portal to <body>:
// the sticky header's backdrop-filter would otherwise act as the containing
// block for a fixed element and trap the sheet inside the 64px bar. Closes
// on Escape and locks body scroll while open.
export default function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(true)}
        className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg border border-veil/[0.08] text-ink-2 transition-colors hover:border-veil/20 hover:text-ink-hi"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <Menu size={16} />
      </button>

      {open && mounted && createPortal(
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[80] flex flex-col bg-base"
        >
          <div className="flex h-16 items-center justify-between border-b border-veil/[0.06] px-4">
            <span className="font-display text-[17px] font-bold text-ink-hi">
              Menu
            </span>
            <button
              onClick={() => setOpen(false)}
              className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg border border-veil/[0.08] text-ink-2"
              aria-label="Close menu"
            >
              <X size={16} />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-6" aria-label="Mobile">
            <ul className="space-y-1">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="focus-ring block rounded-xl px-3 py-3 text-lg font-medium text-ink-1 hover:bg-veil/[0.05]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-8 px-3">Downloaders</p>
            <ul className="mt-2 grid grid-cols-2 gap-1">
              {LANDING_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/${slug}`}
                    onClick={() => setOpen(false)}
                    className="focus-ring block rounded-lg px-3 py-2 text-sm text-ink-2 hover:bg-veil/[0.05] hover:text-ink-hi"
                  >
                    {LANDING_PAGES[slug].name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-2 gap-1 border-t border-veil/[0.06] pt-6">
              {[
                ["/about", "About"],
                ["/extension", "Browser extension"],
                ["/changelog", "What's new"],
                ["/status", "Status"],
                ["/glossary", "Glossary"],
                ["/privacy", "Privacy"],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="focus-ring rounded-lg px-3 py-2 text-sm text-ink-3 hover:text-ink-hi"
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
          <div className="border-t border-veil/[0.06] p-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="btn-primary btn-md w-full"
            >
              Download a video
            </Link>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
