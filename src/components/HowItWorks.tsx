"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const stages = [
  { 
    id: "build", 
    label: "BUILD",
    subtitle: "Create intelligent agents",
    desc: "Connect data, tools, and systems into executable units.",
    logs: [
      "→ Connecting knowledge sources",
      "→ Loading vector indexes",
      "✓ Agents initialized"
    ],
    illustration: <BuildIllustration />
  },
  { 
    id: "orchestrate", 
    label: "ORCHESTRATE",
    subtitle: "Design how work flows",
    desc: "Define logic, approvals, and multi-step execution paths.",
    logs: [
      "→ Mapping workflow logic",
      "→ Applying approval rules",
      "✓ Execution graph ready"
    ],
    illustration: <OrchestrateIllustration />
  },
  { 
    id: "execute", 
    label: "EXECUTE",
    subtitle: "Turn decisions into actions",
    desc: "Agents trigger APIs, update systems, and complete tasks.",
    logs: [
      "→ Triggering APIs",
      "→ Updating systems",
      "✓ Task completed"
    ],
    illustration: <ExecuteIllustration />
  },
];

export default function HowItWorks() {
  const [activeStage, setActiveStage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef   = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const headerY = useTransform(scrollYProgress, [0, 0.4], ['40px', '0px']);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 6500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-white text-black flex items-center justify-center overflow-hidden"
    >

      <div className="relative z-10 max-w-7xl w-full px-6 py-14 md:py-20">
        {/* Header with scroll-driven entrance */}
        <motion.div 
          className="mb-12 text-center"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-8 bg-gradient-to-br from-black via-black to-black/70 bg-clip-text text-transparent">
              How Aziron Works
            </h2>
          </motion.div>
          <motion.p 
            className="font-sans text-xl md:text-2xl text-black/60 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Real-time execution — not just automation, but action.
          </motion.p>
        </motion.div>

        {/* Premium System Container */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative p-6 md:p-8 lg:p-10 overflow-hidden">
            {/* Animated connection line */}
            <div className="hidden lg:block absolute left-16 right-16 top-[88px] h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent" />
            
            <motion.div
              className="hidden lg:block absolute top-[88px] h-[3px] bg-gradient-to-r from-orange-500/0 via-orange-500 to-orange-500/0 shadow-[0_0_24px_rgba(249,115,22,0.6)]"
              style={{ left: "4rem" }}
              animate={{ 
                width: ["0%", "calc(100% - 8rem)"],
                opacity: [0, 1, 1, 0]
              }}
              transition={{ 
                duration: 6.5,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.08, 0.92, 1]
              }}
            />

            {/* Stages Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative">
              {stages.map((stage, index) => {
                const isActive = index === activeStage;

                return (
                  <motion.div
                    key={stage.id}
                    className="relative flex flex-col group/card"
                    onHoverStart={() => setIsPaused(true)}
                    onHoverEnd={() => setIsPaused(false)}
                    initial={{ opacity: 0, x: index === 0 ? -40 : index === 1 ? 0 : 40, y: index === 1 ? 30 : 0 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.5 + index * 0.15,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  >
                    {/* Premium icon with magnetic effect */}
                    <motion.div 
                      className="mb-6 relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-white to-gray-50 border border-black/[0.08] flex items-center justify-center p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] mx-auto lg:mx-0 cursor-pointer"
                      whileHover={{ 
                        scale: 1.08,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.4, ease: "easeOut" }
                      }}
                      animate={{
                        scale: isActive ? 1.12 : 1,
                        y: isActive ? -4 : 0,
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 20 
                      }}
                    >
                      {/* Animated rings when active */}
                      <AnimatePresence>
                        {isActive && (
                          <>
                            <motion.div
                              className="absolute inset-0 rounded-full border border-orange-500/25"
                              initial={{ scale: 1, opacity: 0.3 }}
                              animate={{
                                scale: [1, 1.18, 1.32],
                                opacity: [0.3, 0.14, 0]
                              }}
                              exit={{ opacity: 0 }}
                              transition={{
                                duration: 2.4,
                                repeat: Infinity,
                                ease: "easeOut"
                              }}
                            />
                            <motion.div
                              className="absolute inset-2 rounded-full bg-orange-500/10 blur-xl"
                              layoutId="icon-glow"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          </>
                        )}
                      </AnimatePresence>

                      <div className="relative z-10">
                        {stage.illustration}
                      </div>
                    </motion.div>

                    {/* Stage label */}
                    <motion.div 
                      className="text-[0.65rem] font-bold tracking-[0.25em] uppercase mb-4 font-sans text-center lg:text-left"
                      animate={{
                        color: isActive ? "rgb(249, 115, 22)" : "rgb(0, 0, 0, 0.6)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {stage.label}
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-semibold text-black font-display mb-3 text-center lg:text-left leading-tight">
                      {stage.subtitle}
                    </h3>

                    {/* Description */}
                    <p className="text-base text-black/50 leading-relaxed font-sans mb-5 text-center lg:text-left">
                      {stage.desc}
                    </p>

                    {/* Terminal logs card */}
                    <motion.div 
                      className="relative p-6 lg:p-7 rounded-2xl border overflow-hidden mt-auto"
                      animate={{
                        borderColor: isActive 
                          ? "rgba(249, 115, 22, 0.3)" 
                          : "rgba(0,0,0,0.08)",
                        backgroundColor: isActive 
                          ? "rgba(255, 255, 255, 1)" 
                          : "rgba(249, 250, 251, 0.6)",
                        boxShadow: isActive
                          ? "0 8px 32px rgba(249, 115, 22, 0.08)"
                          : "0 2px 8px rgba(0, 0, 0, 0.02)"
                      }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Gradient overlay when active */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.03] via-transparent to-orange-400/[0.02]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Terminal header */}
                      <div className="flex items-center gap-1.5 mb-5 relative z-10">
                        {[0, 1, 2].map((i) => (
                          <motion.div 
                            key={i}
                            className="w-2.5 h-2.5 rounded-full"
                            animate={{
                              backgroundColor: isActive 
                                ? ["#EF4444", "#F59E0B", "#10B981"][i]
                                : "#D1D5DB"
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        ))}
                      </div>

                      {/* Logs with typing effect */}
                      <div className="space-y-3.5 text-[13px] font-mono relative z-10">
                        {stage.logs.map((log, i) => {
                          const isCheckmark = log.startsWith("✓");
                          const cleanLog = log.replace(/^[→✓]\s*/, "");
                          
                          return (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ 
                                opacity: isActive ? 1 : 0.35, 
                                x: 0,
                              }}
                              transition={{ 
                                delay: isActive ? i * 0.4 : 0,
                                duration: 0.4,
                                ease: [0.16, 1, 0.3, 1]
                              }}
                              className="flex items-start gap-3"
                            >
                              {/* Icon */}
                              <motion.span 
                                className="flex-shrink-0 mt-0.5"
                                animate={{
                                  color: isActive 
                                    ? (isCheckmark ? "#10B981" : "#F97316")
                                    : "#9CA3AF"
                                }}
                              >
                                {isCheckmark ? (
                                  <motion.span
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ 
                                      scale: isActive ? 1 : 0.8,
                                      rotate: isActive ? 0 : -180
                                    }}
                                    transition={{ 
                                      delay: isActive ? i * 0.4 + 0.3 : 0,
                                      type: "spring",
                                      stiffness: 400,
                                      damping: 15
                                    }}
                                  >
                                    ✓
                                  </motion.span>
                                ) : "→"}
                              </motion.span>

                              {/* Text with typing reveal */}
                              <motion.span
                                className="leading-relaxed"
                                animate={{
                                  color: isActive ? "#171717" : "#4B5563"
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                {isActive ? (
                                  <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ 
                                      delay: i * 0.4 + 0.1,
                                      duration: 0.3
                                    }}
                                  >
                                    {cleanLog}
                                  </motion.span>
                                ) : cleanLog}
                              </motion.span>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Progress indicator for active stage */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-orange-500 to-orange-400 rounded-b-2xl"
                            initial={{ scaleX: 0, originX: 0 }}
                            animate={{ scaleX: 1 }}
                            exit={{ scaleX: 0 }}
                            transition={{ duration: 6.5, ease: "linear" }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Premium stage indicators */}
            <div className="flex justify-center items-center gap-4 mt-8">
              {stages.map((stage, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveStage(index);
                    setIsPaused(true);
                    setTimeout(() => setIsPaused(false), 6000);
                  }}
                  className="group relative flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-300 hover:bg-black/[0.02]"
                >
                  <motion.div
                    className="relative w-2 h-2 rounded-full"
                    animate={{
                      backgroundColor: index === activeStage 
                        ? "rgb(249, 115, 22)" 
                        : "rgba(0,0,0,0.15)",
                      scale: index === activeStage ? 1 : 0.85
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {index === activeStage && (
                      <motion.div
                        layoutId="active-dot-glow"
                        className="absolute inset-0 rounded-full bg-orange-500 blur-md opacity-60"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.div>
                  
                  <motion.span 
                    className="text-xs font-medium hidden md:block"
                    animate={{
                      color: index === activeStage ? "rgb(249, 115, 22)" : "rgba(0,0,0,0.3)",
                      opacity: index === activeStage ? 1 : 0.6
                    }}
                  >
                    {stage.label}
                  </motion.span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Punchline */}
        <motion.p 
          className="relative z-10 mt-20 text-center text-lg md:text-xl text-black/60 font-sans"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Not just answers.{" "}
          <span className="text-black font-semibold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            Real execution.
          </span>
        </motion.p>
      </div>
    </section>
  );
}

/* ─── BUILD ILLUSTRATION ─── */
function BuildIllustration() {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="none"
        className="w-12 h-12"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <g strokeWidth="14" strokeLinecap="round" strokeLinejoin="round">

          {/* Connections — grey, drawn on */}
          <g stroke="#A0A9B8">
            {[
              "M58.622 256h194.252",
              "M252.874 327.025h-119.09c-4.712 0-9.04 2.599-11.252 6.756l-19.556 36.761",
              "M250.216 398.124h-56.877c-7.038 0-12.743 5.701-12.743 12.733v25.772",
              "M252.874 184.974h-119.09c-4.712 0-9.04-2.599-11.252-6.756l-19.556-36.761",
              "M250.216 113.876h-56.877c-7.038 0-12.743-5.701-12.743-12.733V75.372",
            ].map((d, i) => (
              <motion.path
                key={i} d={d}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: "easeOut" }}
              />
            ))}
          </g>

          {/* Traveling dots along grey connection lines */}
          {[
            { cx: [58, 155, 253],   cy: [256, 256, 256],   dur: 2.2, delay: 1.2 },
            { cx: [253, 190, 103],  cy: [327, 348, 370],   dur: 2.5, delay: 1.5 },
            { cx: [253, 220, 181],  cy: [184, 155, 121],   dur: 2.0, delay: 1.8 },
          ].map(({ cx, cy, dur, delay }, i) => (
            <motion.circle
              key={`dot-${i}`} r="8" fill="#A0A9B8"
              animate={{ cx, cy, opacity: [0, 1, 1, 0] }}
              transition={{ duration: dur, repeat: Infinity, delay, ease: "easeInOut", repeatDelay: 1 }}
            />
          ))}

          {/* Core — breathes opacity */}
          <g stroke="#2D3748">
            <motion.path
              d="M429.277 293.856c25.552 11.575 43.326 37.286 43.326 67.144v0c0 40.695-33.016 73.684-73.743 73.684h-11.062v.1c0 36.058-28.865 65.947-64.951 66.214-36.373.269-65.943-29.111-65.943-65.393V76.81c0-36.346 29.487-65.809 65.862-65.809s65.862 29.464 65.862 65.809v28.488"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: [0, 1] }}
              viewport={{ once: true }}
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{
                pathLength: { duration: 1, delay: 0.2, ease: "easeOut" },
                opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
              }}
            />
          </g>

          {/* Arcs */}
          <g stroke="#2D3748">
            {[
              "M425.384 209.325c31.481-5.385 55.44-32.785 55.44-65.777v0c0-36.857-29.903-66.736-66.79-66.736h-23.413",
              "M468.409 183.149C488.413 201.05 501 227.056 501 256s-12.587 54.95-32.591 72.851",
            ].map((d, i) => (
              <motion.path
                key={i} d={d}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 + i * 0.15, ease: "easeOut" }}
              />
            ))}
          </g>

          {/* Intelligence lines */}
          <g stroke="#2D3748">
            {[
              "M400.705 395.966c.249 14.261-6.774 28.296-19.757 36.413-14.019 8.764-31.21 8.266-44.4.155",
              "M422.567 267.135c1.321 18.869-6.72 37.35-22.835 47.931-17.401 11.425-39.528 10.558-57.048-.331",
              "M325.679 285.639c10.188 5.714 17.004 16.122 17.003 28.013 0 12.841-7.947 23.951-19.505 29.29",
              "M350.277 112.936c10.91-6.781 24.559-7.827 36.026-1.525 12.383 6.805 18.885 20.344 17.909 34.303",
            ].map((d, i) => (
              <motion.path
                key={i} d={d}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.1, ease: "easeOut" }}
              />
            ))}
          </g>

          {/* Nodes — pop in, then pulse continuously */}
          <g stroke="#2D3748">
            {[
              { cx: 91.924,  cy: 368.194, r: 23.14, entryDelay: 0.3,  pulseDelay: 0   },
              { cx: 180.869, cy: 49.586,  r: 23.14, entryDelay: 0.4,  pulseDelay: 0.4 },
              { cx: 34.14,   cy: 256,     r: 23.14, entryDelay: 0.2,  pulseDelay: 0.8 },
              { cx: 91.924,  cy: 120.684, r: 23.14, entryDelay: 0.35, pulseDelay: 1.2 },
              { cx: 180.869, cy: 439.292, r: 23.14, entryDelay: 0.45, pulseDelay: 1.6 },
            ].map(({ cx, cy, r, entryDelay, pulseDelay }, i) => (
              <motion.circle
                key={i} cx={cx} cy={cy} r={r}
                fill="white"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                animate={{ scale: [1, 1.18, 1] }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
                transition={{
                  scale: { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: pulseDelay, repeatDelay: 0.6 },
                  opacity: { duration: 0.4, delay: entryDelay },
                }}
              />
            ))}
          </g>

        </g>
      </motion.svg>
    </div>
  );
}

/* ─── ORCHESTRATE ILLUSTRATION ─── */
function OrchestrateIllustration() {
  const paths: { d: string; delay: number; stroke?: string }[] = [
    // Base structure
    { d: "M75.362 329.313H67.85c-33.33 0-60.35 27.02-60.35 60.35v80.31c0 14.31 11.61 25.92 25.93 25.92H387.6", delay: 0.1 },
    { d: "M327.26 329.313H110.461", delay: 0.15 },
    { d: "M160.92 281.975h73.27v47.34h-73.27z", delay: 0.2 },
    // Left connector
    { d: "M197.553 329.313l-48.673 41.459c-6.669 5.68-16.909 3.503-20.69-4.399l-17.73-37.06h87.093z", delay: 0.25 },
    // Right connector
    { d: "M284.05 330.563l.6-1.25h-87.1l48.68 41.46c3.48 2.97 7.95 3.79 11.96 2.76", delay: 0.3 },
    // Main platform
    { d: "M443.639 495.895H226.98l36.776-144.196c3.359-13.17 15.22-22.385 28.811-22.385h186.75c15.314 0 26.525 14.429 22.74 29.268l-29.238 114.641c-3.402 13.338-15.415 22.672-29.18 22.672z", delay: 0.35 },
    { d: "M226.98 495.895h-86.434c-10.675 0-19.329-8.654-19.329-19.329v0c0-10.675 8.654-19.329 19.329-19.329h96.293l-9.859 38.658z", delay: 0.4 },
    // Screen
    { d: "M261.542 281.975H133.564c-17.484 0-31.658-14.174-31.658-31.658V117.339c0-17.484 14.174-31.658 31.658-31.658h127.978c17.484 0 31.658 14.174 31.658 31.658v132.978c0 17.484-14.174 31.658-31.658 31.658z", delay: 0.45 },
    // Internal content
    { d: "M141.774 226.829l32.294-84.791c.66-1.613 2.944-1.616 3.607-.004l32 84.795", delay: 0.5 },
    { d: "M151.845 205.712h47.921", delay: 0.55, stroke: "#2D3748" },
    { d: "M240.894 140.827v86.002", delay: 0.6, stroke: "#2D3748" },
    // Network connections
    { d: "M293.2 232.912h52.076c4.26 0 8.303 1.875 11.055 5.127l23.205 27.417", delay: 0.65, stroke: "#2D3748" },
    { d: "M101.906 133.078H75.154c-4.26 0-8.303-1.875-11.055-5.127l-23.205-27.417", delay: 0.7, stroke: "#2D3748" },
    { d: "M101.906 183.828H38.378", delay: 0.72, stroke: "#2D3748" },
    { d: "M101.906 232.912H75.154c-4.26 0-8.303 1.875-11.055 5.127l-23.205 27.417", delay: 0.74, stroke: "#2D3748" },
    // AI / Chat bubble
    { d: "M293.2 183.828h53.747", delay: 0.78, stroke: "#2D3748" },
    { d: "M457.59 146.955c26.748-11.256 45.207-35.166 45.207-62.842 0-38.5-35.72-69.71-79.782-69.71s-79.782 31.21-79.782 69.71c0 28.761 19.936 53.451 48.391 64.104l-6.644 19.39c-1.32 3.852 2.883 7.257 6.377 5.165l31.658-18.948", delay: 0.5 },
  ];

  const nodes = [
    { cx: 374.675, cy: 413.786, r: 20.787, delay: 0.55 },
    { cx: 388.637, cy: 277.728, r: 15.438, delay: 0.65 },
    { cx: 22.94,   cy: 183.828, r: 15.438, delay: 0.7  },
    { cx: 31.792,  cy: 88.263,  r: 15.438, delay: 0.75 },
    { cx: 31.792,  cy: 277.728, r: 15.438, delay: 0.8  },
  ];

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 510.297 510.297"
        fill="none"
        className="w-12 h-12"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <g strokeWidth="14" strokeLinecap="round" strokeLinejoin="round">
          {paths.map(({ d, delay, stroke }, i) => (
            <motion.path
              key={i}
              d={d}
              stroke={stroke ?? "#2D3748"}
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay, ease: "easeOut" }}
            />
          ))}
          {nodes.map(({ cx, cy, r, delay }, i) => (
            <motion.circle
              key={i}
              cx={cx} cy={cy} r={r}
              stroke="#2D3748"
              fill="white"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              animate={{ scale: [1, 1.18, 1] }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
              transition={{
                scale: { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.4, repeatDelay: 0.5 },
                opacity: { duration: 0.4, delay },
              }}
            />
          ))}

          {/* Traveling dots along network connection lines */}
          {[
            { cx: [293, 345, 380], cy: [233, 255, 265], dur: 2.0, delay: 1.4 },
            { cx: [102, 75, 41],   cy: [183, 183, 183], dur: 1.8, delay: 1.7 },
            { cx: [102, 75, 41],   cy: [133, 110, 100], dur: 2.2, delay: 2.0 },
          ].map(({ cx, cy, dur, delay }, i) => (
            <motion.circle
              key={`flow-${i}`} r="6" fill="#A0A9B8" stroke="none"
              animate={{ cx, cy, opacity: [0, 1, 1, 0] }}
              transition={{ duration: dur, repeat: Infinity, delay, ease: "easeInOut", repeatDelay: 1.2 }}
            />
          ))}

          {/* Typing indicator dots (chat bubble) */}
          {[387.603, 425.986, 464.369].map((x, i) => (
            <motion.circle
              key={`type-${i}`}
              cx={x} cy={85.271} r="12"
              fill="#A0A9B8" stroke="none"
              animate={{ cy: [85.271, 68, 85.271], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.2, repeatDelay: 0.4 }}
            />
          ))}
        </g>
      </motion.svg>
    </div>
  );
}

/* ─── EXECUTE ILLUSTRATION ─── */
function ExecuteIllustration() {
  const listRows = [
    { small: "M329.027 296.169h-18.936c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h18.936c4.143 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5z", long: "M355.008 311.169h58.569c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5h-58.569c-4.143 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5z" },
    { small: "M329.027 324.722h-18.936c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h18.936c4.143 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5z", long: "M355.008 339.722h58.569c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5h-58.569c-4.143 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5z" },
    { small: "M329.027 353.273h-18.936c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h18.936c4.143 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5z", long: "M355.008 368.273h58.569c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5h-58.569c-4.143 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5z" },
    { small: "M329.027 381.825h-18.936c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h18.936c4.143 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5z", long: "M355.008 396.825h58.569c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5h-58.569c-4.143 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5z" },
    { small: "M329.027 410.378h-18.936c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h18.936c4.143 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5z", long: "M355.008 425.378h58.569c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5h-58.569c-4.143 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5z" },
    { small: "M329.027 438.93h-18.936c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h18.936c4.143 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5z", long: null },
  ];

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="none"
        className="w-12 h-12"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* List panel background */}
        <motion.path
          d="M449.642 418.312V282.953c0-11.266-9.166-20.431-20.432-20.431H294.458c-11.266 0-20.432 9.165-20.432 20.431v184.193c0 11.266 9.166 20.431 20.432 20.431h40.082c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5h-40.082a5.438 5.438 0 0 1-5.432-5.431V282.953a5.438 5.438 0 0 1 5.432-5.431H429.21a5.438 5.438 0 0 1 5.432 5.431v137.084c-10.745 3.054-19.93 9.854-26.046 18.893h-53.588c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h46.916a46.79 46.79 0 0 0-1.353 11.2c0 2.534.203 5.021.592 7.447H363.54c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h42.765C414.272 502.118 429.724 512 447.441 512c25.844 0 46.869-21.025 46.869-46.87 0-25.106-19.842-45.664-44.668-46.818zM447.441 497c-17.572 0-31.869-14.297-31.869-31.87 0-17.572 14.297-31.869 31.869-31.869s31.869 14.297 31.869 31.869c0 17.573-14.297 31.87-31.869 31.87z"
          fill="#2D3748"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        />

        {/* List rows — staggered */}
        {listRows.map(({ small, long }, i) => (
          <motion.g key={i}
            initial={{ opacity: 0, x: 8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.5 + i * 0.08 }}
          >
            <path d={small} fill="#A0A9B8" />
            {long && <path d={long} fill="#2D3748" />}
          </motion.g>
        ))}

        {/* Checkmark (done indicator) */}
        <motion.path
          d="m452.887 452.615-9.118 9.119-1.775-1.776a7.5 7.5 0 0 0-10.607 10.607l7.079 7.079c1.465 1.464 3.385 2.196 5.304 2.196s3.839-.732 5.304-2.196l14.422-14.422a7.5 7.5 0 1 0-10.609-10.607z"
          fill="white"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          style={{ transformOrigin: "447px 465px" }}
          transition={{ duration: 0.4, delay: 1.1, ease: "backOut" }}
        />

        {/* Arrow button */}
        <motion.path
          d="M250.667 383.639l-25.95-22.306a7.5 7.5 0 0 0-9.777 11.375l10.607 9.117h-59.104v-79.12c0-4.143-3.357-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v86.62c0 4.143 3.357 7.5 7.5 7.5h66.605l-10.608 9.118a7.499 7.499 0 0 0 4.891 13.187 7.474 7.474 0 0 0 4.886-1.812l25.95-22.305c1.657-1.425 2.611-3.502 2.611-5.688s-.953-4.262-2.611-5.686z"
          fill="#A0A9B8"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.6 }}
        />

        {/* Main gear outer cog — slow rotate */}
        <motion.path
          d="M263.224 194.435a1.415 1.415 0 0 1 .002-1.086l6.295-15.195a1.42 1.42 0 0 1 .766-.77l19.824-8.297a16.387 16.387 0 0 0 10.083-15.151v-25.367a16.383 16.383 0 0 0-10.084-15.151l-19.824-8.299a1.438 1.438 0 0 1-.766-.769l-6.294-15.195a1.433 1.433 0 0 1-.002-1.086l8.15-19.885a16.383 16.383 0 0 0-3.584-17.843l-17.938-17.939a16.388 16.388 0 0 0-17.843-3.582l-19.886 8.149a1.41 1.41 0 0 1-1.086-.002l-15.195-6.295a1.42 1.42 0 0 1-.77-.766l-8.297-19.825A16.383 16.383 0 0 0 171.625 0h-25.367a16.382 16.382 0 0 0-15.151 10.083l-8.299 19.825a1.42 1.42 0 0 1-.769.765l-15.198 6.295a1.425 1.425 0 0 1-1.083.001L85.873 28.82a16.39 16.39 0 0 0-17.844 3.583L50.092 50.34a16.388 16.388 0 0 0-3.583 17.845l8.102 19.766.062.185c1.355 3.914 5.621 5.968 9.533 4.609 3.914-1.354 5.98-5.65 4.626-9.565a12.298 12.298 0 0 0-.294-.8l-8.149-19.883a1.42 1.42 0 0 1 .312-1.549L78.637 43.01a1.434 1.434 0 0 1 1.548-.312l19.884 8.149a16.314 16.314 0 0 0 12.516-.023l15.195-6.294a16.315 16.315 0 0 0 8.865-8.833l8.299-19.823a1.42 1.42 0 0 1 1.314-.874h25.367c.576 0 1.093.344 1.314.874l8.298 19.824a16.324 16.324 0 0 0 8.866 8.832l15.192 6.294a16.308 16.308 0 0 0 12.517.023l19.885-8.149a1.43 1.43 0 0 1 1.549.311l17.938 17.939c.407.406.529 1.015.312 1.547l-8.15 19.884a16.328 16.328 0 0 0 .023 12.516l6.294 15.195a16.315 16.315 0 0 0 8.833 8.865l19.824 8.299c.531.222.874.738.874 1.314v25.367a1.42 1.42 0 0 1-.875 1.314l-19.825 8.298a16.33 16.33 0 0 0-8.831 8.866l-6.295 15.195a16.32 16.32 0 0 0-.022 12.515l8.15 19.884a1.423 1.423 0 0 1-.312 1.549l-17.937 17.937a1.42 1.42 0 0 1-1.548.312l-19.885-8.15a16.323 16.323 0 0 0-12.516.023l-15.193 6.293a16.327 16.327 0 0 0-8.867 8.834l-8.297 19.822a1.423 1.423 0 0 1-1.315.876h-25.367a1.421 1.421 0 0 1-1.315-.875l-8.297-19.822a16.322 16.322 0 0 0-8.866-8.834l-15.195-6.294a16.314 16.314 0 0 0-12.516-.023l-19.883 8.15a1.43 1.43 0 0 1-1.55-.312l-17.936-17.936a1.425 1.425 0 0 1-.312-1.55l8.149-19.884a16.323 16.323 0 0 0-.023-12.516l-6.293-15.193a16.323 16.323 0 0 0-8.834-8.867l-19.821-8.297a1.423 1.423 0 0 1-.876-1.315v-25.367c0-.576.343-1.093.874-1.315l18.862-7.896a7.498 7.498 0 0 0 4.022-9.813 7.5 7.5 0 0 0-9.813-4.022l-18.862 7.895a16.385 16.385 0 0 0-10.083 15.152v25.367c0 6.64 3.957 12.587 10.083 15.152l19.822 8.296c.35.146.622.42.768.771l6.294 15.196c.145.349.146.733.002 1.085l-8.149 19.885a16.39 16.39 0 0 0 3.584 17.844L68.029 250.1a16.388 16.388 0 0 0 17.846 3.585l19.884-8.15c.346-.141.74-.141 1.086.002l15.195 6.294c.345.144.625.422.77.767l8.297 19.822a16.386 16.386 0 0 0 15.152 10.085h25.367c6.64 0 12.587-3.958 15.152-10.084l8.296-19.821c.146-.351.42-.623.771-.769l15.193-6.293a1.417 1.417 0 0 1 1.087-.003l19.886 8.15a16.39 16.39 0 0 0 17.844-3.584l17.937-17.937a16.388 16.388 0 0 0 3.584-17.845z"
          fill="#2D3748"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "158.942px 141.252px" }}
        />

        {/* Main gear center circle */}
        <motion.path
          d="M158.942 207.729c36.655 0 66.477-29.821 66.477-66.477s-29.821-66.478-66.477-66.478-66.477 29.821-66.477 66.478c0 36.655 29.822 66.477 66.477 66.477zm0-117.955c28.384 0 51.477 23.093 51.477 51.478 0 28.384-23.093 51.477-51.477 51.477s-51.477-23.093-51.477-51.477c0-28.385 23.093-51.478 51.477-51.478z"
          fill="#A0A9B8"
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "158.942px 141.252px" }}
        />

        {/* Small gear outer ring */}
        <motion.path
          d="M381.458 136.214c24.589 0 44.593-20.004 44.593-44.593 0-2.138-.159-4.312-.472-6.464-.597-4.099-4.407-6.946-8.502-6.342a7.5 7.5 0 0 0-6.342 8.502 30.04 30.04 0 0 1 .315 4.304c0 16.317-13.275 29.593-29.593 29.593s-29.592-13.275-29.592-29.593 13.274-29.593 29.592-29.593a29.372 29.372 0 0 1 17.191 5.515 7.5 7.5 0 0 0 8.729-12.199c-7.603-5.439-16.566-8.315-25.92-8.315-24.588 0-44.592 20.004-44.592 44.593s20.005 44.592 44.593 44.592z"
          fill="#2D3748"
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "381.458px 91.621px" }}
        />

        {/* Small gear cog mechanism */}
        <motion.path
          d="m297.887 111.694 11.75 4.919 3.363 8.121-4.83 11.786a13.082 13.082 0 0 0 2.86 14.247l11.283 11.282a13.078 13.078 0 0 0 14.245 2.859l11.786-4.831 8.12 3.363 4.919 11.753a13.084 13.084 0 0 0 12.097 8.049h15.954a13.085 13.085 0 0 0 12.098-8.051l4.917-11.75 8.121-3.364 11.786 4.831a13.082 13.082 0 0 0 14.247-2.86l11.281-11.281a13.082 13.082 0 0 0 2.86-14.247l-4.831-11.785 3.364-8.122 11.748-4.918a13.08 13.08 0 0 0 8.053-12.097V83.645c0-5.302-3.16-10.05-8.05-12.097h-.001l-11.75-4.919-3.363-8.121 4.83-11.786a13.08 13.08 0 0 0-2.86-14.246l-11.281-11.281a13.086 13.086 0 0 0-14.247-2.861l-11.786 4.831-8.121-3.363-4.918-11.753A13.081 13.081 0 0 0 389.435 0h-15.954a13.083 13.083 0 0 0-12.097 8.05l-4.92 11.752-8.119 3.362-11.789-4.832a13.083 13.083 0 0 0-14.244 2.862l-11.279 11.28a13.077 13.077 0 0 0-2.862 14.246L313 58.509l-3.363 8.12-11.751 4.919a13.082 13.082 0 0 0-8.05 12.097v15.954a13.08 13.08 0 0 0 8.051 12.095zm6.949-26.795 11.312-4.734a13.041 13.041 0 0 0 7.051-7.078l3.956-9.554a13.017 13.017 0 0 0 .02-9.993l-4.648-11.346 9.506-9.506 11.342 4.648a13.015 13.015 0 0 0 9.994-.017l9.56-3.96a13.023 13.023 0 0 0 7.074-7.052L374.736 15h13.444l4.733 11.309a13.04 13.04 0 0 0 7.078 7.054l9.556 3.957a13.03 13.03 0 0 0 9.993.019l11.344-4.649 9.506 9.506-4.649 11.346a13.028 13.028 0 0 0 .019 9.99l3.959 9.558a13.035 13.035 0 0 0 7.052 7.077l11.31 4.734v13.443l-11.312 4.734a13.041 13.041 0 0 0-7.051 7.078l-3.957 9.556a13.035 13.035 0 0 0-.02 9.993l4.649 11.345-9.505 9.505-11.347-4.65a13.032 13.032 0 0 0-9.99.02l-9.556 3.958a13.039 13.039 0 0 0-7.08 7.053l-4.732 11.31h-13.444l-4.733-11.308a13.021 13.021 0 0 0-7.078-7.054l-9.56-3.961a13.052 13.052 0 0 0-9.989-.017l-11.345 4.649-9.505-9.506 4.647-11.342a13.029 13.029 0 0 0-.017-9.994l-3.959-9.558a13.035 13.035 0 0 0-7.052-7.077l-11.31-4.734V84.899z"
          fill="#2D3748"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "381.458px 91.621px" }}
        />
      </motion.svg>
    </div>
  );
}
