interface PlatformBadgeProps {
  size?: "sm" | "md";
  platform?: "tiktok" | "instagram";
}

export default function PlatformBadge({
  size = "sm",
  platform = "tiktok",
}: PlatformBadgeProps) {
  const textSize = size === "md" ? "text-xs" : "text-[10px]";
  const dotSize = size === "md" ? "h-2 w-2" : "h-1.5 w-1.5";

  const styles =
    platform === "instagram"
      ? {
          label: "Instagram",
          border: "border-fuchsia-500/30",
          bg: "bg-fuchsia-900/20",
          text: "text-fuchsia-300",
          dot: "bg-fuchsia-400",
        }
      : {
          label: "TikTok",
          border: "border-pink-500/30",
          bg: "bg-pink-900/20",
          text: "text-pink-300",
          dot: "bg-pink-400",
        };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-semibold backdrop-blur-sm ${textSize} ${styles.border} ${styles.bg} ${styles.text}`}
    >
      <span className={`rounded-full ${dotSize} ${styles.dot}`} />
      {styles.label}
    </span>
  );
}
