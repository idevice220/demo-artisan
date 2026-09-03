'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Phone, MapPin, Clock, Calculator, PhoneIncoming, Check, RotateCcw, Trash2, Camera } from 'lucide-react'
import { Badge, Button, Card, Confirm, Empty, PageHeader, cls, timeAgo } from './ui'

export type LeadRow = { id: number; kind: string; name: string; phone: string; city: string | null; type: string | null; message: string | null; slot: string | null; estimateMin: number | null; estimateMax: number | null; photoId: string | null; status: string; createdAt: string }

const TABS = [
  { id: 'new', label: 'À traiter' },
  { id: 'done', label: 'Traitées' },
  { id: 'all', label: 'Toutes' },
] as const

export function Inbox({ leads }: { leads: LeadRow[] }) {
  const router = useRouter()
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('new')
  const [busy, setBusy] = useState<number | null>(null)
  const [del, setDel] = useState<LeadRow | null>(null)
  const counts = useMemo(() => ({ new: leads.filter((l) => l.status === 'new').length, done: leads.filter((l) => l.status === 'done').length, all: leads.length }), [leads])
  const list = leads.filter((l) => tab === 'all' || l.status === tab)

  async function setStatus(l: LeadRow, status: 'new' | 'done') {
    setBusy(l.id)
    try {
      const res = await fetch(`/api/admin/leads/${l.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
      if (!res.ok) throw new Error()
      toast.success(status === 'done' ? 'Demande marquée traitée' : 'Demande rouverte')
      router.refresh()
    } catch {
      toast.error('Action impossible')
    } finally {
      setBusy(null)
    }
  }
  async function remove() {
    if (!del) return
    setBusy(del.id)
    try {
      const res = await fetch(`/api/admin/leads/${del.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast.success('Demande supprimée')
      setDel(null)
      router.refresh()
    } catch {
      toast.error('Suppression impossible')
    } finally {
      setBusy(null)
    }
  }

  return (
    <section>
      <PageHeader title="Demandes" description="Tout ce que vos clients envoient depuis le site arrive ici : rappels, estimations, photos. Testez depuis la page d’accueil : la demande apparaît instantanément." />
      <div className="mb-4 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={cls('rounded-full border px-4 py-2 text-sm font-semibold transition-colors', tab === t.id ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-600 hover:border-slate-500')}>
            {t.label} <span className={cls('ml-1 rounded-full px-1.5 text-xs', tab === t.id ? 'bg-white/20' : 'bg-slate-100')}>{counts[t.id]}</span>
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <Empty title={tab === 'new' ? 'Rien à traiter, bravo' : 'Aucune demande'} text="Envoyez une demande depuis le site pour voir comment elle arrive ici." />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {list.map((l) => {
            const isEstimate = l.kind === 'estimation'
            return (
              <Card key={l.id} className={cls('flex flex-col p-5', busy === l.id && 'opacity-50', l.status === 'new' && 'border-l-4 border-l-[var(--a)]')}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={cls('grid h-10 w-10 shrink-0 place-items-center rounded-full', isEstimate ? 'bg-sky-100 text-sky-700' : 'bg-[var(--a)]/20 text-[var(--a-deep)]')}>
                      {isEstimate ? <Calculator size={18} /> : <PhoneIncoming size={18} />}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900">{l.name}</p>
                      <p className="text-xs text-slate-500">{isEstimate ? 'Estimation en ligne' : 'Demande de rappel'} · {timeAgo(l.createdAt)}</p>
                    </div>
                  </div>
                  <Badge tone={l.status === 'new' ? 'amber' : 'green'}>{l.status === 'new' ? 'à traiter' : 'traitée'}</Badge>
                </div>

                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-slate-700">
                  <a href={`tel:${l.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 font-semibold text-slate-900 hover:underline"><Phone size={14} className="text-[var(--a-deep)]" /> {l.phone}</a>
                  {l.city && <span className="inline-flex items-center gap-1.5"><MapPin size={14} className="text-[var(--a-deep)]" /> {l.city}</span>}
                  {l.slot && <span className="inline-flex items-center gap-1.5"><Clock size={14} className="text-[var(--a-deep)]" /> {l.slot}</span>}
                </div>
                {l.type && <p className="mt-2 text-sm"><span className="text-slate-500">Problème :</span> <span className="font-medium text-slate-800">{l.type}</span></p>}
                {isEstimate && l.estimateMin !== null && (
                  <p className="mt-2 inline-flex w-fit items-center gap-2 rounded-xl bg-sky-50 px-3 py-2 text-sm text-sky-900">
                    Fourchette annoncée : <strong className="font-display text-lg">{l.estimateMin} – {l.estimateMax} €</strong>
                  </p>
                )}
                {l.message && <p className="mt-3 rounded-xl bg-slate-50 px-4 py-3 text-[15px] leading-relaxed text-slate-700">« {l.message} »</p>}
                {l.photoId && (
                  <a href={`/api/media/${l.photoId}`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-3 rounded-xl border border-slate-200 p-2 pr-3 text-sm text-slate-700 hover:border-slate-400">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/api/media/${l.photoId}`} alt="" className="h-14 w-14 rounded-lg object-cover" />
                    <span className="inline-flex items-center gap-1.5"><Camera size={14} /> Photo jointe par le client</span>
                  </a>
                )}

                <div className="mt-4 flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                  <Button size="sm" variant="ghost" onClick={() => setDel(l)} aria-label="Supprimer"><Trash2 size={15} /></Button>
                  {l.status === 'new' ? (
                    <Button size="sm" variant="primary" onClick={() => setStatus(l, 'done')}><Check size={15} /> Marquer traitée</Button>
                  ) : (
                    <Button size="sm" onClick={() => setStatus(l, 'new')}><RotateCcw size={15} /> Rouvrir</Button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      )}
      <Confirm open={del !== null} title="Supprimer cette demande ?" text="Elle disparaît définitivement de la boîte de réception." onConfirm={remove} onCancel={() => setDel(null)} loading={busy !== null} />
    </section>
  )
}
