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

function Carousel({ slides, className }: { slides: CarouselSlide[]; className?: string }) {
  const [index, setIndex] = useState(0)
  const prev = () => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1))
  const next = () => setIndex((i) => (i === slides.length - 1 ? 0 : i + 1))

  return (
    <div className={`mt-8 ${className ?? ''}`}>
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
            <p className="font-sans text-2xl leading-none tracking-tight text-[var(--color-text)]">
              -50% Setup Time
            </p>
            <p className="mt-3 font-sans text-sm text-[var(--color-muted)]">
              From 10 to 5 minutes avg. configuration.
            </p>
          </div>
          <div className="px-10 py-12">
            <p className="font-sans text-2xl leading-none tracking-tight text-[var(--color-text)]">
              Zero DS Dependency
            </p>
            <p className="mt-3 font-sans text-sm text-[var(--color-muted)]">
              Empowered business analysts to run models independently without data science teams.
            </p>
          </div>
          <div className="px-10 py-12">
            <p className="font-sans text-2xl leading-none tracking-tight text-[var(--color-text)]">
              +40% Time-to-Value
            </p>
            <p className="mt-3 font-sans text-sm text-[var(--color-muted)]">
              Significantly accelerated the workflow for enterprise users.
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
            <div className="space-y-5 font-sans leading-[1.75] text-[var(--color-text)] max-w-[680px]">
              <p>
                A partner trained 80 business analysts on our AutoML platform, but <b>fewer than 5 
                remained active</b>. The product growth in the US market had frozen.
              </p>
              <h2 className="mt-2 font-sans text-base font-semibold text-[var(--color-text)]">
                Key Insights from Support Tickets & User Research:
              </h2>
              <ul>
                <li>
                  <b>ML Workflows are Non-Linear:</b> Users needed to iterate and go backward based on model 
                  results, but the existing system forced a rigid, one-way flow.
                </li>
                <li>
                  <b>The Expert Trap:</b> Users were forced to manually configure data types and define schemas 
                  before uploading—steps they didn&rsquo;t understand or care about.
                </li>
                <li>
                  <b>The Competition:</b>Enterprise customers expected a visual, drag-and-drop experience 
                  &ldquo;With other tools, you can just drag and drop...&rdquo;.
                </li>
              </ul>
              
            </div>
          </div>
        </section>

        {/* ── 4. The Pivot: Object-Oriented Design ──────────────────────────────────────── */}
        <section>
          <SectionHeading>The Pivot: Object-Oriented Design</SectionHeading>
          <div className="mt-8 grid grid-cols-1 gap-12">
            <div className="space-y-5 font-sans leading-[1.75] text-[var(--color-text)] max-w-[680px]">
              <p>
                To bridge the gap, I mapped out every object and relationship in the system. This shared artifact 
                alignment changed our technical and UX direction:
              </p>
              <ul>
                <li>
                  <b>Eliminating Friction:</b> Challenged engineers on real technical constraints, removing 
                  unnecessary configuration fields, e.g., manual source data types.
                  <Carousel
                    className="w-[900px] max-w-[calc(100vw-3rem)]"
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
                </li>
                <li>
                  <b>The Canvas Aha-Moment:</b> Realizing the workflow was highly iterative, we shifted 
                  from a guided wizard to a <b>single canvas workspace</b> so users could see table 
                  relationships live, avoiding &ldquo;one-way doors.&rdquo;
                  <Carousel
                    className="w-[900px] max-w-[calc(100vw-3rem)]"
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
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── 5. THREE SOLUTIONS ────────────────────────────────────────────── */}
        <section>
          <SectionHeading>The Solutions</SectionHeading>
          <div className="mt-12 space-y-20">

            <div className="border-l-2 border-[var(--color-border)] pl-8">
              <p className="font-mono text-xs text-[var(--color-muted)]">01</p>
              <h3 className="mt-2 font-sans text-base font-semibold text-[var(--color-text)] py-2">
                Guided Entry via Adaptive States
              </h3>
              <p> 
                <b>The Pattern:</b> A progressive disclosure layout that replaces blank-canvas anxiety with a clear starting point.
              </p>
              <p className="mt-3 max-w-[600px] font-sans leading-[1.75] text-[var(--color-muted)]">
                By opening with the import panel active and keeping subsequent action zones disabled, the interface provides a natural, 
                step-by-step onboarding sequence without enforcing a rigid wizard constraints.
              </p>
              <div className="mt-8 mx-auto max-w-hero py-4">
                <video
                  src="/videos/solution-1-disable-state.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full rounded-xl"
                />
              </div>
              <p className="font-mono text-xs text-[var(--color-muted)] text-center">
                  <b>Figure 1.1: Adaptive Initial State for Frictionless Onboarding.</b> The workspace layout utilizes adaptive states to steer non-technical users 
                  through the initial table connection, focusing cognitive effort purely on the first critical action.
                </p>
            </div>

            <div className="border-l-2 border-[var(--color-border)] pl-8">
              <p className="font-mono text-xs text-[var(--color-muted)]">02</p>
              <h3 className="mt-2 font-sans text-base font-semibold text-[var(--color-text)] py-2">
                Real-Time Table Exploration
              </h3>
              <p> 
                <b>The Pattern:</b> A space-efficient card structure tailored for dense entity-relationship (ER) models.
              </p>
              <p className="mt-3 max-w-[600px] font-sans leading-[1.75] text-[var(--color-muted)]">
                Each table card utilizes a fixed-height scroll container that dynamically surfaces active relationships to the top. 
                Interactive connection links trigger inline ER previews upon hover, preserving situational awareness while minimizing 
                overall canvas noise.
              </p>
              <div className="mt-8 mx-auto max-w-hero py-4">
                <video
                  src="/videos/solution-2-real-time-exploration.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full rounded-xl"
                />
              </div>

              <p className="font-mono text-xs text-[var(--color-muted)] text-center">
                  <b>Figure 2.1:</b> Contextual ER previews on hover eliminate canvas noise while preserving situational awareness 
                  during multi-table exploration.
                </p>
            </div>

            <div className="border-l-2 border-[var(--color-border)] pl-8">
              <p className="font-mono text-xs text-[var(--color-muted)]">03</p>
              <h3 className="mt-2 font-sans text-base font-semibold text-[var(--color-text)] py-2">
                Semantic Auto-Connect & Contextual Config
              </h3>
              <p> 
                <b>The Pattern:</b> Knowledge-free data configuration using proactive system defaults.
              </p>
              <p className="mt-3 max-w-[600px] font-sans leading-[1.75] text-[var(--color-muted)]">
                Schema-based relationship suggestions eliminate the need for advanced database knowledge. Complex time-related 
                configurations are embedded directly within the relevant data context, featuring pre-filled smart defaults and 
                concrete, real-data examples to replace abstract inputs.
              </p>
              <div className="mt-8 mx-auto max-w-hero py-4">
                <LightboxImage src="images/solution-3-contextual-config.png" alt=""/>
              </div>
                <p className="font-mono text-xs text-[var(--color-muted)] text-center">
                  <b>Figure 3.1: Contextual Configuration Pipeline.</b> Rather than forcing users into an all-or-nothing configuration 
                  form, the layout guides them through a progressive journey: leveraging system intelligence first, providing 
                  educational context when needed, and offering interactive real-time feedback during manual adjustments.    
                </p>
            </div>

          </div>
        </section>

        {/* ── 8. VALIDATION ─────────────────────────────────────────────────── */}
        <section>
          <SectionHeading>Validation</SectionHeading>
          <div className="mt-8 max-w-[680px] space-y-5 font-sans leading-[1.75] text-[var(--color-text)]">
            <h3 className="mt-2 font-sans text-base font-semibold text-[var(--color-text)] py-2">
              Driving Both User and Business Success
            </h3>
            <p>
              We validated the single-canvas workspace and the guided configuration pipeline through usability 
              testing with business analytics students, alongside tracking post-launch enterprise telemetry:
            </p>
            <ul>
              <li>
                <b>45% Friction Reduction:</b> Data import and configuration support tickets—which previously made up 
                over half of all incoming volume—dropped significantly after release.   
              </li>
              <li>
                <b>50% Faster Time-to-Value:</b> Average configuration time for a multi-table 
                schema dropped from 10 minutes to just 5 minutes.  
              </li> 
              <li>
                <b>100% Unassisted Completion:</b> Users completed complex, non-linear model configurations 
                entirely on their own for the first time, without relying on data science intervention. 
              </li>
              <li>
                <b>Commercial Re-engagement:</b> Sales teams, who had previously stopped demoing the data onboarding 
                module due to its high friction, proactively integrated the new canvas experience back into key 
                enterprise sales cycles.
              </li>
            </ul>
            <blockquote className="mt-4 border-l-2 border-[var(--color-accent)] pl-6 font-display text-xl italic leading-[1.5] text-[var(--color-text)] md:text-2xl">
              One tester&rsquo;s struggle to connect a static definition to the panel led directly to the interactive timeline —
              turning a concept into a visible tool.
            </blockquote>
          </div>
        </section>

        {/* ── 9. REFLECTION ─────────────────────────────────────────────────── */}
        <section>
          <SectionHeading>Reflection & Next Frontiers</SectionHeading>
          <div className="mt-8 max-w-[680px] space-y-5 font-sans leading-[1.75] text-[var(--color-text)]">
          <h3 className="mt-2 font-sans text-base font-semibold text-[var(--color-text)] py-2">Designing Complex B2B Systems is the Art of Sacrificing Noise</h3>
          <p>
            The most significant challenge in this redesign was not adding more clarity or help text. It was ruthlessly 
            deciding what to hide. In enterprise software, there is a constant tension between giving power-users 
            complete control and preventing non-technical users from second-guessing themselves. 
            Success meant providing just enough signal (like real-data previews) to build trust, while suppressing 
            technical noise (like legacy database schemas) to maintain momentum.
          </p>
          <h3 className="mt-2 font-sans text-base font-semibold text-[var(--color-text)] py-2">Bridging the Engineering-Product Gap via OOD</h3>
          <p>
            Moving away from a rigid wizard to an open canvas required massive alignment across engineering and product teams. 
            Utilizing Object-Oriented Design (OOD) as a shared artifact allowed us to debate technical constraints objectively.
            It proved that a product designer&rsquo;s role in complex domains isn&rsquo;t just making interfaces intuitive, but actively
            simplifying the underlying system architecture alongside engineering.
          </p>
          <h3 className="mt-2 font-sans text-base font-semibold text-[var(--color-text)] py-2">The Next Frontier: Closing the Feedback Loop</h3>
          <p>
            If I were to iterate further, the next step would be connecting configuration choices directly to model performance. 
            Currently, users configure tables blindly without knowing how their choices impact the final machine learning accuracy. 
            Closing this loop by bringing predictive confidence metrics earlier into the canvas workspace would truly elevate 
            the experience from &ldquo;configuring data&rdquo; to &ldquo;co-authoring AI.&rdquo;
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
