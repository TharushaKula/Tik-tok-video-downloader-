import { PLATFORMS } from "@/lib/platforms";
import type { PlatformId } from "@/lib/types";

// Dark glass chip with a colored identity dot  readable on any thumbnail.
export default function PlatformBadge({
  platform = "tiktok",
}: {
  platform?: PlatformId;
}) {
  const meta = PLATFORMS[platform];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {meta.name}
    </span>
  );
}
