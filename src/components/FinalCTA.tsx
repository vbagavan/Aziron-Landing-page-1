"use client";

// Aziron-relevant SVG icon components (no external deps)
const icons = [
  // AI / Brain
  { el: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M12 2C9 2 7 4 7 6.5c0 1-.4 2-1 2.5C4.5 10 3 11.5 3 13.5 3 16 5 18 7.5 18H9v2h6v-2h1.5C19 18 21 16 21 13.5c0-2-1.5-3.5-3-4-.6-.5-1-1.5-1-2.5C17 4 15 2 12 2z" strokeLinecap="round"/></svg>, color: "#6366F1", label: "AI Engine" },
  // Code brackets
  { el: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M8 6L3 12l5 6M16 6l5 6-5 6" strokeLinecap="round" strokeLinejoin="round"/></svg>, color: "#3B82F6", label: "VS Code" },
  // Shield (Security)
  { el: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M12 3l8 4v5c0 4.4-3.4 8.5-8 9.9C7.4 20.5 4 16.4 4 12V7l8-4z" strokeLinecap="round" strokeLinejoin="round"/></svg>, color: "#10B981", label: "Security" },
  // Database
  { el: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6"/><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" strokeLinecap="round"/></svg>, color: "#F59E0B", label: "RAG / Data" },
  // Workflow / Nodes
  { el: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><circle cx="5" cy="12" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 12h4l2-4h1M7 12h4l2 4h1" strokeLinecap="round" strokeLinejoin="round"/></svg>, color: "#8B5CF6", label: "Orchestration" },
  // Cloud
  { el: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M18 10a6 6 0 10-11.4 2.6A4 4 0 106 20h12a4 4 0 000-8h-.1A6 6 0 0018 10z" strokeLinecap="round" strokeLinejoin="round"/></svg>, color: "#0EA5E9", label: "Cloud Deploy" },
  // Terminal
  { el: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4" strokeLinecap="round" strokeLinejoin="round"/></svg>, color: "#EC4899", label: "CLI / Agent" },
  // API plug
  { el: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9" strokeLinecap="round" strokeLinejoin="round"/></svg>, color: "#F97316", label: "Integrations" },
  // Eye / Observability
  { el: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round"/><circle cx="12" cy="12" r="3"/></svg>, color: "#14B8A6", label: "Observability" },
  // Git branch
  { el: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M6 8v8M8 6h7a3 3 0 010 6H9" strokeLinecap="round"/></svg>, color: "#84CC16", label: "Git / CI" },
  // Zap / Speed
  { el: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" strokeLinecap="round" strokeLinejoin="round"/></svg>, color: "#EAB308", label: "Low Latency" },
  // Lock
  { el: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round"/></svg>, color: "#F43F5E", label: "Governance" },
];

const ORBIT_COUNT = 3;
const ORBIT_GAP = 8; // rem
const iconsPerOrbit = Math.ceil(icons.length / ORBIT_COUNT);

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-orange-100" style={{
      background: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 20%, #fff4e6 45%, #ffffff 75%)",
    }}>
      {/* Radial orange glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 65% 80% at 80% 50%, rgba(251,146,60,0.12) 0%, rgba(249,115,22,0.06) 40%, transparent 70%)",
      }} />

      <div className="relative max-w-7xl mx-auto px-6 flex items-center justify-between h-[32rem]">

        {/* Left — CTA content */}
        <div className="relative z-10 w-1/2 py-16">
          <p className="text-xs font-semibold tracking-widest text-orange-500 uppercase mb-4">
            Production-Ready AI Platform
          </p>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.05] tracking-tight text-aziron-dark mb-6">
            Start Building AI That<br />Actually Works
          </h2>
          <p className="text-aziron-muted text-lg md:text-xl mb-10 max-w-md leading-relaxed">
            Join teams already using Aziron to deploy production-ready AI agents that connect, execute, and scale.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#get-started"
              className="px-8 py-4 bg-[#F97316] text-white font-semibold rounded-lg hover:bg-[#EA580C] transition-all duration-300 shadow-lg hover:shadow-xl text-base"
            >
              Get Started Free
            </a>
            <a
              href="#book-demo"
              className="px-8 py-4 bg-white text-aziron-dark font-semibold rounded-lg border-2 border-black/10 hover:border-black/20 transition-all duration-300 text-base"
            >
              Book a Demo
            </a>
          </div>
        </div>

        {/* Right — Orbit animation */}
        <div className="absolute right-0 top-0 bottom-0 w-[55%] flex items-center justify-start overflow-hidden pointer-events-none">
          <div
            className="relative flex items-center justify-center"
            style={{ width: "52rem", height: "52rem", transform: "translateX(38%)" }}
          >
            {/* Center: Aziron logo */}
            <div className="relative z-20 w-24 h-24 rounded-full bg-white border border-gray-200 shadow-xl flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/aziron-icon.svg" alt="Aziron" style={{ width: 52, height: "auto" }} />
            </div>

            {/* Orbiting rings */}
            {[...Array(ORBIT_COUNT)].map((_, orbitIdx) => {
              const sizePx = (12 + ORBIT_GAP * (orbitIdx + 1)) * 16; // rem → px approx
              const sizeRem = `${12 + ORBIT_GAP * (orbitIdx + 1)}rem`;
              const angleStep = (2 * Math.PI) / iconsPerOrbit;
              const duration = 22 + orbitIdx * 10;
              const dir = orbitIdx % 2 === 0 ? "cta-spin-cw" : "cta-spin-ccw";

              return (
                <div
                  key={orbitIdx}
                  className="absolute rounded-full"
                  style={{
                    width: sizeRem,
                    height: sizeRem,
                    border: "1px dashed rgba(0,0,0,0.08)",
                    animation: `${dir} ${duration}s linear infinite`,
                  }}
                >
                  {icons
                    .slice(orbitIdx * iconsPerOrbit, (orbitIdx + 1) * iconsPerOrbit)
                    .map((cfg, iconIdx) => {
                      const angle = iconIdx * angleStep;
                      const x = 50 + 50 * Math.cos(angle);
                      const y = 50 + 50 * Math.sin(angle);
                      const counterDir = orbitIdx % 2 === 0 ? "cta-spin-ccw" : "cta-spin-cw";
                      return (
                        <div
                          key={iconIdx}
                          className="absolute"
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          {/* counter-rotate so icon stays upright */}
                          <div
                            className="w-11 h-11 rounded-full bg-white border border-gray-100 shadow-md flex items-center justify-center"
                            style={{
                              animation: `${counterDir} ${duration}s linear infinite`,
                              color: cfg.color,
                            }}
                          >
                            {cfg.el}
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cta-spin-cw  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes cta-spin-ccw { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
      `}</style>
    </section>
  );
}
