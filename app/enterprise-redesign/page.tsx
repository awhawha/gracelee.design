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
                  value: '2 designers, 8 engineers',
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
          
        </section>

        <section>
          <SectionHeading>Understanding the System</SectionHeading>
          <div className="mt-8 max-w-[680px] space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
            <p>
            Going into this project, the team assumed the problem was mostly terminology. 
            To test this, an engineer asked me to configure a task using a real dataset 
            without any help.
            </p>
            <p>
              <strong>I couldn&apos;t do it.</strong>
            </p>
            <p>
              This failure changed my entire approach. I began interviewing engineers 
              and using ChatGPT to translate pipeline logic into plain language. As I 
              built a mental model of the system, I realized terminology was just a symptom. 
              The root cause was that we were building training datasets for prediction models, 
              yet the interface offered <strong>zero visibility into the consequences of a user&apos;s choices</strong>. 
              If they got it wrong, they wouldn&apos;t find out until the model finished running days later. 
              <strong>The cost of a single mistake was too high.</strong>
            </p>
          </div>
          <div className="mt-8 max-w-[680px] space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
            <p className="font-sans text-s text-[var(--color-text)]">
              <strong>Key Insights</strong>
            </p>
            <p className="mt-2 font-sans leading-[1.75] text-[var(--color-text)]">
              Through this discovery process, I identified three structural flaws that were preventing users from succeeding:
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="border border-[var(--color-border)] rounded-lg p-5">
              <p className="font-mono text-xs text-[var(--color-muted)]">
                Rigid Workflow
              </p>
              <p className="mt-2 font-sans leading-[1.75] text-[var(--color-text)]">
                The step-based wizard forced users into a linear sequence. If
                something went wrong, there was no way to adjust a single
                parameter — users had to restart from the beginning.
              </p>
            </div>
            <div className="border border-[var(--color-border)] rounded-lg p-5">
              <p className="font-mono text-xs text-[var(--color-muted)]">
                Invisible Ripple Effects
              </p>
              <p className="mt-2 font-sans leading-[1.75] text-[var(--color-text)]">
                Configuration changes silently altered the dataset used for
                modeling. The only signal was a low accuracy score at the
                end — with no explanation attached.
              </p>
            </div>
            <div className="border border-[var(--color-border)] rounded-lg p-5">
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
          </div>
        </section>

        <section>
          <SectionHeading>From Wizard to Workspace</SectionHeading>
          <div className="mt-8 max-w-[680px] space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
            <p>
              Initially, we explored optimizing the existing wizard with clearer labels and better 
              navigation. However, the discovery process revealed a fundamental <strong>misalignment in mental 
              models</strong>: the step-based wizard was forcing users to make a single, coherent decision through 
              a sequence of isolated, disconnected steps.
            </p>
            <p>
              I realized that the user&apos;s ultimate goal was defining a <strong>single flat table</strong>(the training dataset). 
              Every parameter—from time columns to feature windows—was simply a variable determining that table&apos;s 
              structure. By imposing a linear sequence, the interface was <strong>hiding the final output</strong> until it was too 
              late to adjust.
            </p>
            <p>
              <strong>That was the &ldquo;Aha!&rdquo; moment</strong>: If the task is constructing a dataset, the interface should make the construction 
              logic visible in real-time. This insight led us to move away from the linear constraints and toward a <strong>canvas-based 
              workspace</strong> that prioritizes visibility and relationship mapping.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-[var(--color-surface)] p-6">
              <img
                  src="/images/er-linear-wizard.png"
                  alt="linear wizard mockup"
                  className="mb-6 w-full h-auto block"
                />
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
              <img
                  src="/images/er-open-canvas-v1.png"
                  alt="Open canvas workspace mockup"
                  className="mb-6 w-full h-auto block"
                />
              <h3 className="font-display text-xl text-[var(--color-text)]">
                Canvas Workspace
              </h3>
              <p className="mt-4 font-sans leading-[1.75] text-[var(--color-text)]">
                The blank canvas can feel unfamiliar at first, but returning users move through it quickly.
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
        </section>

        <section>
          <SectionHeading>Design Details: Turning Insights into Solutions</SectionHeading>
          <div className="mt-10 max-w-[680px]">
            <h3 className="font-sans text-base font-semibold text-[var(--color-text)]">
              1. Contextual Configuration (The "Define Target" Panel)
            </h3>
            <div className="mt-4 space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
              <p className="font-sans leading-[1.75] text-[var(--color-text)]">
                <strong>The Insight: </strong>Solve the <strong>Rigid Workflow.</strong> In a linear wizard, making a change on Step 4 often 
                meant restarting from Step 1.
              </p>
              <p className="font-sans leading-[1.75] text-[var(--color-text)]">
                <strong>The Solution: </strong>We moved configuration into a <strong>non-linear workspace.</strong> The &ldquo;Define 
                Target&rdquo; panel now exists as a lightweight overlay on the canvas.
              </p>
              <p className="font-sans leading-[1.75] text-[var(--color-text)]">
                <strong>The Impact: </strong>Users can adjust critical parameters like &ldquo;Prediction Target Time&rdquo; 
                inline without breaking their flow. I also added <strong>inline guidance </strong>
                (e.g., &ldquo;What is prediction time?&rdquo;) to bridge the &ldquo;Expert Trap&rdquo; 
                and define technical terms where they are used.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-hero">
            <img
              src="/images/er-canvas-define-target.png"
              alt="Prediction Target Time inline configuration"
              className="mb-12 rounded-xl"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                marginTop: '32px',
              }}
            />
          </div>

          <div className="mt-10 max-w-[680px]">
            <h3 className="font-sans text-base font-semibold text-[var(--color-text)]">
              2. Immediate Feedback (Real-time Table Exploration)
            </h3>
            <div className="mt-4 space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
              <p className="font-sans leading-[1.75] text-[var(--color-text)]">
                <strong>The Insight: </strong>Solve Invisible <strong>Ripple Effects.</strong> Since we couldn&apos;t technically 
                preview the final combined dataset in real-time, I focused on 
                making the &ldquo;building blocks&rdquo; transparent.
              </p>
              <p className="font-sans leading-[1.75] text-[var(--color-text)]">
                <strong>The Solution: </strong>I designed a <strong>&ldquo;Cleansed View&rdquo; drawer</strong> that allows users to instantly 
                peek into any single table on the canvas.
              </p>
              <p className="font-sans leading-[1.75] text-[var(--color-text)]">
                <strong>The Impact: </strong>By showing data distributions and formats (Categorical, Datetime) 
                immediately, users can verify their data quality before running the model. 
                This creates an immediate feedback loop that catches simple errors in seconds.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-hero">
            <img
              src="/images/er-table-preview.png"
              alt="Prediction Target Time inline configuration"
              className="mb-12 rounded-xl"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                marginTop: '32px',
              }}
            />
          </div>

          <div className="mt-10 max-w-[680px]">
            <h3 className="font-sans text-base font-semibold text-[var(--color-text)]">
              3. Intelligent Guardrails (Auto-Connect & Validation)
            </h3>
            <div className="mt-4 space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
              <p className="font-sans leading-[1.75] text-[var(--color-text)]">
                <strong>The Insight: </strong>Address the <strong>Expert Trap</strong> and the high cost of mistakes. Business 
                analysts shouldn&apos;t need to be database engineers to connect tables correctly.
              </p>
              <p className="font-sans leading-[1.75] text-[var(--color-text)]">
                <strong>The Solution: </strong>We introduced <strong>Intelligent Auto-Connect</strong>, which suggests 
                relationships based on schema matches. To back this up, I designed a <strong>Systemic Validation 
                Panel</strong> that flags missing configurations or broken logic in real-time.
              </p>
              <p className="font-sans leading-[1.75] text-[var(--color-text)]">
                <strong>The Impact: </strong>Instead of waiting days for a model to fail, users get 
                &ldquo;actionable errors&rdquo; immediately on the canvas. This transforms the debugging process from a &apos;waiting game&apos; 
                into a proactive check.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-hero">
            <img
              src="/images/er-auto-connect.png"
              alt="auto-connect"
              className="mb-12 rounded-xl"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                marginTop: '32px',
              }}
            />
          </div>
          <div className="mx-auto max-w-hero">
            <img
              src="/images/er-error-validation.png"
              alt="error-validation"
              className="mb-12 rounded-xl"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                marginTop: '32px',
              }}
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
