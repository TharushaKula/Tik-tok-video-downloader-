// Server-side dictionary access. Imports every language, so only server
// components, metadata, and route handlers should use this module; client
// components get their strings through the provider in ./client.

import { LANDING_PAGES, type LandingCopy } from "../landing";
import { SITE_URL, absoluteUrl } from "../site";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_META,
  LOCALIZED_LANDING_SLUGS,
  LOCALIZED_PATHS,
  localePath,
  type LandingSlug,
  type Locale,
  type TranslatedLocale,
} from "./config";
import { client as enClient, site as enSite } from "./messages/en";
import { messages as es } from "./messages/es";
import { messages as ptBr } from "./messages/pt-br";
import { messages as id } from "./messages/id";
import { messages as fr } from "./messages/fr";
import { landing as esLanding } from "./landing/es";
import { landing as ptBrLanding } from "./landing/pt-br";
import { landing as idLanding } from "./landing/id";
import { landing as frLanding } from "./landing/fr";
import type { LandingTranslations, LocaleMessages } from "./types";

export * from "./config";
export { fmt, plural, rich, type Plural } from "./format";
export type { ClientMessages, SiteMessages } from "./types";

const MESSAGES: Record<Locale, LocaleMessages> = {
  en: { client: enClient, site: enSite },
  es,
  "pt-br": ptBr,
  id,
  fr,
};

const LANDING: Record<TranslatedLocale, LandingTranslations> = {
  es: esLanding,
  "pt-br": ptBrLanding,
  id: idLanding,
  fr: frLanding,
};

/**
 * Date the translations were last reviewed against the English copy. Used as
 * the sitemap lastModified for translated pages; bump it when a language
 * file is updated.
 */
export const TRANSLATIONS_UPDATED = "2026-09-27";

export function getMessages(locale: Locale): LocaleMessages {
  return MESSAGES[locale];
}

export function isLandingSlug(slug: string): slug is LandingSlug {
  return (LOCALIZED_LANDING_SLUGS as readonly string[]).includes(slug);
}

/**
 * A landing page in a given language: English structure (platform, related
 * pages, dates) with the translated copy laid over it.
 */
export function getLandingCopy(
  locale: Locale,
  slug: string
): LandingCopy | undefined {
  const english = LANDING_PAGES[slug];
  if (!english) return undefined;
  if (locale === "en" || !isLandingSlug(slug)) return english;
  return { ...english, ...LANDING[locale][slug] };
}

/** Short tool-page names in a language, for menus, chips, and the palette. */
export function landingNames(locale: Locale): Record<string, string> {
  return Object.fromEntries(
    LOCALIZED_LANDING_SLUGS.map((slug) => [
      slug,
      getLandingCopy(locale, slug)?.name ?? slug,
    ])
  );
}

/**
 * hreflang alternates for an English-form path, as absolute URLs, or
 * undefined when the page exists in English only. x-default is English.
 */
export function languageAlternates(
  path: string
): Record<string, string> | undefined {
  if (!LOCALIZED_PATHS.includes(path)) return undefined;
  // The English home page's canonical is the bare origin; match it exactly.
  const url = (p: string) => (p === "/" ? SITE_URL : absoluteUrl(p));
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[LOCALE_META[locale].hreflang] = url(localePath(locale, path));
  }
  languages["x-default"] = url(path);
  return languages;
}
