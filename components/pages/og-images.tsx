import { PLATFORMS } from "@/lib/platforms";
import { renderOgImage } from "@/lib/og";
import { fmt, getLandingCopy, getMessages, type Locale } from "@/lib/i18n";

// Social cards for the pages that exist in every language, so a Spanish
// share shows a Spanish card. The opengraph-image files under app/ call these.

// Platform glow colors are stored as rgba(...) strings; lift to full alpha.
const solid = (glow: string) => glow.replace(/,\s*0\.\d+\)$/, ", 1)");

export function homeOgImage(locale: Locale) {
  const { site } = getMessages(locale);
  return renderOgImage({
    eyebrow: site.meta.ogEyebrow,
    title: site.meta.tagline,
    subtitle: site.meta.ogSubtitle,
  });
}

export function landingOgImage(locale: Locale, slug: string) {
  const { site } = getMessages(locale);
  const copy = getLandingCopy(locale, slug);
  return renderOgImage({
    eyebrow: copy?.platform
      ? fmt(site.landing.ogEyebrowPlatform, {
          platform: PLATFORMS[copy.platform].name,
        })
      : site.landing.ogEyebrowGeneric,
    title: copy?.h1 ?? site.meta.tagline,
    subtitle: copy?.sub,
    accent: copy?.platform ? solid(PLATFORMS[copy.platform].glow) : undefined,
  });
}
