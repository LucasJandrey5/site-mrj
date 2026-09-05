import { ImageIcon, Video } from 'lucide-react'

export interface PlaceholderProps {
  label: string
  kind?: 'photo' | 'video'
  className?: string
}

/** Bloco neutro exibido enquanto o material do cliente não chega (spec seção 10). */
export function Placeholder({ label, kind = 'photo', className = '' }: PlaceholderProps) {
  const Icon = kind === 'video' ? Video : ImageIcon
  return (
    <div
      role="img"
      aria-label={`${label} (imagem em breve)`}
      data-placeholder={kind}
      className={`placeholder-hatch flex items-center justify-center rounded-2xl border border-dashed border-line-strong bg-brand-50 text-ink-faint ${className}`}
    >
      <div className="flex flex-col items-center gap-2 p-6 text-center">
        <Icon className="size-6" aria-hidden="true" />
        <span className="eyebrow">{kind === 'video' ? 'vídeo em breve' : 'foto em breve'}</span>
        <span className="max-w-xs text-xs">{label}</span>
      </div>
    </div>
  )
}
