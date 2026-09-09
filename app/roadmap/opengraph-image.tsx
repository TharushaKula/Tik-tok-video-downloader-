import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "ClipKoala: What's next, and what isn't";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Roadmap",
    title: "What's next, and what isn't",
    subtitle:
      "Being built, queued, under consideration, and deliberately turned down. No dates.",
  });
}
