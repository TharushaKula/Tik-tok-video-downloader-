import RootDocument, { rootViewport } from "@/components/RootDocument";
import NotFoundPage, { notFoundMetadata } from "@/components/pages/NotFoundPage";

// With one root layout per language there is no single layout to render a
// 404 inside, so URLs that match no route at all land here (enabled by
// experimental.globalNotFound in next.config.mjs). notFound() calls inside a
// language still use that language's own not-found page.
export const metadata = notFoundMetadata("en");
export const viewport = rootViewport;

export default function GlobalNotFound() {
  return (
    <RootDocument locale="en">
      <NotFoundPage locale="en" />
    </RootDocument>
  );
}
