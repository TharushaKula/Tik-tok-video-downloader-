"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

export type ThemePref = "system" | "light" | "dark";

const STORAGE_KEY = "snapload:theme";
const ORDER: ThemePref[] = ["system", "light", "dark"];

function resolve(pref: ThemePref): "light" | "dark" {
  if (pref === "system") {
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }
  return pref;
}

function apply(pref: ThemePref) {
  document.documentElement.dataset.theme = resolve(pref);
}

// Cycles system → light → dark. The resolved theme is applied before paint
// by the inline script in layout.tsx; this component only handles changes.
export default function ThemeToggle() {
  const [pref, setPref] = useState<ThemePref>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark" || stored === "system") {
        setPref(stored);
      }
    } catch {
      // private mode  stay on system
    }
  }, []);

  // Follow OS changes live while in system mode
  useEffect(() => {
    if (pref !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => apply("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [pref]);

  function cycle() {
    const next = ORDER[(ORDER.indexOf(pref) + 1) % ORDER.length];
    setPref(next);
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }

  const Icon = !mounted || pref === "system" ? Monitor : pref === "light" ? Sun : Moon;
  const label = !mounted
    ? "Theme"
    : `Theme: ${pref}  click to change`;

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
