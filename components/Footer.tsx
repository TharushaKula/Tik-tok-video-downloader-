import Link from "next/link";
import Logo from "./brand/Logo";
import { LANDING_PAGES, LANDING_SLUGS } from "@/lib/landing";
import { GUIDES, GUIDE_SLUGS } from "@/lib/guides";
import { SITE } from "@/lib/site";

const PRODUCT = [
  { href: "/", label: "Video downloader" },
  { href: "/features", label: "Features" },
  { href: "/extension", label: "Browser extension" },
  { href: "/batch-video-downloader", label: "Batch downloads" },
  { href: "/changelog", label: "What's new" },
  { href: "/status", label: "Status" },
];

const COMPANY = [
  { href: "/about", label: "About ClipKoala" },
  { href: "/faq", label: "FAQ" },
  { href: "/glossary", label: "Glossary" },
  { href: "/terms", label: "Terms of service" },
  { href: "/privacy", label: "Privacy policy" },
  { href: "/dmca", label: "Copyright & DMCA" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-veil/[0.06] bg-base">
      <div className="mx-auto max-w-page px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Link href="/" className="focus-ring inline-flex rounded-lg" aria-label="ClipKoala home">
              <Logo />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-ink-3">
              {SITE.tagline} ClipKoala is a free online video downloader for
              nine platforms. HD, watermark-free, no sign-up.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-4">
              <li>Free forever</li>
              <li>No account</li>
              <li>Nothing stored</li>
            </ul>
          </div>

          <FooterColumn title="Downloaders">
            {LANDING_SLUGS.filter((s) => LANDING_PAGES[s].platform).map(
              (slug) => (
                <FooterLink key={slug} href={`/${slug}`}>
                  {LANDING_PAGES[slug].name}
                </FooterLink>
              )
            )}
          </FooterColumn>

          <FooterColumn title="Guides">
            {GUIDE_SLUGS.slice(0, 7).map((slug) => (
              <FooterLink key={slug} href={`/guides/${slug}`}>
                {GUIDES[slug].shortTitle}
              </FooterLink>
            ))}
            <FooterLink href="/guides">All guides</FooterLink>
          </FooterColumn>

          <FooterColumn title="Product">
            {PRODUCT.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            {COMPANY.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-veil/[0.06] pt-6 text-xs leading-relaxed text-ink-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl">
            ClipKoala is not affiliated with TikTok, YouTube, Instagram,
            Facebook, X, Reddit, Pinterest, Twitch, or SoundCloud. Download only
            content you own or have permission to save.
          </p>
          <p className="shrink-0">
            © {year} {SITE.name} · {SITE.domain}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <nav aria-label={title}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-3">
        {title}
      </p>
      <ul className="space-y-2">{children}</ul>
    </nav>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="focus-ring rounded text-sm text-ink-2 transition-colors hover:text-ink-hi"
      >
        {children}
      </Link>
    </li>
  );
}
