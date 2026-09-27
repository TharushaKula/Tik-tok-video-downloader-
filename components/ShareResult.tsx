"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import toast from "react-hot-toast";

import { LANDING_FOR_PLATFORM } from "@/lib/landing";
import { trackFunnel } from "@/lib/analytics";
import type { PlatformId } from "@/lib/types";
import { useI18n } from "@/lib/i18n/client";
import { fmt } from "@/lib/i18n/format";

// Shown once a download has started. It shares the *tool page* that matches
// what the visitor just saved, in the visitor's language, with a prewritten
// line (share.pitch in the dictionaries) they can edit.
//
// The link the user pasted is never part of the share payload. Their clip is
// their business; the only thing that travels is a public ClipKoala URL.

interface ShareResultProps {
  platform: PlatformId;
}

export default function ShareResult({ platform }: ShareResultProps) {
  const { t, locale, landingNames, href } = useI18n();
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  const slug = LANDING_FOR_PLATFORM[platform];
  const pageName = landingNames[slug];

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(timer);
  }, [copied]);

  if (!pageName) return null;

  // Tagged so directory, social, and word-of-mouth traffic can be told apart
  // in the funnel without any tracking of the person doing the sharing.
  const shareUrl = `${typeof window === "undefined" ? "" : window.location.origin}${href(`/${slug}`)}?utm_source=share&utm_medium=referral&utm_campaign=post-download`;
  const text = `${t.share.pitch[platform] ?? t.share.fallbackPitch}: ClipKoala.`;

  async function handleShare() {
    trackFunnel("share", { platform, via: "sheet" });
    try {
      await navigator.share({ title: pageName, text, url: shareUrl });
    } catch {
      // The user dismissed the sheet, or the browser refused. Either is fine.
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`${text} ${shareUrl}`);
      setCopied(true);
      trackFunnel("share", { platform, via: "copy" });
      toast.success(t.share.copiedToast);
    } catch {
      toast.error(t.share.clipboardBlocked);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-veil/[0.06] px-4 py-3 sm:px-5">
      <p className="mr-auto text-xs text-ink-3">
        {fmt(t.share.prompt, {
          // English reads "send someone the tiktok downloader"; other
          // languages insert the name as written.
          page: locale === "en" ? pageName.toLowerCase() : pageName,
        })}
      </p>
      {canShare && (
        <button
          onClick={handleShare}
          className="focus-ring inline-flex h-8 items-center gap-1.5 rounded-lg border border-veil/[0.08] px-3 text-xs font-medium text-ink-2 transition-colors hover:border-veil/20 hover:text-ink-1"
        >
          <Share2 size={12} aria-hidden />
          {t.share.share}
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
        {copied ? t.share.copied : t.share.copyLink}
      </button>
    </div>
  );
}
