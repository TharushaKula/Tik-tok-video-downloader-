"use client";

import { createContext, useContext, useMemo } from "react";
import { DEFAULT_LOCALE, localizeHref, type Locale } from "./config";
import { plural, type Plural } from "./format";
import { client as enClient } from "./messages/en-client";
import type { ClientMessages } from "./types";

// Client components read their strings from here. PageShell provides the
// current language's client dictionary (and only that one) as a prop from
// the server; without a provider everything falls back to English.

interface I18nValue {
  locale: Locale;
  t: ClientMessages;
  /** Short tool-page names by slug, in this language */
  landingNames: Record<string, string>;
}

const I18nContext = createContext<I18nValue>({
  locale: DEFAULT_LOCALE,
  t: enClient,
  landingNames: {},
});

export function I18nProvider({
  locale,
  messages,
  landingNames,
  children,
}: {
  locale: Locale;
  messages: ClientMessages;
  landingNames: Record<string, string>;
  children: React.ReactNode;
}) {
  const value = useMemo(
    () => ({ locale, t: messages, landingNames }),
    [locale, messages, landingNames]
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/**
 * The current language, its strings, and helpers bound to it:
 * `href` keeps a link in this language when the page exists in it, and
 * `plural` picks the right form for a count.
 */
export function useI18n() {
  const ctx = useContext(I18nContext);
  return useMemo(
    () => ({
      ...ctx,
      href: (path: string) => localizeHref(ctx.locale, path),
      plural: (
        count: number,
        forms: Plural,
        vars?: Record<string, string | number>
      ) => plural(ctx.locale, count, forms, vars),
    }),
    [ctx]
  );
}
