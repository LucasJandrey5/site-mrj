import type { ReactNode } from 'react'

export interface SectionHeadingProps {
  /** id do h2, usado em aria-labelledby da section. */
  id: string
  eyebrow: string
  title: string
  description?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
}

export function SectionHeading({ id, eyebrow, title, description, align = 'left', tone = 'light' }: SectionHeadingProps) {
  const dark = tone === 'dark'
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className={`eyebrow ${dark ? 'text-brand-400' : 'text-brand-600'}`}>{eyebrow}</p>
      <h2 id={id} className={`mt-3 text-3xl font-semibold tracking-tight sm:text-4xl ${dark ? 'text-white' : 'text-ink'}`}>
        {title}
      </h2>
      {description ? <p className={`mt-4 text-lg ${dark ? 'text-white/70' : 'text-ink-muted'}`}>{description}</p> : null}
    </div>
  )
}
