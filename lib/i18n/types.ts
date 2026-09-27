import type { LandingCopy } from "../landing";
import type { LandingSlug } from "./config";
import type { ClientMessages, SiteMessages } from "./messages/en";

export type { ClientMessages, SiteMessages };

/** One language's interface and page-chrome strings. */
export interface LocaleMessages {
  client: ClientMessages;
  site: SiteMessages;
}

/**
 * The translatable half of a tool landing page. Structure (slug, platform,
 * related pages, dates) always comes from the English entry in lib/landing.
 */
export type LandingTranslation = Pick<
  LandingCopy,
  | "name"
  | "metaTitle"
  | "metaDescription"
  | "h1"
  | "sub"
  | "highlights"
  | "sections"
  | "faqs"
>;

export type LandingTranslations = Record<LandingSlug, LandingTranslation>;
