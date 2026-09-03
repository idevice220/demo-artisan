import { prisma } from './prisma'
import { DEFAULT_SETTINGS, DEFAULT_HOURS } from './seed-data'
import { parseHoursConfig, toMap, hoursRows, type HoursConfigRow, type HoursMap, type HoursRow } from './hours'

export type SettingsMap = Record<string, string>

export async function getSettings(tenant: string): Promise<SettingsMap> {
  const rows = await prisma.setting.findMany({ where: { tenant } })
  const map: SettingsMap = { ...DEFAULT_SETTINGS }
  for (const r of rows) map[r.key] = r.value
  return map
}

/** Réglages typés, prêts pour les composants. */
export type Site = {
  name: string
  owner: string
  tagline: string
  phone: string
  tel: string
  whatsapp: string
  email: string
  address: string
  rating: number
  reviewsCount: number
  ratingSplit: number[]
  years: number
  interventions: number
  avgDelay: number
  urgentBar: { on: boolean; text: string; strong: string }
  hero: { eyebrow: string; title: string; title2: string; accent: string; text: string; image: string; points: string[] }
  spotlight: { title: string; text: string; surface: string; days: string; budget: string; after: string; caption: string; place: string }
  tarifs: { title: string; points: string[] }
  footerText: string
  hoursConfig: HoursConfigRow[]
  hours: HoursMap
  hoursRows: HoursRow[]
  hoursSuffix: string
}

const lines = (s: string) => s.split('\n').map((l) => l.trim()).filter(Boolean)
const telHref = (phone: string) => 'tel:+33' + phone.replace(/\D/g, '').replace(/^0/, '')
const waHref = (num: string) => `https://wa.me/33${num.replace(/\D/g, '').replace(/^0/, '')}?text=${encodeURIComponent('Bonjour, j’ai un problème de plomberie')}`

export function toSite(s: SettingsMap): Site {
  const hoursConfig = parseHoursConfig(s.hours, DEFAULT_HOURS)
  return {
    name: s.name,
    owner: s.owner,
    tagline: s.tagline,
    phone: s.phone,
    tel: telHref(s.phone),
    whatsapp: waHref(s.whatsapp || s.phone),
    email: s.email,
    address: s.address,
    rating: Number(s.rating.replace(',', '.')) || 5,
    reviewsCount: Number(s.reviews_count) || 0,
    ratingSplit: s.rating_split.split(',').map((n) => Number(n.trim()) || 0),
    years: Number(s.years) || 0,
    interventions: Number(s.interventions) || 0,
    avgDelay: Number(s.avg_delay) || 0,
    urgentBar: { on: s.urgent_bar_on !== 'false', text: s.urgent_bar, strong: s.urgent_bar_strong },
    hero: { eyebrow: s.hero_eyebrow, title: s.hero_title, title2: s.hero_title_2, accent: s.hero_accent, text: s.hero_text, image: s.hero_image || '/images/hero.jpg', points: lines(s.hero_points) },
    spotlight: { title: s.spotlight_title, text: s.spotlight_text, surface: s.spotlight_surface, days: s.spotlight_days, budget: s.spotlight_budget, after: s.spotlight_after || '/images/sdb-apres.jpg', caption: s.spotlight_caption, place: s.spotlight_place },
    tarifs: { title: s.tarifs_title, points: lines(s.tarifs_points) },
    footerText: s.footer_text,
    hoursConfig,
    hours: toMap(hoursConfig),
    hoursRows: hoursRows(hoursConfig),
    hoursSuffix: s.hours_suffix,
  }
}
