import type { Metadata } from 'next'
import { Manrope, Inter } from 'next/font/google'
import './globals.css'

const display = Manrope({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})
const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Plomberie Martin — Plombier chauffagiste au Raincy (93)',
  description:
    'Dépannage, rénovation de salle de bain, chauffage. Devis gratuit, intervention rapide au Raincy et alentours. Site de démonstration NEX-WEB.',
  robots: { index: false, follow: false }, // démo : pas d'indexation
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
