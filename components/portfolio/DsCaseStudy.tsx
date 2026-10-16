'use client'

import { useState } from 'react'

import { Lightbox } from '@/components/Lightbox'
import {
  Decision,
  Frame,
  Key,
  Kicker,
  Section,
  caption,
  prose,
  wide,
  type Zoom,
  type ZoomFn,
} from '@/components/portfolio/AutomlCaseStudy'
import { CaseStudyNav, type CaseStudyNavTab } from '@/components/portfolio/CaseStudyNav'
import { DS_CASE_TITLE as CASE_TITLE } from '@/lib/dsCaseTitle'

/**
 * /work/dotds: dotData Design System case study. Reuses the AutoML layout primitives.
 * The ER card states and token tiers are HTML rebuilds with generic labels.
 */

const TABS: CaseStudyNavTab[] = [
  { id: 'overview', label: 'Overview', color: '#a8d8a0' },
  { id: 'problem', label: 'The problem', color: '#e6c07b' },
  { id: 'decisions', label: 'Key decisions', color: '#E59BD3' },
  { id: 'outcome', label: 'Outcome', color: '#B48CE0' },
  { id: 'learned', label: 'What I learned', color: '#7fc4e8' },
]

const META = [
  { label: 'Role', value: 'Design system owner' },
  { label: 'Team', value: '1 designer, 1 engineer' },
]

const CALLOUTS = [
  {
    value: '−2/3',
    label: 'Design-spec and audit tickets',
    context: 'Fewer design-spec and audit tickets once engineers read tokens in Dev Mode.',
  },
  {
    value: '3 tools → 1',
    label: 'One source of truth',
    context: 'Sketch, Zeplin and InVision consolidated into Figma.',
  },
]

const OUTCOMES: [string, string][] = [
  ['One source of truth.', 'Sketch, Zeplin and InVision consolidated into Figma.'],
  ['Adopted in the product.', 'Core, semantic and component tokens are all in use in code.'],
]

const LEARNED: [string, string][] = [
  ['Adoption is a design problem.', 'A library doesn’t guarantee consistent use; good defaults do.'],
  ['Name things the way engineers do.', 'Matching CSS variable names removed a translation step from every handoff.'],
  ['Scope before you enforce.', 'Private component tokens, with semantic tokens still open for in-between cases, kept the system easy to adopt.'],
]

/* ---------- ER card (HTML rebuild, generic labels) ---------- */

type CardState = 'default' | 'selected' | 'target' | 'error'

const FIELDS: [string, string][] = [
  ['key', 'id'],
  ['date', 'created_at'],
  ['key', 'customer_id'],
  ['num', 'order_total'],
  ['key', 'a_very_long_column_name'],
]

function FieldIcon({ kind }: { kind: string }) {
  const c = 'w-3.5 shrink-0 text-center text-[11px] text-[#6B7280]'
  return <span className={c} aria-hidden>{kind === 'num' ? '#' : kind === 'date' ? '▢' : '⚷'}</span>
}

function ErCard({ state }: { state: CardState }) {
  const header = {
    default: 'bg-[#DCDDEF] text-[#1F2937]',
    selected: 'bg-[#DCDDEF] text-[#1F2937]',
    target: 'bg-[#1F7A4D] text-white',
    error: 'bg-[#E5484D] text-white',
  }[state]
  const border = {
    default: 'border-[#E5E7EB]',
    selected: 'border-[#7BD3A4] ring-2 ring-[#7BD3A4]/30',
    target: 'border-[#E5E7EB]',
    error: 'border-[#F2A3A5]',
  }[state]
  return (
    <div className={`overflow-hidden rounded-[8px] border bg-white text-left shadow-[0_1px_2px_rgba(16,24,40,0.05)] ${border}`}>
      <div className={`flex h-8 items-center gap-1.5 px-2.5 text-[12px] font-semibold ${header}`}>
        <span className="min-w-0 flex-1 truncate">orders_table</span>
        {state === 'target' && (
          <span className="shrink-0 rounded-full bg-[#F5B53F] px-1.5 text-[10px] font-semibold leading-[16px] text-white">Target</span>
        )}
        <span className="shrink-0 opacity-60" aria-hidden>···</span>
      </div>
      <ul className={`m-0 list-none space-y-1.5 px-2.5 py-2 ${state === 'target' ? 'border-l-2 border-[#1F7A4D]' : ''}`}>
        {FIELDS.map(([k, name]) => (
          <li key={name} className="flex items-center gap-1.5 text-[11.5px] text-[#374151]">
            <FieldIcon kind={k} />
            <span className="min-w-0 truncate">{name}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between gap-2 border-t border-[#F1F2F4] px-2.5 py-1.5">
        {state === 'error' ? (
          <span className="flex h-6 w-full items-center justify-center rounded-[5px] border border-[#F2A3A5] bg-[#FDECEC] text-[11px] font-semibold text-[#C62F34]">
            ⚠ Review table
          </span>
        ) : (
          <>
            <span className="text-[10px] text-[#9CA3AF]">Total 100 columns</span>
            <span className="rounded-[5px] border border-[#E5E7EB] px-1.5 text-[10.5px] leading-[20px] text-[#374151]">View</span>
          </>
        )}
      </div>
    </div>
  )
}

const panel = 'rounded-[20px] border border-[#ECE6EE] bg-[#F6F5F7] p-5 min-[641px]:p-8'

function CardStates() {
  const states: [CardState, string][] = [
    ['default', 'Default'],
    ['selected', 'Selected'],
    ['target', 'Target'],
    ['error', 'Error'],
  ]
  return (
    <figure className={`m-0 ${wide}`}>
      <div className={panel}>
        <div className="grid grid-cols-2 gap-4 min-[761px]:grid-cols-4">
          {states.map(([s, label]) => (
            <div key={s}>
              <ErCard state={s} />
              <div className="mt-2 text-[13px] font-semibold text-brand-muted">{label}</div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className={`mt-3 ${caption}`}>
        One card, four states. Long field names truncate, so cards keep one height across any schema.
      </figcaption>
    </figure>
  )
}

const TIERS: { title: string; sub: string; rows: [string, string][] }[] = [
  {
    title: 'Component tokens',
    sub: 'card / er-card',
    rows: [['#FFFFFF', 'content / bg'], ['#374151', 'content / fg'], ['#EEF0F3', 'border'], ['#7BD3A4', 'border-highlight']],
  },
  {
    title: 'Semantic tokens',
    sub: 'Meaning-based roles',
    rows: [['#FFFFFF', 'background / default'], ['#374151', 'text / secondary'], ['#EEF0F3', 'border / secondary'], ['#7BD3A4', 'border / positive']],
  },
  {
    title: 'Core tokens',
    sub: 'Raw values',
    rows: [['#FFFFFF', 'base / white'], ['#374151', 'gray / 700'], ['#EEF0F3', 'gray / 100'], ['#7BD3A4', 'green / 300']],
  },
]

function TokenTiers() {
  return (
    <figure className={`m-0 ${wide}`}>
      <div className={panel}>
        <div className="grid grid-cols-1 items-center gap-3 min-[761px]:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
          <div className="mx-auto w-full max-w-[220px]">
            <ErCard state="target" />
          </div>
          {TIERS.map((t) => (
            <div key={t.title} className="contents">
              <div className="text-center text-[18px] text-brand-muted max-[760px]:rotate-90" aria-hidden>→</div>
              <div className="rounded-[10px] border border-[#ECE6EE] bg-white p-3">
                <div className="text-[13px] font-semibold text-brand-ink">{t.title}</div>
                <div className="text-[12px] text-brand-muted">{t.sub}</div>
                <ul className="m-0 mt-2.5 list-none space-y-1.5 border-t border-[#F1EEF2] p-0 pt-2.5">
                  {t.rows.map(([hex, name]) => (
                    <li key={name} className="flex items-center gap-2 text-[12px] text-brand-body">
                      <span className="size-3 shrink-0 rounded-[3px] border border-[#E5E7EB]" style={{ background: hex }} aria-hidden />
                      <span className="min-w-0 truncate">{name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className={`mt-3 ${caption}`}>
        Each card state resolves through three tiers: component intent, semantic role, core value.
      </figcaption>
    </figure>
  )
}

export function DsCaseStudy() {
  const [zoom, setZoom] = useState<Zoom | null>(null)
  const onZoom: ZoomFn = (src, alt) => setZoom({ src, alt })

  return (
    <div data-page-motion="none" className="overflow-x-clip bg-white pt-12 font-inter text-brand-ink">
      <CaseStudyNav tabs={TABS} />

      <div className="mx-auto box-content max-w-[680px] px-5 pb-24 min-[641px]:px-8">
        <section id="overview" className="scroll-mt-12 pt-14 min-[641px]:pt-20">
          <Kicker>dotData · Design system</Kicker>
          <h1 className="m-0 font-grotesk text-[34px] font-bold leading-[1.1] tracking-[-0.015em] text-brand-ink min-[641px]:text-[48px]">
            {CASE_TITLE}
          </h1>
          <p className={`${prose} mt-7`}>
            Handoff ran through Sketch, Zeplin and InVision, and a lot of time went into auditing which spec
            was real. I rebuilt the system in Figma on a three-layer token architecture that matches
            engineering’s CSS variables. <Key>Engineers now read tokens directly in Dev Mode</Key>, and
            design-spec and audit tickets dropped by two-thirds.
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
              src="/images/ds/ds-hero.png"
              alt="The dotData component library: buttons, inputs, tabs and form controls"
              onZoom={onZoom}
              caption="The component library, built on shared tokens."
            />
          </div>
        </section>

        <Section id="problem" label="The problem" title="A design system spread across too many tools">
          <p className={prose}>
            Handoff was spread across Sketch, Zeplin and InVision. Every component change had to be synced
            by hand across all three, and when a step was missed, engineers guessed and audits piled up.{' '}
            <Key>The problem wasn’t missing components; we had no dependable way to communicate design decisions.</Key>
          </p>
          <div className={`mt-10 ${wide}`}>
            <Frame
              src="/images/ds/ch01-legacy-flow-flat.png"
              alt="The legacy update flow: one component change synced across Sketch, Zeplin and InVision"
              onZoom={onZoom}
              caption="One change, synced by hand across three tools."
            />
          </div>
        </Section>

        <Section id="decisions" label="Key decisions" title="Three decisions that made the system usable">
          <Decision
            num="01"
            title="Give design and code one token language"
            media={
              <div className={wide}>
                <Frame
                  src="/images/ds/ch02-token-chain-flat.png"
                  alt="Token reference chain: a component token resolves to a semantic token, which resolves to a core value"
                  onZoom={onZoom}
                  caption="Component → semantic → core: intent and global impact in one chain."
                />
              </div>
            }
          >
            <p className={prose}>
              I replaced hard-coded values with core tokens for raw values and semantic tokens for roles like
              text-primary. <Key>Figma variable names map 1:1 to CSS variables</Key>, and engineering implemented
              them in code. Engineers stopped translating specs and started reading them.
            </p>
          </Decision>

          <Decision
            num="02"
            title="Add a private component-token layer"
            media={null}
          >
            <p className={prose}>
              Semantic tokens were abstract enough that the same component ended up with different semantic
              tokens across screens. I added component tokens like <code className="text-[15px]">--button-bg</code>,
              scoped to their component, so <Key>the intended style became the default</Key> and one-off
              overrides stopped.
            </p>
          </Decision>

          <Decision num="03" title="Turn recurring states into reusable components" media={null}>
            <p className={prose}>
              I turned recurring table, selection and feedback states into components backed by the token
              tiers. The ER card ships default, selected, target and error states, and long field names
              truncate to one line, so <Key>cards keep one height across any schema</Key>.
            </p>
          </Decision>
        </Section>

        <Section id="outcome" label="Outcome" title="Adopted, with two-thirds fewer tickets">
          <p className={prose}>
            <Key>Design-spec and audit tickets dropped by two-thirds</Key> once engineers could read tokens in
            Dev Mode. The system is adopted in the product, with core, semantic and component tokens in use.
          </p>
          <ul className="m-0 mt-7 list-none space-y-4 p-0">
            {OUTCOMES.map(([lead, text]) => (
              <li key={lead} className="flex gap-3 text-[17px] leading-[1.75] text-brand-body">
                <span className="mt-[12px] inline-block size-1.5 shrink-0 rounded-full bg-brand-muted" aria-hidden />
                <span>
                  <span className="font-semibold text-brand-ink">{lead}</span> {text}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="learned" label="What I learned" title="Defaults beat documentation">
          <ul className="m-0 list-none space-y-7 p-0">
            {LEARNED.map(([lead, text]) => (
              <li key={lead} className="text-[17px] leading-[1.75] text-brand-body">
                <span className="font-semibold text-brand-ink">{lead}</span> {text}
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {zoom && <Lightbox src={zoom.src} alt={zoom.alt} onClose={() => setZoom(null)} />}
    </div>
  )
}
