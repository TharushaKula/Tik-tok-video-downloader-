import Link from "next/link";
import { HOME_FEATURES } from "@/lib/features";
import FeatureGrid from "./FeatureGrid";

export default function HomeFeatures() {
  return (
    <section
      id="features"
      className="mx-auto w-full max-w-page scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20"
      aria-labelledby="features-title"
    >
      <div className="reveal mb-10 text-center">
        <p className="eyebrow mb-2">Why ClipKoala</p>
        <h2 id="features-title" className="text-2xl font-extrabold text-ink-hi sm:text-3xl">
          Everything a video downloader should do, nothing it should not
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ink-2">
          Clean files, real quality choices, and a tool that respects your
          time and your privacy.
        </p>
      </div>
      <FeatureGrid features={HOME_FEATURES} />
      <p className="mt-8 text-center">
        <Link href="/features" className="btn-secondary btn-sm">
          See all features
        </Link>
      </p>
    </section>
  );
}
