"use client";

import { Lightbulb, X } from "lucide-react";

const STORAGE_KEY = "snapload:onboarded";

export function hasOnboarded(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return true; // no storage, don't nag
  }
}

export function markOnboarded(): void {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // ignore
  }
}

// One-time coach mark for first-time visitors. Dismissed by the X, or
// automatically after the first successful fetch.
export default function OnboardingHint({
  visible,
  onDismiss,
}: {
  visible: boolean;
  onDismiss: () => void;
}) {
  if (!visible) return null;

  return (
    <div
      className="flex w-full items-start gap-3 rounded-xl border border-accent/25 bg-accent/[0.06] p-3.5"
      role="note"
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15">
        <Lightbulb size={13} className="text-accent" />
      </span>
      <p className="min-w-0 flex-1 text-xs leading-relaxed text-ink-1">
        <span className="font-semibold">New here?</span> Open any video, tap
        its Share button, copy the link, and paste it below. The download
        options appear in seconds, and pasting several links at once starts a
        batch.
      </p>
      <button
        onClick={onDismiss}
        className="focus-ring shrink-0 rounded-md p-1 text-ink-3 transition-colors hover:text-ink-1"
        aria-label="Dismiss tip"
      >
        <X size={13} />
      </button>
    </div>
  );
}
