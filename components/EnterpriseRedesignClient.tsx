'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { SectionHeading } from '@/components/SectionHeading'
import { LightboxImage } from '@/components/LightboxImage'

// ─── small helpers ────────────────────────────────────────────────────────────

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-block rounded border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 font-mono text-xs text-[var(--color-muted)]">
      {children}
    </span>
  )
}

type SkillLevel = 'H' | 'M/H' | 'M' | 'M/L' | 'L/M' | 'L' | 'Z/L' | 'Z'

function SkillBadge({ level }: { level: SkillLevel }) {
  const cls =
    level === 'H' || level === 'M/H'
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : level === 'M'
        ? 'bg-amber-50 text-amber-700 border-amber-200'
        : level === 'Z/L' || level === 'Z'
          ? 'bg-red-50 text-red-600 border-red-200'
          : 'bg-stone-100 text-stone-500 border-stone-200'
  return (
    <span className={`inline-block rounded border px-2 py-0.5 font-mono text-xs ${cls}`}>
      {level}
    </span>
  )
}

// ─── user journey section ─────────────────────────────────────────────────────

type JourneyRow = { rowLabel: string; pain: boolean; cells: string[] }
type JourneyCategory = { label: string; subtitle: string; table: JourneyRow[] }

const JOURNEY_CATEGORIES: JourneyCategory[] = [
  {
    label: 'Category 1 — Finding First Success',
    subtitle: 'New customers who just finished training and are building their first use case',
    table: [
      {
        rowLabel: 'Actions',
        pain: false,
        cells: [
          'Identify a business problem, prepare data, and set up the first task',
          'Submit the task and wait for results',
          'Review feature list and model output',
          'Adjust configuration and rerun',
        ],
      },
      {
        rowLabel: "I'm wondering...",
        pain: false,
        cells: [
          '"Where do I even start?"',
          '"Did I set this up correctly?"',
          '"Is this result good or bad?"',
          '"What should I change?"',
        ],
      },
      {
        rowLabel: 'Pain points',
        pain: true,
        cells: [
          "The flow feels overwhelming with no clear starting point. Changing data format means rebuilding the entire schema from scratch.",
          "No feedback during the wait — users don't know if something went wrong until hours later.",
          "Metrics like F-score are unfamiliar. Users can't evaluate results on their own.",
          'No guidance on what to iterate or what impact a change will have.',
        ],
      },
    ],
  },
  {
    label: 'Category 2 — Hitting Walls',
    subtitle: 'Users with 1–2 active use cases who still rely on the DS team to validate their work',
    table: [
      {
        rowLabel: 'Actions',
        pain: false,
        cells: [
          'Set up target table, Time ER, and task parameters for a new use case',
          'Submit task and wait',
          'Check accuracy and decide if the model is ready',
          'Adjust configuration or refresh data when new data arrives',
        ],
      },
      {
        rowLabel: "I'm wondering...",
        pain: false,
        cells: [
          '"Am I configuring this the right way?"',
          `"Will this take another 3 hours to find out it's wrong?"`,
          '"Is this accurate enough? How do I know?"',
          '"Can I update the data without retraining everything?"',
        ],
      },
      {
        rowLabel: 'Pain points',
        pain: true,
        cells: [
          'Target table format varies by use case with no clear guideline. Time ER setup requires DS team help every time.',
          "A misconfiguration isn't caught until the run completes hours later.",
          "No benchmark to compare against. Users can't tell if a result represents progress.",
          'Refreshing data requires a full retrain — reassigning schema, reloading data, starting over — every 3–6 months.',
        ],
      },
    ],
  },
  {
    label: 'Category 3 — Scaling Up',
    subtitle: 'Power users focused on expanding use cases and improving model accuracy',
    table: [
      {
        rowLabel: 'Actions',
        pain: false,
        cells: [
          'Plan use case strategy and evaluate configuration approaches',
          'Run multiple configuration variants and compare',
          'Analyze feature importance and identify problem areas',
          'Refine strategy by segment and validate improvements',
        ],
      },
      {
        rowLabel: "I'm wondering...",
        pain: false,
        cells: [
          '"Is my approach right before I commit to it?"',
          '"Which configuration actually performed better?"',
          '"Which segment is underperforming, and why?"',
          '"Am I iterating on the right thing?"',
        ],
      },
      {
        rowLabel: 'Pain points',
        pain: true,
        cells: [
          "Needs DS team sign-off on strategic direction before moving forward. Can't bring in open-source libraries to improve accuracy.",
          'Connecting to large datasets like Synapse is slow and blocks progress.',
          'Hard to explain model output to business stakeholders. Segment-level issues are difficult to surface.',
          'Iteration direction is unclear — relies on experience and guesswork.',
        ],
      },
    ],
  },
]

function UserJourneySection() {
  const [active, setActive] = useState(0)
  const cat = JOURNEY_CATEGORIES[active]

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-3">
        {JOURNEY_CATEGORIES.map((c, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={
              active === i
                ? 'border border-[var(--color-accent)] bg-[#eef2f7] text-[var(--color-accent)] px-5 py-2 font-mono text-xs rounded-full cursor-pointer'
                : 'border border-[var(--color-border)] bg-transparent text-[var(--color-muted)] px-5 py-2 font-mono text-xs rounded-full cursor-pointer hover:border-[var(--color-text)] hover:text-[var(--color-text)] transition-colors'
            }
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-5 mb-8 border-l-2 border-[var(--color-accent)] pl-4">
        <p className="font-sans text-sm text-[var(--color-text)]">{cat.subtitle}</p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[680px]">
          <div className="grid grid-cols-[120px_1fr_1fr_1fr_1fr] gap-3">
            <div />
            {['Configure', 'Run', 'Read Results', 'Iterate'].map((col) => (
              <div
                key={col}
                className="pb-2 text-center font-mono text-xs text-[var(--color-muted)]"
              >
                {col}
              </div>
            ))}
          </div>
          {cat.table.map((row) => (
            <div
              key={row.rowLabel}
              className="mt-3 grid grid-cols-[120px_1fr_1fr_1fr_1fr] gap-3"
            >
              <div className="flex items-start pr-3 pt-2 font-mono text-xs text-[var(--color-muted)]">
                {row.rowLabel}
              </div>
              {row.cells.map((cell, i) => (
                <div
                  key={i}
                  className={`rounded p-3 font-sans text-xs leading-relaxed ${
                    row.pain
                      ? 'bg-amber-50 text-amber-800'
                      : 'bg-[var(--color-surface)] text-[var(--color-muted)]'
                  }`}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default function EnterpriseRedesignClient() {
  return (
    <article className="bg-[var(--color-bg)]">

      {/* back */}
      <div className="px-6 pt-8">
        <Link
          href="/"
          className="font-mono text-xs text-[var(--color-muted)] transition-opacity hover:opacity-70"
        >
          ← Back
        </Link>
      </div>

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <header className="border-b border-[var(--color-border)] px-6 pb-16 pt-8">
        <div className="mx-auto max-w-content">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
            Enterprise AI · dotData · Senior Product Designer
          </p>
          <h1 className="mt-5 font-display text-4xl leading-tight tracking-tight text-[var(--color-text)] md:text-5xl">
            From linear wizard<br />to canvas workspace
          </h1>
          <p className="mt-6 max-w-[620px] font-sans text-lg leading-[1.75] text-[var(--color-muted)]">
            Business analysts were spending hours fighting a configuration UI designed for
            data scientists. I redesigned the AutoML pipeline — cutting setup time in half and
            eliminating the need for expert handholding.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              'Workflow redesign',
              'Complex systems UX',
              'Prototyping',
              'Enterprise AI',
            ].map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
      </header>

      {/* hero image */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-16">
        <div className="mx-auto max-w-hero">
          <Image
            src="/images/Enterprise_Redesign1.png"
            alt="dotData Enterprise AutoML canvas workspace overview"
            width={1600}
            height={900}
            className="block h-auto w-full max-w-full [object-fit:unset]"
            sizes="(max-width: 900px) 100vw, 900px"
            unoptimized
          />
        </div>
      </section>

      {/* ── 2. STAT CARDS ───────────────────────────────────────────────────── */}
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-wide grid grid-cols-1 divide-y divide-[var(--color-border)] md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="px-10 py-12">
            <p className="font-display text-5xl leading-none tracking-tight text-[var(--color-text)]">
              50%
            </p>
            <p className="mt-3 font-sans text-sm text-[var(--color-muted)]">
              Reduction in setup time
            </p>
          </div>
          <div className="px-10 py-12">
            <p className="font-display text-5xl leading-none tracking-tight text-[var(--color-text)]">
              0
            </p>
            <p className="mt-3 font-sans text-sm text-[var(--color-muted)]">
              DS team required to run a model
            </p>
          </div>
          <div className="px-10 py-12">
            <p className="font-display text-5xl leading-none tracking-tight text-[var(--color-text)]">
              10→5
            </p>
            <p className="mt-3 font-sans text-sm text-[var(--color-muted)]">
              Minutes avg. configuration
            </p>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ────────────────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-wide space-y-24 px-6 py-24">

      {/* ── 3. CONTEXT ──────────────────────────────────────────────────── */}
      <section>
          <SectionHeading>Context</SectionHeading>
          <div className="mt-8 grid grid-cols-1 gap-12">
            <div className="space-y-5 font-sans leading-[1.75] text-[var(--color-text)]">
              <p>
                dotData&apos;s AutoML platform was designed to help business analysts build prediction 
                models without a data science team. But most of them had no data science background, 
                so they didn&apos;t really know what they were building. The existing linear form worked 
                if you already knew what you were doing. If you didn&apos;t, every wrong move meant starting 
                over and waiting an hour to find out.
              </p>
            </div>
          </div>
        </section>    
        
        {/* ── 3. DISCOVERY ──────────────────────────────────────────────────── */}
        <section>
          <SectionHeading>Discovery</SectionHeading>

          {/* Part A – Persona skill matrix */}
          <div className="mt-10">
            <p>
              The platform served users across a wide technical spectrum, but the primary target users 
              were business analysts. They scored near-zero on data engineering, which was the exact 
              skill the configuration UI assumed they had.
            </p>
            <details className="mt-3">
              <summary className="mt-3 cursor-pointer font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors list-none">
              ▸ View skill matrix
              </summary>
              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-[var(--color-border)]">
                      <th className="pb-3 pr-6 text-left font-mono text-xs font-normal text-[var(--color-muted)]">
                        User type
                      </th>
                      {[
                        'Business Domain',
                        'Data Domain',
                        'Data Engineering',
                        'ML Knowledge',
                        'Analytics Tooling',
                      ].map((col) => (
                        <th
                          key={col}
                          className="px-3 pb-3 text-left font-mono text-xs font-normal text-[var(--color-muted)]"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border)]">
                    {/* Business Analyst — highlighted row */}
                    <tr className="bg-amber-50/40">
                      <td className="py-3 pr-6 font-sans text-sm font-semibold text-[var(--color-text)]">
                        Business Analyst
                        <span className="ml-2 font-mono text-[10px] font-normal text-amber-600">
                          ← primary user
                        </span>
                      </td>
                      {(
                        ['M/H', 'M', 'Z/L', 'L', 'L/M'] as SkillLevel[]
                      ).map((v, i) => (
                        <td key={i} className="px-3 py-3">
                          <SkillBadge level={v} />
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 pr-6 font-sans text-sm text-[var(--color-text)]">
                        Junior BI Engineer
                      </td>
                      {(
                        ['M', 'M/H', 'M', 'L', 'M'] as SkillLevel[]
                      ).map((v, i) => (
                        <td key={i} className="px-3 py-3">
                          <SkillBadge level={v} />
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 pr-6 font-sans text-sm text-[var(--color-text)]">
                        Senior BI Engineer
                      </td>
                      {(
                        ['H', 'H', 'M/H', 'M/L', 'H'] as SkillLevel[]
                      ).map((v, i) => (
                        <td key={i} className="px-3 py-3">
                          <SkillBadge level={v} />
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 pr-6 font-sans text-sm text-[var(--color-text)]">
                        Junior Data Scientist
                      </td>
                      {(
                        ['L', 'M/H', 'M', 'M/H', 'L/M'] as SkillLevel[]
                      ).map((v, i) => (
                        <td key={i} className="px-3 py-3">
                          <SkillBadge level={v} />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

            {/* legend */}
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <span className="font-mono text-xs text-[var(--color-muted)]">Key:</span>
              {(
                [
                  ['M/H', 'Medium / High'],
                  ['M',   'Medium'],
                  ['L',   'Low'],
                  ['Z/L', 'Near-zero / Low'],
                ] as [SkillLevel, string][]
              ).map(([level, label]) => (
                <span key={level} className="flex items-center gap-1.5">
                  <SkillBadge level={level} />
                  <span className="font-mono text-xs text-[var(--color-muted)]">{label}</span>
                </span>
              ))}
            </div>
            </details>
          </div>

          {/* Part B – User Journey */}
          <div className="mt-16">
            <h3 className="font-sans text-base font-semibold text-[var(--color-text)] py-4">
              How users actually work
            </h3>
            <p>
                To understand where the real friction was, we ran user interviews across different customer accounts. 
                What we found was that segmenting by experience level wasn&apos;t useful. What mattered was where 
                users got stuck. Across interviews, three distinct patterns emerged — each breaking down at a
                different point in the same loop.
              </p>
            <details className="mt-3">
              <summary className="mt-3 cursor-pointer font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors list-none">
              ▸ View user journey
              </summary>
              <UserJourneySection />
            </details>
          </div>

          {/* Part C – Interview quotes */}
          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Rigid workflow */}
            <div className="rounded-lg bg-violet-50 p-5">
              <span className="mb-4 inline-block rounded-full border border-violet-200 bg-violet-100 px-3 py-1 font-mono text-xs text-violet-700">
                Rigid workflow
              </span>
              <div className="space-y-4">
                <div className="border-l-2 border-violet-400 pl-3">
                  <p className="font-sans text-sm italic leading-[1.75] text-[var(--color-text)]">
                    &ldquo;I want to see a warning when I made a mistake during table connections.&rdquo;
                  </p>
                  <p className="mt-2 font-mono text-xs text-[var(--color-muted)]">— Daniil, Business Analyst</p>
                </div>
                <div className="border-l-2 border-violet-400 pl-3">
                  <p className="font-sans text-sm italic leading-[1.75] text-[var(--color-text)]">
                    &ldquo;I want to see PET in the MDT stage.&rdquo;
                  </p>
                  <p className="mt-2 font-mono text-xs text-[var(--color-muted)]">— Daniil</p>
                </div>
              </div>
            </div>

            {/* Invisible ripple effects */}
            <div className="rounded-lg bg-amber-50 p-5">
              <span className="mb-4 inline-block rounded-full border border-amber-200 bg-amber-100 px-3 py-1 font-mono text-xs text-amber-700">
                Invisible ripple effects
              </span>
              <div className="space-y-4">
                <div className="border-l-2 border-amber-400 pl-3">
                  <p className="font-sans text-sm italic leading-[1.75] text-[var(--color-text)]">
                    &ldquo;Sometimes they need to upload CSV files multiple times if they change data types or add columns.&rdquo;
                  </p>
                  <p className="mt-2 font-mono text-xs text-[var(--color-muted)]">— Daniil</p>
                </div>
                <div className="border-l-2 border-amber-400 pl-3">
                  <p className="font-sans text-sm italic leading-[1.75] text-[var(--color-text)]">
                    &ldquo;They have a hard time understanding why they need to define schema before uploading data.&rdquo;
                  </p>
                  <p className="mt-2 font-mono text-xs text-[var(--color-muted)]">— Daniil</p>
                </div>
              </div>
            </div>

            {/* Expert trap */}
            <div className="rounded-lg bg-pink-50 p-5">
              <span className="mb-4 inline-block rounded-full border border-pink-200 bg-pink-100 px-3 py-1 font-mono text-xs text-pink-700">
                Expert trap
              </span>
              <div className="space-y-4">
                <div className="border-l-2 border-pink-400 pl-3">
                  <p className="font-sans text-sm italic leading-[1.75] text-[var(--color-text)]">
                    &ldquo;What is the main purpose of generating a feature from a target table? What does it mean?&rdquo;
                  </p>
                  <p className="mt-2 font-mono text-xs text-[var(--color-muted)]">— Daniil</p>
                </div>
                <div className="border-l-2 border-pink-400 pl-3">
                  <p className="font-sans text-sm italic leading-[1.75] text-[var(--color-text)]">
                    &ldquo;DS team provided an 8–10 week bootcamp to train the user.&rdquo;
                  </p>
                  <p className="mt-2 font-mono text-xs text-[var(--color-muted)]">— Sam</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. THE PROBLEM ──────────────────────────────────────────────────── */}
        <section>
          <SectionHeading>The Problem</SectionHeading>
          <div className="mt-8 grid grid-cols-1 gap-12">
            <div className="space-y-5 font-sans leading-[1.75] text-[var(--color-text)]">
              <p>
              The initial goal was straightforward: improve adoption after training. Around 80 users 
              had gone through onboarding, but fewer than 5 were actually using the product.
              </p>
              <p>
              Early on, we assumed the navigation was the problem. Consolidating the isolated 
              wizards helped, but BAs were still getting stuck. The issue wasn&apos;t the UI flow. 
              It was that the product assumed users understood data science concepts they had never 
              been taught.
              </p>
              <p>
              That shifted the question from &quot;how do we make the workflow easier to 
              navigate?&quot; to &quot;how do we help business analysts build models without 
              needing a data scientist next to them?&quot;
              </p>
            </div>
          </div>
        </section>        


        {/* ── 4. THE OPPORTUNITY ──────────────────────────────────────────────────── */}            
        <section>
          <SectionHeading>Opportunity</SectionHeading>

          <div className="mt-8 grid grid-cols-1 gap-12">
            <div className="space-y-5 font-sans leading-[1.75] text-[var(--color-text)]">
              <p>
                We had a few directions to consider:
              </p>

              <ul className="mt-6 space-y-4">
                {[
                  {
                    title: 'Merge the isolated wizards',
                    body: "Safest bet — users already knew the UI, and the lift was low. But it felt like fixing the navigation without fixing the confusion underneath.",
                  },
                  {
                    title: 'Inline tutorials',
                    body: "Required significant content work and assumed users would engage at the right moment.",
                  },
                  {
                    title: 'Use case templates',
                    body: "Some competitors had done it, but the scope was unclear. Who builds them? Who maintains them? Are they public or company-specific? Every industry would need its own set.",
                  },
                  {
                    title: 'Visualize the dependency of the workflow',
                    body: "Make the structure visible, so users could build the right mental model without needing a data scientist to explain it.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4 rounded bg-[var(--color-surface)] p-4">
                    <span className="mt-0.5 font-mono text-xs text-[var(--color-muted)]">—</span>
                    <div>
                      <p className="font-sans text-sm font-semibold text-[var(--color-text)]">{item.title}</p>
                      <p className="mt-1 font-sans text-sm leading-[1.75] text-[var(--color-muted)]">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <p>
                The first three were treating symptoms. Users weren&apos;t lost because of navigation 
                or missing instructions. They were lost because they couldn&apos;t see how their 
                decisions connected to each other.
              </p>
              <p>
                I brought the canvas concept to the PM expecting pushback. Instead, he said 
                this was the right direction. That was enough to move forward.
              </p>
            </div>
          </div>
        </section>
        



        {/* ── 5. THE INSIGHT ────────────────────────────────────────────────── */}
        <section>
          <SectionHeading>The Insight</SectionHeading>
          <blockquote className="mt-8 border-l-4 border-[var(--color-accent)] pl-8 md:pl-12">
            <p className="font-display text-2xl leading-snug tracking-tight text-[var(--color-text)] md:text-3xl">
              &ldquo;Every parameter is just a variable that determines the shape of one flat
              table. The interface was hiding that output until it was too late to adjust.&rdquo;
            </p>
          </blockquote>
          <p className="mt-6 max-w-[680px] font-sans leading-[1.75] text-[var(--color-muted)]">
            This flipped the design direction — instead of optimizing the wizard, we needed to
            make the construction logic visible in real time. The result was a{' '}
            <strong className="text-[var(--color-text)]">canvas-based workspace</strong>.
          </p>
        </section>

        {/* ── 6. WIZARD vs CANVAS ───────────────────────────────────────────── */}
        <section>
          <SectionHeading>From wizard to workspace</SectionHeading>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-[var(--color-surface)] p-6">
              <LightboxImage
                src="/images/er-linear-wizard.png"
                alt="Linear wizard mockup"
                className="mb-6 block h-auto w-full"
              />
              <h3 className="font-display text-xl text-[var(--color-text)]">Linear Wizard</h3>
              <p className="mt-3 font-sans text-sm leading-[1.75] text-[var(--color-muted)]">
                Simpler navigation, but delayed feedback. A mistake on step 4 meant restarting
                from step 1 — users couldn&apos;t see how choices connected.
              </p>
            </div>
            <div className="border-l-2 border-[var(--color-accent)] bg-[var(--color-surface)] p-6">
              <LightboxImage
                src="/images/er-open-canvas-v1.png"
                alt="Open canvas workspace mockup"
                className="mb-6 block h-auto w-full"
              />
              <h3 className="font-display text-xl text-[var(--color-text)]">Canvas Workspace</h3>
              <p className="mt-3 font-sans text-sm leading-[1.75] text-[var(--color-muted)]">
                Faster iteration, visible dependencies. More complex to learn — but matched how
                analysts actually think about data relationships.
              </p>
            </div>
          </div>
        </section>

        {/* ── 7. THREE SOLUTIONS ────────────────────────────────────────────── */}
        <section>
          <SectionHeading>Three Solutions</SectionHeading>
          <div className="mt-12 space-y-20">

            <div className="border-l-2 border-[var(--color-border)] pl-8">
              <p className="font-mono text-xs text-[var(--color-muted)]">01</p>
              <h3 className="mt-2 font-sans text-base font-semibold text-[var(--color-text)]">
                Contextual &ldquo;Define Target&rdquo; panel
              </h3>
              <p className="mt-3 max-w-[600px] font-sans leading-[1.75] text-[var(--color-muted)]">
                Non-linear overlay lets users adjust parameters inline — no full restarts.
                Interactive timeline visualization replaces static tooltips, making time-window
                logic tangible.
              </p>
              <div className="mt-8 mx-auto max-w-hero">
                <video
                  src="/videos/target-configuration.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full rounded-xl"
                />
              </div>
            </div>

            <div className="border-l-2 border-[var(--color-border)] pl-8">
              <p className="font-mono text-xs text-[var(--color-muted)]">02</p>
              <h3 className="mt-2 font-sans text-base font-semibold text-[var(--color-text)]">
                Real-time table exploration (Cleansed View)
              </h3>
              <p className="mt-3 max-w-[600px] font-sans leading-[1.75] text-[var(--color-muted)]">
                Peek into any table on the canvas before running the model. Data distributions
                and types surface instantly — catching errors in seconds, not days.
              </p>
              <div className="mt-8 mx-auto max-w-hero">
                <video
                  src="/videos/real-time-table-exploration.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full rounded-xl"
                />
              </div>
            </div>

            <div className="border-l-2 border-[var(--color-border)] pl-8">
              <p className="font-mono text-xs text-[var(--color-muted)]">03</p>
              <h3 className="mt-2 font-sans text-base font-semibold text-[var(--color-text)]">
                Auto-connect + systemic validation
              </h3>
              <p className="mt-3 max-w-[600px] font-sans leading-[1.75] text-[var(--color-muted)]">
                Schema-based relationship suggestions remove the need for database knowledge.
                Actionable inline errors replace the &ldquo;waiting game&rdquo; — no more
                silent failures at the end of a training run.
              </p>
              <div className="mt-8 mx-auto max-w-hero">
                <video
                  src="/videos/auto-connect-and-validation.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full rounded-xl"
                />
              </div>
            </div>

          </div>
        </section>

        {/* ── 8. VALIDATION ─────────────────────────────────────────────────── */}
        <section>
          <SectionHeading>Validation</SectionHeading>
          <div className="mt-8 max-w-[680px] space-y-5 font-sans leading-[1.75] text-[var(--color-text)]">
            <p>
              Tested with business analytics students using a real server-failure dataset. Key
              finding: participants skipped every static description — confirming that{' '}
              <strong>user education is not a substitute for intuitive design</strong>.
            </p>
            <p className="italic text-[var(--color-muted)]">
              &ldquo;One tester&apos;s struggle to connect a static definition to the panel led
              directly to the interactive timeline — turning a concept into a visible tool.&rdquo;
            </p>
          </div>
        </section>

        {/* ── 9. REFLECTION ─────────────────────────────────────────────────── */}
        <section>
          <SectionHeading>Reflection</SectionHeading>
          <div className="mt-8 max-w-[680px] font-sans leading-[1.75] text-[var(--color-text)]">
            <p>
              The real challenge wasn&apos;t adding clarity — it was deciding{' '}
              <strong>what to hide</strong>. Most design work was navigating that tension: enough
              signal to build confidence, not enough noise to cause second-guessing. The next
              frontier is closing the loop between configuration and model performance.
            </p>
          </div>
        </section>

        {/* ── 10. BEYOND THE CANVAS (bonus) ─────────────────────────────────── */}
        <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
            Bonus · Speculative Design
          </p>
          <h2 className="mt-4 font-display text-2xl leading-tight tracking-tight text-[var(--color-text)] md:text-3xl">
            Beyond the canvas — reimagining with agentic AI
          </h2>
          <p className="mt-4 max-w-[600px] font-sans leading-[1.75] text-[var(--color-muted)]">
            The canvas solved visibility, but still assumed users arrived with a clear use case.
            With agentic AI, we can shift from &ldquo;configuring a tool&rdquo; to
            &ldquo;collaborating with an expert.&rdquo; I used Cursor to prototype what this
            could look like.
          </p>
          <div className="mt-8 mx-auto max-w-hero">
            <video
              src="/videos/er-data-quality-check.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded-xl"
            />
          </div>
          <div className="mt-8">
            <a
              href="/prototypes/ai-modeling-advisor.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[var(--color-border)] px-5 py-3 font-sans text-sm font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Try the prototype →
            </a>
          </div>
        </section>

      </div>
    </article>
  )
}
