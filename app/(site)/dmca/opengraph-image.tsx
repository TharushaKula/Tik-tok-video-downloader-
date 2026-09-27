import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "ClipKoala: Copyright and DMCA policy";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Legal",
    title: "Copyright and DMCA policy",
    subtitle:
      "ClipKoala hosts nothing. How the tool works, and how to submit a takedown request.",
  });
}
