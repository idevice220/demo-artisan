import { Phone, MessageCircle, Calculator } from 'lucide-react'
import type { Site } from '@/lib/settings'

/** Barre d'action fixe sur mobile : appeler, WhatsApp, estimer. */
export function MobileBar({ site }: { site: Site }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      <div className="grid grid-cols-3 gap-2 p-2">
        <a href={site.tel} className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-amber py-2 font-display text-sm font-bold uppercase text-ink">
          <Phone size={18} strokeWidth={2.5} /> Appeler
        </a>
        <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-ok py-2 font-display text-sm font-bold uppercase text-white">
          <MessageCircle size={18} strokeWidth={2.5} /> WhatsApp
        </a>
        <a href="#estimation" className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-navy py-2 font-display text-sm font-bold uppercase text-white">
          <Calculator size={18} strokeWidth={2.5} /> Devis
        </a>
      </div>
    </div>
  )
}
