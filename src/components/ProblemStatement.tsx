'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { RetroGrid } from '@/components/ui/retro-grid'

/* ── Pairs: positive confidence → negative reality ── */
const PAIRS = [
  { can: 'It can analyze your systems',  but: 'But it never updates them'   },
  { can: 'It can detect issues',         but: 'But it never resolves them'  },
  { can: 'It can suggest actions',       but: 'But it never executes them'  },
]

export default function ProblemStatement() {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white text-[#0F172A]"
    >
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Retro Grid — stronger opacity, wider mask */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 80%, transparent 100%)',
          }}
        >
          <RetroGrid opacity={0.55} angle={64} cellSize={70} lightLineColor="#94a3b8" />
        </div>
      </motion.div>

      {/* ── Flow Diagram — larger, more dramatic ── */}
      <div className="absolute bottom-[24%] left-0 right-0 flex justify-center pointer-events-none">
        <div className="relative w-[800px] max-w-[92vw] h-[80px]">

          {/* Labels */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] tracking-[0.35em] font-medium text-slate-400 uppercase">
            Input
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] tracking-[0.35em] font-medium text-slate-300 uppercase">
            System
          </div>

          {/* SVG line + pulses */}
          <svg
            className="absolute left-[64px] top-1/2 -translate-y-1/2 overflow-visible"
            style={{ width: 'calc(100% - 128px)', height: '2px' }}
            viewBox="0 0 100 2"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="lineLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(100,116,139,0.5)" />
                <stop offset="100%" stopColor="rgba(100,116,139,0.1)" />
              </linearGradient>
              <linearGradient id="lineRight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(100,116,139,0.1)" />
                <stop offset="100%" stopColor="rgba(100,116,139,0.05)" />
              </linearGradient>
            </defs>
            {/* Left segment */}
            <line x1="0" y1="1" x2="48%" y2="1" stroke="url(#lineLeft)" strokeWidth="1.5" />
            {/* Right segment — faded, signal lost */}
            <line x1="52%" y1="1" x2="100%" y2="1" stroke="url(#lineRight)" strokeWidth="1.5" strokeDasharray="3 4" />
            {/* Pulses — only travel left half */}
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                cy={1} r={1.5}
                fill="#64748b"
                animate={{ cx: ['2%', '46%'], opacity: [0, 0.9, 0.9, 0] }}
                transition={{ duration: 2, delay: i * 0.65, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </svg>

          {/* Break point — larger glow */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* outer ring */}
            <motion.div
              className="absolute -inset-3 rounded-full border border-orange-400/30"
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
            {/* mid ring */}
            <motion.div
              className="absolute -inset-1.5 rounded-full bg-orange-500/10"
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
            />
            {/* core dot */}
            <motion.div
              className="relative w-5 h-5 bg-orange-500 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 0px rgba(249,115,22,0.3)',
                  '0 0 20px rgba(249,115,22,0.7)',
                  '0 0 0px rgba(249,115,22,0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          {/* Failure particles — travel further */}
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2
            const dist = 18 + (i % 3) * 8
            return (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 w-1.5 h-1.5 bg-orange-400 rounded-full"
                style={{ marginLeft: '-3px', marginTop: '-3px' }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 1 }}
                animate={{
                  x: [0, Math.cos(angle) * dist],
                  y: [0, Math.sin(angle) * dist],
                  opacity: [0, 0.9, 0],
                  scale: [1, 0.5],
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.8 + i * 0.08,
                  repeat: Infinity,
                  repeatDelay: 1.3,
                  ease: 'easeOut',
                }}
              />
            )
          })}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-24">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-5"
        >
          <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.4em] text-orange-600 uppercase font-semibold">
            <span className="w-1 h-1 rounded-full bg-orange-500 inline-block" />
            The Problem
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[38px] md:text-[68px] leading-[1.06] font-light tracking-tight"
        >
          AI understands everything
          <br />
          <span className="text-slate-400">but changes nothing</span>
        </motion.h2>

        {/* ── Pairs — single glass panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 max-w-lg mx-auto rounded-2xl px-8 py-7"
          style={{
            background: 'rgba(255,255,255,0.52)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.7)',
            boxShadow: '0 8px 32px rgba(99,120,160,0.10), 0 1px 0 rgba(255,255,255,0.8) inset',
          }}
        >
        <div className="space-y-3">
          {PAIRS.map((pair, pi) => (
            <div key={pi}>
              {/* Positive line — dark, confident */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: pi * 0.45 }}
                className="flex items-center justify-center gap-2.5 text-base md:text-lg font-semibold text-slate-800"
              >
                <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M4.5 7L6.5 9L9.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {pair.can}
              </motion.div>

              {/* Negative line — muted, delayed with animated strikethrough */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: pi * 0.45 + 0.25 }}
                className="flex items-center justify-center gap-2.5 mt-1.5 text-base md:text-lg text-slate-400"
              >
                <svg className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M5 5L9 9M9 5L5 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                <span className="relative">
                  {pair.but}
                  {/* Animated strikethrough line */}
                  <motion.span
                    className="absolute left-0 top-1/2 h-[1.5px] bg-orange-400/70 block"
                    style={{ originX: 0 }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: pi * 0.45 + 0.55, ease: [0.16, 1, 0.3, 1] }}
                  />
                </span>
              </motion.div>

              {/* Divider between pairs */}
              {pi < PAIRS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: pi * 0.45 + 0.45 }}
                  className="mt-3 mx-auto w-px h-5 bg-slate-200"
                />
              )}
            </div>
          ))}
        </div>
        </motion.div>

        {/* ── Closing statement ── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16"
        >
          <p className="text-3xl md:text-[2.8rem] font-semibold leading-[1.15] tracking-tight">
            If AI can&apos;t act,
            <br />
            <span className="text-orange-500">it can&apos;t scale.</span>
          </p>

          {/* CTA — orange branded */}
          <div className="mt-10">
            <motion.button
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-orange-500 text-white text-sm font-semibold rounded-full transition-all duration-300"
              style={{ boxShadow: '0 4px 20px rgba(249,115,22,0.3)' }}
              whileHover={{
                scale: 1.04,
                boxShadow: '0 8px 32px rgba(249,115,22,0.45)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              See how Aziron executes
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#F1F5F9] pointer-events-none" />
    </section>
  )
}
