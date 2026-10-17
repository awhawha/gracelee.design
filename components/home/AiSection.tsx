import Image from 'next/image'

import { FileHead, displayFont, homeWrap } from '@/components/home/FileHead'
import { Reveal } from '@/components/home/Reveal'

const steps: {
  n: string
  stage: string
  title: string
  body: string
  note: string
  ship?: boolean
  delay: 0 | 1 | 2 | 3
}[] = [
  {
    n: '01',
    stage: 'DISCOVER',
    title: 'Research partner',
    body: 'From scattered notes to clear patterns',
    note: 'Interviews, competitors, data',
    delay: 0,
  },
  {
    n: '02',
    stage: 'DESIGN',
    title: 'Idea sparring',
    body: 'Explore more directions, faster',
    note: 'Concepts, copy, edge cases',
    delay: 1,
  },
  {
    n: '03',
    stage: 'BUILD',
    title: 'Code prototyper',
    body: 'Skip the handoff gap',
    note: 'Working prototypes in Cursor',
    delay: 2,
  },
  {
    n: '04',
    stage: 'SHIP',
    title: 'AI in the product',
    body: 'Designing AI features, not just using them',
    note: 'Museum AI Studio',
    ship: true,
    delay: 3,
  },
]

export function AiSection() {
  return (
    <section
      id="ai"
      className="relative scroll-mt-12 overflow-hidden bg-brand-dark pb-[88px] pt-[150px] text-white min-[641px]:pb-[120px]"
    >
      <FileHead label="ai-workflow.md" color="#E59BD3" tone="dark" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[180px] -top-40 z-0 size-[520px] rounded-full bg-[rgba(171,89,152,0.35)] blur-[80px]"
      />
      <div className={`${homeWrap} relative z-[1]`}>
        <Reveal>
          <div className="grid items-end gap-10 min-[1001px]:grid-cols-[1fr_auto]">
            <div>
              <span className="mb-3.5 block font-space text-[12px] uppercase tracking-[0.16em] text-brand-soft">
                How I work now
              </span>
              <h2 className={`${displayFont} text-[clamp(34px,4.2vw,52px)]`}>
                Where I use <em className="not-italic text-brand-soft">AI</em>
              </h2>
              <p className="mt-4 max-w-[620px] text-[18px] text-brand-dim">
                Across every stage of my design process, and inside the products I
                design.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Image
                src="/home/avatar_gracie.png"
                alt="Gracie, my AI assistant avatar"
                width={439}
                height={432}
                className="size-[120px] rounded-full object-cover shadow-[0_0_50px_rgba(171,89,152,0.55)]"
              />
              <span className="max-w-[150px] font-grotesk text-[18px] font-bold leading-[1.25] text-brand-soft">
                Gracie, my AI assistant
              </span>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-[18px] min-[641px]:grid-cols-2 min-[1001px]:grid-cols-4">
          {steps.map((step) => (
            <Reveal key={step.n} delay={step.delay} className="h-full">
              <article
                className={`h-full rounded-[22px] border px-6 py-7 transition-[transform,border-color,background-color] duration-300 hover:-translate-y-[5px] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
                  step.ship
                    ? 'border-transparent bg-[linear-gradient(140deg,var(--brand-accent),var(--brand-lav))] text-white'
                    : 'border-[rgba(229,155,211,0.12)] bg-brand-dark2 hover:border-[rgba(229,155,211,0.45)]'
                }`}
              >
                <span
                  className={`font-space text-[13px] ${step.ship ? 'text-white' : 'text-brand-soft'}`}
                >
                  {step.n}
                </span>
                <div
                  className={`mb-1.5 mt-[22px] font-space text-[12px] tracking-[0.14em] ${
                    step.ship ? 'text-white' : 'text-brand-dim'
                  }`}
                >
                  {step.stage}
                </div>
                <h3 className={`${displayFont} mb-2.5 text-[22px] text-white`}>
                  {step.title}
                </h3>
                <p className={`text-[15px] ${step.ship ? 'text-white' : 'text-[#e8d8e3]'}`}>
                  {step.body}
                </p>
                <small
                  className={`mt-[18px] block font-space text-[11px] uppercase tracking-[0.08em] ${
                    step.ship ? 'text-white' : 'text-brand-dim'
                  }`}
                >
                  {step.note}
                </small>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
