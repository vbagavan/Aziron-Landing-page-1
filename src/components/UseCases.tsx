const STORIES = [
  {
    title: "Incident Root Cause Analysis",
    gradient: "from-orange-50 via-amber-50 to-orange-100",
    accentColor: "text-orange-600",
    badgeBg: "bg-orange-100 text-orange-700",
    stats: [
      { value: "70%", label: "Faster RCA" },
      { value: "3×", label: "faster root cause identification" },
    ],
    extra: { value: "60%", label: "lower alert noise through AI triage" },
    desc: "Automatically analyze logs, traces, and system data to identify root causes in minutes, not hours. Fully observable and auditable workflows.",
  },
  {
    title: "Employee Onboarding",
    gradient: "from-blue-50 via-sky-50 to-blue-100",
    accentColor: "text-blue-600",
    badgeBg: "bg-blue-100 text-blue-700",
    stats: [
      { value: "80%", label: "Faster Onboarding" },
      { value: "90%", label: "reduction in manual tasks" },
    ],
    extra: { value: "50%", label: "fewer onboarding errors" },
    desc: "Automate documentation, access provisioning, and training workflows for seamless new hire experience across all systems.",
  },
  {
    title: "SQL Query Generation",
    gradient: "from-violet-50 via-purple-50 to-violet-100",
    accentColor: "text-violet-600",
    badgeBg: "bg-violet-100 text-violet-700",
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
    <section className="relative py-20 lg:py-28 overflow-hidden bg-stone-50">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-orange-500 mb-4">
            Real Results
          </p>
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
              {/* Card header */}
              <div className={`relative h-44 bg-gradient-to-br ${story.gradient} overflow-hidden border-b border-aziron-border`}>
                {/* Decorative circles */}
                <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/40 border border-white/60" />
                <div className="absolute -top-2 -right-2 w-20 h-20 rounded-full bg-white/30 border border-white/50 flex items-center justify-center">
                  <svg className={`w-7 h-7 ${story.accentColor}`} fill="none" viewBox="0 0 28 28">
                    <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="1.8"/>
                    <path d="M14 4v3M14 21v3M4 14H7M21 14h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className={`inline-block text-xs font-semibold tracking-wide px-3 py-1 rounded-full mb-2 uppercase ${story.badgeBg}`}>
                    Success Story
                  </span>
                  <h3 className="font-display font-bold text-aziron-dark text-xl">{story.title}</h3>
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

                <p className="text-aziron-text-soft text-base leading-relaxed mb-5">{story.desc}</p>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-aziron-orange hover:bg-aziron-orange-dark text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors duration-150 group/btn"
                >
                  Read the Story
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
