import Image from 'next/image'
import { Phone, ArrowRight, Star, ShieldCheck, Clock, BadgeCheck, Calculator } from 'lucide-react'
import { BUSINESS } from '@/lib/data'
import { NextSlot } from './Status'
import { Counter } from './Counter'

export function Hero() {
  return (
    <section id="top" className="blueprint relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-amber/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-52 -left-32 h-[420px] w-[420px] rounded-full bg-steel/40 blur-3xl" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-16">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-amber">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" /> Plombier chauffagiste · Le Raincy & Est parisien
          </p>
          <h1 className="mt-6 font-display text-[54px] font-extrabold uppercase leading-[0.95] tracking-tight sm:text-7xl lg:text-[84px]">
            Une fuite&nbsp;?
            <br />
            Un artisan chez vous <span className="text-amber">en 45&nbsp;min.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">
            Dépannage, chauffage, salle de bain. Le prix est annoncé <strong className="text-white">avant</strong> que je vienne, écrit sur un devis, et il ne bouge pas.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={BUSINESS.tel} className="inline-flex items-center justify-center gap-2 rounded-full bg-amber px-7 py-4 font-display text-xl font-bold uppercase tracking-wide text-ink shadow-amber transition-transform hover:-translate-y-0.5">
              <Phone size={20} strokeWidth={2.5} /> Appeler maintenant
            </a>
            <a href="#estimation" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/25 px-7 py-4 font-display text-xl font-bold uppercase tracking-wide text-white transition-colors hover:border-amber hover:text-amber">
              <Calculator size={20} /> Estimer mon devis
              <ArrowRight size={18} />
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            {[
              [ShieldCheck, 'Garantie décennale'],
              [BadgeCheck, 'Devis ferme avant intervention'],
              [Clock, 'Déplacement offert si devis accepté'],
            ].map(([I, t]) => {
              const Icon = I as typeof ShieldCheck
              return (
                <li key={t as string} className="inline-flex items-center gap-2">
                  <Icon size={16} className="text-amber" /> {t as string}
                </li>
              )
            })}
          </ul>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/15 pt-6">
            {[
              { v: BUSINESS.years, s: ' ans', l: 'd’expérience' },
              { v: BUSINESS.interventions, s: '+', l: 'interventions' },
              { v: BUSINESS.avgDelay, s: ' min', l: 'délai moyen' },
            ].map((k) => (
              <div key={k.l}>
                <dt className="font-display text-4xl font-extrabold text-amber">
                  <Counter to={k.v} suffix={k.s} />
                </dt>
                <dd className="text-xs uppercase tracking-wider text-white/60">{k.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* visuel */}
        <div className="relative mx-auto w-full max-w-[560px] animate-fade-up [animation-delay:150ms]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-lift">
            <Image src="/images/hero.jpg" alt="Julien Martin, plombier, en intervention" fill priority sizes="(max-width: 1024px) 100vw, 560px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
              <div>
                <p className="font-display text-2xl font-bold uppercase leading-none">{BUSINESS.owner}</p>
                <p className="text-sm text-white/75">Artisan plombier depuis {BUSINESS.years} ans</p>
              </div>
              <div className="hazard h-2 w-24 rounded-full opacity-90" aria-hidden />
            </div>
          </div>

          {/* prochain créneau */}
          <div className="absolute -left-3 top-6 rounded-2xl bg-white p-4 text-ink shadow-lift sm:-left-8">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-steel">Prochain créneau</p>
            <p className="mt-0.5 flex items-center gap-2 font-display text-2xl font-bold uppercase leading-none">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ring rounded-full bg-ok" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ok" />
              </span>
              <NextSlot />
            </p>
          </div>

          {/* note */}
          <div className="absolute -bottom-5 right-3 rounded-2xl bg-white p-4 text-ink shadow-lift sm:-right-6">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} className="fill-amber text-amber" />
              ))}
              <span className="ml-1 font-display text-xl font-bold">{BUSINESS.rating.toLocaleString('fr-FR')}</span>
            </div>
            <p className="mt-0.5 text-xs font-medium text-steel">{BUSINESS.reviews} avis Google vérifiés</p>
          </div>
        </div>
      </div>

      {/* bande communes */}
      <div className="relative border-t border-white/10 bg-ink/60 py-3" aria-hidden>
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap px-4 text-sm font-medium uppercase tracking-[0.18em] text-white/60">
          {[0, 1].map((k) => (
            <span key={k} className="flex gap-10">
              {['Le Raincy', 'Villemomble', 'Gagny', 'Clichy-sous-Bois', 'Montfermeil', 'Livry-Gargan', 'Bondy', 'Les Pavillons-sous-Bois', 'Neuilly-Plaisance', 'Rosny-sous-Bois', 'Aulnay-sous-Bois', 'Noisy-le-Grand'].map((c) => (
                <span key={c} className="flex items-center gap-10">
                  {c}
                  <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
