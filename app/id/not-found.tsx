import NotFoundPage, { notFoundMetadata } from "@/components/pages/NotFoundPage";

export const metadata = notFoundMetadata("id");

export default function NotFound() {
  return <NotFoundPage locale="id" />;
}
