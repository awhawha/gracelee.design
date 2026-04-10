import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Grace Lee',
}

export default function AboutPage() {
  return (
    <article className="bg-[var(--color-bg)] px-6 py-24">
      <div className="mx-auto max-w-content">

        <div className="max-w-[680px]">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
            Senior Product Designer
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight text-[var(--color-text)] md:text-5xl">
            Grace Lee
          </h1>
        </div>

        <div className="mt-16 max-w-[680px] space-y-6 font-sans leading-[1.75] text-[var(--color-text)]">
          <p>
            Hello, I&apos;m Grace.
          </p>
          <p>
            I&apos;ve been doing product design for several years now, mostly on
            B2B platforms in AI and predictive analytics. The problems I&apos;m
            drawn to are the ones where the system underneath is genuinely
            complex, but the person using it shouldn&apos;t have to understand
            that complexity to get their work done.
          </p>
          <p>
            Before moving fully into design, I spent a few years in engineering.
            That background still shapes how I work. It makes conversations with
            engineers feel less like translation and more like collaboration, and
            when I&apos;m building design systems, I tend to think about token
            structure from the implementation side, not just the design side.
            It&apos;s not that it makes me better at the job, just that it
            changes how I approach certain problems.
          </p>
          <p>
            Outside of work, I spend a lot of time with my daughter, drawing,
            gardening, and doing hands-on projects. Those slower moments matter.
            Some of my clearest thinking on a stuck design problem has happened
            while doing something completely unrelated.
          </p>
        </div>

        <div className="mt-16 border-t border-[var(--color-border)] pt-12">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
                Experience
              </p>
              <div className="mt-4 space-y-4 font-sans text-sm leading-[1.75] text-[var(--color-text)]">
                <div>
                  <p className="font-medium">dotData</p>
                  <p className="text-[var(--color-muted)]">Senior Product Designer, 2019&ndash;2025</p>
                </div>
                <div>
                  <p className="font-medium">Kahuna</p>
                  <p className="text-[var(--color-muted)]">UX Designer, 2016&ndash;2018</p>
                </div>
                <div>
                  <p className="font-medium">Wislite Technology</p>
                  <p className="text-[var(--color-muted)]">Interaction Designer &amp; Software Engineer, 2007&ndash;2013</p>
                </div>
              </div>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
                Skills
              </p>
              <div className="mt-4 space-y-1 font-sans text-sm leading-[1.75] text-[var(--color-text)]">
                <p>Interaction Design</p>
                <p>Design Systems</p>
                <p>Information Architecture</p>
                <p>Data Visualization</p>
                <p>Usability Testing</p>
                <p>Frontend (HTML, CSS, APIs)</p>
              </div>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-muted)]">
                Education
              </p>
              <div className="mt-4 space-y-4 font-sans text-sm leading-[1.75] text-[var(--color-text)]">
                <div>
                  <p className="font-medium">MFA, Web Design &amp; New Media</p>
                  <p className="text-[var(--color-muted)]">Academy of Art University, 2013&ndash;2016</p>
                </div>
                <div>
                  <p className="font-medium">BA, Information Management</p>
                  <p className="text-[var(--color-muted)]">Tamkang University, 2003&ndash;2007</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:gap-8">
          <a
            href="/images/gracelee-resume-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)] underline underline-offset-4 hover:opacity-70"
          >
            Download Resume
          </a>
          <a
            href="https://www.linkedin.com/in/yahuilee/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)] underline underline-offset-4 hover:opacity-70"
          >
            LinkedIn
          </a>
          <a
            href="mailto:yahuilee0618@gmail.com"
            className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-accent)] underline underline-offset-4 hover:opacity-70"
          >
            Email
          </a>
        </div>

      </div>
    </article>
  )
}