'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/components/motion/gsap'
import { useReducedMotion } from '@/components/motion/useReducedMotion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { VideoBlock } from '@/components/ui/VideoBlock'
import { processVideo } from '@/data/media'
import { processSteps } from '@/data/process'

/** Linha do tempo em cinco etapas; a linha azul se preenche com o scroll (spec seção 6, item 6). */
export function Process({ compact = false }: { compact?: boolean }) {
  const listRef = useRef<HTMLOListElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const list = listRef.current
      const line = lineRef.current
      if (reduced || !list || !line) return
      gsap.fromTo(
        line,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: list, start: 'top 70%', end: 'bottom 60%', scrub: true } },
      )
    },
    { scope: listRef, dependencies: [reduced] },
  )

  return (
    <section id="processo" aria-labelledby="processo-title" className={`scroll-mt-20 ${compact ? 'py-16' : 'section-y'}`}>
      <div className={`container-x grid gap-12 lg:items-start ${compact ? '' : 'lg:grid-cols-2'}`}>
        <div>
          <SectionHeading
            id="processo-title"
            eyebrow="Processo"
            title="Do recebimento à entrega, sem surpresa"
            description="Cinco etapas, com laudo e orçamento antes de qualquer reparo."
          />
          <ol ref={listRef} className="relative mt-10 space-y-8 pl-10">
            <span aria-hidden="true" className="absolute top-2 bottom-2 left-[13px] w-px bg-line" />
            <span ref={lineRef} aria-hidden="true" className="absolute top-2 bottom-2 left-[13px] w-px origin-top bg-brand-600" />
            {processSteps.map((step, i) => (
              <li key={step.title} className="relative">
                <span className="absolute top-0 -left-10 flex size-7 items-center justify-center rounded-full border border-brand-600 bg-surface font-mono text-xs font-semibold text-brand-600">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-1 text-ink-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
        {compact ? null : (
          <div className="lg:sticky lg:top-28">
            <VideoBlock video={processVideo} className="aspect-[4/5] w-full rounded-3xl" />
          </div>
        )}
      </div>
    </section>
  )
}
