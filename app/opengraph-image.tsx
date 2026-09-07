import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "ClipKoala: free video downloader for TikTok, YouTube, Instagram and more";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Free video downloader",
    title: "Save any clip. Keep it clean.",
    subtitle:
      "Download videos from 9 platforms in HD without watermarks, or grab the audio as MP3. No sign-up, no limits.",
  });
}
