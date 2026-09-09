import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "ClipKoala: Everything that has shipped";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Changelog",
    title: "Everything that has shipped",
    subtitle:
      "New platforms, fixes, and honest notes about what broke and when it was repaired.",
  });
}
