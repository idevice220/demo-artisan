import { ImageResponse } from 'next/og'

export const alt = 'Plomberie Martin — Plombier chauffagiste au Raincy (93)'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#10284A', color: '#fff', padding: 64, fontFamily: 'sans-serif', borderBottom: '18px solid #FFB020' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ display: 'flex', width: 64, height: 64, borderRadius: 14, background: '#FFB020', color: '#10284A', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 800, marginRight: 18 }}>M</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 36, fontWeight: 800 }}>Plomberie Martin</div>
            <div style={{ display: 'flex', fontSize: 18, letterSpacing: 4, color: '#FFB020' }}>PLOMBIER CHAUFFAGISTE · LE RAINCY (93)</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 74, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>Une fuite ? Un artisan</div>
          <div style={{ display: 'flex', fontSize: 74, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2, color: '#FFB020' }}>chez vous en 45 min.</div>
        </div>
        <div style={{ display: 'flex' }}>
          {['Devis ferme avant intervention', 'Prix affichés', 'Garantie décennale'].map((t) => (
            <div key={t} style={{ display: 'flex', fontSize: 22, border: '2px solid rgba(255,255,255,0.35)', borderRadius: 999, padding: '10px 22px', marginRight: 14 }}>{t}</div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
