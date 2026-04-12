'use client'

import { useRef } from 'react'
import { useScroll, useTransform, useReducedMotion } from 'framer-motion'

/**
 * Returns a ref + multiple MotionValues for parallax layering.
 * @param bgSpeed    background layer speed (0–1), default 0.15 (ultra slow)
 * @param midSpeed   mid-ground speed, default 0.35
 * @param fgSpeed    foreground speed, default 0.6
 */
export function useParallaxLayer(
  bgSpeed = 0.15,
  midSpeed = 0.35,
  fgSpeed = 0.6,
) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const factor = reduced ? 0 : 1

  const bgY   = useTransform(scrollYProgress, [0, 1], [`${bgSpeed  * -50 * factor}%`, `${bgSpeed  * 50 * factor}%`])
  const midY  = useTransform(scrollYProgress, [0, 1], [`${midSpeed * -50 * factor}%`, `${midSpeed * 50 * factor}%`])
  const fgY   = useTransform(scrollYProgress, [0, 1], [`${fgSpeed  * -50 * factor}%`, `${fgSpeed  * 50 * factor}%`])

  return { ref, bgY, midY, fgY, scrollYProgress }
}

/**
 * Simpler single-layer hook for hero (scrolls from top).
 */
export function useHeroParallax(speed = 0.25) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const factor = reduced ? 0 : 1

  const bgY    = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 1.5 * 100 * factor}%`])
  const orbsY  = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100 * factor}%`])
  const cardsY = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 0.55 * 100 * factor}%`])
  const textY  = useTransform(scrollYProgress, [0, 1], ['0%', `${-speed * 0.3 * 100 * factor}%`])
  const chipsY = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 1.8 * 100 * factor}%`])

  return { ref, bgY, orbsY, cardsY, textY, chipsY, scrollYProgress }
}
