'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useInView, AnimatePresence } from 'framer-motion'

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

type Story = typeof STORIES[number]

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
    storyContent: {
      tag: "Platform Engineering",
      challenge: "A fast-growing SaaS company was experiencing recurring production incidents. Engineers spent an average of 4+ hours per incident manually correlating logs from 12 different services — often discovering the root cause only after customers had already churned.",
      solution: "Aziron's incident analysis agents were deployed to automatically ingest logs, traces, and metrics at incident onset. The agents correlate signals across all services, identify anomaly patterns, and generate a ranked list of probable root causes — all within minutes of the first alert firing.",
      howItWorks: [
        "Ingest logs from all connected services in real-time",
        "Run ML-powered anomaly detection across 200+ signal types",
        "Cross-reference deploys, config changes, and traffic patterns",
        "Generate a ranked RCA report with supporting evidence",
        "Auto-create incident tickets with full context attached",
      ],
      results: [
        { value: "70%", label: "Faster RCA", sub: "from 4 hrs to 45 min" },
        { value: "3×",  label: "Higher identification accuracy", sub: "vs. manual triage" },
        { value: "60%", label: "Lower alert noise", sub: "through intelligent deduplication" },
        { value: "$2M", label: "Saved annually", sub: "in engineering hours" },
      ],
      quote: {
        text: "We used to dread Monday morning incidents. Now our agents have the full picture before the on-call engineer even opens their laptop.",
        author: "Head of Platform Engineering",
        company: "Series B SaaS company",
      },
    },
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
    storyContent: {
      tag: "People Operations",
      challenge: "A 500-person enterprise was onboarding 30+ new hires monthly across 8 departments. HR coordinators spent 40% of their time manually provisioning accounts, chasing approvals, and tracking training completion — with new hires often waiting days before getting full system access.",
      solution: "Aziron orchestrates the entire onboarding journey: from offer-letter signing through day-30 check-ins. Agents trigger access provisioning, assign department-specific training, coordinate equipment shipping, and keep all stakeholders updated — without a single manual step.",
      howItWorks: [
        "Trigger onboarding workflow on HRIS new hire event",
        "Auto-provision access across 15+ connected SaaS tools",
        "Assign role-based training modules and track completion",
        "Coordinate IT equipment ordering and desk setup",
        "Send automated day-1, day-7, and day-30 check-in sequences",
      ],
      results: [
        { value: "80%", label: "Faster time-to-productivity", sub: "from 2 weeks to 3 days" },
        { value: "90%", label: "Reduction in manual HR tasks", sub: "per onboarding cycle" },
        { value: "50%", label: "Fewer onboarding errors", sub: "wrong access, missed training" },
        { value: "4.8★", label: "New hire satisfaction score", sub: "up from 3.1" },
      ],
      quote: {
        text: "Our HR team went from drowning in onboarding admin to actually spending time with new hires. The difference in culture has been night and day.",
        author: "VP of People Operations",
        company: "Enterprise software company",
      },
    },
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
    storyContent: {
      tag: "Data & Analytics",
      challenge: "A retail analytics team was receiving 200+ data requests per month from non-technical stakeholders. Each request required a data engineer to understand the business context, locate the right tables, write optimized SQL, and validate the output — creating a 5-day average turnaround and burning out a small data team.",
      solution: "Aziron's SQL generation agents understand the company's full data catalog, business glossary, and access policies. Business users describe what they need in plain English; the agent generates, validates, and executes the query — returning results with auto-generated explanations and data lineage.",
      howItWorks: [
        "Index full data catalog with business context and metadata",
        "Parse natural language request and resolve entity references",
        "Generate optimized SQL respecting row-level security rules",
        "Validate query against schema and dry-run for errors",
        "Return results with plain-English explanation and lineage",
      ],
      results: [
        { value: "70%", label: "Faster query generation", sub: "from 5 days to 4 hours" },
        { value: "85%", label: "Reduction in query errors", sub: "schema and logic mistakes" },
        { value: "60%", label: "More users self-serve data", sub: "without eng support" },
        { value: "3×",  label: "Data team capacity freed", sub: "for high-value work" },
      ],
      quote: {
        text: "Our marketing team used to submit a ticket and wait a week. Now they have answers in minutes — and the queries are better than what we'd have written ourselves.",
        author: "Director of Data Engineering",
        company: "National retail chain",
      },
    },
  },
]

/* ── Story Modal ── */
function StoryModal({ story, onClose }: { story: Story; onClose: () => void }) {
  const sc = story.storyContent

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <AnimatePresence>
      {/* Backdrop — outer click closes modal */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Scrim — pointer-events-none so scroll reaches the panel */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Panel — stopPropagation so clicks inside don't close */}
        <motion.div
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
          onClick={e => e.stopPropagation()}
          style={{
            background: 'rgba(255,255,255,0.98)',
            border: `1px solid ${story.color}30`,
            boxShadow: `0 32px 80px rgba(0,0,0,0.2), 0 0 60px ${story.glow}`,
          }}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        >
          {/* Header */}
          <div
            className="sticky top-0 z-10 flex items-start justify-between px-8 pt-7 pb-5"
            style={{
              background: `linear-gradient(to bottom, rgba(255,255,255,0.99), rgba(255,255,255,0.96))`,
              borderBottom: `1px solid ${story.color}20`,
            }}
          >
            <div>
              <span
                className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 border"
                style={{ color: story.color, background: `${story.color}15`, borderColor: `${story.color}25` }}
              >
                {sc.tag}
              </span>
              <h2 className="font-display font-bold text-2xl text-slate-900">{story.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 ml-4 mt-1 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="px-8 pb-10 pt-6 flex flex-col gap-8">

            {/* Challenge */}
            <section>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-3">The Challenge</h3>
              <p className="text-slate-600 text-[15px] leading-relaxed">{sc.challenge}</p>
            </section>

            {/* Solution */}
            <section>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-3">The Solution</h3>
              <p className="text-slate-600 text-[15px] leading-relaxed mb-4">{sc.solution}</p>
              <ul className="flex flex-col gap-2">
                {sc.howItWorks.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-slate-700">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                      style={{ background: `${story.color}20`, color: story.color }}
                    >
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </section>

            {/* Results */}
            <section>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-4">Results</h3>
              <div className="grid grid-cols-2 gap-3">
                {sc.results.map((r, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-4"
                    style={{ background: `${story.color}08`, border: `1px solid ${story.color}20` }}
                  >
                    <p className="font-display font-bold text-2xl" style={{ color: story.color }}>{r.value}</p>
                    <p className="text-slate-700 text-sm font-medium mt-0.5">{r.label}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{r.sub}</p>
                  </div>
                ))}
              </div>
            </section>


          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function UseCases() {
  const ref     = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const [activeStory, setActiveStory] = useState<Story | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const bgY   = useTransform(scrollYProgress, [0,1], reduced ? ['0%','0%'] : ['-10%','10%'])
  const midY  = useTransform(scrollYProgress, [0,1], reduced ? ['0%','0%'] : ['-5%','5%'])

  const card0Y = useTransform(scrollYProgress, [0.1,0.5], reduced ? ['0px','0px'] : ['80px','0px'])
  const card1Y = useTransform(scrollYProgress, [0.2,0.6], reduced ? ['0px','0px'] : ['100px','0px'])
  const card2Y = useTransform(scrollYProgress, [0.15,0.55],reduced ? ['0px','0px'] : ['120px','0px'])

  const cardYArr = [card0Y, card1Y, card2Y]

  const openStory = useCallback((story: Story) => setActiveStory(story), [])
  const closeStory = useCallback(() => setActiveStory(null), [])

  return (
    <>
      <section
        ref={ref}
        className="relative overflow-hidden py-32 md:py-48 bg-gradient-to-b from-white via-aziron-surface to-white"
      >
        {/* ── LAYER 1: Terrain/surface texture (slow) ── */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none gpu-layer overflow-hidden">
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

          {/* Cards grid */}
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
                    <div
                      className="absolute inset-0"
                      style={{ background:`radial-gradient(ellipse at 80% 30%, ${story.glow} 0%, transparent 70%)` }}
                    />
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
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      {story.stats.map((s, j) => (
                        <AnimatedStat key={j} value={s.value} label={s.label} color={story.color} />
                      ))}
                    </div>

                    <div
                      className="flex items-center gap-3 rounded-xl px-4 py-4 mb-8 border"
                      style={{ background: 'rgba(248,250,252,0.6)', borderColor: 'rgba(15,23,42,0.08)' }}
                    >
                      <AnimatedStat value={story.extra.value} label={story.extra.label} color={story.color} />
                    </div>

                    <p className="text-aziron-text-soft text-base leading-relaxed mb-8 max-w-md">{story.desc}</p>

                    <motion.button
                      onClick={() => openStory(story)}
                      className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-2.5 rounded-lg group/button"
                      style={{
                        background: story.color,
                        color: '#fff',
                        boxShadow: `0 0 20px ${story.glow}`,
                      }}
                      whileHover={{ boxShadow: `0 0 35px ${story.glow}`, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      Read the Story
                      <svg className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" fill="none" viewBox="0 0 16 16">
                        <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.button>
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

      {/* Modal portal */}
      <AnimatePresence>
        {activeStory && (
          <StoryModal story={activeStory} onClose={closeStory} />
        )}
      </AnimatePresence>
    </>
  )
}
