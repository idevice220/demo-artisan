import type { Prisma, PrismaClient } from '@prisma/client'
import { DEFAULT_SETTINGS, SERVICES, ESTIMATE_TYPES, REALISATIONS, ZONES, REVIEWS, PROCESS, TARIFS, FAQ, LEADS } from './seed-data'

type Db = PrismaClient | Prisma.TransactionClient

/** Supprime toutes les données d'une ou plusieurs copies. */
export async function deleteTenants(db: Db, ids: string[]) {
  const w = { where: { tenant: { in: ids } } }
  await db.lead.deleteMany(w)
  await db.estimateOption.deleteMany(w)
  await db.estimateType.deleteMany(w)
  await db.service.deleteMany(w)
  await db.realisation.deleteMany(w)
  await db.zone.deleteMany(w)
  await db.review.deleteMany(w)
  await db.processStep.deleteMany(w)
  await db.tarif.deleteMany(w)
  await db.faqItem.deleteMany(w)
  await db.media.deleteMany(w)
  await db.setting.deleteMany(w)
  await db.tenant.deleteMany({ where: { id: { in: ids.filter((i) => i !== 'demo') } } })
}

/** Vide une copie et y réinjecte les données de démonstration. */
export async function seedTenant(db: Db, tenant: string) {
  const w = { where: { tenant } }
  await db.lead.deleteMany(w)
  await db.estimateOption.deleteMany(w)
  await db.estimateType.deleteMany(w)
  await db.service.deleteMany(w)
  await db.realisation.deleteMany(w)
  await db.zone.deleteMany(w)
  await db.review.deleteMany(w)
  await db.processStep.deleteMany(w)
  await db.tarif.deleteMany(w)
  await db.faqItem.deleteMany(w)
  await db.media.deleteMany(w)
  await db.setting.deleteMany(w)

  await db.setting.createMany({ data: Object.entries(DEFAULT_SETTINGS).map(([key, value]) => ({ tenant, key, value })) })
  await db.service.createMany({ data: SERVICES.map((s, order) => ({ ...s, order, tenant })) })
  for (const [order, t] of ESTIMATE_TYPES.entries()) {
    const { options, ...rest } = t
    await db.estimateType.create({ data: { ...rest, order, tenant, options: { create: options.map((o, i) => ({ ...o, order: i, tenant })) } } })
  }
  await db.realisation.createMany({ data: REALISATIONS.map((r, order) => ({ ...r, order, tenant })) })
  await db.zone.createMany({ data: ZONES.map((z, order) => ({ ...z, order, tenant })) })
  await db.review.createMany({ data: REVIEWS.map((r, order) => ({ ...r, order, tenant })) })
  await db.processStep.createMany({ data: PROCESS.map((p, order) => ({ ...p, order, tenant })) })
  await db.tarif.createMany({ data: TARIFS.map((t, order) => ({ ...t, order, tenant })) })
  await db.faqItem.createMany({ data: FAQ.map((f, order) => ({ ...f, order, tenant })) })
  await db.lead.createMany({ data: LEADS.map((l) => ({ ...l, tenant })) })
}
