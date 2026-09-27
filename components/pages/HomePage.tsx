import type { Metadata } from "next";

import PageShell from "@/components/PageShell";
import Hero from "@/components/sections/Hero";
import DownloaderTool from "@/components/DownloaderTool";
import HomeFeatures from "@/components/sections/HomeFeatures";
import HowItWorks from "@/components/HowItWorks";
import PlatformsSection from "@/components/PlatformsSection";
import TrustSection from "@/components/sections/TrustSection";
import GuidesTeaser from "@/components/sections/GuidesTeaser";
import AudiencesTeaser from "@/components/sections/AudiencesTeaser";
import FaqSection from "@/components/FaqSection";
import CtaBanner from "@/components/sections/CtaBanner";
import JsonLd from "@/components/JsonLd";

import { SITE, SITE_URL, absoluteUrl } from "@/lib/site";
import { faqSchema, graph, webPageSchema } from "@/lib/seo";
import {
  LOCALE_META,
  getMessages,
  languageAlternates,
  localePath,
  type Locale,
} from "@/lib/i18n";

// The home page in any language. app/(site)/page.tsx renders it in English,
// app/<lang>/page.tsx in every other language.

export function homeMetadata(locale: Locale): Metadata {
  const { site } = getMessages(locale);
  const url = locale === "en" ? SITE_URL : absoluteUrl(localePath(locale, "/"));
  return {
    title: { absolute: site.meta.homeTitle },
    description: site.meta.description,
    alternates: { canonical: url, languages: languageAlternates("/") },
    openGraph: {
      title: site.meta.homeTitle,
      description: site.meta.description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: LOCALE_META[locale].ogLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: site.meta.homeShortTitle,
      description: site.meta.shortDescription,
    },
  };
}

export default function HomePage({ locale }: { locale: Locale }) {
  const { site } = getMessages(locale);
  // The use-case and guide clusters are English-only, so translated home
  // pages leave those teasers out rather than send visitors to them.
  const english = locale === "en";

  return (
    <PageShell tool locale={locale}>
      <Hero locale={locale}>
        <DownloaderTool />
      </Hero>
      <HomeFeatures locale={locale} />
      <HowItWorks locale={locale} />
      <PlatformsSection locale={locale} />
      <TrustSection locale={locale} />
      {english && <AudiencesTeaser />}
      {english && <GuidesTeaser />}
      <FaqSection locale={locale} faqs={site.faq.home} moreLink={english} />
      <CtaBanner
        locale={locale}
        title={site.cta.homeTitle}
        body={site.cta.homeBody}
        href="#top"
        label={site.cta.homeLabel}
      />
      <JsonLd
        data={graph(
          webPageSchema({
            path: localePath(locale, "/"),
            name: site.meta.homeShortTitle,
            description: site.meta.description,
            locale,
          }),
          faqSchema(site.faq.home)
        )}
      />
    </PageShell>
  );
}
