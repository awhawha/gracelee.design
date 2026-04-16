import type { Metadata } from 'next'
import Link from 'next/link'

import { MetadataRow } from '@/components/MetadataRow'
import { SectionHeading } from '@/components/SectionHeading'

export const metadata: Metadata = {
  title: 'Design System with Logic-Driven Tokens — Grace Lee',
}

export default function DesignSystemPage() {
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
            Design System with Logic-Driven Tokens
          </h1>
          <p className="mt-6 max-w-[680px] font-sans text-lg leading-[1.75] text-[var(--color-muted)]">
            We were redesigning multiple workflows at the same time, but the
            design infrastructure couldn&apos;t keep up. Designers were picking
            inconsistent tokens, engineers were guessing at implementation
            intent, and the codebase was accumulating hard-coded styles. I built
            a 3-layer token architecture from scratch that gave both sides a
            shared language.
          </p>
          <div className="mt-12">
            <MetadataRow
              items={[
                { label: 'Role', value: 'Solo Product Designer' },
                { label: 'Product', value: 'dotData Enterprise AutoML Platform' },
                { label: 'Team', value: '2 designers, 2 engineers' },
                { label: 'Focus', value: 'Design Systems, Token Architecture, Design-Dev Alignment' },
              ]}
            />
          </div>
        </div>
      </header>

      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-24">
        <div className="mx-auto max-w-hero">
          <img
            src="/images/design-system1.png"
            alt="3-layer token architecture connecting primitives to implementation-ready UI components"
            style={{ width: '100%', height: 'auto', display: 'block', objectPosition: 'center' }}
          />
        </div>
      </section>

      <div className="mx-auto w-full max-w-wide space-y-24 px-6 py-24">

        <section>
          <SectionHeading>Where It Started</SectionHeading>
          <div className="mt-8 max-w-[680px] space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
            <p>
              When I joined, the company had no real design library. Designers
              were recreating components independently, engineers were coding
              from memory or guesswork, and the codebase was full of hard-coded
              styles that nobody wanted to touch. My design lead asked me to
              audit what we had — go through the existing designs, talk to
              engineers, and figure out what was actually in the code versus
              what was in the files.
            </p>
            <p>
              <strong>What I found wasn&apos;t pretty.</strong> Similar colors with slightly
              different hex values that should&apos;ve been the same token.
              Components that existed in three different files with no clear
              source of truth. Engineers who&apos;d stopped asking designers
              questions because the answers were inconsistent anyway.
            </p>
            <p>
              I built the first version of the design system from scratch.
              Started with the smallest building blocks — color, typography,
              spacing — and worked up to buttons, input fields, and larger
              composed components. We were on Sketch at the time, using Zeplin
              for handoff. It worked, mostly, until it didn&apos;t.
            </p>
          </div>
          {/* IMAGE: 放 audit 發現的問題截圖，例如不一致的 component 截圖、Sketch 裡三個版本的檔案。
              檔名範例: /images/ds-audit.png */}
          <img
            src="/images/audit-finding.png"
            alt="Design system audit findings"
            style={{ width: '100%', height: 'auto', display: 'block', marginTop: '32px', marginBottom: '48px' }}
          />

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <p className="font-mono text-xs text-[var(--color-muted)]">Fragmented Foundation</p>
              <p className="mt-2 font-sans leading-[1.75] text-[var(--color-text)]">
                Without a centralized library, teams recreated components
                independently, causing visual inconsistencies across the product.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-[var(--color-muted)]">Ambiguous Implementation</p>
              <p className="mt-2 font-sans leading-[1.75] text-[var(--color-text)]">
                Without logic-driven specs, engineers relied on guesswork — the
                production code regularly diverged from design intent.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-[var(--color-muted)]">Escalating Technical Debt</p>
              <p className="mt-2 font-sans leading-[1.75] text-[var(--color-text)]">
                Hard-coded CSS variables and styles accumulated, making every
                new feature harder to build consistently.
              </p>
            </div>
          </div>
        </section>

        <section>
          <SectionHeading>Why We Had to Do It Again</SectionHeading>
          <div className="mt-8 max-w-[680px] space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
            <p>
              The Zeplin problem took a while to surface fully. Every time a
              component changed, the update chain looked like this: update the
              component → update the clean screens → update InVision → update
              Zeplin. If anyone missed a step — and they did, often — engineers
              would find themselves implementing from an outdated spec. We
              started getting Slack messages: <em>&ldquo;Which version is the
              real one?&rdquo;</em>
            </p>
            <p>
              When the team decided to redesign the enterprise platform and
              migrate to Figma, it felt like the right moment to fix the system
              properly, not just migrate the files. <strong>Figma solved the
              &ldquo;which version is real&rdquo; problem immediately</strong> —
              everyone&apos;s in the same file, and engineers can inspect
              elements directly. But I noticed something else after the first
              redesign shipped.
            </p>
            <p>
              The other designer and I were making different calls on the same
              components. She&apos;d reach for{' '}
              <span className="font-mono text-sm">border-default-primary</span>
              {' '}and I&apos;d use{' '}
              <span className="font-mono text-sm">border-default-secondary</span>.
              Neither of us was exactly wrong — <strong>the semantic tokens were
              abstract enough that they could reasonably be interpreted in
              multiple ways.</strong> We didn&apos;t have a &ldquo;when to use
              which&rdquo; doc, and honestly, even if we&apos;d written one, it
              would need to be maintained and actually read.
            </p>
            <p>
              I thought about writing documentation first. But documentation
              has two failure modes: people don&apos;t read it, and it falls
              out of date. <strong>I wanted the system itself to encode the
              decision logic.</strong>
            </p>
          </div>

          {/* IMAGE: 兩個 designer 用不同 token 的 before/after 對比截圖。
              Framer 版有這張: 兩個 'Create run' button 用 border-default-primary vs border-default-secondary。
              檔名範例: /images/ds-token-conflict.png */}
          <img
            src="/images/token-conflict.png"
            alt="Two designers using different tokens for the same component"
            style={{ width: '100%', height: 'auto', display: 'block', marginTop: '32px', marginBottom: '0' }}
          />
        </section>

        <section>
          <SectionHeading>Adding a Third Layer</SectionHeading>
          <div className="mt-8 max-w-[680px] space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
            <p>
              The missing layer was Component tokens — a private layer that sits
              between Semantic and the actual UI element. Instead of a button
              reaching directly for a semantic color token and hoping it&apos;s
              the right one, it uses{' '}
              <span className="font-mono text-sm">--button-bg</span>, which maps
              to the correct semantic token for that specific context.
            </p>
            <p className="font-mono text-sm text-[var(--color-text)]">
              color-green-700 &rarr; color.background.brand &rarr; --comp-table-card-header-bg
            </p>
            <p>
              Each layer has a different job. Primitives are raw values.
              Semantics carry meaning. Component tokens carry intent — the
              functional role of a specific UI element. That precision is what
              designers and engineers were both missing.
            </p>
          </div>

          {/* IMAGE: ds-third-layer.png — toaster notification 的 token 對應圖，顯示 semantic token 和 private component token 的關係 */}
          <div className="mx-auto" style={{ maxWidth: '480px' }}>
            <img
              src="/images/ds-third-layer.png"
              alt="Toaster component showing semantic and private component token relationship"
              style={{ width: '100%', height: 'auto', display: 'block', marginTop: '32px', marginBottom: '32px' }}
            />
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-[var(--color-surface)] p-6">
              <h3 className="font-display text-xl text-[var(--color-text)]">2-Layer (Before)</h3>
              <p className="mt-4 font-sans leading-[1.75] text-[var(--color-text)]">
                Designers choose from semantic tokens directly. Similar-sounding
                options create inconsistent decisions.
              </p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-[var(--color-muted)]">
                <span className="text-[var(--color-text)]">Cons:</span>{' '}
                ambiguous token selection, inconsistent output
              </p>
            </div>
            <div className="border-l-2 border-[var(--color-accent)] bg-[var(--color-surface)] p-6">
              <h3 className="font-display text-xl text-[var(--color-text)]">3-Layer (After)</h3>
              <p className="mt-4 font-sans leading-[1.75] text-[var(--color-text)]">
                Component tokens define the functional role of each UI element.
                Designers apply logic, not just color.
              </p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-[var(--color-muted)]">
                <span className="text-[var(--color-text)]">Pros:</span>{' '}
                precise intent, consistent implementation, less cognitive load
              </p>
            </div>
          </div>
        </section>

        <section>
          <SectionHeading>Key Decisions</SectionHeading>

          <div className="mt-10 max-w-[680px]">
            <h3 className="font-sans text-base font-semibold text-[var(--color-text)]">
              Keeping Component Tokens Private
            </h3>
            <div className="mt-4 space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
              <p>
                One early question was whether to publish component tokens
                globally so any designer could use them anywhere. I decided
                against it. Component tokens are scoped to specific modules —
                they&apos;re not meant to be reused across unrelated contexts.
              </p>
              <p>
                Keeping them private meant the library stayed manageable, and
                designers couldn&apos;t accidentally apply a table card token to
                a form field. A few people thought this would create more work.
                I agreed it added some friction — but <strong>global component tokens
                would&apos;ve created token sprawl faster than we could
                manage it.</strong> System stability over automation, at least at
                this stage.
              </p>
            </div>
          </div>

          <div className="mt-16 max-w-[680px]">
            <h3 className="font-sans text-base font-semibold text-[var(--color-text)]">
              Keeping General Semantic Tokens Available
            </h3>
            <div className="mt-4 space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
              <p>
                When I first introduced component tokens, I unpublished the
                general semantic tokens to push designers toward the new layer.
                It broke things immediately. Designers working on features that
                didn&apos;t have component tokens yet had nothing to reach for.
              </p>
              <p>
                So I kept a set of general semantic tokens published for those
                in-between moments — components still in design, features not
                yet scoped. <strong>The component token layer sits alongside, not
                on top of.</strong> New patterns earn their way in through an audit;
                edge cases stay flexible on the semantic layer.
              </p>
            </div>
          </div>

          <div className="mt-16 max-w-[680px]">
            <h3 className="font-sans text-base font-semibold text-[var(--color-text)]">
              Progressive Adoption, Not a Hard Cutover
            </h3>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-12 md:items-start" style={{ gridTemplateColumns: '1fr auto' }}>
            <div className="space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
              <p>
                We had two designers and eight engineers redesigning multiple
                workflows simultaneously. Launching with a comprehensive system
                would&apos;ve meant maintaining a huge library before we&apos;d
                validated any of the product decisions.
              </p>
              <p>
                So we launched with two layers. Once the first version shipped
                and things stabilized, I went back to engineering to introduce
                the component token layer. <strong>The architecture is fully built in
                Figma, aligned to engineering naming conventions</strong> so developers
                can inspect the intended token logic directly in Dev Mode when
                they&apos;re ready to implement — no separate spec docs needed.
              </p>
            </div>
            <div>
              <img
                src="/images/ds-devmode.png"
                alt="Figma Dev Mode showing component token names for engineering handoff"
                style={{ width: 'auto', maxWidth: '320px', height: 'auto', display: 'block' }}
              />
            </div>
          </div>
        </section>

        <section>
          <SectionHeading>Impact</SectionHeading>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <p className="font-mono text-[32px] text-[var(--color-accent)]">
                5 → 2
              </p>
              <p className="mt-3 font-sans text-sm leading-snug text-[var(--color-muted)]">
                steps in the handoff workflow
              </p>
              <p className="mt-2 font-sans text-xs text-[var(--color-muted)]">
                from update component → clean screens → InVision → Zeplin → engineer,
                down to update component → clean screens
              </p>
            </div>
            <div>
              <p className="font-mono text-[32px] text-[var(--color-accent)]">
              ↓
              </p>
              <p className="mt-3 font-sans text-sm leading-snug text-[var(--color-muted)]">
                engineering questions per month
              </p>
              <p className="mt-2 font-sans text-xs text-[var(--color-muted)]">
                from roughly once a week to once a month after engineers could
                self-serve in Figma Dev Mode
              </p>
            </div>
            <div>
              <p className="font-mono text-[32px] text-[var(--color-accent)]">↑</p>
              <p className="mt-3 font-sans text-sm leading-snug text-[var(--color-muted)]">
                architectural scalability
              </p>
              <p className="mt-2 font-sans text-xs text-[var(--color-muted)]">
                built to support dark mode and multi-theme without redesigning
                core components
              </p>
            </div>
          </div>
          <p className="mt-12 max-w-[680px] font-sans leading-[1.75] text-[var(--color-muted)]">
            In design reviews, the spec questions mostly disappeared. We spend
            that time on actual design decisions instead.
          </p>
        </section>

        <section>
          <SectionHeading>Reflection</SectionHeading>
          <div className="mt-8 max-w-[680px] space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
            <p>
              The hardest part of this project wasn&apos;t the token
              architecture — it was convincing the team that the problem was
              worth solving at all. Everyone was busy shipping features. The
              design system felt like overhead.
            </p>
            <p>
              What shifted the conversation was making the cost of inconsistency
              visible. I audited the production codebase and counted how many
              hard-coded color values existed outside the token system. That
              number got people&apos;s attention.
            </p>
            <p>
              I also used AI in parts of this project — generating color
              pattern documentation, working through token naming conventions,
              and drafting component specs. Mostly to get something on the page
              faster, then edit from there.
            </p>
          </div>
        </section>

        <section>
          <SectionHeading>Where It Is Now</SectionHeading>
          <div className="mt-8 max-w-[680px] space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
            <p>
              The two-layer system is in production across the platform. The
              component token layer is live in Figma — full implementation in
              code is still in progress, but the architecture is ready.
            </p>
            <p>
              <strong>When engineering has capacity, the system can extend into dark
              mode or multi-theme support without restructuring anything at the
              foundation.</strong> The question for the next phase is always the same:
              what gets promoted to a component token, and what stays one-off?
              The governance workflow makes that decision consistent — recurring
              patterns go through an audit and get promoted; edge cases stay on
              the open semantic layer.
            </p>
          </div>
        </section>

      </div>
    </article>
  )
}
