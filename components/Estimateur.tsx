'use client'

import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { Check, Clock, Send, Sparkles, Info } from 'lucide-react'
import type { EstimateTypeT } from '@/lib/content'
import { SectionHeading } from './Section'
import { Reveal } from './Reveal'
import { ServiceIcon } from './Icons'

const URGENCIES = [
  { id: 'now', label: 'Aujourd’hui', sub: 'Urgence · majoration +30 %', mult: 1.3 },
  { id: '48h', label: 'Sous 48 h', sub: 'Tarif normal', mult: 1 },
  { id: 'plan', label: 'Je planifie', sub: 'Créneau au choix · −5 %', mult: 0.95 },
]
const round5 = (n: number) => Math.round(n / 5) * 5
const eur = (n: number) => n.toLocaleString('fr-FR') + ' €'

export function Estimateur({ types }: { types: EstimateTypeT[] }) {
  const [typeId, setTypeId] = useState(types[0]?.id)
  const [optionId, setOptionId] = useState(types[0]?.options[0]?.id)
  const [urgencyId, setUrgencyId] = useState('48h')
  const [surface, setSurface] = useState(6)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [sending, setSending] = useState(false)

  const type = types.find((t) => t.id === typeId) ?? types[0]
  const option = type?.options.find((o) => o.id === optionId) ?? type?.options[0]
  const urgency = URGENCIES.find((u) => u.id === urgencyId)!

  const [min, max] = useMemo(() => {
    if (!type || !option) return [0, 0]
    if (type.surface) return [round5(option.addMin * surface), round5(option.addMax * surface)]
    const lo = (type.baseMin + option.addMin) * urgency.mult
    const hi = (type.baseMax + option.addMax) * urgency.mult
    return [round5(Math.min(lo, hi)), round5(Math.max(lo, hi))]
  }, [type, option, urgency, surface])

  if (!type || !option) return null

  function pickType(id: number) {
    const t = types.find((x) => x.id === id)!
    setTypeId(id)
    setOptionId(t.options[0]?.id)
  }

  async function send(e: React.FormEvent) {
    e.preventDefault()
    if (!type || !option) return
    setSending(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kind: 'estimation', name, phone, type: type.label, slot: type.surface ? 'Je planifie' : urgency.label, message: `${option.label}${type.surface ? ` · ${surface} m²` : ''}`, estimateMin: min, estimateMax: max }),
      })
      if (!res.ok) throw new Error()
      toast.success(`Estimation envoyée à ${name.split(' ')[0] || 'vous'} — je vous rappelle sous 15 min. Elle vient d’arriver dans l’espace propriétaire de la démo.`)
      setName('')
      setPhone('')
    } catch {
      toast.error('Envoi impossible, réessayez.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="estimation" className="bg-navy py-20 text-white lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading light eyebrow="Estimation en 60 secondes" title={<>Combien ça va coûter&nbsp;? <span className="text-amber">Voyez tout de suite.</span></>} subtitle="Trois questions, une fourchette honnête. Le devis ferme suit après diagnostic, mais vous ne partez jamais dans l’inconnu." />

        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <Reveal className="space-y-6">
            <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 sm:p-6">
              <p className="mb-4 flex items-center gap-3 font-display text-xl font-bold uppercase tracking-wide">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-amber font-display text-lg text-ink">1</span> Quel est le problème&nbsp;?
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {types.map((t) => {
                  const active = t.id === type.id
                  return (
                    <button key={t.id} onClick={() => pickType(t.id)} className={`flex flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-all ${active ? 'border-amber bg-amber text-ink shadow-amber' : 'border-white/10 bg-white/5 hover:border-white/30'}`}>
                      <ServiceIcon name={t.icon} size={22} strokeWidth={2.2} className={active ? 'text-ink' : 'text-amber'} />
                      <span className="font-display text-lg font-bold uppercase leading-none">{t.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 sm:p-6">
              <p className="mb-4 flex items-center gap-3 font-display text-xl font-bold uppercase tracking-wide">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-amber font-display text-lg text-ink">2</span> Précisez
              </p>
              <div className="space-y-2">
                {type.options.map((o) => {
                  const active = o.id === option.id
                  return (
                    <button key={o.id} onClick={() => setOptionId(o.id)} className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${active ? 'border-amber bg-white/10' : 'border-white/10 hover:border-white/30'}`}>
                      <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${active ? 'border-amber bg-amber text-ink' : 'border-white/40'}`}>{active && <Check size={12} strokeWidth={3.5} />}</span>
                      <span className="flex-1">
                        <span className="block font-semibold">{o.label}</span>
                        {o.note && <span className="block text-sm text-white/60">{o.note}</span>}
                      </span>
                    </button>
                  )
                })}
              </div>
              {type.surface && (
                <div className="mt-5 rounded-xl bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="surface" className="font-semibold">Surface de la salle de bain</label>
                    <span className="font-display text-2xl font-bold text-amber">{surface}&nbsp;m²</span>
                  </div>
                  <input id="surface" type="range" min={3} max={14} step={1} value={surface} onChange={(e) => setSurface(Number(e.target.value))} className="mt-3 w-full accent-amber" />
                  <div className="mt-1 flex justify-between text-xs text-white/50"><span>3 m²</span><span>14 m²</span></div>
                </div>
              )}
            </div>

            {!type.surface && (
              <div className="rounded-3xl bg-white/5 p-5 ring-1 ring-white/10 sm:p-6">
                <p className="mb-4 flex items-center gap-3 font-display text-xl font-bold uppercase tracking-wide">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-amber font-display text-lg text-ink">3</span> C’est pour quand&nbsp;?
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {URGENCIES.map((u) => {
                    const active = u.id === urgencyId
                    return (
                      <button key={u.id} onClick={() => setUrgencyId(u.id)} className={`rounded-2xl border p-4 text-left transition-all ${active ? 'border-amber bg-amber text-ink' : 'border-white/10 bg-white/5 hover:border-white/30'}`}>
                        <span className="block font-display text-xl font-bold uppercase leading-none">{u.label}</span>
                        <span className={`mt-1 block text-sm ${active ? 'text-ink/70' : 'text-white/60'}`}>{u.sub}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </Reveal>

          <Reveal delay={120} className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-3xl bg-white text-ink shadow-lift">
              <div className="hazard h-2" aria-hidden />
              <div className="p-6 sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-steel">Votre estimation</p>
                <p className="mt-2 font-display text-5xl font-extrabold leading-none text-navy sm:text-6xl">
                  {eur(min)} <span className="text-2xl text-ink/40">à</span> {eur(max)}
                </p>
                <p className="mt-2 text-sm text-ink/60">
                  {type.label} · {option.label}
                  {type.surface ? ` · ${surface} m²` : ` · ${urgency.label.toLowerCase()}`}
                </p>

                <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-mist px-3 py-1.5 text-sm font-semibold text-navy">
                  <Clock size={15} className="text-amber-deep" /> {type.delay}
                </p>

                <ul className="mt-5 space-y-2 text-sm text-ink/80">
                  {type.includes.map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-ok" /> {t}
                    </li>
                  ))}
                </ul>

                <form onSubmit={send} className="mt-6 space-y-3 border-t border-line pt-5">
                  <p className="flex items-center gap-2 font-display text-lg font-bold uppercase text-navy">
                    <Sparkles size={16} className="text-amber-deep" /> Recevoir ce devis par SMS
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre prénom" className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-[15px] outline-none focus:border-amber focus:ring-2 focus:ring-amber/30" />
                    <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="06 12 34 56 78" inputMode="tel" className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-[15px] outline-none focus:border-amber focus:ring-2 focus:ring-amber/30" />
                  </div>
                  <button disabled={sending} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber px-6 py-3.5 font-display text-xl font-bold uppercase tracking-wide text-ink shadow-amber transition-transform hover:-translate-y-0.5 disabled:opacity-60">
                    <Send size={18} strokeWidth={2.5} /> {sending ? 'Envoi…' : 'Envoyer mon estimation'}
                  </button>
                  <p className="flex items-start gap-1.5 text-xs text-ink/50">
                    <Info size={13} className="mt-0.5 shrink-0" /> Fourchette indicative TTC. Le devis ferme est établi après diagnostic (souvent par téléphone) et signé avant toute intervention.
                  </p>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
