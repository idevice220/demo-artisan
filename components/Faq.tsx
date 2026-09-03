'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import type { FaqItem } from '@prisma/client'
import { SectionHeading } from './Section'
import { Reveal } from './Reveal'

export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading eyebrow="Questions fréquentes" title={<>On me demande <span className="text-amber-deep">souvent…</span></>} subtitle="Et si votre question n’est pas là, appelez : je réponds en direct." />
        <Reveal className="space-y-3">
          {items.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.id} className={`overflow-hidden rounded-2xl border transition-colors ${isOpen ? 'border-amber bg-amber-tint/40' : 'border-line bg-paper'}`}>
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                  <span className="font-display text-xl font-bold text-navy">{f.q}</span>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all ${isOpen ? 'rotate-45 border-amber bg-amber text-ink' : 'border-line bg-white text-navy'}`}>
                    <Plus size={18} strokeWidth={2.5} />
                  </span>
                </button>
                <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 leading-relaxed text-ink/75">{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
