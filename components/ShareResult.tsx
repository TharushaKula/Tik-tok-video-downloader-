"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import toast from "react-hot-toast";

import { LANDING_FOR_PLATFORM, LANDING_PAGES } from "@/lib/landing";
import { trackFunnel } from "@/lib/analytics";
import type { PlatformId } from "@/lib/types";

// Shown once a download has started. It shares the *tool page* that matches
// what the visitor just saved, with a prewritten line they can edit.
//
// The link the user pasted is never part of the share payload. Their clip is
// their business; the only thing that travels is a public ClipKoala URL.

interface ShareResultProps {
  platform: PlatformId;
}

/** The prewritten line, per platform, describing the job it just did. */
const PITCH: Partial<Record<PlatformId, string>> = {
  tiktok: "Saves TikToks in HD with no watermark, free and without an account",
  youtube: "Grabs YouTube videos as MP4 or converts them to MP3, free and with no account",
  instagram: "Saves Instagram Reels, posts, and carousels in full quality, no login",
  facebook: "Saves Facebook videos and Reels in HD, free and with no account",
  twitter: "Saves videos and GIFs from X posts in HD, free and with no account",
  reddit: "Saves Reddit videos with the sound actually attached, free and with no account",
  pinterest: "Saves Pinterest video and image pins at full resolution, no account",
  twitch: "Saves Twitch clips as MP4 in up to 1080p, free and with no account",
  soundcloud: "Saves SoundCloud tracks as MP3 with the cover art, no account",
};

export default function ShareResult({ platform }: ShareResultProps) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  const slug = LANDING_FOR_PLATFORM[platform];
  const page = LANDING_PAGES[slug];

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(timer);
  }, [copied]);

  if (!page) return null;

  // Tagged so directory, social, and word-of-mouth traffic can be told apart
  // in the funnel without any tracking of the person doing the sharing.
  const shareUrl = `${typeof window === "undefined" ? "" : window.location.origin}/${slug}?utm_source=share&utm_medium=referral&utm_campaign=post-download`;
  const text = `${PITCH[platform] ?? "Free video downloader, no sign-up"}: ClipKoala.`;

  async function handleShare() {
    trackFunnel("share", { platform, via: "sheet" });
    try {
      await navigator.share({ title: page.name, text, url: shareUrl });
    } catch {
      // The user dismissed the sheet, or the browser refused. Either is fine.
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`${text} ${shareUrl}`);
      setCopied(true);
      trackFunnel("share", { platform, via: "copy" });
      toast.success("Link copied, ready to paste");
    } catch {
      toast.error("Your browser blocked clipboard access");
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-veil/[0.06] px-4 py-3 sm:px-5">
      <p className="mr-auto text-xs text-ink-3">
        Found this useful? Send someone the {page.name.toLowerCase()}.
      </p>
      {canShare && (
        <button
          onClick={handleShare}
          className="focus-ring inline-flex h-8 items-center gap-1.5 rounded-lg border border-veil/[0.08] px-3 text-xs font-medium text-ink-2 transition-colors hover:border-veil/20 hover:text-ink-1"
        >
          <Share2 size={12} aria-hidden />
          Share
        </button>
      )}
      <button
        onClick={handleCopy}
        className="focus-ring inline-flex h-8 items-center gap-1.5 rounded-lg border border-veil/[0.08] px-3 text-xs font-medium text-ink-2 transition-colors hover:border-veil/20 hover:text-ink-1"
      >
        {copied ? (
          <Check size={12} className="text-ok" aria-hidden />
        ) : (
          <Copy size={12} aria-hidden />
        )}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
