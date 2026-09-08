# ClipKoala User Acquisition and Traffic Playbook

*From-scratch growth plan for clipkoala.com — 8 September 2026*

This document is new to this project. Nothing in it has been executed for ClipKoala. Treat every checkbox as open work. Each item is intentionally short. The list is broad; start with **Highest-priority actions**, not every channel at once.

## What the project can sell to users

ClipKoala is a free online video downloader. Its strongest acquisition messages are:

- **Free with no sign-up** — Paste a public link, pick a quality, get the file. No account, nothing stored on the server.
- **Nine platforms in one tool** — TikTok, YouTube, Instagram, Facebook, X (Twitter), Reddit, Pinterest, Twitch clips, and SoundCloud.
- **Watermark-free TikTok, HD video, and audio** — MP4 plus MP3, M4A, WAV, and FLAC where the platform supports it.
- **Batch, playlists, and carousels** — Multi-link paste, YouTube playlists and channels, slideshows, ZIP bundles, and smart filenames.
- **Works on the phone** — PWA, Android share-target, paste-anywhere, and a Chrome/Edge extension that sends the current tab.
- **Honest limits** — Only public posts. Private, login-walled, and live streams are out of scope until they are not. Say so on the page, not in a footnote.
- **Useful without a paid plan** — Immediate value for people saving their own posts, collecting reference clips, grabbing lecture audio, or archiving public media they have a right to keep.

## Important positioning guardrail

ClipKoala is a convenience tool for **lawful** personal copies of public media. Do not market it as a way to steal other people's work, bypass paywalls, or download private accounts. Point users at the Terms, Privacy, and DMCA pages. Do not promise commercial redistribution rights in the files they save. If creators, agencies, or classrooms become a main audience, keep the copy about their own or licensed content.

## Progress tracker

Execution log for this playbook. Each item in **Highest-priority actions** below carries a marker:

- `[x]` **Done** — shipped in the codebase, or completed outside it.
- `[~]` **In progress** — partly shipped; the remainder is noted inline.
- `[ ]` **Not started.**
- `[YOU]` — needs a person with account access; code cannot do it. Instructions are in the item.

### Log

Nothing yet. This playbook has not been started on ClipKoala.

## Highest-priority actions

1. `[YOU]` **Verify Google Search Console immediately** — Add a **Domain property** for `clipkoala.com` (DNS TXT) so apex and `www` share one dataset. If DNS is not reachable, add a URL-prefix property for `https://clipkoala.com/`, take the HTML-tag `content` value, and set it as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel. Then:
   1. Confirm production `NEXT_PUBLIC_SITE_URL` is `https://clipkoala.com` (apex is primary; `www` should 308 to apex).
   2. If `snapload.app` still points here, keep it as a 308 to `clipkoala.com` and use Search Console **Change of Address** from the old domain property.
   3. Redeploy, then confirm with `curl -s https://clipkoala.com/ | grep canonical` that the canonical reads `https://clipkoala.com`.
   4. Submit `https://clipkoala.com/sitemap.xml` under Sitemaps.
   5. Run URL Inspection on `https://clipkoala.com/` and request indexing. Repeat for `/tiktok-downloader`, `/youtube-to-mp3`, `/instagram-downloader`, `/youtube-downloader`, and one guide.
2. `[YOU]` **Set up Bing Webmaster Tools** — Import the Search Console property once step 1 is done, or verify by DNS, then submit the same sitemap URL.
3. `[YOU]` **Confirm sitemap URLs are indexable** — Check tool pages, guides, FAQ, glossary, and legal pages in Search Console rather than assuming a valid sitemap means they are indexed. Two weeks after submitting, read **Pages → Why pages aren't indexed**. `Duplicate, Google chose a different canonical` means host or canonical mismatch. `Crawled – currently not indexed` on thin pages is a content signal, not a reason to request indexing again.
4. `[ ]` **Add activation funnel analytics** — Measure landing view → paste/submit → resolve start → resolve success/failure → preview play → download → return visit. Page views alone cannot reveal the real bottleneck. Preserve first-touch source, medium, campaign, and landing page. Record a safe error class, never the pasted URL or filename in a way that identifies the post. Keep the privacy policy in step with whatever is recorded. Vercel Analytics already exists for page views; this item is action-level events plus a simple dashboard (or tagged events you can read weekly).
5. `[ ]` **Create four audience landing pages first** — Start with people saving their own social posts, video editors collecting reference clips, teachers saving lecture/podcast audio for offline class use, and social managers archiving public campaign posts. Each page needs its own title, description, canonical, FAQ, and a path that opens the tool with the right job, not a copy-paste of the homepage.
6. `[ ]` **Create four high-intent problem/output pages** — Build focused pages that Search Console and the keyword map already point at, for example Reddit downloads with sound, TikTok without watermark, YouTube to MP3 (bitrate honesty), and batch/ZIP downloads. Specs must come from what the product actually does. Do not invent 4K, private-video, or live-stream support.
7. `[ ]` **Publish real static demos** — Screenshots and short clips of the actual UI (TikTok, YouTube, Instagram, X, Facebook, batch). Original or consented material only. These exist partly so outreach and directories have something true to show, and so a search visitor sees the result before trusting a paste.
8. `[ ]` **Add one-click sharing after a successful download** — Offer a share button and a prewritten line that links the relevant tool page. Never put the user's source URL into a public share payload by default.
9. `[ ]` **Build shareable tool links** — Deep links that open the matching downloader (and later, safe presets such as audio-only) without leaking the clip they just saved.
10. `[YOU]` **Launch on product and tool directories** — Prepare a clear demo, screenshots, short video, and a description that stresses no sign-up, public links only, and no stored files. Product Hunt plus a small set of reputable directories, not fifteen scattergun submissions.
11. `[YOU]` **Publish demonstration videos every week** — One real problem and outcome per video: TikTok without watermark, YouTube to MP3, Instagram carousel ZIP, Reddit with sound, batch paste, share-to-PWA.
12. `[YOU]` **Recruit the first 20 power users manually** — Speak with editors, students, teachers, social managers, and people who already save their own posts. Learn the exact jobs that make them return.
13. `[YOU]` **Earn the first relevant backlinks** — Ask creator-resource pages, education blogs, editor tool lists, and indie-maker roundups to test and list the tool. Ten good links beat a hundred directory submissions.
14. `[ ]` **Add return-use features worth a second visit** — Recent history, favorites, collections, PWA, and the extension already exist as product ideas or code; this playbook still needs you to **measure** whether they create return visits and to fill the gaps that interviews reveal (resume, better empty states, finish notifications, and so on).
15. `[ ]` **Protect speed and trust** — Keep intrusive ads away from paste, resolve, preview, and download. Explain failures in plain language with a retry. Keep `/status` honest when a resolver is down. Do not put popups or forced redirects in the download path.

## Measurement and research

- `[ ]` **Define the north-star action** — Use “successful download started” (file received or proxy download begun after a successful resolve) as the main activation event, not raw visits.
- `[ ]` **Track the complete funnel** — Landing view → paste/submit → resolve start → resolve success → preview → download → return.
- `[ ]` **Track each platform separately** — TikTok, YouTube, Instagram, and the long tail will activate and fail very differently.
- `[ ]` **Track acquisition source** — Preserve UTM source, campaign, medium, and landing page so each channel can be compared.
- `[ ]` **Track resolver reliability** — Record safe details such as platform, success, error class, and latency without storing the source URL in analytics.
- `[ ]` **Track export choice** — MP4 vs MP3/M4A/WAV/FLAC, ZIP vs single file, quality picked. This shows which landing pages deserve more work.
- `[ ]` **Track repeat use locally or anonymously** — Compare new and returning visitors while respecting the no-account, nothing-stored promise.
- `[ ]` **Create a weekly growth dashboard** — Review visitors, activated users, activation rate, source, landing page, retention, indexed pages, and cost per activation.
- `[YOU]` **Connect Search Console to on-site activation** — Compare query impressions with downloads, not clicks alone.
- `[ ]` **Add a one-question exit prompt** — Ask non-activated visitors what stopped them: trust, error, unsupported URL, quality, ads, or missing platform.
- `[ ]` **Ask successful users what job they completed** — A short optional post-download question will reveal the best audience and messaging.
- `[YOU]` **Interview returning users** — Ten conversations will usually identify stronger retention work than guessing.
- `[ ]` **Run message tests** — Compare “save without watermark,” “YouTube to MP3,” “batch downloader,” and “no sign-up” on the same traffic source.
- `[ ]` **Set channel kill rules** — Stop any paid or time-intensive channel that cannot produce activated and returning users at a sustainable cost.
- `[ ]` **Use consent correctly** — Keep analytics behavior and the privacy-policy description aligned, especially if advertising or remarketing is added.

## Technical search engine optimization

- `[YOU]` **Verify Search Console ownership**
- `[YOU]` **Submit the XML sitemap**
- `[ ]` **Split sitemap reporting if needed** — Separate tools, guides, and legal sitemaps only if one group is failing to index.
- `[YOU]` **Inspect representative URLs** — Homepage, each platform tool page, `/youtube-to-mp3`, `/batch-video-downloader`, a few guides, `/faq`, `/glossary`, `/status`.
- `[YOU]` **Request initial indexing selectively** — Homepage and highest-value tool pages first.
- `[YOU]` **Add Bing; consider IndexNow later** — Notify participating engines when important pages are added. Google does not use IndexNow.
- `[ ]` **Keep one canonical host** — Apex `https://clipkoala.com` is primary. Every canonical, sitemap URL, OG URL, and internal link must use that host. `www` and `snapload.app` should 308 once, not chain.
- `[ ]` **Monitor redirect chains** — Every public URL should reach its canonical version in one redirect at most.
- `[ ]` **Keep preview deployments blocked** — Preview robots protection must prevent duplicate deployments from competing with production.
- `[ ]` **Check status codes at every release** — Catch accidental 404, 500, redirect, or `noindex` on SEO landing pages.
- `[ ]` **Improve Core Web Vitals** — Measure LCP, INP, and CLS on mobile around the hero, the paste box, and preview.
- `[ ]` **Reduce initial JavaScript** — Keep marketing pages light; load the downloader UI where the user needs it.
- `[ ]` **Keep the main explanation server-rendered** — Search engines and link previews should see useful copy without running the tool.
- `[ ]` **Add breadcrumb markup consistently** — Visible trail plus matching `BreadcrumbList` on secondary pages.
- `[ ]` **Use accurate app structured data** — Validate SoftwareApplication / WebApplication and add only properties that are visible and true.
- `[ ]` **Do not depend on FAQ rich results** — Keep FAQs for users; Google limits FAQ rich results for most sites.
- `[ ]` **Create route-specific social images** — A TikTok page and a YouTube-to-MP3 page should not share one generic card.
- `[ ]` **Add useful image alt text** — Tutorial screenshots should describe the workflow.
- `[ ]` **Maintain descriptive page titles** — Lead with the exact user job, then the free / no-sign-up benefit where it reads naturally.
- `[ ]` **Improve weak search snippets** — Rewrite titles and descriptions for pages with high impressions but low click-through rate (needs Search Console data first).
- `[ ]` **Prevent parameter indexing** — `?url=` and campaign parameters must canonicalize to the clean page. Robots should keep API and deep-link duplicates out of the index.
- `[ ]` **Use semantic headings** — One precise H1; then task, benefit, instructions, examples, questions.
- `[ ]` **Strengthen contextual internal links** — Link related downloaders and guides inside sentences, not only footer lists.
- `[ ]` **Detect orphan pages automatically** — Every indexable page needs at least one crawlable internal link.
- `[ ]` **Monitor broken internal and external links**
- `[ ]` **Use real last-modified dates** — Only when the page content genuinely changed.
- `[ ]` **Preserve accessibility** — Keyboard, contrast, labels, focus, and status messages.
- `[ ]` **Publish an accessibility statement** — What works, known limits, how to report barriers.
- `[ ]` **Keep the public status page truthful** — Reliability is part of search reputation.
- `[YOU]` **Watch crawl stats** — Learn whether bots reach tool and guide pages and whether errors affect them.
- `[ ]` **Validate structured data after every template change**
- `[ ]` **Add a pre-deploy SEO gate** — Status codes, canonical host, `noindex`, snippet lengths, heading structure, JSON-LD, sitemap agreement, orphan pages.

## Search landing pages and programmatic SEO

- `[ ]` **Use-case pages** — Editors, teachers, social managers, students: only if the copy is genuinely different.
- `[ ]` **Platform pages** — Confirm each `/[platform]-downloader` page has unique intent, FAQ, and proof, not a swapped keyword.
- `[ ]` **Output-format pages** — YouTube to MP3 / M4A / WAV / FLAC, TikTok MP3, ZIP carousels: only where the product actually exports that format.
- `[ ]` **Problem pages** — “Reddit video has no sound,” “TikTok save greyed out,” “YouTube to MP3 sounds bad.”
- `[ ]` **How-to guides** — Complete tasks such as “how to save an Instagram Story before it expires” or “how to download a YouTube playlist.”
- `[ ]` **Question pages** — High-intent questions from Search Console, support, autocomplete, and interviews.
- `[ ]` **Glossary pages** — Bitrate, muxing, watermark, HLS, FLAC vs MP3, and other terms users actually search.
- `[ ]` **Comparison pages** — Honest format comparisons (MP3 vs M4A vs FLAC). Competitor-name pages are out unless they are accurate, useful, and respectful of trademarks.
- `[ ]` **Troubleshooting pages** — Resolver down, unsupported URL, private post, expired Story, audio missing.
- `[ ]` **Browser and device guides** — Chrome, Safari, iPhone, Android, only after testing each flow.
- `[ ]` **Localized landing pages** — Human-reviewed translation and proper `hreflang`. Do not duplicate English pages with keywords swapped.
- `[ ]` **Topical content clusters** — Hub page plus guides, tools, FAQs, and troubleshooting for one job.
- `[ ]` **Original benchmark or reliability pages** — Documented resolver tests, quality notes, and what failed. Method must be real.
- `[ ]` **Public changelog as crawlable explanations** — New platforms and fixes linked to the matching tool pages.
- `[ ]` **Do not mass-produce thin pages** — Every page needs unique utility, examples, facts, and a clear path into the paste box.

Highest-value next informational pages (from the existing keyword map, all still to write or to treat as unproven until they rank):

- How to download YouTube Shorts (and why quality picker matters)
- How to save Instagram Stories before they expire
- How to download a whole YouTube playlist at once
- How to download TikTok photo slideshows (with music)
- How to save videos on iPhone from Safari
- Reddit video has no sound after download
- TikTok Save video greyed out / not allowed
- YouTube to MP3 sounds bad: bitrate explained

Do not add near-duplicate “X downloader online / free / HD” pages, city pages, or pages for platforms the tool does not support.

## Content marketing

- `[ ]` **Start or extend a practical guides section** — Real download, quality, and “why it failed” problems.
- `[ ]` **Create cornerstone guides** — Own a few complete subjects such as “save TikTok without a watermark” and “YouTube audio formats that actually work.”
- `[ ]` **Publish before-and-after demonstrations** — Link in, settings chosen, file out. Original or consented clips only.
- `[YOU]` **Write user stories** — Only from real people who completed a real, lawful job.
- `[ ]` **Publish transparent engineering stories** — Resolver failover, muxing Reddit audio, why Vimeo is not supported, proxy download design.
- `[ ]` **Publish privacy and legality explainers** — What is fetched, what is not stored, public vs private, DMCA.
- `[ ]` **Create downloadable checklists** — Archiving your own posts, lecture-audio workflow, filename templates.
- `[YOU]` **Run original surveys** — Anonymized habits around saving clips; publish only real results.
- `[YOU]` **Invite guest experts** — Editors, teachers, indie developers. Strong editorial standards.
- `[YOU]` **Syndicate carefully** — Canonical link back where the platform supports it.
- `[ ]` **Offer an RSS feed** — Guides and product updates without collecting email.
- `[YOU]` **Publish a monthly update** — New platforms, fixes, and honest outages.
- `[ ]` **Create a public roadmap** — Let users see what is next; invite votes without promising dates you cannot keep.
- `[ ]` **Turn support answers into pages** — Repeated questions are validated topics.
- `[YOU]` **Refresh winning content** — Improve pages already getting impressions before endlessly creating new ones.
- `[YOU]` **Consolidate losing content** — Merge overlapping or thin pages.

## Handover: the sections that need a person

Most items below this point need an account, a relationship, a recording, or an operator decision. Code cannot complete them.

### Do these first — nothing else is measurable until they do

1. **Search Console domain property + sitemap** (priority item 1).
2. **Read the Pages report about two weeks later.** Coverage issues before content expansion.
3. **Confirm `support@clipkoala.com` receives mail.** Legal pages, directories, and journalists all check.

### Then — the highest-yield human work

1. **Ten user conversations** (priority item 12).
2. **A handful of relevant backlinks** (priority item 13).
3. **One directory launch, done properly** (priority item 10).
4. **A weekly demonstration video** (priority item 11).

### Deliberately not yet

- **Paid acquisition** until activation and return rates exist.
- **Email list** until there is a monthly update worth sending. RSS can come first.
- **Wikipedia** until independent coverage exists.
- **Social media everywhere** — prove one format on two channels first.

## Video and audio discovery

- `[YOU]` **YouTube tutorials** — One video per core task; exact tool URL near the top of the description.
- `[YOU]` **YouTube Shorts** — One surprising result in under a minute (watermark gone, Reddit with sound, ZIP of a carousel).
- `[YOU]` **TikTok demonstrations** — Lead with the user problem; show the result quickly. Do not teach copyright infringement.
- `[YOU]` **Instagram Reels** — Reuse vertical demos with readable captions and one call to action.
- `[YOU]` **Facebook video** — Practical how-tos for groups where promotion is allowed.
- `[YOU]` **LinkedIn video** — Indie build, privacy (nothing stored), and product engineering, not “download anything.”
- `[YOU]` **X / Threads / Bluesky clips** — Short feature clips, outage notes, launch updates.
- `[YOU]` **Screen-recorded walkthroughs** — 30–60 seconds for directories, landing pages, and outreach.
- `[YOU]` **Live build sessions** — Fix resolvers or ship a platform on stream.
- `[YOU]` **Add transcripts everywhere** — Searchable, accessible, another discovery route.

## Product-led growth and sharing loops

- `[ ]` **Post-success share button** — Share the tool, not the user's source URL by default.
- `[ ]` **Native mobile share sheet**
- `[ ]` **Shareable tool / quality links**
- `[ ]` **Optional attribution badge** — “Saved with ClipKoala,” no forced watermark on their file.
- `[ ]` **Bookmarklet or “send this tab”** — Extension already conceived; still treat store listing, screenshots, and reviews as unstarted acquisition work.
- `[ ]` **Installable PWA and web share target** — Confirm they are discoverable from `/extension` or a tools page, with install instructions.
- `[ ]` **QR phone handoff** — Move a desktop result to a phone without an account.
- `[ ]` **Feedback invitation after success** — Never after a failure, never before the file arrives.
- `[YOU]` **Ask for reviews at the right moment** — After a successful download only.

## Retention and repeat traffic

- `[ ]` **Recent download history that actually brings people back**
- `[ ]` **Favorites and collections**
- `[ ]` **PWA on the home screen**
- `[ ]` **Finish notifications** — Only after a long YouTube conversion, with explicit permission, never on first landing.
- `[ ]` **RSS for guides and changelog**
- `[YOU]` **Opt-in product email** — Low frequency; never required to use the tool.
- `[ ]` **New-feature tour for returners** — Dismissible, tied to a real changelog.
- `[ ]` **Resolver health the user can see** — `/status` must match reality.
- `[ ]` **Useful filenames and templates**
- `[YOU]` **Donation or supporter option** — Only if it reduces pressure to damage the download path with ads.

## Conversion rate improvements

- `[ ]` **Lead with one primary job per landing page**
- `[ ]` **Show the paste box and a real example above the fold**
- `[ ]` **Make “no sign-up” impossible to miss**
- `[ ]` **Explain public-links-only beside the input** — At the moment of hesitation.
- `[ ]` **Honest progress for long YouTube jobs**
- `[ ]` **First-error recovery** — Keep the URL, explain the cause, offer retry.
- `[YOU]` **Social proof** — Only verifiable testimonials or counts.
- `[ ]` **Trust proof** — Privacy, DMCA, status, operator contact on the decision path.
- `[ ]` **Mobile paste, share, and download with one hand**
- `[ ]` **No ads or unrelated CTAs on paste / resolve / download**
- `[ ]` **One next action after success** — Download, save to favorites, try batch, or share the tool.
- `[ ]` **A/B tests only when traffic is large enough** — Judge by successful downloads, not button clicks.

## Community distribution

- `[YOU]` **Reddit** — Help in creator, student, self-hosted, and indie-tool communities. Disclose ownership. Do not spam download-piracy threads.
- `[YOU]` **Facebook groups** — Only where promotion is allowed and the job is lawful (own posts, teaching resources).
- `[YOU]` **Discord / Telegram** — Answer questions; do not drop links unsolicited.
- `[YOU]` **Quora** — Useful answers; mention ClipKoala only when it solves the asked problem.
- `[YOU]` **Hacker News “Show HN”** — Lead with the engineering (resolvers, proxy, privacy). Be ready for copyright questions.
- `[YOU]` **Indie Hackers** — Honest build notes and traffic experiments.
- `[YOU]` **Product Hunt** — Coordinated launch around a meaningful release.
- `[YOU]` **DEV / Hashnode** — Engineering posts, not keyword articles.
- `[YOU]` **GitHub** — Open-source suitable utilities; do not spam awesome-lists.
- `[YOU]` **Local outreach** — Universities, creator clubs, and tech communities where founder access is strongest (including Sri Lanka).
- `[YOU]` **Answer support publicly** — With permission and private details removed.

## Partnerships

- `[YOU]` **Creator-education blogs and newsletters**
- `[YOU]` **Editor and filmmaker communities** — Reference-clip workflows, filenames, batch ZIP.
- `[YOU]` **Teachers and tutors** — Offline lecture/podcast audio they have rights to use.
- `[YOU]` **Indie tool makers** — Complementary products, not link swaps.
- `[YOU]` **Extension and PWA directories** — After store listings are live and accurate.
- `[YOU]` **Student ambassadors** — Ethical promotion policy; no “download anything” messaging.
- `[YOU]` **Technology / hosting partners** — Only with accurate capability claims.

## Outreach and public relations

- `[YOU]` **Personalized user outreach** — Feedback first, not a mass blast.
- `[YOU]` **Resource-page outreach** — Creator tools, education, indie software lists.
- `[YOU]` **Broken-link outreach** — Suggest ClipKoala only when it is a real replacement.
- `[YOU]` **Unlinked mention outreach**
- `[YOU]` **Guest tutorial pitches** — Audience-specific how-tos, not ads.
- `[YOU]` **Journalist pitches** — Indie founder, privacy (nothing stored), resolver reliability, not “unlimited free movies.”
- `[YOU]` **Founder story** — Problem, technical choices, user learning, Sri Lanka where relevant.
- `[YOU]` **Press kit** — Logo, screenshots, product facts, demo video, contact, usage rights for the brand assets.
- `[YOU]` **Media page** — Mentions and approved assets, once any exist.
- `[YOU]` **Respond quickly** — `support@clipkoala.com` must work.

## Backlink acquisition

- `[ ]` **Create link-worthy free utilities** — Filename templates, bitrate explainer, “why Reddit has no sound,” status/reliability notes.
- `[ ]` **Publish original research** — Reproducible resolver or quality tests.
- `[ ]` **Build one definitive guide** worth citing.
- `[YOU]` **Earn resource-list links** — Never buy or fabricate `.edu` or nonprofit links.
- `[YOU]` **Open-source useful components**
- `[YOU]` **Recover lost links** after domain change (`snapload.app` → `clipkoala.com`).
- `[YOU]` **Avoid paid link schemes**

## Directory and marketplace listings

- `[YOU]` **Product Hunt**
- `[YOU]` **AlternativeTo**
- `[YOU]` **Reputable tool directories** — Selective; verify policies before paying.
- `[YOU]` **Startup / maker lists** — BetaList, Uneed, SaaSHub, DevHunt when free or measurable.
- `[YOU]` **Chrome Web Store** — Real extension, honest screenshots, privacy-first permissions.
- `[YOU]` **Microsoft Edge Add-ons**
- `[YOU]` **Firefox Add-ons** — Only with a carefully permissioned build.
- `[YOU]` **PWA directories** — After install and mobile flows are reliable.
- `[YOU]` **GitHub topics and awesome lists** — Only when a component genuinely belongs.
- `[YOU]` **Local startup directories** — Sri Lanka and South Asia.
- `[YOU]` **Audit directory traffic** — Tagged links; do not renew listings that do not activate users.

## Social media

- `[YOU]` **Choose two primary networks**
- `[YOU]` **Post problem/solution clips** — “Reddit file has no sound” is stronger than “try my downloader.”
- `[YOU]` **Repeatable series** — Platform Friday, one-minute save, status when something breaks.
- `[YOU]` **Build in public**
- `[YOU]` **Native media, not bare links**
- `[YOU]` **Micro-creators** — Honest demos, clear disclosure.
- `[YOU]` **Campaign landing URLs** — Send each post to the matching tool page, not always home.

## Email and owned audience

- `[YOU]` **Optional update list** — Never required to download.
- `[ ]` **Onboarding tips** — Optional sequence: paste, quality, audio, batch, extension.
- `[YOU]` **Feature announcements sparingly**
- `[YOU]` **Excellent deliverability** — Confirmed consent, easy unsubscribe, no purchased lists.

## Paid acquisition

- `[YOU]` **Delay broad paid traffic** until activation, retention, and cost per download are known.
- `[YOU]` **High-intent search ads** — Exact task terms to matching pages, if you test at all.
- `[YOU]` **Small brand-protection campaign** — Only if competitors capture `clipkoala`.
- `[YOU]` **Retargeting only with consent and unit economics**
- `[YOU]` **YouTube / short-form ads** — Real workflow, not “download anything.”
- `[YOU]` **Newsletter sponsorships** — Trackable links, relevant audiences.
- `[YOU]` **Cap spend by activated user** — Not by clicks.
- `[YOU]` **Holdout tests** — Prove incrementality.

## Offline and event acquisition

- `[YOU]` **Campus workshops** — Lawful personal archives and lecture audio they have rights to.
- `[YOU]` **Hackathons and maker events**
- `[YOU]` **QR handouts** — One focused mobile landing page plus UTM.
- `[YOU]` **Local press** — Independent product built in Sri Lanka, not a piracy angle.

## Platform expansion

Treat each of these as a **separate product** with its own review, permissions, and release cadence. None of this playbook is started:

- `[ ]` **PWA discoverability and install prompts that are not annoying**
- `[ ]` **Chrome/Edge extension listing and reviews**
- `[ ]` **Firefox extension**
- `[ ]` **Desktop wrapper** — Only if web/PWA demand is proven.
- `[ ]` **Mobile store wrapper** — High policy risk for downloaders; consider only with legal review.
- `[ ]` **CLI** — Attracts technical users; abuse and copyright risk must be designed first.
- `[ ]` **MCP or agent integration** — Only after reliability and abuse controls exist.

## AI-search and answer-engine visibility

- `[ ]` **Publish clear factual pages** — Platforms, formats, limitations, privacy, no private videos.
- `[ ]` **Strong entity consistency** — ClipKoala, clipkoala.com, Organization details, platform count, contact.
- `[ ]` **`llms.txt`** — Optional factual summary generated from the same constants the site uses. Not a ranking trick.
- `[ ]` **Allow or disallow AI crawlers intentionally** — Document the choice in `robots`.
- `[ ]` **Original data** — Unique reliability notes and definitions beat generic “best downloader” copy.
- `[ ]` **Concise answer sections** — Direct answer first, then steps.
- `[ ]` **Keep dates and facts current** — Stale platform counts and “no limits” claims weaken trust.
- `[YOU]` **Earn independent mentions**
- `[YOU]` **Do not create a promotional Wikipedia page**

## Reputation, trust, and advocacy

- `[YOU]` **Operator and contact details that work**
- `[ ]` **Clear terms and copyright position**
- `[ ]` **Precise privacy claims**
- `[ ]` **Public status page and incident notes**
- `[ ]` **Accessibility progress**
- `[YOU]` **Real testimonials** — Role and use case, permission, never fabricated.
- `[YOU]` **Invite reviews only after success** — Never pay for positive sentiment.
- `[YOU]` **Respond to every substantive review**
- `[ ]` **Verifiable usage milestones only**
- `[ ]` **Transparent “how the free tool is funded” page** if ads or donations appear
- `[ ]` **Responsible disclosure channel**
- `[ ]` **Public changelog**
- `[YOU]` **Recognize contributors who want credit**

## Feature-driven acquisition opportunities

These are product bets that can each open a channel. None are “done” for this playbook:

- Snapchat Spotlight, Threads, LinkedIn, Bilibili, TikTok Stories (only when they actually work)
- TikTok slideshow auto-merge to one MP4
- YouTube chapters split
- Profile-picture / avatar downloader
- Browser-extension store presence as a growth loop
- Filename template gallery as a searchable utility
- Honest “platform down?” content tied to `/status`
- iPhone Safari save guide with real screenshots
- Batch CSV/TXT import as a power-user hook
- Open-source validators or health-check scripts as developer bait

## Approaches to avoid

- **Do not publish thousands of near-identical downloader pages**
- **Do not buy backlinks**
- **Do not spam Reddit, GitHub, or comments**
- **Do not buy email lists**
- **Do not use fake testimonials or download counters**
- **Do not market copyright theft, private-account access, or DRM bypass**
- **Do not call the service unlimited** if resolvers, rate limits, or platform blocks apply
- **Do not hide third-party resolver dependence**
- **Do not put the user's video URL into public shares or examples**
- **Do not put intrusive ads in the paste / download flow**
- **Do not optimize for traffic alone**
- **Do not enter every social channel at once**
- **Do not pay for scale before retention**
- **Do not use other people's clips in demos without rights**

## Suggested 90-day sequence

### Days 1–14: make traffic measurable and indexable

- Verify Search Console and Bing, submit the sitemap, inspect representative URLs, fix coverage issues.
- Add the privacy-safe activation funnel and a small weekly dashboard.
- Confirm operator contact mail works.
- Interview at least ten potential users across the four strongest audiences.

### Days 15–45: build high-intent discovery assets

- Publish four audience pages, four problem/output pages, two complete guides, and a real demo set.
- Add contextual internal links and route-specific social images.
- Create a short demonstration video for every existing platform tool and repurpose each into vertical clips.
- Submit polished listings to a small set of reputable directories.

### Days 46–75: create distribution loops

- Add safe share buttons, shareable tool links, and measured return-use prompts.
- Run personalized outreach to resource-page owners, newsletters, and relevant communities.
- Publish one original technical or reliability article designed to earn links.
- Launch publicly around one meaningful improvement, not merely the existing homepage.

### Days 76–90: double down on evidence

- Rank channels by activated users, return rate, effort, and cost.
- Improve pages with impressions but low click-through, and flows with visits but low download success.
- Expand only the best-performing audience/content cluster.
- Test a very small paid campaign only if organic users activate and return reliably.

## Core metrics

- **Search visibility** — Indexed URLs, impressions, average position, click-through rate, non-brand queries.
- **Activation rate** — Percentage of landing visitors who successfully start a download after a resolve.
- **Time to first value** — Seconds from landing to first successful download.
- **Resolve success rate** — Successes divided by resolve starts, segmented by platform, browser, and error class.
- **Export mix** — MP4 vs audio formats vs ZIP.
- **Return rate** — Visitors who return within 1, 7, and 30 days.
- **Referral/share rate** — Successful sessions that produce a share and new activated users from those shares.
- **Channel quality** — Activated and returning users per source, not sessions alone.
- **Cost per activated user** — Channel spend divided by users who hit the north-star action.
- **Cost and reliability per resolve** — Infrastructure and third-party resolvers must stay healthy as traffic grows.

## Starting point for this project (not progress)

This is a snapshot of facts to work from, not a completed checklist:

- Public site: `https://clipkoala.com` (apex). `www` and the old `snapload.app` host should redirect once to the apex.
- Product already has platform tool pages, guides, FAQ, glossary, status, changelog, legal pages, PWA, and a Chromium extension **as application features**. This playbook does not treat Search Console, directories, video, outreach, funnel analytics, or growth loops as finished.
- Contact printed on legal pages: `support@clipkoala.com`. Confirm the mailbox.
- Verification env: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
- Keyword map and page inventory live in `docs/SEO-STRATEGY.md`. Use that file for URLs and intents; use this file for acquisition execution.

Until Search Console is verified and the sitemap is submitted, assume **zero proven organic acquisition**.

## Current search guidance used for this plan

- [Google: creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google Search Console: getting started and performance metrics](https://support.google.com/webmasters/answer/10267942)
- [Google Search Console: submit and monitor a sitemap](https://support.google.com/webmasters/answer/7451001)
- [Google: SoftwareApplication structured data](https://developers.google.com/search/docs/appearance/structured-data/software-app)
- [Google: FAQ rich-result visibility changes](https://developers.google.com/search/blog/2023/08/howto-faq-changes)
