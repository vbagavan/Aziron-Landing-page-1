'use client'

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"

type Node = { title: string; desc: string; angle: number; color: string; colorGlow: string }
type Particle = { nodeIdx: number; t: number; speed: number; size: number; life: number }

const NODES: Node[] = [
  { title:"Security",      desc:"Governance + control layer",    angle:-90,  color:"#38bdf8", colorGlow:"rgba(56,189,248,0.5)" },
  { title:"Integrations",  desc:"APIs, MCP tools, systems",      angle:-18,  color:"#a78bfa", colorGlow:"rgba(167,139,250,0.5)" },
  { title:"Deployment",    desc:"Execute workflows",             angle:54,   color:"#fb923c", colorGlow:"rgba(251,146,60,0.5)" },
  { title:"Observability", desc:"Trace every action",            angle:126,  color:"#34d399", colorGlow:"rgba(52,211,153,0.5)" },
  { title:"Knowledge",     desc:"Context-aware reasoning",       angle:198,  color:"#f43f5e", colorGlow:"rgba(244,63,94,0.5)" },
]

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const RADIUS = 200, CX = 280, CY = 280

export default function Differentiators() {
  const [active, setActive]   = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const [, forceRender]       = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef   = useRef<HTMLElement>(null)
  const mouseRef     = useRef({ x:0, y:0 })
  const smoothRef    = useRef({ x:0, y:0 })
  const timeRef      = useRef(0)
  const particlesRef = useRef<Particle[]>([])
  const frameRef     = useRef(0)

  const reduced = useReducedMotion()

  /* Scroll parallax */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY  = useTransform(scrollYProgress, [0,1], reduced ? ['0%','0%'] : ['-10%','10%'])
  const midY = useTransform(scrollYProgress, [0,1], reduced ? ['0%','0%'] : ['-5%','5%'])

  useEffect(() => {
    setMounted(true)
    if (reduced) return

    let raf: number
    const loop = () => {
      timeRef.current += 0.008
      smoothRef.current.x = lerp(smoothRef.current.x, mouseRef.current.x, 0.05)
      smoothRef.current.y = lerp(smoothRef.current.y, mouseRef.current.y, 0.05)

      frameRef.current++
      if (frameRef.current % 7 === 0) {
        const idx    = Math.floor(Math.random() * NODES.length)
        const outward = Math.random() > 0.35
        particlesRef.current.push({
          nodeIdx: idx,
          t: outward ? 0.08 : 0.92,
          speed: (0.005 + Math.random() * 0.009) * (outward ? 1 : -1),
          size: 1.2 + Math.random() * 2,
          life: 1,
        })
      }
      particlesRef.current = particlesRef.current
        .map(p => ({ ...p, t: p.t + p.speed, life: p.life - 0.006 }))
        .filter(p => p.t > 0.05 && p.t < 0.95 && p.life > 0)

      forceRender(n => n + 1)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseRef.current = {
      x: (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2),
      y: (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2),
    }
  }

  const sm          = smoothRef.current
  const t           = timeRef.current
  const particles   = particlesRef.current
  const tiltX       = sm.y * -6
  const tiltY       = sm.x * 6
  const activeColor = active !== null ? NODES[active].color : "#38bdf8"

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-32 md:py-48 bg-gradient-to-b from-aziron-surface via-white to-aziron-surface"
    >
      {/* ── LAYER 1: Holographic grid floor (slow) ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none gpu-layer">
        {/* Perspective grid */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[50%] opacity-[0.04]"
          style={{
            backgroundImage:`
              linear-gradient(rgba(56,189,248,1) 1px, transparent 1px),
              linear-gradient(to right, rgba(56,189,248,1) 1px, transparent 1px)
            `,
            backgroundSize:'60px 60px',
            transform:'perspective(400px) rotateX(30deg)',
            transformOrigin:'center bottom',
          }}
        />
        {/* Deep void orb */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-30"
          style={{
            background:`radial-gradient(circle, ${activeColor}08 0%, transparent 65%)`,
            filter:'blur(60px)',
            transition:'background 0.8s ease',
          }}
        />
      </motion.div>

      {/* ── LAYER 2: Floating space debris (mid) ── */}
      <motion.div style={{ y: midY }} className="absolute inset-0 pointer-events-none gpu-layer overflow-hidden">
        {[
          { top:'10%', left:'5%',  size:40, c:'rgba(56,189,248,0.04)', dur:'9s'  },
          { top:'70%', right:'6%', size:60, c:'rgba(167,139,250,0.04)',dur:'12s' },
          { top:'40%', left:'92%',size:30, c:'rgba(249,115,22,0.04)', dur:'7s'  },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full border animate-float-random"
            style={{
              top:p.top,
              left:(p as {left?:string}).left,
              right:(p as {right?:string}).right,
              width:p.size, height:p.size,
              background:p.c,
              borderColor:p.c.replace('0.04','0.12'),
              animationDelay:`${i*2}s`,
            }}
          />
        ))}
      </motion.div>

      {/* Main content */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        style={{ position:'relative', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 24px' }}
      >
        {/* Subtle reactive ambient */}
        <div style={{
          position:'absolute', inset:0, pointerEvents:'none',
          background:`radial-gradient(ellipse 60% 45% at 50% 40%, ${active !== null ? NODES[active].colorGlow.replace("0.5","0.06") : "rgba(56,189,248,0.04)"}, transparent)`,
          transition:'background 0.8s ease',
        }} />

        {/* Header */}
        <div style={{
          textAlign:'center', maxWidth:800, marginBottom:96, position:'relative', zIndex:2,
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(40px)',
          transition:'all 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <div style={{
            fontSize:11, letterSpacing:'0.25em', color:'#f97316', marginBottom:32,
            fontWeight:600, textTransform:'uppercase',
            background:'rgba(249,115,22,0.08)',
            border:'1px solid rgba(249,115,22,0.2)',
            borderRadius:999, padding:'8px 16px',
            display:'inline-block',
          }}>
            The Aziron Platform
          </div>
          <h2 style={{ fontSize:'clamp(48px,7vw,92px)', lineHeight:1.03, letterSpacing:'-0.035em', fontWeight:600, margin:0, marginBottom:32, color:'#0A2540' }}>
            A System That<br/>
            <span
              className="aziron-grad-text"
              style={{ ['--grad-end' as string]: activeColor }}
            >
              Executes Intelligence
            </span>
          </h2>
          <p style={{ color:'#1e293b', maxWidth:600, margin:'0 auto', fontSize:20, lineHeight:1.7, fontWeight:400 }}>
            Not just AI responses — Aziron orchestrates agents, systems, and decisions into real-world execution.
          </p>
        </div>

        {/* 3D Tilting Diagram */}
        <div style={{
          perspective:'1100px', position:'relative', zIndex:2,
          opacity: mounted ? 1 : 0,
          transition:'opacity 1.4s cubic-bezier(0.16,1,0.3,1) 0.3s',
        }}>
          <div style={{
            position:'relative', width:560, height:560,
            transform:`rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            transformStyle:'preserve-3d',
          }}>
            <svg width="560" height="560" viewBox="0 0 560 560" style={{ position:'absolute', inset:0 }}>
              <defs>
                <radialGradient id="cg-dark">
                  <stop offset="0%" stopColor={`${activeColor}20`} />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              <circle cx={CX} cy={CY} r="170" fill="url(#cg-dark)" />
              <circle cx={CX} cy={CY} r={RADIUS} fill="none" stroke="rgba(0,0,0,0.1)"
                strokeWidth="0.5" strokeDasharray="3 8" opacity={active !== null ? 0.4 : 0.8}
                style={{ transition:'opacity 0.5s' }}
              />
              <circle cx={CX} cy={CY} r={RADIUS * 0.68} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="0.3" opacity="0.6" />
              <circle cx={CX} cy={CY} r="88" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.3" opacity="0.5" />

              {/* Lines */}
              {NODES.map((node, i) => {
                const a = (node.angle * Math.PI) / 180
                const isA = active === i
                const dim = active !== null && !isA
                return <line key={i} x1={CX} y1={CY}
                  x2={CX + RADIUS * Math.cos(a)} y2={CY + RADIUS * Math.sin(a)}
                  stroke={isA ? node.color : 'rgba(0,0,0,0.1)'}
                  strokeWidth={isA ? 1.5 : 0.4}
                  opacity={dim ? 0.04 : isA ? 1 : 0.3}
                  style={{ transition:'all 0.5s cubic-bezier(0.16,1,0.3,1)' }}
                />
              })}

              {/* Particles */}
              {particles.map((p, i) => {
                const n = NODES[p.nodeIdx]
                const a = (n.angle * Math.PI) / 180
                return <circle key={i}
                  cx={CX + RADIUS * p.t * Math.cos(a)}
                  cy={CY + RADIUS * p.t * Math.sin(a)}
                  r={p.size} fill={n.color} opacity={p.life * 0.8}
                />
              })}

              {/* Orbit dots */}
              {[0, 0.33, 0.66].map((off, idx) => {
                const a = t * 0.55 + off * Math.PI * 2
                return <circle key={idx}
                  cx={CX + RADIUS * Math.cos(a)} cy={CY + RADIUS * Math.sin(a)}
                  r={idx === 0 ? 2.5 : 1.5} fill={activeColor}
                  opacity={idx === 0 ? 0.8 : 0.35}
                />
              })}
            </svg>

            {/* Core */}
            <div style={{
              position:'absolute', left:'50%', top:'50%',
              transform:'translate(-50%,-50%) translateZ(20px)',
              width:144, height:144, borderRadius:'50%',
              background:'rgba(255,255,255,0.95)',
              border:`1.5px solid ${active !== null ? NODES[active].color+"40" : "rgba(37,99,235,0.2)"}`,
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:`0 4px 30px ${active !== null ? NODES[active].colorGlow.replace('0.5','0.15') : 'rgba(37,99,235,0.08)'}, 0 0 0 8px rgba(255,255,255,0.5)`,
              zIndex:10, transition:'border-color 0.5s, box-shadow 0.5s',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/aziron-icon.svg" alt="Aziron" style={{ width:64, height:'auto', display:'block' }} />
              {active === null && (
                <>
                  <div style={{ position:'absolute', inset:-8, borderRadius:'50%', border:'1px solid rgba(56,189,248,0.15)', animation:'breathe 3s ease-in-out infinite', pointerEvents:'none' }} />
                  <div style={{ position:'absolute', inset:-22, borderRadius:'50%', border:'1px solid rgba(56,189,248,0.07)', animation:'breathe 3s ease-in-out infinite 0.7s', pointerEvents:'none' }} />
                </>
              )}
            </div>

            {/* Nodes */}
            {NODES.map((node, i) => {
              const a   = (node.angle * Math.PI) / 180
              const bx  = RADIUS * Math.cos(a)
              const by  = RADIUS * Math.sin(a)
              const isA = active === i
              const dim = active !== null && !isA
              return (
                <div key={i}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  style={{
                    position:'absolute', left:'50%', top:'50%',
                    transform:`translate(-50%,-50%) translate(${bx + sm.x*5}px,${by + sm.y*5}px) translateZ(${isA?35:10}px) scale(${isA?1.08:1})`,
                    opacity: dim ? 0.1 : 1,
                    transition:'all 0.55s cubic-bezier(0.16,1,0.3,1)',
                    cursor:'pointer', zIndex: isA ? 20 : 5, width:150, textAlign:'center',
                  }}
                >
                  <div style={{
                    width: isA ? 18 : 9, height: isA ? 18 : 9,
                    borderRadius:'50%', margin:'0 auto 10px',
                    background: isA ? node.color : 'rgba(0,0,0,0.12)',
                    boxShadow: isA ? `0 0 24px ${node.colorGlow}, 0 0 60px ${node.colorGlow.replace('0.5','0.2')}` : 'none',
                    transition:'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                    border: isA ? `2.5px solid ${node.color}` : 'none',
                  }} />
                  <div style={{ fontSize:13, fontWeight:600, letterSpacing:'-0.01em', marginBottom:3, color: isA ? node.color : '#475569', transition:'color 0.3s' }}>
                    {node.title}
                  </div>
                  <div style={{ fontSize:12, color:'#4b5563', lineHeight:1.45, fontWeight:400 }}>
                    {node.desc}
                  </div>
                  {isA && (
                    <div style={{
                      marginTop:14, padding:'12px 16px',
                      background:'rgba(255,255,255,0.95)',
                      backdropFilter:'blur(20px)',
                      borderRadius:12,
                      border:`1px solid ${node.color}30`,
                      boxShadow:`0 8px 32px rgba(0,0,0,0.1), 0 0 20px ${node.colorGlow.replace('0.5','0.1')}`,
                      animation:'fadeUp 0.4s cubic-bezier(0.16,1,0.3,1)',
                    }}>
                      <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
                        <div style={{ width:6, height:6, borderRadius:'50%', background:node.color, animation:'pulse 2s infinite' }} />
                        <div style={{ fontSize:10, color:node.color, fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase' }}>Active</div>
                      </div>
                      <div style={{ fontSize:11, color:'#64748B', lineHeight:1.55 }}>
                        Real-time orchestration with full audit trail and rollback.
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display:'flex', gap:48, marginTop:72, position:'relative', zIndex:2,
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition:'all 1.2s cubic-bezier(0.16,1,0.3,1) 0.6s',
        }}>
          {[['5','Active Nodes'],['<20ms','Latency'],['99.99%','Uptime']].map(([v,l],i) => (
            <div key={i} style={{ textAlign:'center' }}>
              <div style={{ fontSize:20, fontWeight:600, letterSpacing:'-0.03em', color:'#0a2540' }}>{v}</div>
              <div style={{ fontSize:10, color:'#4b5563', letterSpacing:'0.14em', marginTop:5, textTransform:'uppercase' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background:'linear-gradient(to bottom, transparent, #ffffff)' }}
      />
    </section>
  )
}
