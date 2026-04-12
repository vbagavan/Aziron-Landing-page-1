'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const CAPABILITIES = [
  { title:'Multi-Agent Engine',    desc:'Specialized agents collaborate, reason, and execute tasks as a unified system.',           icon:"M12 2C9 2 7 4 7 6.5c0 1-.4 2-1 2.5C4.5 10 3 11.5 3 13.5 3 16 5 18 7.5 18H9v2h6v-2h1.5C19 18 21 16 21 13.5c0-2-1.5-3.5-3-4-.6-.5-1-1.5-1-2.5C17 4 15 2 12 2z", color:'#60a5fa' },
  { title:'Workflow Builder',      desc:'Design multi-step execution flows with branching, retries, and approvals.',                 icon:"M5 12h14M12 5l7 7-7 7",                                                                                                                                              color:'#a78bfa' },
  { title:'Knowledge Hub (RAG)',   desc:'Ground every decision with enterprise data across multiple knowledge sources.',            icon:"M20 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM4 7V5a2 2 0 012-2h12a2 2 0 012 2v2",                                                       color:'#34d399' },
  { title:'Tool Ecosystem',        desc:'Connect APIs, databases, and systems — turning intent into real actions.',                 icon:"M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z M13 2v7h7",                                                                                             color:'#f97316' },
  { title:'Developer Layer',       desc:'Extend the system with custom agents, tools, and APIs.',                                  icon:"M8 6L3 12l5 6M16 6l5 6-5 6",                                                                                                                                    color:'#38bdf8' },
  { title:'Observability',         desc:'Trace executions, monitor performance, and optimize in real-time.',                       icon:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12m-3 0a3 3 0 106 0 3 3 0 00-6 0",                                                                            color:'#fb923c' },
]

export default function PlatformCapabilities() {
  const ref     = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })

  /* Spine grows as you scroll */
  const spineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  /* Background parallax layers */
  const bgY  = useTransform(scrollYProgress, [0,1], reduced ? ['0%','0%'] : ['-12%','12%'])
  const midY = useTransform(scrollYProgress, [0,1], reduced ? ['0%','0%'] : ['-6%','6%'])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32 md:py-48"
      style={{ background:'linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)' }}
    >
      {/* ── LAYER 1: Neuron grid background (slowest) ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none gpu-layer">
        {/* Hex/neural grid SVG overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow:'hidden' }}
        >
          <defs>
            <pattern id="hexgrid" x="0" y="0" width="56" height="48" patternUnits="userSpaceOnUse">
              <polygon points="28,2 52,14 52,34 28,46 4,34 4,14" fill="none" stroke="rgba(56,189,248,1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexgrid)"/>
        </svg>

        {/* Deep glow orbs */}
        <div
          className="absolute top-[-10%] left-[40%] -translate-x-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background:'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)', filter:'blur(120px)' }}
        />
      </motion.div>

      {/* ── LAYER 2: Floating neuron nodes (mid) ── */}
      <motion.div style={{ y: midY }} className="absolute inset-0 pointer-events-none gpu-layer overflow-hidden">
        {[
          { top:'15%', left:'3%',  r:3, c:'rgba(96,165,250,0.4)',   d:'3s' },
          { top:'35%', right:'4%', r:2, c:'rgba(167,139,250,0.4)',  d:'4s' },
          { top:'60%', left:'6%',  r:4, c:'rgba(52,211,153,0.4)',   d:'3.5s'},
          { top:'80%', right:'8%', r:2, c:'rgba(249,115,22,0.4)',   d:'2.8s'},
          { top:'50%', left:'48%', r:3, c:'rgba(56,189,248,0.35)',  d:'4.2s'},
        ].map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-twinkle"
            style={{
              top:p.top,
              left:(p as {left?:string}).left,
              right:(p as {right?:string}).right,
              width: p.r * 2,
              height: p.r * 2,
              background: p.c,
              boxShadow:`0 0 ${p.r * 4}px ${p.c}`,
              '--duration': p.d,
              '--delay': `${i * 0.5}s`,
            } as React.CSSProperties}
          />
        ))}
        {/* Faint connecting lines between random points */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
          <line x1="5%" y1="15%" x2="48%" y2="50%" stroke="rgba(56,189,248,1)" strokeWidth="0.5"/>
          <line x1="95%" y1="35%" x2="48%" y2="50%" stroke="rgba(167,139,250,1)" strokeWidth="0.5"/>
          <line x1="48%" y1="50%" x2="8%" y2="60%" stroke="rgba(52,211,153,1)" strokeWidth="0.5"/>
          <line x1="48%" y1="50%" x2="92%" y2="80%" stroke="rgba(249,115,22,1)" strokeWidth="0.5"/>
        </svg>
      </motion.div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity:0, y:40 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}
          className="text-center mb-32"
        >
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-600 rounded-full px-4 py-2 border inline-block mb-8"
            style={{ background:'rgba(249,115,22,0.12)', borderColor:'rgba(249,115,22,0.25)' }}
          >
            Platform Architecture
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-aziron-dark mb-8 leading-tight max-w-4xl mx-auto">
            One Platform.<br/>
            <span
              style={{
                background:'linear-gradient(120deg, #60a5fa, #38bdf8, #f97316)',
                WebkitBackgroundClip:'text',
                backgroundClip:'text',
                WebkitTextFillColor:'transparent',
              }}
            >
              Full Execution Stack.
            </span>
          </h2>
          <p className="text-aziron-text-soft max-w-2xl mx-auto text-xl leading-relaxed">
            Agents, workflows, tools, and intelligence — unified into a single execution system.
          </p>
        </motion.div>

        {/* Spine + nodes */}
        <div className="relative">
          {/* Static spine track */}
          <div
            className="absolute left-1/2 top-0 w-px h-full"
            style={{ background:'rgba(15,23,42,0.08)' }}
          />
          {/* Growing spine */}
          <motion.div
            style={{ height: spineHeight }}
            className="absolute left-1/2 top-0 w-px"
            aria-hidden="true"
          >
            <div
              className="w-full h-full"
              style={{
                background:'linear-gradient(to bottom, #3b82f6, #f97316)',
                boxShadow:'0 0 8px rgba(59,130,246,0.4)',
              }}
            />
          </motion.div>

          {/* Travelling pulse on spine */}
          {[0,1,2].map((i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 -translate-x-1/2 w-1.5 h-8 rounded-full"
              style={{
                background:'linear-gradient(to bottom, transparent, rgba(249,115,22,0.8), transparent)',
                boxShadow:'0 0 12px rgba(249,115,22,0.5)',
              }}
              animate={{ y:['0%','6000px'] }}
              transition={{ repeat:Infinity, duration:5, delay:i*1.6, ease:'linear' }}
            />
          ))}

          {/* Capability cards */}
          <div className="space-y-24">
            {CAPABILITIES.map((cap, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity:0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true, margin:'-60px' }}
                  transition={{ duration:0.7, delay:i*0.07, ease:[0.16,1,0.3,1] }}
                  className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Spine node dot */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full"
                    style={{
                      background: cap.color,
                      boxShadow:`0 0 16px ${cap.color}80`,
                      border:'2.5px solid rgba(255,255,255,0.9)',
                    }}
                    whileHover={{ scale:1.5 }}
                    transition={{ type:'spring', stiffness:400, damping:15 }}
                  />

                  {/* Connector */}
                  <div
                    className={`absolute top-1/2 h-px ${isLeft ? 'left-1/2 w-[18%]' : 'right-1/2 w-[18%]'}`}
                    style={{ background:`linear-gradient(${isLeft?'to right':'to left'}, ${cap.color}40, transparent)` }}
                  />

                  {/* Card */}
                  <motion.div
                    className="w-full md:w-[44%] rounded-2xl p-8 md:p-10 cursor-pointer group"
                    style={{
                      background:'rgba(255,255,255,0.7)',
                      border:`1px solid rgba(15,23,42,0.1)`,
                      backdropFilter:'blur(16px)',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                    }}
                    whileHover={{
                      y:-6,
                      borderColor:`${cap.color}50`,
                      boxShadow:`0 12px 40px rgba(0,0,0,0.1), 0 0 30px ${cap.color}20`,
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Icon with hover animation */}
                    <motion.div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                      style={{ background:`${cap.color}15`, border:`1px solid ${cap.color}25` }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" style={{ color:cap.color }}>
                        <path d={cap.icon} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>
                    <h3 className="text-2xl font-semibold text-aziron-dark mb-3 group-hover:text-orange-500 transition-colors duration-300">{cap.title}</h3>
                    <p className="text-aziron-text-soft leading-relaxed text-base max-w-md">{cap.desc}</p>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Footer tagline */}
        <motion.div
          initial={{ opacity:0 }}
          whileInView={{ opacity:1 }}
          viewport={{ once:true }}
          transition={{ duration:0.7 }}
          className="text-center mt-32"
        >
          <p className="text-aziron-muted text-sm tracking-[0.3em] uppercase">
            From AI responses → to real execution
          </p>
        </motion.div>
      </div>

      {/* Section fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background:'linear-gradient(to bottom, transparent, #f1f5f9)' }}
      />
    </section>
  )
}
