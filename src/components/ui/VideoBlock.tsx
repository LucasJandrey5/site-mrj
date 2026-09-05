import type { VideoAsset } from '@/data/types'
import { Placeholder } from './Placeholder'

export interface VideoBlockProps {
  video: VideoAsset
  className?: string
}

/** Vídeo curto em loop, sem som, carregado só quando entra na tela (preload none + poster). */
export function VideoBlock({ video, className = '' }: VideoBlockProps) {
  if (!video.available) return <Placeholder label={video.alt} kind="video" className={className} />
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster={video.poster}
        aria-label={video.alt}
      >
        <source src={video.webm} type="video/webm" />
        <source src={video.mp4} type="video/mp4" />
      </video>
    </div>
  )
}
