import Link from 'next/link'
import { Suspense } from 'react'
import { ArrowLeft, KeyRound, ShieldCheck, RotateCcw } from 'lucide-react'
import { DEMO_EMAIL, DEMO_PASSWORD } from '@/lib/auth'
import { LoginForm } from '@/components/admin/LoginForm'

export const dynamic = 'force-dynamic'

export default function LoginPage({ searchParams }: { searchParams: { expired?: string } }) {
  return (
    <div className="blueprint relative min-h-screen bg-navy px-4 py-10 text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 to-navy" aria-hidden />
      <div className="relative mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_440px] lg:items-center lg:py-16">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"><ArrowLeft size={16} /> Retour au site</Link>
          <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-amber"><span className="h-1.5 w-1.5 rounded-full bg-amber" /> Démonstration NEX-WEB</p>
          <h1 className="mt-5 font-display text-5xl font-extrabold uppercase leading-[0.95] sm:text-6xl">
            L’espace <span className="text-amber">propriétaire</span> de Plomberie Martin.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/80">C’est l’envers du site : le plombier y change ses tarifs, ses horaires, ses photos et lit les demandes de ses clients, depuis son téléphone. Entrez, touchez à tout.</p>
          <ul className="mt-6 space-y-2.5 text-sm text-white/80">
            <li className="flex items-start gap-2.5"><KeyRound size={17} className="mt-0.5 shrink-0 text-amber" /> Accès libre : les identifiants sont déjà remplis.</li>
            <li className="flex items-start gap-2.5"><ShieldCheck size={17} className="mt-0.5 shrink-0 text-amber" /> Vous travaillez sur votre propre copie : vos modifications ne sont visibles que par vous, immédiatement, sur le site.</li>
            <li className="flex items-start gap-2.5"><RotateCcw size={17} className="mt-0.5 shrink-0 text-amber" /> Votre copie s’efface après 24 h sans activité ; la version d’origine, elle, ne bouge jamais.</li>
          </ul>
        </div>

        <div className="rounded-3xl bg-white p-7 text-ink shadow-lift sm:p-8" style={{ ['--a' as string]: '#FFB020', ['--a-hover' as string]: '#F0A000', ['--a-ink' as string]: '#0B1220' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-steel">Connexion</p>
          <h2 className="mt-1 font-display text-3xl font-extrabold uppercase text-navy">Plomberie Martin</h2>
          {searchParams?.expired && <p className="mt-4 rounded-xl bg-amber-tint px-4 py-3 text-sm text-ink">Votre copie de démonstration a expiré. Entrez de nouveau : une copie neuve sera créée.</p>}
          <div className="mt-5">
            <Suspense>
              <LoginForm demoEmail={DEMO_EMAIL} demoPassword={DEMO_PASSWORD} />
            </Suspense>
          </div>
          <div className="mt-5 rounded-xl bg-paper p-4 text-sm text-ink/70">
            <p className="font-semibold text-navy">Identifiants de démonstration</p>
            <p className="mt-1 font-mono text-[13px]">{DEMO_EMAIL}<br />mot de passe : {DEMO_PASSWORD}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
