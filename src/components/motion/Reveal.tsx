'use client'

import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP } from './gsap'
import { useReducedMotion } from './useReducedMotion'

export interface RevealProps {
  children: ReactNode
  className?: string
  /** Atraso em segundos, para escalonar cards. */
  delay?: number
  /** Deslocamento inicial em px. */
  y?: number
}

/** Entra com fade + subida ao aparecer na tela, uma única vez. Com reduced motion, renderiza visível. */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const el = ref.current
      if (reduced || !el) return
      gsap.from(el, {
        autoAlpha: 0,
        y,
        duration: 0.8,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    },
    { scope: ref, dependencies: [reduced, delay, y] },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
