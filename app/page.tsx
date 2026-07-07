import Image from 'next/image'
import {
  Phone,
  Wrench,
  ShowerHead,
  Flame,
  BadgeCheck,
  Clock,
  MapPin,
  Star,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react'

// ─── Données de la démo (fictives) ───────────────────────────
const PHONE = '01 23 45 67 89'
const TEL = 'tel:0123456789'

const SERVICES = [
  {
    title: 'Dépannage plomberie',
    text: 'Fuite, canalisation bouchée, robinetterie… Intervention rapide et réparation durable.',
    image: '/images/plomberie.jpg',
    icon: Wrench,
  },
  {
    title: 'Salle de bain clé en main',
    text: 'Rénovation complète : douche à l’italienne, carrelage, meubles. Un seul interlocuteur.',
    image: '/images/salle-de-bain.jpg',
    icon: ShowerHead,
  },
  {
    title: 'Chauffage & sanitaire',
    text: 'Installation et entretien de chauffe-eau, chaudières et radiateurs toutes marques.',
    image: '/images/sanitaire.jpg',
    icon: Flame,
  },
]

const ZONES = [
  'Le Raincy',
  'Villemomble',
  'Gagny',
  'Clichy-sous-Bois',
  'Montfermeil',
  'Livry-Gargan',
  'Les Pavillons-sous-Bois',
  'Bondy',
]

const AVIS = [
  {
    name: 'Marie D.',
    text: 'Fuite réparée le jour même, tarif annoncé respecté. Travail propre et soigné.',
  },
  {
    name: 'Karim B.',
    text: 'Salle de bain entièrement refaite en 10 jours. Résultat magnifique, je recommande.',
  },
  {
    name: 'Sophie L.',
    text: 'Ponctuel, souriant et de très bon conseil. Enfin un artisan de confiance !',
  },
]

const POINTS = [
  { icon: BadgeCheck, label: 'Devis gratuit sous 24h' },
  { icon: Clock, label: 'Intervention rapide' },
  { icon: ShieldCheck, label: 'Garantie décennale' },
]

export default function Home() {
  return (
    <>
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <a href="#" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy text-white">
              <Wrench size={18} />
            </span>
            <span className="font-display text-lg font-extrabold text-navy">
              Plomberie <span className="text-blue">Martin</span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#services" className="hover:text-navy">Services</a>
            <a href="#zone" className="hover:text-navy">Zone d’intervention</a>
            <a href="#avis" className="hover:text-navy">Avis</a>
          </nav>
          <a
            href={TEL}
            className="inline-flex items-center gap-2 rounded-full bg-amber px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-amberdark"
          >
            <Phone size={16} /> {PHONE}
          </a>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-navy">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber">
                Plombier chauffagiste · Le Raincy (93)
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                Un artisan de confiance,
                <br />
                <span className="text-amber">disponible rapidement.</span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-slate-300">
                Dépannage, rénovation de salle de bain et chauffage. Devis
                gratuit, prix annoncé = prix payé.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={TEL}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-amber px-6 py-3.5 font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
                >
                  <Phone size={18} /> Appeler maintenant
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-6 py-3.5 font-bold text-white transition-colors hover:bg-white/10"
                >
                  Voir les services <ArrowRight size={18} />
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
                {POINTS.map((p) => (
                  <span
                    key={p.label}
                    className="inline-flex items-center gap-2 text-sm text-slate-300"
                  >
                    <p.icon size={16} className="text-amber" /> {p.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/images/hero.jpg"
                  alt="Artisan au travail"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-white px-4 py-3 shadow-lg">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} className="fill-amber text-amber" />
                  ))}
                </div>
                <p className="mt-0.5 text-xs font-semibold text-slate-600">
                  4,9/5 — 87 avis clients
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section id="services" className="mx-auto max-w-6xl px-4 py-20">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
              Nos services
            </h2>
            <p className="mt-2 text-slate-500">
              Du petit dépannage à la rénovation complète.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3 inline-grid h-10 w-10 place-items-center rounded-lg bg-blue/10 text-blue">
                    <s.icon size={20} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-navy">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {s.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Zone d'intervention ── */}
        <section id="zone" className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
              Zone d’intervention
            </h2>
            <p className="mt-2 text-slate-500">
              Basé au Raincy, j’interviens dans tout l’Est parisien.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {ZONES.map((z) => (
                <span
                  key={z}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-paper px-4 py-2 text-sm font-medium text-slate-700"
                >
                  <MapPin size={14} className="text-blue" /> {z}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm text-slate-400">
              Votre commune n’est pas listée ? Appelez-moi, on trouve une
              solution.
            </p>
          </div>
        </section>

        {/* ── Avis ── */}
        <section id="avis" className="mx-auto max-w-6xl px-4 py-20">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
              Ils me font confiance
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {AVIS.map((a) => (
              <div
                key={a.name}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} className="fill-amber text-amber" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  « {a.text} »
                </p>
                <p className="mt-4 font-display text-sm font-bold text-navy">
                  {a.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA final ── */}
        <section className="bg-navy py-16">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
              Un projet ? Une urgence ?
            </h2>
            <p className="mt-3 text-slate-300">
              Devis gratuit et sans engagement. Réponse sous 24h.
            </p>
            <a
              href={TEL}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-amber px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              <Phone size={20} /> {PHONE}
            </a>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 text-sm text-slate-500 sm:flex-row">
          <span>
            © {new Date().getFullYear()} Plomberie Martin — Le Raincy (93)
          </span>
          <a
            href="https://nex-web.fr"
            className="font-medium text-blue hover:underline"
          >
            Site de démonstration — créé par NEX-WEB
          </a>
        </div>
      </footer>
    </>
  )
}
