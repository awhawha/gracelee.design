'use client'

import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { Icon } from '@/components/Icon'
import { CaseStudyShell } from '@/components/portfolio/CaseStudyShell'
import { TransitionLink } from '@/components/portfolio/PageTransition'

const META = [
  { label: 'Project', value: 'In a Nutshell Books' },
  { label: 'Type', value: 'Independent project' },
  { label: 'Timeline', value: '2 months' },
  { label: 'Role', value: 'Product designer and full-stack builder' },
  {
    label: 'Scope',
    value: 'Product strategy, UX/UI, frontend, backend, database, AI workflows',
  },
  { label: 'Status', value: 'In production' },
]

const SURFACES = [
  {
    number: '01',
    name: 'Public museum',
    text: 'Discover books, illustrators, exhibitions, and long-form editorial readings.',
  },
  {
    number: '02',
    name: 'Collection admin',
    text: 'Edit records, manage publication states, and publish sourced content.',
  },
  {
    number: '03',
    name: 'Curatorial Advisor',
    text: 'Explore possible acquisitions, compare candidates, and build a review queue.',
  },
]

const MUSEUM_SLIDES = [
  {
    title: 'A public museum for discovery',
    body: 'Browse books, illustrators, and exhibitions, then move from a focused visual introduction into long-form editorial reading.',
    src: '/images/museum/museum-gallary.png',
    alt: 'The public museum showing Book of the Day for The Gashlycrumb Tinies',
  },
  {
    title: 'One admin for the collection',
    body: 'Manage books, illustrators, exhibitions, publication states, and the editorial records behind the public museum.',
    src: '/images/museum/admin.png',
    alt: 'Book management admin with publication filters and collection records',
  },
  {
    title: 'A reviewable recommendation queue',
    body: 'Turn conversational recommendations into structured candidates that can be selected, removed, or deliberately moved forward.',
    src: '/images/museum/curatorial-advisor.png',
    alt: 'Curatorial Advisor with recommendations and a persistent review queue',
  },
  {
    title: 'A reusable sourced-research workflow',
    body: 'Use the new-book workflow to check existing notes, verify sources, preserve uncertainty, and prepare a draft for review.',
    src: '/images/museum/skill.png',
    alt: 'The new-book research workflow ready to run in Cursor',
  },
]

const CONTROLS = [
  {
    number: '01',
    name: 'Conversation',
    label: 'Set the direction',
    text: 'Describe a curatorial need in natural language, then narrow, redirect, or challenge the results without starting over.',
  },
  {
    number: '02',
    name: 'Configuration',
    label: 'Adjust the approach',
    text: 'Tune visual-style emphasis, search depth, model, temperature, and result count when the search needs a different behavior.',
  },
  {
    number: '03',
    name: 'Selection',
    label: 'Choose what moves forward',
    text: 'Review structured recommendations and move only promising titles into a persistent pending queue.',
  },
  {
    number: '04',
    name: 'Decision',
    label: 'Approve what enters',
    text: 'Create a collection draft explicitly. Publishing remains a separate, confirm-gated action in the editor.',
  },
]

const SAFEGUARDS = [
  'Filter excluded creators after generation',
  'Retry once if filtering removes every result',
  'Allow recommendation links only from approved retailer domains',
  'Remove a product URL reused across unrelated books',
  'Fall back to a title-and-author search when a link is missing or rejected',
  'Run a recovery pass on malformed structured output',
  'Compare every recommendation against the live collection',
]

const SHIPPED = [
  'Bilingual public museum',
  'Collection-management system',
  'Books, illustrators, exhibitions, and search',
  'Draft, published, and unpublished states',
  'Configurable Curatorial Advisor',
  'Persistent recommendation-review queue',
  'Human gates for record creation and publishing',
  'Reusable sourced-research workflow',
]

function Section({
  kicker,
  title,
  children,
  last = false,
}: {
  kicker: string
  title: string
  children: ReactNode
  last?: boolean
}) {
  return (
    <section
      className={`mt-14 border-t border-surface-tertiary pt-12 ${
        last ? 'pb-20' : ''
      }`}
    >
      <div className="type-cap font-medium text-secondary">{kicker}</div>
      <h2 className="type-header-md mt-3 max-w-[900px]">{title}</h2>
      <div className="mt-7">{children}</div>
    </section>
  )
}

function Prose({ children }: { children: ReactNode }) {
  return (
    <p className="type-body-sm mb-5 max-w-[900px] text-secondary">
      {children}
    </p>
  )
}

function pad(number: number) {
  return String(number).padStart(2, '0')
}

function MuseumExperienceCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<Array<HTMLElement | null>>([])
  const [index, setIndex] = useState(0)

  const go = (next: number) => {
    const target = Math.max(0, Math.min(MUSEUM_SLIDES.length - 1, next))
    setIndex(target)
    const viewport = viewportRef.current
    const slide = slideRefs.current[target]
    if (viewport && slide) {
      viewport.scrollTo({
        left: slide.offsetLeft,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
      })
    }
  }

  const onScroll = () => {
    const viewport = viewportRef.current
    if (!viewport) return
    let closest = 0
    let distance = Number.POSITIVE_INFINITY
    slideRefs.current.forEach((slide, slideIndex) => {
      if (!slide) return
      const nextDistance = Math.abs(slide.offsetLeft - viewport.scrollLeft)
      if (nextDistance < distance) {
        closest = slideIndex
        distance = nextDistance
      }
    })
    setIndex(closest)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    go(event.key === 'ArrowRight' ? index + 1 : index - 1)
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Museum product surfaces"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="relative outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-primary min-[1081px]:w-[calc(100vw-clamp(1.5rem,3.8vw,66px)-328px)]"
    >
      <p className="sr-only">
        Use the left and right arrow keys to move between product surfaces.
      </p>
      <p className="sr-only" aria-live="polite">
        Slide {index + 1} of {MUSEUM_SLIDES.length}:{' '}
        {MUSEUM_SLIDES[index].title}
      </p>

      <div
        ref={viewportRef}
        onScroll={onScroll}
        className="w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex items-stretch gap-4 pr-8 min-[700px]:gap-6 min-[700px]:pr-[72px]">
          {MUSEUM_SLIDES.map((slide, slideIndex) => (
            <article
              key={slide.title}
              ref={(node) => {
                slideRefs.current[slideIndex] = node
              }}
              aria-hidden={slideIndex !== index}
              className="w-[calc(100%_-_32px)] shrink-0 snap-start rounded-[24px] bg-[#f7f6f3] p-6 min-[700px]:w-[calc(100%_-_72px)] md:p-12"
            >
              <div className="min-w-0 pt-11 min-[900px]:pr-[180px] min-[900px]:pt-0">
                <h3 className="type-header-md m-0 min-h-[2.4em] text-primary min-[900px]:min-h-[1.14em]">
                  {slide.title}
                </h3>
                <p className="type-body m-0 mt-4 max-w-[760px] text-secondary">
                  {slide.body}
                </p>
              </div>
              <div
                className="mt-8 flex w-full items-center justify-center overflow-hidden rounded-[16px] bg-transparent min-[700px]:mt-10"
                style={{ aspectRatio: '995 / 619' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="block h-full w-full object-contain"
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="absolute right-[56px] top-6 z-10 flex items-center gap-3 min-[700px]:right-[96px] md:right-[120px] md:top-12">
        <p className="m-0 mr-1 whitespace-nowrap font-sans text-[13px] tabular-nums tracking-[0.08em]">
          <span className="font-medium text-primary">{pad(index + 1)}</span>
          <span className="text-tertiary">
            {' '}
            / {pad(MUSEUM_SLIDES.length)}
          </span>
        </p>
        <button
          type="button"
          aria-label="Previous slide"
          disabled={index === 0}
          onClick={() => go(index - 1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-surface-tertiary bg-white text-[14px] text-primary transition-colors hover:bg-surface-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary disabled:cursor-not-allowed disabled:text-tertiary disabled:hover:bg-white"
        >
          <Icon name="fa-arrow-left" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          disabled={index === MUSEUM_SLIDES.length - 1}
          onClick={() => go(index + 1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-surface-tertiary bg-white text-[14px] text-primary transition-colors hover:bg-surface-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary disabled:cursor-not-allowed disabled:text-tertiary disabled:hover:bg-white"
        >
          <Icon name="fa-arrow-right" />
        </button>
      </div>
    </div>
  )
}

function VisualPlaceholder({
  number,
  title,
  description,
  details,
  ratio = '16 / 9',
}: {
  number: string
  title: string
  description: string
  details: string[]
  ratio?: string
}) {
  return (
    <figure className="m-0">
      <div
        className="relative flex w-full items-center justify-center overflow-hidden rounded-[16px] border border-surface-tertiary bg-pf-stripes p-5 min-[700px]:p-10"
        style={{ aspectRatio: ratio }}
      >
        <div
          aria-hidden="true"
          className="absolute left-5 top-5 rounded-full border border-surface-tertiary bg-white px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-tertiary"
        >
          Visual {number}
        </div>
        <div className="w-full max-w-[640px] rounded-[14px] border border-surface-tertiary bg-white/95 p-5 shadow-[0_8px_30px_rgba(28,25,20,0.08)] backdrop-blur-sm min-[700px]:p-7">
          <div className="type-cap font-semibold uppercase tracking-[0.08em] text-accent-primary">
            Image placeholder
          </div>
          <h3 className="type-header-sm m-0 mt-2">{title}</h3>
          <p className="type-body-sm m-0 mt-3 text-secondary">{description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {details.map((detail) => (
              <span
                key={detail}
                className="type-cap rounded-full bg-surface-secondary px-3 py-1.5 text-secondary"
              >
                {detail}
              </span>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="type-cap mt-3 text-tertiary">
        Suggested capture: {title}. Replace this frame when final product imagery
        is ready.
      </figcaption>
    </figure>
  )
}

function WorkflowDiagram() {
  const steps = [
    { name: 'Curator request', tone: 'default' },
    { name: 'Collection context + web search', tone: 'system' },
    { name: 'Structured recommendations', tone: 'system' },
    { name: 'Pending queue', tone: 'human', gate: 'Human checkpoint 1' },
    { name: 'Draft record', tone: 'default' },
    { name: 'Published object', tone: 'human', gate: 'Human checkpoint 2' },
  ]

  return (
    <div className="rounded-[16px] border border-surface-tertiary bg-surface-secondary p-5 min-[700px]:p-7">
      <div className="overflow-x-auto pb-2">
        <div className="grid min-w-[960px] grid-cols-[repeat(11,minmax(0,1fr))] items-center gap-2">
          {steps.map((step, index) => (
            <div key={step.name} className="contents">
              <div className="relative col-span-1">
                {step.gate && (
                  <div className="type-cap absolute bottom-[calc(100%+10px)] left-1/2 w-[140px] -translate-x-1/2 text-center font-semibold text-accent-primary">
                    {step.gate}
                  </div>
                )}
                <div
                  className={`type-cap flex min-h-[72px] items-center justify-center rounded-[12px] px-3 text-center font-medium ${
                    step.tone === 'human'
                      ? 'bg-accent-primary text-white'
                      : step.tone === 'system'
                        ? 'bg-accent-tertiary text-primary'
                        : 'border border-surface-tertiary bg-white text-primary'
                  }`}
                >
                  {step.name}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="col-span-1 text-center text-[18px] text-accent-primary"
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <p className="type-cap mb-0 mt-3 text-tertiary">
        AI can widen the field of view. A person decides what becomes a record
        and what becomes public.
      </p>
    </div>
  )
}

function ResearchFlow() {
  const steps = [
    'Check existing notes',
    'Research authoritative sources',
    'Retain links and conflicts',
    'Check records and drafts',
    'Prepare a sourced draft',
  ]

  return (
    <div className="mt-7 overflow-x-auto rounded-[14px] border border-surface-tertiary p-5 min-[700px]:p-6">
      <div className="flex min-w-[760px] items-center gap-3">
        {steps.map((step, index) => (
          <div key={step} className="contents">
            <div className="type-cap flex min-h-[64px] flex-1 items-center justify-center rounded-[10px] bg-surface-secondary px-3 text-center font-medium text-secondary">
              {step}
            </div>
            {index < steps.length - 1 && (
              <span aria-hidden="true" className="text-accent-primary">
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function MuseumDraftStudy() {
  return (
    <div className="overflow-x-clip font-sans text-primary">
      <CaseStudyShell
        meta={META}
        link={{
          label: 'Visit the museum',
          href: 'https://inanutshellbooks.studio/',
        }}
      >
        <p className="type-cap mb-6 font-medium text-tertiary">
          Draft preview.{' '}
          <TransitionLink
            href="/work/museum"
            className="underline decoration-surface-tertiary underline-offset-[3px] transition-colors hover:text-primary"
          >
            Published case study
          </TransitionLink>
        </p>
        <div className="mb-2 text-[13px] font-medium tracking-[0.04em] text-[var(--home-ink-body)]">
          In a Nutshell Books
        </div>
        <h1 className="m-0 max-w-[900px] font-display text-[28px] font-bold leading-normal tracking-[0.01em] text-black">
          Designing a human-in-the-loop curation system for a digital
          picture-book museum
        </h1>

        <div className="mt-10 max-w-[900px]">
          <p className="type-body-lg m-0 text-secondary">
            I designed and built a bilingual digital museum—and the curation
            workspace used to manage, research, and grow its collection.
          </p>
        </div>

        <div className="mt-9 grid max-w-[900px] grid-cols-3 gap-10 border-y border-surface-tertiary py-9 max-[640px]:grid-cols-1 max-[640px]:gap-6">
          {[
            ['65', 'books'],
            ['32', 'illustrators'],
            ['7', 'exhibition rooms'],
          ].map(([value, label]) => (
            <div key={label}>
              <div className="type-header-md text-accent-primary">{value}</div>
              <div className="type-cap mt-2 text-tertiary">{label}</div>
            </div>
          ))}
        </div>

        <section className="mt-12">
          <div className="type-cap font-medium text-secondary">At a glance</div>
          <h2 className="type-header-md mt-3 max-w-[900px]">
            One collection, three connected products
          </h2>
          <div className="mt-7 grid grid-cols-3 gap-3 max-[800px]:grid-cols-1">
            {SURFACES.map((surface) => (
              <article
                key={surface.name}
                className="rounded-[14px] bg-[#f7f6f3] p-5"
              >
                <div className="type-cap font-semibold text-accent-primary">
                  {surface.number}
                </div>
                <h3 className="type-header-sm m-0 mt-3">{surface.name}</h3>
                <p className="type-body-sm m-0 mt-3 text-secondary">
                  {surface.text}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-7">
            <MuseumExperienceCarousel />
          </div>
        </section>

        <Section
          kicker="The challenge"
          title="Generating possibilities was easy. Making trustworthy collection decisions was not."
        >
          <Prose>
            Before the curation workspace, acquisition research was spread across
            browser searches, personal notes, AI conversations, and manual
            database entry. AI returned long lists quickly, but often ignored the
            existing collection, repeated candidates, missed exclusions, or
            supplied facts that still needed verification.
          </Prose>

          <div className="mt-8 grid grid-cols-[1fr_36px_1fr] items-stretch gap-3 max-[700px]:grid-cols-1">
            <div className="rounded-[14px] border border-surface-tertiary p-5">
              <div className="type-cap font-medium text-tertiary">Before</div>
              <h3 className="type-header-sm m-0 mt-3">
                Fragmented possibilities
              </h3>
              <p className="type-body-sm m-0 mt-3 text-secondary">
                Search tabs, notes, chat output, duplicate checks, and manual
                entry lived in separate places.
              </p>
            </div>
            <div className="flex items-center justify-center text-[20px] text-accent-primary max-[700px]:rotate-90">
              →
            </div>
            <div className="rounded-[14px] bg-accent-tertiary p-5">
              <div className="type-cap font-medium text-secondary">After</div>
              <h3 className="type-header-sm m-0 mt-3">
                Reviewable commitments
              </h3>
              <p className="type-body-sm m-0 mt-3 text-secondary">
                Recommendations become candidates; candidates become drafts;
                reviewed drafts can become public objects.
              </p>
            </div>
          </div>

          <div className="mt-8 max-w-[900px] rounded-[14px] bg-accent-tertiary px-6 py-6">
            <div className="type-cap font-medium text-secondary">
              Central design question
            </div>
            <p className="type-body-lg m-0 mt-3 font-medium text-primary">
              How might AI broaden discovery without allowing a suggestion to
              become a collection decision automatically?
            </p>
          </div>
        </Section>

        <Section
          kicker="Product strategy"
          title="Give exploration flexibility. Add friction before commitment."
        >
          <Prose>
            I treated the Curatorial Advisor as a steering and decision-support
            tool, not an autonomous curator. AI gets room to search and compare;
            people retain control over what deserves consideration, what becomes
            a record, and what is ready to publish.
          </Prose>

          <div className="mt-8 grid grid-cols-2 gap-3 max-[760px]:grid-cols-1">
            {CONTROLS.map((control) => (
              <article
                key={control.name}
                className="rounded-[14px] border border-surface-tertiary p-5"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="type-cap font-semibold text-accent-primary">
                    {control.number}
                  </div>
                  <div className="type-cap text-tertiary">{control.label}</div>
                </div>
                <h3 className="type-header-sm m-0 mt-4">{control.name}</h3>
                <p className="type-body-sm m-0 mt-3 text-secondary">
                  {control.text}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8">
            <VisualPlaceholder
              number="02"
              title="Advisor conversation + configuration panel"
              description="Pair a natural-language acquisition brief with the controls used to steer visual emphasis and search behavior."
              details={[
                'Conversation history',
                'Visual-style emphasis',
                'Search depth',
                'Model controls',
              ]}
            />
          </div>
        </Section>

        <Section
          kicker="Human in the loop"
          title="Two explicit checkpoints separate interest from endorsement"
        >
          <Prose>
            A recommendation is not a collection record, and a collection record
            is not automatically public. The workflow makes those different
            levels of commitment visible and reversible.
          </Prose>
          <div className="mt-12">
            <WorkflowDiagram />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-5 max-[800px]:grid-cols-1">
            <VisualPlaceholder
              number="03"
              title="Recommendation selection → pending queue"
              description="Show structured result rows, individual selection, and the synchronized persistent review queue."
              details={['Title + creator', 'Rationale', 'Selected state']}
              ratio="4 / 3"
            />
            <VisualPlaceholder
              number="04"
              title="Pending candidate → draft record"
              description="Show the explicit create-record action, draft state, editorial review, and separate publish confirmation."
              details={['Create draft', 'Review', 'Confirm publish']}
              ratio="4 / 3"
            />
          </div>

          <div className="mt-9 grid grid-cols-3 gap-3 max-[760px]:grid-cols-1">
            {[
              {
                label: 'Considering',
                text: 'A title is useful enough to keep in the working set.',
              },
              {
                label: 'Researching',
                text: 'A draft exists, but evidence and editorial judgment are incomplete.',
              },
              {
                label: 'Publishing',
                text: 'The museum is ready to publicly stand behind the record.',
              },
            ].map((item) => (
              <div key={item.label} className="rounded-[12px] bg-[#f7f6f3] p-5">
                <h3 className="type-header-sm m-0">{item.label}</h3>
                <p className="type-cap m-0 mt-2 text-tertiary">{item.text}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section
          kicker="System behavior"
          title="The Advisor starts each request with fresh collection context"
        >
          <Prose>
            On every request, the system combines the current collection with web
            search. It returns structured recommendations that the interface can
            validate and render as selectable rows. Conversation history and the
            pending queue persist locally, so research survives a trip to the
            editor.
          </Prose>
          <div className="mt-8 rounded-[14px] border border-surface-tertiary p-5 min-[700px]:p-6">
            <div className="grid grid-cols-[1fr_32px_1fr_32px_1fr] items-center gap-2 max-[760px]:grid-cols-1">
              <div className="rounded-[10px] bg-surface-secondary p-4">
                <div className="type-cap font-medium text-tertiary">Input</div>
                <div className="type-body-sm mt-2 text-primary">
                  Curator intent + live holdings + web search
                </div>
              </div>
              <div className="text-center text-accent-primary max-[760px]:rotate-90">
                →
              </div>
              <div className="rounded-[10px] bg-accent-tertiary p-4">
                <div className="type-cap font-medium text-secondary">Model</div>
                <div className="type-body-sm mt-2 text-primary">
                  Compare, recommend, and explain
                </div>
              </div>
              <div className="text-center text-accent-primary max-[760px]:rotate-90">
                →
              </div>
              <div className="rounded-[10px] bg-surface-secondary p-4">
                <div className="type-cap font-medium text-tertiary">Output</div>
                <div className="type-body-sm mt-2 text-primary">
                  Validated rows for human review
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section
          kicker="Designing for unreliable AI"
          title="Prompt instructions were not enough, so I added deterministic safeguards"
        >
          <Prose>
            Production use exposed repeatable failure modes. An explicit exclusion
            could still be ignored, and the same retailer product URL could be
            reused across unrelated books. I moved these constraints outside the
            prompt so common failures could be caught consistently.
          </Prose>

          <div className="mt-8">
            <VisualPlaceholder
              number="05"
              title="AI failure → safeguarded result"
              description="Compare a raw response that includes an excluded creator and duplicated product URL with the filtered, recoverable interface state."
              details={[
                'Excluded creator',
                'Duplicate URL',
                'Post-generation filter',
                'Fallback search',
              ]}
            />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 max-[760px]:grid-cols-1">
            <div className="rounded-[14px] border border-surface-tertiary p-5">
              <div className="type-cap font-semibold text-tertiary">
                Model-only behavior
              </div>
              <p className="type-body-sm m-0 mt-3 text-secondary">
                “Do not recommend Leo Lionni” still returned Lionni titles and
                plausible-looking links.
              </p>
            </div>
            <div className="rounded-[14px] bg-accent-tertiary p-5">
              <div className="type-cap font-semibold text-accent-primary">
                Product behavior
              </div>
              <p className="type-body-sm m-0 mt-3 text-secondary">
                Filter, validate, retry, and fall back before a recommendation can
                enter the working set.
              </p>
            </div>
          </div>

          <ul className="mt-8 grid max-w-[900px] grid-cols-2 gap-x-8 gap-y-3 pl-5 marker:text-accent-primary max-[700px]:grid-cols-1">
            {SAFEGUARDS.map((item) => (
              <li key={item} className="type-body-sm pl-1 text-secondary">
                {item}
              </li>
            ))}
          </ul>
          <p className="type-cap mt-6 max-w-[900px] text-tertiary">
            These safeguards do not make the underlying information automatically
            true. They make common failures visible, recoverable, and less likely
            to pass unnoticed.
          </p>
        </Section>

        <Section
          kicker="From candidate to sourced draft"
          title="Recommendation and research are separate jobs"
        >
          <Prose>
            The Advisor identifies books worth investigating. A reusable
            <span className="font-medium text-primary"> /new-book </span>
            workflow prepares deeper editorial drafts with source links,
            uncertainty, and duplicate checks preserved.
          </Prose>
          <ResearchFlow />
          <div className="mt-7 max-w-[900px] rounded-[14px] bg-[#f7f6f3] p-6">
            <div className="type-cap font-medium text-secondary">
              Example outcome
            </div>
            <p className="type-body-sm m-0 mt-3 text-secondary">
              In one acquisition, the workflow found an existing draft, corrected
              the Chinese title, and avoided creating an illustrator record that
              available evidence could not support.
            </p>
          </div>
          <p className="type-cap mt-5 max-w-[900px] text-tertiary">
            Today this research workflow runs in an external coding environment.
            Connecting it to the pending queue is the next major integration.
          </p>
        </Section>

        <Section kicker="What shipped" title="A complete system, used in production">
          <div className="grid grid-cols-2 gap-3 max-[700px]:grid-cols-1">
            {SHIPPED.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-[12px] border border-surface-tertiary px-4 py-4"
              >
                <span
                  aria-hidden="true"
                  className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-tertiary text-[11px] font-semibold text-accent-primary"
                >
                  ✓
                </span>
                <span className="type-body-sm text-secondary">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 max-w-[900px] rounded-[14px] bg-accent-tertiary px-6 py-6">
            <p className="type-body m-0 font-medium text-primary">
              AI recommendations no longer end as isolated chat output. They
              become reviewable candidates while consequential collection
              actions stay separate and reversible.
            </p>
          </div>
        </Section>

        <Section
          kicker="Limitations and next steps"
          title="The system can compare records, but not yet explain collection gaps deeply"
        >
          <Prose>
            The Advisor understands titles, creators, years, genres, and
            summaries. It still needs richer access to the museum’s curatorial
            taxonomy and visual analysis to explain why a candidate fills a
            meaningful aesthetic or historical gap.
          </Prose>

          <div className="mt-8 grid grid-cols-2 gap-8 max-[760px]:grid-cols-1">
            <div>
              <h3 className="type-header-sm m-0">Product</h3>
              <ul className="mt-4 space-y-3 pl-5 marker:text-accent-primary">
                <li className="type-body-sm pl-1 text-secondary">
                  Enrich the collection context available to the Advisor.
                </li>
                <li className="type-body-sm pl-1 text-secondary">
                  Integrate sourced research into the pending-draft flow.
                </li>
                <li className="type-body-sm pl-1 text-secondary">
                  Show clearer evidence and provenance during review.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="type-header-sm m-0">Validation</h3>
              <ul className="mt-4 space-y-3 pl-5 marker:text-accent-primary">
                <li className="type-body-sm pl-1 text-secondary">
                  Measure recommendation-to-draft and draft-to-publication.
                </li>
                <li className="type-body-sm pl-1 text-secondary">
                  Test the workflow with collectors other than myself.
                </li>
                <li className="type-body-sm pl-1 text-secondary">
                  Learn which evidence makes a recommendation actionable.
                </li>
              </ul>
            </div>
          </div>
        </Section>

        <Section
          kicker="Reflection"
          title="The most important design decision was deciding where the system should slow down"
          last
        >
          <p className="type-body-lg m-0 max-w-[900px] text-secondary">
            Conversation and configuration support exploration. Selection creates
            a reviewable commitment. Record creation and publishing require
            deliberate human action. The goal was not to automate curation, but
            to widen the curator’s field of view without replacing the judgment
            that gives a collection its meaning.
          </p>
        </Section>
      </CaseStudyShell>
    </div>
  )
}
