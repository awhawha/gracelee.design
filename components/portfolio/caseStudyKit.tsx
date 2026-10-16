'use client'

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'

/** Shared case-study layout primitives (AutoML, Design System, Museum, Pivot). Public, no case content. */

export type Zoom = { src: string; alt: string }
export type ZoomFn = (src: string, alt: string) => void

/** Scan highlight: one key phrase per paragraph, semibold in darker ink, no background. */
export function Key({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-brand-ink">{children}</strong>
}

export const prose = 'mb-7 text-[17px] leading-[1.75] text-brand-body last:mb-0'
export const caption = 'text-[14px] leading-[1.5] text-[#6B5F68]'
export const frame = 'overflow-hidden rounded-[12px] border border-[#ECE6EE]'
/** Breaks out of the 680px column to up to 880px, centred. */
export const wide = 'relative left-1/2 w-[min(880px,calc(100vw-40px))] -translate-x-1/2'
export const h2 =
  'font-grotesk text-[26px] font-bold leading-[1.2] tracking-[-0.01em] text-brand-ink min-[641px]:text-[30px]'

export function Kicker({ children }: { children: ReactNode }) {
  return <div className="mb-3 text-[13px] font-semibold text-brand-muted">{children}</div>
}

export function Section({
  id,
  label,
  title,
  children,
}: {
  id: string
  label: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-12 pt-16 min-[641px]:pt-24">
      <Kicker>{label}</Kicker>
      <h2 className={`${h2} m-0`}>{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}

export function Frame({ src, alt, onZoom, caption }: { src: string; alt: string; onZoom: ZoomFn; caption?: string }) {
  return (
    <figure className="m-0 w-full">
      <button
        type="button"
        onClick={() => onZoom(src, alt)}
        className={`${frame} block w-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent`}
        aria-label={`Enlarge. ${alt}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" className="block h-auto w-full" />
      </button>
      {caption && <figcaption className={`mt-3 ${caption}`}>{caption}</figcaption>}
    </figure>
  )
}

type PairItem = { src: string; alt: string; caption: string; video?: boolean; ratio?: string; poster?: string }

/** Muted looping video for a pair slot: plays while visible, never autoplays under reduced motion. */
export function PairVideo({ src, label, poster }: { src: string; label: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.3 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      controls
      preload="metadata"
      aria-label={label}
      className="block h-full w-full object-contain"
    />
  )
}

/** Side-by-side figures: equal frames in the shared figure style, captions aligned in one row. */
export function PairFigure({
  items,
  ratio,
  onZoom,
  cols,
}: {
  items: [PairItem, PairItem]
  ratio: string
  onZoom: ZoomFn
  /** Desktop column template, e.g. to give mixed-orientation items equal heights. */
  cols?: string
}) {
  return (
    <figure
      className="m-0 grid w-full grid-cols-1 gap-x-4 gap-y-3 min-[761px]:grid-cols-[var(--pair-cols)] min-[761px]:grid-rows-[auto_auto]"
      style={{ '--pair-cols': cols ?? '1fr 1fr' } as CSSProperties}
    >
      {items.map((item, i) => {
        const slot = `${i === 0 ? 'max-[760px]:row-start-1 min-[761px]:col-start-1' : 'max-[760px]:row-start-3 min-[761px]:col-start-2'} min-[761px]:row-start-1`
        if (item.video) {
          return (
            <div key={item.src} className={`${frame} ${slot}`} style={{ aspectRatio: item.ratio ?? ratio }}>
              <PairVideo src={item.src} label={item.alt} poster={item.poster} />
            </div>
          )
        }
        return (
          <button
            key={item.src}
            type="button"
            onClick={() => onZoom(item.src, item.alt)}
            className={`${frame} ${slot} flex w-full cursor-zoom-in items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent`}
            style={{ aspectRatio: item.ratio ?? ratio }}
            aria-label={`Enlarge. ${item.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.src} alt={item.alt} loading="lazy" className="block h-full w-full object-contain" />
          </button>
        )
      })}
      {items.map((item, i) => (
        <figcaption
          key={`${item.src}-caption`}
          className={`${caption} min-[761px]:row-start-2 ${
            i === 0 ? 'max-[760px]:row-start-2 min-[761px]:col-start-1' : 'max-[760px]:row-start-4 min-[761px]:col-start-2'
          }`}
        >
          {item.caption}
        </figcaption>
      ))}
    </figure>
  )
}

/** Muted looping clip; plays only while in view and never autoplays under reduced motion. */
export function Clip({ src, poster, label, caption }: { src: string; poster?: string; label: string; caption?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.3 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])
  return (
    <figure className="m-0 w-full">
      <div className={frame}>
        <video
          ref={ref}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          controls
          preload="metadata"
          aria-label={label}
          className="block h-auto w-full"
        />
      </div>
      {caption && <figcaption className={`mt-3 ${caption}`}>{caption}</figcaption>}
    </figure>
  )
}

export function Decision({
  num,
  title,
  children,
  media,
  lead,
}: {
  num: string
  title: string
  children: ReactNode
  media: ReactNode
  lead?: ReactNode
}) {
  return (
    <article className="mt-16 first:mt-0">
      <div className="text-[13px] font-semibold text-brand-muted">{num}</div>
      <h3 className="m-0 mt-1 text-[20px] font-semibold leading-[1.35] text-brand-ink">{title}</h3>
      {lead && <div className="mt-10">{lead}</div>}
      <div className={lead ? 'mt-10' : 'mt-4'}>{children}</div>
      <div className="mt-10">{media}</div>
    </article>
  )
}
