"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import {
  type ThemePref,
  applyThemePref,
  loadThemePref,
  resolveTheme,
} from "@/lib/theme";

const ORDER: ThemePref[] = ["system", "light", "dark"];

// Fired whenever the theme changes anywhere (toggle or command palette), so
// every listener stays in sync.
export const THEME_EVENT = "snapload:theme-change";

export function setThemePref(pref: ThemePref) {
  applyThemePref(pref);
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: pref }));
}

// Cycles system -> light -> dark. The resolved theme is applied before paint
// by the inline script in layout.tsx; this component only handles changes.
export default function ThemeToggle() {
  const [pref, setPref] = useState<ThemePref>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setPref(loadThemePref());
    const onChange = (e: Event) => setPref((e as CustomEvent<ThemePref>).detail);
    window.addEventListener(THEME_EVENT, onChange);
    return () => window.removeEventListener(THEME_EVENT, onChange);
  }, []);

  // Follow OS changes live while in system mode
  useEffect(() => {
    if (pref !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => resolveTheme("system") && applyThemePref("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [pref]);

  function cycle() {
    setThemePref(ORDER[(ORDER.indexOf(pref) + 1) % ORDER.length]);
  }

  const Icon =
    !mounted || pref === "system" ? Monitor : pref === "light" ? Sun : Moon;
  const label = !mounted ? "Theme" : `Theme: ${pref}, click to change`;

  return (
    <button
      onClick={cycle}
      className="focus-ring flex h-8 w-8 items-center justify-center rounded-lg border border-veil/[0.08] text-ink-2 transition-colors hover:border-veil/20 hover:text-ink-1"
      aria-label={label}
      title={label}
    >
      <Icon size={14} />
    </button>
  );
}
