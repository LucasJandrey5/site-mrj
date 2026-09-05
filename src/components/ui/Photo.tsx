import Image from 'next/image'
import type { MediaAsset } from '@/data/types'
import { Placeholder } from './Placeholder'

export interface PhotoProps {
  asset: MediaAsset
  className?: string
  sizes?: string
  priority?: boolean
}

export function Photo({ asset, className = '', sizes = '100vw', priority = false }: PhotoProps) {
  if (!asset.available) return <Placeholder label={asset.alt} className={className} />
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={asset.src} alt={asset.alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  )
}
