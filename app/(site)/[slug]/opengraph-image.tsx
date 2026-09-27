import { LANDING_PAGES, LANDING_SLUGS } from "@/lib/landing";
import { PLATFORMS } from "@/lib/platforms";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "ClipKoala video downloader";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return LANDING_SLUGS.map((slug) => ({ slug }));
}

// Platform glow colors are stored as rgba(...) strings; lift to full alpha.
const solid = (glow: string) => glow.replace(/,\s*0\.\d+\)$/, ", 1)");

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const copy = LANDING_PAGES[slug];
  return renderOgImage({
    eyebrow: copy?.platform
      ? `${PLATFORMS[copy.platform].name} downloader`
      : "Free video downloader",
    title: copy?.h1 ?? "Save any clip. Keep it clean.",
    subtitle: copy?.sub,
    accent: copy?.platform ? solid(PLATFORMS[copy.platform].glow) : undefined,
  });
}
