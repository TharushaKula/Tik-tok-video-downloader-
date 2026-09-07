import Image from "next/image";

// ClipKoala lockup: the mascot (koala hugging a clapperboard) next to the
// wordmark. The wordmark is real text so it follows the theme ("Clip" in
// ink, "Koala" in the brand gradient) and stays crisp at any size; the
// mascot is the supplied artwork, served as an optimized image.

interface MascotProps {
  size?: number;
  className?: string;
  priority?: boolean;
}

export function Mascot({ size = 32, className = "", priority }: MascotProps) {
  return (
    <Image
      src="/brand/mascot-256.png"
      alt=""
      width={size}
      height={size}
      priority={priority}
      className={`select-none ${className}`}
      draggable={false}
    />
  );
}

interface WordmarkProps {
  className?: string;
}

export function Wordmark({ className = "" }: WordmarkProps) {
  return (
    <span
      className={`font-display font-black tracking-tight text-ink-hi ${className}`}
    >
      Clip<span className="text-brand">Koala</span>
    </span>
  );
}

interface LogoProps {
  size?: number;
  className?: string;
  /** Hide the wordmark (mascot only) */
  compact?: boolean;
}

export default function Logo({ size = 34, className = "", compact }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Mascot size={size} />
      {!compact && <Wordmark className="text-[19px]" />}
    </span>
  );
}
