'use client'

import { useEffect, useRef, type ReactNode } from 'react'

export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }: { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'li' | 'section' }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { rootMargin: '-40px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = Tag as any
  return (
    <Comp ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Comp>
  )
}
