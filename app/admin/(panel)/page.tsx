import Link from 'next/link'
import { Inbox, Calculator, Star, Clock, ArrowRight, Receipt, Images, Megaphone, Phone, Wrench, Smartphone } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { getSettings, toSite } from '@/lib/settings'
import { getStatus, parisNow } from '@/lib/hours'
import { Card, Badge } from '@/components/admin/ui'
import { timeAgo } from '@/lib/admin/format'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const since = new Date(Date.now() - 7 * 86_400_000)
  const [settings, newLeads, weekEstimates, services, visibleServices, reviews, realisations, recent] = await Promise.all([
    getSettings(),
    prisma.lead.count({ where: { status: 'new' } }),
    prisma.lead.count({ where: { kind: 'estimation', createdAt: { gte: since } } }),
    prisma.service.count(),
    prisma.service.count({ where: { visible: true } }),
    prisma.review.count({ where: { visible: true } }),
    prisma.realisation.count({ where: { visible: true } }),
    prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
  ])
  const site = toSite(settings)
  const status = getStatus(site.hours, parisNow(), { closedSuffix: site.hoursSuffix })

  const kpis = [
    { label: 'Demandes à traiter', value: newLeads, sub: 'rappels et estimations', icon: Inbox, href: '/admin/demandes', hot: newLeads > 0 },
    { label: 'Estimations reçues', value: weekEstimates, sub: 'ces 7 derniers jours', icon: Calculator, href: '/admin/demandes' },
    { label: 'Note affichée', value: site.rating.toLocaleString('fr-FR'), sub: `${site.reviewsCount} avis · ${reviews} témoignages en ligne`, icon: Star, href: '/admin/avis' },
    { label: 'En ce moment', value: status.open ? 'Ouvert' : 'Fermé', sub: status.label, icon: Clock, href: '/admin/horaires' },
  ]
  const quick = [
    { href: '/admin/tarifs', label: 'Changer un prix', text: 'La grille tarifaire, en ligne à la seconde.', icon: Receipt },
    { href: '/admin/realisations', label: 'Ajouter un chantier', text: 'Une photo, un titre, une commune.', icon: Images },
    { href: '/admin/reglages', label: 'Modifier le bandeau', text: 'Le message d’urgence en haut du site.', icon: Megaphone },
    { href: '/admin/horaires', label: 'Fermer un jour', text: 'Vacances, jour férié : le site le dit.', icon: Clock },
  ]

  return (
    <div>
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--a-deep)]">Bonjour {site.owner.split(' ')[0]}</p>
        <h1 className="mt-1 font-display text-3xl font-bold uppercase tracking-wide text-slate-900">Tableau de bord</h1>
        <p className="mt-1 text-[15px] text-slate-500">Votre site travaille pour vous. Voici ce qui s’est passé.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => {
          const Icon = k.icon
          return (
            <Link key={k.label} href={k.href} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">{k.label}</span>
                <span className={`grid h-9 w-9 place-items-center rounded-xl ${k.hot ? 'bg-[var(--a)] text-[var(--a-ink)]' : 'bg-slate-100 text-slate-600'}`}><Icon size={18} /></span>
              </div>
              <p className="mt-3 font-display text-4xl font-extrabold text-slate-900">{k.value}</p>
              <p className="mt-1 truncate text-xs text-slate-500">{k.sub}</p>
            </Link>
          )
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-slate-900">Dernières demandes</h2>
            <Link href="/admin/demandes" className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--a-deep)] hover:underline">Tout voir <ArrowRight size={14} /></Link>
          </div>
          <ul className="mt-3 divide-y divide-slate-100">
            {recent.map((l) => (
              <li key={l.id} className="flex items-center gap-3 py-3">
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${l.kind === 'estimation' ? 'bg-sky-100 text-sky-700' : 'bg-[var(--a)]/20 text-[var(--a-deep)]'}`}>{l.kind === 'estimation' ? <Calculator size={16} /> : <Phone size={16} />}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-800">{l.name} <span className="font-normal text-slate-400">· {l.type ?? 'rappel'}</span></p>
                  <p className="truncate text-xs text-slate-500">{l.message ?? (l.estimateMin !== null ? `Estimation ${l.estimateMin} – ${l.estimateMax} €` : l.slot ?? '')}</p>
                </div>
                <span className="shrink-0 text-xs text-slate-400">{timeAgo(l.createdAt)}</span>
                <Badge tone={l.status === 'new' ? 'amber' : 'green'}>{l.status === 'new' ? 'à traiter' : 'traitée'}</Badge>
              </li>
            ))}
          </ul>
        </Card>

        <div className="space-y-6">
          <Card className="p-5">
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-slate-900">Actions rapides</h2>
            <ul className="mt-3 space-y-2">
              {quick.map((q) => {
                const Icon = q.icon
                return (
                  <li key={q.href}>
                    <Link href={q.href} className="flex items-center gap-3 rounded-xl border border-slate-200 px-3.5 py-3 transition-colors hover:border-[var(--a)] hover:bg-[var(--a)]/5">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-700"><Icon size={17} /></span>
                      <span className="min-w-0 flex-1"><span className="block font-semibold text-slate-800">{q.label}</span><span className="block truncate text-xs text-slate-500">{q.text}</span></span>
                      <ArrowRight size={16} className="text-slate-400" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </Card>
          <div className="rounded-2xl bg-[var(--dark)] p-5 text-white shadow-sm">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--a)]"><Smartphone size={14} /> Pensé pour le téléphone</p>
            <p className="mt-2 text-[15px] leading-relaxed text-white/85">Cet espace fonctionne aussi bien sur mobile : un prix change entre deux chantiers, un chantier se publie depuis la camionnette.</p>
            <p className="mt-3 text-sm text-white/60">{visibleServices}/{services} services en ligne · {realisations} réalisations publiées.</p>
            <Link href="/admin/services" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--a)] px-4 py-2 text-sm font-semibold text-[var(--a-ink)]"><Wrench size={15} /> Gérer les services</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
