import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { brandGroups } from '@/data/brands'

/** Fabricantes por segmento, só em texto (spec seção 6, item 5). */
export function Brands() {
  return (
    <section id="marcas" aria-labelledby="marcas-title" className="section-y scroll-mt-20 border-y border-line bg-surface">
      <div className="container-x">
        <SectionHeading
          id="marcas-title"
          eyebrow="Fabricantes"
          title="Marcas que passam pela nossa bancada"
          description="Trabalhamos com os principais fabricantes de cada segmento. Os nomes indicam compatibilidade de serviço, não vínculo com o fabricante."
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {brandGroups.map((g, i) => (
            <Reveal key={g.segment} delay={(i % 3) * 0.08}>
              <p className="eyebrow text-brand-600">{g.segment}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {g.brands.map((b) => (
                  <li key={b} className="rounded-full border border-line px-3 py-1 font-display text-sm font-semibold text-ink">
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
