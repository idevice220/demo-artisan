import { BadgeCheck, Receipt } from 'lucide-react'
import type { Tarif } from '@prisma/client'
import type { Site } from '@/lib/settings'
import { SectionHeading } from './Section'
import { Reveal } from './Reveal'

export function Tarifs({ tarifs, site }: { tarifs: Tarif[]; site: Site }) {
  return (
    <section id="tarifs" className="blueprint-light py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <SectionHeading eyebrow="Tarifs" title={<>Des prix <span className="text-amber-deep">affichés</span>, comme sur une vitrine.</>} subtitle="Parce qu’on n’appelle pas un plombier pour avoir une mauvaise surprise. Tous les prix sont TTC et déplacement compris." />
          <Reveal>
            <ul className="space-y-3 text-[15px] text-ink/80">
              {site.tarifs.points.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <BadgeCheck size={18} className="mt-0.5 shrink-0 text-amber-deep" /> {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
            <div className="flex items-center gap-3 border-b border-line bg-navy px-6 py-4 text-white">
              <Receipt size={20} className="text-amber" />
              <span className="font-display text-xl font-bold uppercase tracking-wide">{site.tarifs.title}</span>
            </div>
            <ul className="divide-y divide-line">
              {tarifs.map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-4 px-6 py-4">
                  <div>
                    <p className="font-semibold text-navy">{t.label}</p>
                    {t.note && <p className="text-sm text-ink/60">{t.note}</p>}
                  </div>
                  <span className="shrink-0 font-display text-2xl font-extrabold text-navy">{t.price}</span>
                </li>
              ))}
            </ul>
            <p className="bg-paper px-6 py-3 text-xs text-ink/60">Prix indicatifs TTC pour un logement standard. Le devis précis est établi après diagnostic, et il est ferme.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
