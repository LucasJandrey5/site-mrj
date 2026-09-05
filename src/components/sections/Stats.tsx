import { Counter } from '@/components/motion/Counter'
import { stats } from '@/data/stats'

/**
 * Faixa de números que continua o azul-marinho do hero em vez de cortar para o
 * fundo claro, com a mesma grade técnica de fundo (spec seção 6, item 3).
 */
export function Stats() {
  return (
    <section id="stats" aria-labelledby="stats-title" className="tech-grid border-t border-white/10 bg-navy-950 text-white">
      <h2 id="stats-title" className="sr-only">
        Números da MRJ Tecnologia
      </h2>
      <div className="container-x grid grid-cols-2 gap-x-8 gap-y-10 py-12 sm:py-16 md:grid-cols-4 md:gap-0">
        {stats.map((stat, i) => (
          <div key={stat.label} data-testid="stat" className={i > 0 ? 'md:border-l md:border-white/15 md:pl-8' : ''}>
            <p className="font-display text-4xl leading-none font-semibold tracking-tight sm:text-5xl lg:text-[3.25rem]">
              <Counter value={stat.value} />
              {stat.suffix ? (
                <span className="align-super text-[0.42em] font-semibold text-brand-400">{stat.suffix}</span>
              ) : null}
            </p>
            <p className="eyebrow mt-3 max-w-[16ch] text-white/60">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
