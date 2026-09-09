import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "ClipKoala: Privacy policy";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Legal",
    title: "Privacy policy",
    subtitle:
      "Links resolved and discarded, nothing stored on our server, history kept in your own browser.",
  });
}
