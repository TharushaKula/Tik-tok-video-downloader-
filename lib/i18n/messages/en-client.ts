import type { PlatformId } from "../../types";
import type { Plural } from "../format";

// English interface strings, the part of the English dictionary the browser
// needs. Kept apart from en-site.ts so client bundles never pull in the
// marketing copy. See en.ts for the rules every language follows.

// ── Client strings ────────────────────────────────────────────────────
// Everything the interactive tool shows. Sent to the browser once per page
// for the current language only.

export const client = {
  common: {
    paste: "Paste",
    clear: "Clear",
    dismiss: "Dismiss",
    close: "Close",
    retry: "Retry",
    save: "Save",
    new: "New",
    newAria: "Start a new download",
    fetch: "Fetch",
    fetching: "Fetching…",
    freeForever: "Free forever",
    noSignUp: "No sign-up",
    nothingStored: "Nothing stored",
  },

  menu: {
    open: "Open menu",
    close: "Close menu",
    title: "Menu",
    downloaders: "Downloaders",
    downloadVideo: "Download a video",
  },

  theme: {
    label: "Theme",
    current: "Theme: {pref}, click to change",
    system: "system",
    light: "light",
    dark: "dark",
  },

  language: {
    label: "Language",
    change: "Change language",
  },

  tool: {
    serverUnreachable:
      "We couldn't reach the server. Check your connection and try again.",
    serverError:
      "The server hit an unexpected problem. Give it a second and try again.",
    unsupportedPlatform:
      "That link isn't from a supported platform. Paste a link from TikTok, Instagram, Facebook, YouTube, X, Reddit, Pinterest, Twitch, or SoundCloud.",
    unexpected: "Unexpected error",
    linksDetected: {
      one: "{count} link detected, fetching it",
      other: "{count} links detected, fetching all",
    } satisfies Plural,
    clipboardDenied: "Clipboard access was denied by the browser",
    clipboardEmpty: "Your clipboard is empty",
    notSupportedLink: "That doesn't look like a supported link",
    dropFileHint: "Drop a link, or a .txt/.csv file of links",
    noLinksInFile: "No supported links found in that file",
    fileReadError: "Couldn't read that file",
    clipboardNoticed: "We noticed {what} in your clipboard",
    clipboardLinks: {
      one: "a link",
      other: "{count} links",
    } satisfies Plural,
    playlistError: "Couldn't load that playlist",
    channelError: "Couldn't load that channel",
    playlistLoadedRecent:
      "Playlist loaded, fetching the {count} most recent videos",
    channelLoadedRecent:
      "Channel loaded, fetching the {count} most recent videos",
    playlistLoaded: {
      one: "Playlist loaded, fetching {count} video",
      other: "Playlist loaded, fetching {count} videos",
    } satisfies Plural,
    channelLoaded: {
      one: "Channel loaded, fetching {count} video",
      other: "Channel loaded, fetching {count} videos",
    } satisfies Plural,
    savedToFavorites: "Saved to favorites",
    removedFromFavorites: "Removed from favorites",
    dropTitle: "Drop a link, or a .txt/.csv of links",
    dropBody: "We'll detect the platform and fetch everything right away",
    linkBox: "link box",
    commands: "commands",
  },

  url: {
    placeholder: "Paste a TikTok, YouTube, Instagram, or any video link…",
    aria: "Video URL",
    clearLink: "Clear link",
    pasteLinkAria: "Paste link from clipboard",
    batch: "Batch",
    batchAria: "Batch mode, paste several links",
    getVideo: "Get video",
    hintEmpty:
      "Paste a link, or several at once. The platform is detected automatically",
    hintPlaylist:
      "YouTube playlist detected, we'll fetch its latest videos as a batch",
    hintChannel:
      "YouTube channel detected, we'll fetch its latest uploads as a batch",
    hintDetected: "{platform} link detected, press Enter to fetch",
    hintUnsupported: "This doesn't look like a supported link yet",
    whichLinksWork: "which links work",
    trustLine:
      "Public posts only, no account, and nothing is stored on our server.",
    privateWhy: "Why private posts can't be fetched",
    importedLinks: {
      one: "Imported {count} link from {file}",
      other: "Imported {count} links from {file}",
    } satisfies Plural,
    batchPlaceholder:
      "Paste links, one per line…\nhttps://www.tiktok.com/…\nhttps://youtu.be/…",
    batchTextAria: "Video URLs, one per line",
    pasteLinksAria: "Paste links from clipboard",
    importFile: "Import file",
    importFileAria: "Import links from a .txt or .csv file",
    singleLink: "Single link",
    singleLinkAria: "Back to single link",
    fetchVideos: "Fetch videos",
    fetchCount: {
      one: "Fetch {count} video",
      other: "Fetch {count} videos",
    } satisfies Plural,
    batchHintEmpty:
      "One link per line, or paste any text, the links are picked out for you",
    batchValid: {
      one: "{count} valid link",
      other: "{count} valid links",
    } satisfies Plural,
    batchUnsupported: "{count} unsupported",
    batchCapped: "capped at {max} per batch",
    batchShortcut: "Ctrl/⌘ + Enter to fetch",
  },

  result: {
    sendToPhone: "Send to phone",
    sendToPhoneAria: "Send to phone with a QR code",
    continueOnPhone: "Continue on your phone",
    qrBody: "Scan to open this video in ClipKoala on another device.",
    zipError: "Couldn't build the ZIP",
    zipSaved: "ZIP with {count} images saved",
    zipping: "Zipping…",
    zipAll: "Download all ({count}) as ZIP",
    previewUnavailable: "Preview isn't available for this video",
    closePreview: "Close preview",
    previewVideo: "Preview video",
    removeFromSaved: "Remove from saved",
    saveToFavorites: "Save to favorites",
    saved: "Saved",
    saveThumbnail: "Save thumbnail",
    saveThumbnailAria: "Save thumbnail image",
    views: "views",
    likes: "likes",
    comments: "comments",
    shares: "shares",
    saveAs: "Save as",
    noteYouTube:
      "YouTube files are converted on the fly, you'll see live progress, and the download starts automatically when it's ready.",
    noteOther:
      "Files are fetched through our server, so nothing is installed and no app is needed.",
  },

  download: {
    preparingToast: "Preparing your file, the download starts when it's ready",
    startedToast: "Download started, check your browser downloads",
    failed: "Failed to start the download",
    converting: "Converting · {percent}%",
    preparing: "Preparing…",
    inDownloads: "In your downloads",
    started: "Started",
    /** Option labels arrive from the server as "Download HD" and so on */
    optionLabel: "Download {what}",
    audio: "Audio",
    video: "Video",
    image: "Image",
  },

  batch: {
    title: "Batch download",
    progress: "{done} of {total} fetched",
    failedCount: "{count} failed",
    startingAll:
      "Starting {count} downloads, your browser may ask to allow multiple files",
    saving: "Saving…",
    saveAll: "Save all ({count})",
    waiting: "Waiting…",
    fetchingFrom: "Fetching from {platform}…",
    formats: {
      one: "{platform} · {count} format",
      other: "{platform} · {count} formats",
    } satisfies Plural,
    saveItemAria: "Save {title}",
    footnote:
      "Save all grabs the best quality for each video. Expand a row to pick a different format.",
    fetchingVideo: "Fetching video…",
  },

  errors: {
    title: "We couldn't fetch that one",
    tipOpens: "Check that the link opens in your browser",
    tipPrivate:
      "Private, age-restricted, or region-locked posts can't be fetched",
    tipRecopy: "Try copying the link again from the app's Share button",
    tipStatusBefore: "Keeps happening?",
    tipStatusLink: "Check the status page",
    tipStatusAfter: "to see if the platform is down",
    tryAgain: "Try again",
    /** Shown under a translated explanation, with the server's own words */
    details: "Details: {message}",
    /**
     * Plain-language explanation per failure class. English shows the
     * server's message as-is; other languages show these instead.
     */
    classes: {
      unsupported_url:
        "That link isn't one ClipKoala can read. Check it is a public post from a supported platform.",
      private_or_restricted:
        "This post is private, age-restricted, or limited to some regions, so it can't be fetched.",
      not_found:
        "This post couldn't be found. It may have been deleted or the link may be incomplete.",
      no_media: "No downloadable video or audio was found in this post.",
      rate_limited:
        "The platform is receiving too many requests right now. Wait a minute and try again.",
      network:
        "The connection dropped while fetching. Check your internet and try again.",
      resolver_down:
        "The service that reads this platform is having problems. Try again in a moment.",
      unknown: "Something went wrong while fetching this link.",
    },
  },

  share: {
    prompt: "Found this useful? Send someone the {page}.",
    share: "Share",
    copyLink: "Copy link",
    copied: "Copied",
    copiedToast: "Link copied, ready to paste",
    clipboardBlocked: "Your browser blocked clipboard access",
    fallbackPitch: "Free video downloader, no sign-up",
    pitch: {
      tiktok:
        "Saves TikToks in HD with no watermark, free and without an account",
      youtube:
        "Grabs YouTube videos as MP4 or converts them to MP3, free and with no account",
      instagram:
        "Saves Instagram Reels, posts, and carousels in full quality, no login",
      facebook: "Saves Facebook videos and Reels in HD, free and with no account",
      twitter: "Saves videos and GIFs from X posts in HD, free and with no account",
      reddit:
        "Saves Reddit videos with the sound actually attached, free and with no account",
      pinterest:
        "Saves Pinterest video and image pins at full resolution, no account",
      twitch: "Saves Twitch clips as MP4 in up to 1080p, free and with no account",
      soundcloud: "Saves SoundCloud tracks as MP3 with the cover art, no account",
    } satisfies Record<PlatformId, string>,
  },

  feedback: {
    thanks: "Thank you, that genuinely helps.",
    job: {
      title: "What were you saving?",
      note: "One tap. It only tells us which jobs to make better.",
      options: {
        own_post: "One of my own posts",
        reference_clip: "A reference clip for an edit",
        audio_offline: "Audio to listen to offline",
        teaching: "Something for a class or lesson",
        archive: "Archiving a public post",
        other: "Something else",
      },
    },
    exit: {
      title: "What stopped you?",
      note: "One tap, and it helps more than you would think.",
      options: {
        error: "It failed with an error",
        unsupported: "My link wasn't supported",
        quality: "The quality I wanted wasn't there",
        trust: "I wasn't sure it was safe",
        slow: "It was taking too long",
        browsing: "Nothing, just looking",
      },
    },
  },

  onboarding: {
    newHere: "New here?",
    body: "Open any video, tap its Share button, copy the link, and paste it below. The download options appear in seconds, and pasting several links at once starts a batch.",
    dismiss: "Dismiss tip",
  },

  recent: {
    title: "Recent",
    aria: "Recent downloads",
    justNow: "just now",
    minutesAgo: "{count}m ago",
    hoursAgo: "{count}h ago",
    daysAgo: "{count}d ago",
  },

  favorites: {
    title: "Saved",
    aria: "Saved videos",
    all: "All",
    tagPlaceholder: "tag name",
    newTagAria: "New tag",
    addTag: "tag",
    removeTag: "Remove tag {tag}",
    editTags: "Edit tags for {title}",
    remove: "Remove {title} from saved",
  },

  usage: {
    saved: {
      one: "You've saved {count} video with ClipKoala",
      other: "You've saved {count} videos with ClipKoala",
    } satisfies Plural,
    mostlyFrom: "mostly from",
  },

  filename: {
    settings: "Filename settings",
    title: "Download filenames",
    body: "Build your own pattern with the variables below.",
    templateAria: "Filename template",
    preview: "Preview",
    reset: "Reset to default",
    resetToast: "Filename pattern reset",
    vars: {
      title: "Video title",
      author: "Author / channel",
      platform: "Platform",
      quality: "Quality",
      date: "Today's date",
    },
  },

  palette: {
    aria: "Command palette",
    placeholder: "Search commands, saved videos, pages…",
    noMatch: "No matching commands",
    groups: {
      actions: "Actions",
      theme: "Theme",
      preferences: "Preferences",
      saved: "Saved",
      recent: "Recent",
      goTo: "Go to",
    },
    paste: "Paste a link and fetch",
    pasteHint: "from clipboard",
    themeSystem: "Use system theme",
    themeLight: "Switch to light theme",
    themeDark: "Switch to dark theme",
    toggleSound: "Toggle completion sound",
    soundOn:
      "Completion sound on, you'll hear a soft chime when conversions finish",
    soundOff: "Completion sound off",
    home: "Home",
    platforms: "Supported platforms",
    howItWorks: "How it works",
    faq: "FAQ",
    changelog: "What's new",
    status: "Status: is ClipKoala working?",
    features: "Features",
    extension: "Browser extension",
    about: "About ClipKoala",
    guides: "How-to guides",
  },
};
