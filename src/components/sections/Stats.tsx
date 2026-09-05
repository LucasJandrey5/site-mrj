import { Counter } from '@/components/motion/Counter'
import { Reveal } from '@/components/motion/Reveal'
import { company } from '@/data/company'

const hasPlaceholder = company.stats.some((s) => s.placeholder)

export function Stats() {
  return (
    <section id="stats" aria-labelledby="stats-title" className="border-b border-line bg-surface">
      <h2 id="stats-title" className="sr-only">
        Números da MRJ
      </h2>
      <div className="container-x grid gap-8 py-12 sm:grid-cols-3">
        {company.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <p className="font-display text-4xl font-semibold text-brand-600 sm:text-5xl">
              <Counter value={s.value} suffix={s.suffix} />
              {s.placeholder ? (
                <span data-placeholder-stat className="ml-1 text-signal" title="Valor ilustrativo, a confirmar com a MRJ">
                  *
                </span>
              ) : null}
            </p>
            <p className="mt-2 text-sm text-ink-muted">{s.label}</p>
          </Reveal>
        ))}
      </div>
      {hasPlaceholder ? (
        <p className="container-x pb-6 text-xs text-ink-faint">* Valores ilustrativos até confirmação da MRJ.</p>
      ) : null}
    </section>
  )
}
