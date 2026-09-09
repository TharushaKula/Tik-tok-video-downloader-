import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "ClipKoala: Questions, answered straight";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "FAQ",
    title: "Questions, answered straight",
    subtitle:
      "Platforms, quality, watermarks, privacy, limits, and what happens when something fails.",
  });
}
