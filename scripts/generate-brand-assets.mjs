// Builds every derived brand asset from the source artwork in brand-src/:
//
//   node scripts/generate-brand-assets.mjs
//
//  - public/brand/*      resized mascot + lockups (WebP with alpha) + small PNGs
//  - public/icons/*      PWA icons: mascot on a soft lavender tile
//  - app/apple-icon.png  iOS home-screen icon
//  - app/favicon.ico     small-size glyph (clapperboard + play) for tabs
//  - app/icon.svg        crisp SVG favicon of the same glyph
//  - extension/icons/*   16/32 use the glyph, 48/128 use the mascot tile
//
// Uses sharp, already installed as a Next.js dependency.
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = (f) => join(root, "brand-src", f);
const out = (f) => {
  const p = join(root, f);
  mkdirSync(dirname(p), { recursive: true });
  return p;
};

// Small-size glyph: the clapperboard with the gradient play button, drawn
// flat so it stays legible at 16px where the mascot would turn to mush.
export const GLYPH_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#C56BFF"/>
      <stop offset="1" stop-color="#3B3BF5"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="16" fill="#18192A"/>
  <path d="M8 14h48v12H8z" fill="#F4F2FA"/>
  <path d="M14 14l8 12h-10l-8-12zM32 14l8 12H30l-8-12zM50 14l6 9v3h-4l-8-12z" fill="#18192A"/>
  <path d="M25 33.5c0-2.3 2.5-3.7 4.5-2.5l16 9.5c1.9 1.2 1.9 3.9 0 5.1l-16 9.5c-2 1.2-4.5-.2-4.5-2.5z" fill="url(#g)"/>
</svg>`;

const svgPng = (svg, size) =>
  sharp(Buffer.from(svg), { density: 384 }).resize(size, size).png().toBuffer();

// Mascot centered on a rounded lavender tile (app-icon style)
async function mascotTile(size, { pad = 0.08, radius = 0.22, square = false } = {}) {
  const inner = Math.round(size * (1 - pad * 2));
  const mascot = await sharp(src("mascot.png"))
    .trim({ threshold: 5 })
    .resize(inner, inner, { fit: "inside" })
    .png()
    .toBuffer();
  const m = await sharp(mascot).metadata();
  const r = square ? 0 : Math.round(size * radius);
  const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <defs><linearGradient id="b" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#F6F3FF"/><stop offset="1" stop-color="#E6E0FF"/>
    </linearGradient></defs>
    <rect width="${size}" height="${size}" rx="${r}" fill="url(#b)"/>
  </svg>`;
  return sharp(Buffer.from(bg))
    .composite([
      {
        input: mascot,
        left: Math.round((size - m.width) / 2),
        top: Math.round((size - m.height) / 2 + size * 0.02),
      },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

// ICO container with one embedded PNG (every modern browser reads it)
function ico(pngBuf, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0);
  entry.writeUInt8(size >= 256 ? 0 : size, 1);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngBuf.length, 8);
  entry.writeUInt32LE(22, 12);
  return Buffer.concat([header, entry, pngBuf]);
}

// ── Brand artwork for the site ─────────────────────────────────────────
const artwork = [
  ["mascot.png", "public/brand/mascot", 960],
  ["lockup-horizontal.png", "public/brand/lockup-horizontal", 1400],
  ["lockup-vertical.png", "public/brand/lockup-vertical", 960],
];
for (const [file, dest, width] of artwork) {
  // WebP only: next/image serves AVIF/WebP anyway and the PNGs would add
  // ~3 MB to the repo for nothing.
  const base = sharp(src(file)).trim({ threshold: 5 }).resize({ width, withoutEnlargement: true });
  writeFileSync(out(`${dest}.webp`), await base.clone().webp({ quality: 88, alphaQuality: 90 }).toBuffer());
  console.log(dest, width);
}
// Smaller mascot for the header/footer and the OG renderer
writeFileSync(out("public/brand/mascot-256.png"), await sharp(src("mascot.png")).trim({ threshold: 5 }).resize(256, 256, { fit: "inside" }).png().toBuffer());
writeFileSync(out("public/brand/mascot-og.png"), await sharp(src("mascot.png")).trim({ threshold: 5 }).resize(560, 560, { fit: "inside" }).png().toBuffer());

// ── Icons ──────────────────────────────────────────────────────────────
writeFileSync(out("public/icons/icon-192.png"), await mascotTile(192));
writeFileSync(out("public/icons/icon-512.png"), await mascotTile(512));
writeFileSync(out("public/icons/icon-maskable-512.png"), await mascotTile(512, { pad: 0.16, square: true }));
writeFileSync(out("public/icons/apple-touch-icon.png"), await mascotTile(180, { square: true }));
writeFileSync(out("app/apple-icon.png"), await mascotTile(180, { square: true }));
writeFileSync(out("app/favicon.ico"), ico(await svgPng(GLYPH_SVG, 48), 48));
writeFileSync(out("app/icon.svg"), GLYPH_SVG.trim() + "\n");
writeFileSync(out("public/brand/glyph.svg"), GLYPH_SVG.trim() + "\n");
writeFileSync(out("extension/icons/icon-16.png"), await svgPng(GLYPH_SVG, 16));
writeFileSync(out("extension/icons/icon-32.png"), await svgPng(GLYPH_SVG, 32));
writeFileSync(out("extension/icons/icon-48.png"), await mascotTile(48, { pad: 0.04 }));
writeFileSync(out("extension/icons/icon-128.png"), await mascotTile(128, { pad: 0.06 }));
console.log("icons, favicon, glyph, extension icons");
