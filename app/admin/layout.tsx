import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Espace propriétaire — Plomberie Martin (démo)',
  robots: { index: false, follow: false },
}

/** Couleurs de l'espace propriétaire : accent ambre sur fond bleu nuit (charte du site). */
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin min-h-screen" style={{ ['--a' as string]: '#FFB020', ['--a-hover' as string]: '#F0A000', ['--a-ink' as string]: '#0B1220', ['--a-deep' as string]: '#A66400', ['--dark' as string]: '#10284A' }}>
      {children}
    </div>
  )
}
