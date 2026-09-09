import { LANDING_PAGES, LANDING_SLUGS } from "@/lib/landing";
import { GUIDES, GUIDE_SLUGS } from "@/lib/guides";
import { ANSWERS, ANSWER_SLUGS } from "@/lib/answers";
import { AUDIENCES, AUDIENCE_SLUGS } from "@/lib/audiences";
import { PLATFORMS, PLATFORM_IDS } from "@/lib/platforms";
import { SITE, absoluteUrl } from "@/lib/site";

// A factual summary for answer engines and any tool that reads a site rather
// than crawls it, generated from the same constants the pages use.
//
// This is not a ranking trick and there is no point treating it as one. It is
// here so that a model summarising ClipKoala gets the platform count, the
// format list, and above all the limitations right, instead of inferring
// "unlimited 4K downloads including private videos" from generic category
// copy. Every claim below has to match what the product actually does.

export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  const platforms = PLATFORM_IDS.map((id) => PLATFORMS[id].name).join(", ");

  const body = `# ${SITE.name}

> ${SITE.description}

${SITE.name} is a free web-based video downloader at ${SITE.url}. It has no
accounts, no paid tier, and no installation. A visitor pastes a public post
link, the server resolves it, and the file streams to the browser.

## Facts

- Operator contact: ${SITE.contactEmail}
- Platforms supported (${SITE.platformCount}): ${platforms}
- Video output: MP4. Maximum quality 1080p. There is no 4K.
- Audio output: MP3 (always 320kbps), M4A, WAV, and FLAC, where the platform
  provides audio.
- Images: full-resolution JPG for photo posts, carousels, and slideshows,
  with a ZIP bundle for multi-image posts.
- Batch: up to 10 links per batch, any mix of platforms, fetched 3 at a time.
  YouTube playlist and channel links expand into a batch of recent videos.
- TikTok videos are fetched without the platform watermark, by retrieving the
  original file rather than by cropping or blurring.
- Reddit video and audio streams are merged server-side, so downloads have
  sound.
- Runs as an installable PWA with an Android share target, and has a
  Chrome/Edge extension.

## Limitations (these are real, not marketing hedges)

- Only publicly reachable posts can be fetched. Private accounts,
  followers-only posts, age-restricted and members-only videos, and anything
  behind a login cannot be downloaded, and no credentials are ever requested.
- Live streams cannot be captured. Replays work once published and public.
- Twitch VODs and past broadcasts are not supported; only clips are.
- SoundCloud playlists and profile links are not supported; only tracks.
- Instagram Stories can only be fetched while live. After 24 hours the media
  is deleted by Instagram and is unrecoverable by anyone.
- Nothing is "unlimited": batches are capped, and upstream platforms apply
  their own rate limits and can change without notice.
- Not affiliated with any of the platforms listed above.

## Privacy

No account is required and none can be created. Resolved links are discarded
and media is never written to disk. Download history, favourites, and
preferences are stored in the visitor's own browser, not on a server.
Two analytics tools run: Vercel Analytics, which is cookie-less, and Google
Analytics 4, which sets first-party cookies and sends data to Google. Neither
records the pasted URL, the video title, the author, or the filename. No
advertising or remarketing tags are used.

## Intended use

Lawful personal copies of public media: your own posts, openly licensed
material, and content you have permission to save. Downloading copyrighted
work you have no rights to may breach copyright law and the platform's terms.

## Tools

${LANDING_SLUGS.map(
  (slug) =>
    `- [${LANDING_PAGES[slug].name}](${absoluteUrl(`/${slug}`)}): ${LANDING_PAGES[slug].metaDescription}`
).join("\n")}

## Use cases

${AUDIENCE_SLUGS.map(
  (slug) =>
    `- [${AUDIENCES[slug].name}](${absoluteUrl(`/for/${slug}`)}): ${AUDIENCES[slug].jobLine}`
).join("\n")}

## Guides

${GUIDE_SLUGS.map(
  (slug) => `- [${GUIDES[slug].h1}](${absoluteUrl(`/guides/${slug}`)})`
).join("\n")}

## Answers to common problems

${ANSWER_SLUGS.map(
  (slug) => `- [${ANSWERS[slug].h1}](${absoluteUrl(`/answers/${slug}`)})`
).join("\n")}

## Reference

- [Features](${absoluteUrl("/features")})
- [FAQ](${absoluteUrl("/faq")})
- [Glossary](${absoluteUrl("/glossary")})
- [Roadmap](${absoluteUrl("/roadmap")})
- [Changelog](${absoluteUrl("/changelog")})
- [Platform status](${absoluteUrl("/status")})
- [Accessibility statement](${absoluteUrl("/accessibility")})
- [Terms](${absoluteUrl("/terms")}), [Privacy](${absoluteUrl("/privacy")}), [DMCA](${absoluteUrl("/dmca")})
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
