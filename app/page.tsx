import { CaseStudyCard } from '@/components/CaseStudyCard'

export default function HomePage() {
  return (
    <>
      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg)] pb-16 pt-20">
        <div className="mx-auto max-w-wide px-6">
          <div className="max-w-content">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
              Senior product designer
            </p>
            <h1 className="mt-6 font-display text-4xl leading-[1.15] tracking-tight text-[var(--color-text)] md:text-5xl md:leading-[1.1]">
              I design AI systems that people can actually use.
            </h1>
            <p className="mt-8 max-w-[680px] font-sans text-lg leading-relaxed text-[var(--color-muted)] text-balance">
              9 years designing enterprise workflows for data and AI platforms.
              Engineering background. Based in the Bay Area.
            </p>
          </div>
        </div>
      </section>

      <CaseStudyCard
        number="01"
        title="Enterprise AutoML workflow redesign"
        description="End-to-end rethink of how practitioners configure, train, and ship models in a complex enterprise AutoML product—reducing dead ends and aligning the UI with how work actually gets done."
        tags={[
          'Enterprise AI',
          'Configuration workflow',
          'System UX',
        ]}
        href="/enterprise-redesign"
        isFirst
        imageSrc="/images/enterprise-hero.png"
        imageAlt="dotData Enterprise AutoML: Define Target step with configuration panel and data schema canvas"
      />

      <CaseStudyCard
        number="02"
        title="Design system with a three-layer token architecture"
        description="A scalable design language for data-heavy products: semantic tokens, component contracts, and documentation that helped design and engineering ship consistently at scale."
        tags={[
          'Design systems',
          'Token architecture',
          'Design–dev alignment',
        ]}
        href="/design-system"
        surface
        imageSrc="/images/ds-hero.png"
        imageAlt="Three-layer design token flow: Primitive, Semantic, and Component tokens mapped to a Table Card UI"
      />
    </>
  )
}
