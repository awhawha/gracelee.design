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

type CarouselSlide = { src: string; alt: string; label: string }

function Carousel({ slides }: { slides: CarouselSlide[] }) {
  const [index, setIndex] = useState(0)
  const prev = () => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1))
  const next = () => setIndex((i) => (i === slides.length - 1 ? 0 : i + 1))

  return (
    <div className="mt-8">
      <div className="flex items-center gap-4 py-8">
        <button
          type="button"
          aria-label="Previous"
          onClick={prev}
          className="shrink-0 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
        >
          &#8592;
        </button>
        <div className="flex-1 overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((slide) => (
              <div
                key={slide.src}
                className="flex h-[300px] w-full shrink-0 items-center justify-center md:h-[460px]"
              >
                <LightboxImage
                  src={slide.src}
                  alt={slide.alt}
                  className="h-full w-full rounded-lg object-contain transition-opacity duration-200 hover:opacity-80"
                />
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          aria-label="Next"
          onClick={next}
          className="shrink-0 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
        >
          &#8594;
        </button>
      </div>
      <p className="font-mono text-xs text-[var(--color-muted)] text-center">
        {slides[index].label}
      </p>
      <div className="mt-2 flex items-center justify-center gap-2 py-4">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === index
                ? 'bg-[var(--color-text)]'
                : 'bg-[var(--color-border)]'
            }`}
          />
        ))}
      </div>
    </div>
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
            Redesigning Enterprise AutoML: Reducing Time-to-Value for business analysts by 40%
          </h1>

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

      {/* ── 3. THE PROBLEM ──────────────────────────────────────────────────── */}
        <section>
          <SectionHeading>The Problem</SectionHeading>
          <div className="mt-8 grid grid-cols-1 gap-12">
            <div className="space-y-5 font-sans leading-[1.75] text-[var(--color-text)]">
              <p>
                The company had a very concrete problem: a partner had trained 80 business analyst
                users on the platform, and fewer than 5 were still using it. The product in the US
                market had essentially frozen.
              </p>
              <p>
                Instead of starting designing, I categorized the support tickets and
                found that more than half of them were related to the data import flow. Then I
                brought a user journey I had mapped to a meeting with the Head of Customer Support,
                wanting to check whether my understanding of how users actually worked matched
                reality. He pushed back on something I had assumed: ML workflows aren&apos;t
                linear. Users need to iterate, going back to improve their model based on what they
                learn from the results. That reframing ended up shaping everything that came after.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-12">
                <img src="/images/support-ticket-by-category.png" alt="Support tickets for the data import flow." />
                {/* <img src="/images/user-journey-map-assumption.png" alt="Uesr journey map assumption." /> */}
              </div>
              <p>
                I also ran usability testing with real users. One observation stuck with me:
                nobody cared about data types. Not a single user wanted to configure them manually.
                And in a separate round of feedback from enterprise customers, one user said,
                &ldquo;With other tools, you can just drag and drop to connect tables visually.&rdquo;
              </p>
            </div>
          </div>

          <details className="mt-8">
            <summary className="cursor-pointer font-mono text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors list-none">
            ▸ View research findings
            </summary>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
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
          </details>
        </section>

        {/* ── 4. FROM WIZARD TO CANVAS ──────────────────────────────────────── */}
        <section>
          <SectionHeading>From wizard to canvas</SectionHeading>
          <div className="mt-8 grid grid-cols-1 gap-12">
            <div className="space-y-5 font-sans leading-[1.75] text-[var(--color-text)]">
              <p>
                The original system had five separate entry points: upload table, create schema, import table,
                create use case, and create MDT. Each lived in its own world, with no visible
                connection between them. Rather than jumping into wireframes, I mapped out every
                object in the system — what data each one held, what actions a user could take on
                it, and how it related to everything else. This wasn&apos;t just a design exercise.
                Having the full object map on the table gave everyone a shared way to see exactly
                why users were getting lost.
              </p>
              
              <p>
                With that foundation, I started asking the same question about every configuration
                field: does the user actually need to decide this, or can the system handle it?
                Source data type is just the type of the uploaded file — there&apos;s no reason to
                ask the user to set it again. Unique constraints turned out to be unnecessary in the
                new technical architecture entirely. These weren&apos;t conclusions I reached on my
                own. Having the object map visible gave the engineers a reason to revisit which
                constraints were real technical requirements and which were just leftovers from the
                old system.
              </p>
              
              <Carousel
                slides={[
                  {
                    src: '/images/OOUX-before.png',
                    alt: 'Map out the object and actions for data import and creation flow.',
                    label: 'Before: 「Five isolated entry points. A mistake in step one meant starting over from scratch.」',
                  },
                  {
                    src: '/images/OOUX-after.png',
                    alt: 'Map out the object and actions for data import and creation flow.',
                    label: 'After:「A single unified flow. Clean up unnecessary fields.」',
                  },
                ]}
              />
              <p>
                While we were still iterating on the wizard structure, something clicked in a
                meeting with the PM. We had been talking about making the ER view more visual so
                users could actually see how their tables related to each other. And then I thought:
                what if the entire configuration was one canvas? Not a linear sequence of steps, but
                everything on the same surface, with the relationships between tables visible the
                whole time. It was a direct response to what the Head of Customer Support had told
                me — if the workflow is iterative, the interface shouldn&apos;t force users through a
                one-way door.
              </p>
              <Carousel
                slides={[
                  {
                    src: '/images/concept-v1.png',
                    alt: 'First version of canvas',
                    label: 'v1: merging isolated entry points into a guided setup wizard',
                  },
                  {
                    src: '/images/concept-v2.png',
                    alt: 'First version of canvas',
                    label: 'v2: visualize the entity relationsip view',
                  },
                  {
                    src: '/images/concept-v3.png',
                    alt: 'First version of canvas',
                    label: 'v3: a flexible canvas concept that displayed all table relationships dynamically on one screen',
                  },
                ]}
              />
              <p>
                I prototyped it over the weekend and brought it to the next meeting. The reaction
                was immediate. People were surprised, and they liked it, but they also saw the
                problems right away: how would users know where to start? What happens when there
                are more than ten tables on the canvas? How do you handle time-related settings in
                this format?
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
                Guided entry with disabled states
              </h3>
              <p className="mt-3 max-w-[600px] font-sans leading-[1.75] text-[var(--color-muted)]">
                The canvas opens with the import table screen already visible, and uses disabled
                states to show users what&apos;s available next. Nobody faces a blank canvas and
                wonders what to do.
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
                Each table card has a fixed height with scroll for additional columns, but columns
                with active relationships always surface to the top. Hovering over a connection line
                shows a quick ER preview, so the most important information stays in view without
                requiring constant scrolling.
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
                Auto-connect + contextual time settings
              </h3>
              <p className="mt-3 max-w-[600px] font-sans leading-[1.75] text-[var(--color-muted)]">
                Schema-based relationship suggestions remove the need for database knowledge.
                Time-related settings are placed directly in context where they&apos;re relevant,
                with default values pre-filled and real examples in the explanations — so users can
                map the settings to their own data, rather than staring at an abstract field trying
                to guess what it&apos;s asking for.
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
              After the redesign, data import support tickets dropped from more than half of all
              incoming tickets to significantly fewer. Sales, which had stopped demoing the product
              entirely, started bringing it back to customers.
            </p>
            <p>
              We ran usability testing with three business analytics students using a real dataset.
              Users completed the full model configuration on their own for the first time, without
              needing help from a data science team. Configuration time dropped from 10 minutes to
              5.
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
