import Image from 'next/image'

import { FileHead, displayFont } from '@/components/home/FileHead'
import { LineIcon } from '@/components/home/icons'
import { LoopVideo } from '@/components/home/LoopVideo'
import { MuseumThumb } from '@/components/home/MuseumThumb'
import { PivotThumb } from '@/components/home/PivotThumb'
import { DesignSystemThumb } from '@/components/home/DesignSystemThumb'
import { Reveal } from '@/components/home/Reveal'
import { TransitionLink } from '@/components/portfolio/PageTransition'
import { caseStudyHref, getFeaturedWork } from '@/lib/homeContent'

const cardHover =
  'transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-[5px] hover:border-[#dcb7cf] hover:shadow-[0_26px_60px_rgba(40,16,34,0.09)] motion-reduce:transition-none motion-reduce:hover:translate-y-0'

function Chips({ items, className = '', dark = false }: { items: string[]; className?: string; dark?: boolean }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className={`rounded-full px-2.5 py-1 text-[12px] font-medium ${dark ? 'bg-[#AB5998]/25 text-[#F6E4F1]' : 'bg-brand-pink text-brand-accent'}`}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

function StudyLink({ href, label }: { href: string | null; label: string }) {
  if (!href) {
    return (
      <p className="font-space text-[12px] uppercase tracking-[0.14em] text-brand-muted">
        Case study coming soon
      </p>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 font-semibold text-brand-accent transition-[gap] duration-200 group-hover:gap-[11px] motion-reduce:transition-none">
      {label}
      <LineIcon name="arrow" />
    </span>
  )
}

const cards: {
  id: string
  /** Project id for the case-study link when it differs from the card id. */
  caseStudyId?: string
  badge: string
  title: string
  body: string
  chips: string[]
  image?: { src: string; alt: string; width: number; height: number }
  video?: { src: string; label: string }
  /** Illustration already has its own background/window: fill the whole media area, no inset frame. */
  fullBleed?: boolean
  delay: 0 | 1 | 2
}[] = [
  {
    // Case study lives at /work/pivot (PivotCaseStudy).
    id: 'error-analysis',
    caseStudyId: 'pivot',
    badge: 'ML Explainability',
    title: 'Prediction Error Analysis',
    body: "Turned black-box model errors into clear explanations, giving analysts the confidence to fix weak segments in-product.",
    chips: ['Data Visualization', 'Research Synthesis', 'Interaction Design'],
    image: {
      src: '/home/pivot/table.png',
      alt: 'Illustration: a pivot table flags a weak segment, then compares it with the overall model',
      width: 1360,
      height: 1100,
    },
    fullBleed: true,
    delay: 0,
  },
  {
    id: 'museum',
    badge: 'AI-native · 0→1',
    title: 'Museum of Children’s Books',
    body: 'Designed and shipped an AI-assisted museum solo, giving one curator the capacity to publish each book in 2–3 hours instead of 7–11.',
    chips: ['Human-in-the-Loop', 'Design + Build', 'Content Systems'],
    image: {
      src: '/home/museum-thumb.png',
      alt: 'Illustration: a picture-book gallery with an AI research panel and a draft awaiting review',
      width: 1440,
      height: 990,
    },
    fullBleed: true,
    delay: 1,
  },
  {
    // Case study lives at /work/dotds. /design-system is an older longform page.
    id: 'dotds',
    badge: 'Design Systems',
    title: 'dotData Design System',
    body: 'Unified three handoff tools into one token-driven Figma system, adopted across the enterprise product, cutting design-spec and audit tickets by two-thirds.',
    chips: ['Design Tokens', 'Design–Eng Handoff', 'Governance'],
    fullBleed: true,
    image: {
      src: '/home/design-system.jpg',
      alt: 'Table card states and token system',
      width: 1590,
      height: 820,
    },
    delay: 2,
  },
]

function WorkCard({ card }: { card: (typeof cards)[number] }) {
  const href = caseStudyHref(card.caseStudyId ?? card.id)
  const body = (
    <>
      <div className="relative flex aspect-[16/11] flex-col overflow-hidden border-b border-brand-line bg-[linear-gradient(160deg,#F6E4F1_0%,#FDFAFC_100%)]">
        <span className="relative z-[1] mx-5 mt-5 self-start rounded-full bg-brand-dark px-3 py-[5px] font-space text-[10.5px] font-medium uppercase tracking-[0.12em] text-white">
          {card.badge}
        </span>
        {card.fullBleed && card.image ? (
          card.id === 'museum' ? (
            <MuseumThumb alt={card.image.alt} />
          ) : card.id === 'error-analysis' ? (
            <PivotThumb alt={card.image.alt} />
          ) : card.id === 'dotds' ? (
            <DesignSystemThumb alt={card.image.alt} />
          ) : (
            <Image
              src={card.image.src}
              alt={card.image.alt}
              fill
              sizes="(min-width: 1000px) 360px, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          )
        ) : (
        <div className="relative mx-6 mt-4 flex-1 overflow-hidden rounded-t-[12px] border border-b-0 border-brand-line bg-white shadow-[0_10px_30px_-12px_rgba(40,16,34,0.35)] transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
          {card.video ? (
            <LoopVideo
              src={card.video.src}
              label={card.video.label}
              className="absolute inset-0 h-full w-full object-cover object-left-top"
            />
          ) : card.image ? (
            <Image
              src={card.image.src}
              alt={card.image.alt}
              fill
              sizes="(min-width: 1000px) 360px, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-left-top"
            />
          ) : null}
        </div>
        )}
      </div>
      <div className="flex flex-1 flex-col px-6 pb-[26px] pt-6">
        <h3 className={`${displayFont} mb-2.5 text-[20px] leading-[1.3]`}>{card.title}</h3>
        <p className="text-[14px] leading-[1.6] text-brand-body">{card.body}</p>
        <Chips items={card.chips} className="mt-3.5" />
        <div className="mt-auto pt-6 text-[14px]">
          <StudyLink href={href} label="View case study" />
        </div>
      </div>
    </>
  )

  const className = `group flex h-full flex-col overflow-hidden rounded-[24px] border border-brand-line bg-white outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent ${cardHover}`

  return (
    <Reveal delay={card.delay} className="h-full">
      {href ? (
        <TransitionLink href={href} className={className}>
          {body}
        </TransitionLink>
      ) : (
        <article className={className}>{body}</article>
      )}
    </Reveal>
  )
}

function FeaturedWork() {
  const featured = getFeaturedWork()
  if (!featured) return null

  const className = `group mt-14 grid grid-cols-1 items-start gap-11 rounded-[22px] border border-white/10 bg-brand-dark p-6 text-white outline-none min-[641px]:rounded-[28px] min-[641px]:p-11 min-[1001px]:grid-cols-[1.2fr_1fr] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent ${cardHover}`
  const inner = (
    <>
      <div>
        <span className="font-space text-[11px] uppercase tracking-[0.14em] text-[#E59BD3]">
          Featured · {featured.eyebrow}
        </span>
        <h3 className={`${displayFont} mb-5 mt-4 text-[clamp(22px,2vw,28px)] leading-[1.25] text-white`}>
          {featured.title}
        </h3>
        <p className="text-[15px] leading-[1.7] text-[#d9c6d3]">{featured.summary}</p>
        {featured.role ? (
          <p className="mt-7 font-space text-[13px] font-bold text-white">{featured.role}</p>
        ) : null}
        {featured.metrics.length ? (
          <p className="mb-7 mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 text-[13px] text-[#b9a3b3]">
            {featured.metrics.map((m, i) => (
              <span key={m.label} className="flex items-baseline gap-x-3.5">
                {i > 0 ? (
                  <span className="text-white/30" aria-hidden>
                    ·
                  </span>
                ) : null}
                <span>
                  <b className="mr-1 font-space text-[13px] font-bold text-white">{m.value}</b>
                  {m.label}
                </span>
              </span>
            ))}
          </p>
        ) : null}
        <Chips items={featured.tags} className="mt-0" dark />
        <div className="mt-8 text-[15px] [&>span]:text-[#E59BD3]">
          <StudyLink href={featured.href} label="Read the full case study" />
        </div>
      </div>
      <div className="flex flex-col gap-5">
      {featured.image ? (
        <Image
          src={featured.image.img}
          alt={featured.image.alt}
          width={featured.image.width}
          height={featured.image.height}
          sizes="(min-width: 1000px) 520px, 100vw"
          className="h-auto w-full rounded-[14px] border border-white/10 bg-brand-dark object-cover"
        />
      ) : null}
        {featured.quote ? (
          <figure className="rounded-[14px] border border-white/10 bg-white/[0.04] p-6">
            <blockquote className="border-l-2 border-[#E59BD3] pl-4 text-[15px] leading-[1.6] italic text-white">
              “{featured.quote.text}”
            </blockquote>
            <figcaption className="mt-3 pl-4 font-space text-[11px] uppercase tracking-[0.12em] text-[#b9a3b3]">
              — {featured.quote.source}
            </figcaption>
          </figure>
        ) : null}
      </div>
    </>
  )

  return (
    <Reveal>
      {featured.href ? (
        <TransitionLink href={featured.href} className={className}>
          {inner}
        </TransitionLink>
      ) : (
        <article className={className}>{inner}</article>
      )}
    </Reveal>
  )
}

export function WorkSection() {
  return (
    <section
      id="work"
      className="relative scroll-mt-12 border-t border-brand-line pb-[88px] pt-[140px] min-[641px]:pb-[120px]"
    >
      <FileHead label="work/" color="#e6c07b" tone="light" />
      <div className="mx-auto w-full max-w-[1320px] px-5 min-[641px]:px-8">
        <Reveal>
          <span className="mb-3.5 block font-space text-[12px] uppercase tracking-[0.16em] text-brand-accent">
            ~/work <span className="text-brand-muted">— ls</span>
          </span>
          <h2 className={`${displayFont} text-[clamp(34px,4.2vw,52px)]`}>Selected Work</h2>
        </Reveal>

        <FeaturedWork />

        <div className="mt-[22px] grid grid-cols-1 gap-[22px] min-[641px]:grid-cols-2 min-[1001px]:grid-cols-3">
          {cards.map((card) => (
            <WorkCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}
