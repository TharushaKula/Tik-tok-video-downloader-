// Theme preference handling, shared by the navbar toggle and the command
// palette. The resolved theme is applied before first paint by the inline
// script in layout.tsx; these helpers handle changes after load.

export type ThemePref = "system" | "light" | "dark";

export const THEME_STORAGE_KEY = "snapload:theme";

export function loadThemePref(): ThemePref {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {
    // private mode: stay on system
  }
  return "system";
}

export function resolveTheme(pref: ThemePref): "light" | "dark" {
  if (pref === "system") {
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }
  return pref;
}

export function applyThemePref(pref: ThemePref) {
  document.documentElement.dataset.theme = resolveTheme(pref);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, pref);
  } catch {
    // ignore
  }
}
