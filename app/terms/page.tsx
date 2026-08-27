import type { Metadata } from "next";
import LegalDocPage from "@/components/LegalDocPage";
import { LEGAL_DOCS } from "@/lib/legal";
import { SITE_URL } from "@/lib/site";

const doc = LEGAL_DOCS.terms;

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.metaDescription,
  alternates: { canonical: `${SITE_URL}/terms` },
};

export default function TermsPage() {
  return <LegalDocPage doc={doc} />;
}
