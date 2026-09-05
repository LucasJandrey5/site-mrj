import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { company } from '@/data/company'
import { shippingSteps } from '@/data/process'

const DOTS: Array<[number, number]> = []
for (let x = 20; x <= 380; x += 24) {
  for (let y = 20; y <= 300; y += 24) DOTS.push([x, y])
}

/** Mapa estilizado em SVG: grade de pontos com Chapecó no centro e anéis de alcance (spec seção 6, item 8). */
function CoverageGraphic() {
  return (
    <svg viewBox="0 0 400 320" role="img" aria-label="Chapecó, SC, com atendimento para todo o Brasil" className="h-auto w-full">
      {DOTS.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" className="fill-brand-400/40" />
      ))}
      <g className="fill-none stroke-brand-500/40">
        <circle cx="240" cy="200" r="40" />
        <circle cx="240" cy="200" r="80" strokeDasharray="4 6" />
        <circle cx="240" cy="200" r="120" strokeDasharray="2 8" />
      </g>
      <circle cx="240" cy="200" r="14" className="fill-brand-600/25" />
      <circle cx="240" cy="200" r="7" className="fill-brand-600" />
      <text x="240" y="240" textAnchor="middle" className="fill-ink font-mono text-[11px] font-semibold tracking-widest">
        CHAPECÓ, SC
      </text>
      <text x="240" y="60" textAnchor="middle" className="fill-ink-muted font-mono text-[10px] tracking-widest">
        ATENDIMENTO EM TODO O BRASIL
      </text>
    </svg>
  )
}

export function Coverage() {
  return (
    <section id="atuacao" aria-labelledby="atuacao-title" className="section-y scroll-mt-20 border-t border-line">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            id="atuacao-title"
            eyebrow="Área de atuação"
            title={`Presencial em ${company.address.city} e região, por transportadora em todo o Brasil`}
            description="O equipamento vem até o laboratório, é reparado e volta testado. Simples assim."
          />
          <ol className="mt-10 grid gap-6 sm:grid-cols-3">
            {shippingSteps.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 0.08}>
                  <p className="eyebrow text-brand-600">Passo {String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-2 font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{step.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
        <Reveal className="rounded-3xl border border-line bg-surface p-6">
          <CoverageGraphic />
        </Reveal>
      </div>
    </section>
  )
}
