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
npm run brand:assets  # regenerate icons/OG assets from brand-src/
npm run ext:pack   # zip the browser extension for the Chrome Web Store
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public origin. Defaults to `https://clipkoala.com`. Set to the preview URL in Vercel preview environments if you want correct canonicals there (optional). |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Token from Google Search Console's "HTML tag" method. Renders the `google-site-verification` meta tag. |

## Project map

```
app/                    routes (App Router)
  page.tsx              home: hero + tool + marketing sections
  [slug]/               tool landing pages (9 platforms + youtube-to-mp3 + batch)
  guides/[slug]/        how-to guides with HowTo/Article/FAQ structured data
  faq, about, features, extension, glossary, status, changelog, terms, privacy, dmca
  opengraph-image.tsx   social card (also per landing page and per guide)
  sitemap.ts robots.ts manifest.ts not-found.tsx
  api/                  resolver + proxy endpoints (noindex via robots)
components/             UI; components/sections/* are the marketing blocks
components/brand/       Logo (mascot + wordmark)
lib/                    data (landing, guides, faq, glossary, features, legal,
                        changelog), SEO helpers (seo.ts, og.tsx), resolvers
brand-src/              source artwork supplied by the brand (PNG, transparent)
scripts/generate-brand-assets.mjs  derives icons, favicons, OG mascot from brand-src
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
`lastModified` dates; `app/robots.ts` blocks `/api/` and the `?url=` deep-link
variant. See `docs/SEO-STRATEGY.md` for the launch checklist (Search Console,
domain redirects, monitoring).

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
