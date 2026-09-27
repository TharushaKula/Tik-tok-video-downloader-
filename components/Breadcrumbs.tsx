import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "./JsonLd";
import { breadcrumbSchema, graph, type Crumb } from "@/lib/seo";
import { getMessages, localePath, type Locale } from "@/lib/i18n";

// Visible breadcrumb trail + matching BreadcrumbList structured data. The
// first crumb is always Home; the last one is the current page (no link).
export default function Breadcrumbs({
  crumbs,
  locale = "en",
}: {
  crumbs: Crumb[];
  locale?: Locale;
}) {
  const { breadcrumbs } = getMessages(locale).site;
  const all: Crumb[] = [
    { name: breadcrumbs.home, path: localePath(locale, "/") },
    ...crumbs,
  ];
  return (
    <>
      <nav aria-label={breadcrumbs.aria} className="mb-6">
        <ol className="flex flex-wrap items-center gap-1 text-xs text-ink-3">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1">
                {i > 0 && (
                  <ChevronRight size={12} className="text-ink-4" aria-hidden />
                )}
                {last ? (
                  <span aria-current="page" className="text-ink-2">
                    {c.name}
                  </span>
                ) : (
                  <Link
                    href={c.path}
                    className="focus-ring rounded transition-colors hover:text-ink-hi"
                  >
                    {c.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={graph(breadcrumbSchema(all))} />
    </>
  );
}
