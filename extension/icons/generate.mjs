// Generates the extension icons (rounded gradient square + download glyph)
// as PNGs with no dependencies. Run: node extension/icons/generate.mjs
import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

// ── tiny PNG encoder (RGBA, 8-bit) ──────────────────────────────────────────
function crc32(buf) {
  let c,
    table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (const b of buf) crc = table[(crc ^ b) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}
function png(width, height, rgba) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (width * 4 + 1)] = 0; // filter none
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// ── icon painter ─────────────────────────────────────────────────────────────
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smooth = (d) => clamp01(0.5 - d); // ~1px anti-alias edge

function distSeg(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1,
    dy = y2 - y1;
  const t = clamp01(((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy || 1));
  const cx = x1 + t * dx,
    cy = y1 + t * dy;
  return Math.hypot(px - cx, py - cy);
}

function paint(size) {
  const SS = 4; // supersampling
  const S = size * SS;
  const r = S * 0.22;
  const stroke = Math.max(1.5 * SS, S * 0.09) / 2;
  const cx = S / 2;
  const top = S * 0.24,
    bottom = S * 0.56,
    wing = S * 0.16;
  const ty = S * 0.72,
    tx = S * 0.26;
  const segs = [
    [cx, top, cx, bottom], // shaft
    [cx - wing, bottom - wing, cx, bottom], // arrow left
    [cx + wing, bottom - wing, cx, bottom], // arrow right
    [tx, ty, S - tx, ty], // tray
  ];
  // colors
  const c1 = [0x8b, 0x5c, 0xf6],
    c2 = [0xd9, 0x46, 0xef];

  const out = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let rAcc = 0,
        gAcc = 0,
        bAcc = 0,
        aAcc = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const px = x * SS + sx + 0.5,
            py = y * SS + sy + 0.5;
          // rounded-rect coverage (signed distance)
          const qx = Math.abs(px - S / 2) - (S / 2 - r);
          const qy = Math.abs(py - S / 2) - (S / 2 - r);
          const dOut =
            Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) +
            Math.min(Math.max(qx, qy), 0) -
            r;
          const cov = smooth(dOut / SS + 0.5);
          if (cov <= 0) continue;
          // diagonal gradient
          const t = clamp01((px + py) / (2 * S));
          let cr = c1[0] + (c2[0] - c1[0]) * t;
          let cg = c1[1] + (c2[1] - c1[1]) * t;
          let cb = c1[2] + (c2[2] - c1[2]) * t;
          // glyph: white strokes with round caps
          let g = 0;
          for (const [x1, y1, x2, y2] of segs) {
            g = Math.max(g, smooth((distSeg(px, py, x1, y1, x2, y2) - stroke) / SS + 0.5));
          }
          cr = cr + (255 - cr) * g;
          cg = cg + (255 - cg) * g;
          cb = cb + (255 - cb) * g;
          rAcc += cr * cov;
          gAcc += cg * cov;
          bAcc += cb * cov;
          aAcc += 255 * cov;
        }
      }
      const n = SS * SS;
      const i = (y * size + x) * 4;
      const a = aAcc / n;
      // un-premultiply for straight-alpha PNG
      out[i] = a > 0 ? Math.round((rAcc / n) * (255 / a)) : 0;
      out[i + 1] = a > 0 ? Math.round((gAcc / n) * (255 / a)) : 0;
      out[i + 2] = a > 0 ? Math.round((bAcc / n) * (255 / a)) : 0;
      out[i + 3] = Math.round(a);
    }
  }
  return png(size, size, out);
}

for (const size of [16, 32, 48, 128]) {
  writeFileSync(join(here, `icon-${size}.png`), paint(size));
  console.log(`icon-${size}.png`);
}
