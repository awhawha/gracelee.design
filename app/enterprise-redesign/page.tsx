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

function CaseStudyVideo({ src, label }: { src: string; label: string }) {
  return (
    <video
      className="mb-12 mt-8 block h-auto w-full max-w-full object-top"
      controls
      playsInline
      preload="metadata"
      aria-label={label}
    >
      <source src={src} type="video/mp4" />
    </video>
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
                  value: 'dotData Enterprise AutoML Platform',
                },
                {
                  label: 'Team',
                  value: '2 designers, engineering',
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
              The primary users were <strong>business analysts</strong> — people who understood
              their domain well but had limited hands-on experience with machine
              learning. Most of them were introduced to dotData by their
              organization, not by choice. Before the platform, many had relied
              on Excel or leaned on their data science team to run analyses.
            </p>
            <p>
              That dependency didn&apos;t go away when dotData arrived. During
              configuration, analysts would typically work through settings in
              regular check-ins with a dotData data scientist — and in many
              cases, <strong>the DS would end up configuring the model on their behalf</strong>.
              The tool existed to give business users independence, but in
              practice, it still required expert support to operate.
            </p>
            <p>
              <strong>The cost of a misconfiguration was hours.</strong> Model training could
              take one to two hours depending on data size. If a user set the
              wrong data type, they&apos;d have to re-upload the dataset and
              start over from scratch. If the model ran but accuracy came back
              low, they often had no idea why. Most of dotData&apos;s customers
              didn&apos;t have an internal data science team — that&apos;s
              exactly why they were using the platform. But every time something
              went wrong, they were filing it into our DS team&apos;s calendar.
              <strong>We were absorbing the cost of a UX problem as customer support
              hours.</strong>
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <p className="font-mono text-xs text-[var(--color-muted)]">
                Expert Trap
              </p>
              <p className="mt-2 font-sans leading-[1.75] text-[var(--color-text)]">
                The interface was graphical, but the concepts were still framed
                in data science terminology. A business analyst had no way to
                know what &ldquo;prediction target time&rdquo; meant or why
                getting it wrong would break everything downstream.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-[var(--color-muted)]">
                Invisible Ripple Effects
              </p>
              <p className="mt-2 font-sans leading-[1.75] text-[var(--color-text)]">
                Configuration changes silently altered the dataset used for
                modeling. The only signal was a low accuracy score at the
                end — with no explanation attached.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-[var(--color-muted)]">
                Rigid Workflow
              </p>
              <p className="mt-2 font-sans leading-[1.75] text-[var(--color-text)]">
                The step-based wizard forced users into a linear sequence. If
                something went wrong, there was no way to adjust a single
                parameter — users had to restart from the beginning.
              </p>
            </div>
          </div>
        </section>

        <section>
          <SectionHeading>Understanding the System</SectionHeading>
          <div className="mt-8 max-w-[680px] space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
            <p>
              Going into this project, I assumed the problem was mostly
              terminology. The interface used data science language, and business
              analysts weren&apos;t data scientists — so the fix should be a
              language problem, right?
            </p>
            <p>
              An engineer pushed back on that early. He told me to take a real
              dataset and try to configure a task myself. See if I could get it
              right without help.
            </p>
            <p>
              I couldn&apos;t.
            </p>
            <p>
              That changed how I thought about the problem. I started reading
              documentation, asking engineers to walk me through the pipeline
              logic, and using ChatGPT to translate technical concepts into plain
              language with concrete examples. Slowly I built up a mental model
              of what the system was actually doing. And that&apos;s when I
              realized <strong>the terminology wasn&apos;t the real issue. The issue was
              that the interface gave users no way to understand the consequences
              of their decisions</strong> before it was too late to fix them.
            </p>
            <p className="font-mono text-sm text-[var(--color-text)]">
              Time column → Prediction Target Time → Lead Time → Feature Window
            </p>
            <p>
              These four parameters are tightly coupled. Each one determines how
              the system slices data for training. The interface never
              communicated that — and without understanding it, designing
              something helpful was impossible.
            </p>
          </div>
        </section>

        <section>
          <SectionHeading>From Wizard to Workspace</SectionHeading>
          <div className="mt-8 max-w-[680px] space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
            <p>
              Our first instinct wasn&apos;t to scrap the wizard. We spent time
              exploring how to make it better — clearer section labels, easier
              navigation between steps, more explicit definitions for each
              parameter. But the more we dug in, the more something felt off.
            </p>
            <p>
              At some point I realized: <strong>what users were actually doing, across
              all these steps, was defining a single flat table.</strong> That table was
              the training dataset. Every parameter — time column, prediction
              target time, lead time, feature windows — was just determining
              what that table would look like. The wizard was hiding that. It
              was breaking one coherent decision into a sequence of isolated
              steps, so users never had a mental model of what they were building
              toward.
            </p>
            <p>
              That&apos;s when the canvas idea came in. <strong>If the real task was
              constructing a dataset, the interface should make that visible</strong> —
              not walk users through it one field at a time.
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
                One of the trickiest parameters to design around was <strong>Prediction
                Target Time</strong> — the reference point the system uses to align
                historical data with training samples. It appears in multiple
                steps, and users almost never understood why it kept showing up.
              </p>
              <p>
                The fix: instead of asking users to navigate back to configure
                it, <strong>we let them set it inline wherever it appeared.</strong> A small edit
                icon opens a lightweight panel — the workflow never breaks.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-hero">
            <img
              src="/images/Enterprise_Redesign2.avif"
              alt="Prediction Target Time inline configuration"
              className="mb-12"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                marginTop: '32px',
              }}
            />
          </div>

          <div className="mt-12 max-w-[680px]">
            <h3 className="font-sans text-base font-semibold text-[var(--color-text)]">
              Auto-Connecting Tables
            </h3>
            <div className="mt-4 space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
              <p>
                Connecting tables was another drop-off point. Business analysts
                aren&apos;t database engineers — <strong>manually selecting join keys for
                each table connection caused a lot of errors.</strong>
              </p>
              <p>
                We introduced <strong>auto-connect</strong>: when a user adds a table, the
                system scans the schema and suggests a likely relationship
                based on column matches. Users can override it, but the default
                is usually right. That alone <strong>eliminated a whole category of
                silent failures.</strong>
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-hero">
            <CaseStudyVideo
              src="/images/Enterprise_Redesign3.mp4"
              label="Auto-connect table relationships in the schema workspace"
            />
          </div>
        </section>

        <section>
          <SectionHeading>Validation</SectionHeading>
          <div className="mt-8 max-w-[680px] space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
            <p>
              We tested with three external participants — master&apos;s students
              in business analytics — given a real dataset and a concrete problem
              to solve: predict which servers were likely to fail in the next
              seven days. A PM briefed them on the scenario beforehand. During
              the sessions, I sat back and observed, tracking behavior rather
              than what they said.
            </p>
            <p>
              One thing stood out immediately. <strong>All three skipped every tooltip
              and description text without reading it</strong> — not because they were
              rushing, but because they were focused on getting through the task.
              They weren&apos;t learning the system; they were trying to use it.
              That confirmed that <strong>any solution relying on user education would
              fail in practice.</strong>
            </p>
            <p>
              One tester flagged something that directly shaped a later design
              decision: she found herself going back and forth between the
              description text and the configuration panel trying to understand
              prediction target time, and suggested <strong>the concept should be
              interactive rather than explained in static text.</strong> That observation
              led directly to the timeline visualization.
            </p>
          </div>
          <div className="mt-12 border-l-2 border-[var(--color-accent)] pl-6">
            <p className="font-sans text-lg leading-[1.75] text-[var(--color-text)]">
              &ldquo;The canvas flow is so much smoother than before.&rdquo;
            </p>
            <p className="mt-2 font-mono text-xs text-[var(--color-muted)]">
              dotData DS team, post-launch
            </p>
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
                10 min → 5 min, in benchmarks where users knew the task and hit
                no errors
              </p>
            </div>
            <div>
              <p className="font-mono text-[32px] text-[var(--color-accent)]">
                ↓
              </p>
              <p className="mt-3 font-sans text-sm leading-snug text-[var(--color-muted)]">
                dependency on the data science team for setup
              </p>
              <p className="mt-2 font-sans text-xs text-[var(--color-muted)]">
                business analysts could complete configuration independently
              </p>
            </div>
            <div>
              <p className="font-mono text-[32px] text-[var(--color-accent)]">
                ↓
              </p>
              <p className="mt-3 font-sans text-sm leading-snug text-[var(--color-muted)]">
                configuration errors from silent failures
              </p>
              <p className="mt-2 font-sans text-xs text-[var(--color-muted)]">
                smart defaults and inline validation caught mistakes before
                training ran
              </p>
            </div>
          </div>
          <p className="mt-12 max-w-[680px] font-sans leading-[1.75] text-[var(--color-muted)]">
            The bigger change was around iteration. Users could now adjust any
            part of the configuration without starting over — something that
            wasn&apos;t possible in the original workflow. The CS team flagged
            this as one of the most noticeable improvements after launch.
          </p>
        </section>

        <section>
          <SectionHeading>Reflection</SectionHeading>
          <div className="mt-8 max-w-[680px] space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
            <p>
              When I first looked at this system, it felt like a black box.
              Users put data in, waited an hour or two, and got a result they
              couldn&apos;t interpret. My assumption was that the fix was simple
              — just show people more.
            </p>
            <p>
              That turned out to be wrong. The question I kept coming back to
              was: <strong>does the user actually need to know this?</strong> Or is it just going
              to make them feel like they&apos;re doing something wrong? Some
              information helped. Some just made people second-guess themselves.
              Most of the real design work was figuring out which was which —
              and I&apos;m still not sure we drew the line in exactly the right
              place.
            </p>
            <p>
              One thing I wanted to push further but didn&apos;t get to: closing
              the loop between configuration and model performance. Right now
              users set things up, wait, and get a result — but they can&apos;t
              connect what they configured to what came out. That gap is still
              there, and I think it&apos;s the most important thing to go after
              next.
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
              href="/prototypes/ai-modeling-advisor.html"
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
