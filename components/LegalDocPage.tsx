import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import type { LegalDoc } from "@/lib/legal";
import { graph, webPageSchema } from "@/lib/seo";

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
    <PageShell>
      <article className="mx-auto w-full max-w-3xl px-4 pb-24 pt-8 sm:px-6 sm:pt-12">
        <PageHeader
          crumbs={[{ name: doc.title, path: `/${doc.slug}` }]}
          eyebrow="Legal"
          title={doc.title}
          lede={doc.intro}
        >
          <p className="mt-3 text-xs text-ink-4">
            Last updated <time dateTime={doc.updated}>{formatDate(doc.updated)}</time>
          </p>
        </PageHeader>

        <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
          {doc.sections.map((s) => (
            <a key={s.heading} href={`#${slugify(s.heading)}`} className="chip">
              {s.heading}
            </a>
          ))}
        </nav>

        <div className="prose-ck mt-10 space-y-10">
          {doc.sections.map((section) => (
            <section key={section.heading} id={slugify(section.heading)} className="scroll-mt-24">
              <h2 className="mb-3 text-xl font-extrabold text-ink-hi">{section.heading}</h2>
              <div className="space-y-3">
                {section.body.map((para, i) => (
                  <p key={i}>{linkify(para)}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
      <JsonLd
        data={graph(
          webPageSchema({
            path: `/${doc.slug}`,
            name: doc.title,
            description: doc.metaDescription,
            dateModified: doc.updated,
          })
        )}
      />
    </PageShell>
  );
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Turn the contact email into a mailto link without a markdown dependency.
function linkify(text: string): React.ReactNode {
  const parts = text.split(/(\S+@\S+\.[a-z]+)/i);
  if (parts.length === 1) return text;
  return parts.map((p, i) =>
    /\S+@\S+\.[a-z]+/i.test(p) ? (
      <a key={i} href={`mailto:${p.replace(/[.,;]$/, "")}`}>
        {p}
      </a>
    ) : (
      p
    )
  );
}
