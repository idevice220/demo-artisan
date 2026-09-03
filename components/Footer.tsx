import { Phone, Mail, MapPin, Clock, KeyRound } from 'lucide-react'
import type { Site } from '@/lib/settings'

export function Footer({ site }: { site: Site }) {
  return (
    <footer className="bg-ink pb-24 pt-14 text-white md:pb-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl font-extrabold uppercase">{site.name}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-amber">{site.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">{site.footerText}</p>
          <div className="hazard mt-6 h-2 w-32 rounded-full" aria-hidden />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Me joindre</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href={site.tel} className="inline-flex items-center gap-2 hover:text-amber"><Phone size={15} className="text-amber" /> {site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-amber"><Mail size={15} className="text-amber" /> {site.email}</a></li>
            <li className="inline-flex items-start gap-2 text-white/75"><MapPin size={15} className="mt-0.5 text-amber" /> {site.address}</li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Horaires</p>
          <ul className="mt-4 space-y-2 text-sm">
            {site.hoursRows.map((h) => (
              <li key={h.d} className="flex items-center justify-between gap-4 border-b border-white/10 pb-2">
                <span className="inline-flex items-center gap-2 text-white/75"><Clock size={14} className="text-amber" /> {h.d}</span>
                <span className="font-semibold">{h.h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/10 px-4 pt-6 text-xs text-white/50 sm:flex-row">
        <span>© {new Date().getFullYear()} {site.name} · Entreprise fictive</span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <a href="/admin" className="inline-flex items-center gap-2 rounded-full border border-amber/40 px-3 py-1.5 font-semibold text-amber transition-colors hover:bg-amber hover:text-ink">
            <KeyRound size={13} /> Espace propriétaire (démo ouverte)
          </a>
          <a href="https://nex-web.fr" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 font-semibold text-white/80 transition-colors hover:border-amber hover:text-amber">
            Site de démonstration — créé par NEX-WEB
          </a>
        </div>
      </div>
    </footer>
  )
}
