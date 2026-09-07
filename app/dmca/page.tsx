import type { Metadata } from "next";
import LegalDocPage from "@/components/LegalDocPage";
import { LEGAL_DOCS } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";

const doc = LEGAL_DOCS.dmca;

export const metadata: Metadata = pageMetadata({
  title: doc.metaTitle,
  description: doc.metaDescription,
  path: "/dmca",
});

export default function Page() {
  return <LegalDocPage doc={doc} />;
}
