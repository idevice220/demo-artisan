import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Service } from '@prisma/client'
import { SectionHeading } from './Section'
import { Reveal } from './Reveal'
import { ServiceIcon } from './Icons'

export function Services({ services }: { services: Service[] }) {
  const big = services.filter((s) => s.big && s.image)
  const small = services.filter((s) => !(s.big && s.image))
  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow="Ce que je fais" title={<>Du petit dépannage à la salle de bain <span className="text-amber-deep">clé en main.</span></>} subtitle="Un seul artisan, un seul numéro, un seul devis. Les prix indiqués sont des prix de départ réels, déplacement compris." />

        {big.length > 0 && (
          <div className="grid gap-5 lg:grid-cols-2">
            {big.map((s, i) => (
              <Reveal key={s.id} delay={i * 80}>
                <a href="#estimation" className="group relative block overflow-hidden rounded-3xl bg-navy text-white shadow-card">
                  <div className="relative aspect-[16/10]">
                    <Image src={s.image!} alt={s.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <span className="inline-grid h-11 w-11 place-items-center rounded-xl bg-amber text-ink">
                      <ServiceIcon name={s.icon} size={22} strokeWidth={2.2} />
                    </span>
                    <h3 className="mt-4 font-display text-3xl font-extrabold uppercase leading-none sm:text-4xl">{s.title}</h3>
                    <p className="mt-2 max-w-md text-white/80">{s.text}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-amber">{s.from}</span>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold transition-transform group-hover:translate-x-1">
                        Estimer <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        )}

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {small.map((s, i) => (
            <Reveal key={s.id} delay={i * 70}>
              <a href="#estimation" className="group flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-amber">
                <span className="inline-grid h-11 w-11 place-items-center rounded-xl bg-mist text-navy transition-colors group-hover:bg-amber group-hover:text-ink">
                  <ServiceIcon name={s.icon} size={22} strokeWidth={2.2} />
                </span>
                <h3 className="mt-4 font-display text-2xl font-extrabold uppercase leading-none text-navy">{s.title}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink/70">{s.text}</p>
                <p className="mt-4 flex items-center justify-between text-sm font-bold text-navy">
                  {s.from}
                  <ArrowRight size={16} className="text-amber-deep transition-transform group-hover:translate-x-1" />
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
