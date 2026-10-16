'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Animated thumbnail for the Error Analysis (Pivot) card.
 * Layers are 2x transparent PNGs exported from Figma frames 259:5158 (Find) and 259:5207 (Compare), 720x495.
 * Comparison bars are HTML so they can grow; values/geometry come from the Figma card (illustrative data).
 *
 * Sequence (once, when 35% in view):
 *   0ms      table visible
 *   120ms    weak-row highlight fades in (180ms)
 *   330ms    "Weak segment found" callout pops in (240ms), holds ~540ms
 *   1110ms   callout fades out (180ms); table shifts +10px and dims to 92% (Compare position, 300ms)
 *   1230ms   comparison card slides out from the highlighted row (300ms)
 *   1530ms   bars grow from 0 to their widths (360ms, 48ms stagger) → done ≈2.0s
 * Hover (card `group`): table and comparison card lift slightly.
 * prefers-reduced-motion: final Compare state, no motion.
 */

const W = 720
const H = 495
const pct = (v: number, of: number) => `${(v / of) * 100}%`

type Box = { left: number; top: number; width: number; height: number }
const box = (b: Box) => ({ left: pct(b.left, W), top: pct(b.top, H), width: pct(b.width, W), height: pct(b.height, H) })

const TABLE: Box = { left: 20, top: 130, width: 680, height: 550 } // uncropped; window extends past the frame
const HIGHLIGHT: Box = { left: 38, top: 324, width: 644, height: 114 }
const CALLOUT: Box = { left: 352, top: 366, width: 310, height: 158 }
const CARD: Box = { left: 388, top: 210, width: 340, height: 310 }
const SHIFT_X = 10 // Compare table is 10px right of Find
const DIM = 0.92 // Compare table opacity

// Bars in frame coords (Figma "Comparison card": track 160px wide, bars 8px tall).
const BARS = [
  { x: 448, y: 336, w: 99, color: '#AB5998' }, // Accuracy · segment 62%
  { x: 448, y: 354, w: 136, color: '#C5ADE6' }, // Accuracy · model 85%
  { x: 448, y: 398, w: 77, color: '#AB5998' }, // Recall · segment 48%
  { x: 448, y: 416, w: 130, color: '#C5ADE6' }, // Recall · model 81%
]
const BAR_H = 8

const T = { highlight: 120, callout: 330, compare: 1110, card: 1230, bars: 1530 }

// 0 idle · 1 highlight · 2 callout · 3 compare · 4 card · 5 bars
type Phase = 0 | 1 | 2 | 3 | 4 | 5

const lift = 'h-full w-full transition-transform duration-500 ease-out motion-reduce:transition-none motion-reduce:group-hover:translate-y-0'

function Img({ src }: { src: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" draggable={false} className="block h-full w-full select-none" />
}

export function PivotThumb({ alt }: { alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<Phase>(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true)
      setPhase(5)
      return
    }
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setPhase(5)
      return
    }
    const timers: ReturnType<typeof setTimeout>[] = []
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        io.disconnect()
        timers.push(setTimeout(() => setPhase(1), T.highlight))
        timers.push(setTimeout(() => setPhase(2), T.callout))
        timers.push(setTimeout(() => setPhase(3), T.compare))
        timers.push(setTimeout(() => setPhase(4), T.card))
        timers.push(setTimeout(() => setPhase(5), T.bars))
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])

  const compare = phase >= 3
  const noAnim = reduced ? 'transition-none' : ''
  const tableState = {
    transform: compare ? `translateX(${(SHIFT_X / TABLE.width) * 100}%)` : 'none',
    opacity: compare ? DIM : 1,
  }

  return (
    <div ref={ref} role="img" aria-label={alt} className="absolute inset-0 overflow-hidden">
      {/* Table (Find → Compare: shift + dim) */}
      <div
        aria-hidden
        className={`absolute transition-[opacity,transform] duration-300 ease-in-out ${noAnim}`}
        style={{ ...box(TABLE), ...tableState }}
      >
        <div className={`${lift} group-hover:-translate-y-[1%]`}>
          <Img src="/home/pivot/table.png" />
        </div>
      </div>

      {/* Weak-row highlight: outline + magenta cells, rides with the table */}
      <div
        aria-hidden
        className={`absolute transition-[opacity,transform] duration-300 ease-in-out ${noAnim}`}
        style={{
          ...box(HIGHLIGHT),
          transform: compare ? `translateX(${(SHIFT_X / HIGHLIGHT.width) * 100}%)` : 'none',
          opacity: phase >= 1 ? (compare ? DIM : 1) : 0,
          transitionDuration: phase === 1 ? '180ms' : undefined,
        }}
      >
        <div className={`${lift} group-hover:-translate-y-[4.8%]`}>
          <Img src="/home/pivot/highlight.png" />
        </div>
      </div>

      {/* Callout (Find only) */}
      <div
        aria-hidden
        className={`absolute origin-[20%_30%] transition-[opacity,transform] ease-out ${noAnim}`}
        style={{
          ...box(CALLOUT),
          opacity: phase === 2 ? 1 : 0,
          transform: phase >= 2 ? 'scale(1)' : 'scale(0.92) translateY(4%)',
          transitionDuration: phase === 2 ? '240ms' : '180ms',
        }}
      >
        <Img src="/home/pivot/callout.png" />
      </div>

      {/* Comparison card: slides out from the highlighted row, bars grow */}
      <div
        aria-hidden
        className={`absolute transition-[opacity,transform] duration-300 ease-out ${noAnim}`}
        style={{
          ...box(CARD),
          opacity: phase >= 4 ? 1 : 0,
          transform: phase >= 4 ? 'none' : 'translateX(-10%) scale(0.96)',
        }}
      >
        <div className={`${lift} relative group-hover:-translate-y-[2%]`}>
          <Img src="/home/pivot/card.png" />
          {BARS.map((b, i) => (
            <span
              key={i}
              className={`absolute origin-left rounded-full transition-transform duration-[360ms] ease-out ${noAnim}`}
              style={{
                left: pct(b.x - CARD.left, CARD.width),
                top: pct(b.y - CARD.top, CARD.height),
                width: pct(b.w, CARD.width),
                height: pct(BAR_H, CARD.height),
                background: b.color,
                transform: phase >= 5 ? 'scaleX(1)' : 'scaleX(0)',
                transitionDelay: phase >= 5 && !reduced ? `${i * 48}ms` : '0ms',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
