import Link from 'next/link'
import { HeroShader } from '@/components/portfolio/HeroShader'
import { homeProjects } from '@/lib/projects'

export default function HomePage() {
  return (
    <div className="font-grotesk text-pf-ink">
      {/* Hero — white copy over the mesh-gradient panel */}
      <section className="mx-auto max-w-pf px-10 pb-[72px] pt-10 max-[640px]:px-6">
        <div className="relative overflow-hidden rounded-[36px] max-[640px]:rounded-[20px]">
          <HeroShader />
          <div className="relative flex flex-col items-start gap-[62px] px-[80px] pb-[72px] pt-[88px] text-white max-[900px]:gap-10 max-[900px]:p-10 max-[640px]:gap-8 max-[640px]:p-7">
            <h1 className="m-0 max-w-[1000px] text-[72px] font-semibold leading-[0.96] tracking-[-0.03em] max-[900px]:text-[clamp(36px,9vw,72px)]">
              Hi, I am Grace.
            </h1>
            <p className="m-0 max-w-[900px] text-[22px] leading-[1.5] max-[640px]:text-[17px]">
              Senior product designer and design systems practitioner with an
              engineering foundation and 9 years of experience across
              analytics, data, and AI products. I build scalable, token-driven
              systems and work across product, design, and engineering to turn
              technical complexity into clear, consistent experiences.
            </p>
            <div className="h-px w-[28px] bg-white" />
            <div className="text-[16px] leading-[1.5]">
              Open to Senior Product Designer roles
            </div>
          </div>
        </div>
      </section>

      {/* Work index — grouped by company */}
      <section className="mx-auto max-w-pf px-10 pb-10 max-[640px]:px-6">
        <div className="mb-2 font-mono-ui text-[12px] tracking-[0.04em] text-pf-muted">
          Selected work
        </div>
        <div className="border-t border-pf-hairline pb-3 pt-10">
          {homeProjects.map((p) => (
            <Link
              key={p.id}
              href={`/work/${p.id}`}
              className="grid grid-cols-[1fr_28px] items-center gap-4 border-b border-pf-hairline px-2 py-[22px] transition-[background,padding] duration-150 hover:bg-[rgba(96,104,52,0.09)] hover:pl-5"
            >
              <div>
                <div className="text-[26px] font-semibold tracking-[-0.02em]">
                  {p.homeTitle ?? p.title}
                </div>
                <div className="mt-1 text-[15px] text-pf-muted">
                  {p.homeSubtitle ?? p.desc}
                </div>
              </div>
              <span className="text-right text-[19px] text-pf-accent">↗</span>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}
