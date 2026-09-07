// Static, GPU-cheap page backdrop: a soft eucalyptus glow behind the hero, a
// warm secondary glow, and a faint dot grid that fades out. Colors follow the
// theme via CSS variables. Pure CSS, no JavaScript.
export default function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-x-0 top-0 h-[620px]"
        style={{
          background:
            "radial-gradient(720px 360px at 50% -60px, rgb(var(--c-accent) / var(--backdrop-glow)), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[560px]"
        style={{
          background:
            "radial-gradient(520px 280px at 82% 60px, rgb(var(--c-accent-2) / 0.08), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-[680px]"
        style={{
          backgroundImage:
            "radial-gradient(rgb(var(--c-veil) / 0.06) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent 80%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent 80%)",
        }}
      />
    </div>
  );
}
