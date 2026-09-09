import type { PlatformId } from "./types";

// Audience pages: the same tool, framed around one person's actual job.
//
// These exist because "free video downloader" is a crowded, low-intent query
// while "save my own Instagram posts before deleting the account" is a real
// person with a real problem. Each page leads with that job, uses that
// person's vocabulary, and links to the parts of the product that serve it.
//
// Every page must stay inside the positioning guardrail: lawful personal
// copies of public media, or the visitor's own content. No page here should
// suggest taking someone else's work.

export interface AudienceStep {
  title: string;
  body: string;
}

export interface AudienceCopy {
  slug: string;
  /** Short label for menus and cross-links */
  name: string;
  /** <title> without the brand suffix */
  metaTitle: string;
  metaDescription: string;
  h1: string;
  sub: string;
  /** The job, stated in the visitor's own words, above everything else */
  jobLine: string;
  /** What this audience gets, as a check strip */
  highlights: string[];
  /** The workflow, written for this job specifically */
  workflow: AudienceStep[];
  /** Prose that answers the doubts this particular audience has */
  sections: { heading: string; body: string[] }[];
  /** The honest boundary for this audience, stated plainly, not in a footnote */
  limits: string[];
  faqs: { q: string; a: string }[];
  /** Landing pages this audience should reach first */
  tools: string[];
  /** Guides worth reading for this job */
  guides: string[];
  /** Platforms to accent the page with */
  platforms: PlatformId[];
  updated: string;
}

export const AUDIENCES: Record<string, AudienceCopy> = {
  creators: {
    slug: "creators",
    name: "Creators",
    metaTitle: "Save Your Own Social Posts: Backup Tool for Creators",
    metaDescription:
      "Back up the videos you posted to TikTok, Instagram, YouTube, and X before an account change, a takedown, or a platform outage. Free, no sign-up, no watermark.",
    h1: "Keep a copy of everything you posted",
    sub: "Your uploads live on someone else's server. Paste your own post links and pull clean, watermark-free originals back onto your own drive.",
    jobLine:
      "You posted it, the platform kept it, and you never kept a copy. Get your own work back.",
    highlights: [
      "Watermark-free TikTok originals",
      "Reels, carousels, and Stories",
      "Batch up to 10 posts at once",
      "Filenames you can actually sort",
    ],
    workflow: [
      {
        title: "Collect your post links",
        body: "Open your own profile on each platform and copy the share link for every post you want back. Paste them into a notes app or a spreadsheet column as you go. Ten at a time is the batch limit, so work in blocks of ten.",
      },
      {
        title: "Paste the whole block at once",
        body: "Drop the list straight into ClipKoala. It switches to batch mode on its own, detects the platform per link, and fetches three at a time so no single slow platform holds up the rest.",
      },
      {
        title: "Set a filename template first",
        body: "Open the filename settings in the header and pick a template such as date, author, then title. A hundred files called video.mp4 is not an archive; a hundred files that sort by date is.",
      },
      {
        title: "Save everything, then check the gaps",
        body: "Save all takes the top quality for each row. Any row that failed keeps its own retry button, so you can see exactly what did not come back rather than discovering it months later.",
      },
    ],
    sections: [
      {
        heading: "Why your own posts are the hardest ones to get back",
        body: [
          "Every platform is happy to store your work and reluctant to hand it over. TikTok's Save video stamps a moving watermark across your own footage. Instagram's bookmark is a pointer that dies with the post. Facebook saves to a list inside Facebook. None of them give you the file.",
          "ClipKoala fetches the original the platform serves before those layers are applied, so a TikTok comes back clean at the resolution you uploaded, and an Instagram carousel comes back as separate full-resolution files plus a ZIP of the set.",
        ],
      },
      {
        heading: "The moments this actually matters",
        body: [
          "Rebranding a handle and starting fresh. Moving a client's content between agencies. A copyright claim on background music that takes a whole video down. A platform outage that lasts a day and reminds you the archive is not yours. Reposting an old clip that performed well, without the watermark of the platform you first posted it to.",
          "None of those are emergencies until they are, and by then the post is gone.",
        ],
      },
    ],
    limits: [
      "Only public posts. If you set an account to private, log out and check the link opens before pasting it.",
      "Deleted posts are gone. This backs up what is still live, it does not recover what a platform already removed.",
      "Music you licensed through a platform's own library is licensed for that platform. Saving the file does not extend that licence anywhere else.",
    ],
    faqs: [
      {
        q: "Can I back up my whole profile at once?",
        a: "Not in a single click. Batches are capped at 10 links, so profile backups run as blocks of ten. YouTube is the exception: paste your channel link and ClipKoala expands it into a batch of your most recent videos automatically.",
      },
      {
        q: "Will my own TikToks come back without the watermark?",
        a: "Yes. ClipKoala fetches the original TikTok stores before the watermark is applied, so your upload comes back at the resolution and bitrate you posted, with nothing cropped or blurred.",
      },
      {
        q: "Do I need to log in with my creator account?",
        a: "No, and you should not. ClipKoala never asks for a platform password. It only works with links that are publicly reachable, which includes your own public posts.",
      },
      {
        q: "What filename format should I use for an archive?",
        a: "Date first, then platform, then title. Files sort chronologically in any file browser and you can tell at a glance where each one came from. Set it once in the filename settings and every download follows it.",
      },
    ],
    tools: ["tiktok-downloader", "instagram-downloader", "batch-video-downloader"],
    guides: [
      "how-to-download-tiktok-videos-without-watermark",
      "how-to-batch-download-videos",
      "how-to-save-instagram-stories",
    ],
    platforms: ["tiktok", "instagram", "youtube"],
    updated: "2026-09-09",
  },

  editors: {
    slug: "editors",
    name: "Video editors",
    metaTitle: "Reference Clip Downloader for Video Editors",
    metaDescription:
      "Pull reference clips, style boards, and B-roll candidates into a folder your NLE can read. Batch downloads, sortable filenames, MP4 that imports cleanly. Free.",
    h1: "Get reference clips into your edit folder",
    sub: "Paste a whole list of links and get clean MP4s with filenames that make sense six weeks later, when you have forgotten what clip 4 was.",
    jobLine:
      "You need twenty reference clips in a folder, not twenty browser tabs you are afraid to close.",
    highlights: [
      "Up to 10 links per batch",
      "Import a .txt or .csv of links",
      "MP4 that imports into any NLE",
      "Template filenames with author and date",
    ],
    workflow: [
      {
        title: "Build the list while you research",
        body: "Keep a plain text file or a spreadsheet column open and paste every link you find. Do not download as you go; collecting first and fetching once is far faster and you end up with a record of your sources.",
      },
      {
        title: "Import the file, or just drop it on the page",
        body: "Drag the .txt or .csv straight onto ClipKoala. Quotes, commas, and extra spreadsheet columns are stripped automatically, and anything that is not a supported link is ignored rather than failing the batch.",
      },
      {
        title: "Name the files for your project, not for the platform",
        body: "Set a filename template with the author and the date before you start. Reference material is only useful if you can trace it back, and an editor's downloads folder is where sources go to die.",
      },
      {
        title: "Save all, then expand the rows you care about",
        body: "Save all grabs the top quality for every row. If one specific clip needs a smaller file for a rough cut, expand that row and pick SD instead.",
      },
    ],
    sections: [
      {
        heading: "Files that behave in an NLE",
        body: [
          "Everything non-YouTube arrives as the platform's own MP4, so Premiere, Resolve, and Final Cut import it without a transcode step. Reddit is the case worth knowing about: Reddit serves picture and sound as two separate streams, so a file saved directly from v.redd.it is silent. ClipKoala's Reddit path merges them before you get the file, which means the clip you drop on the timeline already has its audio.",
          "Twitch clips list each quality Twitch offers separately, usually 360p through 1080p, so you can pull a 360p proxy for an offline cut and the 1080p later.",
        ],
      },
      {
        heading: "Reference is not a licence",
        body: [
          "A reference clip is something you study, cut a mood board from, or show a client to explain a look. It is not footage you ship. If a frame of it is going to appear in delivered work, you need a licence or the rights holder's permission, exactly as you would with stock.",
          "This is not a disclaimer bolted on the bottom of the page. It is the difference between a workflow tool and a liability.",
        ],
      },
    ],
    limits: [
      "Downloads go up to 1080p. There is no 4K path, so this is a reference and rough-cut tool, not a mastering source.",
      "Batches are capped at 10 links and fetched three at a time, which keeps each result fast.",
      "Private, members-only, and login-walled posts cannot be fetched, which rules out a lot of client review links.",
    ],
    faqs: [
      {
        q: "What is the fastest way to pull thirty reference clips?",
        a: "Put every link in a .txt file, one per line, then drag the file onto the page. ClipKoala reads it, drops anything unsupported, and queues the rest. Thirty links means three batches of ten, back to back.",
      },
      {
        q: "Will Reddit clips have sound on the timeline?",
        a: "Yes. Reddit stores video and audio separately and ClipKoala merges them before you get the file, so the MP4 already has its audio when you import it.",
      },
      {
        q: "Can I get 4K for a master?",
        a: "No. The quality ceiling is 1080p. For anything you are delivering, licence the footage properly rather than pulling it from a social platform.",
      },
      {
        q: "Do the filenames carry the creator's name?",
        a: "They can. Open the filename settings and add the author token to your template, and every file arrives tagged with who made it, which is what you need when you go back to ask for permission.",
      },
    ],
    tools: ["batch-video-downloader", "reddit-downloader", "twitch-clip-downloader"],
    guides: [
      "how-to-batch-download-videos",
      "how-to-download-reddit-videos-with-sound",
      "how-to-download-twitch-clips",
    ],
    platforms: ["youtube", "reddit", "twitch"],
    updated: "2026-09-09",
  },

  teachers: {
    slug: "teachers",
    name: "Teachers",
    metaTitle: "Save Lecture Audio for Offline Classroom Use",
    metaDescription:
      "Turn a lecture, talk, or podcast into an MP3 you can play in a classroom with no internet. Free, no sign-up, no software to get past IT.",
    h1: "Offline audio for a classroom with bad wifi",
    sub: "Convert a talk, lecture, or podcast episode to a 320kbps MP3 you can play from a laptop, a phone, or a USB stick, with nothing to install.",
    jobLine:
      "The room's wifi will fail during the lesson. Have the file on the laptop before it does.",
    highlights: [
      "MP3 at 320kbps",
      "M4A, WAV, and FLAC too",
      "Whole playlists in one batch",
      "Nothing to install on a school machine",
    ],
    workflow: [
      {
        title: "Check you are allowed to use it",
        body: "Openly licensed lectures, Creative Commons talks, government and museum recordings, your institution's own uploads, and your own recordings are all fair game. A commercial audiobook or a music track is not. This step is not optional and it takes ten seconds.",
      },
      {
        title: "Copy the link and choose MP3",
        body: "Paste the video link and pick Download MP3. It encodes at 320kbps, the highest bitrate MP3 supports, which is well beyond what a classroom speaker will ever reveal.",
      },
      {
        title: "Do it the evening before, not in the lesson",
        body: "A long lecture takes up to a minute to convert. The progress runs on the button and a notification fires if you switch tabs, so you can start it and go back to your marking.",
      },
      {
        title: "Put it somewhere that does not need a network",
        body: "Copy the file to the machine you will actually teach from, or to a USB stick. A file in cloud storage is still a file that needs the wifi you do not trust.",
      },
    ],
    sections: [
      {
        heading: "Why this works on a locked-down school laptop",
        body: [
          "ClipKoala runs entirely in the browser. There is no installer, no extension requirement, no admin password, and no account. On a managed machine where you cannot install anything, that is usually the difference between having the audio and not having it.",
          "It also means nothing to explain to IT beyond a website. If your institution filters by category, ask them to allow the domain rather than trying to work around the filter.",
        ],
      },
      {
        heading: "Choosing a format for a classroom",
        body: [
          "MP3 at 320kbps is the right default: it plays on every device in the building, including the ancient one wired to the projector. M4A is the same quality at a smaller size and is the safer choice on Apple hardware. WAV and FLAC exist for when you plan to edit the audio into teaching material, not for playback.",
          "For a series, paste the playlist link. ClipKoala expands it into a batch of its latest videos and you pick the audio format per item, or use Save all.",
        ],
      },
    ],
    limits: [
      "Copyright applies in a classroom too. Educational use is not a blanket exemption, and the rules differ by country and institution. Check your own policy.",
      "Private, members-only, and unlisted-with-a-password recordings cannot be fetched.",
      "Live streams cannot be captured. Wait until the replay is published.",
    ],
    faqs: [
      {
        q: "Is it legal to download a lecture for my class?",
        a: "It depends on the licence. Openly licensed and Creative Commons material, public-domain recordings, your institution's own content, and anything you made yourself are fine. Commercial content generally is not, and educational use is not an automatic exemption anywhere. Check your institution's policy before the lesson, not after.",
      },
      {
        q: "Do I need to install anything on a school computer?",
        a: "No. ClipKoala is a website. There is no installer, no extension needed, and no admin rights required, which is usually the whole reason a teacher ends up here.",
      },
      {
        q: "What bitrate do the MP3 files use?",
        a: "320kbps, the highest MP3 supports. There is nothing to configure and no quality tier to pay for.",
      },
      {
        q: "Can I convert a whole lecture series at once?",
        a: "Yes. Paste the playlist link and it expands into a batch of the most recent videos in that playlist, each with its own audio format options.",
      },
    ],
    tools: ["youtube-to-mp3", "youtube-downloader", "soundcloud-downloader"],
    guides: [
      "how-to-convert-youtube-to-mp3",
      "how-to-download-youtube-playlist",
      "how-to-batch-download-videos",
    ],
    platforms: ["youtube", "soundcloud"],
    updated: "2026-09-09",
  },

  "social-managers": {
    slug: "social-managers",
    name: "Social managers",
    metaTitle: "Archive Public Campaign Posts Across Nine Platforms",
    metaDescription:
      "Keep a dated record of the public posts in a campaign across TikTok, Instagram, X, and six more platforms. Batch downloads, consistent filenames, free.",
    h1: "Archive a campaign before the posts change",
    sub: "Pull the public posts in a campaign into one dated folder, across nine platforms, in blocks of ten links.",
    jobLine:
      "The report is due in March and half the posts will have been edited or deleted by then.",
    highlights: [
      "Nine platforms in one tool",
      "Mix platforms in a single batch",
      "Dated, sortable filenames",
      "Carousels bundled as a ZIP",
    ],
    workflow: [
      {
        title: "Keep a link sheet as the campaign runs",
        body: "One column of links, one row per post, captured at publish time. Doing this at the end means chasing posts that have since been edited, geo-restricted, or taken down.",
      },
      {
        title: "Set a dated filename template once",
        body: "Date, then platform, then title. An archive whose files sort chronologically is a record; an archive of untitled MP4s is a folder.",
      },
      {
        title: "Export the column and drop it on the page",
        body: "Save the column as .csv and drag it onto ClipKoala. Extra columns, quotes, and commas are handled, so you do not need to clean the export first.",
      },
      {
        title: "Grab the carousels as ZIPs",
        body: "Multi-image Instagram posts and TikTok slideshows list every item separately with a Download all as ZIP button, so a nine-slide carousel is one file rather than nine.",
      },
    ],
    sections: [
      {
        heading: "What a public archive is actually for",
        body: [
          "Proving what a campaign shipped and when. Reporting to a client who was not watching in real time. Keeping the creative you paid for after an agency handover. Comparing this quarter's output to last quarter's without trusting that every post is still live.",
          "Platform analytics tell you how a post performed. They do not give you the post. When a handle changes or an account is closed, the analytics go with it.",
        ],
      },
      {
        heading: "Where the boundary sits",
        body: [
          "This is for your own and your client's public posts, and for public posts you have permission to keep. It is not a tool for lifting a competitor's creative, and it is not a way into private accounts, dark posts, or anything behind a login. Those simply do not resolve.",
          "If a campaign involves creator partnerships, the creator's licence governs what you can keep and reuse. Saving the file does not widen that licence.",
        ],
      },
    ],
    limits: [
      "Only public posts resolve. Dark posts, private accounts, and paid-social previews cannot be fetched.",
      "Ten links per batch, run back to back. There is no bulk profile export.",
      "Story links work only while the Story is live. Once it expires there is nothing left to fetch.",
    ],
    faqs: [
      {
        q: "Can I archive posts from a private or dark-posted campaign?",
        a: "No. Only publicly reachable posts can be fetched. Dark posts and private accounts are out of scope by design, so plan to capture those through the platform's own export instead.",
      },
      {
        q: "Can one batch mix TikTok, Instagram, and X links?",
        a: "Yes. The platform is detected per link, so any mix of the nine supported platforms works in one batch.",
      },
      {
        q: "How do I archive a multi-image Instagram post?",
        a: "Paste the post link. Every image and video in the carousel is listed separately, and Download all as ZIP bundles the whole post into one file named after the post.",
      },
      {
        q: "Does saving a creator's post give us the right to reuse it?",
        a: "No. The usage rights in your agreement with the creator are the only thing that governs reuse. A saved file changes nothing about that, and this page will not pretend otherwise.",
      },
    ],
    tools: ["instagram-downloader", "batch-video-downloader", "tiktok-downloader"],
    guides: [
      "how-to-batch-download-videos",
      "how-to-save-instagram-stories",
      "how-to-download-tiktok-slideshows",
    ],
    platforms: ["instagram", "tiktok", "twitter"],
    updated: "2026-09-09",
  },
};

export const AUDIENCE_SLUGS = Object.keys(AUDIENCES);
