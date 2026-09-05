'use client'

import Image from 'next/image'

export const HERO_FALLBACK = {
  src: '/hero-fallback.svg',
  alt: 'Controlador de grupo gerador aberto em camadas: painel, placa e carcaça',
}

export function HeroVisual() {
  return (
    <div data-testid="hero-visual" className="relative aspect-square w-full max-w-xl justify-self-center lg:justify-self-end">
      <Image
        src={HERO_FALLBACK.src}
        alt={HERO_FALLBACK.alt}
        fill
        priority
        unoptimized
        sizes="(min-width: 1024px) 40vw, 90vw"
        className="object-contain"
        data-testid="hero-fallback"
      />
    </div>
  )
}
