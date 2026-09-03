'use client'

import { useEffect, useState } from 'react'
import { Phone, Menu, X, Zap, ArrowRight } from 'lucide-react'
import type { Site } from '@/lib/settings'
import { OpenStatus } from './Status'

const NAV = [
  { label: 'Services', href: '#services' },
  { label: 'Estimation', href: '#estimation' },
  { label: 'Réalisations', href: '#realisations' },
  { label: 'Zone', href: '#zone' },
  { label: 'Tarifs', href: '#tarifs' },
  { label: 'Avis', href: '#avis' },
]

export function Header({ site }: { site: Site }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  const initial = site.name.replace(/^plomberie\s+/i, '').charAt(0).toUpperCase() || 'M'

  return (
    <>
      {site.urgentBar.on && (
        <div className="bg-ink text-white">
          <div className="mx-auto flex h-9 max-w-6xl items-center justify-between gap-4 px-4 text-xs sm:text-[13px]">
            <span className="inline-flex items-center gap-2">
              <Zap size={14} className="text-amber" />
              <span className="hidden sm:inline">{site.urgentBar.text}</span>
              <span className="font-semibold">{site.urgentBar.strong}</span>
            </span>
            <OpenStatus hours={site.hours} suffix={site.hoursSuffix} light className="!text-xs" />
          </div>
        </div>
      )}

      <header className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur transition-all ${scrolled ? 'border-line shadow-card' : 'border-transparent'}`}>
        <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-4">
          <a href="#top" className="flex items-center gap-2.5" aria-label={`${site.name}, accueil`}>
            <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-navy text-white">
              <span className="absolute -left-2 bottom-1 h-3 w-16 rotate-[-25deg] bg-amber" />
              <span className="relative font-display text-xl font-extrabold">{initial}</span>
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[22px] font-extrabold uppercase tracking-wide text-navy">{site.name}</span>
              <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-steel">{site.tagline}</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-[15px] font-medium text-navy/80 transition-colors hover:text-navy">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={site.tel} className="hidden items-center gap-2 rounded-full bg-amber px-4 py-2.5 font-display text-lg font-bold uppercase tracking-wide text-ink shadow-amber transition-transform hover:-translate-y-0.5 sm:inline-flex">
              <Phone size={18} strokeWidth={2.5} /> {site.phone}
            </a>
            <button onClick={() => setOpen((v) => !v)} className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-white lg:hidden" aria-label="Menu" aria-expanded={open}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-line bg-white lg:hidden">
            <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-line py-3.5 font-display text-xl font-bold uppercase tracking-wide text-navy">
                  {n.label} <ArrowRight size={18} className="text-amber" />
                </a>
              ))}
              <a href={site.tel} className="mt-3 mb-2 inline-flex items-center justify-center gap-2 rounded-full bg-amber px-4 py-3 font-display text-lg font-bold uppercase text-ink">
                <Phone size={18} /> {site.phone}
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
