import type { ProcessStep } from '@prisma/client'
import { SectionHeading } from './Section'
import { Reveal } from './Reveal'

export function Process({ steps }: { steps: ProcessStep[] }) {
  return (
    <section id="methode" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow="Comment ça se passe" title={<>Simple, rapide, <span className="text-amber-deep">sans surprise.</span></>} subtitle="De votre appel à la facture, vous savez toujours où on en est et combien ça coûte." />
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((p, i) => (
            <Reveal key={p.id} delay={i * 90} as="li">
              <div className="relative h-full rounded-3xl border border-line bg-paper p-6">
                <span className="font-display text-6xl font-extrabold leading-none text-amber">{p.n}</span>
                <h3 className="mt-3 font-display text-2xl font-extrabold uppercase text-navy">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{p.text}</p>
                <span className="mt-4 inline-block rounded-full bg-navy px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber">{p.time}</span>
                {i < steps.length - 1 && <span className="absolute -right-5 top-10 hidden h-[3px] w-5 bg-line lg:block" aria-hidden />}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
