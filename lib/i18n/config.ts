// Locale registry and URL helpers. Safe to import from client components:
// no dictionaries live here, only the list of languages and how their URLs
// are shaped.
//
// English is served at the root with no prefix (the URLs that already rank
// stay exactly where they are). Every other language lives under its own
// prefix, e.g. /es/tiktok-downloader. Only the pages listed in
// LOCALIZED_PATHS exist in other languages; everything else is English-only
// and links to it from a translated page simply go to the English page.

export const LOCALES = ["en", "es", "pt-br", "id", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Languages with their own URL prefix (everything except English). */
export const TRANSLATED_LOCALES = LOCALES.filter(
  (l): l is Exclude<Locale, "en"> => l !== DEFAULT_LOCALE
);
export type TranslatedLocale = (typeof TRANSLATED_LOCALES)[number];

export interface LocaleMeta {
  /** Value for <html lang> and Intl APIs */
  htmlLang: string;
  /** Value for hreflang alternates */
  hreflang: string;
  /** Open Graph locale */
  ogLocale: string;
  /** The language's own name, shown in the language switcher */
  label: string;
  /**
   * Offer shown on an English page to a browser set to this language, in
   * this language. Lives here rather than in the dictionaries because the
   * English page only carries English strings.
   */
  suggest: string;
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: {
    htmlLang: "en",
    hreflang: "en",
    ogLocale: "en_US",
    label: "English",
    suggest: "View this page in English",
  },
  es: {
    htmlLang: "es",
    hreflang: "es",
    ogLocale: "es_ES",
    label: "Español",
    suggest: "Ver esta página en español",
  },
  "pt-br": {
    htmlLang: "pt-BR",
    hreflang: "pt-BR",
    ogLocale: "pt_BR",
    label: "Português (Brasil)",
    suggest: "Ver esta página em português",
  },
  id: {
    htmlLang: "id",
    hreflang: "id",
    ogLocale: "id_ID",
    label: "Bahasa Indonesia",
    suggest: "Lihat halaman ini dalam Bahasa Indonesia",
  },
  fr: {
    htmlLang: "fr",
    hreflang: "fr",
    ogLocale: "fr_FR",
    label: "Français",
    suggest: "Voir cette page en français",
  },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Tool landing pages that exist in every language. Kept as a literal list,
 * not derived from lib/landing, so client components can use these helpers
 * without pulling every page's English copy into the bundle. A unit test
 * fails if this list and LANDING_SLUGS ever disagree.
 */
export const LOCALIZED_LANDING_SLUGS = [
  "tiktok-downloader",
  "instagram-downloader",
  "facebook-downloader",
  "youtube-downloader",
  "youtube-to-mp3",
  "twitter-downloader",
  "reddit-downloader",
  "pinterest-downloader",
  "twitch-clip-downloader",
  "soundcloud-downloader",
  "batch-video-downloader",
] as const;
export type LandingSlug = (typeof LOCALIZED_LANDING_SLUGS)[number];

/** Paths (English form) that exist in every language. */
export const LOCALIZED_PATHS: readonly string[] = [
  "/",
  ...LOCALIZED_LANDING_SLUGS.map((s) => `/${s}`),
];

/** Build the path for an English-form path in a given language. */
export function localePath(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/**
 * Point an internal href at the current language when that page exists in
 * it, and leave it on the English page otherwise. Keeps any #hash or ?query.
 */
export function localizeHref(locale: Locale, href: string): string {
  if (locale === DEFAULT_LOCALE || !href.startsWith("/")) return href;
  const match = href.match(/^([^?#]*)(.*)$/);
  const path = match?.[1] || "/";
  const rest = match?.[2] ?? "";
  if (!LOCALIZED_PATHS.includes(path)) return href;
  return `${localePath(locale, path)}${rest}`;
}

/**
 * Split a pathname into its language and English-form path.
 * "/es/tiktok-downloader" -> { locale: "es", path: "/tiktok-downloader" }
 */
export function parseLocalePath(pathname: string): {
  locale: Locale;
  path: string;
} {
  const [, first = "", ...rest] = pathname.split("/");
  if (isLocale(first) && first !== DEFAULT_LOCALE) {
    return { locale: first, path: `/${rest.join("/")}`.replace(/(.)\/+$/, "$1") };
  }
  return { locale: DEFAULT_LOCALE, path: pathname || "/" };
}

/**
 * Which of our languages a browser language tag maps to, if any.
 * "pt-PT" still maps to Brazilian Portuguese: closer than English.
 * "in" is the legacy code some Android builds report for Indonesian.
 */
export function matchBrowserLocale(tag: string): Locale | null {
  const primary = tag.toLowerCase().split("-")[0];
  if (primary === "pt") return "pt-br";
  if (primary === "in") return "id";
  return isLocale(primary) ? primary : null;
}

/**
 * Where a page in one language lives in another: the same page when it is
 * translated, otherwise that language's home page (or, for English, the
 * page itself).
 */
export function equivalentPath(path: string, target: Locale): string {
  if (LOCALIZED_PATHS.includes(path)) return localePath(target, path);
  return target === DEFAULT_LOCALE ? path : localePath(target, "/");
}
