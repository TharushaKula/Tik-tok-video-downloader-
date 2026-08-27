# SnapLoad  Feature Roadmap

A backlog of feature ideas for SnapLoad, compiled from research into top-tier
downloaders (4K Video Downloader Plus, Stacher/yt-dlp, Cobalt, SnapTik, SSSTik,
iGram, FastDl, Video DownloadHelper) and adjacent online video toolkits
(VEED, FreeConvert, Flixier), plus modern SaaS UX patterns.

Check items off as they ship: `[x]`

---

## ✅ Already shipped

- [x] TikTok, Instagram, Facebook, and YouTube downloads
- [x] Watermark-free TikTok videos (HD/SD) + MP3 audio
- [x] YouTube MP4 up to 1080p + MP3 audio
- [x] Automatic platform detection with visual chips
- [x] Paste-to-fetch (clipboard button and Ctrl+V auto-submit)
- [x] `/` keyboard shortcut to focus the link box
- [x] Loading skeleton, error recovery card, honest download states
- [x] Recent downloads history (localStorage, re-fetch in one click)
- [x] Responsive design, reduced-motion support, focus-visible states
- [x] Batch mode  multi-link paste with parallel fetch queue, per-item status/retry, and Save all
- [x] X (Twitter) videos & GIFs
- [x] TikTok photo slideshows (all slides + soundtrack MP3)
- [x] Live YouTube conversion progress (client-side job polling, no held server connections)
- [x] In-card video preview with seeking (streamed inline through the proxy)
- [x] PWA  installable app with Android share-target ("Share to SnapLoad")
- [x] SEO landing pages per platform + sitemap + robots + FAQ structured data
- [x] Reddit videos with sound + Pinterest video/image pins (7 platforms total)
- [x] Carousel/slideshow ZIP bundles, thumbnail saver, and title-based smart filenames
- [x] /changelog page ("What's new")
- [x] YouTube playlist → batch downloads
- [x] Instagram Stories & Highlights link support
- [x] TikTok resolver failover (TikWM → SnapTik)
- [x] Background-tab notification when YouTube conversions finish
- [x] Vercel Analytics (privacy-friendly, cookie-less)
- [x] Twitch clips + SoundCloud tracks (9 platforms total)
- [x] Favorites  star videos to a persistent Saved list
- [x] YouTube full-channel downloads, custom filename templates, first-visit hint
- [x] Zero-friction input funnel: drag-and-drop, paste-anywhere, clipboard detection on focus
- [x] Command palette (⌘K) + real legal pages (Terms, Privacy, DMCA)
- [x] Collections & tags on the Saved list + QR phone handoff
- [x] Hardening: 55-test vitest suite (validators/parsers/favorites/templates/hosts), resolver health-check script (`npm run health`), axios security patch, tightened TikTok URL validation

---

## 🌍 Platform & content expansion

- [x] Twitter/X video & GIF downloads
- [x] Reddit video downloads (with sound  video+audio muxed)
- [x] Pinterest video & image pin downloads
- [x] Twitch clip downloads (MP4 up to 1080p; VODs/streams not supported)
- [x] SoundCloud audio downloads (tracks as MP3, with cover art)
- [~] Vimeo downloads (investigated 2026-08: the player config endpoint now
      returns 0 progressive files or 403s on effectively every video, gated
      behind a per-video JWT; not shippable, revisit if that changes)
- [ ] Snapchat Spotlight downloads
- [ ] Threads video downloads
- [ ] LinkedIn video downloads
- [~] Dailymotion (investigated 2026-08: metadata is public but media is
      HLS-only behind session-bound 403 tokens; needs remuxing, not shippable)
- [ ] Bilibili downloads
- [x] TikTok photo slideshows → all slides as images + soundtrack MP3
- [ ] TikTok slideshow auto-merge → single MP4 with music (needs server-side rendering)
- [ ] TikTok Stories downloads
- [x] Instagram Stories & Highlights links (accepted & resolved when public; depends on the story being live)
- [x] Carousel & slideshow ZIP downloads (Instagram carousels, TikTok slideshows  one click, one archive)
- [ ] Profile-picture / avatar downloader (full HD)
- [x] YouTube playlist batch downloads (via official RSS  latest 10 videos into the batch queue)
- [x] YouTube full-channel batch downloads (paste a channel/@handle, latest uploads via RSS)
- [ ] YouTube chapters support (split video by chapter)
- [ ] Live stream / ongoing broadcast capture
- [ ] Anonymous story viewer mode

## ⚡ Download power features

- [x] Batch mode  paste multiple links at once (multi-line box)
- [ ] Bulk download by username/profile (all videos from an account)
- [ ] TXT/CSV link-list import
- [ ] Download queue with per-item progress and pause/cancel
- [x] Real progress bars for YouTube conversions (live percent + progress track)
- [ ] Real progress bars for direct downloads (streamed progress, file size shown up-front)
- [ ] Format/quality picker with codec + estimated file-size table
- [ ] 4K / 8K / 60fps quality tiers
- [ ] Resumable / retryable downloads
- [~] Subtitle downloads (investigated 2026-08: YouTube caption URLs are now
      POT-token-gated; signed baseUrls return empty even off-datacenter. Not
      shippable server-side; revisit if a viable path appears)
- [x] Thumbnail & cover-image download button
- [x] Clipboard auto-detection on page focus ("We noticed a link" prompt, dedupes offers)
- [ ] Concurrent-download limit control

## 🎬 Media processing (post-download tools)

- [ ] Trim/clip by time range before downloading (download only a section)
- [ ] Video → GIF converter
- [ ] Audio format choices beyond MP3 (M4A, WAV, OGG, FLAC)
- [ ] Audio bitrate picker (128/192/320 kbps)
- [ ] Video compressor (target file size)
- [ ] Format converter (MP4 ↔ WebM/MKV/MOV)
- [x] Smart filenames  downloads named after the video title (sanitized, unicode-safe)
- [x] User-configurable filename templates ({title}/{author}/{platform}/{quality}/{date}, live preview)
- [ ] Embedded metadata & chapters in output files (title, artist, artwork)
- [ ] SponsorBlock integration (auto-remove sponsor segments from YouTube)
- [ ] Watermark/branding overlay option (for creators saving their own content)

## ✨ UX & convenience

- [x] PWA install (add to home screen)
- [x] Android share-target ("Share to SnapLoad" straight from the TikTok app)
- [ ] Browser extension (one-click download from the video page)
- [x] Video preview player in the result card (watch before saving)
- [x] Drag-and-drop a link anywhere on the page (full-page drop target)
- [x] QR handoff  scan to continue a download on your phone (encodes a ?url= deep link)
- [x] Command palette (⌘K) for power users (search, saved/recent, theme, navigation)
- [x] Paste anywhere on the page to fetch (no need to focus the input)
- [x] Full keyboard shortcut set (⌘K palette with arrow/enter/escape nav)
- [x] Light theme + system theme toggle (semantic design tokens, no-flicker init, per-theme platform colors)
- [ ] Multi-language UI (i18n) with localized SEO pages
- [x] First-visit onboarding hint (dismissible, auto-hides after first download)
- [x] Browser notification when a YouTube conversion finishes while the tab is in the background
- [ ] Sound/haptic feedback on completion

## ☁️ Accounts, retention & cloud

- [ ] Optional accounts with cloud-synced download history
- [x] Favorites  star any video to keep it in a persistent Saved list
- [x] Collections / tags to organize saved videos (per-video tags + tag filter bar)
- [ ] Creator subscriptions ("notify me / auto-fetch new videos from this account")
- [ ] Scheduled & recurring downloads
- [ ] Save directly to Google Drive / Dropbox / OneDrive
- [ ] Email/Telegram delivery of finished files
- [ ] Telegram/Discord bot version of the downloader
- [ ] Public REST API with keys (developer tier)
- [ ] Webhooks for finished conversions
- [ ] Usage stats dashboard ("you've saved 42 videos this month")

## 📈 Growth, trust & monetization

- [x] Per-platform SEO landing pages (/tiktok-downloader, /youtube-downloader, …) with canonical URLs, FAQ JSON-LD, sitemap.xml, and robots.txt
- [ ] Blog + how-to guides (organic traffic engine for this category)
- [ ] Premium tier (batch, 4K/8K, faster conversions, no queue)
- [ ] Donation/tip option
- [ ] Referral link program
- [ ] Status page + uptime badge
- [x] Changelog / "What's new" page (/changelog, linked from the footer)
- [x] Terms, Privacy, and Copyright/DMCA pages (real ones, linked in footer + sitemap)
- [ ] Rate limiting + abuse/captcha protection
- [x] Privacy-friendly analytics (Vercel Analytics  cookie-less, activates on deploy)

## 🛡️ Reliability & performance

- [x] Multi-resolver fallback chain for TikTok (TikWM → SnapTik auto-failover; also covers rate limits)
- [ ] Fallback resolvers for the remaining platforms (investigated 2026-08: fdown, getfvid, snapinsta, snapins, getmyfb, and oceansaver are all dead or bot-walled from server contexts  revisit when a viable candidate appears)
- [ ] Server-side caching of recently resolved links
- [x] Background job queue for long YouTube conversions (client polls with live progress)
- [~] Health monitoring: `npm run health` probes every resolver and exits
      non-zero if any is down (ready to wire to CI/cron; alerting TBD)
- [x] Automated test suite (vitest) over validators, parsers, and stores
- [ ] Smart link cleanup (strip tracking params, resolve shortlinks client-side)

---

## 🎯 Suggested quick wins

Nine full rounds of quick wins have shipped. Next highest-impact candidates:

1. Multi-language UI (i18n)  its own dedicated pass
2. Usage stats ("you've saved N videos", by platform)
3. Bulk download by username/profile (other platforms)
4. Blog + how-to guides (organic traffic)
5. Status page / uptime badge
6. Browser extension (one-click from the video page)
7. Audio format/bitrate choices (M4A, WAV, 320kbps)

---

## Sources

- [4K Video Downloader Plus  GetApp](https://www.getapp.com/website-ecommerce-software/a/4k-video-downloader-plus/)
- [Cobalt.tools review  Wondershare](https://videoconverter.wondershare.com/video-converters/cobalt-tools-alternative.html)
- [Stacher7](https://stacher.io/)
- [Video DownloadHelper](https://downloadhelper.net/)
- [yt-dlp man page](https://www.mankier.com/1/yt-dlp)
- [yt-dlp complete guide  RapidSeedbox](https://www.rapidseedbox.com/blog/yt-dlp-complete-guide)
- [SnapTik slideshow downloader](https://snaptik.app/download-tiktok-slide)
- [SSSTik story downloader](https://ssstik.io/download-tiktok-stories)
- [iGram](https://igram.world/en2/)
- [FastDl](https://fastdl.app/fastdl)
- [Flixier GIF converter](https://flixier.com/tools/gif-converter)
- [FreeConvert video to GIF](https://www.freeconvert.com/convert/video-to-gif)
