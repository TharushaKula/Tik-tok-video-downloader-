# SnapLoad — Feature Roadmap

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
- [x] Batch mode — multi-link paste with parallel fetch queue, per-item status/retry, and Save all

---

## 🌍 Platform & content expansion

- [ ] Twitter/X video & GIF downloads
- [ ] Reddit video downloads
- [ ] Pinterest video/idea-pin downloads
- [ ] Snapchat Spotlight downloads
- [ ] Threads video downloads
- [ ] LinkedIn video downloads
- [ ] Vimeo downloads
- [ ] Dailymotion downloads
- [ ] Twitch clips & VOD downloads
- [ ] SoundCloud audio downloads
- [ ] Bilibili downloads
- [ ] TikTok photo slideshows → auto-merged MP4 with music
- [ ] TikTok Stories downloads
- [ ] Instagram Stories & Highlights downloads
- [ ] Instagram carousel downloads (all slides, zipped)
- [ ] Profile-picture / avatar downloader (full HD)
- [ ] YouTube playlist batch downloads
- [ ] YouTube full-channel batch downloads
- [ ] YouTube chapters support (split video by chapter)
- [ ] Live stream / ongoing broadcast capture
- [ ] Anonymous story viewer mode

## ⚡ Download power features

- [x] Batch mode — paste multiple links at once (multi-line box)
- [ ] Bulk download by username/profile (all videos from an account)
- [ ] TXT/CSV link-list import
- [ ] Download queue with per-item progress and pause/cancel
- [ ] Real progress bars (streamed progress, file size shown up-front)
- [ ] Format/quality picker with codec + estimated file-size table
- [ ] 4K / 8K / 60fps quality tiers
- [ ] Resumable / retryable downloads
- [ ] Subtitle downloads (SRT/VTT, language picker, burned-in option)
- [ ] Thumbnail & cover-image download button
- [ ] Clipboard auto-detection on page focus ("We noticed a link — download it?")
- [ ] Concurrent-download limit control

## 🎬 Media processing (post-download tools)

- [ ] Trim/clip by time range before downloading (download only a section)
- [ ] Video → GIF converter
- [ ] Audio format choices beyond MP3 (M4A, WAV, OGG, FLAC)
- [ ] Audio bitrate picker (128/192/320 kbps)
- [ ] Video compressor (target file size)
- [ ] Format converter (MP4 ↔ WebM/MKV/MOV)
- [ ] Custom filename templates (title, author, date variables)
- [ ] Embedded metadata & chapters in output files (title, artist, artwork)
- [ ] SponsorBlock integration (auto-remove sponsor segments from YouTube)
- [ ] Watermark/branding overlay option (for creators saving their own content)

## ✨ UX & convenience

- [ ] PWA install (add to home screen)
- [ ] Android share-target ("Share to SnapLoad" straight from the TikTok app)
- [ ] Browser extension (one-click download from the video page)
- [ ] Video preview player in the result card (watch before saving)
- [ ] Drag-and-drop a link anywhere on the page
- [ ] QR code handoff (scan to continue the download on your phone)
- [ ] Command palette (⌘K) for power users
- [ ] Full keyboard shortcut set
- [ ] Light theme + system theme toggle
- [ ] Multi-language UI (i18n) with localized SEO pages
- [ ] Onboarding tour / first-visit hints
- [ ] Download-complete browser notifications
- [ ] Sound/haptic feedback on completion

## ☁️ Accounts, retention & cloud

- [ ] Optional accounts with cloud-synced download history
- [ ] Collections / favorites / tags for saved videos
- [ ] Creator subscriptions ("notify me / auto-fetch new videos from this account")
- [ ] Scheduled & recurring downloads
- [ ] Save directly to Google Drive / Dropbox / OneDrive
- [ ] Email/Telegram delivery of finished files
- [ ] Telegram/Discord bot version of the downloader
- [ ] Public REST API with keys (developer tier)
- [ ] Webhooks for finished conversions
- [ ] Usage stats dashboard ("you've saved 42 videos this month")

## 📈 Growth, trust & monetization

- [ ] Per-platform SEO landing pages (/tiktok-downloader, /youtube-to-mp3, …)
- [ ] Blog + how-to guides (organic traffic engine for this category)
- [ ] Premium tier (batch, 4K/8K, faster conversions, no queue)
- [ ] Donation/tip option
- [ ] Referral link program
- [ ] Status page + uptime badge
- [ ] Changelog / "What's new" panel
- [ ] DMCA, Terms, and Privacy pages (real ones)
- [ ] Rate limiting + abuse/captcha protection
- [ ] Privacy-friendly analytics (e.g. Plausible)

## 🛡️ Reliability & performance

- [ ] Multi-resolver fallback chains per platform (auto-failover when one API dies)
- [ ] Server-side caching of recently resolved links
- [ ] Background job queue for long YouTube conversions (client polls with live progress)
- [ ] Health monitoring + alerting when a platform resolver breaks
- [ ] Smart link cleanup (strip tracking params, resolve shortlinks client-side)

---

## 🎯 Suggested quick wins

The highest impact for SnapLoad specifically, closing the biggest gaps against
SnapTik/Cobalt while fitting the existing architecture:

1. Batch/multi-link paste
2. Twitter/X support
3. TikTok photo slideshows
4. Real progress for YouTube conversions (job queue + polling)
5. PWA + Android share-target
6. Video preview in the result card
7. Per-platform SEO landing pages

---

## Sources

- [4K Video Downloader Plus — GetApp](https://www.getapp.com/website-ecommerce-software/a/4k-video-downloader-plus/)
- [Cobalt.tools review — Wondershare](https://videoconverter.wondershare.com/video-converters/cobalt-tools-alternative.html)
- [Stacher7](https://stacher.io/)
- [Video DownloadHelper](https://downloadhelper.net/)
- [yt-dlp man page](https://www.mankier.com/1/yt-dlp)
- [yt-dlp complete guide — RapidSeedbox](https://www.rapidseedbox.com/blog/yt-dlp-complete-guide)
- [SnapTik slideshow downloader](https://snaptik.app/download-tiktok-slide)
- [SSSTik story downloader](https://ssstik.io/download-tiktok-stories)
- [iGram](https://igram.world/en2/)
- [FastDl](https://fastdl.app/fastdl)
- [Flixier GIF converter](https://flixier.com/tools/gif-converter)
- [FreeConvert video to GIF](https://www.freeconvert.com/convert/video-to-gif)
