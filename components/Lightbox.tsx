"use client"

import { useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"

interface LightboxProps {
  src: string
  alt: string
  onClose: () => void
}

const ANIM_MS = 220

export function Lightbox({ src, alt, onClose }: LightboxProps) {
  const [mounted, setMounted] = useState(false)
  const [shown, setShown] = useState(false)

  // Mount the portal, play the enter animation, and lock body scroll.
  useEffect(() => {
    setMounted(true)
    const raf = requestAnimationFrame(() => setShown(true))
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = prevOverflow
    }
  }, [])

  // Animate out, then unmount.
  const close = useCallback(() => {
    setShown(false)
    window.setTimeout(onClose, ANIM_MS)
  }, [onClose])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [close])

  if (!mounted) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={close}
      className="fixed inset-0 z-[9999] flex cursor-zoom-out items-center justify-center p-10 transition-opacity duration-[220ms] ease-out"
      style={{
        background: "rgba(28,26,20,0.86)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        opacity: shown ? 1 : 0,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-[92vw] rounded-[12px] object-contain transition-transform duration-[220ms] ease-[cubic-bezier(.2,.7,.2,1)]"
        style={{
          boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
          transform: shown ? "scale(1)" : "scale(0.97)",
        }}
      />
      <div className="pointer-events-none absolute bottom-[22px] left-0 right-0 text-center font-mono-ui text-[11px] uppercase tracking-[0.14em] text-white/60">
        Click anywhere or press Esc to close
      </div>
    </div>,
    document.body,
  )
}
