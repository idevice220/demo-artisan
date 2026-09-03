import { Droplets, Waves, Thermometer, Flame, Bath, Wrench, type LucideProps } from 'lucide-react'
import type { Service } from '@/lib/data'

const MAP = { Droplets, Waves, Thermometer, Flame, Bath, Wrench }

export function ServiceIcon({ name, ...props }: { name: Service['icon'] } & LucideProps) {
  const C = MAP[name]
  return <C {...props} />
}
