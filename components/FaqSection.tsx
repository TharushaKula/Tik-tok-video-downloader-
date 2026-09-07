import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface FaqSectionProps {
  faqs: { q: string; a: string }[];
  eyebrow?: string;
  title?: string;
  /** Show a link to the full FAQ page */
  moreLink?: boolean;
  id?: string;
}

// Native <details> accordion: works without JavaScript, every answer is in
// the HTML for search engines, and it needs no client bundle. Structured
// data is added by the page that owns the questions.
export default function FaqSection({
  faqs,
  eyebrow = "FAQ",
  title = "Questions, answered",
  moreLink = false,
  id = "faq",
}: FaqSectionProps) {
  return (
    <section
      id={id}
      className="mx-auto w-full max-w-3xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20"
      aria-labelledby={`${id}-title`}
    >
      <div className="reveal mb-8 text-center">
        <p className="eyebrow mb-2">{eyebrow}</p>
        <h2 id={`${id}-title`} className="text-2xl font-extrabold text-ink-hi sm:text-3xl">
          {title}
        </h2>
      </div>

      <div className="reveal card divide-y divide-veil/[0.06] overflow-hidden">
        {faqs.map((faq) => (
          <details key={faq.q} className="group">
            <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-veil/[0.03] [&::-webkit-details-marker]:hidden">
              <span className="text-[15px] font-semibold text-ink-1">{faq.q}</span>
              <ChevronDown
                size={16}
                className="shrink-0 text-ink-3 transition-transform duration-200 group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-ink-2">{faq.a}</p>
          </details>
        ))}
      </div>

      {moreLink && (
        <p className="mt-6 text-center text-sm text-ink-3">
          More questions?{" "}
          <Link
            href="/faq"
            className="focus-ring rounded font-medium text-ink-1 underline decoration-accent/50 underline-offset-4 hover:text-accent"
          >
            Read the full FAQ
          </Link>
        </p>
      )}
    </section>
  );
}
