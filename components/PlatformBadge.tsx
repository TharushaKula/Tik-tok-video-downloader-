import type { PlatformId } from "@/lib/types";

interface PlatformBadgeProps {
  size?: "sm" | "md";
  platform?: PlatformId;
}

const PLATFORM_STYLES: Record<
  PlatformId,
  { label: string; border: string; bg: string; text: string; dot: string }
> = {
  tiktok: {
    label: "TikTok",
    border: "border-pink-500/30",
    bg: "bg-pink-900/20",
    text: "text-pink-300",
    dot: "bg-pink-400",
  },
  instagram: {
    label: "Instagram",
    border: "border-fuchsia-500/30",
    bg: "bg-fuchsia-900/20",
    text: "text-fuchsia-300",
    dot: "bg-fuchsia-400",
  },
  facebook: {
    label: "Facebook",
    border: "border-blue-500/30",
    bg: "bg-blue-900/20",
    text: "text-blue-300",
    dot: "bg-blue-400",
  },
  youtube: {
    label: "YouTube",
    border: "border-red-500/30",
    bg: "bg-red-900/20",
    text: "text-red-300",
    dot: "bg-red-400",
  },
};

export default function PlatformBadge({
  size = "sm",
  platform = "tiktok",
}: PlatformBadgeProps) {
  const textSize = size === "md" ? "text-xs" : "text-[10px]";
  const dotSize = size === "md" ? "h-2 w-2" : "h-1.5 w-1.5";

  const styles = PLATFORM_STYLES[platform];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-semibold backdrop-blur-sm ${textSize} ${styles.border} ${styles.bg} ${styles.text}`}
    >
      <span className={`rounded-full ${dotSize} ${styles.dot}`} />
      {styles.label}
    </span>
  );
}
