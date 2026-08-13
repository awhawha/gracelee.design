'use client'

import { useEffect, useState } from 'react'
import { MeshGradient } from '@paper-design/shaders-react'

// Decorative mesh-gradient circles for the About page, from the Paper file
// (app.paper.design). The layer is fixed to the viewport, so the orbs hold
// still while the page scrolls past them; each one drifts on its own slow loop
// so they still feel alive.
//
// Sizes, blur radii and shader seeds come straight from the Paper export. The
// blur is what makes them read as organic rather than as flat discs — it is
// deliberately uneven across the set (3px to 11px), so no two edges dissolve
// the same way. Opacity, not blur, is the knob for how present they feel:
// blurring harder spreads the same colour over more area and just washes them
// out.
//
// They render behind the page content (z-0 vs. the sections' z-10), which also
// means the opaque dark CTA band covers them on the way out.

type Orb = {
  /** Diameter in px. The set spans ~5x, from 70 to 340. */
  size: number
  /** Edge softness. Varying this per orb is what stops them looking stamped. */
  blur: number
  /**
   * Held well below 1 so the orbs stay background: at full strength they pull
   * the eye off the copy, which is the whole point of the page. The larger the
   * orb, the more area it covers, so the fainter it has to be.
   */
  opacity: number
  /** Offset from the viewport top. */
  top: string
  /**
   * Horizontal anchor. `calc(50% - Npx)` parks the orb relative to the 1200px
   * content column, matching the Paper composition; the `max()` floor caps how
   * far off-screen it can slide once the gutter runs out, so narrower windows
   * bleed an orb off the edge instead of pushing it onto the text.
   */
  side: 'left' | 'right'
  offset: string
  /** Drift keyframes + timing, staggered so the three never sync up. */
  drift: string
  /** Shader seed so each orb shows a different part of the gradient. */
  frame: number
  speed: number
}

// Three orbs, spread as a loose triangle — large upper left, medium mid right,
// small lower left. The Paper file's second large orb (270px, near-crisp, top
// right) is deliberately left out: sitting beside the headline at full
// strength, it competed with the thing you are meant to read first.
const orbs: Orb[] = [
  // Large, left — the anchor of the composition, and the faintest of the three.
  // Sits level with the portrait (as in the Paper file) rather than up by the
  // headline, and its right edge lands 20px clear of the portrait at every
  // width: the portrait's left edge is `50% - 535px`, and 927 = 535 + 340
  // (size) + 32 (drift reach) + 20 (gap).
  {
    size: 340,
    blur: 11,
    opacity: 0.68,
    top: '38vh',
    side: 'left',
    offset: 'max(-260px, calc(50% - 927px))',
    drift: 'pf-drift-a 26s ease-in-out infinite',
    frame: 5464815.345,
    speed: 0.34,
  },
  // Medium, right — the only orb alongside the bio column, so it stays soft.
  {
    size: 155,
    blur: 5,
    opacity: 0.76,
    top: '48vh',
    side: 'right',
    offset: 'max(14px, calc(50% - 706px))',
    drift: 'pf-drift-b 22s ease-in-out -13s infinite',
    frame: 7021859.757,
    speed: 0.46,
  },
  // Small, lower left. Covers little enough area to carry the crispest edge.
  {
    size: 70,
    blur: 3,
    opacity: 0.85,
    top: '76vh',
    side: 'left',
    offset: 'max(8px, calc(50% - 726px))',
    drift: 'pf-drift-c 18s ease-in-out -5s infinite',
    frame: 7036654.509,
    speed: 0.54,
  },
]

export function FloatingOrbs() {
  const [mounted, setMounted] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setMounted(true)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    // Follow the setting live, so toggling it stills the shader too and not
    // just the CSS drift.
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden max-[1360px]:hidden"
    >
      {orbs.map((orb) => (
        // Drift lives on the outer element and blur on the inner one: keeping
        // the filter off the animated node lets the blurred circle rasterise
        // once and then just be moved around.
        <div
          key={orb.drift}
          className="absolute"
          style={{
            top: orb.top,
            [orb.side]: orb.offset,
            width: orb.size,
            height: orb.size,
            opacity: orb.opacity,
            animation: reduced ? undefined : orb.drift,
          }}
        >
          <div
            className="h-full w-full overflow-hidden rounded-full bg-[#7fa85c]"
            style={{ filter: `blur(${orb.blur}px)` }}
          >
            {mounted && (
              <MeshGradient
                speed={reduced ? 0 : orb.speed}
                scale={1}
                distortion={0.19}
                swirl={0}
                frame={orb.frame}
                grainMixer={0.38}
                grainOverlay={0.1}
                colors={['#E6E4CD', '#41874E', '#D5C32C', '#39CFD3']}
                style={{ height: '100%', width: '100%' }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
