'use client'

import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useRef } from 'react'

const capabilities = [
  {
    title: 'Multi-Agent Engine',
    description:
      'Specialized agents collaborate, reason, and execute tasks as a unified system.',
  },
  {
    title: 'Workflow Builder',
    description:
      'Design multi-step execution flows with branching, retries, and approvals.',
  },
  {
    title: 'Knowledge Hub (RAG)',
    description:
      'Ground every decision with enterprise data across multiple knowledge sources.',
  },
  {
    title: 'Tool Ecosystem',
    description:
      'Connect APIs, databases, and systems — turning intent into real actions.',
  },
  {
    title: 'Developer Layer',
    description:
      'Extend the system with custom agents, tools, and APIs.',
  },
  {
    title: 'Observability',
    description:
      'Trace executions, monitor performance, and optimize in real-time.',
  },
]

export default function PlatformCapabilities() {
  const ref = useRef(null)

  // Scroll progress
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })

  // Spine grows with scroll
  const spineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      ref={ref}
      className="relative bg-white text-aziron-dark py-40 overflow-hidden"
    >
      {/* ===== Background Mesh + Gradient ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[700px] h-[700px] bg-aziron-orange/10 blur-[120px] rounded-full top-[-200px] left-1/2 -translate-x-1/2" />
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#0A2540_1px,transparent_1px),linear-gradient(to_bottom,#0A2540_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* ===== Heading ===== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-32"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-4">
            Platform Architecture
          </p>

          <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight text-aziron-dark">
            One Platform.
            <br />
            Full Execution Stack.
          </h2>

          <p className="mt-6 text-aziron-muted max-w-2xl mx-auto text-lg">
            Agents, workflows, tools, and intelligence — unified into a single execution system.
          </p>
        </motion.div>

        {/* ===== Spine ===== */}
        <div className="relative">

          {/* Static spine */}
          <div className="absolute left-1/2 top-0 w-px h-full bg-aziron-border" />

          {/* Growing spine */}
          <motion.div
            style={{ height: spineHeight }}
            className="absolute left-1/2 top-0 w-px bg-aziron-orange"
          />

          {/* Pulses */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 -translate-x-1/2 w-[5px] h-16 bg-aziron-orange rounded-full opacity-70"
              animate={{ y: ['0%', '100%'] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                delay: i * 1.2,
                ease: 'linear',
              }}
            />
          ))}

          {/* ===== Nodes ===== */}
          <div className="space-y-32">
            {capabilities.map((item, index) => {
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                  }}
                  className={`relative flex items-center ${
                    isLeft ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {/* Node */}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-aziron-orange rounded-full ring-4 ring-aziron-orange/20"
                  />

                  {/* Connector */}
                  <div
                    className={`absolute top-1/2 h-px ${
                      isLeft
                        ? 'left-1/2 w-[18%]'
                        : 'right-1/2 w-[18%]'
                    } bg-aziron-border`}
                  />

                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -6, borderColor: 'rgba(249, 115, 22, 0.3)' }}
                    className="w-full md:w-[44%] bg-white border border-aziron-border rounded-xl p-8 shadow-[0_15px_40px_rgba(10,37,64,0.08)] transition-all duration-300 hover:shadow-[0_30px_80px_rgba(10,37,64,0.12)]"
                  >
                    <h3 className="text-2xl font-bold mb-3 text-aziron-dark">
                      {item.title}
                    </h3>

                    <p className="text-aziron-text-soft leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* ===== Footer ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-40"
        >
          <p className="text-aziron-muted text-sm tracking-[0.25em] uppercase">
            From AI responses → to real execution
          </p>
        </motion.div>
      </div>
    </section>
  )
}
