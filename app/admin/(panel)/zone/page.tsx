import { prisma } from '@/lib/prisma'
import { Collection } from '@/components/admin/Collection'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const rows = await prisma.zone.findMany({ orderBy: { order: 'asc' } })
  return <Collection resource="zones" rows={rows} />
}
