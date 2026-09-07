// Renders a Schema.org JSON-LD block. Escapes "<" so a "</script>" inside
// user-facing copy can never break out of the tag.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
