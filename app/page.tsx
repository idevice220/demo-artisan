import { existsSync } from 'node:fs'
import { join } from 'node:path'
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

export default function Home() {
  // la photo « avant » est optionnelle : sans elle, le comparateur simule l'état d'origine
  const hasBefore = existsSync(join(process.cwd(), 'public', 'images', 'sdb-avant.jpg'))
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Estimateur />
        <Realisations hasBefore={hasBefore} />
        <Zone />
        <Process />
        <Tarifs />
        <Avis />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileBar />
      <DemoBadge />
    </>
  )
}
