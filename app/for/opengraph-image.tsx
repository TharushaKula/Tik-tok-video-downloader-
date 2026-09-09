import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "ClipKoala: Four jobs this tool does well";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Who it's for",
    title: "Four jobs this tool does well",
    subtitle:
      "Creators, video editors, teachers, and social managers. Pick the workflow closest to yours.",
  });
}
