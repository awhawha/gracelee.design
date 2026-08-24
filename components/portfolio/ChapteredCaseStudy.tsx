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
import { CaseStudyShell } from '@/components/portfolio/CaseStudyShell'
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
      <p className={`mt-3 font-inter leading-[1.55] text-pf-muted ${captionSize}`}>
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
      <p className="mt-3 max-w-[900px] font-inter text-[13px] leading-[1.55] text-pf-muted">
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
      <CaseStudyShell meta={content.meta} link={content.link}>
        {/* Hero */}
        {content.eyebrow && (
          <div className="mb-[26px] font-mono-ui text-[12px] font-medium tracking-[0.01em] text-pf-secondary">
            {content.eyebrow}
          </div>
        )}
        <h1 className="m-0 text-[50px] font-semibold leading-[1.05] tracking-[-0.03em] max-[900px]:text-[clamp(34px,7vw,50px)]">
          {content.title}
        </h1>

        {/* Photographic hero: sits directly under the title, unframed — the
            shot carries its own edges, so a border would read as a second one */}
        {content.heroImage && content.heroImageFirst && (
          <div className="mt-9 overflow-hidden rounded-[16px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={content.heroImage.img}
              alt={content.heroImage.alt ?? content.heroImage.caption}
              onClick={() =>
                setZoom({
                  src: content.heroImage!.img as string,
                  alt: content.heroImage!.alt ?? content.heroImage!.caption,
                })
              }
              className="block w-full cursor-zoom-in"
            />
          </div>
        )}

        {content.subhead && (
          <p className="mt-[22px] max-w-[780px] text-[20px] leading-[1.5] text-pf-secondary">
            {content.subhead}
          </p>
        )}

        {content.heroCompact ? (
          /* Compact hero: a labeled Summary under the title, tags below it.
             Heading and body match the chapters, so the page reads as one
             sequence of sections rather than a dek followed by chapters. */
          <>
            {tldrParas.length > 0 && (
            <div className="mt-12 max-w-[900px]">
              <h2 className="m-0 text-[28px] font-semibold leading-[1.14] tracking-[-0.02em]">
                Summary
              </h2>
              <div className="mt-6">
                {tldrParas.map((p, i) => (
                  <p
                    key={i}
                    className="mb-5 font-inter text-[16px] leading-[1.7] text-pf-body"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
            )}
            {content.tags.length > 0 && (
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
            )}
          </>
        ) : (
          <>
            {content.tags.length > 0 && (
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
            )}

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

        {/* Metrics — omitted when a case study carries its outcomes in a chapter */}
        {content.metrics.length > 0 && (
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
        )}

        {/* Hero image — framed, below the metrics (unless it opened the page) */}
        {content.heroImage && !content.heroImageFirst && (
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
                    className="mb-5 max-w-[900px] font-inter text-[16px] leading-[1.7] text-pf-body"
                  >
                    {p}
                  </p>
                ))}

                {ch.conflict && (
                  /* Tinted box, body-sized copy: the label carries the emphasis
                     (same h3 as "My involvement"), not the paragraph. */
                  <div className="mt-[26px] max-w-[900px] rounded-[14px] bg-[rgba(96,104,52,0.10)] px-[26px] py-6">
                    <h3 className="m-0 mb-[10px] text-[20px] font-semibold tracking-[-0.01em] text-pf-ink">
                      {ch.conflict.label}
                    </h3>
                    <p className="m-0 font-inter text-[16px] leading-[1.7] text-pf-body">
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
                      <p className="mt-3 font-inter text-[13px] leading-[1.55] text-pf-muted">
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
                        <p className="m-0 mt-[8px] font-inter text-[13px] leading-[1.55] text-pf-muted">
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
                    {/* Group label sits a level above the item names: 20 → 18 */}
                    {ch.decisionsTitle && (
                      <h3 className="m-0 mt-9 text-[20px] font-semibold tracking-[-0.01em]">
                        {ch.decisionsTitle}
                      </h3>
                    )}
                    {ch.decisions.map((d, k) => (
                      <Reveal
                        key={d.num}
                        /* The rule separates items, so the first one goes without */
                        className={
                          k === 0
                            ? 'mt-5'
                            : 'mt-6 border-t border-pf-hairline pt-6'
                        }
                      >
                        <h4 className="m-0 mb-[6px] text-[18px] font-semibold">
                          {d.name}
                        </h4>
                        <p
                          className={`m-0 max-w-[900px] font-inter text-[16px] leading-[1.7] text-pf-secondary${
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
                        className="mb-5 max-w-[900px] font-inter text-[16px] leading-[1.7] text-pf-body"
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
                  /* Bulleted list: anything before the first colon reads as the
                     item's name, so it is set in ink to carry the scan. */
                  <Reveal className="mt-[26px] max-w-[900px] border-t border-pf-hairline pt-[24px]">
                    <h3 className="m-0 mb-4 text-[20px] font-semibold tracking-[-0.01em]">
                      {ch.list.title}
                    </h3>
                    <ul className="m-0 list-disc space-y-3 pl-5 marker:text-pf-accent">
                      {ch.list.items.map((item) => {
                        const at = item.indexOf(':')
                        const lead = at > 0 ? item.slice(0, at) : null
                        const rest = at > 0 ? item.slice(at + 1).trim() : item
                        return (
                          <li
                            key={item}
                            className="pl-1 font-inter text-[16px] leading-[1.7] text-pf-body"
                          >
                            {lead && (
                              <span className="font-semibold text-pf-ink">
                                {lead}:{' '}
                              </span>
                            )}
                            {rest}
                          </li>
                        )
                      })}
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
          <p className="m-0 mt-4 max-w-[900px] font-inter text-[16px] leading-[1.7] text-pf-body">
            {content.involvement}
          </p>
        </section>
      </CaseStudyShell>

      {/* Next project — light band, so the dark footer stays the only CTA */}
      <Link
        href={content.next.href}
        className="group block border-t border-pf-hairline transition-colors hover:bg-pf-chip"
      >
        <div className="mx-auto flex max-w-[1280px] flex-col items-end gap-2 px-10 py-12 max-[640px]:px-6">
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
