'use client'

import { useState, type CSSProperties } from 'react'

import { Lightbox } from '@/components/Lightbox'
import {
  Clip,
  Decision,
  Frame,
  Kicker,
  PairVideo,
  Section,
  caption,
  frame,
  prose,
  wide,
  type Zoom,
  type ZoomFn,
} from '@/components/portfolio/AutomlCaseStudy'
import { CaseStudyNav, type CaseStudyNavTab } from '@/components/portfolio/CaseStudyNav'
import { MUSEUM_CASE_TITLE as CASE_TITLE } from '@/lib/museumCaseTitle'

/**
 * /work/museum: Museum of Children’s Books case study (approved copy draft, aligned to the
 * Slides deck). Reuses the AutoML layout primitives. Files named *-placeholder.png are
 * temporary deck exports at natural size.
 */

const TABS: CaseStudyNavTab[] = [
  { id: 'overview', label: 'Overview', color: '#a8d8a0' },
  { id: 'problem', label: 'The problem', color: '#e6c07b' },
  { id: 'reading', label: 'Reading experience', color: '#E59BD3' },
  { id: 'production', label: 'Production', color: '#f0a58a' },
  { id: 'workflow', label: 'AI workflow', color: '#E59BD3' },
  { id: 'evidence', label: 'Evidence & review', color: '#a8d8a0' },
  { id: 'outcome', label: 'Outcome', color: '#B48CE0' },
  { id: 'learned', label: 'Reflection', color: '#7fc4e8' },
]

const META = [
  { label: 'Role', value: 'Designer, developer and editor' },
  { label: 'Team', value: 'Just me, building with Claude Code and Cursor' },
]

const CALLOUTS = [
  {
    value: '7–11h → 2–3h',
    label: 'Per book, research to publish',
    context: 'AI Studio gathers evidence and drafts inside the admin, so one curator can keep publishing.',
  },
  {
    value: '33 books live',
    label: 'Sourced close readings',
    context: '33 of 71 books are published, each with sourced visual analysis.',
  },
  {
    value: 'Every paragraph',
    label: 'Reviewed before it goes live',
    context: 'A review queue keeps a human approval step on each paragraph.',
  },
]

const TIME = [
  { step: 'Research background', hours: '2–3 h' },
  { step: 'Study the illustrations', hours: '1–2 h' },
  { step: 'Find sources', hours: '1–2 h' },
  { step: 'Write', hours: '2–3 h' },
  { step: 'Fact-check', hours: '1 h' },
]

function TimeBreakdown() {
  return (
    <figure className={`m-0 ${wide}`}>
      <div className="rounded-[12px] border border-[#ECE6EE] p-6 min-[641px]:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="font-grotesk text-[28px] font-bold leading-[1.1] text-brand-ink">≈ 7–11 hours per book</div>
          <div className="text-[15px] text-brand-body">38 books waiting · 33 of 71 published</div>
        </div>
        <ol className="m-0 mt-6 grid list-none gap-3 p-0 min-[761px]:grid-cols-5">
          {TIME.map((t, i) => (
            <li key={t.step} className="rounded-[10px] bg-[#F6F5F7] p-4">
              <div className="font-space text-[12px] text-brand-muted">{String(i + 1).padStart(2, '0')}</div>
              <div className="mt-2 text-[15px] font-semibold leading-[1.35] text-brand-ink">{t.step}</div>
              <div className="mt-1 text-[14px] text-brand-body">{t.hours}</div>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="mt-3 text-[14px] leading-[1.5] text-[#6B5F68]">
        Where the time went on each close reading, before AI Studio.
      </figcaption>
    </figure>
  )
}

/**
 * Attempt 01: the per-field Generate screen, full width. The before screenshot gets an HTML overlay
 * (positions in % of the 1748×703 image): outlines on the regenerate button and the AI output
 * field, plus an Expected vs Received callout pair below.
 */
function BeforeAi({ onZoom }: { onZoom: ZoomFn }) {
  const beforeSrc = '/images/museum/experimentA-AI-refill-failed.png'
  const beforeAlt = 'A Generate with AI button on a single field producing generic commentary'
  const outline =
    'pointer-events-none absolute rounded-[6px] border-2 border-brand-accent shadow-[0_0_0_4px_rgba(180,80,150,0.12)]'
  return (
    <div>
      <figure className={`m-0 ${wide}`}>
        <button
          type="button"
          onClick={() => onZoom(beforeSrc, beforeAlt)}
          className={`${frame} relative block w-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent`}
          style={{ aspectRatio: '1748 / 703' }}
          aria-label={`Enlarge. ${beforeAlt}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={beforeSrc} alt={beforeAlt} loading="lazy" className="block h-full w-full object-contain" />
          <span aria-hidden className={outline} style={{ left: '7%', top: '5.2%', width: '9.4%', height: '7.6%' }} />
          <span
            aria-hidden
            className="pointer-events-none absolute -translate-y-1/2 whitespace-nowrap rounded-full border border-[#E8CFE0] bg-[#FBF2F8] px-2.5 py-0.5 text-[12px] font-semibold text-brand-accent min-[641px]:text-[13px]"
            style={{ left: '17.6%', top: '9%' }}
          >
            Generate with AI
          </span>
          <span aria-hidden className={outline} style={{ left: '2%', top: '59.5%', width: '96%', height: '34.5%' }} />
        </button>
        <figcaption className={`mt-3 ${caption}`}>Before: one field at a time, generic output.</figcaption>
        <div className="mt-4 grid grid-cols-1 gap-3 min-[561px]:grid-cols-2">
          <div className="rounded-[10px] border border-[#ECE6EE] bg-[#F6F5F7] px-4 py-3">
            <div className="text-[13px] font-semibold text-brand-muted">Expected</div>
            <p className="m-0 mt-1 text-[14px] leading-[1.5] text-brand-body">Analysis of illustration and page layout</p>
          </div>
          <div className="rounded-[10px] border border-[#E8CFE0] bg-[#FBF2F8] px-4 py-3">
            <div className="text-[13px] font-semibold text-brand-accent">Received</div>
            <p className="m-0 mt-1 text-[14px] leading-[1.5] text-brand-ink">General commentary, not visual analysis</p>
          </div>
        </div>
      </figure>
    </div>
  )
}

type Spot = { label: string; boxes: CSSProperties[] }
type AnnotatedShot = { eyebrow: string; src: string; w: number; h: number; alt: string; caption: string; spots: Spot[] }

/** Decision 3 pair. Outline boxes are in % of each image; labels sit below the image, numbered to match. */
const EVIDENCE_PAIR: [AnnotatedShot, AnnotatedShot] = [
  {
    eyebrow: 'Evidence',
    src: '/images/museum/evidence-list.png',
    w: 1112,
    h: 1724,
    alt: 'Evidence list: numbered facts with sources, visual observations, and one claim flagged as single-source',
    caption: 'Evidence: facts, visual observations and flagged claims.',
    spots: [
      { label: 'Visual observations', boxes: [{ left: '2.6%', top: '38.1%', width: '94.8%', height: '30%' }] },
      {
        label: 'Flagged: single source, not cited',
        boxes: [{ left: '2.6%', top: '88.4%', width: '94.8%', height: '9.7%' }],
      },
    ],
  },
  {
    eyebrow: 'Draft',
    src: '/images/museum/evidence-draft.png',
    w: 1096,
    h: 1814,
    alt: 'Draft panel: each AI-drafted paragraph tagged with numbered evidence chips, and a note that the curator’s view is written by a person',
    caption: 'Draft: each paragraph cites its evidence.',
    spots: [
      {
        label: 'Each paragraph cites evidence',
        boxes: [
          { left: '16.8%', top: '32.4%', width: '11.6%', height: '2.7%' },
          { left: '23%', top: '42.1%', width: '30%', height: '2.9%' },
          { left: '25%', top: '51.8%', width: '30%', height: '2.9%' },
        ],
      },
      { label: 'Curator’s view: human only', boxes: [{ left: '2.3%', top: '56.1%', width: '96%', height: '4.2%' }] },
    ],
  },
]

function EvidencePair({ onZoom }: { onZoom: ZoomFn }) {
  const marker =
    'flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-accent text-[11px] font-semibold leading-none text-white'
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 min-[761px]:grid-cols-[645fr_604fr]">
      {EVIDENCE_PAIR.map((shot) => (
        <figure key={shot.src} className="m-0">
          <div className={`mb-3 text-[13px] font-semibold ${shot.eyebrow === 'Draft' ? 'text-brand-accent' : 'text-brand-muted'}`}>
            {shot.eyebrow}
          </div>
          <button
            type="button"
            onClick={() => onZoom(shot.src, shot.alt)}
            className={`${frame} relative block w-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent`}
            style={{ aspectRatio: `${shot.w} / ${shot.h}` }}
            aria-label={`Enlarge. ${shot.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={shot.src} alt={shot.alt} loading="lazy" className="block h-full w-full object-contain" />
            {shot.spots.map((spot, i) =>
              spot.boxes.map((box, j) => (
                <span
                  key={`${spot.label}-${j}`}
                  aria-hidden
                  className="pointer-events-none absolute rounded-[6px] border-2 border-brand-accent shadow-[0_0_0_4px_rgba(180,80,150,0.12)]"
                  style={box}
                >
                  {j === 0 && <span className={`${marker} absolute -left-2.5 -top-2.5`}>{i + 1}</span>}
                </span>
              )),
            )}
          </button>
          <ol className="m-0 mt-3 flex list-none flex-wrap gap-2 p-0">
            {shot.spots.map((spot, i) => (
              <li
                key={spot.label}
                className="flex items-center gap-1.5 rounded-full border border-[#E8CFE0] bg-[#FBF2F8] py-0.5 pl-1 pr-2.5 text-[13px] font-semibold text-brand-accent"
              >
                <span className={marker}>{i + 1}</span>
                {spot.label}
              </li>
            ))}
          </ol>
          <figcaption className={`mt-3 ${caption}`}>{shot.caption}</figcaption>
        </figure>
      ))}
    </div>
  )
}

function BrowserVideo({ src, poster, label, ratio, text }: { src: string; poster: string; label: string; ratio: string; text: string }) {
  return (
    <figure className={`m-0 ${wide}`}>
      <div className="overflow-hidden rounded-[20px] border border-[#ECE6EE] bg-[#F6F5F7] px-6 pt-6 min-[641px]:px-14 min-[641px]:pt-14">
        <div className="overflow-hidden rounded-t-[10px] bg-white shadow-[0_8px_30px_rgba(38,20,36,0.10)]">
          <div className="relative flex h-[30px] items-center gap-[6px] border-b border-[#ECE6EE] bg-[#FAFAFB] px-3" aria-hidden>
            <span className="size-[9px] rounded-full bg-[#D9D6DC]" />
            <span className="size-[9px] rounded-full bg-[#D9D6DC]" />
            <span className="size-[9px] rounded-full bg-[#D9D6DC]" />
            <span className="absolute left-1/2 top-1/2 h-[16px] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F0EEF2]" />
          </div>
          <div className="relative" style={{ aspectRatio: ratio }}>
            <PairVideo src={src} poster={poster} label={label} />
          </div>
        </div>
      </div>
      <figcaption className={`mt-3 ${caption}`}>{text}</figcaption>
    </figure>
  )
}

export function MuseumCaseStudy() {
  const [zoom, setZoom] = useState<Zoom | null>(null)
  const onZoom: ZoomFn = (src, alt) => setZoom({ src, alt })

  return (
    <div data-page-motion="none" className="overflow-x-clip bg-white pt-12 font-inter text-brand-ink">
      <CaseStudyNav tabs={TABS} />

      <div className="mx-auto box-content max-w-[680px] px-5 pb-24 min-[641px]:px-8">
        <section id="overview" className="scroll-mt-12 pt-14 min-[641px]:pt-20">
          <Kicker>Side project · 0→1 AI product</Kicker>
          <h1 className="m-0 font-grotesk text-[34px] font-bold leading-[1.1] tracking-[-0.015em] text-brand-ink min-[641px]:text-[48px]">
            {CASE_TITLE}
          </h1>
          <p className={`${prose} mt-7`}>
            Picture books tell stories through images, but writing about their illustrations was scattered
            and scarce in Chinese. Working solo as designer, developer and editor, I built a Traditional
            Chinese picture-book museum that connects historical context, visual analysis and sources.
          </p>
          <p className={prose}>
            To sustain that experience, I also built an AI research workspace inside the admin, with
            source-linked drafts and human review before publication.
          </p>

          <dl className={`m-0 mt-10 grid grid-cols-2 gap-x-8 gap-y-5 min-[761px]:grid-cols-3 ${wide}`}>
            {META.map((m) => (
              <div key={m.label}>
                <dt className="text-[13px] text-brand-muted">{m.label}</dt>
                <dd className="m-0 mt-1 text-[15px] leading-[1.5] text-brand-ink">{m.value}</dd>
              </div>
            ))}
          </dl>

          <div className={`mt-12 grid gap-8 border-t border-[#ECE6EE] pt-8 min-[761px]:grid-cols-3 ${wide}`}>
            {CALLOUTS.map((c) => (
              <div key={c.label}>
                <div className="font-grotesk text-[28px] font-bold leading-[1.1] text-brand-accent">{c.value}</div>
                <div className="mt-2 text-[15px] font-semibold text-brand-ink">{c.label}</div>
                <p className="m-0 mt-1 text-[15px] leading-[1.6] text-brand-body">{c.context}</p>
              </div>
            ))}
          </div>

          <div className={`mt-12 ${wide}`}>
            <Frame
              src="/images/museum/in-a-nutshell-books-hero.png"
              alt="In a Nutshell Books: the collection admin beside the public Book of the Day on desktop and mobile"
              onZoom={onZoom}
              caption="The public museum beside its admin, where research is drafted and reviewed."
            />
          </div>
        </section>

        <Section id="problem" label="The problem" title="Finding sources wasn’t enough to understand the pictures">
          <p className={prose}>
            I wanted to understand how the pictures tell the story. Interviews, exhibition pages and articles
            were scattered across platforms, Chinese-language writing on illustration was limited, and
            references I saved on Facebook and Instagram were hard to find again.
          </p>
          <p className={prose}>
            I built the museum to bring historical context, visual analysis and sources into one reading
            experience.
          </p>
        </Section>

        <Section id="reading" label="Reading experience" title="Designing the reading experience">
          <Decision
            num=""
            title="Give each book its own visual lens"
            media={
              <div className={wide}>
                <Frame
                  src="/images/museum/alice-visual-lens.png"
                  alt="Left: a wood-engraving close reading of an Alice in Wonderland illustration. Right: a book page whose background and highlights take their colors from the cover palette"
                  onZoom={onZoom}
                  caption="Each book page is tinted from its cover’s palette, so every visit feels like a different book."
                />
              </div>
            }
          >
            <p className={prose}>
              Each entry focuses on how the illustrations tell the story. For Alice in Wonderland, I explored
              how wood engraving creates texture and depth through line. Cover-based palettes carry each
              book’s visual character into the page.
            </p>
          </Decision>

          <Decision
            num=""
            title="Guide attention, then let readers explore"
            media={
              <div className={wide}>
                <Clip
                  src="/images/museum/close-reading-zoom.mp4"
                  poster="/images/museum/close-reading-zoom-poster.jpg"
                  label="Close-read mode: zooming into an illustration and stepping through annotations tied to details"
                  caption="After testing, I added close-read mode: zoom into an illustration and step through annotated details."
                />
              </div>
            }
          >
            <p className={prose}>
              Testing with five readers highlighted a need for more visual analysis and help discussing books
              with children. I added close-read mode, focusing each illustration on three or four selected
              details. Readers can jump to an annotation, zoom freely and move between observations without
              finding each marker again.
            </p>
          </Decision>
        </Section>

        <Section id="production" label="Production" title="The reading experience created a production challenge">
          <p className={prose}>
            Producing each sourced close reading required research, visual study, writing and
            fact-checking—about 7–11 hours per book. With 38 books waiting and a team of one, I needed a way
            to keep publishing without giving up that level of care.
          </p>
          <div className="mt-10">
            <TimeBreakdown />
          </div>
        </Section>

        <Section id="workflow" label="AI workflow" title="From isolated generation to an integrated workflow">
          <Decision num="01" title="A “Generate” button on every field wasn’t enough" media={<BeforeAi onZoom={onZoom} />}>
            <p className={prose}>
              Each field was written in isolation, so AI produced generic commentary about friendship and
              childhood instead of analyzing the illustrations. I still had to find sources and refocus the
              draft on visual storytelling.
            </p>
          </Decision>

          <Decision
            num="02"
            title="Better research, but manual transfers"
            media={
              <div className={wide}>
                <Frame
                  src="/images/museum/advisor-cursor-handoff.png"
                  alt="The curation advisor in the admin beside the writing skill in Cursor: copy the book title into Cursor, then paste the draft back into the admin"
                  onZoom={onZoom}
                  caption="Curation advisor in the admin, writing skill in Cursor, and the manual copy and paste between them."
                />
              </div>
            }
          >
            <p className={prose}>
              I split the work between a curation advisor in the admin and a writing skill in Cursor. The
              research improved, but drafts still lived outside the admin, and I copied them back by hand.
            </p>
          </Decision>

          <Decision
            num="03"
            title="Research, draft and review in one place"
            media={
              <figure className={`m-0 ${wide}`}>
                <div className={frame} style={{ aspectRatio: '1760 / 1070' }}>
                  <PairVideo
                    src="/images/museum/ai-studio.mp4"
                    poster="/images/museum/ai-studio-poster.jpg"
                    label="AI Studio: asking the advisor for books, then AI researching a selected book with sources"
                  />
                </div>
                <figcaption className={`mt-3 ${caption}`}>AI Studio drafts with the whole book in view.</figcaption>
              </figure>
            }
          >
            <p className={prose}>
              I merged both tools into AI Studio inside the admin. AI gathers evidence and drafts with the
              book’s context and sources available in one workspace, reducing manual transfers between tools.
            </p>
          </Decision>
        </Section>

        <Section id="evidence" label="Evidence & review" title="Keep evidence visible and publication under human control">
          <p className={prose}>
            AI-generated paragraphs link to numbered evidence, including sources and visual observations. I
            can open the evidence beside a paragraph, check the claim and review the text before approving it
            for publication.
          </p>
          <div className={`mt-10 ${wide}`}>
            <div className="mx-auto max-w-[440px]">
              <Clip
                src="/images/museum/evidence-chip.mp4"
                poster="/images/museum/evidence-chip-poster.jpg"
                label="Clicking a citation chip opens its evidence card under the paragraph, then jumping to it in the full evidence list"
                caption="Click a citation to open its evidence, then jump to the full list."
              />
            </div>
          </div>
        </Section>

        <Section id="outcome" label="Outcome" title="Live with 33 books, supported by a repeatable workflow">
          <div className="mb-10">
            <BrowserVideo
              src="/images/museum/museum-outcome.mp4"
              poster="/images/museum/museum-outcome-poster.jpg"
              ratio="1760 / 988"
              label="The live museum site: a cover-tinted book page with its palette and similar books, the exhibition map, the find-books grid, and an illustrator profile"
              text="The live museum: cover-tinted pages, true-proportion covers, and always a next book."
            />
          </div>
          <p className={prose}>
            The museum has 33 published books, each with a sourced visual close reading. AI Studio brings
            research and drafting into the admin, while paragraph-level review keeps publication decisions
            with me.
          </p>
          <p className={prose}>Producing an entry now takes about 2–3 hours, compared with 7–11 hours before.</p>
          <a
            href="https://inanutshellbooks.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-ink px-5 py-2.5 text-[15px] font-semibold text-white no-underline transition-opacity hover:opacity-85"
          >
            Visit the museum <span aria-hidden>↗</span>
          </a>
        </Section>

        <Section id="learned" label="Reflection" title="AI handled the volume. The judgment stayed mine.">
          <p className={prose}>
            The useful shift was from generating isolated fields to supporting the whole editorial workflow.
            Shared context and fewer manual transfers made the process more workable; visible evidence and
            human review kept the final judgment with me.
          </p>
        </Section>
      </div>

      {zoom && <Lightbox src={zoom.src} alt={zoom.alt} onClose={() => setZoom(null)} />}
    </div>
  )
}
