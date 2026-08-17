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
import type {
  CaseMedia,
  CasePipeline,
  CaseStudyContent,
} from '@/lib/caseStudyContent'

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
      : media.bg === 'gradient'
        ? 'bg-[#dddfae] bg-pf-paper'
        : 'bg-[#d8dac9]'
    : 'bg-pf-stripes'

  return (
    <div style={{ maxWidth: media.maxW }}>
      {media.title && (
        <div className="mb-2 font-grotesk text-[14px] font-medium text-pf-secondary">
          {media.title}
        </div>
      )}
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
      <div className="mb-2 font-grotesk text-[14px] font-medium text-pf-secondary">
        {media.label}
      </div>
      <div
        className="relative flex w-full items-center justify-center overflow-hidden rounded-[12px] border border-pf-border bg-[#dddfae] bg-pf-paper"
        style={{ aspectRatio: '5760 / 3380' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.img}
          alt={media.alt}
          onClick={onZoom ? () => onZoom(media.img, media.alt) : undefined}
          className={`h-full w-full object-contain${onZoom ? ' cursor-zoom-in' : ''}`}
        />
      </div>
    </div>
  )
}

// ── Pipeline swimlane ────────────────────────────────────────────────────────
// Reads left to right as a sequence; top to bottom it shows which actor owns
// each step, so the human-in-the-loop gates are visible rather than described.

const LANE_FILL: Record<CasePipeline['lanes'][number]['tone'], string> = {
  agent: 'bg-[rgba(96,104,52,0.10)] text-pf-body',
  surface: 'border border-pf-border bg-white text-pf-body',
  human: 'bg-pf-accent text-white',
}

function PipelineDiagram({ pipeline }: { pipeline: CasePipeline }) {
  const { lanes, steps } = pipeline
  const cols = `132px repeat(${steps.length}, minmax(0, 1fr))`

  return (
    <>
    <div className="rounded-[14px] border border-pf-border bg-pf-chip px-6 py-7 max-[640px]:px-4 max-[640px]:py-5">
      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          {/* Steps — the sequence, with human gates called out above the chip */}
          <div className="grid items-end gap-x-3" style={{ gridTemplateColumns: cols }}>
            <div />
            {steps.map((s, i) => (
              <div key={s.name} className="flex items-end">
                <div className="flex-1">
                  {s.checkpoint && (
                    <div className="mb-[8px] text-center font-mono-ui text-[10.5px] font-semibold uppercase tracking-[0.07em] text-pf-accent">
                      {s.checkpoint}
                    </div>
                  )}
                  <div
                    className={`rounded-full bg-white px-3 py-[9px] text-center text-[13.5px] font-medium leading-[1.3] text-pf-ink ${
                      s.checkpoint
                        ? 'border-[1.5px] border-pf-accent'
                        : 'border border-pf-border'
                    }`}
                  >
                    {s.name}
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <span className="pb-[9px] pl-2 text-[13px] text-pf-accent">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Lanes — who acts at each step */}
          {lanes.map((lane) => (
            <div
              key={lane.key}
              className="mt-3 grid items-stretch gap-x-3"
              style={{ gridTemplateColumns: cols }}
            >
              <div className="flex items-center justify-end pr-2 text-right font-mono-ui text-[12px] leading-[1.4] text-pf-secondary">
                {lane.name}
              </div>
              {steps.map((s) => {
                const act = s.acts.find((a) => a.lane === lane.key)
                return (
                  <div key={s.name} className="flex items-center">
                    {act ? (
                      <div
                        className={`w-full rounded-[10px] px-3 py-[11px] text-[13px] leading-[1.35] ${LANE_FILL[lane.tone]}`}
                      >
                        {act.text}
                      </div>
                    ) : (
                      /* Idle lane — a hairline keeps the track continuous */
                      <div className="h-px w-full bg-pf-hairline" />
                    )}
                  </div>
                )
              })}
            </div>
          ))}

        </div>
      </div>
    </div>
    {pipeline.caption && (
      <p className="mt-3 max-w-[900px] text-[13px] leading-[1.55] text-pf-muted">
        {pipeline.caption}
      </p>
    )}
    </>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function ChapteredCaseStudy({ content }: { content: CaseStudyContent }) {
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null)
  const tldrParas = !content.tldr
    ? []
    : Array.isArray(content.tldr)
      ? content.tldr
      : [content.tldr]

  return (
    <ZoomContext.Provider value={(src, alt) => setZoom({ src, alt })}>
    <div className="font-grotesk text-pf-ink">
      {/* Back link */}
      <div className="mx-auto max-w-[1120px] px-10 pt-10 max-[640px]:px-6">
        <Link
          href="/"
          className="text-[14px] font-medium text-pf-muted transition-colors hover:text-pf-ink"
        >
          ← All projects
        </Link>
      </div>

      <div className="mx-auto max-w-[1120px] px-10 pt-7 max-[640px]:px-6">
        {/* Hero */}
        {content.eyebrow && (
          <div className="mb-[26px] font-mono-ui text-[12px] font-medium tracking-[0.01em] text-pf-secondary">
            {content.eyebrow}
          </div>
        )}
        <h1 className="m-0 max-w-[980px] text-[58px] font-semibold leading-[1.02] tracking-[-0.035em] max-[900px]:text-[clamp(36px,8vw,58px)]">
          {content.title}
        </h1>
        {content.subhead && (
          <p className="mt-[22px] max-w-[780px] text-[20px] leading-[1.5] text-pf-secondary">
            {content.subhead}
          </p>
        )}

        {content.heroCompact ? (
          /* Compact hero: summary directly under the title, tags below it */
          <>
            {tldrParas.length > 0 && (
            <div className="mt-6 max-w-[900px]">
              {tldrParas.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? 'm-0 text-[23px] font-medium leading-[1.5] text-pf-ink'
                      : 'm-0 mt-4 text-[18px] leading-[1.6] text-pf-secondary'
                  }
                >
                  {p}
                </p>
              ))}
            </div>
            )}
            <div className="mt-5 flex flex-wrap gap-2">
              {content.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-pf-tag px-[13px] py-[6px] text-[13px] text-pf-secondary"
                >
                  {t}
                </span>
              ))}
            </div>
          </>
        ) : (
          <>
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
            {tldrParas.length > 0 && (
            <div className="mt-9 max-w-[900px]">
              <div className="mb-3 font-mono-ui text-[12px] font-medium tracking-[0.01em] text-pf-secondary">
                In short
              </div>
              {tldrParas.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? 'm-0 text-[23px] font-medium leading-[1.5] text-pf-ink'
                      : 'm-0 mt-4 text-[18px] leading-[1.6] text-pf-secondary'
                  }
                >
                  {p}
                </p>
              ))}
            </div>
            )}
          </>
        )}

        {/* Metrics */}
        <div className="mt-10 grid grid-cols-3 gap-10 border-t border-pf-hairline pt-9 max-[640px]:grid-cols-1 max-[640px]:gap-6">
          {content.metrics.map((m) => (
            <div key={m.label}>
              {m.value ? (
                <>
                  <div className="text-[40px] font-semibold leading-none tracking-[-0.02em] text-pf-accent">
                    {m.value}
                  </div>
                  <div className="mt-[14px] text-[15px] text-pf-ink">
                    {m.label}
                  </div>
                </>
              ) : (
                /* Text-only outcome card: the label is the card title */
                <div className="text-[19px] font-medium leading-[1.3] text-pf-ink">
                  {m.label}
                </div>
              )}
              {m.desc && (
                <div className="mt-[8px] text-[13px] leading-[1.55] text-pf-muted">
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

        {/* Chapters — single column: label → title → body → callout → visuals */}
        {content.chapters.map((ch, i) => (
          <section key={i} className="mt-14 border-t border-pf-hairline pb-2 pt-12">
            {ch.kicker && (
              <div className="font-mono-ui text-[12px] font-medium tracking-[0.01em] text-pf-secondary">
                {ch.kicker}
              </div>
            )}
            <h2
              className={`max-w-[900px] text-[28px] font-semibold leading-[1.14] tracking-[-0.02em] ${
                ch.kicker ? 'mt-3' : ''
              }`}
            >
              {ch.heading}
            </h2>
            <div className="mt-7">
                {ch.body.map((p, j) => (
                  <p
                    key={j}
                    className="mb-5 max-w-[900px] text-[17px] leading-[1.72] text-pf-body"
                  >
                    {p}
                  </p>
                ))}

                {ch.conflict && (
                  <div className="mt-[26px] max-w-[900px] rounded-[14px] bg-[rgba(96,104,52,0.10)] px-[26px] py-6">
                    <div className="mb-[10px] font-mono-ui text-[12px] font-medium tracking-[0.01em] text-pf-secondary">
                      {ch.conflict.label}
                    </div>
                    <p className="m-0 text-[20px] font-medium leading-[1.45] text-pf-ink">
                      {ch.conflict.text}
                    </p>
                  </div>
                )}

                {ch.quote && (
                  <Reveal className="my-[30px] max-w-[900px] border-l-[3px] border-pf-accent pl-[22px]">
                    <p className="m-0 text-[23px] font-normal leading-[1.4] text-pf-secondary">
                      {ch.quote.text}
                    </p>
                    <div className="mt-3 font-mono-ui text-[12px] tracking-[0.01em] text-pf-muted">
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

                {ch.summary && (
                  <Reveal className="mt-9 grid max-w-[900px] grid-cols-3 gap-8 max-[640px]:grid-cols-1 max-[640px]:gap-6">
                    {ch.summary.map((c) => (
                      <div key={c.name}>
                        <div className="text-[16px] font-semibold leading-[1.35] text-pf-ink">
                          {c.name}
                        </div>
                        <p className="m-0 mt-[8px] text-[13px] leading-[1.55] text-pf-muted">
                          {c.text}
                        </p>
                      </div>
                    ))}
                  </Reveal>
                )}

                {ch.pipeline && (
                  <Reveal className="mt-6">
                    <PipelineDiagram pipeline={ch.pipeline} />
                  </Reveal>
                )}

                {ch.decisions && (
                  <div className="mt-[14px]">
                    {ch.decisions.map((d) => (
                      <Reveal
                        key={d.num}
                        className="mt-[30px] border-t border-pf-hairline pt-[30px]"
                      >
                        <div className="mb-2 text-[18px] font-medium">
                          {d.name}
                        </div>
                        <p
                          className={`m-0 max-w-[900px] text-[16px] leading-[1.7] text-pf-secondary${
                            d.media ? ' mb-[18px]' : ''
                          }`}
                        >
                          {d.text}
                        </p>
                        {d.media && <Figure media={d.media} />}
                        {d.media2 && (
                          <div className="mt-[18px]">
                            <Figure media={d.media2} />
                          </div>
                        )}
                      </Reveal>
                    ))}
                  </div>
                )}

                {ch.bodyAfter && (
                  <div className="mt-[30px]">
                    {ch.bodyAfter.map((p, j) => (
                      <p
                        key={j}
                        className="mb-5 max-w-[900px] text-[17px] leading-[1.72] text-pf-body"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                )}

                {ch.figures && (
                  <div
                    className={`${
                      ch.figuresRow
                        ? 'grid grid-cols-2 items-start gap-[22px] max-[700px]:grid-cols-1'
                        : 'flex flex-col gap-[22px]'
                    } ${
                      ch.decisions && !ch.bodyAfter ? 'mt-[26px]' : 'mt-[14px]'
                    }`}
                  >
                    {ch.figures.map((f, j) => (
                      <Reveal key={j}>
                        <Figure media={f} />
                      </Reveal>
                    ))}
                  </div>
                )}

                {ch.callout && (
                  <Reveal className="mt-9 max-w-[900px] rounded-[14px] bg-[rgba(96,104,52,0.10)] px-[26px] py-6">
                    {ch.callout.label && (
                      <div className="mb-[10px] font-mono-ui text-[12px] font-medium tracking-[0.01em] text-pf-secondary">
                        {ch.callout.label}
                      </div>
                    )}
                    <p className="m-0 text-[22px] font-medium leading-[1.4] text-pf-ink">
                      {ch.callout.text}
                    </p>
                  </Reveal>
                )}

                {ch.list && (
                  <Reveal className="mt-[26px] max-w-[900px] border-t border-pf-hairline pt-[24px]">
                    <div className="mb-4 font-mono-ui text-[12px] font-medium tracking-[0.01em] text-pf-secondary">
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
                  <Reveal className="mt-[30px] max-w-[900px] border-t border-pf-hairline pt-[26px]">
                    <div className="mb-3 font-mono-ui text-[12px] font-medium tracking-[0.01em] text-pf-secondary">
                      The resolution
                    </div>
                    <p className="m-0 text-[19px] font-medium leading-[1.6] text-pf-ink">
                      {ch.resolution}
                    </p>
                  </Reveal>
                )}
            </div>
          </section>
        ))}

        {/* My involvement */}
        <section className="mt-12 border-t border-pf-hairline pb-20 pt-14">
          <h3 className="m-0 text-[20px] font-semibold tracking-[-0.01em]">
            My involvement
          </h3>
          <p className="m-0 mt-4 max-w-[900px] text-[17px] leading-[1.72] text-pf-body">
            {content.involvement}
          </p>
        </section>
      </div>

      {/* Next project — light band, so the dark footer stays the only CTA */}
      <Link
        href={content.next.href}
        className="group block border-t border-pf-hairline transition-colors hover:bg-pf-chip"
      >
        <div className="mx-auto flex max-w-[1120px] flex-col items-end gap-2 px-10 py-12 max-[640px]:px-6">
          <span className="font-mono-ui text-[12px] tracking-[0.01em] text-pf-muted">
            Next project
          </span>
          <span className="text-right text-[30px] font-medium tracking-[-0.02em] text-pf-ink transition-colors group-hover:text-pf-accent max-[640px]:text-[22px]">
            {content.next.label} →
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
