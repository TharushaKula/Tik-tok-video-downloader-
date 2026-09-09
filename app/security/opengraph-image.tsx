import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "ClipKoala: Responsible disclosure";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Security",
    title: "Responsible disclosure",
    subtitle:
      "How to report a security problem, what is in scope, and what to expect back.",
  });
}
