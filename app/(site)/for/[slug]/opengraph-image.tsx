import { AUDIENCES, AUDIENCE_SLUGS } from "@/lib/audiences";
import { PLATFORMS } from "@/lib/platforms";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "ClipKoala video downloader";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return AUDIENCE_SLUGS.map((slug) => ({ slug }));
}

// Platform glow colors are stored as rgba(...) strings; lift to full alpha.
const solid = (glow: string) => glow.replace(/,\s*0\.\d+\)$/, ", 1)");

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const copy = AUDIENCES[slug];
  const accent = copy?.platforms[0];
  return renderOgImage({
    eyebrow: copy ? `For ${copy.name.toLowerCase()}` : "Free video downloader",
    title: copy?.h1 ?? "Save any clip. Keep it clean.",
    subtitle: copy?.jobLine,
    accent: accent ? solid(PLATFORMS[accent].glow) : undefined,
  });
}
