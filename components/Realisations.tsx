'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { X, ChevronLeft, ChevronRight, MapPin, Timer } from 'lucide-react'
import { REALISATIONS, type Realisation } from '@/lib/data'
import { SectionHeading } from './Section'
import { Reveal } from './Reveal'
import { AvantApres } from './AvantApres'

const CATS = ['Tous', 'Salle de bain', 'Chauffage', 'Dépannage'] as const

export function Realisations({ hasBefore }: { hasBefore: boolean }) {
  const [cat, setCat] = useState<(typeof CATS)[number]>('Tous')
  const [idx, setIdx] = useState<number | null>(null)
  const list = cat === 'Tous' ? REALISATIONS : REALISATIONS.filter((r) => r.cat === cat)

  const close = useCallback(() => setIdx(null), [])
  const step = useCallback((d: number) => setIdx((i) => (i === null ? null : (i + d + list.length) % list.length)), [list.length])

  useEffect(() => {
    if (idx === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [idx, close, step])

  const current: Realisation | null = idx === null ? null : list[idx]

  return (
    <section id="realisations" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow="Réalisations" title={<>Le résultat, <span className="text-amber-deep">pas des promesses.</span></>} subtitle="Faites glisser le curseur pour voir la transformation, puis parcourez quelques chantiers récents autour du Raincy." />

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <AvantApres before={hasBefore ? '/images/sdb-avant.jpg' : undefined} after="/images/sdb-apres.jpg" title="Salle de bain refaite à neuf" place="Le Raincy · 9 jours" />
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-3xl bg-white p-7 shadow-card">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-deep">Chantier du mois</p>
              <h3 className="mt-2 font-display text-3xl font-extrabold uppercase leading-none text-navy">Douche à l’italienne, meuble suspendu, carrelage 60×120</h3>
              <p className="mt-3 leading-relaxed text-ink/70">Une salle de bain de 6 m² datant des années 80, transformée en 9 jours ouvrés : dépose complète, reprise de l’étanchéité, douche à l’italienne avec paroi fixe, meuble double vasque et sèche-serviettes.</p>
              <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
                {[['6 m²', 'surface'], ['9 jours', 'durée'], ['8 900 €', 'budget TTC']].map(([v, l]) => (
                  <div key={l} className="rounded-2xl bg-paper p-3">
                    <dt className="font-display text-2xl font-extrabold text-navy">{v}</dt>
                    <dd className="text-xs uppercase tracking-wider text-ink/50">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        {/* filtres */}
        <Reveal className="mt-14 flex flex-wrap items-center gap-2">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${cat === c ? 'border-navy bg-navy text-white' : 'border-line bg-white text-navy hover:border-navy'}`}>
              {c}
            </button>
          ))}
          <span className="ml-auto text-sm text-ink/50">{list.length} chantier{list.length > 1 ? 's' : ''}</span>
        </Reveal>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 70}>
              <button onClick={() => setIdx(i)} className="group block w-full overflow-hidden rounded-3xl border border-line bg-white text-left shadow-card transition-all hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={r.image} alt={r.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-navy">{r.cat}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-bold leading-tight text-navy">{r.title}</h3>
                  <p className="mt-2 flex items-center gap-4 text-sm text-ink/60">
                    <span className="inline-flex items-center gap-1"><MapPin size={14} className="text-amber-deep" /> {r.place}</span>
                    <span className="inline-flex items-center gap-1"><Timer size={14} className="text-amber-deep" /> {r.duration}</span>
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* lightbox */}
      {current && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm" onClick={close} role="dialog" aria-modal="true" aria-label={current.title}>
          <button onClick={close} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Fermer"><X size={22} /></button>
          <button onClick={(e) => { e.stopPropagation(); step(-1) }} className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:grid" aria-label="Précédent"><ChevronLeft size={26} /></button>
          <button onClick={(e) => { e.stopPropagation(); step(1) }} className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:grid" aria-label="Suivant"><ChevronRight size={26} /></button>
          <figure className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink">
              <Image src={current.image} alt={current.title} fill sizes="90vw" className="object-cover" />
            </div>
            <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-white">
              <span className="font-display text-xl font-bold">{current.title}</span>
              <span className="text-sm text-white/70">{current.place} · {current.duration} · {idx! + 1}/{list.length}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
