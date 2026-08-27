import { Download } from "lucide-react";

const FEATURES = ["HD Download", "No Watermark", "Free Forever", "Fast & Secure"];
const LEGAL = ["Terms of Service", "Privacy Policy", "Contact Us"];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-[#080810]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          {/* Col 1: Brand */}
          <div>
            <a href="/" className="flex items-center gap-2.5 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-cyan-500">
                <Download size={16} className="text-white" />
              </div>
              <span className="text-base font-bold">
                <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Snap
                </span>
                <span className="text-white">Load</span>
              </span>
            </a>
            <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
              Download TikTok, Instagram, and Facebook videos without watermark.
              Free, fast, and in HD quality.
            </p>
          </div>

          {/* Col 2: Features */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
              Features
            </p>
            <ul className="space-y-2.5">
              {FEATURES.map((f) => (
                <li key={f}>
                  <span className="text-sm text-slate-500">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Legal */}
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
              Legal
            </p>
            <ul className="space-y-2.5">
              {LEGAL.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/[0.05] pt-6">
          <p className="text-xs text-slate-600">
            &copy; {year} SnapLoad. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Powered by{" "}
            <span className="text-slate-500">TikWM API</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
