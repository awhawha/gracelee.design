import type { Metadata } from 'next'

import { MetadataRow } from '@/components/MetadataRow'
import { SectionHeading } from '@/components/SectionHeading'

export const metadata: Metadata = {
  title: 'Design system & token architecture',
}

export default function DesignSystemPage() {
  return (
    <article className="bg-[var(--color-bg)]">
      <header className="border-b border-[var(--color-border)] px-6 py-section">
        <div className="mx-auto max-w-content">
          <h1 className="font-display text-4xl leading-tight tracking-tight text-[var(--color-text)] md:text-5xl">
            Design system with a three-layer token architecture
          </h1>
          <p className="mt-6 font-sans text-lg leading-relaxed text-[var(--color-muted)]">
            Placeholder: one-sentence summary (dotData, semantic and component
            tokens, scaling a design language across products).
          </p>
          <div className="mt-12">
            <MetadataRow
              items={[
                { label: 'Role', value: 'Design systems lead' },
                { label: 'Product', value: 'dotData platform suite' },
                { label: 'Team', value: 'Design, front-end, documentation' },
                { label: 'Focus', value: 'Tokens, components, governance' },
              ]}
            />
          </div>
        </div>
      </header>

      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-section">
        <div className="mx-auto max-w-hero">
          <p className="font-mono text-xs text-[var(--color-muted)]">
            Hero image placeholder — add /images/ds-hero.png
          </p>
        </div>
      </section>

      <section className="px-6 py-section">
        <div className="mx-auto max-w-content space-y-6">
          <SectionHeading>Overview</SectionHeading>
          <p className="font-sans leading-relaxed text-[var(--color-text)]">
            Placeholder body copy. This page will walk through the three-layer
            token model, how components map to tokens, and outcomes for design
            and engineering velocity.
          </p>
        </div>
      </section>
    </article>
  )
}
