import {
  AudioLines,
  Bot,
  Facebook,
  Instagram,
  Music2,
  Pin,
  Twitch,
  Twitter,
  Youtube,
  type LucideProps,
} from "lucide-react";
import type { PlatformId } from "@/lib/types";

const ICONS: Record<PlatformId, React.ComponentType<LucideProps>> = {
  tiktok: Music2,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  twitter: Twitter,
  reddit: Bot,
  pinterest: Pin,
  twitch: Twitch,
  soundcloud: AudioLines,
};

// One place for the platform-to-icon mapping (used by the input, chips,
// platform grid, and status page).
export default function PlatformIcon({
  platform,
  ...props
}: { platform: PlatformId } & LucideProps) {
  const Icon = ICONS[platform];
  return <Icon aria-hidden {...props} />;
}
