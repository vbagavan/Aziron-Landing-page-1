'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'

type Slide = {
  type: 'video' | 'image'
  src: string
  tabTitle: string
  title: string
  description: string
  bullets: string[]
  accentColor: string
}

const slides: Slide[] = [
  {
    type: 'video',
    src: '/fusion-x-demo.mp4',
    tabTitle: 'Fusion X',
    title: 'Fusion X — VS Code Plugin for Code & Test Automation',
    description: 'Supercharge your development workflow with AI-assisted code generation, automated testing, and intelligent refactoring directly inside VS Code.',
    bullets: [
      'Inline AI code suggestions & auto-completion',
      'One-click test generation for any function or class',
      'Smart refactoring with impact analysis across the codebase',
    ],
    accentColor: '#60a5fa',
  },
  {
    type: 'video',
    src: '/incident-rca-demo.mp4',
    tabTitle: 'Incident RCA',
    title: 'AI Powered Incident Handling & Root Cause Analysis (RCA)',
    description: 'Detect, triage, and resolve incidents at machine speed — with AI agents that trace root causes and orchestrate remediation end-to-end.',
    bullets: [
      'Automated incident correlation across logs, metrics & traces',
      'AI-generated RCA reports with step-by-step evidence',
      'Auto-remediation playbooks triggered on incident detection',
    ],
    accentColor: '#f97316',
  },
  {
    type: 'image',
    src: '/enterprise-rag-demo.png',
    tabTitle: 'Enterprise RAG',
    title: 'RAG for Querying Enterprise Documents Using Gen AI',
    description: 'Unlock the knowledge locked in your enterprise documents — ask questions in natural language and get precise, cited answers powered by Retrieval-Augmented Generation.',
    bullets: [
      'Connects to SharePoint, Confluence, Google Drive & more',
      'Grounded responses with source citations for every answer',
      'Fine-grained access controls ensure data privacy at all times',
    ],
    accentColor: '#a78bfa',
  },
]

export default function SeeItInAction() {
  const ref     = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })

  /* Slide transitions — same clean non-overlapping thirds */
  const fusionOpacity   = useTransform(smooth, [0, 0.28, 0.36],         [1, 1, 0])
  const incidentOpacity = useTransform(smooth, [0.36, 0.44, 0.56, 0.64],[0, 1, 1, 0])
  const ragOpacity      = useTransform(smooth, [0.64, 0.72],             [0, 1])
  const incidentY       = useTransform(smooth, [0.36, 0.44],             [30, 0])
  const ragY            = useTransform(smooth, [0.64, 0.72],             [30, 0])

  /* Title transitions */
  const title1Opacity = useTransform(smooth, [0, 0.28, 0.36],         [1, 1, 0])
  const title2Opacity = useTransform(smooth, [0.36, 0.44, 0.56, 0.64],[0, 1, 1, 0])
  const title3Opacity = useTransform(smooth, [0.64, 0.72],             [0, 1])

  /* Container enter */
  const containerScale = useTransform(smooth, [0, 0.15], [0.96, 1])
  const containerY     = useTransform(smooth, [0, 0.15], [30, 0])

  /* Background parallax (outer layer, 0.15x) */
  const bgY = useTransform(scrollYProgress, [0,1], reduced ? ["0%","0%"] : ["-10%","10%"])

  /* Active slide accent colour */
  const activeSlide = useTransform(smooth, [0, 0.36, 0.64, 1], [0, 1, 2, 2])

  return (
    <section
      ref={ref}
      className="relative bg-white"
      style={{ height: "400vh" }}
    >
      {/* ── LAYER 1: Background parallax orbs ── */}
      <motion.div
        style={{ y: bgY }}
        className="sticky top-0 h-screen absolute inset-0 pointer-events-none gpu-layer overflow-hidden"
      >
        <div
          className="absolute top-[10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-40"
          style={{ background:"radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)", filter:"blur(80px)", animation:"nebulaDrift 25s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-[15%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-40"
          style={{ background:"radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)", filter:"blur(80px)", animation:"blobDrift 20s ease-in-out infinite 5s" }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:"linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px)",
            backgroundSize:"72px 72px",
          }}
        />
      </motion.div>

      {/* ── Sticky panel ── */}
      <div className="sticky top-0 h-screen flex items-center justify-between px-8 md:px-16 lg:px-20 gap-12 z-10">

        {/* LEFT — titles */}
        <div className="w-full md:w-[35%] flex-shrink-0">
          <motion.p
            className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-600 mb-8"
            initial={{ opacity:0, x:-20 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.6 }}
          >
            Platform Capabilities
          </motion.p>

          {/* Tab indicators */}
          <div className="flex gap-4 mb-16">
            {slides.map((s, i) => (
              <motion.div
                key={i}
                className="h-0.5 rounded-full flex-1 transition-all duration-500"
                style={{ background: s.accentColor, opacity: 0.25 }}
              />
            ))}
          </div>

          <div className="relative min-h-[360px]">
            {slides.map((slide, i) => {
              const opacity = [title1Opacity, title2Opacity, title3Opacity][i]
              return (
                <motion.div
                  key={i}
                  style={{ opacity, pointerEvents: "none" }}
                  className="absolute inset-0 w-full"
                >
                  <div
                    className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-8 border"
                    style={{
                      color: slide.accentColor,
                      background: `${slide.accentColor}15`,
                      borderColor: `${slide.accentColor}30`,
                    }}
                  >
                    {slide.tabTitle}
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-aziron-dark mb-8 leading-snug">
                    {slide.title}
                  </h2>
                  <p className="text-aziron-text-soft text-lg leading-relaxed mb-8 max-w-xl">
                    {slide.description}
                  </p>
                  <ul className="space-y-6">
                    {slide.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex-shrink-0 mt-1 flex items-center justify-center"
                          style={{ background: `${slide.accentColor}20` }}
                        >
                          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 10 10">
                            <path d="M2 5l2.5 2.5L8 3" stroke={slide.accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <p className="text-aziron-text-soft text-base leading-relaxed max-w-md">{b}</p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* RIGHT — media container */}
        <motion.div
          style={{ scale: containerScale, y: containerY }}
          className="hidden md:block relative w-[65%] h-[75vh] rounded-2xl overflow-hidden"
          aria-hidden="true"
          role="presentation"
        >
          {/* Glass frame */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(4px)",
              zIndex: 20,
              pointerEvents: "none",
            }}
          />

          {/* Glow rim */}
          <div
            className="absolute -inset-px rounded-2xl opacity-30 pointer-events-none z-20"
            style={{ boxShadow:"inset 0 0 40px rgba(37,99,235,0.15)" }}
          />

          {/* Corner accents */}
          {['top-0 left-0','top-0 right-0','bottom-0 left-0','bottom-0 right-0'].map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} w-6 h-6 border-2 z-30 pointer-events-none`}
              style={{
                borderColor: "rgba(56,189,248,0.4)",
                borderRadius: i === 0 ? "12px 0 0 0" : i === 1 ? "0 12px 0 0" : i === 2 ? "0 0 0 12px" : "0 0 12px 0",
                borderRight: i === 0 || i === 2 ? "none" : undefined,
                borderLeft:  i === 1 || i === 3 ? "none" : undefined,
                borderBottom:i === 0 || i === 1 ? "none" : undefined,
                borderTop:   i === 2 || i === 3 ? "none" : undefined,
              }}
            />
          ))}

          {/* FUSION X — video */}
          <motion.div style={{ opacity: fusionOpacity }} className="absolute inset-0">
            <video src={slides[0].src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
          </motion.div>

          {/* INCIDENT RCA — video */}
          <motion.div style={{ opacity: incidentOpacity, y: incidentY }} className="absolute inset-0">
            <video src={slides[1].src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
          </motion.div>

          {/* ENTERPRISE RAG — image */}
          <motion.div style={{ opacity: ragOpacity, y: ragY }} className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slides[2].src} alt={slides[2].title} className="w-full h-full object-cover" />
          </motion.div>

          {/* Scan line overlay */}
          <motion.div
            className="absolute left-0 right-0 h-px pointer-events-none z-20"
            style={{ background:"linear-gradient(to right, transparent, rgba(56,189,248,0.3), transparent)" }}
            animate={{ y:["-2%","102%"] }}
            transition={{ duration:4, repeat:Infinity, ease:"linear", repeatDelay:2 }}
          />

          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  )
}
