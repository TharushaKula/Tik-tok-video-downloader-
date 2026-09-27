import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { LANDING_PAGES, LANDING_SLUGS } from "../landing";
import {
  LOCALES,
  LOCALIZED_LANDING_SLUGS,
  TRANSLATED_LOCALES,
  equivalentPath,
  getLandingCopy,
  getMessages,
  languageAlternates,
  localizeHref,
  matchBrowserLocale,
  parseLocalePath,
} from "../i18n";
import { fmt, plural } from "../i18n/format";

// The translations are data other people will edit. These tests are what
// stops a missing placeholder, a dropped FAQ, or an over-long title from
// reaching production in one language while English looks fine.

/** Every string in a nested object, keyed by its dotted path. */
function strings(value: unknown, path = ""): Map<string, string> {
  const out = new Map<string, string>();
  if (typeof value === "string") {
    out.set(path, value);
  } else if (Array.isArray(value)) {
    value.forEach((v, i) =>
      strings(v, `${path}[${i}]`).forEach((s, k) => out.set(k, s))
    );
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      strings(v, path ? `${path}.${k}` : k).forEach((s, key) => out.set(key, s));
    }
  }
  return out;
}

// Built from its code point: repo tooling rewrites the literal character.
const EM_DASH = String.fromCharCode(0x2014);

const placeholders = (s: string) =>
  [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

describe("locale registry", () => {
  it("lists exactly the landing pages that exist", () => {
    expect([...LOCALIZED_LANDING_SLUGS].sort()).toEqual([...LANDING_SLUGS].sort());
  });

  it("has a complete route folder for every translated language", () => {
    const files = [
      "layout.tsx",
      "page.tsx",
      "not-found.tsx",
      "opengraph-image.tsx",
      "[slug]/page.tsx",
      "[slug]/opengraph-image.tsx",
    ];
    for (const locale of TRANSLATED_LOCALES) {
      for (const file of files) {
        expect(
          existsSync(join(process.cwd(), "app", locale, file)),
          `app/${locale}/${file}`
        ).toBe(true);
      }
    }
  });
});

describe.each(TRANSLATED_LOCALES)("%s dictionary", (locale) => {
  const english = strings(getMessages("en"));
  const translated = strings(getMessages(locale));

  it("has every English string, and nothing else", () => {
    expect([...translated.keys()].sort()).toEqual([...english.keys()].sort());
  });

  it("keeps every placeholder", () => {
    for (const [key, source] of english) {
      expect(placeholders(translated.get(key) ?? ""), key).toEqual(
        placeholders(source)
      );
    }
  });

  it("leaves nothing blank", () => {
    for (const [key, value] of translated) {
      expect(value.trim(), key).not.toBe("");
    }
  });

  it("uses no em-dashes", () => {
    for (const [key, value] of translated) {
      expect(value.includes(EM_DASH), key).toBe(false);
    }
  });

  it("fits the home title and description in a search snippet", () => {
    const { meta } = getMessages(locale).site;
    expect(meta.homeTitle.length).toBeLessThanOrEqual(65);
    expect(meta.description.length).toBeGreaterThanOrEqual(70);
    expect(meta.description.length).toBeLessThanOrEqual(165);
  });
});

describe.each(TRANSLATED_LOCALES)("%s landing pages", (locale) => {
  it.each(LANDING_SLUGS)("%s matches the English page's shape", (slug) => {
    const en = LANDING_PAGES[slug];
    const copy = getLandingCopy(locale, slug)!;
    expect(copy.faqs).toHaveLength(en.faqs.length);
    expect(copy.sections).toHaveLength(en.sections.length);
    expect(copy.highlights).toHaveLength(en.highlights.length);
    // Structure always comes from English
    expect(copy.platform).toBe(en.platform);
    expect(copy.related).toEqual(en.related);
  });

  it.each(LANDING_SLUGS)("%s fits in a search snippet", (slug) => {
    const copy = getLandingCopy(locale, slug)!;
    // The layout appends " | ClipKoala" (12 characters); the audit's
    // ceiling for the whole title is 65.
    expect(copy.metaTitle.length + 12).toBeLessThanOrEqual(65);
    expect(copy.metaDescription.length).toBeGreaterThanOrEqual(70);
    expect(copy.metaDescription.length).toBeLessThanOrEqual(165);
  });

  it("uses no em-dashes", () => {
    for (const slug of LANDING_SLUGS) {
      for (const [key, value] of strings(getLandingCopy(locale, slug))) {
        expect(value.includes(EM_DASH), `${slug}.${key}`).toBe(false);
      }
    }
  });
});

describe("paths", () => {
  it("keeps translated pages in their language and leaves the rest English", () => {
    expect(localizeHref("es", "/")).toBe("/es");
    expect(localizeHref("es", "/tiktok-downloader")).toBe("/es/tiktok-downloader");
    expect(localizeHref("es", "/#platforms")).toBe("/es#platforms");
    expect(localizeHref("fr", "/youtube-to-mp3?x=1")).toBe("/fr/youtube-to-mp3?x=1");
    expect(localizeHref("es", "/privacy")).toBe("/privacy");
    expect(localizeHref("en", "/tiktok-downloader")).toBe("/tiktok-downloader");
    expect(localizeHref("es", "https://example.com/")).toBe("https://example.com/");
  });

  it("splits a pathname into language and page", () => {
    expect(parseLocalePath("/")).toEqual({ locale: "en", path: "/" });
    expect(parseLocalePath("/es")).toEqual({ locale: "es", path: "/" });
    expect(parseLocalePath("/pt-br/tiktok-downloader")).toEqual({
      locale: "pt-br",
      path: "/tiktok-downloader",
    });
    expect(parseLocalePath("/guides/x")).toEqual({ locale: "en", path: "/guides/x" });
  });

  it("finds the same page in another language, or that language's home", () => {
    expect(equivalentPath("/tiktok-downloader", "id")).toBe("/id/tiktok-downloader");
    expect(equivalentPath("/guides/x", "fr")).toBe("/fr");
    expect(equivalentPath("/guides/x", "en")).toBe("/guides/x");
  });

  it("maps browser language tags onto supported languages", () => {
    expect(matchBrowserLocale("es-MX")).toBe("es");
    expect(matchBrowserLocale("pt-PT")).toBe("pt-br");
    expect(matchBrowserLocale("in-ID")).toBe("id");
    expect(matchBrowserLocale("fr-CA")).toBe("fr");
    expect(matchBrowserLocale("de-DE")).toBeNull();
  });

  it("gives hreflang alternates for every language plus x-default", () => {
    const alt = languageAlternates("/tiktok-downloader")!;
    expect(Object.keys(alt).sort()).toEqual(
      ["en", "es", "fr", "id", "pt-BR", "x-default"].sort()
    );
    expect(alt["pt-BR"]).toMatch(/\/pt-br\/tiktok-downloader$/);
    expect(alt["x-default"]).toBe(alt.en);
    expect(languageAlternates("/guides")).toBeUndefined();
    expect(Object.keys(languageAlternates("/")!)).toHaveLength(LOCALES.length + 1);
  });
});

describe("formatting", () => {
  it("fills placeholders and leaves unknown ones", () => {
    expect(fmt("{a} and {b}", { a: 1 })).toBe("1 and {b}");
  });

  it("picks plural forms per language", () => {
    const forms = { one: "{count} link", other: "{count} links" };
    expect(plural("en", 1, forms)).toBe("1 link");
    expect(plural("en", 0, forms)).toBe("0 links");
    // French treats zero as singular
    expect(plural("fr", 0, forms)).toBe("0 link");
    expect(plural("id", 1, forms)).toBe("1 links");
  });
});

describe("generated image paths", () => {
  it("matches the suffixes Next.js gives metadata routes in a route group", async () => {
    const { ogImagePath } = await import("../seo");
    // Values observed in the build output for these folders.
    expect(ogImagePath("/answers/x", "/(site)/answers/[slug]")).toBe(
      "/answers/x/opengraph-image-b235m6"
    );
    expect(ogImagePath("/guides/x", "/(site)/guides/[slug]")).toBe(
      "/guides/x/opengraph-image-lmudn0"
    );
    expect(ogImagePath("/", "/(site)")).toBe("/opengraph-image-12o0cb");
    expect(ogImagePath("/es", "/es")).toBe("/es/opengraph-image");
  });
});
