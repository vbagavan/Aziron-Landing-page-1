const STORIES = [
  {
    title: "Incident Root Cause Analysis",
    gradient: "from-[#0A2540] via-[#0D1B3E] to-[#1E3A8A]",
    stats: [
      { value: "70%", label: "Faster RCA" },
      { value: "3×", label: "faster root cause identification" },
    ],
    extra: { value: "60%", label: "lower alert noise through AI triage" },
    desc: "Automatically analyze logs, traces, and system data to identify root causes in minutes, not hours. Fully observable and auditable workflows.",
  },
  {
    title: "Employee Onboarding",
    gradient: "from-aziron-blue via-[#0052CC] to-aziron-sky",
    stats: [
      { value: "80%", label: "Faster Onboarding" },
      { value: "90%", label: "reduction in manual tasks" },
    ],
    extra: { value: "50%", label: "fewer onboarding errors" },
    desc: "Automate documentation, access provisioning, and training workflows for seamless new hire experience across all systems.",
  },
  {
    title: "SQL Query Generation",
    gradient: "from-[#7C3AED] via-[#6D28D9] to-[#5B21B6]",
    stats: [
      { value: "70%", label: "Faster Query Generation" },
      { value: "85%", label: "reduction in query errors" },
    ],
    extra: { value: "60%", label: "improved data accessibility" },
    desc: "Transform natural language requests into optimized SQL queries with enterprise data context, governance, and security built-in.",
  },
];

export default function UseCases() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden" style={{
      background: "linear-gradient(160deg, #f0f4ff 0%, #ffffff 35%, #fdf4ff 70%, #fff7ed 100%)",
    }}>
      {/* Soft radial blobs */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: `
          radial-gradient(ellipse 55% 40% at 15% 20%, rgba(99,102,241,0.07) 0%, transparent 70%),
          radial-gradient(ellipse 45% 35% at 85% 75%, rgba(168,85,247,0.06) 0%, transparent 70%),
          radial-gradient(ellipse 40% 30% at 60% 10%, rgba(59,130,246,0.05) 0%, transparent 70%)
        `,
      }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-aziron-dark mb-4">
            Real Workflows. Real Impact.
          </h2>
          <p className="text-aziron-muted text-lg md:text-xl max-w-3xl mx-auto">
            See how teams are using Aziron to automate complex workflows and deliver measurable results.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-7">
          {STORIES.map((story, i) => (
            <article
              key={i}
              className="bg-white rounded-2xl overflow-hidden border border-aziron-border shadow-sm hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Image / visual header */}
              <div className={`relative h-52 bg-gradient-to-br ${story.gradient} overflow-hidden`}>
                {/* Subtle wave overlay */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-10"
                  viewBox="0 0 400 200"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0,100 Q100,50 200,100 T400,100" stroke="white" strokeWidth="2" fill="none"/>
                  <path d="M0,130 Q100,80 200,130 T400,130" stroke="white" strokeWidth="1" fill="none" opacity="0.5"/>
                </svg>

                {/* Glowing orb */}
                <div className="absolute top-6 right-8 w-28 h-28 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 28 28">
                      <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="1.8"/>
                      <path d="M14 4v3M14 21v3M4 14H7M21 14h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-block bg-white/20 backdrop-blur text-white text-xs font-semibold tracking-wide px-3 py-1 rounded-full mb-2 uppercase">
                    Success Story
                  </span>
                  <h3 className="font-display font-bold text-white text-xl">{story.title}</h3>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {story.stats.map((s, j) => (
                    <div key={j} className="bg-aziron-surface rounded-xl p-3 text-center border border-aziron-border">
                      <p className="font-display font-bold text-3xl text-aziron-blue">{s.value}</p>
                      <p className="text-aziron-muted text-xs mt-1 leading-snug">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Extra stat banner */}
                <div className="flex items-center gap-3 bg-aziron-surface border border-aziron-border rounded-xl px-4 py-3 mb-5">
                  <p className="font-display font-bold text-2xl text-aziron-orange flex-shrink-0">{story.extra.value}</p>
                  <p className="text-aziron-muted text-xs leading-snug">{story.extra.label}</p>
                </div>

                <p className="text-aziron-text-soft text-sm leading-relaxed mb-5">{story.desc}</p>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-aziron-orange hover:bg-aziron-orange-dark text-white font-bold text-sm px-6 py-2.5 rounded-full transition-colors duration-150 group/btn"
                >
                  READ THE STORY
                  <svg className="w-4 h-4 transition-transform duration-150 group-hover/btn:translate-x-0.5" fill="none" viewBox="0 0 16 16">
                    <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
