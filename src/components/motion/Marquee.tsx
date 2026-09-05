import type { ReactNode } from 'react'

export interface MarqueeItem {
  key: string
  /** `isCopy` é true na segunda volta da faixa, que existe só para fechar o loop. */
  render: (isCopy: boolean) => ReactNode
}

export interface MarqueeProps {
  items: MarqueeItem[]
  /** Sentido do deslocamento. */
  direction?: 'left' | 'right'
  /** Duração de uma volta completa, em segundos. */
  durationSec?: number
  className?: string
  gapClassName?: string
}

/**
 * Faixa em loop contínuo, só com CSS. Pausa no hover e no foco.
 * Com prefers-reduced-motion a animação para e a faixa vira rolagem horizontal.
 */
export function Marquee({
  items,
  direction = 'left',
  durationSec = 45,
  className = '',
  gapClassName = 'gap-10',
}: MarqueeProps) {
  const track = [...items.map((item) => ({ item, copy: false })), ...items.map((item) => ({ item, copy: true }))]
  const mask = 'linear-gradient(90deg, transparent, black 6%, black 94%, transparent)'

  return (
    <div
      className={`group relative overflow-hidden motion-reduce:overflow-x-auto ${className}`}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      <ul
        className={`flex w-max animate-marquee items-center whitespace-nowrap group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-reduce:animate-none ${gapClassName} ${
          direction === 'right' ? '[animation-direction:reverse]' : ''
        }`}
        style={{ animationDuration: `${durationSec}s` }}
      >
        {track.map(({ item, copy }, i) => (
          <li key={`${item.key}-${i}`} aria-hidden={copy || undefined}>
            {item.render(copy)}
          </li>
        ))}
      </ul>
    </div>
  )
}
