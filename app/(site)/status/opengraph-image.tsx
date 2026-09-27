import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "ClipKoala: Live health for every platform";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Status",
    title: "Live health for every platform",
    subtitle:
      "Each resolver reported separately, so you can tell whether a problem is on our side.",
  });
}
