# ClipKoala brand guidelines

ClipKoala is the calm way to save a video. The mascot is a koala hugging a
clapperboard with a glowing play button: unbothered, friendly, a little
cheeky (the wink). Everything on the site should feel the same: quiet
confidence, no urgency, no tricks.

## Name

- Always one word, capital C and capital K: **ClipKoala**.
- Domain: clipkoala.com. Never "Clip Koala" or "clipkoala" in prose.
- In the wordmark, "Clip" is ink and "Koala" carries the brand gradient.

## Mascot and lockups

Source files live in `brand-src/` (transparent PNGs supplied by the brand):

| File | Use |
| --- | --- |
| `mascot.png` | Hero, trust section, 404, icons, social cards |
| `lockup-horizontal.png` | Wide placements on light backgrounds (press, decks) |
| `lockup-vertical.png` | Square placements on light backgrounds (about page, app store) |

`npm run brand:assets` derives everything else: `public/brand/*` (resized
PNG + WebP), PWA icons (mascot on a lavender tile), the small-size favicon
glyph (clapperboard + play, `app/icon.svg`), and the extension icons.

Rules: never stretch, recolor, or add effects to the mascot. Give it room;
the soft violet glow behind it is the only allowed backdrop treatment. On
dark backgrounds use the mascot plus the CSS wordmark, not the raster
lockups (their "Clip" is near-black).

## Color

Tokens are CSS variables in `app/globals.css`, consumed through Tailwind
(`bg-base`, `text-ink-2`, `text-accent`, ...). Dark is the default theme.

| Token | Dark | Light | Role |
| --- | --- | --- | --- |
| brand gradient | `#8b5cf6 -> #3b3bf5` | `#7c3aed -> #2f2fe0` | primary buttons, wordmark "Koala", step badges |
| accent | `#a78bfa` | `#6d28d9` | links, eyebrows, icons, focus rings |
| accent-2 | `#f48fb1` | `#be185d` | warm secondary glow (koala ear pink), used sparingly |
| base | `#0b0b14` | `#f8f7fc` | page background (clapperboard navy / koala-fur lavender) |
| raised | `#131320` | `#ffffff` | cards, inputs |
| ink-hi | `#fafafc` | `#18192a` | headings |
| ink-1 / 2 / 3 / 4 | greys with a blue cast | | body, secondary, muted, faint |
| ok / warn / danger | green / amber / red | | status only |

Platform identity colors (`--p-*`) are used only to tag a platform, never as
brand color.

Contrast: every text token meets WCAG AA on its background in both themes;
white on the brand gradient's darkest stop is 5.7:1.

## Typography

- **Display:** Nunito 700/800/900 for headings and the wordmark. Rounded,
  friendly, matches the wordmark letterforms. Loaded via `next/font`.
- **Body/UI:** Inter 400/500/600. Dense UI text, form controls, tables.
- Headings use tight tracking (-0.02em) and `text-balance`.
- Sentence case everywhere. No ALL CAPS except the small eyebrow labels.

## Components

Defined once in `app/globals.css` and reused everywhere:
`.btn-primary` (gradient), `.btn-secondary` (outlined), `.btn-ghost`,
sizes `.btn-sm/.btn-md/.btn-lg`; `.card` and `.card-hover`; `.chip`;
`.eyebrow`; `.text-brand` and `.bg-brand` for gradient text/fills;
`.prose-ck` for long-form copy. Motion is CSS only (`.rise`, `.reveal`)
and disabled under `prefers-reduced-motion`.

## Voice

Friendly, calm, specific. Short sentences. Say what happens, not how
amazing it is. Admit limits plainly ("VODs are not supported yet").

- Yes: "Paste a link, pick a quality, done."
- Yes: "Only public posts can be fetched. That is by design."
- No: "Blazing fast!!!", "the #1 downloader", countdowns, fake scarcity.
- No em-dashes (the repo tooling strips them); use commas, colons, or a
  new sentence.

Tagline: **Save any clip. Keep it clean.** The supplied artwork's line
"Capture · Edit · Share · Effortlessly" can be used on marketing material
but not as a product promise (ClipKoala does not edit).
