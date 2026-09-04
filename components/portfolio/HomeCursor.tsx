'use client'

import { useEffect, useRef, useState } from 'react'

import { Icon } from '@/components/Icon'

const HOVERABLE =
  'a, button, [role="button"], input, textarea, select, summary, label, [data-cursor]'

type CursorMode = 'default' | 'hover' | 'case-study'

function cursorMode(target: EventTarget | null): CursorMode {
  const hitRoot =
    target instanceof Element
      ? target
      : target instanceof Node
        ? target.parentElement
        : null
  if (!hitRoot) return 'default'
  if (hitRoot.closest('[data-cursor="case-study"]')) return 'case-study'
  if (hitRoot.closest(HOVERABLE)) return 'hover'
  return 'default'
}

export function HomeCursor() {
  const nodeRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [mode, setMode] = useState<CursorMode>('default')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      setEnabled(fine.matches)
      setReduced(motion.matches)
    }
    sync()
    fine.addEventListener('change', sync)
    motion.addEventListener('change', sync)
    return () => {
      fine.removeEventListener('change', sync)
      motion.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    document.body.classList.add('home-cursor-on')
    return () => document.body.classList.remove('home-cursor-on')
  }, [enabled])

  useEffect(() => {
    if (!enabled) return
    const el = nodeRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      setVisible(true)
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-6px, -50%)`
      const next = cursorMode(e.target)
      setMode((prev) => (prev === next ? prev : next))
    }
    const onLeave = () => {
      setVisible(false)
      setMode('default')
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled])

  return (
    <div
      ref={nodeRef}
      className={`home-cursor${visible ? ' is-visible' : ''}${mode === 'case-study' ? ' is-case-study' : ''}${mode === 'hover' ? ' is-hover' : ''}${reduced ? ' is-reduced' : ''}`}
      hidden={!enabled}
      aria-hidden
    >
      <span className="home-cursor-label type-cap">
        <Icon name="fa-eye" className="text-[12px]" />
        VIEW CASE STUDY
      </span>
    </div>
  )
}
