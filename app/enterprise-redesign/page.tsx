import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { MetadataRow } from '@/components/MetadataRow'
import { SectionHeading } from '@/components/SectionHeading'
import { LightboxImage } from "@/components/LightboxImage"

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
              <LightboxImage
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
              <LightboxImage
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
              1. Contextual Configuration (The &ldquo;Define Target&rdquo; Panel)
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
                <strong>The Impact: </strong>
                Users can adjust critical parameters like &ldquo;Prediction Target Time&rdquo; inline without breaking their flow. To bridge the 
                &ldquo;Expert Trap,&rdquo; I replaced static tooltips with interactive inline guidance, including a timeline visualization that 
                allows users to see exactly how their time parameters affect the data window. This ensures technical terms are defined 
                through action rather than just text.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-hero">
            <LightboxImage
              src="/images/er-canvas-define-target.png"
              alt="Prediction Target Time inline configuration"
              className="mb-12 rounded-xl w-full h-auto block mt-8"
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
            <LightboxImage
              src="/images/er-auto-connect.png"
              alt="auto-connect"
              className="mb-12 rounded-xl w-full h-auto block mt-8"
            />
          </div>
          <div className="mx-auto max-w-hero">
            <LightboxImage
              src="/images/er-error-validation.png"
              alt="error-validation"
              className="mb-12 rounded-xl w-full h-auto block mt-8"
            />
          </div>
        </section>

        <section>
          <SectionHeading>Validation</SectionHeading>
          <div className="mt-8 max-w-[680px] space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
            <p>
              We tested the solution with Business Analytics students using a real-world 
              server failure dataset. I focused on tracking behavior rather than feedback.
            </p>
            <p>
              <strong>The &ldquo;Non-Reader&rdquo; Insight:</strong> Participants skipped every static description. 
              This confirmed that <strong>user education is not a substitute for intuitive design</strong>. 
              We couldn&apos;t explain the system to users; we had to let them experience the 
              logic through interaction.
            </p>
            <p>
              <strong>From Text to Interaction:</strong> One tester&apos;s struggle to connect static definitions to the 
              configuration panel led directly to our <strong>interactive timeline visualization</strong>, turning 
              a conceptual definition into a visual tool.
            </p>
          </div>
        </section>

        <section>
          <SectionHeading>Impact</SectionHeading>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="border border-[var(--color-border)] rounded-lg p-5">
              <p className="font-display text-[20px] leading-[1.25] tracking-tight text-[var(--color-text)]">
                50% Reduction in Setup Time:
              </p>
              <p className="mt-2 font-sans leading-[1.75] text-[var(--color-muted)]">
                Average configuration dropped from 10 to 5 minutes by removing linear bottlenecks.
              </p>
            </div>
            <div className="border border-[var(--color-border)] rounded-lg p-5">
              <p className="font-display text-[20px] leading-[1.25] tracking-tight text-[var(--color-text)">
                Empowered Self-Service:
              </p>
              <p className="mt-2 font-sans leading-[1.75] text-[var(--color-muted)]">
                Transitioned from a model where Data Scientists were required for setup to a 
                system where <strong>Business Analysts can complete tasks independently.</strong>
              </p>
            </div>
            <div className="border border-[var(--color-border)] rounded-lg p-5">
              <p className="font-display text-[20px] leading-[1.25] tracking-tight text-[var(--color-text)">
                Immediate Error Recovery:
              </p>
              <p className="mt-2 font-sans leading-[1.75] text-[var(--color-muted)]">
                Smart defaults and inline validation eliminated &ldquo;silent failures,&rdquo; catching mistakes 
                before any training costs were incurred.
              </p>
            </div>
          </div>
        </section>

        <section>
          <SectionHeading>Reflection</SectionHeading>
          <div className="mt-8 max-w-[680px] space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
            <p>
              My initial assumption was that users just needed more information. I was wrong. 
              The real challenge was deciding <strong>what to hide.</strong> Most of the design work was navigating 
              that tension: providing enough signal to build confidence without creating noise that 
              leads to second-guessing.
            </p>
            <p>
              If I were to take this further, I would focus on closing the loop between configuration 
              and performance. The gap between &ldquo;setting up a table&rdquo; and &ldquo;understanding why a model 
              succeeded&rdquo; remains. Bridging that causal link is the next frontier for this product.
            </p>
          </div>
        </section>

        <section className="border-t border-[var(--color-border)] pt-24">
          <div className="max-w-[680px]">
            <SectionHeading>Beyond the canvas: Reimagining the experience with Agentic AI</SectionHeading>
            <div className="mt-8 space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
              <p>
                If I were designing this system today, I would push past the &ldquo;Workspace&rdquo; model. 
                While the canvas solved the visibility problem, it still assumed that users 
                arrived with a clear, pre-defined use case. In reality, many analysts have the 
                data but struggle to identify the most valuable problem to solve.
              </p>
              <p>
                With the advent of <strong>Agentic AI</strong>, we can shift the user&apos;s role from &ldquo;configuring 
                a tool&rdquo; to &ldquo;collaborating with an expert.&rdquo; I used <strong>Cursor</strong> to prototype a vision 
                of how this system could evolve from a passive interface into a proactive partner.
              </p>
            </div>
          </div>
          <div className="mt-16 max-w-[680px]">
            <div className="mt-8 space-y-12">
              <div>
                <p className="font-mono text-xs text-[var(--color-muted)]">
                  01
                </p>
                <h4 className="mt-2 font-sans text-base font-semibold text-[var(--color-text)]">
                  From Form-First to Intent-Based Design
                </h4>
                <p className="mt-3 font-sans leading-[1.75] text-[var(--color-text)]">
                  The original workspace assumed users already knew their target variables and model 
                  parameters. However, research revealed a major adoption hurdle: <strong>many analysts had 
                  the data but didn&apos;t know which predictive use cases were actually viable.</strong>
                </p>
                <p className="mt-3 font-sans leading-[1.75] text-[var(--color-text)]">
                  To solve this, I reimagined the start of the journey as a Consultative AI flow:
                </p>
                <div className="mt-4 space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
                  <p className="font-sans leading-[1.75] text-[var(--color-text)]">
                    <strong>Data-Led Discovery: </strong>Instead of asking for configuration, the system 
                    first ingests the tables and performs automated cleansing. It then <strong>proactively suggests 
                    use cases</strong> (e.g., Holiday Impact Analysis) based on the patterns it detects in the data.
                  </p>
                  <p className="font-sans leading-[1.75] text-[var(--color-text)]">
                    <strong>Explainable Recommendations: </strong>By showing users exactly why their data supports a specific 
                    goal (e.g., &ldquo;IsHoliday flag present across all 143 weeks&rdquo;), the system builds trust through 
                    transparency rather than just providing a &ldquo;black box&rdquo; suggestion.
                  </p>
                  <p className="font-sans leading-[1.75] text-[var(--color-text)]">
                    <strong>Strategic Intent: </strong>By shifting from a &ldquo;passive tool&rdquo; to an &ldquo;expert advisor,&rdquo; 
                    the goal is to lower the barrier to entry and increase the activation rate for users who are new to 
                    predictive modeling, turning a technical hurdle into a guided strategic session.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-hero">
            <LightboxImage
              src="/images/er-reimagining-workflow.png"
              alt="reimagining the work flow"
              className="mb-12 rounded-xl w-full h-auto block mt-8"
            />
          </div>
          <div className="mt-16 max-w-[680px]">
            <div className="mt-8 space-y-12">
              <div>
                <p className="font-mono text-xs text-[var(--color-muted)]">
                  02
                </p>
                <h4 className="mt-2 font-sans text-base font-semibold text-[var(--color-text)]">
                  Data Quality as a Dialogue, Not a Gate
                </h4>
                <p className="mt-3 font-sans leading-[1.75] text-[var(--color-text)]">
                  In the original system, data errors often surfaced too late—sometimes only 
                  after hours of training. The reimagined flow treats data preparation as a 
                  <strong>continuous, plain-language conversation.</strong>
                </p>
                <div className="mt-4 space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
                  <p className="font-sans leading-[1.75] text-[var(--color-text)]">
                    <strong>The Shift: </strong>The system detects issues (such as missing values or 
                    inconsistent formats) immediately after upload. Instead of a technical error 
                    message, it explains the problem and offers actionable remedies with a clear 
                    &ldquo;before and after&rdquo; preview.
                  </p>
                  <p className="font-sans leading-[1.75] text-[var(--color-text)]">
                    <strong>Strategic Intent: </strong>The goal is to transform a technical roadblock 
                    into an educational moment. By unblocking the user through guided resolution, we 
                    can reduce the reliance on Data Scientists and prevent &ldquo;failed runs&rdquo; from ever 
                    reaching the compute stage.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-hero">
            <video
              src="/videos/er-data-quality-check.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="mb-12 rounded-xl w-full h-auto block mt-8"
            />
          </div>
          <div className="mt-16 max-w-[680px]">
            <div className="mt-8 space-y-12">
              <div>
                <p className="font-mono text-xs text-[var(--color-muted)]">
                  03
                </p>
                <h4 className="mt-2 font-sans text-base font-semibold text-[var(--color-text)]">
                  Strategic Sampling for Rapid Iteration
                </h4>
                <p className="mt-3 font-sans leading-[1.75] text-[var(--color-text)]">
                  Enterprise-scale data makes iteration expensive. Waiting 20 minutes just to discover 
                  a configuration mistake is a fundamental failure in the feedback loop.
                </p>
                <div className="mt-4 space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
                  <p className="font-sans leading-[1.75] text-[var(--color-text)]">
                    <strong>The Shift: </strong>I introduced a <strong>two-layer sampling strategy.</strong> The system 
                    uses a high-speed <strong>10% sample</strong> for instant schema analysis and configuration validation. 
                    Once the logic is confirmed, the user can then commit the full compute for the actual 
                    model run.
                  </p>
                  <p className="font-sans leading-[1.75] text-[var(--color-text)]">
                    <strong>Strategic Intent: </strong>By optimizing for the <strong>&ldquo;Economy of Time,&rdquo;</strong> this design 
                    intends to allow users to experiment and &ldquo;fail fast&rdquo; in seconds. This ensures that by the 
                    time the user hits &ldquo;Run&rdquo; on the full dataset, they have maximum confidence in their 
                    configuration.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-hero">
            <LightboxImage
              src="/images/er-run-mode.png"
              alt="reimagining the work flow"
              className="mb-12 rounded-xl w-full h-auto block mt-8"
            />
          </div>            


          <div className="mt-16">
            <a
              href="/prototypes/ai-modeling-advisor.html"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 border border-[var(--color-border)] px-5 py-3 font-sans text-sm font-medium text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Try the prototype →
            </a>
          </div>
        </section>
        <section>
          <SectionHeading>Reflection</SectionHeading>
          <div className="mt-8 max-w-[680px] space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
            <p>
              Looking back, the real design challenge wasn&apos;t just about making a &ldquo;better UI&rdquo;. It was about 
              <strong> managing the tension between automation and control.</strong> As designers in the AI era, our job is 
              changing. We are no longer just building boxes for people to fill; we are designing the <strong>guardrails 
              for a partnership.</strong> While I&apos;m proud of how the Canvas Workspace solved the immediate pain points of 
              the legacy system, I believe the future lies in <strong>closing the gap between human intent and machine execution.</strong>
              
            </p>
          </div>
        </section>
      </div>
    </article>
  )
}
