import Image from 'next/image'

/**
 * Conjunto da marca: o símbolo oficial da MRJ (arquivo do cliente) com a palavra
 * "TECNOLOGIA" composta na tipografia do site. O símbolo é azul com as trilhas
 * vazadas, então o mesmo arquivo serve para fundo claro e escuro; só o texto muda
 * de cor. Se o cliente enviar o lettering oficial, troque o <span> por uma imagem.
 */
const SIZES = {
  nav: { mark: 'h-8 sm:h-10', text: 'text-[0.46rem] sm:text-[0.575rem]', gap: 'mt-1 sm:mt-1.5' },
  footer: { mark: 'h-12', text: 'text-[0.69rem]', gap: 'mt-1.5' },
} as const

export interface LogoProps {
  variant?: 'dark' | 'light'
  size?: keyof typeof SIZES
  priority?: boolean
  className?: string
}

export function Logo({ variant = 'dark', size = 'nav', priority = false, className = '' }: LogoProps) {
  const s = SIZES[size]
  return (
    <span className={`inline-flex flex-col items-start ${className}`}>
      <Image
        src="/logo.png"
        alt="MRJ"
        width={1175}
        height={507}
        sizes="240px"
        priority={priority}
        className={`${s.mark} w-auto`}
      />
      <span
        className={`${s.text} ${s.gap} w-full text-center font-display font-light tracking-[0.34em] whitespace-nowrap ${
          variant === 'light' ? 'text-white' : 'text-ink'
        }`}
      >
        TECNOLOGIA
      </span>
    </span>
  )
}
