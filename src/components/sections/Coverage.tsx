import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { company } from '@/data/company'
import { shippingSteps } from '@/data/process'

/**
 * Contorno simplificado do Brasil em pares [longitude, latitude], no sentido horário
 * a partir do extremo norte (Monte Caburaí). Desenho próprio, sem API de mapas.
 */
const BRAZIL_OUTLINE: Array<[number, number]> = [
  [-60.15, 5.27],
  [-59.7, 4.5],
  [-59.6, 3.9],
  [-58.5, 3.5],
  [-57.4, 3.3],
  [-56.5, 2.0],
  [-55.9, 2.6],
  [-54.9, 2.4],
  [-54.2, 2.2],
  [-53.2, 2.3],
  [-52.0, 2.6],
  [-51.7, 3.9],
  [-50.9, 1.9],
  [-50.2, 0.5],
  [-48.5, -0.8],
  [-47.5, -0.8],
  [-46.0, -1.1],
  [-44.4, -2.5],
  [-43.0, -2.4],
  [-41.3, -2.8],
  [-39.8, -3.0],
  [-38.5, -3.7],
  [-37.3, -4.9],
  [-35.9, -5.1],
  [-35.2, -5.9],
  [-34.79, -7.15],
  [-35.1, -8.4],
  [-35.8, -9.7],
  [-36.6, -10.6],
  [-37.4, -11.5],
  [-38.7, -12.9],
  [-38.9, -14.8],
  [-38.9, -17.3],
  [-39.7, -19.3],
  [-40.4, -20.6],
  [-41.0, -21.9],
  [-42.0, -22.5],
  [-43.2, -23.0],
  [-44.7, -23.4],
  [-46.4, -24.1],
  [-48.0, -25.3],
  [-48.6, -26.3],
  [-48.8, -28.6],
  [-49.8, -29.4],
  [-50.4, -30.4],
  [-51.4, -31.4],
  [-52.2, -32.0],
  [-52.9, -32.9],
  [-53.37, -33.75],
  [-53.4, -32.6],
  [-53.8, -32.0],
  [-55.0, -31.1],
  [-56.0, -30.9],
  [-57.6, -30.2],
  [-56.55, -29.13],
  [-56.0, -28.66],
  [-55.13, -27.9],
  [-54.66, -27.57],
  [-53.63, -26.25],
  [-54.6, -25.6],
  [-54.3, -24.1],
  [-55.0, -23.9],
  [-55.6, -22.3],
  [-56.5, -22.1],
  [-57.9, -22.1],
  [-57.6, -20.5],
  [-58.2, -19.8],
  [-58.4, -16.3],
  [-60.3, -16.3],
  [-60.5, -13.8],
  [-62.1, -13.0],
  [-63.9, -12.5],
  [-65.3, -11.0],
  [-66.9, -10.0],
  [-68.7, -11.0],
  [-70.6, -11.0],
  [-72.2, -10.0],
  [-73.2, -9.4],
  [-73.99, -7.53],
  [-72.9, -5.1],
  [-70.9, -4.3],
  [-69.9, -4.2],
  [-69.4, -1.4],
  [-69.8, 0.6],
  [-68.2, 1.7],
  [-67.1, 2.0],
  [-66.9, 1.2],
  [-65.4, 0.8],
  [-64.0, 1.9],
  [-63.4, 3.9],
  [-62.1, 4.1],
  [-60.7, 5.2],
]

/** Chapecó, SC. */
const CHAPECO: [number, number] = [-52.62, -27.1]

// Projeção equirretangular: a longitude é achatada pelo cosseno da latitude média
// do país, senão o mapa sai esticado na horizontal.
const BOUNDS = { west: -74.5, east: -33.9, north: 5.9, south: -34.2 }
const LON_SCALE = Math.cos((15 * Math.PI) / 180)
const UNIT = 10 // unidades do viewBox por grau
const PAD = 16

const MAP_W = Math.round(((BOUNDS.east - BOUNDS.west) * LON_SCALE * UNIT + PAD * 2) * 10) / 10
const MAP_H = Math.round(((BOUNDS.north - BOUNDS.south) * UNIT + PAD * 2) * 10) / 10

function project([lon, lat]: [number, number]): [number, number] {
  return [PAD + (lon - BOUNDS.west) * LON_SCALE * UNIT, PAD + (BOUNDS.north - lat) * UNIT]
}

const BRAZIL_PATH = `${BRAZIL_OUTLINE.map((point, i) => {
  const [x, y] = project(point)
  return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
}).join(' ')} Z`

const [CX, CY] = project(CHAPECO).map((n) => Math.round(n * 10) / 10)

/** Três anéis defasados em um terço do ciclo, para a onda sair contínua. */
const RINGS = [
  { r: 28, dash: '6 3', delay: 0 },
  { r: 54, dash: '4 6', delay: -1.4 },
  { r: 80, dash: '2 8', delay: -2.8 },
]

/** Mapa do Brasil desenhado em SVG, com Chapecó marcada e anéis de alcance. */
function CoverageGraphic() {
  return (
    <svg
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      role="img"
      aria-label="Mapa do Brasil com a MRJ Tecnologia marcada em Chapecó, Santa Catarina, e alcance de atendimento em todo o país"
      className="h-auto w-full"
    >
      <defs>
        <clipPath id="mapa-brasil">
          <path d={BRAZIL_PATH} />
        </clipPath>
        <pattern id="mapa-malha" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="8" cy="8" r="1.5" className="fill-brand-400/60" />
        </pattern>
      </defs>

      <g clipPath="url(#mapa-brasil)">
        <rect width={MAP_W} height={MAP_H} className="fill-brand-500/5" />
        <rect width={MAP_W} height={MAP_H} fill="url(#mapa-malha)" />
      </g>
      <path d={BRAZIL_PATH} fill="none" strokeWidth="1.6" strokeLinejoin="round" className="stroke-brand-500/60" />

      {/* Os anéis saem de Chapecó, abrindo o tracejado até sumir. Os atributos r e
          strokeDasharray são o estado parado, usado com prefers-reduced-motion. */}
      <g fill="none" strokeWidth="1.2" className="stroke-brand-500/60">
        {RINGS.map((ring) => (
          <circle
            key={ring.r}
            cx={CX}
            cy={CY}
            r={ring.r}
            strokeDasharray={ring.dash}
            className="animate-radar-ring"
            style={{ animationDelay: `${ring.delay}s` }}
          />
        ))}
      </g>
      <circle cx={CX} cy={CY} r="13" className="fill-brand-600/20" />
      <circle cx={CX} cy={CY} r="6" className="fill-brand-600" />

      <path d={`M${CX - 12} ${CY}H${CX - 86}`} strokeWidth="1.2" className="stroke-brand-600" />
      <text
        x={CX - 92}
        y={CY + 4}
        textAnchor="end"
        className="fill-ink font-mono text-[11px] font-semibold tracking-[0.12em]"
      >
        CHAPECÓ, SC
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
