import Link from "next/link";
import Logo from "./brand/Logo";
import { LANDING_PAGES, LANDING_SLUGS } from "@/lib/landing";
import { GUIDES, GUIDE_SLUGS } from "@/lib/guides";
import { ANSWERS, ANSWER_SLUGS } from "@/lib/answers";
import { AUDIENCES, AUDIENCE_SLUGS } from "@/lib/audiences";
import { SITE } from "@/lib/site";
import {
  LOCALES,
  LOCALE_META,
  getMessages,
  landingNames,
  localePath,
  type Locale,
  type SiteMessages,
} from "@/lib/i18n";

function productLinks(f: SiteMessages["footer"]) {
  return [
    { href: "/", label: f.videoDownloader },
    { href: "/features", label: f.features },
    { href: "/extension", label: f.extension },
    { href: "/batch-video-downloader", label: f.batch },
    { href: "/changelog", label: f.changelog },
    { href: "/roadmap", label: f.roadmap },
    { href: "/status", label: f.status },
    { href: "/feed.xml", label: f.rss },
  ];
}

function companyLinks(f: SiteMessages["footer"]) {
  return [
    { href: "/about", label: f.about },
    { href: "/faq", label: f.faq },
    { href: "/glossary", label: f.glossary },
    { href: "/press", label: f.press },
    { href: "/accessibility", label: f.accessibility },
    { href: "/terms", label: f.terms },
    { href: "/privacy", label: f.privacy },
    { href: "/dmca", label: f.dmca },
    { href: "/security", label: f.security },
  ];
}

// Translated pages keep the footer to what exists in their language, plus
// the legal and trust pages (English only, and marked as such), so nobody
// lands on an English page without being told first.
function translatedCompanyLinks(f: SiteMessages["footer"]) {
  return [
    { href: "/about", label: f.about },
    { href: "/status", label: f.status },
    { href: "/terms", label: f.terms },
    { href: "/privacy", label: f.privacy },
    { href: "/dmca", label: f.dmca },
  ];
}

export default function Footer({ locale = "en" }: { locale?: Locale }) {
  const year = new Date().getFullYear();
  const { site, client } = getMessages(locale);
  const { footer: f, meta } = site;
  const names = landingNames(locale);
  const english = locale === "en";

  return (
    <footer className="relative z-10 border-t border-veil/[0.06] bg-base">
      <div className="mx-auto max-w-page px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Link
              href={localePath(locale, "/")}
              className="focus-ring inline-flex rounded-lg"
              aria-label={site.nav.homeAria}
            >
              <Logo />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-ink-3">
              {meta.tagline} {f.blurb}
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-4">
              <li>{client.common.freeForever}</li>
              <li>{client.common.noSignUp}</li>
              <li>{client.common.nothingStored}</li>
            </ul>
          </div>

          <FooterColumn title={f.downloaders}>
            {LANDING_SLUGS.filter((s) => LANDING_PAGES[s].platform).map(
              (slug) => (
                <FooterLink key={slug} href={localePath(locale, `/${slug}`)}>
                  {names[slug]}
                </FooterLink>
              )
            )}
          </FooterColumn>

          {english ? (
            <EnglishColumns f={f} />
          ) : (
            <>
              <FooterColumn title={f.product}>
                <FooterLink href={localePath(locale, "/")}>
                  {f.videoDownloader}
                </FooterLink>
                <FooterLink href={localePath(locale, "/batch-video-downloader")}>
                  {f.batch}
                </FooterLink>
                <FooterLink href={localePath(locale, "/youtube-to-mp3")}>
                  {names["youtube-to-mp3"]}
                </FooterLink>
              </FooterColumn>
              <FooterColumn title={f.company} note={f.inEnglish}>
                {translatedCompanyLinks(f).map((l) => (
                  <FooterLink key={l.href} href={l.href} hrefLang="en">
                    {l.label}
                  </FooterLink>
                ))}
              </FooterColumn>
            </>
          )}

          <FooterColumn title={f.languages}>
            {LOCALES.map((l) => (
              <FooterLink
                key={l}
                href={localePath(l, "/")}
                hrefLang={LOCALE_META[l].hreflang}
                lang={LOCALE_META[l].htmlLang}
              >
                {LOCALE_META[l].label}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-veil/[0.06] pt-6 text-xs leading-relaxed text-ink-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl">{f.disclaimer}</p>
          <p className="shrink-0">
            © {year} {SITE.name} · {SITE.domain}
          </p>
        </div>
      </div>
    </footer>
  );
}

/** The content-cluster columns, which exist in English only. */
function EnglishColumns({ f }: { f: SiteMessages["footer"] }) {
  return (
    <>
      <FooterColumn title={f.guides}>
        {GUIDE_SLUGS.slice(0, 7).map((slug) => (
          <FooterLink key={slug} href={`/guides/${slug}`}>
            {GUIDES[slug].shortTitle}
          </FooterLink>
        ))}
        <FooterLink href="/guides">{f.allGuides}</FooterLink>
      </FooterColumn>

      <FooterColumn title={f.answers}>
        {ANSWER_SLUGS.slice(0, 5).map((slug) => (
          <FooterLink key={slug} href={`/answers/${slug}`}>
            {ANSWERS[slug].shortTitle}
          </FooterLink>
        ))}
        <FooterLink href="/answers">{f.allAnswers}</FooterLink>
      </FooterColumn>

      <FooterColumn title={f.audiences}>
        {AUDIENCE_SLUGS.map((slug) => (
          <FooterLink key={slug} href={`/for/${slug}`}>
            {AUDIENCES[slug].name}
          </FooterLink>
        ))}
        <FooterLink href="/for">{f.allUseCases}</FooterLink>
      </FooterColumn>

      <FooterColumn title={f.product}>
        {productLinks(f).map((l) => (
          <FooterLink key={l.href} href={l.href}>
            {l.label}
          </FooterLink>
        ))}
      </FooterColumn>

      <FooterColumn title={f.company}>
        {companyLinks(f).map((l) => (
          <FooterLink key={l.href} href={l.href}>
            {l.label}
          </FooterLink>
        ))}
      </FooterColumn>
    </>
  );
}

function FooterColumn({
  title,
  note,
  children,
}: {
  title: string;
  /** Small qualifier under the heading, e.g. that the links are English */
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <nav aria-label={title}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">
        {title}
        {note && (
          <span className="mt-0.5 block text-[10px] font-medium normal-case tracking-normal text-ink-4">
            {note}
          </span>
        )}
      </p>
      <ul className="space-y-2">{children}</ul>
    </nav>
  );
}

function FooterLink({
  href,
  hrefLang,
  lang,
  children,
}: {
  href: string;
  hrefLang?: string;
  lang?: string;
  children: React.ReactNode;
}) {
  return (
    <li lang={lang}>
      <Link
        href={href}
        hrefLang={hrefLang}
        className="focus-ring rounded text-sm text-ink-2 transition-colors hover:text-ink-hi"
      >
        {children}
      </Link>
    </li>
  );
}
