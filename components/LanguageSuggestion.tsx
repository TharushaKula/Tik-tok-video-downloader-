"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Globe, X } from "lucide-react";
import {
  DEFAULT_LOCALE,
  LOCALE_META,
  LOCALIZED_PATHS,
  localePath,
  matchBrowserLocale,
  type Locale,
} from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/client";
import { STORAGE_PREFIX } from "@/lib/site";

/** Set once the visitor picks a language or dismisses the offer. */
export const LANGUAGE_CHOICE_KEY = `${STORAGE_PREFIX}language`;

export function rememberLanguageChoice(locale: Locale | "dismissed") {
  try {
    localStorage.setItem(LANGUAGE_CHOICE_KEY, locale);
  } catch {
    // no storage: the offer may simply appear again next visit
  }
}

// A one-line offer on an English page, for a browser set to a language the
// page also exists in. Never a redirect: search engines and people who chose
// English keep the English page, and the offer disappears for good once the
// visitor picks a language or dismisses it.
export default function LanguageSuggestion() {
  const { locale, t } = useI18n();
  const pathname = usePathname() ?? "/";
  const [target, setTarget] = useState<Locale | null>(null);

  useEffect(() => {
    if (locale !== DEFAULT_LOCALE || !LOCALIZED_PATHS.includes(pathname)) {
      setTarget(null);
      return;
    }
    try {
      if (localStorage.getItem(LANGUAGE_CHOICE_KEY)) return;
    } catch {
      return; // no storage means no way to honour a dismissal; stay quiet
    }
    const match = matchBrowserLocale(navigator.languages?.[0] ?? navigator.language ?? "");
    setTarget(match && match !== DEFAULT_LOCALE ? match : null);
  }, [locale, pathname]);

  if (!target) return null;

  return (
    <div
      className="relative z-40 border-b border-accent/20 bg-accent/[0.07]"
      lang={LOCALE_META[target].htmlLang}
    >
      <div className="mx-auto flex max-w-page items-center justify-center gap-3 px-4 py-2 text-sm sm:px-6">
        <Globe size={14} className="shrink-0 text-accent" aria-hidden />
        <a
          href={localePath(target, pathname)}
          hrefLang={LOCALE_META[target].hreflang}
          onClick={() => rememberLanguageChoice(target)}
          className="focus-ring rounded font-medium text-ink-1 underline decoration-accent/50 underline-offset-4 hover:text-accent"
        >
          {LOCALE_META[target].suggest}
        </a>
        <button
          onClick={() => {
            rememberLanguageChoice("dismissed");
            setTarget(null);
          }}
          className="focus-ring ml-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-ink-3 transition-colors hover:bg-veil/[0.06] hover:text-ink-1"
          aria-label={t.common.dismiss}
          lang="en"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
}
