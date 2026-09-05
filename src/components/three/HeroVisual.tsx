'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { readMotionEnv, resolveHeroMode, type HeroMode } from '@/lib/motion-prefs'
import { useHeroScrollProgress } from './useHeroScrollProgress'

const HeroScene = dynamic(() => import('./HeroScene').then((m) => m.HeroScene), { ssr: false })

export const HERO_FALLBACK = {
  src: '/hero-fallback.webp',
  alt: 'Controlador de grupo gerador aberto em camadas: painel, placa e carcaça',
}

type Mode = HeroMode | 'pending'

// O modo é decidido uma vez por carregamento de página; o snapshot fica em cache para ser estável.
let cachedMode: HeroMode | null = null
function subscribeNoop() {
  return () => {}
}
function getModeSnapshot(): Mode {
  cachedMode ??= resolveHeroMode(window.location.search, readMotionEnv(window))
  return cachedMode
}
function getModeServerSnapshot(): Mode {
  return 'pending'
}

/** Decide entre a cena 3D e a imagem estática (spec seção 8) e pausa o render fora da tela. */
export function HeroVisual() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const mode = useSyncExternalStore(subscribeNoop, getModeSnapshot, getModeServerSnapshot)
  const [active, setActive] = useState(true)
  const progress = useHeroScrollProgress(mode === '3d')

  useEffect(() => {
    const el = wrapRef.current
    if (!el || mode !== '3d') return
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [mode])

  return (
    <div
      ref={wrapRef}
      data-testid="hero-visual"
      data-mode={mode}
      className="relative aspect-square w-full max-w-xl justify-self-center lg:justify-self-end"
    >
      {mode === '3d' ? (
        <HeroScene progress={progress} active={active} />
      ) : (
        <Image
          src={HERO_FALLBACK.src}
          alt={HERO_FALLBACK.alt}
          fill
          priority
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-contain"
          data-testid="hero-fallback"
        />
      )}
    </div>
  )
}
