import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ensureFresh, RESET_MINUTES } from '@/lib/demo'
import { AdminShell, type NavItem } from '@/components/admin/AdminShell'

export const dynamic = 'force-dynamic'

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect('/admin/login')
  const { lastReset } = await ensureFresh()
  const newLeads = await prisma.lead.count({ where: { status: 'new' } })

  const nav: NavItem[] = [
    { href: '/admin', label: 'Tableau de bord', icon: 'LayoutDashboard', exact: true },
    { href: '/admin/demandes', label: 'Demandes', icon: 'Inbox', count: newLeads },
    { href: '/admin/services', label: 'Services', icon: 'Wrench', section: 'Contenu' },
    { href: '/admin/estimateur', label: 'Estimateur de devis', icon: 'Calculator', section: 'Contenu' },
    { href: '/admin/realisations', label: 'Réalisations', icon: 'Images', section: 'Contenu' },
    { href: '/admin/tarifs', label: 'Grille tarifaire', icon: 'Receipt', section: 'Contenu' },
    { href: '/admin/avis', label: 'Avis clients', icon: 'Star', section: 'Contenu' },
    { href: '/admin/zone', label: 'Zone d’intervention', icon: 'MapPin', section: 'Contenu' },
    { href: '/admin/etapes', label: 'Comment ça se passe', icon: 'ListOrdered', section: 'Contenu' },
    { href: '/admin/faq', label: 'Questions fréquentes', icon: 'HelpCircle', section: 'Contenu' },
    { href: '/admin/horaires', label: 'Horaires', icon: 'Clock', section: 'Entreprise' },
    { href: '/admin/photos', label: 'Photos', icon: 'Image', section: 'Entreprise' },
    { href: '/admin/reglages', label: 'Réglages & textes', icon: 'Settings', section: 'Entreprise' },
  ]
  const resetAt = new Date(lastReset.getTime() + RESET_MINUTES * 60_000).toISOString()

  return (
    <AdminShell brand={{ name: 'Plomberie Martin', sub: 'Espace propriétaire', initial: 'M' }} nav={nav} email={session.email} resetAt={resetAt}>
      {children}
    </AdminShell>
  )
}
