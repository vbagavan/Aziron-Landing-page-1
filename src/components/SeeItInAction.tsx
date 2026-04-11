'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

type Slide = {
  type: 'video' | 'image'
  src: string
  logo: string
  tabTitle: string
  title: string
  description: string
  bullets: string[]
}

const slides: Slide[] = [
  {
    type: 'video',
    src: '/fusion-x-demo.mp4',
    logo: 'https://cdn.simpleicons.org/visualstudiocode/ffffff',
    tabTitle: 'Fusion X',
    title: 'Fusion X — VS Code Plugin for Code & Test Automation',
    description: 'Supercharge your development workflow with AI-assisted code generation, automated testing, and intelligent refactoring directly inside VS Code.',
    bullets: [
      'Inline AI code suggestions & auto-completion',
      'One-click test generation for any function or class',
      'Smart refactoring with impact analysis across the codebase',
    ],
  },
  {
    type: 'video',
    src: '/incident-rca-demo.mp4',
    logo: 'https://cdn.simpleicons.org/pagerduty/ffffff',
    tabTitle: 'Incident RCA',
    title: 'AI Powered Incident Handling & Root Cause Analysis (RCA)',
    description: 'Detect, triage, and resolve incidents at machine speed — with AI agents that trace root causes and orchestrate remediation end-to-end.',
    bullets: [
      'Automated incident correlation across logs, metrics & traces',
      'AI-generated RCA reports with step-by-step evidence',
      'Auto-remediation playbooks triggered on incident detection',
    ],
  },
  {
    type: 'image',
    src: '/enterprise-rag-demo.png',
    logo: 'https://cdn.simpleicons.org/elasticsearch/ffffff',
    tabTitle: 'Enterprise RAG',
    title: 'RAG for Querying Enterprise Documents Using Gen AI',
    description: 'Unlock the knowledge locked in your enterprise documents — ask questions in natural language and get precise, cited answers powered by Retrieval-Augmented Generation.',
    bullets: [
      'Connects to SharePoint, Confluence, Google Drive & more',
      'Grounded responses with source citations for every answer',
      'Fine-grained access controls ensure data privacy at all times',
    ],
  },
]

export default function SeeItInAction() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const smooth = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
  })

  /* ----------------------------------- */
  /* CLEAN NON-OVERLAPPING SLIDE RANGES  */
  /* Scroll divided into thirds:         */
  /*  Slide 1: 0.00 – 0.33              */
  /*  Slide 2: 0.33 – 0.66              */
  /*  Slide 3: 0.66 – 1.00              */
  /* ----------------------------------- */

  // Slide 1 — Fusion X: visible 0→0.28, fade out 0.28→0.36
  const fusionOpacity = useTransform(smooth, [0, 0.28, 0.36], [1, 1, 0])

  // Slide 2 — Incident RCA: fade in 0.36→0.44, hold, fade out 0.56→0.64
  const incidentOpacity = useTransform(smooth, [0.36, 0.44, 0.56, 0.64], [0, 1, 1, 0])
  const incidentEnterY = useTransform(smooth, [0.36, 0.44], [20, 0])

  // Slide 3 — Enterprise RAG: fade in 0.64→0.72, hold to end
  const ragOpacity = useTransform(smooth, [0.64, 0.72], [0, 1])
  const ragEnterY = useTransform(smooth, [0.64, 0.72], [20, 0])

  /* AI PULSE EFFECT */
  const pulseOpacity = useTransform(smooth, [0.42, 0.55], [0, 1])

  /* CAMERA ZOOM */
  const containerScale = useTransform(smooth, [0, 1], [0.97, 1])
  const containerY = useTransform(smooth, [0, 1], [40, 0])

  /* TITLE TRANSITIONS — mirror media transitions exactly */
  const title1Opacity = useTransform(smooth, [0, 0.28, 0.36], [1, 1, 0])
  const title2Opacity = useTransform(smooth, [0.36, 0.44, 0.56, 0.64], [0, 1, 1, 0])
  const title3Opacity = useTransform(smooth, [0.64, 0.72], [0, 1])

  return (
    <section ref={ref} className="h-[400vh] bg-[#F6F6F3] relative">
      <div className="sticky top-0 h-screen flex items-center justify-between px-20 gap-16">

        {/* LEFT SIDE — TITLES & DESCRIPTIONS */}
        <div className="w-[30%] flex-shrink-0 z-10">

          {/* Section Label */}
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-6">
            Platform Capabilities
          </p>

          {/* Stacked text panels — relative container holds absolute children */}
          <div className="relative min-h-[320px]">

            {/* SLIDE 1: Fusion X */}
            <motion.div style={{ opacity: title1Opacity }} className="absolute inset-0 w-full">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-4 leading-snug">
                {slides[0].title}
              </h2>
              <p className="text-gray-700 text-base leading-relaxed mb-6">
                {slides[0].description}
              </p>
              <ul className="space-y-3">
                {slides[0].bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 16 16">
                      <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-700 text-base leading-relaxed">{bullet}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* SLIDE 2: Incident RCA */}
            <motion.div style={{ opacity: title2Opacity }} className="absolute inset-0 w-full">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-4 leading-snug">
                {slides[1].title}
              </h2>
              <p className="text-gray-700 text-base leading-relaxed mb-6">
                {slides[1].description}
              </p>
              <ul className="space-y-3">
                {slides[1].bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 16 16">
                      <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-700 text-base leading-relaxed">{bullet}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* SLIDE 3: Enterprise RAG */}
            <motion.div style={{ opacity: title3Opacity }} className="absolute inset-0 w-full">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-4 leading-snug">
                {slides[2].title}
              </h2>
              <p className="text-gray-700 text-base leading-relaxed mb-6">
                {slides[2].description}
              </p>
              <ul className="space-y-3">
                {slides[2].bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 16 16">
                      <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-gray-700 text-base leading-relaxed">{bullet}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>

        {/* RIGHT SIDE — MEDIA CONTAINER */}
        <motion.div
          style={{ scale: containerScale, y: containerY }}
          className="relative w-[70%] h-[75vh] bg-white border border-black/10 rounded-2xl shadow-2xl overflow-hidden"
        >
          
          {/* AI PULSE EFFECT */}
          <motion.div
            style={{ opacity: pulseOpacity }}
            className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,140,0,0.12),transparent_70%)] pointer-events-none z-10"
          />

          {/* FUSION X — VIDEO */}
          <motion.div
            style={{ opacity: fusionOpacity }}
            className="absolute inset-0"
          >
            <video
              src={slides[0].src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* INCIDENT RCA — VIDEO */}
          <motion.div
            style={{ opacity: incidentOpacity, y: incidentEnterY }}
            className="absolute inset-0"
          >
            <video
              src={slides[1].src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* ENTERPRISE RAG — IMAGE */}
          <motion.div
            style={{ opacity: ragOpacity, y: ragEnterY }}
            className="absolute inset-0"
          >
            <img
              src={slides[2].src}
              alt={slides[2].title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Subtle bottom gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  )
}
