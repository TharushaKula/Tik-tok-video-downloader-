import HomePage, { homeMetadata } from "@/components/pages/HomePage";

export const metadata = homeMetadata("pt-br");

export default function Page() {
  return <HomePage locale="pt-br" />;
}
