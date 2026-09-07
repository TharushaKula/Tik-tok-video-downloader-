import type { Metadata } from "next";

import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import FeatureGrid from "@/components/sections/FeatureGrid";
import JsonLd from "@/components/JsonLd";
import CtaBanner from "@/components/sections/CtaBanner";

import { FEATURE_GROUPS } from "@/lib/features";
import { graph, pageMetadata, webPageSchema } from "@/lib/seo";

const TITLE = "Features: Everything ClipKoala Can Do";
const DESCRIPTION =
  "Watermark-free downloads, HD up to 1080p, MP3, M4A, WAV, and FLAC audio, batch downloads, playlists, saved videos, custom filenames, a browser extension, and more. All free.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/features",
});

export default function FeaturesPage() {
  return (
    <PageShell>
      <div className="mx-auto w-full max-w-page px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <PageHeader
          crumbs={[{ name: "Features", path: "/features" }]}
          eyebrow="Features"
          title="Everything ClipKoala can do"
          lede="A complete list, grouped by what you are trying to get done. Every feature is free and works without an account."
        />
        <div className="mt-12 space-y-16">
          {FEATURE_GROUPS.map((group) => (
            <section key={group.title} aria-labelledby={`${group.title}-title`}>
              <h2 id={`${group.title}-title`} className="text-2xl font-extrabold text-ink-hi">
                {group.title}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-2">{group.lede}</p>
              <div className="mt-6">
                <FeatureGrid features={group.features} />
              </div>
            </section>
          ))}
        </div>
      </div>
      <CtaBanner />
      <JsonLd data={graph(webPageSchema({ path: "/features", name: TITLE, description: DESCRIPTION }))} />
    </PageShell>
  );
}
