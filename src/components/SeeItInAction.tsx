'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'

const slides = [
  {
    num: '01',
    type: 'video' as const,
    src: '/fusion-x-demo.mp4',
    tabTitle: 'Fusion X',
    wordmark: 'FUSION X',
    title: 'VS Code Plugin for\nCode & Test Automation',
    description:
      'Supercharge your development workflow with AI-assisted code generation, automated testing, and intelligent refactoring directly inside VS Code.',
    bullets: [
      'Inline AI code suggestions & auto-completion',
      'One-click test generation for any function or class',
      'Smart refactoring with impact analysis across the codebase',
    ],
    accentColor: '#60a5fa',
    accentRGB: '96, 165, 250',
    stats: [
      { val: '+40%', label: 'faster dev cycles' },
      { val: '3×', label: 'test coverage boost' },
    ],
  },
  {
    num: '02',
    type: 'video' as const,
    src: '/incident-rca-demo.mp4',
    tabTitle: 'Incident RCA',
    wordmark: 'INCIDENT',
    title: 'AI-Powered Incident\nHandling & Root Cause Analysis',
    description:
      'Detect, triage, and resolve incidents at machine speed — with AI agents that trace root causes and orchestrate remediation end-to-end.',
    bullets: [
      'Automated correlation across logs, metrics & traces',
      'AI-generated RCA reports with step-by-step evidence',
      'Auto-remediation playbooks triggered on detection',
    ],
    accentColor: '#f97316',
    accentRGB: '249, 115, 22',
    stats: [
      { val: '↓90%', label: 'MTTR reduction' },
      { val: '<2m', label: 'root cause detection' },
    ],
  },
  {
    num: '03',
    type: 'image' as const,
    src: '/enterprise-rag-demo.png',
    tabTitle: 'Enterprise RAG',
    wordmark: 'RAG',
    title: 'RAG for Querying\nEnterprise Documents',
    description:
      'Unlock the knowledge locked in your enterprise documents — ask in natural language, get precise cited answers via Retrieval-Augmented Generation.',
    bullets: [
      'Connects to SharePoint, Confluence, Google Drive & more',
      'Grounded responses with source citations for every answer',
      'Fine-grained access controls ensure data privacy at all times',
    ],
    accentColor: '#a78bfa',
    accentRGB: '167, 139, 250',
    stats: [
      { val: 'SOC2', label: 'certified compliant' },
      { val: '100+', label: 'file formats supported' },
    ],
  },
]

export default function SeeItInAction() {
  const ref     = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 50, damping: 20 })

  // ── Slide content opacities ──
  // Slide 1 starts visible immediately, fades out at 28-36%
  const s1o = useTransform(smooth, [0, 0.28, 0.36], [1, 1, 0])
  // Slide 2 fades in 30-38%, active 38-62%, out 62-70%
  const s2o = useTransform(smooth, [0.30, 0.38, 0.62, 0.70], [0, 1, 1, 0])
  // Slide 3 fades in 64-74%, stays active to end
  const s3o = useTransform(smooth, [0.64, 0.74, 1.0], [0, 1, 1])

  // ── Y offsets for entering slides ──
  const s2y = useTransform(smooth, [0.30, 0.42], reduced ? [0, 0] : [52, 0])
  const s3y = useTransform(smooth, [0.64, 0.76], reduced ? [0, 0] : [52, 0])

  // ── Ambient background (same rhythm as content) ──
  const bg1 = useTransform(smooth, [0, 0.28, 0.36], [1, 1, 0])
  const bg2 = useTransform(smooth, [0.30, 0.38, 0.62, 0.70], [0, 1, 1, 0])
  const bg3 = useTransform(smooth, [0.64, 0.74, 1.0], [0, 1, 1])

  // ── Frame scale (initial entrance) ──
  const frameScale = useTransform(smooth, [0, 0.10], reduced ? [1, 1] : [0.94, 1])

  // ── Wordmark opacity (very dim glow behind frame) ──
  const wm1 = useTransform(s1o, [0, 1], [0, 0.045])
  const wm2 = useTransform(s2o, [0, 1], [0, 0.045])
  const wm3 = useTransform(s3o, [0, 1], [0, 0.045])

  // ── Stat chip Y (spring up when slide activates) ──
  const c1y = useTransform(s1o, [0, 1], reduced ? [0, 0] : [28, 0])
  const c2y = useTransform(s2o, [0, 1], reduced ? [0, 0] : [28, 0])
  const c3y = useTransform(s3o, [0, 1], reduced ? [0, 0] : [28, 0])

  const opacities  = [s1o, s2o, s3o]
  const bgLayers   = [bg1, bg2, bg3]
  const wmLayers   = [wm1, wm2, wm3]
  const chipYs     = [c1y, c2y, c3y]
  const slideYs    = [undefined, s2y, s3y] as const

  const jumpToSlide = (i: number) => {
    if (!ref.current) return
    const top = ref.current.getBoundingClientRect().top + window.scrollY
    const h   = ref.current.scrollHeight - window.innerHeight
    window.scrollTo({ top: top + h * [0.02, 0.38, 0.72][i], behavior: 'smooth' })
  }

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ height: '280vh', background: '#0A0A0F' }}
    >
      {/* ── AMBIENT COLOR LAYERS ── */}
      {slides.map((slide, i) => (
        <motion.div
          key={i}
          style={{ opacity: bgLayers[i] }}
          className="absolute inset-0 pointer-events-none"
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 75% 60% at 72% 50%, rgba(${slide.accentRGB}, 0.10) 0%, transparent 70%)`,
            }}
          />
        </motion.div>
      ))}

      {/* ── NOISE GRAIN OVERLAY ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          opacity: 0.018,
        }}
      />

      {/* ══════════════════════════════════════════════════
          STICKY PANEL
      ══════════════════════════════════════════════════ */}
      <div className="sticky top-0 h-screen flex items-center px-8 md:px-14 lg:px-20 gap-10 lg:gap-16 z-10 overflow-hidden">

        {/* ────────────────────────── LEFT 40% ─────────────────────────── */}
        <div className="w-full md:w-[40%] flex-shrink-0">

          {/* Section label */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-5 h-px bg-white/20" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/35">
              Platform Capabilities
            </p>
          </div>

          {/* ── NUMBER NAV ── */}
          <div className="flex border-t border-white/[0.07] mb-12">
            {slides.map((slide, i) => (
              <button
                key={i}
                onClick={() => jumpToSlide(i)}
                className="flex-1 pt-5 pb-4 text-left relative group border-r border-white/[0.05] last:border-r-0"
              >
                {/* Animated top-line fill */}
                <motion.div
                  className="absolute top-0 left-0 h-[1.5px] w-full origin-left"
                  style={{ background: slide.accentColor, scaleX: opacities[i] }}
                />
                {/* Number — dim ghost always visible, colored on active */}
                <div className="relative mb-2 leading-none">
                  <span className="block text-[4.5rem] font-black text-white/[0.07] leading-none select-none tabular-nums">
                    {slide.num}
                  </span>
                  <motion.span
                    className="absolute top-0 left-0 text-[4.5rem] font-black leading-none select-none tabular-nums"
                    style={{ color: slide.accentColor, opacity: opacities[i] }}
                  >
                    {slide.num}
                  </motion.span>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/25 group-hover:text-white/55 transition-colors duration-200">
                  {slide.tabTitle}
                </span>
              </button>
            ))}
          </div>

          {/* ── SLIDE CONTENT ── */}
          <div className="relative" style={{ minHeight: 360 }}>
            {slides.map((slide, i) => (
              <motion.div
                key={i}
                style={{
                  opacity: opacities[i],
                  y: slideYs[i] ?? 0,
                  pointerEvents: 'none',
                }}
                className="absolute inset-0 w-full"
              >
                <h2
                  className="font-bold tracking-tight text-white leading-[1.08] mb-5 whitespace-pre-line"
                  style={{ fontSize: 'clamp(2rem, 3.2vw, 3.25rem)' }}
                >
                  {slide.title}
                </h2>
                <p className="text-white/45 text-base leading-relaxed mb-7 max-w-md">
                  {slide.description}
                </p>
                <ul className="space-y-3.5">
                  {slide.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div
                        className="w-[5px] h-[5px] rounded-full mt-[9px] flex-shrink-0"
                        style={{ background: slide.accentColor, boxShadow: `0 0 6px ${slide.accentColor}` }}
                      />
                      <span className="text-white/55 text-sm leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ────────────────────────── RIGHT 60% ─────────────────────────── */}
        <div className="hidden md:block relative flex-1 h-[76vh]">

          {/* Background wordmarks */}
          {slides.map((slide, i) => (
            <motion.div
              key={i}
              style={{ opacity: wmLayers[i] }}
              className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
            >
              <span
                className="font-black text-white select-none whitespace-nowrap"
                style={{ fontSize: '17vw', lineHeight: 1, letterSpacing: '-0.05em' }}
              >
                {slide.wordmark}
              </span>
            </motion.div>
          ))}

          {/* ── FLOATING STAT CHIPS ── */}
          {slides.map((slide, i) => (
            <motion.div
              key={i}
              style={{ opacity: opacities[i], y: chipYs[i], pointerEvents: 'none' }}
              className="absolute inset-0"
            >
              {/* Chip A — top-right, outside frame */}
              <div
                className="absolute flex flex-col gap-0.5 rounded-2xl px-4 py-3 z-30"
                style={{
                  top: 20,
                  right: -10,
                  background: 'rgba(14, 14, 22, 0.85)',
                  backdropFilter: 'blur(16px)',
                  border: `1px solid rgba(${slide.accentRGB}, 0.25)`,
                  boxShadow: `0 8px 40px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(${slide.accentRGB}, 0.15) inset`,
                }}
              >
                <span
                  className="text-[1.6rem] font-black leading-none"
                  style={{ color: slide.accentColor }}
                >
                  {slide.stats[0].val}
                </span>
                <span className="text-[11px] text-white/40 whitespace-nowrap mt-0.5">
                  {slide.stats[0].label}
                </span>
              </div>
              {/* Chip B — bottom-left, outside frame */}
              <div
                className="absolute flex flex-col gap-0.5 rounded-2xl px-4 py-3 z-30"
                style={{
                  bottom: 44,
                  left: -14,
                  background: 'rgba(14, 14, 22, 0.85)',
                  backdropFilter: 'blur(16px)',
                  border: `1px solid rgba(${slide.accentRGB}, 0.25)`,
                  boxShadow: `0 8px 40px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(${slide.accentRGB}, 0.15) inset`,
                }}
              >
                <span
                  className="text-[1.6rem] font-black leading-none"
                  style={{ color: slide.accentColor }}
                >
                  {slide.stats[1].val}
                </span>
                <span className="text-[11px] text-white/40 whitespace-nowrap mt-0.5">
                  {slide.stats[1].label}
                </span>
              </div>
            </motion.div>
          ))}

          {/* ── BROWSER CHROME FRAME ── */}
          <motion.div
            style={{
              scale: frameScale,
              background: '#0f0f18',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 48px 140px rgba(0,0,0,0.95), 0 0 0 0.5px rgba(255,255,255,0.04) inset',
            }}
            className="absolute inset-0 flex flex-col rounded-2xl overflow-hidden"
          >
            {/* Title bar */}
            <div
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0 border-b border-white/[0.05]"
              style={{ background: '#0a0a12' }}
            >
              {/* Traffic lights */}
              <div className="flex gap-[5px] flex-shrink-0">
                <div className="w-[11px] h-[11px] rounded-full" style={{ background: '#FF5F57' }} />
                <div className="w-[11px] h-[11px] rounded-full" style={{ background: '#FFBD2E' }} />
                <div className="w-[11px] h-[11px] rounded-full" style={{ background: '#28C840' }} />
              </div>
              {/* URL bar */}
              <div className="flex-1 flex justify-center px-3">
                <div
                  className="flex items-center gap-2 rounded-md px-3 py-[5px] w-full max-w-[220px]"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  {/* Lock icon */}
                  <svg width="9" height="10" viewBox="0 0 9 10" fill="none" className="flex-shrink-0">
                    <rect x="1" y="4.5" width="7" height="5" rx="1" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                    <path d="M2.5 4.5V3a2 2 0 0 1 4 0v1.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                  </svg>
                  <span className="text-[11px] text-white/25 truncate">aziron.ai</span>
                </div>
              </div>
              {/* Tab dots */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {[...Array(3)].map((_, k) => (
                  <div key={k} className="w-[3px] h-[3px] rounded-full bg-white/15" />
                ))}
              </div>
            </div>

            {/* ── MEDIA AREA ── */}
            <div className="relative flex-1 overflow-hidden" style={{ background: '#07070e' }}>
              {slides.map((slide, i) => (
                <motion.div
                  key={i}
                  style={{ opacity: opacities[i] }}
                  className="absolute inset-0"
                >
                  {slide.type === 'video' ? (
                    <video
                      src={slide.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={slide.src}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </motion.div>
              ))}

              {/* Scan line — subtle, slow */}
              <motion.div
                className="absolute left-0 right-0 h-px pointer-events-none z-10"
                style={{
                  background:
                    'linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)',
                }}
                animate={{ y: ['-2%', '102%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 5 }}
              />

              {/* Bottom vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
