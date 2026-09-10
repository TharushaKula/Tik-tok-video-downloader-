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
  page.tsx              home: hero + tool + marketing sections
  [slug]/               tool landing pages (9 platforms + youtube-to-mp3 + batch)
  for/[slug]/           use-case pages (creators, editors, teachers, social managers)
  answers/[slug]/       problem, question, and comparison pages (direct answer first)
  guides/[slug]/        how-to guides with HowTo/Article/FAQ structured data
  faq, about, features, extension, glossary, status, changelog, roadmap,
  press, accessibility, security, terms, privacy, dmca
  feed.xml/ llms.txt/   RSS feed and the factual summary for answer engines
  opengraph-image.tsx   social card (also per landing page and per guide)
  sitemap.ts robots.ts manifest.ts not-found.tsx
  api/                  resolver + proxy endpoints (noindex via robots)
components/             UI; components/sections/* are the marketing blocks
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

## The SEO gate

`npm run seo:audit` crawls every URL in the sitemap and fails on anything
that would quietly cost traffic: a non-200, a canonical on the wrong host or
pointing at the wrong path, an accidental `noindex`, a missing title or
description, more than one `H1`, invalid JSON-LD, an orphan page nothing
links to, or a broken internal link. Length and Open Graph problems are
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
