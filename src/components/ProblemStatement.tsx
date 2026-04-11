'use client'

import { useEffect, useRef } from 'react'
import { RetroGrid } from '@/components/ui/retro-grid'

export default function ProblemStatement() {
  const linesRef = useRef<(HTMLParagraphElement | null)[]>([])
  const finalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100', 'translate-y-0')
              entry.target.classList.remove('opacity-0', 'translate-y-5')
            }, index * 150)
          }
        })
      },
      { threshold: 0.2 }
    )

    linesRef.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    if (finalRef.current) observer.observe(finalRef.current)

    return () => observer.disconnect()
  }, [])

  return (
    <section className="min-h-screen flex items-center bg-white relative overflow-hidden">
      {/* Retro Grid Background */}
      <RetroGrid className="opacity-40" />
      
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 bg-white/30 z-10" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-20">
        
        {/* Eyebrow */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-widest text-orange-500 font-semibold">
            The Problem
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-6xl font-light tracking-tight mb-16 text-[#111]">
          AI today is stuck in chat.
        </h2>

        {/* Lines */}
        <div className="space-y-6 text-xl md:text-2xl text-gray-700">
          <p
            ref={(el) => { linesRef.current[0] = el }}
            className="transition-all duration-600 ease-out"
          >
            It generates answers
          </p>
          
          <p
            ref={(el) => { linesRef.current[1] = el }}
            className="transition-all duration-600 ease-out"
          >
            But doesn't take action
          </p>
          
          <p
            ref={(el) => { linesRef.current[2] = el }}
            className="transition-all duration-600 ease-out"
          >
            No connection to systems
          </p>
          
          <p
            ref={(el) => { linesRef.current[3] = el }}
            className="transition-all duration-600 ease-out"
          >
            No execution
          </p>
          
          <p
            ref={(el) => { linesRef.current[4] = el }}
            className="transition-all duration-600 ease-out"
          >
            No governance
          </p>
        </div>

        {/* Final Punch */}
        <div
          ref={finalRef}
          className="mt-16 transition-all duration-600 ease-out"
        >
          <p className="text-2xl md:text-4xl font-semibold text-[#111]">
            If AI <span className="text-orange-500">can't act</span>,
            it <span className="text-orange-500">can't scale</span>.
          </p>
        </div>

      </div>
    </section>
  )
}
