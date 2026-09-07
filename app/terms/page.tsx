import type { Metadata } from "next";
import LegalDocPage from "@/components/LegalDocPage";
import { LEGAL_DOCS } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";

const doc = LEGAL_DOCS.terms;

export const metadata: Metadata = pageMetadata({
  title: doc.metaTitle,
  description: doc.metaDescription,
  path: "/terms",
});

export default function Page() {
  return <LegalDocPage doc={doc} />;
}
