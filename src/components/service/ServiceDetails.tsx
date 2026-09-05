import { Check } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import type { Service } from '@/data/types'

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-ink-muted">
            <Check className="mt-1 size-4 shrink-0 text-brand-600" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Sintomas comuns, o que fazemos e marcas atendidas do serviço. */
export function ServiceDetails({ service }: { service: Service }) {
  return (
    <section aria-labelledby="detalhes-title" className="section-y">
      <div className="container-x">
        <div className="flex items-start gap-4">
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <ServiceIcon name={service.icon} className="size-6" />
          </span>
          <SectionHeading id="detalhes-title" eyebrow="Detalhes" title="Sintomas, solução e marcas atendidas" />
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          <Reveal>
            <List title="Sintomas comuns" items={service.symptoms} />
          </Reveal>
          <Reveal delay={0.08}>
            <List title="O que fazemos" items={service.actions} />
          </Reveal>
          <Reveal delay={0.16}>
            <h3 className="text-lg font-semibold text-ink">Marcas atendidas</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {service.brands.map((b) => (
                <li key={b} className="rounded-full border border-line bg-surface px-3 py-1 font-display text-sm font-semibold text-ink">
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ink-faint">
              Outras marcas do mesmo tipo de equipamento também são atendidas. Pergunte no WhatsApp.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
