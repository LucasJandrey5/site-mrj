'use client'

import { useRef, type RefObject } from 'react'
import { ScrollTrigger, useGSAP } from '@/components/motion/gsap'

/**
 * Pina a section #hero por mais 100vh (spec seção 8) e expõe o progresso 0→1
 * num ref, lido pelo useFrame do R3F sem causar re-render do React.
 */
export function useHeroScrollProgress(enabled: boolean): RefObject<number> {
  const progress = useRef(0)

  useGSAP(
    () => {
      const hero = document.getElementById('hero')
      if (!enabled || !hero) return
      const trigger = ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true,
        scrub: true,
        onUpdate: (self) => {
          progress.current = self.progress
        },
      })
      return () => trigger.kill()
    },
    { dependencies: [enabled] },
  )

  return progress
}
