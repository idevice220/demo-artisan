import { prisma } from './prisma'
import { ensureFresh } from './demo'
import { getSettings, toSite } from './settings'

/** Types « publics » (sérialisables) consommés par les composants. */
export type EstimateOptionT = { id: number; label: string; addMin: number; addMax: number; note: string | null }
export type EstimateTypeT = { id: number; label: string; icon: string; baseMin: number; baseMax: number; delay: string; includes: string[]; surface: boolean; options: EstimateOptionT[] }

/** Toutes les données de la page d'accueil, lues en base (après vérification de fraîcheur de la démo). */
export async function getSiteData() {
  await ensureFresh()
  const [settings, services, types, realisations, zones, reviews, steps, tarifs, faq] = await Promise.all([
    getSettings(),
    prisma.service.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }),
    prisma.estimateType.findMany({ where: { visible: true }, orderBy: { order: 'asc' }, include: { options: { where: { visible: true }, orderBy: { order: 'asc' } } } }),
    prisma.realisation.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }),
    prisma.zone.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }),
    prisma.review.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }),
    prisma.processStep.findMany({ orderBy: { order: 'asc' } }),
    prisma.tarif.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }),
    prisma.faqItem.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }),
  ])
  return {
    site: toSite(settings),
    services,
    types: types.filter((t) => t.options.length > 0) as EstimateTypeT[],
    realisations,
    zones,
    reviews,
    steps,
    tarifs,
    faq,
  }
}
