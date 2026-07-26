import { ImageResponse } from 'next/og'

export const alt = 'Plomberie Martin — Plombier chauffagiste au Raincy (93)'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#123B5C',
          padding: 70,
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 34,
              fontWeight: 800,
              color: '#FFFFFF',
            }}
          >
            Plomberie <span style={{ color: '#F59E0B', marginLeft: 10 }}>Martin</span>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 18,
              color: '#123B5C',
              background: '#FFFFFF',
              borderRadius: 999,
              padding: '10px 20px',
              fontWeight: 700,
            }}
          >
            SITE DE DÉMONSTRATION
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              color: '#F59E0B',
              letterSpacing: 3,
              marginBottom: 18,
            }}
          >
            PLOMBIER CHAUFFAGISTE · LE RAINCY (93)
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 72,
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Un artisan de confiance,
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 72,
              fontWeight: 800,
              color: '#F59E0B',
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            disponible rapidement.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          {['Devis gratuit 24h', 'Intervention rapide', 'Garantie décennale'].map(
            (t) => (
              <div
                key={t}
                style={{
                  display: 'flex',
                  fontSize: 22,
                  color: '#DCE7F2',
                  background: 'rgba(255,255,255,0.10)',
                  borderRadius: 999,
                  padding: '12px 24px',
                  marginRight: 14,
                }}
              >
                {t}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  )
}
