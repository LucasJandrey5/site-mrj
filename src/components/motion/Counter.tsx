'use client'

import { useRef } from 'react'
import { formatNumber } from '@/lib/format'
import { gsap, useGSAP } from './gsap'
import { useReducedMotion } from './useReducedMotion'

export interface CounterProps {
  value: number
  suffix?: string
  className?: string
}

/** Conta de 0 até `value` quando entra na tela. No servidor e com reduced motion mostra o valor final. */
export function Counter({ value, suffix = '', className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const el = ref.current
      if (!el || reduced) return
      const state = { n: 0 }
      el.textContent = `0${suffix}`
      gsap.to(state, {
        n: value,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: () => {
          el.textContent = `${formatNumber(Math.round(state.n))}${suffix}`
        },
      })
    },
    { dependencies: [value, suffix, reduced] },
  )

  return (
    <span ref={ref} className={className}>
      {formatNumber(value)}
      {suffix}
    </span>
  )
}
