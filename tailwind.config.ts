import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B1220',
        navy: { DEFAULT: '#10284A', 2: '#1B3A66' },
        steel: '#3A5A85',
        mist: '#E9F0F8',
        paper: '#F5F7FA',
        line: '#D8E0EA',
        amber: { DEFAULT: '#FFB020', deep: '#E08E00', tint: '#FFF3D6' },
        ok: '#15A36A',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Impact', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,18,32,0.06), 0 10px 30px -12px rgba(11,18,32,0.25)',
        lift: '0 20px 50px -20px rgba(11,18,32,0.45)',
        amber: '0 10px 30px -10px rgba(255,176,32,0.6)',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        ring: { '0%': { transform: 'scale(1)', opacity: '0.8' }, '100%': { transform: 'scale(2.2)', opacity: '0' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'none' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        ring: 'ring 1.8s ease-out infinite',
        'fade-up': 'fadeUp .7s cubic-bezier(.22,1,.36,1) both',
      },
    },
  },
  plugins: [],
}

export default config
