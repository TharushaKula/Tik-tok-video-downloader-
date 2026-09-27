import { OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { getMessages } from "@/lib/i18n";
import { landingOgImage } from "@/components/pages/og-images";
import { landingStaticParams } from "@/components/pages/LandingPage";

export const alt = getMessages("fr").site.landing.ogAlt;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return landingStaticParams();
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return landingOgImage("fr", slug);
}
