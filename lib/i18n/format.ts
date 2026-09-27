import type { ReactNode } from "react";
import { LOCALE_META, type Locale } from "./config";

// Dictionary strings are plain text with {name} placeholders, so they stay
// serializable (they travel from server to client components as props) and
// translators never touch code.

/** A string with a singular and a plural form, both using {count}. */
export interface Plural {
  one: string;
  other: string;
}

/** Replace {name} placeholders with values. Unknown names are left alone. */
export function fmt(
  template: string,
  vars: Record<string, string | number> = {}
): string {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) =>
    key in vars ? String(vars[key]) : whole
  );
}

const pluralRules = new Map<Locale, Intl.PluralRules>();

/** Pick the right form for a count in this language, then fill {count}. */
export function plural(
  locale: Locale,
  count: number,
  forms: Plural,
  vars: Record<string, string | number> = {}
): string {
  let rules = pluralRules.get(locale);
  if (!rules) {
    rules = new Intl.PluralRules(LOCALE_META[locale].htmlLang);
    pluralRules.set(locale, rules);
  }
  const form = rules.select(count) === "one" ? forms.one : forms.other;
  return fmt(form, { count, ...vars });
}

/**
 * Like fmt, but placeholders can be filled with elements, e.g. a bold count
 * inside a sentence whose word order differs between languages.
 */
export function rich(
  template: string,
  vars: Record<string, ReactNode>
): ReactNode[] {
  return template
    .split(/(\{\w+\})/g)
    .filter(Boolean)
    .map((part) => {
      const key = part.match(/^\{(\w+)\}$/)?.[1];
      return key && key in vars ? vars[key] : part;
    });
}
