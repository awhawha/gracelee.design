import Link from 'next/link'
import { groups } from '@/lib/projects'

export default function HomePage() {
  return (
    <div className="font-grotesk text-pf-ink">
      {/* Hero */}
      <section className="mx-auto max-w-pf px-10 pb-[72px] pt-24 max-[640px]:px-6">
        <div className="mb-8 font-mono-ui text-[13px] uppercase tracking-[0.16em] text-pf-accent">
          Portfolio — 2026
        </div>
        <h1 className="mb-8 max-w-[1000px] text-[88px] font-semibold leading-[0.96] tracking-[-0.035em] max-[900px]:text-[clamp(40px,10vw,88px)]">
          I design clarity into complex products.
        </h1>
        <p className="mb-9 max-w-[600px] text-[21px] leading-[1.5] text-pf-secondary">
          Senior product designer with 10 years shaping systems-heavy software
          across analytics, AI, and marketing platforms. I turn ambiguity into
          shipped, measurable outcomes.
        </p>
        <div className="flex items-center gap-[11px] text-[15px] text-pf-secondary">
          <span className="h-[9px] w-[9px] rounded-full bg-pf-accent" />
          Open to Senior &amp; Staff product design roles
        </div>
      </section>

      {/* Work index — grouped by company */}
      <section className="mx-auto max-w-pf px-10 pb-10 max-[640px]:px-6">
        <div className="mb-2 font-mono-ui text-[13px] uppercase tracking-[0.16em] text-pf-muted">
          Selected work
        </div>
        {groups.map((g) => (
          <div
            key={g.company}
            className="grid grid-cols-[280px_1fr] gap-12 border-t-2 border-pf-ink pb-3 pt-10 max-[900px]:grid-cols-1 max-[900px]:gap-4"
          >
            <div>
              <div className="text-[30px] font-semibold tracking-[-0.02em]">
                {g.company}
              </div>
              <div className="mt-[10px] font-mono-ui text-[12px] uppercase tracking-[0.1em] text-pf-muted-light">
                {g.meta}
              </div>
            </div>
            <div>
              {g.projects.map((p) => (
                <Link
                  key={p.id}
                  href={`/work/${p.id}`}
                  className="grid grid-cols-[1fr_28px] items-center gap-4 border-b border-pf-hairline px-2 py-[22px] transition-[background,padding] duration-150 hover:bg-[rgba(96,104,52,0.09)] hover:pl-5"
                >
                  <div>
                    <div className="text-[26px] font-semibold tracking-[-0.02em]">
                      {p.title}
                    </div>
                    <div className="mt-1 text-[15px] text-pf-muted">{p.desc}</div>
                  </div>
                  <span className="text-right text-[19px] text-pf-accent">↗</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Footer band */}
      <div className="mt-20 bg-pf-ink text-white">
        <div className="mx-auto max-w-pf px-10 py-24 max-[640px]:px-6">
          <h2 className="mb-7 text-[64px] font-semibold leading-[0.98] tracking-[-0.03em] max-[900px]:text-[clamp(36px,9vw,64px)]">
            Let&apos;s build
            <br />
            something clear.
          </h2>
          <div className="flex flex-wrap items-center gap-6 text-[17px]">
            <a
              href="mailto:yahuilee0618@gmail.com"
              className="font-semibold text-pf-accent-dark"
            >
              yahuilee0618@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/yahuilee/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pf-muted transition-colors hover:text-white"
            >
              LinkedIn ↗
            </a>
            <a
              href="/images/gracelee-resume-2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pf-muted transition-colors hover:text-white"
            >
              Resume ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
