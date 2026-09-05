export interface MarqueeProps {
  items: string[]
  className?: string
}

/** Faixa de marcas em loop contínuo, só com CSS; pausa no hover e para com reduced motion. */
export function Marquee({ items, className = '' }: MarqueeProps) {
  const track = [...items, ...items]
  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      style={{ maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)' }}
    >
      <ul className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {track.map((item, i) => (
          <li key={`${item}-${i}`} aria-hidden={i >= items.length ? true : undefined} className="eyebrow text-white/60">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
