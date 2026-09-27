# ClipKoala

**clipkoala.com** is a free online video downloader for TikTok, YouTube,
Instagram, Facebook, X (Twitter), Reddit, Pinterest, Twitch, and SoundCloud.
Paste a link, pick a quality, get the file: HD, watermark-free, or audio as
MP3/M4A/WAV/FLAC. No account, nothing stored.

Built with Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS, and
deployed on Vercel.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # ESLint (flat config)
npx tsc --noEmit   # type check
npm test           # vitest unit tests
npm run build      # production build
npm run health     # probe every platform resolver with a real public post
npm run seo:audit  # pre-deploy SEO gate (needs a running build, see below)
npm run indexnow   # tell Bing and friends which URLs changed
npm run brand:assets  # regenerate icons/OG assets from brand-src/
npm run ext:pack   # zip the browser extension for the Chrome Web Store
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public origin. Defaults to `https://clipkoala.com`. Set to the preview URL in Vercel preview environments if you want correct canonicals there (optional). |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Token from Google Search Console's "HTML tag" method. Renders the `google-site-verification` meta tag. |
| `INDEXNOW_KEY` | Optional. 8-128 hex characters (`openssl rand -hex 16`). When set, `/<key>.txt` is served automatically and `npm run indexnow` can submit URLs. Google does not use IndexNow; this is for Bing. |

## Project map

```
app/                    routes (App Router)
  (site)/               every English page, with its own root layout
  (site)/page.tsx       home: hero + tool + marketing sections
  (site)/[slug]/        tool landing pages (9 platforms + youtube-to-mp3 + batch)
  for/[slug]/           use-case pages (creators, editors, teachers, social managers)
  answers/[slug]/       problem, question, and comparison pages (direct answer first)
  guides/[slug]/        how-to guides with HowTo/Article/FAQ structured data
  faq, about, features, extension, glossary, status, changelog, roadmap,
  press, accessibility, security, terms, privacy, dmca
  feed.xml/ llms.txt/   RSS feed and the factual summary for answer engines
  opengraph-image.tsx   social card (also per landing page and per guide)
  es/ pt-br/ id/ fr/     translated home + tool pages (thin files, see Languages)
  sitemap.ts robots.ts manifest.ts global-not-found.tsx
  api/                  resolver + proxy endpoints (noindex via robots)
components/             UI; components/sections/* are the marketing blocks
components/pages/       home, tool, and 404 pages, rendered in any language
lib/i18n/               locales, dictionaries, landing translations
components/brand/       Logo (mascot + wordmark)
lib/                    data (landing, guides, answers, audiences, faq, glossary,
                        features, legal, changelog, roadmap), SEO helpers
                        (seo.ts, og.tsx), analytics.ts + attribution.ts, resolvers
brand-src/              source artwork supplied by the brand (PNG, transparent)
scripts/generate-brand-assets.mjs  derives icons, favicons, OG mascot from brand-src
scripts/seo-audit.ts    pre-deploy SEO gate (see below)
scripts/indexnow.ts     IndexNow submitter
docs/BRAND.md           brand guidelines (colors, type, voice)
docs/SEO-STRATEGY.md    keyword map, content architecture, launch checklist
```

## SEO in one paragraph

Every page sets a canonical URL, title, description, Open Graph and Twitter
metadata through `pageMetadata()` in `lib/seo.ts`, and gets a generated
1200x630 social image. The root layout emits Organization, WebSite, and
SoftwareApplication JSON-LD; pages add WebPage, BreadcrumbList, FAQPage,
HowTo, Article, ItemList, or DefinedTermSet where the visible content
warrants it. `app/sitemap.ts` lists every indexable URL with real
`lastModified` dates; `app/robots.ts` blocks `/api/` and the deep-link query
variants. See `docs/SEO-STRATEGY.md` for the keyword map and
`USER_ACQUISITION_AND_TRAFFIC.md` for the growth plan and its progress log.

## Languages

The home page and the 11 tool pages exist in English (at the root, as
before), Spanish (`/es`), Brazilian Portuguese (`/pt-br`), Indonesian (`/id`)
and French (`/fr`). Guides, answers, use-case, and legal pages are English
only; translated pages link to them sparingly and say so.

- **Strings** live in `lib/i18n/messages/`: `en-client.ts` (the tool UI) and
  `en-site.ts` (page chrome and sections) are the source; `es.ts`, `pt-br.ts`,
  `id.ts`, `fr.ts` are typed against them, so a key added in English fails
  the build until every language has it.
- **Tool-page copy** lives in `lib/i18n/landing/<lang>.ts`. Structure
  (platform, related pages) always comes from `lib/landing.ts`.
- **Routing**: each language has its own root layout under `app/<lang>/`
  so `<html lang>` is right on static pages; English pages sit in
  `app/(site)/`. Every page that exists in several languages emits hreflang
  alternates (and x-default) in its metadata and in the sitemap.
- **No redirects by language.** English pages show a one-line offer to
  visitors whose browser is set to a supported language; the header and
  footer carry a language switcher.
- **Server messages stay English.** The tool translates failures by class
  (`classifyError`) and shows the server's own words underneath.
- `lib/__tests__/i18n.test.ts` fails on a missing or extra key, a dropped
  placeholder, a changed FAQ count, an over-long title, or an em-dash.

**Adding a language:** add it to `LOCALES` and `LOCALE_META` in
`lib/i18n/config.ts`, write `messages/<lang>.ts` and `landing/<lang>.ts`,
register them in `lib/i18n/index.ts`, and copy `app/es/` to `app/<lang>/`
replacing the locale string. `npm test` lists anything missing.

**Changing English copy:** edit the English source, then the same key in each
language, and bump `TRANSLATIONS_UPDATED` in `lib/i18n/index.ts`. The
translations were machine-drafted on 27 September 2026; have a native speaker
review each language before relying on it.

## The SEO gate

`npm run seo:audit` crawls every URL in the sitemap and fails on anything
that would quietly cost traffic: a non-200, a canonical on the wrong host or
pointing at the wrong path, an accidental `noindex`, a missing title or
description, more than one `H1`, invalid JSON-LD, an orphan page nothing
links to, a broken internal link, an `og:image` or structured-data image
that does not load, or hreflang alternates that are not reciprocal or
disagree with the page's `<html lang>`. Length and Open Graph problems are
warnings rather than errors.

```bash
npm run build && npm start     # one terminal
npm run seo:audit              # another
BASE_URL=https://clipkoala.com npm run seo:audit   # or against production
```

It exits non-zero when there is an error, so it can gate a deploy.

## Measurement

`lib/analytics.ts` records the activation funnel: submit, resolve start,
resolve success or failure, preview play, and download start (the north-star
event). Each carries the platform, format, quality, a latency bucket, a
coarse error class, and the visitor's first-touch source, medium, campaign,
and landing page from `lib/attribution.ts`.

Every event goes to **both** Vercel Analytics and GA4 (`lib/gtag.ts`), from
one call site, so a property cannot reach one tool and be forgotten in the
other. The two payloads differ only in naming: GA4 reserves `source`,
`medium` and `campaign` for its own campaign attribution, so ours are sent as
`first_source`, `first_medium`, `first_campaign` and `first_landing` via the
`GA4_PARAM` map. Each sink has its own `try` block, because a tracker blocker
routinely breaks one script and not the other.

It never records the pasted URL, the video title, the author, or the
filename. `lib/__tests__/analytics.test.ts` pins those guarantees (for both
tools, including the GA4 naming rules), and `lib/legal.ts` (Privacy,
Analytics) describes them to users. Keep all three in step when adding an
event.

Two things must be done once in the GA4 admin UI before any of this is
visible in reports:

1. **Register the custom dimensions.** Admin, then Custom definitions. Until
   a parameter is registered, GA4 collects it but shows it nowhere. The ones
   worth registering first are `platform`, `error_class`, `format`,
   `latency`, `via` and `first_source`.
2. **Mark `download_start` as a key event.** Admin, then Events. That is the
   north-star action, and marking it makes GA4 report conversion rate by
   channel and landing page.

## Deploying the domain

1. In the Vercel project, add `clipkoala.com` and `www.clipkoala.com`; set
   `clipkoala.com` as primary so `www` 308-redirects to the apex.
2. Keep the old domain (`snapload.app`) attached to the same project and mark
   it as a redirect to `clipkoala.com` so existing links and rankings carry
   over with 308s.
3. Add `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, deploy, then verify the domain
   property in Search Console and submit `https://clipkoala.com/sitemap.xml`.
4. Make sure the `support@clipkoala.com` mailbox (see `lib/site.ts`) exists or
   forwards somewhere; it is printed on the legal pages.

## Browser extension

`extension/` is a Manifest V3 launcher for Chromium browsers. See
`extension/README.md` and the public page at `/extension`.
