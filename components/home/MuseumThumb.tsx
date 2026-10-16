'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Animated thumbnail for the Museum card.
 * Card layers are 2x transparent PNGs exported from Figma frame 248:4 (720x495); the connector is
 * inline SVG using the Figma vector path, so it can draw directionally from the selected book.
 * All positions are in the 720x495 frame, scaled to the 16:11 media area.
 *
 * Entrance (once, on scroll into view):
 *   0ms      start dot pops in on the selected book (120ms)
 *   120ms    dashed connector reveals along its path, book → right block (360ms)
 *   480ms    end dot pops in at the right block
 *   600ms    prompt pill slides/fades in (300ms)
 *   780ms    "Research this book" types out (30ms/char), caret blinks then hides
 *   1440ms   angle picker (300ms)
 *   1665ms   AI draft card (300ms) → done ≈1.95s
 * Hover (card `group`): gallery slides up to reveal more of its cropped bottom; right-side cards lift slightly.
 * prefers-reduced-motion: final state (full text, no caret), no motion.
 */

const W = 720
const H = 495
const pct = (v: number, of: number) => `${(v / of) * 100}%`

const PROMPT = 'Research this book'
const T = {
  startDot: 0,
  line: 120,
  lineDur: 360,
  endDot: 480,
  pill: 600,
  typeStart: 780,
  perChar: 30,
  caretTail: 270,
  picker: 1440,
  draft: 1665,
}

type Box = { left: number; top: number; width: number; height: number }
const box = (b: Box) => ({ left: pct(b.left, W), top: pct(b.top, H), width: pct(b.width, W), height: pct(b.height, H) })

const GALLERY: Box = { left: 18, top: 259, width: 432, height: 396 }
const PILL: Box = { left: 338, top: 89, width: 384, height: 92 }
const PICKER: Box = { left: 338, top: 141, width: 384, height: 238 }
const DRAFT: Box = { left: 338, top: 339, width: 384, height: 158 }
// Figma "Vector 2" in Decorations: elbow (corner radius 53) from the selected book (230,414) to the angle picker (363,234).
const PATH = 'M230 414 H231.564 A53 53 0 0 0 284.564 361 V287 A53 53 0 0 1 337.564 234 H363'
const PATH_LEN = 1.564 + 2 * ((Math.PI / 2) * 53) + 74 + 25.436
const START = { x: 230, y: 414 }
const END = { x: 363, y: 234 }
// Figma text layer: Inter Regular 12.5px, #281022, top-left at (406, 117.375) in the 720x495 frame.
const TEXT = { left: 406, top: 117.375, size: 12.5 }

const reduce = 'motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none'
const lift = 'h-full w-full transition-transform duration-500 ease-out motion-reduce:transition-none motion-reduce:group-hover:translate-y-0'

function Img({ src }: { src: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" draggable={false} className="block h-full w-full select-none" />
}

export function MuseumThumb({ alt }: { alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  const [typed, setTyped] = useState(0)
  const [caret, setCaret] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true)
      setShown(true)
      setTyped(PROMPT.length)
      return
    }
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      setTyped(PROMPT.length)
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

  useEffect(() => {
    if (!shown || reduced) return
    const timers: ReturnType<typeof setTimeout>[] = []
    timers.push(setTimeout(() => setCaret(true), T.typeStart - 90))
    for (let i = 1; i <= PROMPT.length; i++) {
      timers.push(setTimeout(() => setTyped(i), T.typeStart + i * T.perChar))
    }
    timers.push(setTimeout(() => setCaret(false), T.typeStart + PROMPT.length * T.perChar + T.caretTail))
    return () => timers.forEach(clearTimeout)
  }, [shown, reduced])

  const slide = (delay: number) => ({
    className: `absolute transition-[opacity,transform] duration-300 ease-out ${reduce} ${
      shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    }`,
    style: { transitionDelay: shown ? `${delay}ms` : '0ms' },
  })
  const pop = (delay: number) => ({
    className: `transition-[opacity,transform] duration-[120ms] ease-out [transform-box:fill-box] [transform-origin:center] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:[transform:none] ${
      shown ? 'opacity-100 [transform:scale(1)]' : 'opacity-0 [transform:scale(0.2)]'
    }`,
    style: { transitionDelay: shown ? `${delay}ms` : '0ms' },
  })
  const pill = slide(T.pill)
  const picker = slide(T.picker)
  const draft = slide(T.draft)
  const startDot = pop(T.startDot)
  const endDot = pop(T.endDot)

  return (
    <div ref={ref} role="img" aria-label={alt} className="absolute inset-0 overflow-hidden [container-type:inline-size]">
      <style>{`@keyframes museumCaret{0%,49%{opacity:1}50%,100%{opacity:0}}`}</style>

      <div aria-hidden className="absolute" style={box(GALLERY)}>
        <div className={`${lift} group-hover:-translate-y-[3%]`}>
          <Img src="/home/museum/gallery.png" />
        </div>
      </div>

      <div aria-hidden className={pill.className} style={{ ...box(PILL), ...pill.style }}>
        <div className={`${lift} relative group-hover:-translate-y-[4%]`}>
          <Img src="/home/museum/pill.png" />
          <span
            className="absolute whitespace-pre font-inter font-normal text-[#281022]"
            style={{
              left: pct(TEXT.left - PILL.left, PILL.width),
              top: pct(TEXT.top - PILL.top, PILL.height),
              fontSize: `${(TEXT.size / W) * 100}cqw`,
              lineHeight: 1.21,
            }}
          >
            {PROMPT.slice(0, typed)}
            {caret && (
              <span
                className="ml-[0.06em] inline-block w-[0.08em] bg-[#AB5998] align-[-0.12em]"
                style={{ height: '1.05em', animation: 'museumCaret 0.9s steps(1) infinite' }}
              />
            )}
          </span>
        </div>
      </div>

      <div aria-hidden className={picker.className} style={{ ...box(PICKER), ...picker.style }}>
        <div className={`${lift} group-hover:-translate-y-[1.5%]`}>
          <Img src="/home/museum/picker.png" />
        </div>
      </div>

      <div aria-hidden className={draft.className} style={{ ...box(DRAFT), ...draft.style }}>
        <div className={`${lift} group-hover:-translate-y-[2.5%]`}>
          <Img src="/home/museum/draft.png" />
        </div>
      </div>

      {/* Connector: directional draw from the selected book to the right-side block. */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <linearGradient id="museum-connector" gradientUnits="userSpaceOnUse" x1={START.x} y1="0" x2={END.x} y2="0">
            <stop offset="0" stopColor="#AB5998" />
            <stop offset="1" stopColor="#281022" />
          </linearGradient>
          <mask id="museum-connector-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
            <path
              d={PATH}
              fill="none"
              stroke="#fff"
              strokeWidth={8}
              strokeDasharray={PATH_LEN}
              className="transition-[stroke-dashoffset] ease-in-out motion-reduce:transition-none motion-reduce:[stroke-dashoffset:0]"
              style={{
                strokeDashoffset: shown ? 0 : PATH_LEN,
                transitionDuration: `${T.lineDur}ms`,
                transitionDelay: shown ? `${T.line}ms` : '0ms',
              }}
            />
          </mask>
        </defs>
        <path
          d={PATH}
          fill="none"
          stroke="url(#museum-connector)"
          strokeWidth={1.75}
          strokeDasharray="4 4"
          mask="url(#museum-connector-mask)"
        />
        <circle cx={START.x} cy={START.y} r={4.5} fill="#AB5998" className={startDot.className} style={startDot.style} />
        <circle cx={END.x} cy={END.y} r={4.5} fill="#281022" className={endDot.className} style={endDot.style} />
      </svg>
    </div>
  )
}
