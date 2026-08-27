// Static, GPU-cheap page backdrop: a soft violet glow behind the hero and a
// faint dot grid that fades out. Colors follow the theme via CSS variables.
export default function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {/* Hero glow */}
      <div
        className="absolute inset-x-0 top-0 h-[560px]"
        style={{
          background:
            "radial-gradient(640px 320px at 50% -40px, rgba(139,92,246,var(--backdrop-glow)), transparent 70%)",
        }}
      />
      {/* Secondary depth glow */}
      <div
        className="absolute inset-x-0 top-0 h-[560px]"
        style={{
          background:
            "radial-gradient(480px 260px at 78% 40px, rgba(56,189,248,0.06), transparent 70%)",
        }}
      />
      {/* Dot grid, masked to the top of the page */}
      <div
        className="absolute inset-x-0 top-0 h-[640px]"
        style={{
          backgroundImage:
            "radial-gradient(rgb(var(--c-veil) / 0.055) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent 78%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent 78%)",
        }}
      />
    </div>
  );
}
