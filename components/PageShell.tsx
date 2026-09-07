import Backdrop from "./Backdrop";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface PageShellProps {
  children: React.ReactNode;
  /** The downloader tool is on this page (shows filename settings in the header) */
  tool?: boolean;
}

// Every route renders inside this shell so header, footer, backdrop, and the
// skip-link target stay identical across the site.
export default function PageShell({ children, tool = false }: PageShellProps) {
  return (
    <div id="top" className="relative flex min-h-screen flex-col text-ink-1">
      <Backdrop />
      <Navbar tool={tool} />
      <main id="main" className="relative z-10 flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
