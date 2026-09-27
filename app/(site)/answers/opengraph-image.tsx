import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "ClipKoala: Why it failed, and what to do";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Answers",
    title: "Why it failed, and what to do",
    subtitle:
      "Reddit with no sound, TikTok's Save greyed out, expired Stories, unsupported links.",
  });
}
