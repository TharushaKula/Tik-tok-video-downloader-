import type { PlatformId } from "./types";

// The /answers cluster: problem pages, question pages, and honest format
// comparisons.
//
// These target the queries people type when something has already gone wrong
// ("reddit video no sound", "tiktok save greyed out") or when they are trying
// to choose ("mp3 vs flac"). Two rules make them work:
//
//   1. The direct answer comes first, in one short paragraph, before any
//      steps or background. That is what a reader skims for and what an
//      answer engine quotes. `answer` is that paragraph.
//   2. Every claim has to match what the product actually does. No 4K, no
//      private videos, no live streams, no "unlimited" that is not true.

export interface AnswerSection {
  heading: string;
  body: string[];
}

export interface AnswerStep {
  title: string;
  body: string;
}

/** One row of a comparison table. */
export interface CompareRow {
  label: string;
  cells: string[];
}

export interface AnswerCopy {
  slug: string;
  kind: "problem" | "question" | "comparison";
  /** Accent platform, or null when it is cross-platform */
  platform: PlatformId | null;
  /** Short label for menus and cross-links */
  shortTitle: string;
  /** <title> without the brand suffix */
  metaTitle: string;
  metaDescription: string;
  /** The H1, phrased as the question people actually ask */
  h1: string;
  /** The direct answer, one paragraph, before anything else */
  answer: string;
  /** Numbered fix, when there is one */
  steps?: AnswerStep[];
  /** Background that earns the page its place */
  sections: AnswerSection[];
  /** Comparison table, on comparison pages */
  table?: { columns: string[]; rows: CompareRow[] };
  faqs: { q: string; a: string }[];
  /** Landing pages this answer should send people to */
  tools: string[];
  /** Guides worth reading next */
  guides: string[];
  /** Other answers in this cluster */
  related: string[];
  published: string;
  updated: string;
}

export const ANSWERS: Record<string, AnswerCopy> = {
  "reddit-video-no-sound": {
    slug: "reddit-video-no-sound",
    kind: "problem",
    platform: "reddit",
    shortTitle: "Reddit video has no sound",
    metaTitle: "Reddit Video Downloaded With No Sound? Here's Why",
    metaDescription:
      "Reddit stores video and audio as two separate files, so a direct save is silent. Here is why it happens and how to get a Reddit video with its sound attached.",
    h1: "Why your Reddit video downloaded with no sound",
    answer:
      "Reddit does not store a Reddit video as one file. Its host, v.redd.it, serves the picture as one stream and the audio as a completely separate one, and the player stitches them together in your browser. Right-click and save, or use a tool that grabs only the video stream, and you get a perfectly good silent file. The fix is to download through something that fetches both streams and merges them before handing you the file.",
    steps: [
      {
        title: "Copy the post link, not the video URL",
        body: "Use the Share button on the post. A reddit.com/r/.../comments/... link, a mobile reddit.com/r/.../s/... share link, or a redd.it short link all carry enough information to find both streams. A bare v.redd.it URL that you pulled out of the page source often points at the video stream alone.",
      },
      {
        title: "Paste it into the Reddit downloader",
        body: "ClipKoala resolves the post through a service that merges Reddit's video and audio streams into one file, then streams that file to you. What arrives in your downloads is a single MP4 with sound.",
      },
      {
        title: "Check the file before you rely on it",
        body: "Play a couple of seconds. If a post genuinely has no audio track, which is common for GIF-style posts, the merge has nothing to add and the result is silent because the original was.",
      },
    ],
    sections: [
      {
        heading: "How to tell a silent post from a broken download",
        body: [
          "Open the post on Reddit and look at the player. If there is a volume control, the post has an audio stream and a silent download means the download went wrong. If there is no volume control at all, the post was uploaded without audio, usually because it started life as a GIF, and no downloader can add sound that was never there.",
          "This one check saves a lot of retrying. Reddit converts uploaded GIFs into silent MP4s, so a large share of \"no sound\" reports are actually working exactly as intended.",
        ],
      },
      {
        heading: "Why so many tools get this wrong",
        body: [
          "Merging two streams costs server time. A tool that simply hands you the direct v.redd.it video URL does no work, pays nothing, and is silent. A tool that fetches both streams and muxes them has to do real processing for every request, which is why the cheap ones skip it.",
          "It is also why a browser extension that \"finds the video on the page\" tends to fail here: the video element it finds is the video-only stream.",
        ],
      },
      {
        heading: "Cross-posts, private subreddits, and quarantined posts",
        body: [
          "Cross-posted videos resolve through the original post, so they work normally. Posts in private or quarantined subreddits cannot be fetched at all, because they are not publicly reachable. That is a deliberate boundary, not a bug to work around.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why do Reddit videos download without sound?",
        a: "Reddit's video host serves video and audio as two separate streams. A direct save takes only the video stream, so the file is silent. The two have to be merged before you get the file, which is what ClipKoala's Reddit resolver does.",
      },
      {
        q: "Can I add the sound back afterwards?",
        a: "Only if you also downloaded the audio stream separately and merged the two in a video editor or with ffmpeg. It is far quicker to download the post again through a tool that merges for you.",
      },
      {
        q: "Does this affect Reddit GIFs too?",
        a: "Reddit converts uploaded GIFs into silent MP4 files, so those have no audio to recover. If the Reddit player shows no volume control, the post genuinely has no sound.",
      },
      {
        q: "Do private subreddits work?",
        a: "No. Only publicly visible posts can be fetched. Private and quarantined subreddits are out of scope.",
      },
    ],
    tools: ["reddit-downloader"],
    guides: ["how-to-download-reddit-videos-with-sound"],
    related: ["link-not-supported", "downloader-not-working"],
    published: "2026-09-09",
    updated: "2026-09-09",
  },

  "tiktok-save-greyed-out": {
    slug: "tiktok-save-greyed-out",
    kind: "problem",
    platform: "tiktok",
    shortTitle: "TikTok Save video greyed out",
    metaTitle: "TikTok Save Video Greyed Out or Missing? What to Do",
    metaDescription:
      "The creator turned downloads off, the sound is restricted, or your region blocks it. Why TikTok's Save option disappears, and what to do instead.",
    h1: "TikTok's Save video option is greyed out or missing",
    answer:
      "TikTok's Save video button is controlled by the creator, not by you. Every account has a download setting, and any creator can switch it off for their whole profile or for one video. Rights restrictions on the sound, regional policy, and business-account settings can remove it too. When it is off, the button is either greyed out or gone from the share sheet entirely, and no amount of reinstalling the app brings it back.",
    steps: [
      {
        title: "Confirm it is the creator's setting, not your app",
        body: "Open a different creator's video and check whether Save video appears there. If it does, the setting belongs to the first video. If it is missing everywhere, sign out and back in, or update the app, before assuming anything else.",
      },
      {
        title: "Ask, if the video matters and it is not yours",
        body: "Creators turn downloads off deliberately. If you need a copy of someone else's video for anything beyond a moment's private viewing, ask them. This is the step people skip and the only one that actually grants you a right.",
      },
      {
        title: "Copy the share link instead",
        body: "The Copy link option in the share sheet is separate from Save video and is almost always available. Paste that link into the TikTok downloader and you get the file without the burnt-in watermark.",
      },
      {
        title: "Know what this does not unlock",
        body: "Private videos, friends-only videos, and deleted videos cannot be fetched by anything, ClipKoala included. If the link does not open in a logged-out browser, there is nothing to download.",
      },
    ],
    sections: [
      {
        heading: "Why TikTok's own save is worth avoiding anyway",
        body: [
          "Even when Save video works, TikTok burns a moving watermark with the creator's handle across the file, and re-encodes it on the way out. You end up with a lower-quality copy carrying a logo you did not ask for.",
          "Pasting the share link fetches the original TikTok stores before the watermark is applied, at the resolution and bitrate the creator uploaded. Nothing is cropped, blurred, or re-encoded to hide anything.",
        ],
      },
      {
        heading: "The other reasons the button disappears",
        body: [
          "The sound has a rights restriction, which removes downloading for every video using that track. The account is a business account with downloads disabled at the profile level. The video is region-restricted where you are. The creator disabled downloads after posting, which applies retroactively.",
          "None of these are things you can change from your side, and a tool claiming to bypass a rights restriction is claiming something it should not.",
        ],
      },
      {
        heading: "Where the line is",
        body: [
          "A creator switching off downloads is expressing a preference about their work, and it deserves respect. Saving a public video to watch it offline once is a very different act from reposting someone's work as your own or stripping their handle to pass it off elsewhere. The first is ordinary; the second is theft, and it is not what this tool is for.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why is Save video greyed out on TikTok?",
        a: "The creator has turned downloads off, for that video or for their whole account. Rights restrictions on the sound, business-account settings, and regional policy can also remove it. It is not a fault with your app.",
      },
      {
        q: "Can I turn Save video back on?",
        a: "Only for your own videos, in Settings and privacy under Privacy, then Downloads. You cannot change the setting on someone else's video.",
      },
      {
        q: "Does copying the link work when Save video is off?",
        a: "Usually, yes. Copy link is a separate option and stays available on public videos. It also gives you a better file, because it fetches the original rather than TikTok's watermarked export.",
      },
      {
        q: "What about private or friends-only videos?",
        a: "Those cannot be downloaded by any tool. If the link does not open in a browser where you are logged out, nothing can fetch it.",
      },
    ],
    tools: ["tiktok-downloader"],
    guides: ["how-to-download-tiktok-videos-without-watermark"],
    related: ["private-post-error", "instagram-story-expired"],
    published: "2026-09-09",
    updated: "2026-09-09",
  },

  "youtube-mp3-sounds-bad": {
    slug: "youtube-mp3-sounds-bad",
    kind: "problem",
    platform: "youtube",
    shortTitle: "YouTube MP3 sounds bad",
    metaTitle: "Why Your YouTube MP3 Sounds Bad: Bitrate Explained",
    metaDescription:
      "A 320kbps MP3 from YouTube cannot sound better than the audio YouTube served. What bitrate really means, why converting twice hurts, and how to get the best result.",
    h1: "Why your YouTube MP3 sounds worse than expected",
    answer:
      "A conversion cannot add quality that was not in the source. YouTube stores compressed audio, typically Opus or AAC in the region of 128 to 160kbps, and converting that to a 320kbps MP3 does not recover what the first compression already discarded. It just wraps the same audio in a bigger file. If your MP3 sounds thin, muddy in the cymbals, or hollow in the bass, you are almost always hearing YouTube's own compression, not a fault in the conversion.",
    steps: [
      {
        title: "Check what the source actually is",
        body: "A video uploaded from a phone, a livestream recording, or an old upload will have poor audio regardless of what you convert it to. Play it on YouTube with good headphones first. If it sounds bad there, no format will fix it.",
      },
      {
        title: "Do not convert an MP3 you already converted",
        body: "Each lossy encode throws away detail permanently. Converting YouTube audio to MP3 and then to another MP3, or to a smaller bitrate, compounds the damage. Always convert once, from the original video.",
      },
      {
        title: "Pick M4A when your devices support it",
        body: "M4A carries AAC, which is closer to what YouTube already serves, so there is less re-encoding damage than converting to MP3. It plays on essentially everything modern and the files are smaller.",
      },
      {
        title: "Buy or stream the music if it is music",
        body: "For anything you actually want to listen to properly, a purchase or a streaming subscription gives you audio that was never squeezed through a video platform. This is a genuinely better answer than any converter setting, and pretending otherwise would be dishonest.",
      },
    ],
    sections: [
      {
        heading: "What bitrate does and does not mean",
        body: [
          "Bitrate is how many bits per second a file spends describing the sound. More bits means more detail preserved, up to the point where the format stops throwing anything away. 320kbps is the highest an MP3 goes, and ClipKoala always uses it, because there is no reason to offer a worse option and charge for the better one.",
          "What bitrate cannot do is reconstruct detail that a previous encode already deleted. Compression is not reversible. A 320kbps MP3 made from a 128kbps source is a faithful copy of a 128kbps source, in a file roughly two and a half times larger.",
        ],
      },
      {
        heading: "What generation loss actually sounds like",
        body: [
          "Lossy codecs discard the parts of a signal a listener is least likely to notice. Do it once and most people hear nothing. Do it twice, on top of a codec with different assumptions, and the artefacts stack: cymbals and sibilance turn watery, reverb tails smear, and quiet detail behind a loud sound disappears.",
          "This is why converting YouTube's Opus audio to MP3 is measurably worse than leaving it as AAC in an M4A, even at the same nominal bitrate.",
        ],
      },
      {
        heading: "Why WAV and FLAC do not help here",
        body: [
          "WAV is uncompressed and FLAC is lossless, which sounds like they should be better, and they are, for preserving what you give them. Given a compressed YouTube source, both faithfully preserve compressed audio in a much larger file. They are worth choosing when you plan to edit the audio, because repeated edits and re-saves will not degrade further, not because they will sound better on playback.",
        ],
      },
    ],
    table: {
      columns: ["Format", "Best for", "Roughly, per minute"],
      rows: [
        {
          label: "MP3 320kbps",
          cells: ["Playing anywhere, including old hardware", "2.4 MB"],
        },
        {
          label: "M4A (AAC)",
          cells: ["The best result from a YouTube source", "1.5 MB"],
        },
        { label: "WAV", cells: ["Editing, no further loss on re-save", "10 MB"] },
        {
          label: "FLAC",
          cells: ["Archiving what you were given, losslessly", "5 MB"],
        },
      ],
    },
    faqs: [
      {
        q: "Does a 320kbps MP3 from YouTube sound better than 128kbps?",
        a: "Only slightly, and only because it adds no further loss on top of YouTube's own. It cannot recover detail the source already lost. The ceiling is set by what YouTube served, not by what you convert to.",
      },
      {
        q: "Which format should I choose for the best sound?",
        a: "M4A, when your devices support it. It uses AAC, which is closest to what YouTube already stores, so there is less re-encoding damage. MP3 is the right choice when compatibility matters more.",
      },
      {
        q: "Will FLAC give me lossless YouTube audio?",
        a: "FLAC is lossless in the sense that it preserves exactly what it is given. What it is given is already compressed audio, so you get a large file that is faithful to a compressed source, not a studio master.",
      },
      {
        q: "Why does one video sound much worse than another?",
        a: "The upload does. Phone recordings, livestream captures, and older uploads carry poor audio before YouTube touches them. Compare them on YouTube itself and you will hear the same difference.",
      },
    ],
    tools: ["youtube-to-mp3", "youtube-downloader"],
    guides: ["how-to-convert-youtube-to-mp3"],
    related: ["mp3-vs-m4a-vs-wav-vs-flac", "downloader-not-working"],
    published: "2026-09-09",
    updated: "2026-09-09",
  },

  "mp3-vs-m4a-vs-wav-vs-flac": {
    slug: "mp3-vs-m4a-vs-wav-vs-flac",
    kind: "comparison",
    platform: null,
    shortTitle: "MP3 vs M4A vs WAV vs FLAC",
    metaTitle: "MP3 vs M4A vs WAV vs FLAC: Which Audio Format to Pick",
    metaDescription:
      "An honest comparison of the four audio formats ClipKoala exports: what each one is for, what it costs in file size, and when the difference is actually audible.",
    h1: "MP3, M4A, WAV, or FLAC: which should you pick?",
    answer:
      "Pick MP3 when the file has to play on anything, including old hardware and car stereos. Pick M4A when your devices are modern and you want the same quality in a smaller file, which is also the best choice when the source came from YouTube. Pick WAV when you are about to edit the audio and will re-save it several times. Pick FLAC when you are archiving something you want to keep bit-for-bit. For ordinary listening, the difference between MP3 at 320kbps and M4A is inaudible to almost everyone.",
    sections: [
      {
        heading: "Lossy and lossless, in one paragraph",
        body: [
          "MP3 and M4A are lossy: they permanently discard parts of the signal a listener is unlikely to notice, which is how they get small. WAV and FLAC are not: WAV stores the audio raw, FLAC compresses it the way a ZIP does, so it comes back out identical at roughly half the size.",
          "That distinction only matters at the point of capture. If the audio you are saving was already lossy, and anything from a video platform was, converting it to FLAC preserves compressed audio perfectly. It does not undo the compression.",
        ],
      },
      {
        heading: "When the difference is audible",
        body: [
          "In careful listening tests, most people cannot distinguish a 320kbps MP3 from a lossless source on normal equipment. What people do reliably hear is repeated re-encoding, low bitrates below about 160kbps, and poor source material.",
          "So the practical advice is unglamorous: convert once, from the best source you have, at a high bitrate, and stop worrying about the format.",
        ],
      },
      {
        heading: "Where each one bites you",
        body: [
          "MP3 cannot store more than two channels usefully and its metadata support is fiddly, but nothing refuses to play it. M4A is occasionally awkward on old Android and cheap car head units. WAV files are enormous and carry metadata badly, so a WAV library is painful to browse. FLAC is unsupported by some older hardware and, notably, by a few car systems, though every desktop and phone player handles it.",
        ],
      },
    ],
    table: {
      columns: ["Format", "Lossy?", "Per minute", "Choose it when"],
      rows: [
        {
          label: "MP3 (320kbps)",
          cells: ["Yes", "2.4 MB", "It has to play on absolutely anything"],
        },
        {
          label: "M4A (AAC)",
          cells: ["Yes", "1.5 MB", "Modern devices, and the source is a video"],
        },
        {
          label: "WAV",
          cells: ["No", "10 MB", "You are editing and will re-save repeatedly"],
        },
        {
          label: "FLAC",
          cells: ["No", "5 MB", "You are archiving and want an exact copy"],
        },
      ],
    },
    faqs: [
      {
        q: "Is FLAC better than MP3?",
        a: "FLAC preserves exactly what it is given, so it is better as an archive format. Whether it sounds better depends entirely on the source: given already-compressed audio, FLAC gives you a large, faithful copy of compressed audio.",
      },
      {
        q: "Is M4A better than MP3?",
        a: "At the same bitrate, AAC in an M4A generally sounds slightly better and the file is smaller. MP3 wins only on compatibility, which is still a real advantage on older hardware.",
      },
      {
        q: "Which format does ClipKoala default to?",
        a: "MP3 at 320kbps, because it plays everywhere. M4A, WAV, and FLAC are offered alongside it on YouTube results, at no cost and with nothing to configure.",
      },
      {
        q: "Should I convert my existing MP3s to FLAC?",
        a: "No. Converting a lossy file to a lossless one gives you a much larger file containing exactly the same audio. Keep the MP3s and use FLAC for anything you rip or record yourself.",
      },
    ],
    tools: ["youtube-to-mp3", "soundcloud-downloader"],
    guides: ["how-to-convert-youtube-to-mp3"],
    related: ["youtube-mp3-sounds-bad"],
    published: "2026-09-09",
    updated: "2026-09-09",
  },

  "instagram-story-expired": {
    slug: "instagram-story-expired",
    kind: "problem",
    platform: "instagram",
    shortTitle: "Instagram Story expired",
    metaTitle: "Instagram Story Link Not Working? It Probably Expired",
    metaDescription:
      "Stories vanish 24 hours after posting and nothing can bring them back. How to tell an expired Story from a private one, and how Highlights change the answer.",
    h1: "That Instagram Story link no longer works",
    answer:
      "Stories are deleted 24 hours after they are posted. Once that window closes the file is gone from the public internet, and no downloader, cache trick, or third-party service can retrieve it. If the Story you want is more than a day old, the only copy that still exists is the one the person who posted it kept, or a Highlight they saved it into.",
    steps: [
      {
        title: "Check whether it was saved to a Highlight",
        body: "Highlights live on the profile indefinitely and can be fetched like any public post. Open the profile, look under the bio, and copy the Highlight link instead of the expired Story link.",
      },
      {
        title: "Work out whether it expired or was always private",
        body: "Open the link in a browser where you are logged out. A private account shows a login wall; an expired Story shows a not-found page. These need completely different responses, and confusing them wastes a lot of time.",
      },
      {
        title: "Ask the person, if it was theirs",
        body: "Instagram keeps an archive of a user's own Stories for them. Whoever posted it can almost certainly still retrieve it in a few taps, which is faster than anything you can do from outside.",
      },
      {
        title: "Save them while they are live next time",
        body: "If a Story matters, paste its link the same day. Public Stories and Highlights fetch normally while they are up.",
      },
    ],
    sections: [
      {
        heading: "Why nothing can recover an expired Story",
        body: [
          "This is not a limitation of one tool. When Instagram removes a Story, the media stops being served from its CDN and the URL stops resolving for everyone. There is nothing left to fetch. Any service claiming it can recover expired Stories is either fetching a Highlight, showing you a cached thumbnail, or lying.",
          "The same applies to deleted posts, deactivated accounts, and content removed after a copyright claim.",
        ],
      },
      {
        heading: "Private accounts are a different answer",
        body: [
          "If the account is private, the Story has not expired, it was simply never public. ClipKoala cannot fetch it and will not try. Followers-only content stays followers-only, which is the entire point of the setting.",
          "This is worth being clear about, because \"private Instagram viewer\" services exist and they are, at best, scams that harvest logins.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I download an Instagram Story after 24 hours?",
        a: "No. Instagram deletes Stories after 24 hours and the media stops being served. Nothing can retrieve it. If it was saved to a Highlight, download the Highlight instead.",
      },
      {
        q: "How do I tell an expired Story from a private one?",
        a: "Open the link while logged out. A login wall means the account is private; a not-found page means the Story expired. Only the second one has a real fix.",
      },
      {
        q: "Do Highlights expire?",
        a: "No. Highlights stay on a public profile until the owner removes them, and they can be downloaded like any other public post.",
      },
      {
        q: "Can ClipKoala download from private accounts?",
        a: "No, deliberately. Only public posts, Reels, Stories, and Highlights can be fetched, and no version of the tool will ask for your Instagram password.",
      },
    ],
    tools: ["instagram-downloader"],
    guides: ["how-to-save-instagram-stories", "how-to-download-instagram-reels"],
    related: ["private-post-error", "link-not-supported"],
    published: "2026-09-09",
    updated: "2026-09-09",
  },

  "private-post-error": {
    slug: "private-post-error",
    kind: "problem",
    platform: null,
    shortTitle: "Private or restricted post",
    metaTitle: "\"This Post Is Private\" Error: What It Means",
    metaDescription:
      "Private accounts, age gates, members-only videos, and region locks all fail the same way. How to tell which one you hit, and what can honestly be done about each.",
    h1: "Why a private or restricted post cannot be fetched",
    answer:
      "ClipKoala only fetches what is publicly reachable without an account. If a post sits behind a follow request, a login wall, an age gate, a paid membership, or a regional block, there is no version of the request that succeeds, because the platform does not serve the file to anyone who is not signed in and permitted. This is a deliberate boundary rather than a limitation waiting to be worked around.",
    steps: [
      {
        title: "Test the link while logged out",
        body: "Open a private browsing window and paste the link. If you cannot see the post there, no downloader can. This single check identifies the cause of most failures in about five seconds.",
      },
      {
        title: "Identify which restriction you hit",
        body: "A login wall means a private account or a followers-only post. An age warning means an age gate. A join or subscribe prompt means members-only. A message about availability in your country means a region lock. Each has a different real answer, and none of them are technical.",
      },
      {
        title: "Ask, if it is someone's own content",
        body: "For a private account, the person who posted it can send you the file directly. That is not a workaround, it is the correct route, and it takes one message.",
      },
      {
        title: "Do not use a service that asks for your login",
        body: "Any site offering to fetch private posts if you sign in with your platform account is harvesting credentials. ClipKoala will never ask for a platform password, and neither should anything else.",
      },
    ],
    sections: [
      {
        heading: "What each platform calls it",
        body: [
          "Instagram and TikTok use private accounts and friends-only posts. YouTube has private, unlisted, age-restricted, and members-only, which behave very differently from each other. Facebook restricts by friends, groups, and events. X has protected accounts and age-gated media. Reddit has private and quarantined subreddits. Twitch VODs are subscriber-gated for some channels.",
          "They fail in the same way from the outside, which is why the error message cannot always be more specific than it is.",
        ],
      },
      {
        heading: "Unlisted is not private",
        body: [
          "An unlisted YouTube video is not in search or on the channel page, but anyone holding the link can watch it, and it can be fetched normally. If you have the link legitimately, an unlisted video will work. If you do not, having the link does not make sharing the file appropriate.",
        ],
      },
      {
        heading: "Why this boundary is not going to move",
        body: [
          "A tool that could reach private content would need either stolen credentials or a platform vulnerability. Both are lines worth refusing to cross, and any product that crosses them is one bug report away from being a very different kind of story.",
          "It also protects you: the same boundary means nobody is using this to pull your private posts either.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can any downloader access private accounts?",
        a: "Not without your login credentials, which is exactly why services offering it should be avoided. Private content is not served to unauthenticated requests, so there is nothing legitimate to fetch.",
      },
      {
        q: "What about age-restricted YouTube videos?",
        a: "Those require a signed-in, age-verified session and cannot be fetched. The same goes for members-only videos.",
      },
      {
        q: "Can I download unlisted videos?",
        a: "Yes. Unlisted videos are served to anyone with the link, so they resolve normally. Whether you should redistribute the file is a separate question and the answer is usually no.",
      },
      {
        q: "The post is public but still fails. What now?",
        a: "Check the status page to see whether that platform's resolver is having trouble, then try again in a few minutes. If the post opens fine while logged out and still fails, it is worth reporting.",
      },
    ],
    tools: ["tiktok-downloader", "instagram-downloader"],
    guides: [],
    related: ["instagram-story-expired", "downloader-not-working", "link-not-supported"],
    published: "2026-09-09",
    updated: "2026-09-09",
  },

  "link-not-supported": {
    slug: "link-not-supported",
    kind: "problem",
    platform: null,
    shortTitle: "Link isn't supported",
    metaTitle: "Link Not Supported? Which Links Actually Work",
    metaDescription:
      "The exact link formats ClipKoala accepts for all nine platforms, the common mistakes that cause the error, and which platforms are genuinely not supported.",
    h1: "Why your link came back as unsupported",
    answer:
      "Either the link is from a platform ClipKoala does not cover, or it is the wrong kind of link from one it does. The most common cause by far is the second: a profile link instead of a post link, a search URL, an app-internal link that never leaves the app, or a link with tracking junk appended that hides the post ID. Copying the link again with the platform's own Share, then Copy link is the fix in most cases.",
    steps: [
      {
        title: "Use Share, then Copy link, every time",
        body: "Typing a URL from memory or copying it out of the address bar mid-navigation produces links that look right and are not. The platform's own Copy link always produces something resolvable.",
      },
      {
        title: "Check you copied a post, not a profile",
        body: "A profile or channel link has no single video to fetch. The exception is YouTube: paste a channel or playlist link and ClipKoala expands it into a batch of the latest videos automatically.",
      },
      {
        title: "Strip anything after a space",
        body: "Some share sheets paste a title and a link together. ClipKoala pulls links out of surrounding text automatically, but a truncated link with an ellipsis in it cannot be recovered. Copy it again.",
      },
      {
        title: "Confirm the platform is one of the nine",
        body: "TikTok, YouTube, Instagram, Facebook, X, Reddit, Pinterest, Twitch clips, and SoundCloud. Anything else genuinely is not supported yet, and no amount of reformatting the link will change that.",
      },
    ],
    sections: [
      {
        heading: "The link formats that work",
        body: [
          "TikTok: full video links, vm.tiktok.com and vt.tiktok.com short links, and photo slideshow links. YouTube: watch links, youtu.be short links, /shorts links, playlist links, and channel or @handle links. Instagram: /reel/, /p/, /tv/, Story, and Highlight links from public accounts. Facebook: watch links, video posts, Reels, /share/v/ links, and fb.watch short links.",
          "X: x.com and twitter.com status links. Reddit: full post links, /s/ mobile share links, redd.it short links, and direct v.redd.it links. Pinterest: pin links from any country domain, plus pin.it short links. Twitch: clips.twitch.tv and twitch.tv/channel/clip links. SoundCloud: track links and on.soundcloud.com short links.",
        ],
      },
      {
        heading: "What is deliberately out of scope",
        body: [
          "Twitch VODs and live streams, SoundCloud playlists and profiles, and live broadcasts on any platform. Those are not oversights; each needs work that has not been done, and claiming otherwise would just produce a confusing failure later.",
          "Platforms not on the list at all, including Vimeo, Dailymotion, Snapchat, and Threads, are not supported. If one of them matters to you, the changelog is where new platforms are announced.",
        ],
      },
      {
        heading: "Tracking parameters and shortened links",
        body: [
          "Share links often carry campaign parameters. ClipKoala normalises these, so a link with ?igsh= or ?si= on the end is fine as-is. Third-party shorteners, however, hide the destination entirely and cannot be resolved. Open the short link first, then copy the real one.",
        ],
      },
    ],
    faqs: [
      {
        q: "Which platforms does ClipKoala support?",
        a: "Nine: TikTok, YouTube, Instagram, Facebook, X, Reddit, Pinterest, Twitch clips, and SoundCloud. Nothing else, and the list is kept honest rather than aspirational.",
      },
      {
        q: "Why does my profile link not work?",
        a: "A profile has no single video to fetch. Open the specific post and copy that link instead. YouTube channels are the one exception, because they expand into a batch of recent videos.",
      },
      {
        q: "Do short links work?",
        a: "Platform short links do: vm.tiktok.com, youtu.be, fb.watch, redd.it, pin.it, and on.soundcloud.com are all fine. Third-party shorteners are not, because the real destination is hidden.",
      },
      {
        q: "Can you add a platform?",
        a: "Requests are worth sending to support. New platforms show up in the changelog when they actually work, not when they are planned.",
      },
    ],
    tools: ["batch-video-downloader"],
    guides: [],
    related: ["private-post-error", "downloader-not-working"],
    published: "2026-09-09",
    updated: "2026-09-09",
  },

  "downloader-not-working": {
    slug: "downloader-not-working",
    kind: "problem",
    platform: null,
    shortTitle: "Downloader not working",
    metaTitle: "Video Downloader Not Working? Work Through This First",
    metaDescription:
      "Resolvers break when platforms change. How to tell an outage from a bad link, what the status page shows, and the checks worth doing before you try another tool.",
    h1: "The downloader is not working: what to check",
    answer:
      "In order of likelihood: the link is the wrong kind, the post is not public, a platform changed something and a resolver is temporarily broken, or a browser extension is blocking the request. The status page tells you which of these it is faster than guessing, because it shows whether that specific platform is currently resolving. Everything else on this page is the check to run once you know.",
    steps: [
      {
        title: "Read the status page first",
        body: "It reports each platform separately. If the one you need is down, the answer is to wait rather than to keep retrying, and no other tool is likely to be doing better with the same upstream change.",
      },
      {
        title: "Open your link while logged out",
        body: "If it does not open in a private window, it is not public and nothing will fetch it. This single test rules out the largest category of failures.",
      },
      {
        title: "Turn off a content blocker for one attempt",
        body: "Aggressive blockers sometimes stop the browser reaching the conversion progress endpoint, particularly for YouTube. ClipKoala falls back to a server-side flow when this happens, but the fallback is slower and less informative than just allowing the request.",
      },
      {
        title: "Retry once, then move on",
        body: "Resolvers fail over automatically, so a second attempt does occasionally work where the first did not. A third and fourth will not. If two attempts fail on a link you have confirmed is public, it is worth reporting rather than repeating.",
      },
    ],
    sections: [
      {
        heading: "Why downloaders break, honestly",
        body: [
          "Every platform here is actively changing how it serves media, sometimes weekly, and none of them publish an interface for this. A resolver is an interpretation of how a platform currently works, so when the platform changes, the interpretation breaks. That is the actual, unglamorous reason every tool in this category has bad days.",
          "ClipKoala runs more than one resolver per platform where it can and fails over between them, which turns many outages into a slower response rather than an error. It does not make the underlying fragility go away, and pretending it did would be the kind of claim this project avoids.",
        ],
      },
      {
        heading: "Some platforms depend on services we do not run",
        body: [
          "Worth saying plainly rather than leaving in a footnote: ClipKoala does not talk to every platform directly. Several, Reddit among them, block server-side access hard enough that the post is resolved through a third-party service instead, which is also what merges Reddit's separate video and audio streams into one file. TikTok has more than one resolver behind it and falls over from the first to the second when the first stops working.",
          "The practical consequence is that ClipKoala can be entirely healthy and a platform can still fail, because something upstream of us went down. The status page checks the whole path rather than just our own server, which is why it is worth reading before retrying. When a platform is red there, waiting is genuinely the answer.",
        ],
      },
      {
        heading: "What the different failures mean",
        body: [
          "\"Not from a supported platform\" is a link problem. \"Private\" or \"restricted\" means the post is not public. A timeout or an unexpected server problem usually means a resolver is struggling, which is the case worth checking the status page for. A download that starts and then stalls is generally a network or storage issue on your side.",
        ],
      },
      {
        heading: "YouTube is slower on purpose",
        body: [
          "YouTube serves video and audio separately, so a download has to merge them at the quality you picked. That work happens after you click, which is why there is a progress percentage on the button rather than an instant start. Long videos in 1080p can take up to a minute. That is conversion, not a fault.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I know whether it is down or my link?",
        a: "The status page reports each platform separately. If your platform is green there and your link opens in a logged-out browser, the problem is more likely the link format than an outage.",
      },
      {
        q: "Why does YouTube take longer than everything else?",
        a: "YouTube stores video and audio separately and they have to be merged at the quality you chose. Most files are ready in seconds; long 1080p videos can take up to a minute.",
      },
      {
        q: "Does an ad blocker interfere?",
        a: "It can. Some blockers stop the browser polling the conversion progress endpoint. ClipKoala falls back to a server-side download when that happens, so it still works, just with less feedback.",
      },
      {
        q: "Are there download limits?",
        a: "There is no account and no per-user quota, but batches are capped at 10 links and fetched three at a time, and upstream platforms apply their own rate limits. Calling that unlimited would not be accurate.",
      },
    ],
    tools: ["batch-video-downloader"],
    guides: [],
    related: ["link-not-supported", "private-post-error", "reddit-video-no-sound"],
    published: "2026-09-09",
    updated: "2026-09-09",
  },
};

export const ANSWER_SLUGS = Object.keys(ANSWERS);

/** Answers grouped for the index page. */
export const ANSWER_GROUPS: { kind: AnswerCopy["kind"]; title: string; blurb: string }[] = [
  {
    kind: "problem",
    title: "When something goes wrong",
    blurb: "The failures people actually hit, and what each one really means.",
  },
  {
    kind: "comparison",
    title: "Choosing a format",
    blurb: "Honest comparisons, including when the difference does not matter.",
  },
  {
    kind: "question",
    title: "Questions",
    blurb: "Short answers to the things people ask most.",
  },
];
