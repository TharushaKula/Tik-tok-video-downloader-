# ClipKoala SEO strategy

This document records the keyword map, the content architecture that falls
out of it, what is implemented in code, and the launch/monitoring checklist.
Search volumes are directional estimates from experience with this niche,
not tool exports; validate in Search Console and a keyword tool after launch.

## 1. Positioning and intent

The downloader niche is dominated by high-volume, high-competition head
terms ("tiktok downloader", "youtube to mp3") owned by long-established
sites with heavy link profiles. A new domain wins by:

1. Owning **specific, answerable intents** (with sound, without watermark,
   as ZIP, batch, FLAC) where big sites have thin or ad-choked pages.
2. Building **topical authority** with genuinely useful guides, an FAQ, a
   glossary, and a status page, all interlinked.
3. Having a **technically flawless** site (fast, canonical, structured
   data, no duplicate content) so every ranking signal is collected.
4. Earning trust signals (real screenshots, an honest status page, no
   dark patterns) that also drive links and repeat visits.

## 2. Keyword map

| Page | Primary intent | Primary keyword | Secondary / long-tail | Type |
| --- | --- | --- | --- | --- |
| `/` | brand + generic | video downloader, online video downloader | free video downloader no watermark, download video from link | commercial |
| `/tiktok-downloader` | TikTok | tiktok downloader | tiktok video downloader without watermark, save tiktok without watermark, tiktok slideshow downloader, tiktok mp3 | commercial |
| `/youtube-downloader` | YouTube video | youtube video downloader | youtube downloader 1080p, youtube shorts downloader, download youtube playlist | commercial |
| `/youtube-to-mp3` | YouTube audio | youtube to mp3 | youtube to mp3 320kbps, youtube to flac, youtube mp3 converter free, youtube to wav | transactional |
| `/instagram-downloader` | Instagram | instagram video downloader | instagram reels downloader, download instagram story, instagram carousel download | commercial |
| `/facebook-downloader` | Facebook | facebook video downloader | fb watch downloader, facebook reels download, download private facebook video (answer: no) | commercial |
| `/twitter-downloader` | X | twitter video downloader | x video downloader, download twitter gif, save video from x | commercial |
| `/reddit-downloader` | Reddit | reddit video downloader | reddit video downloader with sound, v.redd.it downloader, download reddit video with audio | commercial, low competition |
| `/pinterest-downloader` | Pinterest | pinterest video downloader | pinterest downloader, pin.it downloader, download pinterest image original | commercial, low competition |
| `/twitch-clip-downloader` | Twitch | twitch clip downloader | download twitch clips, twitch clip to mp4 | commercial, low competition |
| `/soundcloud-downloader` | SoundCloud | soundcloud downloader | soundcloud to mp3, download soundcloud song | commercial |
| `/batch-video-downloader` | bulk | batch video downloader | download multiple videos at once, bulk video downloader online | commercial, low competition |
| `/guides/*` | how-to | "how to download X" | see each guide's `metaTitle` | informational |
| `/faq` | questions | is clipkoala free / safe, can I download private videos | problem-based queries | informational |
| `/glossary` | definitions | what is bitrate, flac vs mp3, what is muxing | educational | informational |
| `/status` | trouble | is [platform] downloader down, clipkoala not working | problem-based | navigational |
| `/extension` | feature | video downloader chrome extension | download video from browser one click | commercial |

Entity/semantic coverage across the site: MP4, MP3, M4A, WAV, FLAC, 320kbps,
1080p/720p, watermark, Reels, Shorts, Stories, carousel, slideshow, playlist,
v.redd.it, fb.watch, pin.it, clips.twitch.tv, PWA, share sheet.

## 3. Content architecture

```
Home (/)
├── Core tool pages: /[platform]-downloader (9)  + intent pages /youtube-to-mp3, /batch-video-downloader
│     each: tool, highlights, 2 supporting sections, FAQ, related guides, related downloaders
├── Features (/features) -> deep links into tool pages
├── Educational: /guides (index) -> /guides/[slug] (10) -> CTA to the matching tool page
├── Supporting: /faq, /glossary, /about, /extension, /status, /changelog
└── Legal: /terms, /privacy, /dmca
```

Internal linking rules (all implemented):

- Header: Downloaders, Features, Guides, FAQ. Footer: every downloader,
  every guide, product, and company page. Mobile menu mirrors it.
- Every tool page links to its guide(s), three related downloaders, all
  remaining downloaders, and the FAQ.
- Every guide links to its tool page (twice: mid-page CTA and bottom
  banner) and to six other guides.
- Breadcrumbs on every secondary page (visible + BreadcrumbList).
- Glossary terms link to the page where the concept matters.

No two pages target the same primary keyword. `/youtube-downloader` and
`/youtube-to-mp3` are separated by media type (video vs audio) in title,
H1, copy, and FAQ.

## 4. Technical SEO (implemented)

- **Canonical** on every page via `pageMetadata()`; `metadataBase` set.
- **Titles** follow `Primary Keyword: Differentiator | ClipKoala` under ~60
  chars; **descriptions** 140 to 160 chars with the intent and the offer.
- **Open Graph + Twitter** on every page with a generated 1200x630 image
  (default, per tool page, per guide) rendered from the brand fonts and
  mascot. Twitter falls back to the OG image.
- **Structured data**: Organization, WebSite, SoftwareApplication/WebApplication
  (site-wide); WebPage/CollectionPage/AboutPage/FAQPage; BreadcrumbList;
  FAQPage on tool pages, home, FAQ, guides; HowTo + Article on guides;
  ItemList on the guide index; DefinedTermSet on the glossary. Every node
  describes visible content only.
- **Sitemap** with `lastModified` per page; **robots.txt** blocks `/api/`
  and `?url=` deep links (prevents an indexable duplicate of the home page).
- **404** returns a real 404 with helpful links and `noindex`.
- **Redirects** (308) for short aliases and old anchor URLs in
  `next.config.mjs`. Trailing slashes are normalized by Next.
- **www / old domain**: configure in Vercel (see README). Both redirect
  308 to the apex.
- **Semantic HTML**: one H1 per page, sections with `aria-labelledby`,
  `<article>`, `<ol>` for steps, `<dl>` for glossary, `<details>` FAQs
  (answers are in the HTML, no JS required).
- **Images**: `next/image` with `sizes`, AVIF/WebP, descriptive alt text on
  every meaningful image, empty alt on decorative ones. Brand assets cached
  for a year (immutable).
- **Security headers**: nosniff, frame-options, referrer-policy,
  permissions-policy.
- **Hreflang**: not applicable (English only). If localized versions are
  added, put them under `/es/`, `/pt/` etc. and add `alternates.languages`
  in `pageMetadata()`.

## 5. Performance (implemented)

- Marketing sections are React Server Components: zero client JS. Only the
  downloader tool, theme toggle, filename settings, and mobile menu ship
  JavaScript. framer-motion is no longer loaded on the marketing sections.
- Fonts are self-hosted through `next/font` with `display: swap` and
  size-adjusted fallbacks (no CLS, no third-party font requests).
- Hero text is server-rendered HTML (LCP is text). Mascot uses `priority`
  only where it is above the fold on desktop; hidden on mobile.
- Reveal animations are CSS scroll-driven (`animation-timeline: view()`)
  with a progressive-enhancement fallback, honoring reduced motion.
- Third-party scripts limited to analytics: cookie-less Vercel Analytics plus Google Analytics 4 (`lib/gtag.ts`), both loaded after hydration.
- Static generation for every content page; `/status` uses ISR (10 min).

Verify after deploy with PageSpeed Insights (mobile). Targets: LCP < 2.0s,
INP < 200ms, CLS < 0.05, Lighthouse SEO 100.

## 6. Launch checklist

1. Vercel: add `clipkoala.com` (primary) + `www.clipkoala.com` (redirect);
   attach `snapload.app` as a redirect to the new apex.
2. Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`; deploy.
3. Search Console: add a **Domain** property for `clipkoala.com`
   (DNS TXT) or URL-prefix with the meta tag; submit `/sitemap.xml`.
   Also add the old domain property and use **Change of Address**.
4. Bing Webmaster Tools: import from Search Console.
5. Request indexing for the home page and the top 5 tool pages.
6. Validate rich results for `/`, one tool page, one guide, `/faq`, `/glossary`
   with the Rich Results Test; fix any warnings.
7. Run PageSpeed Insights on mobile for `/` and `/tiktok-downloader`.
8. Confirm `support@clipkoala.com` receives mail (legal pages print it).

## 7. Monitoring

- Search Console weekly: Pages report (excluded reasons), Core Web Vitals,
  Enhancements (FAQ, Breadcrumb, HowTo), top queries per page.
- Vercel Analytics: landing-page mix, bounce on tool pages.
- `npm run health` / the scheduled GitHub Action: broken resolvers hurt
  conversion and, over time, engagement signals.
- Update `updated` dates in `lib/landing.ts` and `lib/guides.ts` whenever
  copy changes, so the sitemap and Article dates stay honest.

## 8. Content roadmap (topical authority)

Highest-value next pages, each with a distinct intent:

**Guides (informational, low competition)**
- How to download YouTube Shorts (and why the quality picker matters)
- How to save Instagram Stories before they expire
- How to download a whole YouTube playlist at once
- How to download TikTok photo slideshows (with music)
- How to download a Twitter/X Space or Reddit GIF (edge intents)
- How to save videos on iPhone from Safari (device-specific flow)

**Problem/solution pages**
- "Reddit video has no sound after download" (problem-based, sends to
  `/reddit-downloader`)
- "TikTok Save video greyed out / not allowed" (creator disabled saving)
- "YouTube to MP3 sounds bad: bitrate explained" (links glossary)

**Comparison content (only when it can be honest and useful)**
- "MP3 vs M4A vs FLAC for saving music" (format comparison, not competitor
  bashing). Competitor-name comparisons are deliberately not planned:
  they attract trademark trouble and thin content.

**Use-case pages (only if the copy is genuinely different)**
- For video editors: collecting clips as a batch, filenames, ZIP bundles.
- For teachers: saving lectures/podcasts as audio for offline classes.
- For social media managers: archiving your own posts.

**Blog** (optional, later): platform change notes ("Instagram changed how
Reels links work, here is what still works"), which double as changelog
entries and attract links from communities that hit the same breakage.

Do not add: near-duplicate "X downloader online / free / HD" pages, city or
language variants without real translation, or pages for platforms the
tool does not support.
