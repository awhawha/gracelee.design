'use client'

import { useEffect, useRef, useState } from 'react'
import { Icon } from '@/components/Icon'
import { Lightbox } from '@/components/Lightbox'
import type { MediaItem, Para, Project } from '@/lib/projects'

// One image / video / striped placeholder.
// `fit="natural"` → full-width, natural height (mobile inline).
// `fit="contain"` → scaled to fit the pinned panel, border hugging the media.
function MediaEl({
  item,
  onZoom,
  fit,
  preload,
}: {
  item: MediaItem
  onZoom?: (src: string, alt: string) => void
  fit: 'natural' | 'contain'
  preload: 'metadata' | 'none'
}) {
  const alt = item.caption.replace(/^\[VIDEO\]\s*/, '')
  const isVideo = item.kind === 'video'

  const fitClass =
    fit === 'contain'
      ? isVideo
        ? 'max-h-[66vh] w-full object-contain'
        : 'max-h-[66vh] max-w-full w-auto object-contain'
      : 'h-auto w-full'

  if (!item.src) {
    return (
      <div
        className="relative flex w-full items-center justify-center overflow-hidden rounded-[12px] border border-surface-tertiary"
        style={{ height: `${item.height}px` }}
      >
        <div className="absolute inset-0 bg-pf-stripes" aria-hidden />
        <span className="type-cap relative text-tertiary">
          {item.label}
        </span>
      </div>
    )
  }

  if (isVideo) {
    return (
      <video
        className={`rounded-[12px] border border-surface-tertiary bg-black ${fitClass}`}
        controls
        muted
        loop
        playsInline
        preload={preload}
      >
        <source src={item.src} type="video/mp4" />
      </video>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.src}
      alt={alt}
      onClick={onZoom ? () => onZoom(item.src as string, alt) : undefined}
      className={`rounded-[12px] border border-surface-tertiary ${onZoom ? 'cursor-zoom-in' : ''} ${fitClass}`}
    />
  )
}

// The pinned media for the active section. One item shows on its own; several
// become a slide carousel (arrows + dots) so they're never juxtaposed.
function PinnedPanel({
  media,
  onZoom,
}: {
  media: MediaItem[]
  onZoom: (src: string, alt: string) => void
}) {
  const [i, setI] = useState(0)
  if (media.length === 0) return null

  const multi = media.length > 1
  const item = media[i] ?? media[0]

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      {/* image + its caption fade in together on every swap */}
      <div
        key={i}
        className="pf-fade flex w-full flex-col items-center gap-3"
      >
        <MediaEl item={item} onZoom={onZoom} fit="contain" preload="metadata" />
        <p className="type-cap w-full text-tertiary">
          {item.caption}
        </p>
      </div>
      {multi && (
        <div className="flex w-full items-center gap-3">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => setI((p) => (p === 0 ? media.length - 1 : p - 1))}
              className="text-[16px] text-tertiary transition-colors hover:text-primary"
            >
              <Icon name="fa-arrow-left" />
            </button>
            <div className="flex items-center gap-2">
              {media.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Slide ${idx + 1}`}
                  onClick={() => setI(idx)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    idx === i ? 'bg-accent-primary' : 'bg-surface-tertiary'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => setI((p) => (p + 1) % media.length)}
              className="text-[16px] text-tertiary transition-colors hover:text-primary"
            >
              <Icon name="fa-arrow-right" />
            </button>
            <span className="type-cap ml-auto text-tertiary">
              {i + 1} / {media.length}
            </span>
          </div>
        )}
    </div>
  )
}

function Body({ paras }: { paras: Para[] }) {
  return (
    <>
      {paras.map((p, i) => (
        <p key={i} className="type-body mb-[22px] text-secondary">
          {typeof p === 'string' ? (
            p
          ) : (
            <>
              <span className="text-primary">{p.lead}:</span> {p.text}
            </>
          )}
        </p>
      ))}
    </>
  )
}

// Scrollytelling case study: the media panel is pinned on the left and swaps to
// match the narrative section being read on the right. Below 900px it collapses
// to a single column with each section's media inline above its text.
export function ScrollytellingCaseStudy({ project }: { project: Project }) {
  const sections = project.sections ?? []
  const [active, setActive] = useState(0)
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null)
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(Number((e.target as HTMLElement).dataset.idx))
          }
        })
      },
      // A thin (~10vh) band at the vertical center — not zero-height, or a
      // zero-area intersection would never register as "intersecting".
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    refs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const activeMedia = (sections[active]?.media ?? []).map((i) => project.media[i])

  return (
    <div className="mx-auto grid max-w-pf grid-cols-2 items-start gap-16 px-10 pt-10 max-[900px]:block max-[900px]:px-6">
      {/* LEFT — pinned media (desktop); slides when a section has several */}
      <div className="sticky top-[104px] h-[calc(100vh-150px)] max-[900px]:hidden">
        <PinnedPanel
          key={active}
          media={activeMedia}
          onZoom={(src, alt) => setZoom({ src, alt })}
        />
      </div>

      {/* RIGHT — scrolling narrative */}
      <div className="pb-20">
        <div className="type-cap mb-4 text-tertiary">
          {project.client}
        </div>
        <h1 className="type-header mb-6">
          {project.headline ?? project.title}
        </h1>
        <div className="mb-9 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="type-cap rounded-full bg-surface-secondary px-[13px] py-[6px] text-secondary"
            >
              {t}
            </span>
          ))}
        </div>

        {sections.map((s, idx) => (
          <section
            key={idx}
            data-idx={idx}
            ref={(el) => {
              refs.current[idx] = el
            }}
            className="flex min-h-[70vh] flex-col justify-center max-[900px]:min-h-0 max-[900px]:py-6"
          >
            {/* media inline (mobile only) */}
            <div className="mb-6 hidden flex-col gap-4 max-[900px]:flex">
              {s.media.map((mi) => (
                <div key={mi}>
                  <MediaEl
                    item={project.media[mi]}
                    onZoom={(src, alt) => setZoom({ src, alt })}
                    fit="natural"
                    preload="none"
                  />
                  <p className="type-cap mt-[14px] text-tertiary">
                    {project.media[mi].caption}
                  </p>
                </div>
              ))}
            </div>
            <Body paras={s.paras.map((pi) => project.paras[pi])} />
          </section>
        ))}

        {/* metrics */}
        <div className="my-[18px] mb-10 grid grid-cols-3 gap-6 border-y border-surface-tertiary py-7">
          {project.metrics.map((mt) => (
            <div key={mt.label}>
              <div className="type-header-md text-accent-primary">
                {mt.value}
              </div>
              <div className="type-cap mt-1 text-tertiary">{mt.label}</div>
            </div>
          ))}
        </div>
        <h3 className="type-header-sm mb-[14px]">
          My involvement
        </h3>
        <p className="type-body mb-10 text-secondary">
          {project.involvement}
        </p>
        <div className="type-cap mb-4 text-tertiary">
          Live version
        </div>
        <a
          href={project.liveUrl ?? 'https://gracelee.design'}
          target="_blank"
          rel="noopener noreferrer"
          className="type-body-sm flex items-center justify-center gap-2 rounded-[10px] border-[1.5px] border-primary p-4 text-center font-medium text-primary transition-colors hover:bg-primary hover:text-white"
        >
          Visit live case study
          <Icon name="fa-arrow-right" className="-rotate-45" />
        </a>
      </div>

      {zoom && (
        <Lightbox src={zoom.src} alt={zoom.alt} onClose={() => setZoom(null)} />
      )}
    </div>
  )
}
