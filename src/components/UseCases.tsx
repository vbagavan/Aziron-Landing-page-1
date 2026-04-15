'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useInView } from 'framer-motion'

/* ── Count-up hook ── */
function useCountUp(target: string, duration = 1200) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!inView || reduced) {
      setTimeout(() => setDisplay(target), 0)
      return
    }
    // Extract numeric part + suffix (%, ×, etc.)
    const match = target.match(/^(\d+(?:\.\d+)?)(.*)?$/)
    if (!match) { setTimeout(() => setDisplay(target), 0); return }
    const end = parseFloat(match[1])
    const suffix = match[2] || ''
    const start = Date.now()
    const step = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * end)
      setDisplay(`${current}${suffix}`)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration, reduced])

  return { display, ref }
}

/* ── Stat with count-up ── */
function AnimatedStat({ value, label, color }: { value: string; label: string; color: string }) {
  const { display, ref } = useCountUp(value)
  return (
    <div className="rounded-xl p-4 text-center" style={{ background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(15,23,42,0.08)' }}>
      <p className="font-display font-bold text-3xl" style={{ color }}>
        <span ref={ref}>{display}</span>
      </p>
      <p className="text-aziron-muted text-xs mt-2 leading-snug">{label}</p>
    </div>
  )
}

const STORIES = [
  {
    title: "Incident Root Cause Analysis",
    stats: [
      { value: "70%", label: "Faster RCA" },
      { value: "3×",  label: "faster root cause identification" },
    ],
    extra:  { value: "60%", label: "lower alert noise through AI triage" },
    desc:   "Automatically analyze logs, traces, and system data to identify root causes in minutes, not hours. Fully observable and auditable workflows.",
    color:   "#f97316",
    glow:    "rgba(249,115,22,0.15)",
    icon:    "M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z M13 2v7h7",
    depth:   0,
  },
  {
    title: "Employee Onboarding",
    stats: [
      { value: "80%", label: "Faster Onboarding" },
      { value: "90%", label: "reduction in manual tasks" },
    ],
    extra:  { value: "50%", label: "fewer onboarding errors" },
    desc:   "Automate documentation, access provisioning, and training workflows for seamless new hire experience across all systems.",
    color:   "#60a5fa",
    glow:    "rgba(96,165,250,0.15)",
    icon:    "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75",
    depth:   -20,
  },
  {
    title: "SQL Query Generation",
    stats: [
      { value: "70%", label: "Faster Query Generation" },
      { value: "85%", label: "reduction in query errors" },
    ],
    extra:  { value: "60%", label: "improved data accessibility" },
    desc:   "Transform natural language requests into optimized SQL queries with enterprise data context, governance, and security built-in.",
    color:   "#a78bfa",
    glow:    "rgba(167,139,250,0.15)",
    icon:    "M20 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z M4 7V5a2 2 0 012-2h12a2 2 0 012 2v2",
    depth:   20,
  },
]

export default function UseCases() {
  const ref     = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  /* ── Parallax layers ── */
  const bgY   = useTransform(scrollYProgress, [0,1], reduced ? ['0%','0%'] : ['-10%','10%'])
  const midY  = useTransform(scrollYProgress, [0,1], reduced ? ['0%','0%'] : ['-5%','5%'])

  /* Staggered card entrances with depth offset */
  const card0Y = useTransform(scrollYProgress, [0.1,0.5], reduced ? ['0px','0px'] : ['80px','0px'])
  const card1Y = useTransform(scrollYProgress, [0.2,0.6], reduced ? ['0px','0px'] : ['100px','0px'])
  const card2Y = useTransform(scrollYProgress, [0.15,0.55],reduced ? ['0px','0px'] : ['120px','0px'])

  const cardYArr = [card0Y, card1Y, card2Y]

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32 md:py-48 bg-gradient-to-b from-white via-aziron-surface to-white"
    >
      {/* ── LAYER 1: Terrain/surface texture (slow) ── */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none gpu-layer overflow-hidden">
        {/* Horizontal depth lines like terrain contours */}
        {[20,35,50,65,80].map((top, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px opacity-[0.03]"
            style={{
              top:`${top}%`,
              background:`linear-gradient(to right, transparent, rgba(56,189,248,${0.3 + i*0.1}), rgba(249,115,22,0.2), transparent)`,
            }}
          />
        ))}
        {/* Large atmospheric orbs */}
        <div
          className="absolute top-[-15%] left-[-10%] w-[700px] h-[700px] rounded-full"
          style={{ background:'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)', filter:'blur(100px)', animation:'nebulaDrift 28s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-[-10%] right-[-8%] w-[600px] h-[600px] rounded-full"
          style={{ background:'radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)', filter:'blur(90px)', animation:'blobDrift 22s ease-in-out infinite 6s' }}
        />
      </motion.div>

      {/* ── LAYER 2: Floating depth particles (mid) ── */}
      <motion.div style={{ y: midY }} className="absolute inset-0 pointer-events-none gpu-layer">
        {[
          { top:'18%', left:'5%',   size:2,  c:'rgba(249,115,22,0.6)',  d:'3s'  },
          { top:'40%', left:'92%',  size:3,  c:'rgba(96,165,250,0.5)',  d:'4s'  },
          { top:'65%', left:'3%',   size:2,  c:'rgba(167,139,250,0.6)', d:'3.5s'},
          { top:'80%', left:'88%',  size:4,  c:'rgba(52,211,153,0.4)',  d:'2.8s'},
          { top:'30%', left:'50%',  size:2,  c:'rgba(56,189,248,0.5)',  d:'4.5s'},
        ].map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-twinkle"
            style={{
              top:p.top, left:p.left,
              width:p.size*2, height:p.size*2,
              background:p.c,
              boxShadow:`0 0 ${p.size*4}px ${p.c}`,
              '--duration':p.d, '--delay':`${i*0.4}s`,
            } as React.CSSProperties}
          />
        ))}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          className="mb-32"
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}
        >
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-600 rounded-full px-4 py-2 border inline-block mb-8"
            style={{ background:'rgba(249,115,22,0.12)', borderColor:'rgba(249,115,22,0.25)' }}
          >
            Real Results
          </span>
          <h2 className="font-display font-semibold text-5xl md:text-6xl lg:text-7xl text-aziron-dark mb-8">
            Real Workflows.{' '}
            <span
              style={{
                background:'linear-gradient(120deg, #f97316, #60a5fa)',
                WebkitBackgroundClip:'text',
                backgroundClip:'text',
                WebkitTextFillColor:'transparent',
              }}
            >
              Real Impact.
            </span>
          </h2>
          <p className="text-aziron-text-soft text-xl max-w-3xl leading-relaxed mx-auto">
            See how teams are using Aziron to automate complex workflows and deliver measurable results.
          </p>
        </motion.div>

        {/* Cards grid — each at a different depth/y position */}
        <div className="grid lg:grid-cols-3 gap-8">
          {STORIES.map((story, i) => (
            <motion.article
              key={i}
              style={{ y: cardYArr[i] }}
              className="rounded-2xl overflow-hidden group cursor-pointer"
              initial={{ opacity:0 }}
              whileInView={{ opacity:1 }}
              viewport={{ once:true, margin:'-40px' }}
              transition={{ duration:0.6, delay:i*0.1 }}
              whileHover={{ y:-8 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Glass card */}
              <motion.div
                className="h-full rounded-2xl overflow-hidden"
                style={{
                  background:'rgba(255,255,255,0.7)',
                  border:`1px solid rgba(15,23,42,0.1)`,
                  backdropFilter:'blur(16px)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                }}
                whileHover={{
                  borderColor: `${story.color}50`,
                  boxShadow: `0 12px 40px rgba(0,0,0,0.1), 0 0 40px ${story.glow}`
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Card header */}
                <div className="relative h-44 overflow-hidden" style={{ borderBottom:'1px solid rgba(15,23,42,0.08)' }}>
                  {/* BG gradient */}
                  <div
                    className="absolute inset-0"
                    style={{ background:`radial-gradient(ellipse at 80% 30%, ${story.glow} 0%, transparent 70%)` }}
                  />
                  {/* Decorative rings */}
                  <div
                    className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20"
                    style={{ border:`1px solid ${story.color}` }}
                  />
                  <div
                    className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-30 flex items-center justify-center group-hover:scale-110 group-hover:opacity-40 transition-all duration-300"
                    style={{ border:`1px solid ${story.color}`, background:`${story.color}10` }}
                  >
                    <svg className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" style={{ color:story.color }}>
                      <path d={story.icon} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {/* Title area */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span
                      className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 border"
                      style={{ color:story.color, background:`${story.color}15`, borderColor:`${story.color}25` }}
                    >
                      Success Story
                    </span>
                    <h3 className="font-display font-semibold text-aziron-dark text-2xl group-hover:text-orange-500 transition-colors duration-300">{story.title}</h3>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-8">
                  {/* Stats — count-up */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    {story.stats.map((s, j) => (
                      <AnimatedStat key={j} value={s.value} label={s.label} color={story.color} />
                    ))}
                  </div>

                  {/* Extra stat banner — count-up */}
                  <div
                    className="flex items-center gap-3 rounded-xl px-4 py-4 mb-8 border"
                    style={{ background: 'rgba(248,250,252,0.6)', borderColor: 'rgba(15,23,42,0.08)' }}
                  >
                    <AnimatedStat value={story.extra.value} label={story.extra.label} color={story.color} />
                  </div>

                  <p className="text-aziron-text-soft text-base leading-relaxed mb-8 max-w-md">{story.desc}</p>

                  <motion.a
                    href="#"
                    className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-2.5 rounded-lg group/button"
                    style={{
                      background:story.color,
                      color:'#fff',
                      boxShadow:`0 0 20px ${story.glow}`,
                    }}
                    whileHover={{ 
                      boxShadow: `0 0 35px ${story.glow}`,
                      scale: 1.02
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    Read the Story
                    <svg className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" fill="none" viewBox="0 0 16 16">
                      <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Section fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background:'linear-gradient(to bottom, transparent, #ffffff)' }}
      />
    </section>
  )
}
