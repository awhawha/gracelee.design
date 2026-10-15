import Image from 'next/image'

import { FileHead, displayFont, homeWrap } from '@/components/home/FileHead'
import { LineIcon } from '@/components/home/icons'
import { LoopVideo } from '@/components/home/LoopVideo'
import { Reveal } from '@/components/home/Reveal'
import { TransitionLink } from '@/components/portfolio/PageTransition'
import { caseStudyHref } from '@/lib/homeContent'

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

function StudyLink({ href }: { href: string | null }) {
  if (!href) {
    return (
      <p className="font-space text-[12px] uppercase tracking-[0.14em] text-brand-muted">
        Case study coming soon
      </p>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 font-semibold text-brand-accent transition-[gap] duration-200 group-hover:gap-[11px] motion-reduce:transition-none">
      View case study
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
  image: string
  alt: string
  width: number
  height: number
  delay: 0 | 1 | 2
}[] = [
  {
    id: 'automl',
    badge: 'Workflow Redesign',
    title: 'Self-Serve AutoML',
    body: 'Reduced 20+ configuration actions to 5 guided steps on one canvas, so analysts set up predictions without Data Science help.',
    statLead: 'Days → Minutes',
    statRest: ' · US sales resumed',
    chips: ['Enterprise ML', 'Usability Testing', 'Workflow UX'],
    image: '/home/automl.jpg',
    alt: 'AutoML one-canvas task setup',
    width: 930,
    height: 920,
    delay: 0,
  },
  {
    id: 'museum',
    badge: '0 → 1 · AI Workflow',
    title: 'Museum of Children’s Books',
    body: 'A picture-book museum built solo. AI Studio gathers evidence and drafts inside the admin; I review each paragraph before it’s published.',
    statLead: '7–11h → ~2–3h',
    statRest: ' per book · 33 of 71 live',
    chips: ['AI Product', 'Design + Build', '328 visitors · ~5 min'],
    image: '/home/museum.jpg',
    alt: 'Museum of Children’s Books homepage',
    width: 1020,
    height: 800,
    delay: 1,
  },
  {
    // Case study lives at /work/dotds. /design-system is an older longform page.
    id: 'dotds',
    badge: 'Design System',
    title: 'dotData Design System',
    body: 'Reusable table, selection, and feedback states backed by a 3-tier token system that engineering could build from directly.',
    statLead: 'Weekly → monthly',
    statRest: ' spec questions',
    chips: ['Tokens', 'Components', 'Figma Dev Mode'],
    image: '/home/design-system.jpg',
    alt: 'Table card states and token system',
    width: 1590,
    height: 820,
    delay: 2,
  },
]

function WorkCard({ card }: { card: (typeof cards)[number] }) {
  const href = caseStudyHref(card.id)
  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(135deg,var(--brand-pink),#ece3fa)]">
        <Image
          src={card.image}
          alt={card.alt}
          fill
          sizes="(min-width: 1000px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <span className="absolute left-3.5 top-3.5 rounded-full border border-brand-line bg-white/90 px-2.5 py-[5px] font-space text-[11px] uppercase tracking-[0.14em] text-brand-accent backdrop-blur-[6px]">
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
        <StudyLink href={href} />
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

        <Reveal>
          <article
            className={`mt-14 grid grid-cols-1 items-start gap-11 rounded-[22px] border border-brand-line bg-white p-6 min-[641px]:rounded-[28px] min-[641px]:p-11 min-[1001px]:grid-cols-[1fr_1.05fr] ${cardHover}`}
          >
            <div>
              <span className="font-space text-[11px] uppercase tracking-[0.14em] text-brand-accent">
                Featured · Data Visualization · dotData
              </span>
              <h3
                className={`${displayFont} mb-3.5 mt-3 text-[clamp(26px,2.6vw,34px)]`}
              >
                From pushback to a phased plan: a pivot table that takes users from
                weak segment to action.
              </h3>
              <p className="text-brand-body">
                Prediction Error Analysis helps teams find where a model goes wrong,
                and what to do next. The CEO chose a pivot table first. I disagreed,
                then learned guidance depends on segmentation, so we built that
                foundation first.
              </p>
              <p className="my-[22px] flex flex-wrap items-baseline gap-x-3.5 gap-y-1.5 text-sm text-brand-muted">
                <span>
                  <b className="mr-1 font-space text-[15px] font-bold text-brand-ink">11</b>
                  versions
                </span>
                <span className="text-[#d9b6cf]" aria-hidden>
                  ·
                </span>
                <span>
                  <b className="mr-1 font-space text-[15px] font-bold text-brand-ink">
                    v11.1
                  </b>
                  shipped as MVP
                </span>
                <span className="text-[#d9b6cf]" aria-hidden>
                  ·
                </span>
                <span>
                  <b className="mr-1 font-space text-[15px] font-bold text-brand-ink">
                    1 quarter
                  </b>
                  1 PM, 4 eng, 1 DS
                </span>
              </p>
              <Chips
                items={[
                  'Data Visualization',
                  'AI/ML UX',
                  'Stakeholder Alignment',
                  'Pivot Table',
                ]}
                className="mt-3"
              />
              <p className="mt-[26px] font-space text-[12px] uppercase tracking-[0.14em] text-brand-muted">
                Case study coming soon
              </p>
            </div>
            <div className="grid gap-3.5">
              <LoopVideo
                src="/home/pivot-captioned.mp4"
                label="Building a pivot table"
                className="aspect-[1440/960] w-full rounded-[14px] border border-brand-line bg-brand-dark object-cover"
              />
              <LoopVideo
                src="/home/segment-captioned-v2.mp4"
                label="From weak segment to action"
                className="aspect-[1440/928] w-full rounded-[14px] border border-brand-line bg-brand-dark object-cover"
              />
              <blockquote className="mt-1.5 border-l-[3px] border-brand-accent py-1.5 pl-5">
                <p className="font-grotesk text-[20px] font-medium leading-[1.35] text-brand-ink">
                  “I don’t know where to look first.”
                </p>
                <small className="mt-2 block font-space text-[11px] uppercase tracking-[0.1em] text-brand-muted">
                  — Beginner user, from my research synthesis
                </small>
              </blockquote>
            </div>
          </article>
        </Reveal>

        <div className="mt-[22px] grid grid-cols-1 gap-[22px] min-[641px]:grid-cols-2 min-[1001px]:grid-cols-3">
          {cards.map((card) => (
            <WorkCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}
