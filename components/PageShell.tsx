import Backdrop from "./Backdrop";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LanguageSuggestion from "./LanguageSuggestion";
import { I18nProvider } from "@/lib/i18n/client";
import { getMessages, landingNames, type Locale } from "@/lib/i18n";

interface PageShellProps {
  children: React.ReactNode;
  /** The downloader tool is on this page (shows filename settings in the header) */
  tool?: boolean;
  /** Language of the page; English unless the page exists in others */
  locale?: Locale;
}

// Every route renders inside this shell so header, footer, backdrop, and the
// skip-link target stay identical across the site. It also hands client
// components the strings for this page's language, and only that language.
export default function PageShell({
  children,
  tool = false,
  locale = "en",
}: PageShellProps) {
  return (
    <I18nProvider
      locale={locale}
      messages={getMessages(locale).client}
      landingNames={landingNames(locale)}
    >
      <div id="top" className="relative flex min-h-screen flex-col text-ink-1">
        <Backdrop />
        <Navbar tool={tool} locale={locale} />
        <LanguageSuggestion />
        <main id="main" className="relative z-10 flex-1">
          {children}
        </main>
        <Footer locale={locale} />
      </div>
    </I18nProvider>
  );
}
