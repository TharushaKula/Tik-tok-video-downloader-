import { GUIDES, GUIDE_SLUGS } from "@/lib/guides";
import { PLATFORMS } from "@/lib/platforms";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "ClipKoala how-to guide";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

const solid = (glow: string) => glow.replace(/,\s*0\.\d+\)$/, ", 1)");

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = GUIDES[slug];
  return renderOgImage({
    eyebrow: guide?.platform ? `${PLATFORMS[guide.platform].name} guide` : "Guide",
    title: guide?.h1 ?? "How-to guides",
    subtitle: guide?.metaDescription,
    accent: guide?.platform ? solid(PLATFORMS[guide.platform].glow) : undefined,
  });
}
