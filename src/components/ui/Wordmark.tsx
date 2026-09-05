import type { Brand, BrandMark, WordmarkStyle } from '@/data/types'

/**
 * Wordmark provisório: desenha o nome da marca com um tratamento tipográfico próprio,
 * para mostrar proporção e comportamento enquanto os SVGs oficiais não chegam.
 * Ao receber os arquivos reais, troque o miolo deste componente por <Image />.
 */
const STYLES: Record<WordmarkStyle, string> = {
  1: 'font-display font-extrabold uppercase tracking-[-0.03em]',
  2: 'font-display font-light uppercase tracking-[0.22em]',
  3: 'font-display font-medium tracking-[0.02em]',
  4: 'font-display font-bold tracking-[-0.02em]',
  5: 'font-display font-extrabold uppercase tracking-[-0.05em]',
  6: 'font-mono font-bold uppercase tracking-[-0.02em]',
}

const MARKS: Record<BrandMark, string> = {
  square: 'h-[0.48em] w-[0.48em]',
  circle: 'h-[0.5em] w-[0.5em] rounded-full',
  slash: 'h-[0.82em] w-[0.17em] -skew-x-12',
}

export function Wordmark({ brand, className = '' }: { brand: Brand; className?: string }) {
  return (
    <span className={`inline-flex items-center leading-none whitespace-nowrap ${STYLES[brand.style]} ${className}`}>
      {brand.mark ? (
        <i aria-hidden="true" className={`mr-[0.4em] inline-block shrink-0 bg-current ${MARKS[brand.mark]}`} />
      ) : null}
      {brand.name}
    </span>
  )
}
