'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { Phone, Camera, Send, Clock, MapPin, MessageCircle, X } from 'lucide-react'
import { BUSINESS, HOURS_LABEL, ESTIMATE_TYPES } from '@/lib/data'
import { SectionHeading } from './Section'
import { Reveal } from './Reveal'
import { OpenStatus } from './Status'

const field = 'w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] outline-none placeholder:text-ink/40 focus:border-amber focus:ring-2 focus:ring-amber/30'

export function Contact() {
  const [photo, setPhoto] = useState<{ name: string; url: string } | null>(null)
  const [slot, setSlot] = useState('urgent')
  const [sending, setSending] = useState(false)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setSending(true)
    await new Promise((r) => setTimeout(r, 900))
    setSending(false)
    toast.success('Demande envoyée ! Je vous rappelle sous 15 minutes. (démo : aucun message n’est réellement transmis)')
    form.reset()
    setPhoto(null)
  }

  return (
    <section id="contact" className="bg-navy py-20 text-white lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading light eyebrow="Contact" title={<>Décrivez le problème, <span className="text-amber">je vous rappelle.</span></>} subtitle="Une photo vaut mieux qu’un long discours : joignez-la, je pourrai souvent vous donner le prix directement au téléphone." />

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="flex h-full flex-col justify-between gap-8 rounded-3xl bg-white/5 p-7 ring-1 ring-white/10">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber">Le plus rapide</p>
                <a href={BUSINESS.tel} className="mt-2 block font-display text-5xl font-extrabold leading-none">{BUSINESS.phone}</a>
                <OpenStatus light className="mt-3" />
                <div className="mt-5 flex flex-wrap gap-2">
                  <a href={BUSINESS.tel} className="inline-flex items-center gap-2 rounded-full bg-amber px-4 py-2.5 font-display text-lg font-bold uppercase text-ink"><Phone size={17} /> Appeler</a>
                  <a href={BUSINESS.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-ok px-4 py-2.5 font-display text-lg font-bold uppercase text-white"><MessageCircle size={17} /> WhatsApp</a>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-white/80">
                {HOURS_LABEL.map((h) => (
                  <li key={h.d} className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="inline-flex items-center gap-2"><Clock size={14} className="text-amber" /> {h.d}</span>
                    <span className="font-semibold text-white">{h.h}</span>
                  </li>
                ))}
                <li className="flex items-start gap-2 pt-1"><MapPin size={14} className="mt-1 text-amber" /> {BUSINESS.address}</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <form onSubmit={submit} className="space-y-4 rounded-3xl bg-white p-6 text-ink shadow-lift sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-steel">Votre nom *</span><input required name="name" className={field} placeholder="Marie Dupont" /></label>
                <label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-steel">Téléphone *</span><input required name="phone" inputMode="tel" className={field} placeholder="06 12 34 56 78" /></label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-steel">Commune</span><input name="city" className={field} placeholder="Le Raincy" /></label>
                <label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-steel">Type de problème</span>
                  <select name="type" className={field} defaultValue="fuite">
                    {ESTIMATE_TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                    <option value="autre">Autre</option>
                  </select>
                </label>
              </div>
              <label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-steel">Décrivez en deux mots *</span><textarea required name="message" rows={3} className={field} placeholder="Ex : fuite sous l’évier de la cuisine depuis ce matin, j’ai coupé l’eau." /></label>

              <div>
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-steel">Quand ?</span>
                <div className="grid grid-cols-3 gap-2">
                  {[['urgent', 'Urgent'], ['matin', 'Matin'], ['aprem', 'Après-midi']].map(([v, l]) => (
                    <button type="button" key={v} onClick={() => setSlot(v)} className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${slot === v ? 'border-navy bg-navy text-white' : 'border-line bg-paper text-navy hover:border-navy'}`}>{l}</button>
                  ))}
                </div>
              </div>

              <div>
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-steel">Une photo du problème (optionnel)</span>
                {photo ? (
                  <div className="flex items-center gap-3 rounded-xl border border-line bg-paper p-2 pr-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.url} alt="" className="h-14 w-14 rounded-lg object-cover" />
                    <span className="flex-1 truncate text-sm">{photo.name}</span>
                    <button type="button" onClick={() => setPhoto(null)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-line" aria-label="Retirer la photo"><X size={16} /></button>
                  </div>
                ) : (
                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-paper px-4 py-4 text-sm font-semibold text-steel transition-colors hover:border-amber hover:text-navy">
                    <Camera size={18} /> Prendre ou choisir une photo
                    <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) setPhoto({ name: f.name, url: URL.createObjectURL(f) }) }} />
                  </label>
                )}
              </div>

              <button disabled={sending} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber px-6 py-4 font-display text-xl font-bold uppercase tracking-wide text-ink shadow-amber transition-transform hover:-translate-y-0.5 disabled:opacity-60">
                <Send size={18} strokeWidth={2.5} /> {sending ? 'Envoi…' : 'Être rappelé en 15 min'}
              </button>
              <p className="text-xs text-ink/50">En envoyant ce formulaire, vous acceptez d’être recontacté au sujet de votre demande. Aucune prospection.</p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
