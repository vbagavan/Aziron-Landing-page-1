'use client'

import { useState, useEffect, useRef } from "react";

type Node = {
  title: string;
  desc: string;
  angle: number;
  color: string;
  colorGlow: string;
};

type Particle = {
  nodeIdx: number;
  t: number;
  speed: number;
  size: number;
  life: number;
};

const NODES: Node[] = [
  { title: "Security", desc: "Governance + control layer", angle: -90, color: "#0EA5E9", colorGlow: "rgba(14,165,233,0.5)" },
  { title: "Integrations", desc: "APIs, MCP tools, systems", angle: -18, color: "#8B5CF6", colorGlow: "rgba(139,92,246,0.5)" },
  { title: "Deployment", desc: "Execute workflows", angle: 54, color: "#F59E0B", colorGlow: "rgba(245,158,11,0.5)" },
  { title: "Observability", desc: "Trace every action", angle: 126, color: "#10B981", colorGlow: "rgba(16,185,129,0.5)" },
  { title: "Knowledge", desc: "Context-aware reasoning", angle: 198, color: "#F43F5E", colorGlow: "rgba(244,63,94,0.5)" },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const RADIUS = 200;
const CX = 280, CY = 280;

export default function AzironControlPlane() {
  const [active, setActive] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [, forceRender] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef(0);

  useEffect(() => {
    setMounted(true);
    let raf: number;
    const loop = () => {
      timeRef.current += 0.008;
      smoothRef.current.x = lerp(smoothRef.current.x, mouseRef.current.x, 0.05);
      smoothRef.current.y = lerp(smoothRef.current.y, mouseRef.current.y, 0.05);

      // Particle spawning
      frameRef.current++;
      if (frameRef.current % 7 === 0) {
        const idx = Math.floor(Math.random() * NODES.length);
        const outward = Math.random() > 0.35;
        particlesRef.current.push({
          nodeIdx: idx,
          t: outward ? 0.08 : 0.92,
          speed: (0.005 + Math.random() * 0.009) * (outward ? 1 : -1),
          size: 1.2 + Math.random() * 2,
          life: 1,
        });
      }
      particlesRef.current = particlesRef.current
        .map(p => ({ ...p, t: p.t + p.speed, life: p.life - 0.006 }))
        .filter(p => p.t > 0.05 && p.t < 0.95 && p.life > 0);

      forceRender(n => n + 1);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: (e.clientX - rect.left - rect.width / 2) / (rect.width / 2),
      y: (e.clientY - rect.top - rect.height / 2) / (rect.height / 2),
    };
  };

  const sm = smoothRef.current;
  const t = timeRef.current;
  const particles = particlesRef.current;
  const tiltX = sm.y * -6;
  const tiltY = sm.x * 6;
  const activeColor = active !== null ? NODES[active].color : "#2563EB";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative", minHeight: "100vh",
        background: "#ffffff", color: "#0B0F19",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        padding: "60px 20px",
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />

      {/* Subtle reactive ambient — very low opacity so white stays white */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 60% 45% at 50% 40%, ${active !== null ? NODES[active].colorGlow.replace("0.5","0.04") : "rgba(37,99,235,0.03)"}, transparent)`,
        transition: "background 0.8s ease",
      }} />

      {/* Header */}
      <div style={{
        textAlign: "center", maxWidth: 620, marginBottom: 80, position: "relative", zIndex: 2,
        opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(40px)",
        transition: "all 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div style={{
          fontSize: 11, letterSpacing: "0.25em", color: "#94A3B8", marginBottom: 22,
          fontWeight: 500, textTransform: "uppercase",
        }}>The Aziron Platform</div>
        <h2 style={{
          fontSize: "clamp(48px, 7vw, 84px)", lineHeight: 1.02, letterSpacing: "-0.035em",
          fontWeight: 600, margin: 0,
        }}>
          A System That<br />
          <span
            className="aziron-grad-text"
            style={{
              fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontStyle: "italic",
              // drive the CSS variable so the gradient end-colour reacts to hover
              ["--grad-end" as string]: activeColor,
            }}
          >Executes Intelligence</span>
        </h2>
        <p style={{
          color: "#64748B", maxWidth: 430, margin: "24px auto 0", fontSize: 15,
          lineHeight: 1.75, fontWeight: 300,
        }}>
          Not just AI responses — Aziron orchestrates agents, systems, and decisions into real-world execution.
        </p>
      </div>

      {/* 3D Tilting Diagram */}
      <div style={{
        perspective: "1100px", position: "relative", zIndex: 2,
        opacity: mounted ? 1 : 0,
        transition: "opacity 1.4s cubic-bezier(0.16,1,0.3,1) 0.3s",
      }}>
        <div style={{
          position: "relative", width: 560, height: 560,
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transformStyle: "preserve-3d",
        }}>
          <svg width="560" height="560" viewBox="0 0 560 560" style={{ position: "absolute", inset: 0 }}>
            <defs>
              <radialGradient id="cg">
                <stop offset="0%" stopColor={`${activeColor}18`} />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>

            <circle cx={CX} cy={CY} r="170" fill="url(#cg)" />
            <circle cx={CX} cy={CY} r={RADIUS} fill="none" stroke="#CBD5E1" strokeWidth="0.5"
              strokeDasharray="3 8" opacity={active !== null ? 0.2 : 0.5}
              style={{ transition: "opacity 0.5s" }} />
            <circle cx={CX} cy={CY} r={RADIUS * 0.68} fill="none" stroke="#E2E8F0" strokeWidth="0.3" opacity="0.25" />
            <circle cx={CX} cy={CY} r="88" fill="none" stroke="#E2E8F0" strokeWidth="0.3" opacity="0.18" />

            {/* Lines */}
            {NODES.map((node, i) => {
              const a = (node.angle * Math.PI) / 180;
              const isA = active === i;
              const dim = active !== null && !isA;
              return <line key={i} x1={CX} y1={CY}
                x2={CX + RADIUS * Math.cos(a)} y2={CY + RADIUS * Math.sin(a)}
                stroke={isA ? node.color : "#CBD5E1"}
                strokeWidth={isA ? 1.5 : 0.4}
                opacity={dim ? 0.05 : isA ? 0.85 : 0.22}
                style={{ transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)" }}
              />;
            })}

            {/* Data flow particles */}
            {particles.map((p, i) => {
              const n = NODES[p.nodeIdx];
              const a = (n.angle * Math.PI) / 180;
              return <circle key={i}
                cx={CX + RADIUS * p.t * Math.cos(a)}
                cy={CY + RADIUS * p.t * Math.sin(a)}
                r={p.size} fill={n.color} opacity={p.life * 0.65}
              />;
            })}

            {/* Orbit dots */}
            {[0, 0.33, 0.66].map((off, idx) => {
              const a = t * 0.55 + off * Math.PI * 2;
              return <circle key={idx}
                cx={CX + RADIUS * Math.cos(a)} cy={CY + RADIUS * Math.sin(a)}
                r={idx === 0 ? 2.5 : 1.5} fill={activeColor}
                opacity={idx === 0 ? 0.7 : 0.3}
              />;
            })}
          </svg>

          {/* Core — fixed at center, no parallax movement */}
          <div style={{
            position: "absolute", left: "50%", top: "50%",
            transform: "translate(-50%,-50%) translateZ(20px)",
            width: 144, height: 144, borderRadius: "50%",
            background: "#fff",
            border: `1px solid ${active !== null ? NODES[active].color+"30" : "#E2E8F0"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 20px 50px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
            zIndex: 10, transition: "border-color 0.5s",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/aziron-icon.svg"
              alt="Aziron"
              style={{ width: 64, height: "auto", display: "block" }}
            />
            {/* Breathing rings only shown when nothing is hovered */}
            {active === null && (
              <>
                <div style={{
                  position: "absolute", inset: -8, borderRadius: "50%",
                  border: "1px solid rgba(37,99,235,0.15)", animation: "breathe 3s ease-in-out infinite",
                  pointerEvents: "none",
                }} />
                <div style={{
                  position: "absolute", inset: -20, borderRadius: "50%",
                  border: "1px solid rgba(37,99,235,0.07)", animation: "breathe 3s ease-in-out infinite 0.6s",
                  pointerEvents: "none",
                }} />
              </>
            )}
          </div>

          {/* Nodes */}
          {NODES.map((node, i) => {
            const a = (node.angle * Math.PI) / 180;
            const bx = RADIUS * Math.cos(a);
            const by = RADIUS * Math.sin(a);
            const isA = active === i;
            const dim = active !== null && !isA;
            return (
              <div key={i}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{
                  position: "absolute", left: "50%", top: "50%",
                  transform: `translate(-50%,-50%) translate(${bx+sm.x*5}px,${by+sm.y*5}px) translateZ(${isA?35:10}px) scale(${isA?1.08:1})`,
                  opacity: dim ? 0.13 : 1,
                  transition: "all 0.55s cubic-bezier(0.16,1,0.3,1)",
                  cursor: "pointer", zIndex: isA ? 20 : 5, width: 150, textAlign: "center",
                }}
              >
                <div style={{
                  width: isA ? 16 : 8, height: isA ? 16 : 8,
                  borderRadius: "50%", margin: "0 auto 10px",
                  background: isA ? node.color : "#94A3B8",
                  boxShadow: isA ? `0 0 20px ${node.colorGlow}, 0 0 50px ${node.colorGlow.replace("0.5","0.2")}` : "none",
                  transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                  border: isA ? "2.5px solid rgba(255,255,255,0.9)" : "none",
                }} />
                <div style={{
                  fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em", marginBottom: 3,
                  color: isA ? node.color : "#334155", transition: "color 0.3s",
                }}>{node.title}</div>
                <div style={{ fontSize: 11, color: "#94A3B8", lineHeight: 1.45, fontWeight: 300 }}>
                  {node.desc}
                </div>
                {isA && (
                  <div style={{
                    marginTop: 14, padding: "12px 16px",
                    background: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(16px)", borderRadius: 12,
                    border: `1px solid ${node.color}30`,
                    boxShadow: `0 10px 40px rgba(0,0,0,0.06)`,
                    animation: "fadeUp 0.4s cubic-bezier(0.16,1,0.3,1)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                      <div style={{
                        width: 6, height: 6, borderRadius: "50%", background: node.color,
                        animation: "pulse 2s infinite",
                      }} />
                      <div style={{
                        fontSize: 10, color: node.color, fontWeight: 600,
                        letterSpacing: "0.08em", textTransform: "uppercase",
                      }}>Active</div>
                    </div>
                    <div style={{ fontSize: 11, color: "#64748B", lineHeight: 1.55 }}>
                      Real-time orchestration with full audit trail and rollback.
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: "flex", gap: 48, marginTop: 72, position: "relative", zIndex: 2,
        opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)",
        transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 0.6s",
      }}>
        {[["5","Active Nodes"],["<20ms","Latency"],["99.99%","Uptime"]].map(([v,l],i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.03em", color: "#0F172A" }}>{v}</div>
            <div style={{ fontSize: 10, color: "#94A3B8", letterSpacing: "0.14em", marginTop: 5, textTransform: "uppercase" }}>{l}</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes breathe { 0%,100%{transform:scale(1);opacity:0.5} 50%{transform:scale(1.15);opacity:0.12} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .aziron-grad-text {
          --grad-end: #2563EB;
          background: linear-gradient(135deg, #1e293b, var(--grad-end));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          transition: --grad-end 0.6s;
        }
      `}</style>
    </div>
  );
}