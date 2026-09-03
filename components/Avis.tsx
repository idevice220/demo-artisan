'use client'

import { useRef } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import type { Review } from '@prisma/client'
import type { Site } from '@/lib/settings'
import { SectionHeading } from './Section'
import { Reveal } from './Reveal'

export function Avis({ reviews, site }: { reviews: Review[]; site: Site }) {
  const row = useRef<HTMLDivElement>(null)
  const scroll = (d: number) => row.current?.scrollBy({ left: d * (row.current.clientWidth * 0.8), behavior: 'smooth' })

  return (
    <section id="avis" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeading eyebrow="Avis clients" title={<>Ils m’ont appelé. <span className="text-amber-deep">Ils me rappellent.</span></>} />
          <Reveal delay={100}>
            <div className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-card sm:flex-row sm:items-center">
              <div className="text-center sm:pr-6 sm:text-left">
                <p className="font-display text-7xl font-extrabold leading-none text-navy">{site.rating.toLocaleString('fr-FR')}</p>
                <div className="mt-1 flex justify-center gap-0.5 sm:justify-start">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} className="fill-amber text-amber" />)}
                </div>
                <p className="mt-1 text-sm text-ink/60">{site.reviewsCount} avis Google</p>
              </div>
              <ul className="flex-1 space-y-1.5">
                {site.ratingSplit.map((p, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-semibold text-ink/60">
                    <span className="w-3">{5 - i}</span>
                    <span className="h-2 flex-1 overflow-hidden rounded-full bg-mist"><span className="block h-full rounded-full bg-amber" style={{ width: `${p}%` }} /></span>
                    <span className="w-8 text-right">{p}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="relative mt-10">
          <div ref={row} className="no-scrollbar snap-row flex gap-5 overflow-x-auto pb-2">
            {reviews.map((a) => (
              <article key={a.id} className="snap-item flex w-[85%] shrink-0 flex-col rounded-3xl border border-line bg-white p-6 shadow-card sm:w-[48%] lg:w-[32%]">
                <Quote size={26} className="text-amber" />
                <p className="mt-3 flex-1 leading-relaxed text-ink/80">{a.text}</p>
                <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-navy font-display text-lg font-bold text-amber">{a.name.charAt(0)}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-navy">{a.name} <span className="font-normal text-ink/50">· {a.place}</span></p>
                    <p className="text-xs text-ink/50">{a.date} · {a.tag}</p>
                  </div>
                  <span className="flex gap-0.5">{Array.from({ length: a.rating }).map((_, i) => <Star key={i} size={12} className="fill-amber text-amber" />)}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={() => scroll(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-navy hover:border-navy" aria-label="Avis précédents"><ChevronLeft size={20} /></button>
            <button onClick={() => scroll(1)} className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-navy hover:border-navy" aria-label="Avis suivants"><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>
    </section>
  )
}
