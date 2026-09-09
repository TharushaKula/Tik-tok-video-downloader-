import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "ClipKoala: Send the tab you're watching";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Extension",
    title: "Send the tab you're watching",
    subtitle:
      "One click from Chrome or Edge. No tracking, no browsing access, it acts only when you click.",
  });
}
