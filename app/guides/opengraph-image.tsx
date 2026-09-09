import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "ClipKoala: Step-by-step, with real screenshots";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Guides",
    title: "Step-by-step, with real screenshots",
    subtitle:
      "Fifteen walkthroughs covering every supported platform, from copying the link to the saved file.",
  });
}
