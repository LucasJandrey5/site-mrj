import { BadgeCheck, Gauge, ShieldCheck, Wrench, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/motion/Reveal'
import { Photo } from '@/components/ui/Photo'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { VideoBlock } from '@/components/ui/VideoBlock'
import { labPhotos, labVideo } from '@/data/media'

const differentials: Array<{ icon: LucideIcon; title: string; text: string }> = [
  {
    icon: Wrench,
    title: 'Reparo a nível de componente',
    text: 'Trocamos o que falhou, não a placa inteira. Menos custo e menos tempo parado.',
  },
  {
    icon: Gauge,
    title: 'Teste funcional em carga',
    text: 'Todo equipamento sai testado em bancada, simulando a condição real de operação.',
  },
  {
    icon: BadgeCheck,
    title: 'Orçamento gratuito',
    text: 'Diagnóstico e laudo sem custo. Você só paga se aprovar o reparo.',
  },
  {
    icon: ShieldCheck,
    title: 'Garantia do serviço',
    text: 'Período de garantia descrito no orçamento e no relatório de entrega.',
  },
]

export function Lab() {
  return (
    <section id="laboratorio" aria-labelledby="laboratorio-title" className="section-y scroll-mt-20 bg-surface">
      <div className="container-x">
        <SectionHeading
          id="laboratorio-title"
          eyebrow="Laboratório"
          title="Bancada própria, instrumentação e método"
          description="Osciloscópio, fontes, cargas e simuladores de sinal para reproduzir a falha antes de mexer na placa."
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {differentials.map((d, i) => (
              <li key={d.title}>
                <Reveal delay={i * 0.06} className="flex gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <d.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink">{d.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">{d.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-4">
            <VideoBlock video={labVideo} className="col-span-2 aspect-video w-full rounded-3xl" />
            {labPhotos.map((photo, i) => (
              <Photo
                key={photo.src}
                asset={photo}
                sizes="(min-width: 1024px) 28vw, 50vw"
                className={`aspect-[4/3] w-full rounded-2xl ${i === 2 ? 'col-span-2 sm:col-span-1' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
