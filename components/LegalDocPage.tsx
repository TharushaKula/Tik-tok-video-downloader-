import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import Navbar from "@/components/Navbar";
import Backdrop from "@/components/Backdrop";
import Footer from "@/components/Footer";
import type { LegalDoc } from "@/lib/legal";

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function LegalDocPage({ doc }: { doc: LegalDoc }) {
  return (
    <div id="top" className="relative min-h-screen text-ink-1">
      <Backdrop />
      <Navbar />

      <main className="relative z-10 mx-auto w-full max-w-2xl px-4 pb-24 pt-16 sm:px-6">
        <Link
          href="/"
          className="focus-ring mb-8 inline-flex items-center gap-1.5 rounded-lg text-sm text-ink-3 transition-colors hover:text-ink-1"
        >
          <ArrowLeft size={14} />
          Back to the downloader
        </Link>

        <h1 className="text-3xl font-semibold tracking-tight text-ink-hi sm:text-4xl">
          {doc.title}
        </h1>
        <p className="mt-2 text-xs text-ink-4">
          Last updated {formatDate(doc.updated)}
        </p>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-2">
          {doc.intro}
        </p>

        <div className="mt-10 space-y-8">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-2 text-[15px] font-semibold text-ink-hi">
                {section.heading}
              </h2>
              <div className="space-y-2.5">
                {section.body.map((para, i) => (
                  <p
                    key={i}
                    className="text-sm leading-relaxed text-ink-2"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
