'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

const delayClass = {
  0: '',
  1: 'delay-[80ms]',
  2: 'delay-[160ms]',
  3: 'delay-[240ms]',
} as const

/**
 * Fade-up when a block scrolls into view. `?static` and reduced motion show
 * the finished state immediately so screenshots and assistive tech aren't
 * left on a blank section.
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: keyof typeof delayClass
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const still = reduce || window.location.search.includes('static')
    if (still) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`motion-reveal transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${delayClass[delay]} ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-[22px] opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}
