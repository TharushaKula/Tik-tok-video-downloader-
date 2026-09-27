import Link from "next/link";
import Logo from "./brand/Logo";
import ThemeToggle from "./ThemeToggle";
import FilenameSettings from "./FilenameSettings";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import { LANDING_SLUGS } from "@/lib/landing";
import {
  getMessages,
  landingNames,
  localePath,
  type Locale,
} from "@/lib/i18n";

interface NavbarProps {
  /** Show the filename-template settings (only useful next to the tool) */
  tool?: boolean;
  locale?: Locale;
}

/** Primary links. Translated pages only link to what exists in their language. */
function navLinks(locale: Locale) {
  const { nav } = getMessages(locale).site;
  if (locale === "en") {
    return [
      { href: "/#platforms", label: nav.downloaders },
      { href: "/for", label: nav.useCases },
      { href: "/guides", label: nav.guides },
      { href: "/answers", label: nav.answers },
      { href: "/faq", label: nav.faq },
    ];
  }
  const home = localePath(locale, "/");
  return [
    { href: `${home}#platforms`, label: nav.downloaders },
    { href: `${home}#how-it-works`, label: nav.howItWorks },
    { href: `${home}#faq`, label: nav.faq },
  ];
}

// Server component: no JS shipped for the links themselves. The theme
// toggle, language switcher, filename settings, and the mobile menu are
// small client islands.
export default function Navbar({ tool = false, locale = "en" }: NavbarProps) {
  const { nav } = getMessages(locale).site;
  const links = navLinks(locale);
  const names = landingNames(locale);
  const home = localePath(locale, "/");

  return (
    <header className="sticky top-0 z-50 border-b border-veil/[0.06] bg-base/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href={home}
          className="focus-ring shrink-0 rounded-lg"
          aria-label={nav.homeAria}
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label={nav.primaryAria}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="focus-ring rounded-lg px-3 py-2 text-sm font-medium text-ink-2 transition-colors hover:bg-veil/[0.05] hover:text-ink-hi"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {tool ? <FilenameSettings /> : null}
          <LanguageSwitcher />
          <ThemeToggle />
          {!tool ? (
            <Link href={home} className="btn-primary btn-sm hidden sm:inline-flex">
              {nav.downloadVideo}
            </Link>
          ) : null}
          <MobileMenu
            links={links}
            downloaders={LANDING_SLUGS.map((slug) => ({
              href: localePath(locale, `/${slug}`),
              label: names[slug] ?? slug,
            }))}
            secondary={
              locale === "en"
                ? [
                    { href: "/about", label: nav.about },
                    { href: "/extension", label: nav.extension },
                    { href: "/changelog", label: nav.changelog },
                    { href: "/status", label: nav.status },
                    { href: "/glossary", label: nav.glossary },
                    { href: "/privacy", label: nav.privacy },
                  ]
                : []
            }
          />
        </div>
      </div>
    </header>
  );
}
