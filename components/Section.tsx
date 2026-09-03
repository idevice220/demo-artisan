import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

export function SectionHeading({ eyebrow, title, subtitle, align = 'left', light = false }: { eyebrow: string; title: ReactNode; subtitle?: ReactNode; align?: 'left' | 'center'; light?: boolean }) {
  const c = align === 'center'
  return (
    <Reveal className={`mb-12 max-w-3xl ${c ? 'mx-auto text-center' : ''}`}>
      <p className={`mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] ${light ? 'text-amber' : 'text-amber-deep'}`}>
        <span className="h-[3px] w-6 rounded-full bg-amber" /> {eyebrow}
      </p>
      <h2 className={`font-display text-4xl font-extrabold uppercase leading-[0.98] tracking-tight sm:text-5xl lg:text-6xl ${light ? 'text-white' : 'text-navy'}`}>{title}</h2>
      {subtitle && <p className={`mt-4 text-lg leading-relaxed ${light ? 'text-white/75' : 'text-ink/70'}`}>{subtitle}</p>}
    </Reveal>
  )
}
