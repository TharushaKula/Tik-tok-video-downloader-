export default function PlatformBadge({ size = "sm" }: { size?: "sm" | "md" }) {
  const textSize = size === "md" ? "text-xs" : "text-[10px]";
  const dotSize = size === "md" ? "h-2 w-2" : "h-1.5 w-1.5";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-semibold backdrop-blur-sm ${textSize} border-pink-500/30 bg-pink-900/20 text-pink-300`}
    >
      <span className={`rounded-full ${dotSize} bg-pink-400`} />
      TikTok
    </span>
  );
}
