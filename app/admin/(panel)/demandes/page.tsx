import { prisma } from '@/lib/prisma'
import { Inbox } from '@/components/admin/Inbox'

export const dynamic = 'force-dynamic'

export default async function DemandesPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } })
  return <Inbox leads={leads.map((l) => ({ ...l, createdAt: l.createdAt.toISOString() }))} />
}
