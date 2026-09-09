import { ANSWERS, ANSWER_SLUGS } from "@/lib/answers";
import { PLATFORMS } from "@/lib/platforms";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "ClipKoala video downloader";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return ANSWER_SLUGS.map((slug) => ({ slug }));
}

// Platform glow colors are stored as rgba(...) strings; lift to full alpha.
const solid = (glow: string) => glow.replace(/,\s*0\.\d+\)$/, ", 1)");

const EYEBROW = {
  problem: "Troubleshooting",
  comparison: "Comparison",
  question: "Answer",
} as const;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const copy = ANSWERS[slug];
  return renderOgImage({
    eyebrow: copy ? EYEBROW[copy.kind] : "Free video downloader",
    title: copy?.h1 ?? "Save any clip. Keep it clean.",
    subtitle: copy?.shortTitle,
    accent: copy?.platform ? solid(PLATFORMS[copy.platform].glow) : undefined,
  });
}
