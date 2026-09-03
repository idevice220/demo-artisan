'use client'

import Image from 'next/image'
import { useState } from 'react'
import { MoveHorizontal } from 'lucide-react'

/**
 * Comparateur avant/après : un curseur révèle la photo « avant ».
 * Si aucune photo « avant » n'est fournie, on simule un état dégradé avec des filtres CSS.
 */
export function AvantApres({ before, after, title, place }: { before?: string; after: string; title: string; place: string }) {
  const [pos, setPos] = useState(55)
  return (
    <figure className="relative select-none overflow-hidden rounded-3xl border border-line bg-ink shadow-card">
      <div className="relative aspect-[16/10]">
        <Image src={after} alt={`${title} — après`} fill sizes="(max-width: 1024px) 100vw, 620px" className="object-cover" draggable={false} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={before ?? after} alt={`${title} — avant`} fill sizes="(max-width: 1024px) 100vw, 620px" className={`object-cover ${before ? '' : 'brightness-[.75] contrast-[.85] saturate-[.35] sepia-[.35]'}`} draggable={false} />
        </div>
        {/* ligne + poignée */}
        <div className="pointer-events-none absolute inset-y-0 w-[3px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,.2)]" style={{ left: `calc(${pos}% - 1.5px)` }}>
          <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-amber text-ink shadow-lift">
            <MoveHorizontal size={20} strokeWidth={2.5} />
          </span>
        </div>
        <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label="Comparer avant et après" className="ba absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur">Avant</span>
        <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-amber px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">Après</span>
      </div>
      <figcaption className="flex items-center justify-between gap-4 bg-white px-5 py-3 text-sm">
        <span className="font-semibold text-navy">{title}</span>
        <span className="text-ink/60">{place}</span>
      </figcaption>
    </figure>
  )
}
