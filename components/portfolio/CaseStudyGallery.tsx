'use client'

import { useState } from 'react'
import { Lightbox } from '@/components/Lightbox'
import type { MediaItem } from '@/lib/projects'

type ZoomFn = (src: string, alt: string) => void

// One image / video / striped placeholder, at natural aspect ratio.
function Media({ item, onZoom }: { item: MediaItem; onZoom: ZoomFn }) {
  const alt = item.caption.replace(/^\[VIDEO\]\s*/, '')

  if (!item.src) {
    return (
      <div
        className="relative flex w-full items-center justify-center overflow-hidden rounded-[12px] border border-pf-border"
        style={{ height: `${item.height}px` }}
      >
        <div className="absolute inset-0 bg-pf-stripes" aria-hidden />
        <span className="relative font-mono-ui text-[13px] text-pf-placeholder">
          {item.label}
        </span>
        {item.kind === 'video' && (
          <>
            <span className="absolute left-[14px] top-[14px] rounded-[6px] bg-pf-ink px-[10px] py-[5px] font-mono-ui text-[11px] font-semibold tracking-[0.06em] text-white">
              VIDEO
            </span>
            <div className="absolute flex h-[66px] w-[66px] items-center justify-center rounded-full bg-[rgba(35,32,26,0.5)] pl-[5px] text-[22px] text-white">
              ▶
            </div>
          </>
        )}
      </div>
    )
  }

  if (item.kind === 'video') {
    return (
      <video
        className="h-auto w-full rounded-[12px] border border-pf-border bg-black"
        controls
        muted
        loop
        playsInline
        preload="metadata"
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
      className="h-auto w-full cursor-zoom-in rounded-[12px] border border-pf-border"
      onClick={() => onZoom(item.src as string, alt)}
    />
  )
}

// A single media block: media + caption below.
function MediaBlock({ item, onZoom }: { item: MediaItem; onZoom: ZoomFn }) {
  return (
    <div>
      <Media item={item} onZoom={onZoom} />
      <p className="mt-[14px] text-[14px] leading-[1.6] text-pf-muted">
        {item.caption}
      </p>
    </div>
  )
}

// Several related media shown one at a time, with a fade between slides.
function MediaCarousel({ items, onZoom }: { items: MediaItem[]; onZoom: ZoomFn }) {
  const [i, setI] = useState(0)
  const item = items[i] ?? items[0]

  return (
    <div>
      <div key={i} className="pf-fade">
        <Media item={item} onZoom={onZoom} />
      </div>
      <p className="mt-[14px] text-[14px] leading-[1.6] text-pf-muted">
        {item.caption}
      </p>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => setI((p) => (p === 0 ? items.length - 1 : p - 1))}
          className="text-[18px] text-pf-muted transition-colors hover:text-pf-ink"
        >
          ←
        </button>
        <div className="flex items-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Slide ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-2 w-2 rounded-full transition-colors ${
                idx === i ? 'bg-pf-accent' : 'bg-pf-border'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => setI((p) => (p + 1) % items.length)}
          className="text-[18px] text-pf-muted transition-colors hover:text-pf-ink"
        >
          →
        </button>
        <span className="ml-auto font-mono-ui text-[12px] text-pf-muted">
          {i + 1} / {items.length}
        </span>
      </div>
    </div>
  )
}

// Group consecutive media that share a `group` id into one carousel.
function groupMedia(media: MediaItem[]): MediaItem[][] {
  const groups: MediaItem[][] = []
  for (const m of media) {
    const last = groups[groups.length - 1]
    if (m.group && last && last[0].group === m.group) {
      last.push(m)
    } else {
      groups.push([m])
    }
  }
  return groups
}

// Left-column media gallery. Real images open in a lightbox on click; grouped
// media become slide carousels; everything else is a single stacked block.
export function CaseStudyGallery({ media }: { media: MediaItem[] }) {
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null)
  const onZoom: ZoomFn = (src, alt) => setZoom({ src, alt })
  const groups = groupMedia(media)

  return (
    <div className="flex flex-col gap-10 max-[900px]:order-2">
      {groups.map((g, i) =>
        g.length > 1 ? (
          <MediaCarousel key={i} items={g} onZoom={onZoom} />
        ) : (
          <MediaBlock key={i} item={g[0]} onZoom={onZoom} />
        ),
      )}

      {zoom && (
        <Lightbox src={zoom.src} alt={zoom.alt} onClose={() => setZoom(null)} />
      )}
    </div>
  )
}
