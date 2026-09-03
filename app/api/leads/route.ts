import { NextResponse } from 'next/server'
import { z } from 'zod'
import sharp from 'sharp'
import { prisma } from '@/lib/prisma'
import { getOrCreateTenant, QUOTA } from '@/lib/demo'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const schema = z.object({
  kind: z.enum(['contact', 'estimation']),
  name: z.string().trim().min(1).max(80),
  phone: z.string().trim().min(6).max(30),
  city: z.string().trim().max(80).optional(),
  type: z.string().trim().max(80).optional(),
  message: z.string().trim().max(2000).optional(),
  slot: z.string().trim().max(40).optional(),
  estimateMin: z.coerce.number().int().optional(),
  estimateMax: z.coerce.number().int().optional(),
})

/** Réception d'une demande depuis le site : elle arrive dans la copie du visiteur (créée au besoin). */
export async function POST(req: Request) {
  let raw: Record<string, unknown> = {}
  let photo: File | null = null
  if (req.headers.get('content-type')?.includes('multipart/form-data')) {
    const fd = await req.formData()
    fd.forEach((v, k) => { if (typeof v === 'string') raw[k] = v })
    const f = fd.get('photo')
    if (f instanceof File && f.size > 0) photo = f
  } else {
    raw = (await req.json().catch(() => ({}))) as Record<string, unknown>
  }
  const parsed = schema.safeParse(raw)
  if (!parsed.success) return NextResponse.json({ error: 'Vérifiez le formulaire' }, { status: 400 })

  const res = NextResponse.json({ ok: true }, { status: 201 })
  const tenant = await getOrCreateTenant(res)
  if ((await prisma.lead.count({ where: { tenant } })) >= QUOTA.inbox) return NextResponse.json({ error: 'Limite de demandes atteinte pour cette démo' }, { status: 429 })

  let photoId: string | null = null
  if (photo && photo.size <= 8 * 1024 * 1024 && photo.type.startsWith('image/') && (await prisma.media.count({ where: { tenant } })) < QUOTA.media) {
    try {
      const out = await sharp(Buffer.from(await photo.arrayBuffer())).rotate().resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toBuffer({ resolveWithObject: true })
      const m = await prisma.media.create({ data: { tenant, name: `demande-${Date.now()}`, mime: 'image/webp', size: out.info.size, width: out.info.width, height: out.info.height, data: out.data } })
      photoId = m.id
    } catch {}
  }
  const d = parsed.data
  await prisma.lead.create({ data: { tenant, kind: d.kind, name: d.name, phone: d.phone, city: d.city || null, type: d.type || null, message: d.message || null, slot: d.slot || null, estimateMin: d.estimateMin ?? null, estimateMax: d.estimateMax ?? null, photoId } })
  return res
}
