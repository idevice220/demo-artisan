import type { Metadata, Viewport } from 'next'
import { Barlow_Condensed, Barlow } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const display = Barlow_Condensed({ weight: ['600', '700', '800'], subsets: ['latin'], variable: '--font-display', display: 'swap' })
const sans = Barlow({ weight: ['400', '500', '600', '700'], subsets: ['latin'], variable: '--font-sans', display: 'swap' })

export const metadata: Metadata = {
  title: 'Plomberie Martin — Plombier chauffagiste au Raincy (93) · Dépannage en 45 min',
  description:
    'Fuite, débouchage, chauffe-eau, chaudière, salle de bain clé en main. Devis ferme avant intervention, prix affichés, intervention rapide dans tout l’Est parisien. Site de démonstration NEX-WEB.',
  metadataBase: new URL('https://demo-artisan.nex-web.fr'),
  openGraph: {
    title: 'Plomberie Martin — Plombier chauffagiste au Raincy (93)',
    description: 'Dépannage en 45 min, devis ferme, prix affichés. Fuite, chauffage, salle de bain. Site de démonstration NEX-WEB.',
    type: 'website',
    locale: 'fr_FR',
    url: 'https://demo-artisan.nex-web.fr',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: false, follow: false }, // démo : pas d'indexation
}

export const viewport: Viewport = { themeColor: '#10284A' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: { background: '#0B1220', color: '#fff', border: '1px solid #1B3A66', borderRadius: 12, fontSize: 14, maxWidth: 420 },
            success: { iconTheme: { primary: '#FFB020', secondary: '#0B1220' } },
          }}
        />
      </body>
    </html>
  )
}
