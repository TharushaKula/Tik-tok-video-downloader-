import RootDocument, { rootMetadata, rootViewport } from "@/components/RootDocument";

// Root layout for every English page. Other languages have their own root
// layout under app/<lang>; see components/RootDocument.tsx.
export const metadata = rootMetadata("en");
export const viewport = rootViewport;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
