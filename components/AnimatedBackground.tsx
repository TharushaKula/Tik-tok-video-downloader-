export default function AnimatedBackground() {
  return (
    <>
      <style>{`
        @keyframes blob1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33%       { transform: translate(60px, -80px) scale(1.15); }
          66%       { transform: translate(-40px, 40px) scale(0.9); }
        }
        @keyframes blob2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33%       { transform: translate(-70px, 60px) scale(1.1); }
          66%       { transform: translate(50px, -30px) scale(0.95); }
        }
        @keyframes blob3 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50%       { transform: translate(40px, 70px) scale(1.2); }
        }
        .anim-blob1 { animation: blob1 18s ease-in-out infinite; }
        .anim-blob2 { animation: blob2 22s ease-in-out infinite; }
        .anim-blob3 { animation: blob3 26s ease-in-out infinite; }
      `}</style>

      {/* Fixed background blobs — pointer-events-none so they don't block clicks */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        {/* Violet blob — top left */}
        <div
          className="anim-blob1 absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(139,92,246,0.05) 50%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Cyan blob — top right */}
        <div
          className="anim-blob2 absolute -top-20 -right-40 h-[600px] w-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.12) 0%, rgba(6,182,212,0.04) 50%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        {/* Purple blob — bottom center */}
        <div
          className="anim-blob3 absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(168,85,247,0.1) 0%, rgba(168,85,247,0.03) 50%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Teal accent — bottom right */}
        <div
          className="anim-blob1 absolute bottom-20 -right-20 h-[300px] w-[300px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(20,184,166,0.1) 0%, transparent 65%)",
            filter: "blur(35px)",
            animationDelay: "4s",
          }}
        />
      </div>
    </>
  );
}
