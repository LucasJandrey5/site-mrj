import Link from 'next/link'
import type { ReactNode } from 'react'

export type ButtonVariant = 'whatsapp' | 'primary' | 'outline' | 'outline-light' | 'ghost'
export type ButtonSize = 'md' | 'lg'

export interface ButtonProps {
  children: ReactNode
  href?: string
  /** Abre em nova aba com rel seguro. Obrigatório para links de WhatsApp. */
  external?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  testId?: string
  ariaLabel?: string
  onClick?: () => void
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500'

const sizes: Record<ButtonSize, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-14 px-7 text-base',
}

const variants: Record<ButtonVariant, string> = {
  whatsapp: 'bg-whatsapp text-navy-950 hover:bg-whatsapp-dark',
  primary: 'bg-brand-600 text-white hover:bg-brand-500',
  outline: 'border border-line-strong text-ink hover:border-brand-600 hover:text-brand-600',
  'outline-light': 'border border-white/30 text-white hover:border-white hover:bg-white/10',
  ghost: 'text-brand-600 hover:bg-brand-100',
}

export function Button({
  children,
  href,
  external = false,
  variant = 'primary',
  size = 'md',
  className = '',
  testId,
  ariaLabel,
  onClick,
}: ButtonProps) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`.trim()

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        data-testid={testId}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }
  if (href) {
    return (
      <Link href={href} className={classes} data-testid={testId} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" className={classes} data-testid={testId} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </button>
  )
}
