import type { Metadata } from "next";

import PageShell from "@/components/PageShell";
import Hero from "@/components/sections/Hero";
import DownloaderTool from "@/components/DownloaderTool";
import HomeFeatures from "@/components/sections/HomeFeatures";
import HowItWorks from "@/components/HowItWorks";
import PlatformsSection from "@/components/PlatformsSection";
import TrustSection from "@/components/sections/TrustSection";
import GuidesTeaser from "@/components/sections/GuidesTeaser";
import FaqSection from "@/components/FaqSection";
import CtaBanner from "@/components/sections/CtaBanner";
import JsonLd from "@/components/JsonLd";

import { HOME_FAQS } from "@/lib/faq";
import { SITE, SITE_URL } from "@/lib/site";
import { faqSchema, graph, webPageSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE.name}: Free Video Downloader for TikTok, YouTube, Instagram & More`,
  },
  description: SITE.description,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `${SITE.name}: Free Video Downloader for TikTok, YouTube, Instagram & More`,
    description: SITE.description,
    url: SITE_URL,
    siteName: SITE.name,
    type: "website",
    locale: SITE.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name}: Free Video Downloader`,
    description: SITE.shortDescription,
  },
};

export default function HomePage() {
  return (
    <PageShell tool>
      <Hero>
        <DownloaderTool />
      </Hero>
      <HomeFeatures />
      <HowItWorks />
      <PlatformsSection />
      <TrustSection />
      <GuidesTeaser />
      <FaqSection faqs={HOME_FAQS} moreLink />
      <CtaBanner
        title="Save your first clip in the next ten seconds"
        body="Scroll up, paste a link, and pick a quality. No account, no limits, no watermark."
        href="#top"
        label="Back to the downloader"
      />
      <JsonLd
        data={graph(
          webPageSchema({
            path: "/",
            name: `${SITE.name}: Free Video Downloader`,
            description: SITE.description,
          }),
          faqSchema(HOME_FAQS)
        )}
      />
    </PageShell>
  );
}
