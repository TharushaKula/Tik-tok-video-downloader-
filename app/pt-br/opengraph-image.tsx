import { OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";
import { getMessages } from "@/lib/i18n";
import { homeOgImage } from "@/components/pages/og-images";

export const alt = getMessages("pt-br").site.meta.ogAlt;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return homeOgImage("pt-br");
}
