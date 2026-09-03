'use client'

import { useEffect, useState } from 'react'
import { getStatus, type HoursMap, type Status } from '@/lib/hours'

/** Pastille ouvert/fermé calculée côté client (heure du visiteur), à partir des horaires de l'espace propriétaire. */
export function OpenStatus({ hours, suffix, className = '', light = false }: { hours: HoursMap; suffix?: string; className?: string; light?: boolean }) {
  const [s, setS] = useState<Status | null>(null)
  useEffect(() => {
    const tick = () => setS(getStatus(hours, new Date(), { closedSuffix: suffix }))
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [hours, suffix])
  if (!s) return <span className={`inline-block h-5 w-40 animate-pulse rounded-full ${light ? 'bg-white/10' : 'bg-line'} ${className}`} />
  return (
    <span className={`inline-flex items-center gap-2 text-sm font-medium ${light ? 'text-white/85' : 'text-navy'} ${className}`}>
      <span className="relative flex h-2.5 w-2.5">
        {s.open && <span className="absolute inline-flex h-full w-full animate-ring rounded-full bg-ok" />}
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${s.open ? 'bg-ok' : 'bg-amber'}`} />
      </span>
      {s.label}
    </span>
  )
}

export function NextSlot({ hours, className = '' }: { hours: HoursMap; className?: string }) {
  const [s, setS] = useState<Status | null>(null)
  useEffect(() => {
    setS(getStatus(hours))
  }, [hours])
  return <span className={className}>{s ? s.nextSlot : '…'}</span>
}
