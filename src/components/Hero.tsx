"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-32 px-6 bg-gradient-to-br from-white via-[#FFF4EC] to-[#FFE4C8] text-black">
      
      {/* subtle grid background */}
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,gray_1px,transparent_1px),linear-gradient(to_bottom,gray_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Decorative Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[15%] left-[10%] h-16 w-16 rounded-full bg-blue-200/30 dark:bg-blue-800/20"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[25%] right-[15%] h-12 w-12 rounded-lg bg-purple-200/30 dark:bg-purple-800/20"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          className="absolute top-[60%] left-[8%] h-10 w-10 rounded-full bg-cyan-200/30 dark:bg-cyan-800/20"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[12%] h-14 w-14 rounded-lg bg-orange-200/30 dark:bg-orange-800/20"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        <motion.div
          className="absolute top-[40%] right-[5%] h-8 w-8 rounded-full bg-green-200/30 dark:bg-green-800/20"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute bottom-[35%] left-[15%] h-6 w-6 rounded-full bg-pink-200/30 dark:bg-pink-800/20"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        />
      </div>

      {/* Minimal Grid with Occasional Pulses */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Grid pulses at key intersections */}
        <motion.div
          className="absolute top-[15%] left-[20%] w-3 h-3 rounded-full bg-blue-400/60 blur-sm"
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div
          className="absolute top-[45%] right-[25%] w-3 h-3 rounded-full bg-purple-400/60 blur-sm"
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div
          className="absolute bottom-[30%] left-[35%] w-3 h-3 rounded-full bg-orange-400/60 blur-sm"
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-[60%] right-[15%] w-3 h-3 rounded-full bg-green-400/60 blur-sm"
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1.5,
            repeatDelay: 1.5
          }}
        />
      </div>

      {/* soft radial highlight */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-black/5 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* eyebrow */}
          <div className="text-xs font-semibold tracking-widest uppercase text-orange-500 mb-4">
            AI-Native Product Engineering
          </div>

          {/* headline */}
          <h1 className="font-display text-[2.6rem] sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            <span className="block whitespace-nowrap">From AI Chat{" "}
              <svg className="inline-block align-middle mb-1" width="0.75em" height="0.75em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
            <span className="block">to{" "}<span className="text-[#F97316]">AI Execution</span></span>
          </h1>

          {/* subtext */}
          <p className="font-sans mt-6 text-lg text-gray-600 leading-relaxed">
                        Build agents that don't just respond — but execute real workflows across your systems.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#get-started"
              className="font-sans px-8 py-4 bg-[#F97316] text-white font-semibold rounded-lg hover:bg-[#EA580C] transition-all shadow-lg text-center"
            >
              Get Started Free
            </a>
            <a
              href="#book-demo"
              className="font-sans px-8 py-4 bg-white text-black font-semibold rounded-lg border-2 border-black/10 hover:border-black/20 transition-all text-center"
            >
              Book a Demo
            </a>
          </div>
        </motion.div>

        {/* RIGHT SIDE — Image Collage */}
        <motion.div
          className="relative h-[400px] w-full sm:h-[500px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Connecting lines + animated dots */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M50,20 Q72,37 85,55"
              fill="none" stroke="#c4b5fd" strokeWidth="0.5" strokeDasharray="3 2" strokeLinecap="round"
              animate={{ strokeDashoffset: [0, -10] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M50,20 Q28,52 18,82"
              fill="none" stroke="#6ee7b7" strokeWidth="0.5" strokeDasharray="3 2" strokeLinecap="round"
              animate={{ strokeDashoffset: [0, -10] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.circle r="1.2" fill="#8b5cf6"
              animate={{ cx: [50, 68, 85], cy: [20, 33, 55] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <motion.circle r="1.2" fill="#10b981"
              animate={{ cx: [50, 32, 18], cy: [20, 50, 82] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </svg>

          {/* AI Platform card */}
          <motion.div
            className="absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-2xl bg-white p-2 shadow-2xl sm:h-64 sm:w-64 border border-black/10 z-10"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: [-0.6, 0.6, -0.6] }}
            transition={{
              opacity: { duration: 0.5, ease: "easeOut" },
              scale: { duration: 0.5, ease: "easeOut" },
              y: { duration: 0.5, ease: "easeOut" },
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <div className="h-full w-full rounded-xl bg-gradient-to-br from-indigo-50 via-violet-50 to-blue-50 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  className="w-3/4 h-3/4 rounded-full blur-2xl"
                  style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.25) 0%, rgba(99,102,241,0.1) 70%, transparent 100%)" }}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <motion.div
                className="relative flex-1 w-full flex items-center justify-center px-5 pt-4"
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  className="w-full h-full"
                  animate={{ opacity: [0.85, 1, 0.85] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  style={{
                    WebkitMaskImage: "url(/ai-brain.svg)",
                    maskImage: "url(/ai-brain.svg)",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 45%, #2563eb 100%)",
                  }}
                />
              </motion.div>
              <span className="relative text-sm text-indigo-600 font-semibold z-10 pb-3">AI Platform</span>
            </div>
          </motion.div>

          {/* Stat chip — 10x faster */}
          <motion.div
            className="absolute left-[5%] top-[40%] z-20 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-md border border-indigo-100 text-xs font-semibold text-indigo-600"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0, y: [0, -4, 0] }}
            transition={{ opacity: { delay: 0.9, duration: 0.4 }, x: { delay: 0.9, duration: 0.4 }, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            10x faster
          </motion.div>

          {/* Aziro logo card */}
          <motion.div
            className="absolute right-0 top-1/3 h-40 w-40 rounded-2xl bg-white p-4 shadow-xl sm:h-56 sm:w-56 border border-black/10 flex flex-col items-center justify-center gap-3 z-10"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: [0.6, -0.6, 0.6] }}
            transition={{
              opacity: { delay: 0.15, duration: 0.5, ease: "easeOut" },
              scale: { delay: 0.15, duration: 0.5, ease: "easeOut" },
              y: { delay: 0.15, duration: 0.5, ease: "easeOut" },
              rotate: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 },
            }}
          >
            <svg viewBox="0 0 500 413" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-auto sm:w-40">
              <g clipPath="url(#hero-card-clip)">
                <path d="M292.539 340.837C277.931 329.836 256.263 322.293 234.454 322.293C209.802 322.293 185.492 329.55 157.831 357.286C126.919 387.696 80.2413 413.975 21.1197 412.653C13.9842 412.492 6.93432 412.276 -0.00488281 411.532L33.9967 350.476L34.0017 350.471C55.7402 331.233 80.7998 308.924 90.4563 302.602C106.725 291.968 145.452 265.684 206.737 283.445C210.109 284.425 212.177 285.254 215.835 286.581C244.477 296.979 290.692 338.621 292.534 340.832L292.539 340.837Z" fill="url(#hero-card-g0)"/>
                <path d="M165.137 220.78C184.681 219.951 202.057 224.127 217.792 231.384C245.272 244.039 266.704 264.8 281.342 280.465C295.688 295.813 318.61 321.433 339.452 340.777C360.109 359.95 394.362 391.782 437.044 409.462C445.835 413.101 447.138 412.573 448.411 413.01C401.684 397.184 365.302 361.211 341.093 339.747C319.812 320.886 299.317 292.094 283.471 276.927C268.475 262.573 248.105 239.657 220.625 226.997C204.89 219.74 186.181 215.026 166.641 215.936C136.696 217.328 101.713 233.882 85.2027 260.628L70.4487 284.369C91.8501 246.813 124.1 222.524 165.137 220.785V220.78Z" fill="#8CF4FC"/>
                <path d="M500 412.653C396.138 381.007 311.222 260.176 311.222 260.176C311.222 260.176 272.355 196.984 216.896 183.656C210.611 182.148 201.77 180.676 195.4 180.656C153.211 180.505 129.47 197.265 112.074 213.825L174.064 104.668L224.374 16.0669L226.467 12.3831C230.448 6.62876 236.305 0.231157 249.328 0C262.14 -0.221148 269.924 8.49327 272.506 13.0465L274.368 15.705L500 412.653Z" fill="#2463EB"/>
                <path d="M445.574 412.653C408.699 412.492 378.989 394.822 358.428 385.314C340.348 376.951 313.98 356.296 294.023 342.089C294.013 342.084 242.968 293.34 206.742 283.45C145.19 266.644 106.73 291.968 90.4615 302.607C80.8049 308.93 55.7453 331.233 34.0068 350.476L68.8085 287.028C84.6444 260.171 112.378 223.346 165.132 220.785C184.672 219.837 202.052 224.132 217.788 231.389C245.268 244.044 267.026 265.433 281.337 280.47C296.323 296.21 374.627 389.023 445.569 412.663L445.574 412.653Z" fill="url(#hero-card-g1)"/>
              </g>
              <defs>
                <linearGradient id="hero-card-g0" x1="281.977" y1="381.734" x2="-35.705" y2="407.8" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3FBDFF"/><stop offset="0.77" stopColor="#1A23C9"/>
                </linearGradient>
                <linearGradient id="hero-card-g1" x1="34.0068" y1="316.558" x2="445.574" y2="316.558" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2F5DF7"/><stop offset="1" stopColor="#5BCDFD"/>
                </linearGradient>
                <clipPath id="hero-card-clip">
                  <rect width="500" height="413" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </motion.div>

          {/* Stat chip — 99.9% uptime */}
          <motion.div
            className="absolute right-[2%] top-[22%] z-20 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-md border border-blue-100 text-xs font-semibold text-blue-600"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0, y: [0, -4, 0] }}
            transition={{ opacity: { delay: 1.1, duration: 0.4 }, x: { delay: 1.1, duration: 0.4 }, y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            99.9% uptime
          </motion.div>

          {/* Transform card */}
          <motion.div
            className="absolute bottom-0 left-0 h-32 w-32 rounded-2xl bg-white p-2 shadow-xl sm:h-48 sm:w-48 border border-black/10 z-10"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: [-0.5, 0.5, -0.5] }}
            transition={{
              opacity: { delay: 0.3, duration: 0.5, ease: "easeOut" },
              scale: { delay: 0.3, duration: 0.5, ease: "easeOut" },
              y: { delay: 0.3, duration: 0.5, ease: "easeOut" },
              rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 },
            }}
          >
            <div className="h-full w-full rounded-xl bg-gradient-to-br from-emerald-50 to-cyan-50 flex flex-col items-center justify-center gap-1 relative overflow-hidden">
              <svg viewBox="0 0 80 80" className="w-12 h-12 sm:w-16 sm:h-16" fill="none">
                <motion.g
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <line x1="12" y1="30" x2="56" y2="30" stroke="#10b981" strokeWidth="4" strokeLinecap="round"/>
                  <polyline points="46,20 58,30 46,40" stroke="#10b981" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.g>
                <motion.g
                  animate={{ x: [0, -5, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                >
                  <line x1="68" y1="50" x2="24" y2="50" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round"/>
                  <polyline points="34,40 22,50 34,60" stroke="#06b6d4" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.g>
              </svg>
              <span className="text-xs text-emerald-600 font-semibold">Transform</span>
            </div>
          </motion.div>

          {/* Stat chip — 50+ integrations */}
          <motion.div
            className="absolute left-[35%] bottom-[8%] z-20 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-md border border-emerald-100 text-xs font-semibold text-emerald-600"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: [0, -4, 0] }}
            transition={{ opacity: { delay: 1.3, duration: 0.4 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            50+ integrations
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
