import { prisma } from '@/lib/prisma'
import { requireSession } from '@/lib/auth'
import { Collection } from '@/components/admin/Collection'
import { PageHeader } from '@/components/admin/ui'

export const dynamic = 'force-dynamic'

export default async function EstimateurPage() {
  const { tenant } = await requireSession()
  const [types, options] = await Promise.all([
    prisma.estimateType.findMany({ where: { tenant }, orderBy: { order: 'asc' } }),
    prisma.estimateOption.findMany({ where: { tenant }, orderBy: { order: 'asc' } }),
  ])
  const typeOptions = types.map((t) => ({ value: t.id, label: t.label }))
  return (
    <div className="space-y-10">
      <PageHeader title="Estimateur de devis" description="Le simulateur de la page d’accueil : les familles de problèmes, leurs fourchettes de prix et les précisions proposées. Chaque montant modifié ici change instantanément les estimations affichées aux clients." />
      <Collection resource="estimate-types" rows={types} embedded />
      <Collection resource="estimate-options" rows={options} selectOptions={{ typeId: typeOptions }} embedded />
    </div>
  )
}
