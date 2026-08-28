// Gentle completion feedback: a quiet two-note chime (WebAudio, no asset
// files) and a light vibration on devices that support it. The chime can be
// turned off from the command palette; the preference sticks in localStorage.

const STORAGE_KEY = "snapload:sound";

export function isSoundEnabled(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}

export function setSoundEnabled(on: boolean): void {
  try {
    if (on) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, "off");
  } catch {
    // ignore
  }
}

let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  return ctx;
}

function note(
  context: AudioContext,
  freq: number,
  start: number,
  duration: number
) {
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  // Quiet, soft envelope  feedback, not a ringtone.
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(0.09, start + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain);
  gain.connect(context.destination);
  osc.start(start);
  osc.stop(start + duration + 0.05);
}

/** Play the soft "file's ready" chime. No-ops when muted or unavailable. */
export function playCompletionChime(): void {
  if (!isSoundEnabled()) return;
  try {
    const context = getContext();
    if (!context) return;
    if (context.state === "suspended") void context.resume();
    // Still not allowed to play (no user gesture yet)? Skip silently.
    if (context.state !== "running") return;
    const t = context.currentTime;
    note(context, 659.25, t, 0.28); // E5
    note(context, 880, t + 0.12, 0.34); // A5
  } catch {
    // Audio is never worth an error surface.
  }
}

/** Light haptic tap on devices that support it. */
export function vibrate(ms: number): void {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(ms);
    }
  } catch {
    // ignore
  }
}
