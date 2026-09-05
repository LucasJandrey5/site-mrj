import { CircuitBoard, Forklift, Monitor, Settings2, SunMedium, Zap, type LucideIcon } from 'lucide-react'
import type { ServiceIconName } from '@/data/types'

const icons: Record<ServiceIconName, LucideIcon> = {
  generator: Zap,
  inverter: CircuitBoard,
  hmi: Monitor,
  forklift: Forklift,
  solar: SunMedium,
  actuator: Settings2,
}

export function ServiceIcon({ name, className = 'size-5' }: { name: ServiceIconName; className?: string }) {
  const Icon = icons[name]
  return <Icon className={className} aria-hidden="true" />
}
