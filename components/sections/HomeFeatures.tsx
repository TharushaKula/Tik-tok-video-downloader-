import Link from "next/link";
import { HOME_FEATURES } from "@/lib/features";
import FeatureGrid from "./FeatureGrid";
import { getMessages, localizeHref, type Locale } from "@/lib/i18n";

export default function HomeFeatures({ locale = "en" }: { locale?: Locale }) {
  const { features } = getMessages(locale).site;
  // Icons and links come from the English catalogue; copy from the
  // dictionary, item for item.
  const items = HOME_FEATURES.map((f, i) => ({
    ...f,
    ...features.items[i],
    href: f.href ? localizeHref(locale, f.href) : undefined,
  }));
  return (
    <section
      id="features"
      className="mx-auto w-full max-w-page scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20"
      aria-labelledby="features-title"
    >
      <div className="reveal mb-10 text-center">
        <p className="eyebrow mb-2">{features.eyebrow}</p>
        <h2 id="features-title" className="text-2xl font-extrabold text-ink-hi sm:text-3xl">
          {features.title}
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-ink-2">
          {features.body}
        </p>
      </div>
      <FeatureGrid features={items} />
      {/* The full feature list is an English-only page */}
      {locale === "en" && (
        <p className="mt-8 text-center">
          <Link href="/features" className="btn-secondary btn-sm">
            {features.seeAll}
          </Link>
        </p>
      )}
    </section>
  );
}
