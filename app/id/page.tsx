import HomePage, { homeMetadata } from "@/components/pages/HomePage";

export const metadata = homeMetadata("id");

export default function Page() {
  return <HomePage locale="id" />;
}
