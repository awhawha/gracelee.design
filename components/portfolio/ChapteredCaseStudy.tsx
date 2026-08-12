'use client'

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import Link from 'next/link'
import { Lightbox } from '@/components/Lightbox'
import type { CaseMedia, CaseStudyContent } from '@/lib/caseStudyContent'

// Lets any nested Figure open the lightbox without prop-drilling.
const ZoomContext = createContext<((src: string, alt: string) => void) | null>(
  null,
)

// ── Reveal-on-scroll wrapper (IntersectionObserver + reduced-motion) ────────

function Reveal({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true)
            io.disconnect()
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className ?? ''}`}
    >
      {children}
    </div>
  )
}

// ── Striped image placeholder ───────────────────────────────────────────────

function Figure({
  media,
  ratio = '16 / 10',
  radius = 'rounded-[12px]',
  captionSize = 'text-[13px]',
}: {
  media: CaseMedia
  ratio?: string
  radius?: string
  captionSize?: string
}) {
  const onZoom = useContext(ZoomContext)
  const frameRatio = media.ratio ?? ratio
  const bgClass = media.img
    ? media.bg === 'white'
      ? 'bg-white'
      : 'bg-[#d8dac9]'
    : 'bg-pf-stripes'

  return (
    <div>
      <div
        className={`relative flex w-full items-center justify-center overflow-hidden border border-pf-border ${radius} ${bgClass}`}
        style={{ aspectRatio: frameRatio, padding: media.pad }}
      >
        {media.img && media.isVideo ? (
          <video
            className={`${
              media.fit === 'cover'
                ? 'h-full w-full object-cover'
                : 'max-h-full max-w-full object-contain'
            }`}
            controls
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={media.img} type="video/mp4" />
          </video>
        ) : media.img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={media.img}
            alt={media.alt ?? media.caption}
            onClick={
              onZoom
                ? () => onZoom(media.img as string, media.alt ?? media.caption)
                : undefined
            }
            className={`${
              media.fit === 'cover'
                ? 'h-full w-full object-cover'
                : 'max-h-full max-w-full object-contain'
            }${onZoom ? ' cursor-zoom-in' : ''}`}
          />
        ) : (
          <>
            <span className="font-mono-ui text-[13px] text-pf-placeholder">
              {media.label}
            </span>
            {media.isVideo && (
              <>
                <span className="absolute left-3 top-3 rounded-[5px] bg-pf-ink px-2 py-1 font-mono-ui text-[10px] font-semibold tracking-[0.06em] text-white">
                  VIDEO
                </span>
                <div className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(35,32,26,0.5)] pl-1 text-[20px] text-white">
                  ▶
                </div>
              </>
            )}
          </>
        )}
      </div>
      <p className={`mt-3 leading-[1.55] text-pf-muted ${captionSize}`}>
        {media.caption}
      </p>
    </div>
  )
}

// ── Before/after comparison side (labeled image, zoomable) ──────────────────

function BeforeAfterSide({
  media,
}: {
  media: { img: string; alt: string; label: string }
}) {
  const onZoom = useContext(ZoomContext)
  return (
    <div>
      <div className="mb-2 font-mono-ui text-[11px] uppercase tracking-[0.12em] text-pf-muted">
        {media.label}
      </div>
      <div
        className="relative flex w-full items-center justify-center overflow-hidden rounded-[12px] border border-pf-border bg-[#d8dac9]"
        style={{ aspectRatio: '16 / 10' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.img}
          alt={media.alt}
          onClick={onZoom ? () => onZoom(media.img, media.alt) : undefined}
          className={`h-full w-full object-cover${onZoom ? ' cursor-zoom-in' : ''}`}
        />
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function ChapteredCaseStudy({ content }: { content: CaseStudyContent }) {
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null)

  return (
    <ZoomContext.Provider value={(src, alt) => setZoom({ src, alt })}>
    <div className="font-grotesk text-pf-ink">
      {/* Back link */}
      <div className="mx-auto max-w-[1120px] px-10 pt-10 max-[640px]:px-6">
        <Link
          href="/"
          className="text-[14px] font-semibold text-pf-muted transition-colors hover:text-pf-ink"
        >
          ← All projects
        </Link>
      </div>

      <div className="mx-auto max-w-[1120px] px-10 pt-7 max-[640px]:px-6">
        {/* Hero */}
        <div className="mb-[26px] font-mono-ui text-[12px] uppercase tracking-[0.16em] text-pf-accent">
          {content.eyebrow}
        </div>
        <h1 className="m-0 max-w-[980px] text-[58px] font-semibold leading-[1.02] tracking-[-0.035em] max-[900px]:text-[clamp(36px,8vw,58px)]">
          {content.title}
        </h1>
        <p className="mt-[22px] max-w-[780px] text-[20px] leading-[1.5] text-pf-secondary">
          {content.subhead}
        </p>
        <div className="mt-[26px] flex flex-wrap gap-2">
          {content.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-pf-tag px-[13px] py-[6px] text-[13px] text-pf-secondary"
            >
              {t}
            </span>
          ))}
        </div>

        {/* In short / TL;DR */}
        <div className="mt-9 max-w-[900px]">
          <div className="mb-3 font-mono-ui text-[12px] uppercase tracking-[0.14em] text-pf-muted-light">
            In short
          </div>
          <p className="m-0 text-[23px] font-medium leading-[1.5] text-pf-ink">
            {content.tldr}
          </p>
        </div>

        {/* Metrics */}
        <div className="mt-10 grid grid-cols-3 gap-10 border-t border-pf-ink pt-9 max-[640px]:grid-cols-1 max-[640px]:gap-6">
          {content.metrics.map((m) => (
            <div key={m.label}>
              <div className="text-[40px] font-semibold leading-none tracking-[-0.02em] text-pf-accent">
                {m.value}
              </div>
              <div className="mt-[14px] text-[15px] font-semibold text-pf-ink">
                {m.label}
              </div>
              {m.desc && (
                <div className="mt-[6px] text-[13px] leading-[1.55] text-pf-muted">
                  {m.desc}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Hero image */}
        {content.heroImage && (
          <div className="mt-11">
            <Figure
              media={content.heroImage}
              ratio="16 / 9"
              radius="rounded-[16px]"
              captionSize="text-[14px]"
            />
          </div>
        )}

        {/* Chapters */}
        {content.chapters.map((ch, i) => (
          <section key={i} className="mt-14 border-t border-pf-ink pb-2 pt-12">
            <div className="grid grid-cols-[260px_1fr] items-start gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-5">
              <div className="sticky top-24 max-[900px]:static">
                <div className="font-mono-ui text-[12px] uppercase tracking-[0.14em] text-pf-accent">
                  {ch.kicker}
                </div>
                <h2 className="mt-[14px] text-[28px] font-semibold leading-[1.14] tracking-[-0.02em]">
                  {ch.heading}
                </h2>
              </div>
              <div>
                {ch.conflict && (
                  <div className="mb-[26px] rounded-[14px] bg-[rgba(96,104,52,0.10)] px-[26px] py-6">
                    <div className="mb-[10px] font-mono-ui text-[11px] uppercase tracking-[0.14em] text-pf-accent">
                      {ch.conflict.label}
                    </div>
                    <p className="m-0 text-[20px] font-medium leading-[1.45] text-pf-ink">
                      {ch.conflict.text}
                    </p>
                  </div>
                )}

                {ch.body.map((p, j) => (
                  <p
                    key={j}
                    className="mb-5 text-[17px] leading-[1.72] text-pf-body"
                  >
                    {p}
                  </p>
                ))}

                {ch.quote && (
                  <Reveal className="my-[30px] border-l-[3px] border-pf-accent pl-[22px]">
                    <p className="m-0 text-[30px] font-semibold leading-[1.24] tracking-[-0.02em] text-pf-ink">
                      {ch.quote.text}
                    </p>
                    <div className="mt-[14px] font-mono-ui text-[12px] uppercase tracking-[0.08em] text-pf-muted-light">
                      {ch.quote.who}
                    </div>
                  </Reveal>
                )}

                {ch.beforeAfter && (
                  <Reveal className="mt-[14px]">
                    <div className="grid grid-cols-[1fr_32px_1fr] items-end gap-3 max-[700px]:grid-cols-1">
                      <BeforeAfterSide media={ch.beforeAfter.before} />
                      <div className="self-center text-center text-[20px] text-pf-accent max-[700px]:justify-self-center max-[700px]:rotate-90">
                        →
                      </div>
                      <BeforeAfterSide media={ch.beforeAfter.after} />
                    </div>
                    {ch.beforeAfter.caption && (
                      <p className="mt-3 text-[13px] leading-[1.55] text-pf-muted">
                        {ch.beforeAfter.caption}
                      </p>
                    )}
                  </Reveal>
                )}

                {ch.overview && (
                  <Reveal className="mt-[14px]">
                    <Figure media={ch.overview} />
                  </Reveal>
                )}

                {ch.features && (
                  <div className="mt-6 grid grid-cols-2 gap-4 max-[640px]:grid-cols-1">
                    {ch.features.map((f) => (
                      <Reveal
                        key={f.name}
                        className="rounded-[14px] border border-pf-border bg-pf-chip p-5"
                      >
                        <div className="text-[16px] font-semibold text-pf-ink">
                          {f.name}
                        </div>
                        <p className="m-0 mt-[6px] text-[14px] leading-[1.6] text-pf-secondary">
                          {f.text}
                        </p>
                      </Reveal>
                    ))}
                  </div>
                )}

                {ch.flow && (
                  <Reveal className="mt-6">
                    <div className="flex flex-wrap items-center gap-y-3 rounded-[14px] border border-pf-border bg-pf-chip px-5 py-4">
                      {ch.flow.map((step, k) => (
                        <span key={step} className="flex items-center">
                          <span className="rounded-full border border-pf-border bg-white px-[14px] py-[7px] text-[13px] font-medium text-pf-ink">
                            {step}
                          </span>
                          {k < ch.flow!.length - 1 && (
                            <span className="mx-[10px] text-[15px] text-pf-accent">
                              →
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                )}

                {ch.decisions && (
                  <div className="mt-[14px]">
                    {ch.decisions.map((d) => (
                      <Reveal
                        key={d.num}
                        className="mt-[30px] border-t border-pf-hairline pt-[30px]"
                      >
                        <div className="mb-2 flex items-baseline gap-[10px]">
                          <span className="font-mono-ui text-[12px] text-pf-accent">
                            {d.num}
                          </span>
                          <span className="text-[18px] font-semibold">
                            {d.name}
                          </span>
                        </div>
                        <p className="mb-[18px] text-[16px] leading-[1.7] text-pf-secondary">
                          {d.text}
                        </p>
                        <Figure media={d.media} />
                        {d.media2 && (
                          <div className="mt-[18px]">
                            <Figure media={d.media2} />
                          </div>
                        )}
                      </Reveal>
                    ))}
                  </div>
                )}

                {ch.figures && (
                  <div className="mt-[14px] flex flex-col gap-[22px]">
                    {ch.figures.map((f, j) => (
                      <Reveal key={j}>
                        <Figure media={f} />
                      </Reveal>
                    ))}
                  </div>
                )}

                {ch.callout && (
                  <Reveal className="mt-[26px] rounded-[14px] bg-[rgba(96,104,52,0.10)] px-[26px] py-6">
                    <div className="mb-[10px] font-mono-ui text-[11px] uppercase tracking-[0.14em] text-pf-accent">
                      {ch.callout.label}
                    </div>
                    <p className="m-0 text-[22px] font-semibold leading-[1.4] text-pf-ink">
                      {ch.callout.text}
                    </p>
                  </Reveal>
                )}

                {ch.list && (
                  <Reveal className="mt-[26px] border-t border-pf-hairline pt-[24px]">
                    <div className="mb-4 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-pf-muted-light">
                      {ch.list.title}
                    </div>
                    <ul className="m-0 grid list-none grid-cols-2 gap-x-10 gap-y-3 p-0 max-[640px]:grid-cols-1">
                      {ch.list.items.map((item) => (
                        <li
                          key={item}
                          className="border-b border-pf-hairline pb-3 text-[15px] text-pf-body"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                )}

                {ch.resolution && (
                  <Reveal className="mt-[30px] border-t border-pf-hairline pt-[26px]">
                    <div className="mb-3 font-mono-ui text-[11px] uppercase tracking-[0.14em] text-pf-accent">
                      The resolution
                    </div>
                    <p className="m-0 text-[19px] font-medium leading-[1.6] text-pf-ink">
                      {ch.resolution}
                    </p>
                  </Reveal>
                )}
              </div>
            </div>
          </section>
        ))}

        {/* My involvement */}
        <section className="mt-12 border-t border-pf-hairline pb-20 pt-14">
          <div className="grid grid-cols-[260px_1fr] items-start gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-5">
            <h3 className="sticky top-24 m-0 text-[20px] font-semibold tracking-[-0.01em] max-[900px]:static">
              My involvement
            </h3>
            <p className="m-0 text-[17px] leading-[1.72] text-pf-body">
              {content.involvement}
            </p>
          </div>
        </section>
      </div>

      {/* Footer — next project */}
      <Link
        href={content.next.href}
        className="block bg-[#2c3326] text-white transition-colors hover:bg-[#20271c]"
      >
        <div className="mx-auto flex max-w-[1120px] flex-col items-end gap-2 px-10 py-12 max-[640px]:px-6">
          <span className="font-mono-ui text-[11px] uppercase tracking-[0.12em] text-pf-muted">
            Next project
          </span>
          <span className="whitespace-nowrap text-[30px] font-semibold tracking-[-0.02em]">
            {content.next.label} ↗
          </span>
        </div>
      </Link>

      {zoom && (
        <Lightbox src={zoom.src} alt={zoom.alt} onClose={() => setZoom(null)} />
      )}
    </div>
    </ZoomContext.Provider>
  )
}
