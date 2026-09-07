import Link from "next/link";
import Logo from "./brand/Logo";
import ThemeToggle from "./ThemeToggle";
import FilenameSettings from "./FilenameSettings";
import MobileMenu from "./MobileMenu";

export const NAV_LINKS = [
  { href: "/#platforms", label: "Downloaders" },
  { href: "/features", label: "Features" },
  { href: "/guides", label: "Guides" },
  { href: "/faq", label: "FAQ" },
];

interface NavbarProps {
  /** Show the filename-template settings (only useful next to the tool) */
  tool?: boolean;
}

// Server component: no JS shipped for the links themselves. The theme
// toggle, filename settings, and the mobile menu are small client islands.
export default function Navbar({ tool = false }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-veil/[0.06] bg-base/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="focus-ring shrink-0 rounded-lg"
          aria-label="ClipKoala home"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map(({ href, label }) => (
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
          <ThemeToggle />
          {!tool ? (
            <Link href="/" className="btn-primary btn-sm hidden sm:inline-flex">
              Download a video
            </Link>
          ) : null}
          <MobileMenu links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}
