'use client'

import { useMemo, useState } from 'react'
import { MapPin, Search, CheckCircle2, PhoneCall } from 'lucide-react'
import type { Zone as ZoneRow } from '@prisma/client'
import type { Site } from '@/lib/settings'
import { SectionHeading } from './Section'
import { Reveal } from './Reveal'

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '')

export function Zone({ zones, site }: { zones: ZoneRow[]; site: Site }) {
  const [q, setQ] = useState('')
  const [hover, setHover] = useState<string | null>(null)
  const result = useMemo(() => {
    const n = norm(q)
    if (n.length < 3) return null
    return zones.find((z) => norm(z.name).includes(n)) ?? { name: q, x: 0, y: 0, min: -1 }
  }, [q, zones])

  const S = 20, CX = 300, CY = 260
  const px = (km: number) => CX + km * S
  const py = (km: number) => CY + km * S
  const active = hover ?? result?.name ?? null
  const center = zones[0]

  return (
    <section id="zone" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow="Zone d’intervention" title={<>Le Raincy et tout <span className="text-amber-deep">l’Est parisien.</span></>} subtitle={`Basé au Raincy, je couvre ${zones.length > 1 ? `${zones.length} communes` : 'les communes voisines'}. Tapez la vôtre pour connaître mon délai d’intervention.`} />

        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-paper shadow-card">
              <svg viewBox="0 0 600 520" className="block h-auto w-full" role="img" aria-label="Carte stylisée des communes couvertes autour du Raincy">
                <defs>
                  <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M24 0H0V24" fill="none" stroke="#10284A" strokeOpacity="0.06" />
                  </pattern>
                </defs>
                <rect width="600" height="520" fill="url(#grid)" />
                {[[4, '15 min'], [8, '30 min'], [12, '45 min']].map(([r, l]) => (
                  <g key={l as string}>
                    <circle cx={CX} cy={CY} r={(r as number) * S} fill={r === 4 ? '#FFB020' : 'none'} fillOpacity={0.12} stroke="#10284A" strokeOpacity={0.25} strokeDasharray="6 6" />
                    <text x={CX + (r as number) * S * Math.cos(-0.61) + 4} y={CY + (r as number) * S * Math.sin(-0.61)} fontSize="11" fontWeight="700" fill="#3A5A85">{l}</text>
                  </g>
                ))}
                {zones.map((z) => {
                  const isCenter = center && z.id === center.id
                  const on = active === z.name
                  return (
                    <g key={z.id} onMouseEnter={() => setHover(z.name)} onMouseLeave={() => setHover(null)} className="cursor-pointer">
                      {isCenter ? (
                        <>
                          <circle cx={px(z.x)} cy={py(z.y)} r="16" fill="#FFB020" fillOpacity="0.35" />
                          <circle cx={px(z.x)} cy={py(z.y)} r="7" fill="#10284A" stroke="#FFB020" strokeWidth="3" />
                        </>
                      ) : (
                        <circle cx={px(z.x)} cy={py(z.y)} r={on ? 8 : 5} fill={on ? '#FFB020' : '#10284A'} stroke="#fff" strokeWidth="2" />
                      )}
                      <text x={px(z.x)} y={py(z.y) + (isCenter ? -14 : z.y < 0 ? -11 : 20)} textAnchor="middle" fontSize={isCenter ? 13 : 11} fontWeight={isCenter || on ? 800 : 600} fill={isCenter || on ? '#0B1220' : '#3A5A85'}>{z.name}</text>
                    </g>
                  )
                })}
              </svg>
              <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy shadow-sm">Carte schématique · délais moyens en journée</div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-3xl bg-navy p-6 text-white shadow-lift sm:p-8">
              <label htmlFor="commune" className="font-display text-2xl font-bold uppercase">Vérifiez votre commune</label>
              <div className="relative mt-4">
                <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                <input id="commune" list="communes" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ex : Villemomble" className="w-full rounded-full border border-white/15 bg-white/10 py-3.5 pl-11 pr-4 text-[15px] text-white placeholder:text-white/40 outline-none focus:border-amber focus:ring-2 focus:ring-amber/30" />
                <datalist id="communes">
                  {zones.map((z) => <option key={z.id} value={z.name} />)}
                </datalist>
              </div>

              <div className="mt-5 min-h-[112px]">
                {!result && (
                  <div className="flex flex-wrap gap-2">
                    {zones.slice(1, 8).map((z) => (
                      <button key={z.id} onClick={() => setQ(z.name)} className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/80 hover:border-amber hover:text-amber">{z.name}</button>
                    ))}
                  </div>
                )}
                {result && result.min > 0 && (
                  <div className="rounded-2xl bg-white p-5 text-ink">
                    <p className="flex items-center gap-2 font-display text-2xl font-bold uppercase leading-none text-navy"><CheckCircle2 size={22} className="text-ok" /> Oui, j’interviens à {result.name}</p>
                    <p className="mt-2 text-[15px] text-ink/70">Délai moyen en journée : <strong className="text-navy">{result.min} min</strong>. Déplacement compris dans les forfaits.</p>
                    <a href={site.tel} className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber px-5 py-2.5 font-display text-lg font-bold uppercase text-ink"><PhoneCall size={17} /> Appeler {site.phone}</a>
                  </div>
                )}
                {result && result.min < 0 && (
                  <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15">
                    <p className="flex items-center gap-2 font-display text-xl font-bold uppercase leading-none"><MapPin size={20} className="text-amber" /> Hors de ma zone habituelle</p>
                    <p className="mt-2 text-[15px] text-white/75">« {result.name} » n’est pas dans mes communes courantes, mais appelez-moi : pour un chantier de rénovation, je me déplace plus loin.</p>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
