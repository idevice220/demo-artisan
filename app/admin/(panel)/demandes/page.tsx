import { prisma } from '@/lib/prisma'
import { requireSession } from '@/lib/auth'
import { Inbox } from '@/components/admin/Inbox'

export const dynamic = 'force-dynamic'

export default async function DemandesPage() {
  const { tenant } = await requireSession()
  const leads = await prisma.lead.findMany({ where: { tenant }, orderBy: { createdAt: 'desc' } })
  return <Inbox leads={leads.map((l) => ({ ...l, createdAt: l.createdAt.toISOString() }))} />
}
