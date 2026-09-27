import NotFoundPage, { notFoundMetadata } from "@/components/pages/NotFoundPage";

export const metadata = notFoundMetadata("pt-br");

export default function NotFound() {
  return <NotFoundPage locale="pt-br" />;
}
