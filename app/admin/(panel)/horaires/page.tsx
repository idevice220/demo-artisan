import { getSettings, toSite } from '@/lib/settings'
import { requireSession } from '@/lib/auth'
import { HoursEditor } from '@/components/admin/HoursEditor'
import { PageHeader } from '@/components/admin/ui'

export const dynamic = 'force-dynamic'

export default async function HorairesPage() {
  const { tenant } = await requireSession()
  const site = toSite(await getSettings(tenant))
  return (
    <div>
      <PageHeader title="Horaires" description="Le site affiche « Ouvert » ou « Fermé » en temps réel et propose le prochain créneau d’intervention à partir de ces horaires." />
      <HoursEditor initial={site.hoursConfig} suffix={site.hoursSuffix} />
    </div>
  )
}
