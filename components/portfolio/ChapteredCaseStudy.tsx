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
import { Icon } from '@/components/Icon'
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
}: {
  media: CaseMedia
  ratio?: string
  radius?: string
}) {
  const onZoom = useContext(ZoomContext)
  const frameRatio = media.ratio ?? ratio
  const bgClass = media.img
    ? media.bg === 'white'
      ? 'bg-surface-primary'
      : media.bg === 'gradient'
        ? 'bg-[#dddfae] bg-pf-paper'
        : 'bg-[#d8dac9]'
    : 'bg-pf-stripes'

  return (
    <div style={{ maxWidth: media.maxW }}>
      {media.title && (
        <div className="type-body-sm mb-2 font-medium text-secondary">
          {media.title}
        </div>
      )}
      <div
        className={`relative flex w-full items-center justify-center overflow-hidden border border-surface-tertiary ${radius} ${bgClass}`}
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
            <span className="type-cap text-tertiary">
              {media.label}
            </span>
            {media.isVideo && (
              <>
                <span className="type-cap absolute left-3 top-3 rounded-[5px] bg-primary px-2 py-1 font-semibold text-white">
                  VIDEO
                </span>
                <div className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(35,32,26,0.5)] pl-0.5 text-[20px] text-white">
                  <Icon name="fa-play" />
                </div>
              </>
            )}
          </>
        )}
      </div>
      <p className="type-cap mt-3 text-tertiary">
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
      <div className="type-body-sm mb-2 font-medium text-secondary">
        {media.label}
      </div>
      <div
        className="relative flex w-full items-center justify-center overflow-hidden rounded-[12px] border border-surface-tertiary bg-[#dddfae] bg-pf-paper"
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
  agent: 'bg-accent-tertiary text-secondary',
  surface: 'border border-surface-tertiary bg-surface-primary text-secondary',
  human: 'bg-accent-primary text-white',
}

function PipelineDiagram({ pipeline }: { pipeline: CasePipeline }) {
  const { lanes, steps } = pipeline
  const cols = `132px repeat(${steps.length}, minmax(0, 1fr))`

  return (
    <>
    <div className="rounded-[14px] border border-surface-tertiary bg-surface-secondary px-6 py-7 max-[640px]:px-4 max-[640px]:py-5">
      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          {/* Steps — the sequence, with human gates called out above the chip */}
          <div className="grid items-end gap-x-3" style={{ gridTemplateColumns: cols }}>
            <div />
            {steps.map((s, i) => (
              <div key={s.name} className="flex items-end">
                <div className="flex-1">
                  {s.checkpoint && (
                    <div className="type-cap mb-[8px] text-center font-semibold uppercase text-accent-primary">
                      {s.checkpoint}
                    </div>
                  )}
                  <div
                    className={`type-cap rounded-full bg-surface-primary px-3 py-[9px] text-center font-medium text-primary ${
                      s.checkpoint
                        ? 'border-[1.5px] border-accent-primary'
                        : 'border border-surface-tertiary'
                    }`}
                  >
                    {s.name}
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <span className="pb-[9px] pl-2 text-[13px] text-accent-primary">
                    <Icon name="fa-arrow-right" />
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
              <div className="type-cap flex items-center justify-end pr-2 text-right text-secondary">
                {lane.name}
              </div>
              {steps.map((s) => {
                const act = s.acts.find((a) => a.lane === lane.key)
                return (
                  <div key={s.name} className="flex items-center">
                    {act ? (
                      <div
                        className={`type-cap w-full rounded-[10px] px-3 py-[11px] ${LANE_FILL[lane.tone]}`}
                      >
                        {act.text}
                      </div>
                    ) : (
                      /* Idle lane — a hairline keeps the track continuous */
                      <div className="h-px w-full bg-surface-tertiary" />
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
      <p className="type-cap mt-3 max-w-[900px] text-tertiary">
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
    <div className="font-sans text-primary">
      <CaseStudyShell meta={content.meta} link={content.link}>
        {/* Hero */}
        {content.eyebrow && (
          <div className="type-cap mb-[26px] font-medium text-secondary">
            {content.eyebrow}
          </div>
        )}
        <h1 className="type-header m-0">
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
          <p className="type-body-lg mt-[22px] max-w-[780px] text-secondary">
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
              <h2 className="type-header-md m-0">
                Summary
              </h2>
              <div className="mt-6">
                {tldrParas.map((p, i) => (
                  <p
                    key={i}
                    className="type-body-sm mb-5 text-secondary"
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
                    className="type-cap rounded-full bg-surface-secondary px-[13px] py-[6px] text-secondary"
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
                    className="type-cap rounded-full bg-surface-secondary px-[13px] py-[6px] text-secondary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* In short / TL;DR */}
            {tldrParas.length > 0 && (
            <div className="mt-9 max-w-[900px]">
              <div className="type-cap mb-3 font-medium text-secondary">
                In short
              </div>
              {tldrParas.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? 'type-body-lg m-0 font-medium text-primary'
                      : 'type-body m-0 mt-4 text-secondary'
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
          <div className="mt-10 grid grid-cols-3 gap-10 border-t border-surface-tertiary pt-9 max-[640px]:grid-cols-1 max-[640px]:gap-6">
            {content.metrics.map((m) => (
              <div key={m.label}>
                {m.value ? (
                  <>
                    <div className="type-header-md text-accent-primary">
                      {m.value}
                    </div>
                    <div className="type-cap mt-[14px] text-primary">
                      {m.label}
                    </div>
                  </>
                ) : (
                  /* Text-only outcome card: the label is the card title */
                  <div className="type-header-sm text-primary">
                    {m.label}
                  </div>
                )}
                {m.desc && (
                  <div className="type-cap mt-[8px] text-tertiary">
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
            />
          </div>
        )}

        {/* Chapters — single column: label → title → body → callout → visuals */}
        {content.chapters.map((ch, i) => (
          <section key={i} className="mt-14 border-t border-surface-tertiary pb-2 pt-12">
            {ch.kicker && (
              <div className="type-cap font-medium text-secondary">
                {ch.kicker}
              </div>
            )}
            <h2
              className={`type-header-md max-w-[900px] ${
                ch.kicker ? 'mt-3' : ''
              }`}
            >
              {ch.heading}
            </h2>
            <div className="mt-7">
                {ch.body.map((p, j) => (
                  <p
                    key={j}
                    className="type-body-sm mb-5 max-w-[900px] text-secondary"
                  >
                    {p}
                  </p>
                ))}

                {ch.conflict && (
                  /* Tinted box, body-sized copy: the label carries the emphasis
                     (same h3 as "My involvement"), not the paragraph. */
                  <div className="mt-[26px] max-w-[900px] rounded-[14px] bg-accent-tertiary px-[26px] py-6">
                    <h3 className="type-header-sm m-0 mb-[10px] text-primary">
                      {ch.conflict.label}
                    </h3>
                    <p className="type-body-sm m-0 text-secondary">
                      {ch.conflict.text}
                    </p>
                  </div>
                )}

                {ch.quote && (
                  <Reveal className="my-[30px] max-w-[900px] border-l-[3px] border-accent-primary pl-[22px]">
                    <p className="type-body-lg m-0 text-secondary">
                      {ch.quote.text}
                    </p>
                    <div className="type-cap mt-3 text-tertiary">
                      {ch.quote.who}
                    </div>
                  </Reveal>
                )}

                {ch.beforeAfter && (
                  <Reveal className="mt-[14px]">
                    <div className="grid grid-cols-[1fr_32px_1fr] items-end gap-3 max-[700px]:grid-cols-1">
                      <BeforeAfterSide media={ch.beforeAfter.before} />
                      <div className="self-center text-center text-[20px] text-accent-primary max-[700px]:justify-self-center max-[700px]:rotate-90">
                        <Icon name="fa-arrow-right" />
                      </div>
                      <BeforeAfterSide media={ch.beforeAfter.after} />
                    </div>
                    {ch.beforeAfter.caption && (
                      <p className="type-cap mt-3 text-tertiary">
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
                        <div className="type-header-sm text-primary">
                          {c.name}
                        </div>
                        <p className="type-cap m-0 mt-[8px] text-tertiary">
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
                      <h3 className="type-header-sm m-0 mt-9">
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
                            : 'mt-6 border-t border-surface-tertiary pt-6'
                        }
                      >
                        <h4 className="type-header-sm m-0 mb-[6px]">
                          {d.name}
                        </h4>
                        <p
                          className={`type-body-sm m-0 max-w-[900px] text-secondary${
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
                        className="type-body-sm mb-5 max-w-[900px] text-secondary"
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
                  <Reveal className="mt-9 max-w-[900px] rounded-[14px] bg-accent-tertiary px-[26px] py-6">
                    {ch.callout.label && (
                      <div className="type-cap mb-[10px] font-medium text-secondary">
                        {ch.callout.label}
                      </div>
                    )}
                    <p className="type-body-lg m-0 font-medium text-primary">
                      {ch.callout.text}
                    </p>
                  </Reveal>
                )}

                {ch.list && (
                  /* Bulleted list: anything before the first colon reads as the
                     item's name, so it is set in ink to carry the scan. */
                  <Reveal className="mt-[26px] max-w-[900px] border-t border-surface-tertiary pt-[24px]">
                    <h3 className="type-header-sm m-0 mb-4">
                      {ch.list.title}
                    </h3>
                    <ul className="m-0 list-disc space-y-3 pl-5 marker:text-accent-primary">
                      {ch.list.items.map((item) => {
                        const at = item.indexOf(':')
                        const lead = at > 0 ? item.slice(0, at) : null
                        const rest = at > 0 ? item.slice(at + 1).trim() : item
                        return (
                          <li
                            key={item}
                            className="type-body-sm pl-1 text-secondary"
                          >
                            {lead && (
                              <span className="font-semibold text-primary">
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
                  <Reveal className="mt-[30px] max-w-[900px] border-t border-surface-tertiary pt-[26px]">
                    <div className="type-cap mb-3 font-medium text-secondary">
                      The resolution
                    </div>
                    <p className="type-body m-0 font-medium text-primary">
                      {ch.resolution}
                    </p>
                  </Reveal>
                )}
            </div>
          </section>
        ))}

        {/* My involvement */}
        <section className="mt-12 border-t border-surface-tertiary pb-20 pt-14">
          <h3 className="type-header-sm m-0">
            My involvement
          </h3>
          <p className="type-body-sm m-0 mt-4 max-w-[900px] text-secondary">
            {content.involvement}
          </p>
        </section>
      </CaseStudyShell>

      {/* Prev / next — light band, so the dark footer stays the only CTA */}
      <nav className="border-t border-surface-tertiary">
        <div className="mx-auto flex max-w-[1280px] items-start justify-between gap-8 px-10 py-12 max-[640px]:flex-col max-[640px]:gap-8 max-[640px]:px-6">
          <Link
            href={content.prev.href}
            className="group min-w-0 max-w-[22rem] max-[640px]:max-w-none"
          >
            <span className="type-cap block text-tertiary">
              Previous project
            </span>
            <span className="type-header-md mt-2 inline-flex items-center gap-2 text-primary transition-colors group-hover:text-accent-primary">
              <Icon name="fa-arrow-left" />
              {content.prev.label}
            </span>
          </Link>
          <Link
            href={content.next.href}
            className="group min-w-0 max-w-[22rem] text-right max-[640px]:max-w-none max-[640px]:self-end"
          >
            <span className="type-cap block text-tertiary">
              Next project
            </span>
            <span className="type-header-md mt-2 inline-flex items-center justify-end gap-2 text-primary transition-colors group-hover:text-accent-primary">
              {content.next.label}
              <Icon name="fa-arrow-right" />
            </span>
          </Link>
        </div>
      </nav>

      {zoom && (
        <Lightbox src={zoom.src} alt={zoom.alt} onClose={() => setZoom(null)} />
      )}
    </div>
    </ZoomContext.Provider>
  )
}
