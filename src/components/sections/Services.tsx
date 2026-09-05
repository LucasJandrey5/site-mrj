import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { services } from '@/data/services'

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="section-y scroll-mt-20">
      <div className="container-x">
        <SectionHeading
          id="servicos-title"
          eyebrow="Serviços"
          title="O que reparamos"
          description="Diagnóstico em laboratório próprio e reparo a nível de componente. Se o seu equipamento não estiver aqui, pergunte no WhatsApp."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.slug} className="h-full">
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <Link
                  href={`/servicos/${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-brand-400"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <ServiceIcon name={s.icon} className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{s.shortTitle}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{s.summary}</p>
                  <p className="mt-5 text-xs text-ink-faint">{s.brands.slice(0, 3).join(', ')} e outras</p>
                  <span className="mt-4 text-sm font-semibold text-brand-600 group-hover:underline">Ver detalhes</span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
