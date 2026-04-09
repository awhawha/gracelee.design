import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
}

export default function AboutPage() {
  return (
    <div className="bg-[var(--color-bg)] px-6 py-section">
      <div className="mx-auto max-w-content space-y-8">
        <h1 className="font-display text-4xl tracking-tight text-[var(--color-text)] md:text-5xl">
          About
        </h1>

        <div className="space-y-6 font-sans leading-relaxed text-[var(--color-text)]">
          <p>
            I’m Grace Lee, a senior product designer with a software engineering
            background. For nearly a decade I’ve focused on enterprise
            AI and data platforms—making complex workflows legible, configurable,
            and safe to operate at scale.
          </p>
          <p>
            My work spans design systems, multi-step configuration flows, and the
            system-level UX that holds products together. I partner closely with
            engineering and product to align mental models, information
            architecture, and delivery.
          </p>
          <p>
            I’m based in the Bay Area. Recent depth includes AutoML and MLops-style
            experiences, semantic token architectures, and design documentation
            that teams actually use in production.
          </p>
        </div>

        <div className="flex flex-col gap-4 font-sans text-[var(--color-accent)] sm:flex-row sm:gap-10">
          <a href="/resume.pdf" className="underline underline-offset-4 hover:opacity-80">
            Download resume (PDF)
          </a>
          <a
            href="https://www.linkedin.com/in/"
            className="underline underline-offset-4 hover:opacity-80"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  )
}
