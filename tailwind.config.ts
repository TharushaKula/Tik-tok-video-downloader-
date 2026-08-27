import type { Config } from "tailwindcss";

// Semantic color tokens backed by CSS variables (defined in globals.css),
// so the light/dark palettes live in one place. All values are RGB triplets
// to keep Tailwind's alpha modifiers (e.g. bg-veil/[0.04]) working.
const token = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // platforms.ts carries per-platform Tailwind classes
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        base: token("base"), // page background
        raised: token("raised"), // command bar, toasts
        veil: token("veil"), // hairlines & surface tints (white on dark, ink on light)
        "ink-hi": token("ink-hi"), // headings
        "ink-1": token("ink-1"), // primary text
        "ink-2": token("ink-2"), // secondary text
        "ink-3": token("ink-3"), // muted text
        "ink-4": token("ink-4"), // faint text
        btn: token("btn"), // primary button surface
        "btn-ink": token("btn-ink"), // primary button label
        accent: token("accent"), // violet brand accent
        ok: token("ok"),
        warn: token("warn"),
        danger: token("danger"),
        "danger-ink": token("danger-ink"),
      },
    },
  },
  plugins: [],
};
export default config;
