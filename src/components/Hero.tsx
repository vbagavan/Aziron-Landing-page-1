"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";

/* ─── Demo data ─────────────────────────────────────── */
const DEMO_PROMPT =
  "Analyze production logs, generate RCA, and auto-remediate latency spike";

const STAGES = [
  {
    id: "ingest",
    label: "Ingest",
    icon: "↓",
    status: [
      "Opening stream…",
      "Loading 3,247 logs…",
      "Ingestion complete",
    ],
  },
  {
    id: "analyze",
    label: "Analyze",
    icon: "◎",
    status: [
      "Scanning services…",
      "Signal correlation…",
      "Root cause found",
    ],
  },
  {
    id: "orchestrate",
    label: "Orchestrate",
    icon: "⇄",
    status: [
      "Querying Grafana…",
      "Checking deploys…",
      "Plan ready",
    ],
  },
  {
    id: "execute",
    label: "Execute",
    icon: "▶",
    status: [
      "Rolling back…",
      "Health checks…",
      "All systems go",
    ],
  },
];

const RESULTS = [
  { label: "Root cause",  value: "Config drift in edge proxy", highlight: false },
  { label: "Latency",     value: "2.4s → 180ms",              highlight: true  },
  { label: "Resolution",  value: "Auto-remediated",            highlight: true  },
  { label: "Time to fix", value: "47 seconds",                 highlight: false },
];

const TRUST = [
  {
    label: "SOC 2 Type II",
    svg: (
      <path
        d="M7 1L8.5 5.5H13L9.25 8.25L10.75 12.75L7 10L3.25 12.75L4.75 8.25L1 5.5H5.5L7 1Z"
        stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"
      />
    ),
  },
  {
    label: "RBAC + SSO",
    svg: (
      <>
        <rect x="2" y="5" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M4.5 5V3.5A2.5 2.5 0 0 1 9.5 3.5V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </>
    ),
  },
  {
    label: "99.9% Uptime SLA",
    svg: (
      <>
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M4.5 7L6.5 9L9.5 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ),
  },
  {
    label: "BYOK support",
    svg: (
      <>
        <path d="M2 7C2 4.24 4.24 2 7 2C9.76 2 12 4.24 12 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M7 12V9M5 10.5L7 12L9 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </>
    ),
  },
];

/* ─── Typewriter hook ───────────────────────────────── */
function useTypewriter(text: string, speed = 26, active = true) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active) { setOut(""); setDone(false); return; }
    let i = 0; setOut(""); setDone(false);
    const t = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) { clearInterval(t); setDone(true); }
    }, speed);
    return () => clearInterval(t);
  }, [text, speed, active]);
  return { out, done };
}

/* ─── Component ─────────────────────────────────────── */
export default function Hero() {
  const [phase, setPhase] = useState<"idle" | "typing" | "running" | "done">("idle");
  const [tick, setTick]   = useState(0);
  const tickRef           = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasAutoPlayed     = useRef(false);
  const sectionRef        = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const heroTextY  = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const heroCardY  = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const startRun = useCallback(() => { setPhase("typing"); setTick(0); }, []);

  /* auto-play once on mount */
  useEffect(() => {
    if (!hasAutoPlayed.current) {
      hasAutoPlayed.current = true;
      const t = setTimeout(startRun, 900);
      return () => clearTimeout(t);
    }
  }, [startRun]);

  const { out: typed, done: typingDone } = useTypewriter(
    DEMO_PROMPT, 26,
    phase === "typing" || phase === "running" || phase === "done",
  );

  useEffect(() => {
    if (typingDone && phase === "typing") {
      const t = setTimeout(() => setPhase("running"), 500);
      return () => clearTimeout(t);
    }
  }, [typingDone, phase]);

  const totalTicks = STAGES.reduce((a, s) => a + s.status.length, 0);

  useEffect(() => {
    if (phase !== "running") return;
    tickRef.current = setInterval(() => setTick(v => v + 1), 1300);
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [phase]);

  useEffect(() => {
    if (phase === "running" && tick >= totalTicks + 1) {
      if (tickRef.current) clearInterval(tickRef.current);
      setTimeout(() => setPhase("done"), 0);
    }
  }, [tick, phase, totalTicks]);

  /* Auto-loop: restart 3 s after reaching "done" */
  useEffect(() => {
    if (phase !== "done") return;
    const t = setTimeout(() => {
      setPhase("idle");
      setTick(0);
      setTimeout(startRun, 400);
    }, 3000);
    return () => clearTimeout(t);
  }, [phase, startRun]);

  const stageData = useMemo(() => {
    const offsets = STAGES.map((_, i) =>
      STAGES.slice(0, i).reduce((sum, s) => sum + s.status.length, 0)
    );
    return STAGES.map((s, i) => {
      const localTick  = tick - offsets[i];
      const revealed   = Math.max(0, Math.min(s.status.length, localTick));
      const isActive   = localTick > 0 && localTick <= s.status.length;
      const isComplete = localTick > s.status.length;
      return { ...s, revealed, isActive, isComplete, lines: s.status.slice(0, revealed) };
    });
  }, [tick]);

  const progress  = Math.min(1, tick / totalTicks);
  const isRunning = phase === "running" || phase === "done";

  return (
    <>
      {/* Scoped keyframes only used by the demo card */}
      <style>{`
        @keyframes hz-blink       { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes hz-dot-pulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.75)} }
        @keyframes hz-statusIn    { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
        @keyframes hz-resultIn    { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes hz-nodePulse   { 0%,100%{box-shadow:0 0 0 4px rgba(47,111,237,.18)} 50%{box-shadow:0 0 0 7px rgba(47,111,237,.10)} }
        @keyframes hz-checkIn     { from{transform:scale(.6);opacity:0} to{transform:scale(1);opacity:1} }
        @keyframes hz-outSuccess  { 0%{box-shadow:0 0 0 0 rgba(22,163,74,.2)} 50%{box-shadow:0 0 0 6px rgba(22,163,74,.2)} 100%{box-shadow:0 0 0 0 rgba(22,163,74,.2)} }

        .hz-cursor       { display:inline-block;width:1.5px;height:14px;background:#2F6FED;margin-left:2px;vertical-align:text-bottom;animation:hz-blink 1s step-end infinite; }
        .hz-badge-dot    { animation:hz-dot-pulse 2.5s ease-in-out infinite; }
        .hz-status-in    { animation:hz-statusIn .3s cubic-bezier(.4,0,.2,1) both; }
        .hz-result-in    { animation:hz-resultIn .4s cubic-bezier(.4,0,.2,1) both; }
        .hz-node-active  { animation:hz-nodePulse 1.8s ease-in-out infinite; }
        .hz-node-done    { animation:hz-checkIn .25s cubic-bezier(.4,0,.2,1) both; }
        .hz-out-success  { animation:hz-outSuccess .4s ease both; }
      `}</style>

      <section ref={sectionRef} className="relative overflow-hidden pt-36 pb-32 px-6 bg-gradient-to-br from-white via-[#FFF4EC] to-[#FFE4C8] text-black">

        {/* grid texture */}
        <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,gray_1px,transparent_1px),linear-gradient(to_bottom,gray_1px,transparent_1px)] bg-[size:40px_40px]" />
        {/* radial glow */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-black/5 blur-[120px]" />

        <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* ── LEFT ── */}
          <motion.div
            style={{ y: heroTextY, opacity: heroOpacity }}
            className="flex flex-col gap-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
            {/* eyebrow */}
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.1em] uppercase text-amber-600 bg-amber-50 border border-amber-200/60 px-3.5 py-1.5 rounded-full w-fit">
              <span className="hz-badge-dot w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
              AI Execution Platform · Beta
            </span>

            {/* headline — word-stagger */}
            <h1 className="font-display text-[2.6rem] sm:text-5xl md:text-[3.25rem] font-bold leading-[1.07] tracking-[-0.04em]">
              {["From", "AI", "Chat"].map((word, i) => (
                <motion.span
                  key={word}
                  className="inline-block mr-[0.25em]"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.35, ease: "backOut" }}
              >
                <svg className="inline-block align-middle mb-1" width="0.75em" height="0.75em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </motion.span>
              <br />
              {["to"].map((word, i) => (
                <motion.span
                  key={word}
                  className="inline-block mr-[0.25em]"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.45 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                className="text-[#F97316]"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                AI Execution
              </motion.span>
            </h1>

            {/* subtext */}
            <p className="text-[16.5px] leading-[1.68] text-slate-600 max-w-[380px]">
              Build agents that don&apos;t just respond — but execute real workflows across your systems.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#get-started"
                className="px-8 py-4 bg-[#F97316] text-white font-semibold rounded-lg hover:bg-[#EA580C] transition-all shadow-lg text-center"
              >
                Get Started Free
              </a>
              <a
                href="#book-demo"
                className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-lg border border-slate-200 hover:border-slate-400 hover:text-slate-900 transition-all text-center"
              >
                Book a Demo
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-x-4 gap-y-2 flex-wrap pt-1">
              {TRUST.map((b, i) => (
                <div key={b.label} className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-[12px] text-slate-500 font-medium">
                    <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5 flex-shrink-0">
                      {b.svg}
                    </svg>
                    {b.label}
                  </div>
                  {i < TRUST.length - 1 && (
                    <span className="w-px h-4 bg-slate-200 inline-block" />
                  )}
                </div>
              ))}
            </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT — Interactive Demo Card ── */}
          <motion.div
            style={{ y: heroCardY }}
            className="flex flex-col justify-center gap-3"
          >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex justify-center"
          >
            <div
              className="w-full max-w-[500px] bg-white border border-gray-200 rounded-2xl overflow-hidden"
              style={{
                boxShadow:
                  "0 1px 0 rgba(255,255,255,.9) inset, 0 24px 48px -12px rgba(0,0,0,.07), 0 0 0 1px rgba(0,0,0,.03)",
              }}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-50 border-b border-gray-200">
                <span className="w-2 h-2 rounded-full bg-[#FF6259]" />
                <span className="w-2 h-2 rounded-full bg-[#FFBE2E]" />
                <span className="w-2 h-2 rounded-full bg-[#2ACB42]" />
                <span className="ml-2 text-[10.5px] font-medium text-gray-400 tracking-wide">
                  aziron studio — workflow execution
                </span>
              </div>

              <div className="p-4 flex flex-col gap-3.5">

                {/* 1 — Output panel */}
                <div
                  className={`rounded-xl overflow-hidden transition-all duration-500 ${
                    phase === "done" ? "hz-out-success" : ""
                  }`}
                  style={{
                    border:
                      phase === "done"
                        ? "1px solid rgba(22,163,74,.3)"
                        : "1px solid #E3E6EC",
                    background:
                      phase === "done" ? "rgba(22,163,74,.03)" : "#F2F4F7",
                  }}
                >
                  <div
                    className="flex items-center justify-between px-3.5 py-2.5 border-b"
                    style={{
                      borderColor:
                        phase === "done" ? "rgba(22,163,74,.2)" : "#E3E6EC",
                    }}
                  >
                    <span
                      className="text-[10px] font-semibold uppercase tracking-[0.1em]"
                      style={{ color: phase === "done" ? "#16A34A" : "#8B8F9E" }}
                    >
                      {phase === "done" ? "✓ Resolved" : "Output"}
                    </span>
                    {phase === "done" && (
                      <span className="text-[10px] text-gray-400 animate-pulse">restarting…</span>
                    )}
                  </div>
                  <div className="p-3.5">
                    {phase === "done" ? (
                      <div className="grid grid-cols-2 gap-3">
                        {RESULTS.map((r, i) => (
                          <div
                            key={r.label}
                            className="hz-result-in"
                            style={{ animationDelay: `${i * 0.09}s` }}
                          >
                            <div className="text-[10px] text-gray-400 mb-0.5">{r.label}</div>
                            <div
                              className="text-[13px] font-semibold"
                              style={{ color: r.highlight ? "#16A34A" : "#0C0E16" }}
                            >
                              {r.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-[12px] text-gray-400 py-1.5">
                        {phase === "running" ? "Awaiting pipeline completion…" : "Ready"}
                      </div>
                    )}
                  </div>
                </div>

                {/* 2 — Pipeline stages */}
                {isRunning && (
                  <div className="grid grid-cols-4 relative">
                    {stageData.map((s, i) => (
                      <div key={s.id} className="flex flex-col items-center relative px-0.5">
                        {/* connector */}
                        {i < STAGES.length - 1 && (
                          <div
                            className="absolute top-[17px] h-px z-[1] transition-colors duration-500"
                            style={{
                              left: "calc(50% + 17px)",
                              right: "calc(-50% + 17px)",
                              background: s.isComplete ? "#16A34A" : "#E3E6EC",
                            }}
                          />
                        )}
                        {/* node */}
                        <div
                          className={`w-[34px] h-[34px] rounded-[9px] flex items-center justify-center text-[13px] font-medium relative z-[2] transition-all duration-300 ${
                            s.isComplete ? "hz-node-done" : s.isActive ? "hz-node-active" : ""
                          }`}
                          style={{
                            border: s.isComplete
                              ? "1px solid #16A34A"
                              : s.isActive
                              ? "1px solid #2F6FED"
                              : "1px solid #E3E6EC",
                            color:  s.isComplete ? "#16A34A" : s.isActive ? "#2F6FED" : "#8B8F9E",
                            background: s.isComplete
                              ? "rgba(22,163,74,.08)"
                              : s.isActive
                              ? "rgba(47,111,237,.08)"
                              : "#F2F4F7",
                          }}
                        >
                          {s.isComplete ? "✓" : s.icon}
                        </div>
                        {/* stage label */}
                        <div
                          className="text-[9.5px] font-semibold tracking-wide mt-2 text-center transition-colors duration-300"
                          style={{
                            color: s.isComplete ? "#16A34A" : s.isActive ? "#2F6FED" : "#8B8F9E",
                          }}
                        >
                          {s.label}
                        </div>
                        {/* status lines — fixed height keeps all 4 columns even */}
                        <div className="mt-1.5 text-center h-[52px] overflow-hidden">
                          {s.lines.map((line, li) => (
                            <div
                              key={li}
                              className="hz-status-in text-[10.5px] leading-[1.55]"
                              style={{
                                animationDelay: `${li * 0.07}s`,
                                color:
                                  li === s.lines.length - 1 && s.isComplete
                                    ? "#16A34A"
                                    : "#4A4E5C",
                                fontWeight:
                                  li === s.lines.length - 1 && s.isComplete ? 500 : 400,
                              }}
                            >
                              {line}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 3 — Progress bar */}
                {isRunning && (
                  <div className="h-[2px] bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-[width] duration-500 ease-in-out"
                      style={{
                        width: `${progress * 100}%`,
                        background:
                          phase === "done"
                            ? "#16A34A"
                            : "linear-gradient(90deg,#2F6FED,#6366F1)",
                      }}
                    />
                  </div>
                )}

                {/* 4 — Prompt input (bottom — chat-style) */}
                <div
                  className="rounded-xl px-3.5 py-3 flex items-end gap-2.5 transition-all duration-300"
                  style={{
                    border:
                      phase === "typing"
                        ? "1px solid #2F6FED"
                        : phase === "done"
                        ? "1px solid #16A34A"
                        : "1px solid #E3E6EC",
                    background: phase === "typing" ? "#fff" : "#F2F4F7",
                    boxShadow:
                      phase === "typing"
                        ? "0 0 0 3px rgba(47,111,237,.18)"
                        : phase === "done"
                        ? "0 0 0 3px rgba(22,163,74,.2)"
                        : "none",
                  }}
                >
                  {/* text area */}
                  <div
                    className="flex-1 text-[13px] leading-relaxed min-h-[18px]"
                    style={{ color: phase === "idle" ? "#9CA3AF" : "#111827" }}
                  >
                    {phase === "idle" ? (
                      "Describe your workflow…"
                    ) : (
                      <>
                        {typed}
                        {phase !== "done" && <span className="hz-cursor" />}
                      </>
                    )}
                  </div>
                  {/* send button */}
                  <button
                    aria-label="Send"
                    className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{
                      background:
                        phase === "done"
                          ? "#16A34A"
                          : phase === "typing" || phase === "running"
                          ? "#2F6FED"
                          : "#E3E6EC",
                      cursor: "default",
                    }}
                  >
                    <svg
                      viewBox="0 0 16 16" fill="none"
                      width="13" height="13"
                      stroke={phase === "idle" ? "#9CA3AF" : "#fff"}
                      strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M8 13V3M3 8l5-5 5 5" />
                    </svg>
                  </button>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Replay button */}
          {phase === "done" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex justify-center"
            >
              <button
                onClick={() => { setPhase("idle"); setTick(0); setTimeout(() => setPhase("typing"), 150); }}
                className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-orange-500 transition-colors px-4 py-2 rounded-full border border-slate-200 hover:border-orange-300 bg-white/80 backdrop-blur-sm"
              >
                <svg viewBox="0 0 16 16" fill="none" width="12" height="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 8a6 6 0 1 0 1.5-3.9M2 4v4h4" />
                </svg>
                Replay demo
              </button>
            </motion.div>
          )}
          </motion.div>

        </div>
      </section>
    </>
  );
}
