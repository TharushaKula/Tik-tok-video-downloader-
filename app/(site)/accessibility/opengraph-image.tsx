import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "ClipKoala: What works, and what doesn't yet";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Accessibility",
    title: "What works, and what doesn't yet",
    subtitle:
      "Self-assessed against WCAG 2.1 AA, including the gaps that have not been fixed.",
  });
}
