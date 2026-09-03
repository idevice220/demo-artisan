import Image from 'next/image'
import { Phone, ArrowRight, Star, ShieldCheck, Clock, BadgeCheck, Calculator } from 'lucide-react'
import type { Site } from '@/lib/settings'
import { NextSlot } from './Status'
import { Counter } from './Counter'

const POINT_ICONS = [ShieldCheck, BadgeCheck, Clock]

export function Hero({ site, communes }: { site: Site; communes: string[] }) {
  return (
    <section id="top" className="relative overflow-hidden bg-ink text-white">
      <Image src={site.hero.image} alt="" fill priority sizes="100vw" className="object-cover object-[65%_45%]" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/5" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/10 to-ink/40" aria-hidden />
      <div className="blueprint absolute inset-0 opacity-40" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:pb-20 lg:pt-24">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-amber backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" /> {site.hero.eyebrow}
          </p>
          <h1 className="mt-6 font-display text-[56px] font-extrabold uppercase leading-[0.92] tracking-tight sm:text-7xl lg:text-[96px]">
            {site.hero.title}
            <br />
            {site.hero.title2} <span className="text-amber">{site.hero.accent}</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/85">{site.hero.text}</p>
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            {site.hero.points.map((t, i) => {
              const Icon = POINT_ICONS[i % POINT_ICONS.length]
              return (
                <li key={t} className="inline-flex items-center gap-2">
                  <Icon size={16} className="text-amber" /> {t}
                </li>
              )
            })}
          </ul>
        </div>

        <div className="w-full max-w-sm animate-fade-up [animation-delay:150ms] lg:justify-self-end">
          <div className="overflow-hidden rounded-3xl bg-white text-ink shadow-lift">
            <div className="hazard h-2" aria-hidden />
            <div className="p-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-steel">Prochain créneau disponible</p>
              <p className="mt-1 flex items-center gap-2 font-display text-3xl font-bold uppercase leading-none text-navy">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ring rounded-full bg-ok" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ok" />
                </span>
                <NextSlot hours={site.hours} />
              </p>
              <a href={site.tel} className="mt-5 flex items-center justify-center gap-2 rounded-full bg-amber px-5 py-4 font-display text-2xl font-bold uppercase tracking-wide text-ink shadow-amber transition-transform hover:-translate-y-0.5">
                <Phone size={22} strokeWidth={2.5} /> {site.phone}
              </a>
              <a href="#estimation" className="mt-2 flex items-center justify-center gap-2 rounded-full border-2 border-navy px-5 py-3 font-display text-lg font-bold uppercase tracking-wide text-navy transition-colors hover:bg-navy hover:text-white">
                <Calculator size={18} /> Estimer mon devis <ArrowRight size={16} />
              </a>
              <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm">
                <span className="flex items-center gap-1.5">
                  <span className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className="fill-amber text-amber" />)}</span>
                  <strong>{site.rating.toLocaleString('fr-FR')}</strong>
                  <span className="text-ink/50">· {site.reviewsCount} avis</span>
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-steel">{site.owner}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-ink/60 backdrop-blur">
        <dl className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-white/10 px-4">
          {[
            { v: site.years, s: ' ans', l: 'd’expérience' },
            { v: site.interventions, s: '+', l: 'interventions' },
            { v: site.avgDelay, s: ' min', l: 'délai moyen' },
          ].map((k) => (
            <div key={k.l} className="py-5 text-center sm:py-6">
              <dt className="font-display text-3xl font-extrabold text-amber sm:text-4xl">
                <Counter to={k.v} suffix={k.s} />
              </dt>
              <dd className="text-[11px] uppercase tracking-wider text-white/60 sm:text-xs">{k.l}</dd>
            </div>
          ))}
        </dl>
      </div>

      {communes.length > 0 && (
        <div className="relative overflow-hidden border-t border-white/10 bg-ink py-3" aria-hidden>
          <div className="flex w-max animate-marquee gap-10 whitespace-nowrap px-4 text-sm font-medium uppercase tracking-[0.18em] text-white/60">
            {[0, 1].map((k) => (
              <span key={k} className="flex gap-10">
                {communes.map((c) => (
                  <span key={c} className="flex items-center gap-10">
                    {c}
                    <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
