'use client'

import { BadgeCheck, ChevronLeft, ChevronRight, Gauge, ShieldCheck, Wrench, X, type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { labPhotos, labVideo } from '@/data/media'
import type { LabPhoto, LabTone } from '@/data/types'

/** Gradiente do marcador exibido no lugar da foto que ainda não chegou. */
const TONES: Record<LabTone, string> = {
  bench: 'radial-gradient(120% 90% at 28% 18%, #25384f, #101a2b 52%, #050b14)',
  board: 'radial-gradient(120% 90% at 28% 18%, #0d5133, #08301f 52%, #031a10)',
  macro: 'radial-gradient(120% 90% at 28% 18%, #1f4a6e, #12243c 52%, #050f1c)',
  solder: 'radial-gradient(120% 90% at 28% 18%, #5c3a12, #2a1a08 52%, #0d0803)',
  screen: 'radial-gradient(120% 90% at 28% 18%, #0a3d3a, #03181f 52%, #020b0e)',
  metal: 'radial-gradient(120% 90% at 28% 18%, #39434f, #171d26 52%, #070a0e)',
}

const differentials: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: Wrench, title: 'Reparo a nível de componente', text: 'Trocamos o que falhou, não a placa inteira.' },
  { icon: Gauge, title: 'Teste funcional em carga', text: 'O equipamento sai testado como se estivesse na planta.' },
  { icon: BadgeCheck, title: 'Orçamento gratuito', text: 'Diagnóstico e laudo sem custo. Você decide depois.' },
  { icon: ShieldCheck, title: 'Garantia do serviço', text: 'Prazo descrito no orçamento e no relatório de entrega.' },
]

/** Camada escura + legenda, comum a foto, vídeo e marcador. */
function TileOverlay({ title, caption, pending }: { title: string; caption: string; pending: boolean }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-linear-190 from-transparent from-40% to-[rgb(3_8_16/0.82)]"
      />
      {pending ? (
        <span className="eyebrow absolute top-3 left-3 rounded-full border border-white/20 bg-navy-950/60 px-2 py-0.5 text-[0.55rem] text-white/80">
          foto em breve
        </span>
      ) : null}
      <span className="absolute inset-x-0 bottom-0 p-4 text-left">
        <span className="block font-display text-sm font-semibold text-white">{title}</span>
        <span className="mt-0.5 block text-xs text-white/70">{caption}</span>
      </span>
    </>
  )
}

function PhotoTile({ photo, sizes, priority = false }: { photo: LabPhoto; sizes: string; priority?: boolean }) {
  return (
    <>
      {photo.available ? (
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <span aria-hidden="true" className="placeholder-hatch absolute inset-0 opacity-30" />
      )}
      <TileOverlay title={photo.title} caption={photo.caption} pending={!photo.available} />
    </>
  )
}

export function Lab() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState(0)
  const photo = labPhotos[index]

  const open = (i: number) => {
    setIndex(i)
    dialogRef.current?.showModal()
  }
  const step = (delta: number) => {
    setIndex((i) => (i + delta + labPhotos.length) % labPhotos.length)
  }

  // O bloco largo do meio é o vídeo; as fotos preenchem o resto da grade.
  const before = labPhotos.slice(0, 5)
  const after = labPhotos.slice(5)

  const tileClass =
    'group relative overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500'

  return (
    <section id="laboratorio" aria-labelledby="laboratorio-title" className="section-y scroll-mt-20 bg-surface">
      <div className="container-x">
        <SectionHeading
          id="laboratorio-title"
          eyebrow="Laboratório"
          title="Dentro do laboratório"
          description="Bancada própria em Chapecó. Estas são as fotos do dia a dia: diagnóstico, retrabalho, teste e entrega. Clique em uma para ver de perto."
        />

        <div className="mt-12 grid auto-rows-[150px] grid-cols-2 gap-2.5 sm:auto-rows-[170px] md:grid-cols-4">
          {before.map((item, i) => (
            <button
              key={item.src}
              type="button"
              data-testid="lab-tile"
              onClick={() => open(i)}
              aria-label={`Ver foto: ${item.title}`}
              className={`${tileClass} ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
              style={{ background: TONES[item.tone] }}
            >
              <span className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
                <PhotoTile photo={item} sizes={i === 0 ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 50vw'} priority={i === 0} />
              </span>
            </button>
          ))}

          <div
            data-testid="lab-tile"
            className="relative col-span-2 overflow-hidden rounded-2xl"
            style={{ background: TONES[labVideo.tone] }}
          >
            {labVideo.available ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster={labVideo.poster}
                aria-label={labVideo.alt}
              >
                <source src={labVideo.webm} type="video/webm" />
                <source src={labVideo.mp4} type="video/mp4" />
              </video>
            ) : (
              <span aria-hidden="true" className="placeholder-hatch absolute inset-0 opacity-30" />
            )}
            <TileOverlay title={labVideo.title} caption={labVideo.caption} pending={!labVideo.available} />
          </div>

          {after.map((item, i) => (
            <button
              key={item.src}
              type="button"
              data-testid="lab-tile"
              onClick={() => open(before.length + i)}
              aria-label={`Ver foto: ${item.title}`}
              className={tileClass}
              style={{ background: TONES[item.tone] }}
            >
              <span className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
                <PhotoTile photo={item} sizes="(min-width: 768px) 25vw, 50vw" />
              </span>
            </button>
          ))}
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {differentials.map((d) => (
            <li key={d.title} className="flex gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <d.icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-ink">{d.title}</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{d.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close()
        }}
        className="w-[min(60rem,92vw)] rounded-2xl bg-surface p-0 backdrop:bg-navy-950/85 backdrop:backdrop-blur-sm"
      >
        <div className="relative aspect-16/10 w-full overflow-hidden" style={{ background: TONES[photo.tone] }}>
          {photo.available ? (
            <Image src={photo.src} alt={photo.alt} fill sizes="90vw" className="object-cover" />
          ) : (
            <span aria-hidden="true" className="placeholder-hatch absolute inset-0 opacity-30" />
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 p-5">
          <div>
            <p className="font-display font-semibold text-ink">{photo.title}</p>
            <p className="text-sm text-ink-muted">{photo.caption}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Foto anterior"
              className="grid size-9 place-items-center rounded-full border border-line-strong text-ink hover:border-brand-400 hover:text-brand-600"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Próxima foto"
              className="grid size-9 place-items-center rounded-full border border-line-strong text-ink hover:border-brand-400 hover:text-brand-600"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Fechar"
              className="grid size-9 place-items-center rounded-full border border-line-strong text-ink hover:border-brand-400 hover:text-brand-600"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </dialog>
    </section>
  )
}
