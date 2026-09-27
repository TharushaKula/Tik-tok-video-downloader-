import NotFoundPage, { notFoundMetadata } from "@/components/pages/NotFoundPage";

export const metadata = notFoundMetadata("es");

export default function NotFound() {
  return <NotFoundPage locale="es" />;
}
