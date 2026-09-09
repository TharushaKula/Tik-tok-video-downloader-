import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "ClipKoala: Free, private, and honest about it";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "About",
    title: "Free, private, and honest about it",
    subtitle:
      "No accounts, no stored files, no paid tier. What ClipKoala is, and the principles behind it.",
  });
}
