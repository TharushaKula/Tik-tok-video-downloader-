import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "ClipKoala: Bitrate, muxing, codecs, FLAC";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Glossary",
    title: "Bitrate, muxing, codecs, FLAC",
    subtitle:
      "Plain definitions for the words that appear when you download video and audio.",
  });
}
