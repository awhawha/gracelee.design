'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Animated thumbnail for the Design System card.
 * Layers are 2x transparent PNGs exported from Figma frame 264:68 "DS v-B2 — inspect" (720x495).
 * Connector lines are inline SVG using the Figma vector paths, revealed directionally with masks.
 *
 * Sequence (once, when 35% in view):
 *   0ms      Sketch / Zeplin / InVision pills converge from scattered + rotated (300ms, 40ms stagger)
 *   250ms    top lines draw from the pills toward the token card (250ms)
 *   450ms    token card pops in (scale 0.96 → 1, fade, 250ms)
 *   650ms    dashed trunk draws down (150ms), then branches out to the components (800ms, 200ms)
 *   900ms    button, chip, toggle appear (200ms each, 80ms stagger)
 *   1350ms   selection outline + pointer fade in (200ms)
 *   1450ms   Dev Mode spec tag slides up (250ms) → done ≈1.7s
 * Hover (card `group`): token card and components lift slightly.
 * prefers-reduced-motion: final B2 state, no motion.
 */

const W = 720
const H = 495
const pct = (v: number, of: number) => `${(v / of) * 100}%`

type Box = { left: number; top: number; width: number; height: number }
const b = (left: number, top: number, width: number, height: number): Box => ({ left, top, width, height })
const box = (x: Box) => ({ left: pct(x.left, W), top: pct(x.top, H), width: pct(x.width, W), height: pct(x.height, H) })

// Layer boxes in the 720x495 frame (include 40px shadow padding).
const L = {
  sketch: b(-19.2, 62.2, 246.4, 159.6),
  zeplin: b(236.8, -22.8, 246.4, 159.6),
  invision: b(492.8, 62.2, 246.4, 159.6),
  token: b(136, 70, 448, 276),
  button: b(149, 360, 200, 126),
  chip: b(293, 364, 191, 118),
  toggle: b(427, 364, 145, 118),
  selection: b(145, 356, 208, 134),
  spec: b(260, 390, 216, 136),
}

// Scattered start for the tool pills (inspired by "DS v-A — Scattered"); translate is % of the layer box.
const SCATTER: Record<'sketch' | 'zeplin' | 'invision', string> = {
  sketch: 'translate(-14%, 16%) rotate(-6deg)',
  zeplin: 'translate(0%, -12%) rotate(5deg)',
  invision: 'translate(14%, 16%) rotate(-4deg)',
}

// Tool pills are drawn 1.4x the Figma size. Sketch/InVision sit lower than Figma B2 (beside the token card) to clear the card's top-left badge.
// Figma "Connectors": top lines (#DDD6E8, 1.5, round) and bottom dashed branches (#C5ADE6, 1.5, dash 4/5).
const TOP_PATHS = ['M104 166 C104 190 150 202 176 205', 'M360 81 V110', 'M616 166 C616 190 570 202 544 205']
const BOTTOM_PATH = 'M360 306 V350 M249 400 V350 H499 V404 M388 350 V404'
const TRUNK = 'M360 306 V350'
const BRANCHES = ['M360 350 H249 V400', 'M360 350 H499 V404', 'M388 350 V404']

const T = {
  pills: 0,
  pillStagger: 40,
  top: 250,
  token: 450,
  trunk: 650,
  branches: 800,
  comps: 900,
  compStagger: 80,
  selection: 1350,
  spec: 1450,
}

const lift = 'h-full w-full transition-transform duration-500 ease-out motion-reduce:transition-none motion-reduce:group-hover:translate-y-0'

function Img({ src }: { src: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" draggable={false} className="block h-full w-full select-none" />
}

export function DesignSystemThumb({ alt }: { alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true)
      setShown(true)
      return
    }
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const tr = (delay: number, dur: number) => ({
    transitionProperty: 'opacity, transform',
    transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    transitionDuration: reduced ? '0ms' : `${dur}ms`,
    transitionDelay: shown && !reduced ? `${delay}ms` : '0ms',
  })
  const draw = (delay: number, dur: number) => ({
    strokeDashoffset: shown ? 0 : 1,
    transition: reduced ? 'none' : `stroke-dashoffset ${dur}ms ease-out ${shown ? delay : 0}ms`,
  })

  const pill = (key: 'sketch' | 'zeplin' | 'invision', i: number) => (
    <div
      key={key}
      aria-hidden
      className="absolute"
      style={{
        ...box(L[key]),
        ...tr(T.pills + i * T.pillStagger, 300),
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : SCATTER[key],
      }}
    >
      <Img src={`/home/dotds/${key}.png`} />
    </div>
  )

  const comp = (key: 'button' | 'chip' | 'toggle', i: number) => (
    <div
      key={key}
      aria-hidden
      className="absolute"
      style={{
        ...box(L[key]),
        ...tr(T.comps + i * T.compStagger, 200),
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(8%)',
      }}
    >
      <div className={`${lift} group-hover:-translate-y-[3%]`}>
        <Img src={`/home/dotds/${key}.png`} />
      </div>
    </div>
  )

  return (
    <div ref={ref} role="img" aria-label={alt} className="absolute inset-0 overflow-hidden">
      {/* Connectors */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <mask id="ds-top-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
            {TOP_PATHS.map((d, i) => (
              <path key={i} d={d} pathLength={1} fill="none" stroke="#fff" strokeWidth={8} strokeDasharray="1 1" style={draw(T.top, 250)} />
            ))}
          </mask>
          <mask id="ds-bottom-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
            <path d={TRUNK} pathLength={1} fill="none" stroke="#fff" strokeWidth={8} strokeDasharray="1 1" style={draw(T.trunk, 150)} />
            {BRANCHES.map((d, i) => (
              <path key={i} d={d} pathLength={1} fill="none" stroke="#fff" strokeWidth={8} strokeDasharray="1 1" style={draw(T.branches, 200)} />
            ))}
          </mask>
        </defs>
        <g mask="url(#ds-top-mask)" fill="none" stroke="#DDD6E8" strokeWidth={1.5} strokeLinecap="round">
          {TOP_PATHS.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <path d={BOTTOM_PATH} mask="url(#ds-bottom-mask)" fill="none" stroke="#C5ADE6" strokeWidth={1.5} strokeDasharray="4 5" />
      </svg>

      {/* Tool pills converge */}
      {pill('sketch', 0)}
      {pill('zeplin', 1)}
      {pill('invision', 2)}

      {/* Token card */}
      <div
        aria-hidden
        className="absolute"
        style={{ ...box(L.token), ...tr(T.token, 250), opacity: shown ? 1 : 0, transform: shown ? 'none' : 'scale(0.96)' }}
      >
        <div className={`${lift} group-hover:-translate-y-[1.5%]`}>
          <Img src="/home/dotds/token.png" />
        </div>
      </div>

      {/* Components */}
      {comp('button', 0)}
      {comp('chip', 1)}
      {comp('toggle', 2)}

      {/* Inspect: selection outline + pointer, then Dev Mode spec tag */}
      <div
        aria-hidden
        className="absolute"
        style={{ ...box(L.selection), ...tr(T.selection, 200), opacity: shown ? 1 : 0, transform: shown ? 'none' : 'scale(1.03)' }}
      >
        <div className={`${lift} group-hover:-translate-y-[3%]`}>
          <Img src="/home/dotds/selection.png" />
        </div>
      </div>
      <div
        aria-hidden
        className="absolute"
        style={{ ...box(L.spec), ...tr(T.spec, 250), opacity: shown ? 1 : 0, transform: shown ? 'none' : 'translateY(6%)' }}
      >
        <div className={`${lift} group-hover:-translate-y-[3%]`}>
          <Img src="/home/dotds/spec.png" />
        </div>
      </div>
    </div>
  )
}
