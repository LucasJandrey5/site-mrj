'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Marquee } from '@/components/motion/Marquee'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Wordmark } from '@/components/ui/Wordmark'
import { brands, primarySegment } from '@/data/brands'
import type { Brand } from '@/data/types'

// Três esteiras alternando o sentido, com as marcas distribuídas em rodízio
// para que cada faixa misture segmentos.
const LANES: Brand[][] = [[], [], []]
brands.forEach((brand, i) => LANES[i % LANES.length].push(brand))

const LANE_SETTINGS = [
  { direction: 'left' as const, durationSec: 46 },
  { direction: 'right' as const, durationSec: 54 },
  { direction: 'left' as const, durationSec: 50 },
]

export function Brands() {
  const [active, setActive] = useState<Brand>(brands[0])
  const segment = primarySegment(active)

  return (
    <section id="marcas" aria-labelledby="marcas-title" className="section-y scroll-mt-20 border-y border-line bg-surface">
      <div className="container-x">
        <SectionHeading
          id="marcas-title"
          eyebrow="Fabricantes"
          title="Marcas que passam pela nossa bancada"
          description="Toque ou passe o mouse em uma marca para ver o que reparamos nela e ir direto para o serviço. Os nomes indicam compatibilidade de serviço, não vínculo com o fabricante."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
          {LANES.map((lane, i) => (
            <Marquee
              key={LANE_SETTINGS[i].direction + i}
              direction={LANE_SETTINGS[i].direction}
              durationSec={LANE_SETTINGS[i].durationSec}
              className="bg-surface py-4"
              gapClassName="gap-12"
              items={lane.map((brand) => ({
                key: brand.name,
                render: (isCopy: boolean) => {
                  const seg = primarySegment(brand)
                  return (
                    <Link
                      href={`/servicos/${seg.service}`}
                      tabIndex={isCopy ? -1 : undefined}
                      onPointerEnter={() => setActive(brand)}
                      onFocus={() => setActive(brand)}
                      className="block px-2 py-1 text-ink-faint transition-colors hover:text-brand-600 focus-visible:text-brand-600"
                    >
                      <Wordmark brand={brand} className="text-lg sm:text-xl" />
                      <span className="sr-only">, {seg.label}</span>
                    </Link>
                  )
                },
              }))}
            />
          ))}
        </div>

        <div
          aria-live="polite"
          className="mt-6 grid gap-3 rounded-2xl border border-line bg-brand-50 px-6 py-5 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-6"
        >
          <p className="text-xl text-brand-600">
            <Wordmark brand={active} />
          </p>
          <p className="text-sm leading-relaxed text-ink-muted">
            <span className="font-semibold text-ink">{segment.label}.</span> Reparamos {segment.repairs}.{' '}
            <Link
              href={`/servicos/${segment.service}`}
              className="inline-flex items-center gap-1 font-semibold whitespace-nowrap text-brand-600 hover:underline"
            >
              Ver serviço
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
