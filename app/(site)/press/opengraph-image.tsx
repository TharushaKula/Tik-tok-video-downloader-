import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "ClipKoala: Logos, facts, and a real contact";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Press kit",
    title: "Logos, facts, and a real contact",
    subtitle:
      "Accurate product facts and brand assets for anyone writing about or listing ClipKoala.",
  });
}
