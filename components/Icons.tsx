import { Droplets, Waves, Thermometer, Flame, Bath, Wrench, type LucideProps } from 'lucide-react'

const MAP = { Droplets, Waves, Thermometer, Flame, Bath, Wrench }
export type IconName = keyof typeof MAP

export function ServiceIcon({ name, ...props }: { name: string } & LucideProps) {
  const C = MAP[name as IconName] ?? Wrench
  return <C {...props} />
}
