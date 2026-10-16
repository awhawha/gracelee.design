'use client'

import { useEffect, useRef } from 'react'

export function LoopVideo({
  src,
  label,
  className,
}: {
  src: string
  label: string
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.muted = true
    const pending = el.play()
    if (pending) pending.catch(() => {})
  }, [])

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      muted
      autoPlay
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    />
  )
}
