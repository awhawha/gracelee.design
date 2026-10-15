import Image from 'next/image'

import { FileHead, displayFont, homeWrap } from '@/components/home/FileHead'
import { LineIcon } from '@/components/home/icons'
import { LoopVideo } from '@/components/home/LoopVideo'
import { Reveal } from '@/components/home/Reveal'
import { TransitionLink } from '@/components/portfolio/PageTransition'
import { caseStudyHref, getFeaturedWork } from '@/lib/homeContent'

const cardHover =
  'transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-[5px] hover:border-[#dcb7cf] hover:shadow-[0_26px_60px_rgba(40,16,34,0.09)] motion-reduce:transition-none motion-reduce:hover:translate-y-0'

function Chips({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full bg-brand-pink px-2.5 py-1 text-[12px] font-medium text-brand-accent"
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
  badge: string
  title: string
  body: string
  statLead: string
  statRest: string
  chips: string[]
  image?: { src: string; alt: string; width: number; height: number }
  video?: { src: string; label: string }
  delay: 0 | 1 | 2
}[] = [
  {
    // No project id on main, so caseStudyHref stays null and the card is not a link.
    id: 'error-analysis',
    badge: 'Model Explainability',
    title: 'Prediction Error Analysis',
    body: "Designed a pivot table that takes users from 'the model is weak here' to what to do about it — and found that guidance depended on segmentation, so the team shipped that foundation first.",
    statLead: 'v11.1',
    statRest: ' shipped as MVP',
    chips: ['Data Visualization', 'AI/ML UX', 'Explainability'],
    video: {
      src: '/home/pivot-captioned.mp4',
      label: 'Building a pivot table',
    },
    delay: 0,
  },
  {
    id: 'museum',
    badge: '0 → 1 · AI Workflow',
    title: 'Museum of Children’s Books',
    body: 'Designed and built a picture-book museum solo — with an AI Studio that gathers evidence and drafts while I review every paragraph — cutting each book from 7–11h to ~2–3h.',
    statLead: '7–11h → ~2–3h',
    statRest: ' per book · 33 of 71 live · 328 visitors · ~5 min',
    chips: ['AI Product', 'Human-in-the-Loop', 'Design + Build'],
    image: {
      src: '/home/museum.jpg',
      alt: 'Museum of Children’s Books homepage',
      width: 1020,
      height: 800,
    },
    delay: 1,
  },
  {
    // Case study lives at /work/dotds. /design-system is an older longform page.
    id: 'dotds',
    badge: 'Design System',
    title: 'dotData Design System',
    body: 'Consolidated handoff scattered across Sketch, Zeplin, and InVision into one token-driven Figma system — so engineers could self-serve specs in Dev Mode, and spec questions dropped from weekly to monthly.',
    statLead: 'Weekly → monthly',
    statRest: ' spec questions',
    chips: ['Design Systems', 'Design Tokens', 'Design–Eng Handoff'],
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
  const href = caseStudyHref(card.id)
  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(135deg,var(--brand-pink),#ece3fa)]">
        {card.video ? (
          <LoopVideo
            src={card.video.src}
            label={card.video.label}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : card.image ? (
          <Image
            src={card.image.src}
            alt={card.image.alt}
            fill
            sizes="(min-width: 1000px) 360px, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : null}
        <span className="absolute left-3.5 top-3.5 z-[1] rounded-full border border-brand-line bg-white/90 px-2.5 py-[5px] font-space text-[11px] uppercase tracking-[0.14em] text-brand-accent backdrop-blur-[6px]">
          {card.badge}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-6 pb-[26px] pt-6">
        <h3 className={`${displayFont} mb-2.5 text-[22px]`}>{card.title}</h3>
        <p className="flex-1 text-[15px] text-brand-body">{card.body}</p>
        <p className="mt-3.5 font-space text-[13px] text-brand-ink">
          <b className="font-bold text-brand-accent">{card.statLead}</b>
          {card.statRest}
        </p>
        <Chips items={card.chips} className="mb-[18px] mt-3.5" />
        <StudyLink href={href} label="View case study" />
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

  const className = `group mt-14 grid grid-cols-1 items-start gap-11 rounded-[22px] border border-brand-line bg-white p-6 outline-none min-[641px]:rounded-[28px] min-[641px]:p-11 min-[1001px]:grid-cols-[1fr_1.05fr] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent ${cardHover}`
  const inner = (
    <>
      <div>
        <span className="font-space text-[11px] uppercase tracking-[0.14em] text-brand-accent">
          Featured · {featured.eyebrow}
        </span>
        <h3 className={`${displayFont} mb-3.5 mt-3 text-[clamp(26px,2.6vw,34px)]`}>
          {featured.title}
        </h3>
        <p className="text-brand-body">{featured.summary}</p>
        {featured.role || featured.metric ? (
          <p className="my-[22px] flex flex-wrap items-baseline gap-x-3.5 gap-y-1.5 text-sm text-brand-muted">
            {featured.role ? (
              <span>
                <b className="mr-1 font-space text-[15px] font-bold text-brand-ink">
                  {featured.role}
                </b>
              </span>
            ) : null}
            {featured.role && featured.metric ? (
              <span className="text-[#d9b6cf]" aria-hidden>
                ·
              </span>
            ) : null}
            {featured.metric ? (
              <span>
                <b className="mr-1 font-space text-[15px] font-bold text-brand-ink">
                  {featured.metric.value}
                </b>
                {featured.metric.label}
              </span>
            ) : null}
          </p>
        ) : null}
        <Chips items={featured.tags} className="mt-3" />
        <div className="mt-[26px]">
          <StudyLink href={featured.href} label="Read the full case study" />
        </div>
      </div>
      {featured.image ? (
        <Image
          src={featured.image.img}
          alt={featured.image.alt}
          width={featured.image.width}
          height={featured.image.height}
          sizes="(min-width: 1000px) 520px, 100vw"
          className="h-auto w-full rounded-[14px] border border-brand-line bg-brand-dark object-cover"
        />
      ) : null}
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
      <div className={homeWrap}>
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
