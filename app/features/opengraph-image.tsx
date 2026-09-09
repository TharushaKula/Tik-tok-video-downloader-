import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "ClipKoala: Everything ClipKoala can do";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Features",
    title: "Everything ClipKoala can do",
    subtitle:
      "Nine platforms, HD video, four audio formats, batches, ZIP bundles, and a browser extension.",
  });
}
