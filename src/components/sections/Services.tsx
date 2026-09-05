'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Photo } from '@/components/ui/Photo'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { serviceCovers } from '@/data/media'
import { services } from '@/data/services'
import type { Service } from '@/data/types'

/**
 * Índice tipográfico dos seis serviços com prévia ao lado (spec seção 6, item 4).
 * A prévia mostra a foto de bancada e os sintomas que costumam chegar; no celular
 * ela dá lugar ao resumo embaixo de cada nome.
 */
export function Services() {
  const [active, setActive] = useState<Service>(services[0])

  return (
    <section id="servicos" aria-labelledby="servicos-title" className="section-y scroll-mt-20">
      <div className="container-x">
        <SectionHeading
          id="servicos-title"
          eyebrow="Serviços"
          title="Seis linhas de serviço, um laboratório só"
          description="Passe o mouse ou toque em uma linha para ver o que costuma chegar até nós. Se o seu equipamento não estiver aqui, pergunte no WhatsApp: o reparo é no componente, não na etiqueta."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <ul className="border-t border-line">
            {services.map((service) => {
              const on = service.slug === active.slug
              return (
                <li key={service.slug} className="border-b border-line">
                  <Link
                    href={`/servicos/${service.slug}`}
                    onPointerEnter={() => setActive(service)}
                    onFocus={() => setActive(service)}
                    className={`group flex items-center gap-4 py-4 font-display text-xl font-semibold tracking-tight transition-all duration-200 sm:text-2xl ${
                      on ? 'pl-2 text-brand-600' : 'text-ink-faint hover:pl-2 hover:text-ink'
                    }`}
                  >
                    <ServiceIcon
                      name={service.icon}
                      className={`size-6 shrink-0 transition-opacity duration-200 ${on ? 'opacity-100' : 'opacity-50'}`}
                    />
                    <span className="min-w-0">
                      {service.shortTitle}
                      <span className="mt-1 block font-sans text-sm font-normal text-ink-muted lg:hidden">
                        {service.summary}
                      </span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className={`ml-auto size-5 shrink-0 transition-all duration-200 ${
                        on ? 'opacity-100' : '-translate-x-1.5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                      }`}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          <aside className="hidden rounded-3xl border border-line bg-surface p-6 lg:sticky lg:top-28 lg:block">
            {/* A key remonta o bloco a cada troca, disparando a entrada. */}
            <div key={active.slug} className="animate-fade-in">
              <Photo
                asset={serviceCovers[active.slug]}
                className="aspect-[3/2] w-full rounded-2xl"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <p className="mt-5 font-display text-lg font-semibold text-ink">{active.title}</p>
              <p className="eyebrow mt-4 text-brand-600">O que costuma chegar</p>
              <ul className="mt-3 space-y-2">
                {active.symptoms.slice(0, 4).map((symptom, i) => (
                  <li
                    key={symptom}
                    className="flex animate-fade-in gap-2.5 text-sm leading-relaxed text-ink-muted"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <span aria-hidden="true" className="mt-px font-mono font-bold text-signal">
                      !
                    </span>
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
