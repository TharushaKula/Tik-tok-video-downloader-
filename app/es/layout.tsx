import RootDocument, { rootMetadata, rootViewport } from "@/components/RootDocument";

// Root layout for the /es pages. Every language folder under app/ is the
// same set of thin files; the pages themselves live in components/pages.
export const metadata = rootMetadata("es");
export const viewport = rootViewport;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootDocument locale="es">{children}</RootDocument>;
}
