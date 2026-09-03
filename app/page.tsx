import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { getSiteData } from '@/lib/content'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { Estimateur } from '@/components/Estimateur'
import { Realisations } from '@/components/Realisations'
import { Zone } from '@/components/Zone'
import { Process } from '@/components/Process'
import { Tarifs } from '@/components/Tarifs'
import { Avis } from '@/components/Avis'
import { Faq } from '@/components/Faq'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { MobileBar } from '@/components/MobileBar'
import { DemoBadge } from '@/components/DemoBadge'

// Tout le contenu vient de la base (espace propriétaire) : rendu à chaque requête.
export const dynamic = 'force-dynamic'

export default async function Home() {
  const d = await getSiteData()
  const hasBefore = existsSync(join(process.cwd(), 'public', 'images', 'sdb-avant.jpg'))
  return (
    <>
      <Header site={d.site} />
      <main>
        <Hero site={d.site} communes={d.zones.map((z) => z.name)} />
        <Services services={d.services} />
        <Estimateur types={d.types} />
        <Realisations items={d.realisations} hasBefore={hasBefore} spotlight={d.site.spotlight} />
        <Zone zones={d.zones} site={d.site} />
        <Process steps={d.steps} />
        <Tarifs tarifs={d.tarifs} site={d.site} />
        <Avis reviews={d.reviews} site={d.site} />
        <Faq items={d.faq} />
        <Contact site={d.site} types={d.types} />
      </main>
      <Footer site={d.site} />
      <MobileBar site={d.site} />
      <DemoBadge />
    </>
  )
}
