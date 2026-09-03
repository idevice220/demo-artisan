import { BadgeCheck, Receipt } from 'lucide-react'
import { TARIFS } from '@/lib/data'
import { SectionHeading } from './Section'
import { Reveal } from './Reveal'

export function Tarifs() {
  return (
    <section id="tarifs" className="blueprint-light py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <SectionHeading eyebrow="Tarifs" title={<>Des prix <span className="text-amber-deep">affichés</span>, comme sur une vitrine.</>} subtitle="Parce qu’on n’appelle pas un plombier pour avoir une mauvaise surprise. Tous les prix sont TTC et déplacement compris." />
          <Reveal>
            <ul className="space-y-3 text-[15px] text-ink/80">
              {['Devis écrit et signé avant intervention', 'Pas de supplément pour le diagnostic', 'Paiement en 3 fois sans frais dès 600 €', 'Facture conforme pour votre assurance'].map((t) => (
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
              <span className="font-display text-xl font-bold uppercase tracking-wide">Grille tarifaire 2026</span>
            </div>
            <ul className="divide-y divide-line">
              {TARIFS.map((t) => (
                <li key={t.label} className="flex items-center justify-between gap-4 px-6 py-4">
                  <div>
                    <p className="font-semibold text-navy">{t.label}</p>
                    <p className="text-sm text-ink/60">{t.note}</p>
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
