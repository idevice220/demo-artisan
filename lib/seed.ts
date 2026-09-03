import type { Prisma, PrismaClient } from '@prisma/client'
import { DEFAULT_SETTINGS, SERVICES, ESTIMATE_TYPES, REALISATIONS, ZONES, REVIEWS, PROCESS, TARIFS, FAQ, LEADS } from './seed-data'

type Db = PrismaClient | Prisma.TransactionClient

/** Vide toutes les tables et réinjecte les données de démonstration. */
export async function seedAll(db: Db) {
  await db.lead.deleteMany()
  await db.estimateOption.deleteMany()
  await db.estimateType.deleteMany()
  await db.service.deleteMany()
  await db.realisation.deleteMany()
  await db.zone.deleteMany()
  await db.review.deleteMany()
  await db.processStep.deleteMany()
  await db.tarif.deleteMany()
  await db.faqItem.deleteMany()
  await db.media.deleteMany()
  await db.setting.deleteMany()

  await db.setting.createMany({ data: Object.entries(DEFAULT_SETTINGS).map(([key, value]) => ({ key, value })) })
  await db.service.createMany({ data: SERVICES.map((s, order) => ({ ...s, order })) })
  for (const [order, t] of ESTIMATE_TYPES.entries()) {
    const { options, ...rest } = t
    await db.estimateType.create({ data: { ...rest, order, options: { create: options.map((o, i) => ({ ...o, order: i })) } } })
  }
  await db.realisation.createMany({ data: REALISATIONS.map((r, order) => ({ ...r, order })) })
  await db.zone.createMany({ data: ZONES.map((z, order) => ({ ...z, order })) })
  await db.review.createMany({ data: REVIEWS.map((r, order) => ({ ...r, order })) })
  await db.processStep.createMany({ data: PROCESS.map((p, order) => ({ ...p, order })) })
  await db.tarif.createMany({ data: TARIFS.map((t, order) => ({ ...t, order })) })
  await db.faqItem.createMany({ data: FAQ.map((f, order) => ({ ...f, order })) })
  await db.lead.createMany({ data: LEADS })
  await db.meta.upsert({ where: { id: 1 }, update: { lastReset: new Date() }, create: { id: 1, lastReset: new Date() } })
}
