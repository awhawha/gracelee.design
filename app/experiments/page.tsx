import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Experiments',
}

const experiments = [
  {
    number: '01',
    title: 'Whiteboard Design Challenge Tool',
    description:
      'A practice tool for product designer whiteboard challenges. 30 questions across four weeks of difficulty, with a five-step framework, timer, and AI feedback on each answer. Built with the OpenAI API.',
    tags: ['OpenAI API', 'Product Design Practice', 'Side Project'],
    type: 'video' as const,
    mediaSrc: '/images/whiteboard-demo.mp4',
    cta: null,
  },
  {
    number: '02',
    title: 'Forest Soup House',
    description:
      'A side project built with my daughter. A small website about a fictional forest restaurant where animals come to eat soup. An excuse to build something with no product requirements at all.',
    tags: ['Side Project', 'Web'],
    type: 'link' as const,
    mediaSrc: '/images/forest-soup-house.png',
    cta: { label: 'Visit the site →', href: 'https://forest-soup-house.vercel.app' },
  },
  {
    number: '03',
    title: 'Reimagine dotData Enterprise',
    description:
      'An agentic AI prototype exploring what the AutoML configuration flow could look like if the system analyzed your data first, then guided you toward a model. Built to explore the conversation-first direction from the enterprise redesign case study.',
    tags: ['Agentic AI', 'Prototype', 'dotData'],
    type: 'link' as const,
    mediaSrc: null,
    cta: { label: 'Try the prototype →', href: '/prototypes/ai-modeling-advisor.html' },
  },
]

export default function ExperimentsPage() {
  return (
    <article className="bg-[var(--color-bg)]">
      <header className="border-b border-[var(--color-border)] px-6 pb-16 pt-20">
        <div className="mx-auto max-w-wide">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
            Side projects &amp; explorations
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-[var(--color-text)] md:text-5xl">
            Experiments
          </h1>
          <p className="mt-6 max-w-[560px] font-sans text-lg leading-[1.75] text-[var(--color-muted)]">
            Things I built outside of work — some as tools for myself, some with
            my daughter, some to explore ideas that didn&apos;t fit into a
            regular project.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-wide px-6 py-24">
        <div className="space-y-0 divide-y divide-[var(--color-border)]">
          {experiments.map((exp) => (
            <div key={exp.number} className="py-16 first:pt-0">
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start">

                <div>
                  <p className="font-mono text-sm text-[var(--color-muted)]">{exp.number}</p>
                  <h2 className="mt-3 font-display text-2xl leading-tight tracking-tight text-[var(--color-text)] md:text-3xl">
                    {exp.title}
                  </h2>
                  <p className="mt-4 font-sans leading-[1.75] text-[var(--color-text)]">
                    {exp.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--color-muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {exp.cta && (
                    <a
                      href={exp.cta.href}
                      target={exp.cta.href.startsWith('http') ? '_blank' : undefined}
                      rel={exp.cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="mt-8 inline-block font-mono text-xs uppercase tracking-[0.1em] text-[var(--color-accent)] underline underline-offset-4 hover:opacity-70"
                    >
                      {exp.cta.label}
                    </a>
                  )}
                </div>

                <div className="bg-[var(--color-surface)]">
                  {exp.type === 'video' && exp.mediaSrc ? (
                    <video
                      src={exp.mediaSrc}
                      controls
                      playsInline
                      preload="metadata"
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  ) : exp.mediaSrc ? (
                    <img
                      src={exp.mediaSrc}
                      alt={exp.title}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  ) : (
                    <div
                      className="flex items-center justify-center"
                      style={{ minHeight: '240px' }}
                    >
                      <p className="font-mono text-xs text-[var(--color-muted)]">
                        [ preview coming soon ]
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}