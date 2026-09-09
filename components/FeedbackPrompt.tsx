"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import { hasActivated, trackFunnel } from "@/lib/analytics";
import { STORAGE_PREFIX } from "@/lib/site";

// Two one-question prompts, at most one of which a browser will ever see.
//
//   "job"  — after a successful download. Which job did you just finish?
//            This is what tells us who the strongest audience actually is.
//   "exit" — for a visitor who tried a link and never got a file. What
//            stopped you? Trust, an error, an unsupported link, quality.
//
// Rules the playbook sets, enforced here:
//   - Never before the file arrives, and never after a failure the user is
//     still in the middle of retrying.
//   - Never on the paste, resolve, or download path itself: it is a small
//     card in the corner that cannot cover anything.
//   - Fixed choices only. No free text ever leaves the browser.

const ASKED_KEY = `${STORAGE_PREFIX}asked`;

type Mode = "job" | "exit";

const QUESTIONS: Record<
  Mode,
  { title: string; note: string; options: { id: string; label: string }[] }
> = {
  job: {
    title: "What were you saving?",
    note: "One tap. It only tells us which jobs to make better.",
    options: [
      { id: "own_post", label: "One of my own posts" },
      { id: "reference_clip", label: "A reference clip for an edit" },
      { id: "audio_offline", label: "Audio to listen to offline" },
      { id: "teaching", label: "Something for a class or lesson" },
      { id: "archive", label: "Archiving a public post" },
      { id: "other", label: "Something else" },
    ],
  },
  exit: {
    title: "What stopped you?",
    note: "One tap, and it helps more than you would think.",
    options: [
      { id: "error", label: "It failed with an error" },
      { id: "unsupported", label: "My link wasn't supported" },
      { id: "quality", label: "The quality I wanted wasn't there" },
      { id: "trust", label: "I wasn't sure it was safe" },
      { id: "slow", label: "It was taking too long" },
      { id: "browsing", label: "Nothing, just looking" },
    ],
  },
};

function alreadyAsked(): boolean {
  try {
    return localStorage.getItem(ASKED_KEY) !== null;
  } catch {
    return true; // No storage means no way to honour "ask once". Stay quiet.
  }
}

function markAsked(): void {
  try {
    localStorage.setItem(ASKED_KEY, String(Date.now()));
  } catch {
    // ignore
  }
}

interface FeedbackPromptProps {
  /** True once a download has started in this session */
  activated: boolean;
  /** True once at least one link has been submitted in this session */
  attempted: boolean;
  /** True while a fetch or batch is running: never interrupt it */
  busy: boolean;
}

export default function FeedbackPrompt({
  activated,
  attempted,
  busy,
}: FeedbackPromptProps) {
  const [mode, setMode] = useState<Mode | null>(null);
  const [answered, setAnswered] = useState(false);
  const settled = useRef(false);

  const open = useCallback((next: Mode) => {
    if (settled.current || alreadyAsked()) return;
    settled.current = true;
    markAsked();
    setMode(next);
  }, []);

  // After a download: wait a few seconds so the file is clearly on its way
  // and the visitor is no longer looking at the button they just pressed.
  useEffect(() => {
    if (!activated || settled.current) return;
    const timer = setTimeout(() => open("job"), 6000);
    return () => clearTimeout(timer);
  }, [activated, open]);

  // Non-activated visitors: ask only when they are leaving, and only if they
  // actually tried a link. Someone who never pasted has nothing to tell us.
  useEffect(() => {
    if (activated || !attempted || settled.current) return;

    function onLeave(e: MouseEvent) {
      // Pointer heading out of the top of the window, towards the tabs.
      if (e.clientY <= 0 && !busy && !hasActivated()) open("exit");
    }
    function onHide() {
      if (document.visibilityState === "hidden" && !busy && !hasActivated()) {
        open("exit");
      }
    }

    document.addEventListener("mouseout", onLeave);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      document.removeEventListener("mouseout", onLeave);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [activated, attempted, busy, open]);

  if (!mode) return null;

  const question = QUESTIONS[mode];

  function choose(id: string) {
    trackFunnel(mode === "job" ? "job_done" : "exit_reason", { choice: id });
    setAnswered(true);
    setTimeout(() => setMode(null), 1600);
  }

  return (
    <aside
      className="fixed bottom-4 left-4 right-4 z-[55] mx-auto w-auto max-w-sm rounded-2xl border border-veil/10 bg-raised p-4 shadow-2xl sm:left-auto sm:right-6 sm:w-full"
      aria-label={question.title}
    >
      <button
        onClick={() => setMode(null)}
        className="focus-ring absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full text-ink-4 transition-colors hover:bg-veil/[0.06] hover:text-ink-1"
        aria-label="Dismiss"
      >
        <X size={12} />
      </button>

      {answered ? (
        <p className="py-2 text-sm font-medium text-ink-1">
          Thank you, that genuinely helps.
        </p>
      ) : (
        <>
          <p className="pr-6 text-sm font-semibold text-ink-hi">
            {question.title}
          </p>
          <p className="mt-0.5 text-xs text-ink-3">{question.note}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {question.options.map((o) => (
              <button
                key={o.id}
                onClick={() => choose(o.id)}
                className="focus-ring rounded-lg border border-veil/[0.08] px-2.5 py-1.5 text-xs text-ink-2 transition-colors hover:border-veil/20 hover:text-ink-hi"
              >
                {o.label}
              </button>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
