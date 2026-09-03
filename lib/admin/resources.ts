/**
 * Registre des collections éditables : nom d'URL → modèle Prisma + validation.
 * (Côté serveur uniquement : utilisé par les routes /api/admin/[resource].)
 */
import { z } from 'zod'

const bool = z.boolean().optional()
const int = z.coerce.number().int()
const str = z.string().trim()
const opt = z.string().trim().optional().nullable().transform((v) => (v ? v : null))

export const RESOURCES = {
  services: {
    model: 'service', orderable: true,
    schema: z.object({ icon: str.min(1), title: str.min(1), from: str.min(1), text: str.min(1), image: opt, big: bool, visible: bool }),
  },
  'estimate-types': {
    model: 'estimateType', orderable: true,
    schema: z.object({ label: str.min(1), icon: str.min(1), baseMin: int, baseMax: int, delay: str.min(1), includes: z.array(str).optional(), surface: bool, visible: bool }),
  },
  'estimate-options': {
    model: 'estimateOption', orderable: true,
    schema: z.object({ typeId: int.positive(), label: str.min(1), addMin: int, addMax: int, note: opt, visible: bool }),
  },
  realisations: {
    model: 'realisation', orderable: true,
    schema: z.object({ title: str.min(1), place: str.min(1), cat: str.min(1), duration: str.min(1), image: str.min(1, 'Une photo est nécessaire'), visible: bool }),
  },
  zones: {
    model: 'zone', orderable: true,
    schema: z.object({ name: str.min(1), x: z.coerce.number(), y: z.coerce.number(), min: int.positive(), visible: bool }),
  },
  reviews: {
    model: 'review', orderable: true,
    schema: z.object({ name: str.min(1), place: str.min(1), date: str.min(1), text: str.min(1), tag: str.min(1), rating: int.min(1).max(5).optional(), visible: bool }),
  },
  'process-steps': {
    model: 'processStep', orderable: true,
    schema: z.object({ n: str.min(1), title: str.min(1), text: str.min(1), time: str.min(1) }),
  },
  tarifs: {
    model: 'tarif', orderable: true,
    schema: z.object({ label: str.min(1), price: str.min(1), note: str, visible: bool }),
  },
  faq: {
    model: 'faqItem', orderable: true,
    schema: z.object({ q: str.min(1), a: str.min(1), visible: bool }),
  },
  leads: {
    model: 'lead', orderable: false,
    // seule l'issue de la demande est modifiable depuis l'espace propriétaire
    schema: z.object({ status: z.enum(['new', 'done']) }),
  },
} as const

export type ResourceName = keyof typeof RESOURCES
export function getResource(name: string) {
  return (RESOURCES as Record<string, (typeof RESOURCES)[ResourceName] | undefined>)[name]
}
