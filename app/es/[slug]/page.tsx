import LandingPage, {
  landingMetadata,
  landingStaticParams,
} from "@/components/pages/LandingPage";

interface LandingParams {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return landingStaticParams();
}

export async function generateMetadata({ params }: LandingParams) {
  const { slug } = await params;
  return landingMetadata("es", slug);
}

export default async function Page({ params }: LandingParams) {
  const { slug } = await params;
  return <LandingPage locale="es" slug={slug} />;
}
