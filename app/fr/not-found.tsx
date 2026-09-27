import NotFoundPage, { notFoundMetadata } from "@/components/pages/NotFoundPage";

export const metadata = notFoundMetadata("fr");

export default function NotFound() {
  return <NotFoundPage locale="fr" />;
}
