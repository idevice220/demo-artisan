import { HOURS } from './data'

const DAYS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']

function fmt(h: number) {
  const hh = Math.floor(h)
  const mm = Math.round((h - hh) * 60)
  return `${hh}h${mm ? String(mm).padStart(2, '0') : ''}`
}

export type Status = { open: boolean; label: string; nextSlot: string; slotDay: 'today' | 'tomorrow' | 'later' }

/** Statut ouvert/fermé + prochain créneau d'intervention possible (90 min de battement, arrondi à la demi-heure). */
export function getStatus(now = new Date()): Status {
  const day = now.getDay()
  const h = now.getHours() + now.getMinutes() / 60
  const today = HOURS[day]
  const open = !!today && h >= today.open && h < today.close

  // prochain créneau : au plus tôt dans 90 min, arrondi à la demi-heure sup., dans les horaires
  let slotDay: Status['slotDay'] = 'today'
  let slotH = Math.ceil((h + 1.5) * 2) / 2
  let d = day
  let guard = 0
  while (guard++ < 8) {
    const hours = HOURS[d]
    if (hours) {
      if (slotH < hours.open) slotH = hours.open
      if (slotH <= hours.close - 1) break
    }
    d = (d + 1) % 7
    slotH = 0
    slotDay = slotDay === 'today' ? 'tomorrow' : 'later'
  }
  const when = slotDay === 'today' ? 'aujourd’hui' : slotDay === 'tomorrow' ? 'demain' : DAYS[d]
  const nextSlot = `${when} à ${fmt(slotH)}`

  let label: string
  if (open && today) label = `Ouvert · ferme à ${fmt(today.close)}`
  else if (today && h < today.open) label = `Ouvre à ${fmt(today.open)} · urgences 24h/24`
  else {
    // prochain jour ouvert
    let nd = (day + 1) % 7
    let g = 0
    while (!HOURS[nd] && g++ < 7) nd = (nd + 1) % 7
    const next = HOURS[nd]
    label = `Fermé · ouvre ${nd === (day + 1) % 7 ? 'demain' : DAYS[nd]} à ${fmt(next ? next.open : 8)} · urgences 24h/24`
  }
  return { open, label, nextSlot, slotDay }
}
