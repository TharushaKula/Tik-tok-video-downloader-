"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Check, Globe } from "lucide-react";
import {
  LOCALES,
  LOCALE_META,
  equivalentPath,
  parseLocalePath,
} from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/client";
import { rememberLanguageChoice } from "./LanguageSuggestion";

// Header language menu. A native <details> element, so the links are in the
// server HTML (crawlable, and usable before hydration); the script only
// closes it on an outside click or Escape. Each link goes to the same page
// in that language when it exists, otherwise to that language's home page.
export default function LanguageSwitcher() {
  const { locale, t } = useI18n();
  const pathname = usePathname() ?? "/";
  const { path } = parseLocalePath(pathname);
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (ref.current?.open && !ref.current.contains(e.target as Node)) {
        ref.current.open = false;
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && ref.current?.open) {
        ref.current.open = false;
        ref.current.querySelector("summary")?.focus();
      }
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const code = locale === "pt-br" ? "PT" : locale.toUpperCase();

  return (
    <details ref={ref} className="group relative">
      <summary
        className="focus-ring flex h-8 cursor-pointer list-none items-center gap-1 rounded-lg border border-veil/[0.08] px-2 text-[11px] font-semibold text-ink-2 transition-colors hover:border-veil/20 hover:text-ink-1 [&::-webkit-details-marker]:hidden"
        aria-label={`${t.language.change} (${LOCALE_META[locale].label})`}
        title={t.language.change}
      >
        <Globe size={14} aria-hidden />
        <span aria-hidden>{code}</span>
      </summary>
      <ul
        className="absolute right-0 top-10 z-50 w-56 rounded-2xl border border-veil/10 bg-raised p-1.5 shadow-[0_16px_50px_rgb(var(--c-veil)/0.15)]"
        aria-label={t.language.label}
      >
        {LOCALES.map((l) => {
          const current = l === locale;
          return (
            <li key={l}>
              <a
                href={equivalentPath(path, l)}
                hrefLang={LOCALE_META[l].hreflang}
                lang={LOCALE_META[l].htmlLang}
                aria-current={current ? "true" : undefined}
                onClick={() => rememberLanguageChoice(l)}
                className={`focus-ring flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-veil/[0.05] ${
                  current ? "font-semibold text-ink-hi" : "text-ink-2 hover:text-ink-hi"
                }`}
              >
                {LOCALE_META[l].label}
                {current && <Check size={14} className="text-accent" aria-hidden />}
              </a>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
