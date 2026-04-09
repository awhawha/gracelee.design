import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { MetadataRow } from '@/components/MetadataRow'
import { SectionHeading } from '@/components/SectionHeading'

export const metadata: Metadata = {
  title: 'Enterprise AutoML Workflow Redesign',
}

function CaseStudyImage({
  src,
  alt,
  variant = 'default',
}: {
  src: string
  alt: string
  variant?: 'hero' | 'default'
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1600}
      height={900}
      className={`mb-12 block h-auto w-full max-w-full object-top [object-fit:unset] ${
        variant === 'hero' ? 'mt-0' : 'mt-8'
      }`}
      sizes="(max-width: 900px) 100vw, 900px"
      unoptimized
    />
  )
}

export default function EnterpriseRedesignPage() {
  return (
    <article className="bg-[var(--color-bg)]">
      <div className="px-6 pt-8">
        <Link
          href="/"
          className="font-mono text-xs text-[var(--color-muted)] transition-opacity hover:opacity-70"
        >
          ← Back
        </Link>
      </div>

      <header className="border-b border-[var(--color-border)] px-6 pb-24 pt-8">
        <div className="mx-auto max-w-content">
          <h1 className="font-display text-4xl leading-tight tracking-tight text-[var(--color-text)] md:text-5xl">
            Enterprise AutoML Workflow Redesign
          </h1>
          <p className="mt-6 max-w-[680px] font-sans text-lg leading-[1.75] text-[var(--color-muted)]">
            The configuration workflow for dotData&apos;s AutoML platform was
            technically correct but impossible to use. I redesigned it from a
            linear wizard into a canvas workspace — cutting setup time in half
            and letting business analysts run models without a data science team.
          </p>
          <div className="mt-12">
            <MetadataRow
              items={[
                { label: 'Role', value: 'Senior Product Designer' },
                {
                  label: 'Product',
                  value: 'dotData Enterprise AI Platform',
                },
                {
                  label: 'Team',
                  value: '2 designers, engineering, solutions',
                },
                {
                  label: 'Focus',
                  value: 'Workflow Design, Complex Systems UX',
                },
              ]}
            />
          </div>
        </div>
      </header>

      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-24">
        <div className="mx-auto max-w-hero">
          <CaseStudyImage
            variant="hero"
            src="/images/Enterprise_Redesign1.png"
            alt="dotData Enterprise AutoML configuration workspace overview"
          />
        </div>
      </section>

      <div className="mx-auto w-full max-w-wide space-y-24 px-6 py-24">
        <section>
          <SectionHeading>The Problem</SectionHeading>
          <div className="mt-8 max-w-[680px] space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
            <p>
              Building a prediction model in dotData means configuring several
              parameters that control how training data gets generated — things
              like the time column, prediction target time, lead time, and
              feature window. These aren&apos;t just form fields. They&apos;re
              tightly coupled, and getting one wrong silently breaks the others.
            </p>
            <p>
              The original workflow was a five-step wizard. Each step felt
              manageable on its own, but the system never surfaced how the steps
              connected. Users would configure the target in step one, then hit
              an error in step four — with no explanation of why, or what to
              change.
            </p>
            <p>
              The real issue wasn&apos;t the interface. It was that the system
              never showed users the consequences of their decisions.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <p className="font-mono text-xs text-[var(--color-muted)]">
                Expert Trap
              </p>
              <p className="mt-2 font-sans leading-[1.75] text-[var(--color-text)]">
                The terminology assumed data science knowledge. Business analysts
                had no frame of reference.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-[var(--color-muted)]">
                Invisible Ripple Effects
              </p>
              <p className="mt-2 font-sans leading-[1.75] text-[var(--color-text)]">
                A parameter change in one step silently altered the dataset in
                another. Users only found out at the end.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-[var(--color-muted)]">
                Rigid Workflow
              </p>
              <p className="mt-2 font-sans leading-[1.75] text-[var(--color-text)]">
                The linear wizard forced users through a fixed sequence, making
                trial and error expensive.
              </p>
            </div>
          </div>
        </section>

        <section>
          <SectionHeading>Understanding the System</SectionHeading>
          <div className="mt-8 max-w-[680px] space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
            <p>
              Before I touched the UI, I spent time with engineers and data
              scientists mapping how the modeling pipeline actually worked. Four
              parameters turned out to be tightly coupled in ways the interface
              never communicated:
            </p>
            <p className="font-mono text-sm text-[var(--color-text)]">
              Time column → Prediction Target Time → Lead Time → Feature Window
            </p>
            <p>
              Each one determines how the system slices data for training.
              Without understanding these dependencies, it would&apos;ve been
              impossible to design something that helped users make correct
              decisions.
            </p>
            <p>
              This is when I realized the UX challenge wasn&apos;t complexity —
              it was invisibility.
            </p>
          </div>
        </section>

        <section>
          <SectionHeading>From Wizard to Workspace</SectionHeading>
          <div className="mt-8 max-w-[680px] space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
            <p>
              The wizard locked users into a sequence that felt logical but
              didn&apos;t match how modeling decisions actually work.
              Configuration isn&apos;t linear — you need to see the whole
              picture before any single step makes sense.
            </p>
            <p>
              I proposed shifting to a canvas workspace where all parameters are
              visible simultaneously, and the system surfaces consequences in
              real time as users make changes.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-[var(--color-surface)] p-6">
              <h3 className="font-display text-xl text-[var(--color-text)]">
                Linear Wizard
              </h3>
              <p className="mt-4 font-sans leading-[1.75] text-[var(--color-text)]">
                Simpler navigation, but delays feedback about configuration
                mistakes. Users can&apos;t see how steps connect.
              </p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-[var(--color-muted)]">
                <span className="text-[var(--color-text)]">Pros:</span>{' '}
                simpler navigation
              </p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-[var(--color-muted)]">
                <span className="text-[var(--color-text)]">Cons:</span>{' '}
                delayed error discovery, hidden dependencies
              </p>
            </div>
            <div className="border-l-2 border-[var(--color-accent)] bg-[var(--color-surface)] p-6">
              <h3 className="font-display text-xl text-[var(--color-text)]">
                Decision Workspace
              </h3>
              <p className="mt-4 font-sans leading-[1.75] text-[var(--color-text)]">
                Higher information density, but users can immediately observe
                system behavior and iterate without restarting.
              </p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-[var(--color-muted)]">
                <span className="text-[var(--color-text)]">Pros:</span> faster
                iteration, visible dependencies
              </p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-[var(--color-muted)]">
                <span className="text-[var(--color-text)]">Cons:</span> more
                complex layout
              </p>
            </div>
          </div>
          <p className="mt-8 max-w-[680px] font-sans leading-[1.75] text-[var(--color-text)]">
            We went with the workspace because early feedback was more valuable
            than reducing interface complexity.
          </p>
        </section>

        <section>
          <SectionHeading>Design Details</SectionHeading>

          <div className="mt-10 max-w-[680px]">
            <h3 className="font-sans text-base font-semibold text-[var(--color-text)]">
              Prediction Target Time
            </h3>
            <div className="mt-4 space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
              <p>
                One of the trickiest parameters to design around was Prediction
                Target Time — the reference point the system uses to align
                historical data with training samples. It appears in multiple
                steps, and users almost never understood why it kept showing up.
              </p>
              <p>
                The fix: instead of asking users to navigate back to configure
                it, we let them set it inline wherever it appeared. A small edit
                icon opens a lightweight panel — the workflow never breaks.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-hero">
            <CaseStudyImage
              src="/images/Enterprise_Redesign2.png"
              alt="Prediction Target Time inline editing in the configuration workspace"
            />
          </div>

          <div className="mt-12 max-w-[680px]">
            <h3 className="font-sans text-base font-semibold text-[var(--color-text)]">
              Auto-Connecting Tables
            </h3>
            <div className="mt-4 space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
              <p>
                Connecting tables was another drop-off point. Business analysts
                aren&apos;t database engineers — manually selecting join keys for
                each table connection caused a lot of errors.
              </p>
              <p>
                We introduced auto-connect: when a user adds a table, the
                system scans the schema and suggests a likely relationship
                based on column matches. Users can override it, but the default
                is usually right. That alone eliminated a whole category of
                silent failures.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-hero">
            <CaseStudyImage
              src="/images/Enterprise_Redesign3.png"
              alt="Auto-connect table relationships in the schema workspace"
            />
          </div>
        </section>

        <section>
          <SectionHeading>Impact</SectionHeading>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <p className="font-display text-[48px] leading-none tracking-tight text-[var(--color-text)]">
                50%
              </p>
              <p className="mt-3 font-sans text-sm leading-snug text-[var(--color-muted)]">
                reduction in configuration time
              </p>
              <p className="mt-2 font-sans text-xs text-[var(--color-muted)]">
                10 min → 5 min
              </p>
            </div>
            <div>
              <p className="font-display text-[48px] leading-none tracking-tight text-[var(--color-text)]">
                0 data scientists
              </p>
              <p className="mt-3 font-sans text-sm leading-snug text-[var(--color-muted)]">
                required for setup
              </p>
              <p className="mt-2 font-sans text-xs text-[var(--color-muted)]">
                business analysts became self-sufficient
              </p>
            </div>
            <div>
              <p className="font-display text-[48px] leading-tight tracking-tight text-[var(--color-text)]">
                Fewer silent failures
              </p>
              <p className="mt-3 font-sans text-sm leading-snug text-[var(--color-muted)]">
                smart defaults and inline validation caught errors before
                training ran
              </p>
            </div>
          </div>
        </section>

        <section>
          <SectionHeading>Reflection</SectionHeading>
          <div className="mt-8 max-w-[680px] font-sans leading-[1.75] text-[var(--color-text)]">
            <p>
              The moment that changed how I approached this project was when an
              engineer asked me to configure a use case myself. I couldn&apos;t
              do it. I&apos;d been designing the interface for weeks and still
              couldn&apos;t complete the workflow without help.
            </p>
            <p className="mt-6">
              That told me the problem wasn&apos;t terminology or visual design.
              It was that users had no way to see what their decisions were
              actually doing to the system. Everything else followed from that.
            </p>
          </div>
        </section>

        <section className="border-t border-[var(--color-border)] pt-24">
          <div className="max-w-[680px]">
            <p className="font-mono text-xs text-[var(--color-muted)]">
              Concept exploration
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-[var(--color-text)] md:text-4xl">
              If I were designing this today
            </h2>
            <div className="mt-8 space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
              <p>
                The workspace redesign solved the visibility problem — users
                could finally see what their decisions were doing. But it still
                assumed something that wasn&apos;t always true: that users
                already knew what problem they wanted to solve.
              </p>
              <p>
                In practice, a lot of business analysts came to dotData with
                data but without a clear use case. They needed the system to
                help them figure out what was worth building — before they could
                configure anything.
              </p>
              <p>
                With agentic AI, that&apos;s now a solvable problem. Instead of
                handing users a blank configuration form, the system can analyze
                their data first, identify what&apos;s possible, and guide them
                toward a model that actually fits what they have.
              </p>
            </div>
          </div>

          <div className="mt-16 max-w-[680px]">
            <h3 className="font-sans text-base font-semibold text-[var(--color-text)]">
              Three design decisions that changed
            </h3>
            <div className="mt-8 space-y-12">
              <div>
                <p className="font-mono text-xs text-[var(--color-muted)]">
                  01
                </p>
                <h4 className="mt-2 font-sans text-base font-semibold text-[var(--color-text)]">
                  From form-first to conversation-first
                </h4>
                <p className="mt-3 font-sans leading-[1.75] text-[var(--color-text)]">
                  The original workspace started with a blank configuration
                  panel — users had to know what they wanted before they could
                  do anything. The new flow starts with a question: what problem
                  are you trying to solve? The system uses the answer to
                  recommend a use case, explain why the data supports it, and
                  pre-fill everything it&apos;s confident about. Users only make
                  decisions where human judgment actually matters.
                </p>
              </div>
              <div>
                <p className="font-mono text-xs text-[var(--color-muted)]">
                  02
                </p>
                <h4 className="mt-2 font-sans text-base font-semibold text-[var(--color-text)]">
                  Data quality as a conversation, not a gate
                </h4>
                <p className="mt-3 font-sans leading-[1.75] text-[var(--color-text)]">
                  The original system surfaced data errors late — sometimes
                  only after training ran. The new flow detects issues
                  immediately after upload and handles them one at a time,
                  showing the user exactly what changed and why. Missing values,
                  inconsistent date formats, ambiguous column types — each gets
                  surfaced with a concrete before/after and a plain-language
                  explanation, not a technical error message.
                </p>
              </div>
              <div>
                <p className="font-mono text-xs text-[var(--color-muted)]">
                  03
                </p>
                <h4 className="mt-2 font-sans text-base font-semibold text-[var(--color-text)]">
                  Two-layer sampling for faster iteration
                </h4>
                <p className="mt-3 font-sans leading-[1.75] text-[var(--color-text)]">
                  Enterprise datasets are often large. Waiting 20 minutes to
                  discover a configuration mistake is expensive. The new flow
                  separates two distinct decisions: how much data to use for
                  configuration (where a 10% sample is almost always enough),
                  and how much to use for the actual model run (where you can
                  do a quick run first to validate direction before committing
                  full compute).
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <p className="font-sans text-sm leading-[1.75] text-[var(--color-muted)]">
              I built an interactive prototype to explore this direction. It
              uses real retail data — 45 stores, 79 departments, 143 weeks of
              sales history — and walks through the full flow from upload to
              model configuration.
            </p>
            <a
              href="https://gracelee.design/enterprise-new-concept/ai-modeling-advisor.html"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 border border-[var(--color-border)] px-5 py-3 font-sans text-sm font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Try the prototype →
            </a>
            <p className="mt-4 font-mono text-xs text-[var(--color-muted)]">
              Click &quot;Load sample data&quot; to start
            </p>
          </div>
        </section>
      </div>
    </article>
  )
}
