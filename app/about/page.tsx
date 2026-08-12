import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Grace Lee — senior product designer with an engineering background, based in the San Francisco Bay Area.',
}

const experience = [
  { company: 'dotData', role: 'Senior Product Designer', dates: '2019—2025' },
  { company: 'Kahuna', role: 'UX Designer', dates: '2016—2018' },
  {
    company: 'Wislite Technology',
    role: 'Interaction Designer & Software Engineer',
    dates: '2007—2013',
  },
]

const education = [
  {
    degree: 'MFA, Web Design & New Media',
    school: 'Academy of Art University',
    dates: '2013—2016',
  },
  {
    degree: 'BA, Information Management',
    school: 'Tamkang University',
    dates: '2003—2007',
  },
]

const skills = [
  'Interaction Design',
  'Design Systems',
  'Information Architecture',
  'Data Visualization',
  'Usability Testing',
  'Frontend (HTML, CSS, APIs)',
]

export default function AboutPage() {
  return (
    <div className="font-grotesk text-pf-ink">
      {/* H1 */}
      <div className="mx-auto max-w-pf px-10 pb-14 pt-24 max-[640px]:px-6">
        <h1 className="m-0 max-w-[1040px] text-[62px] font-semibold leading-[1.04] tracking-[-0.03em] max-[900px]:text-[clamp(38px,8vw,62px)]">
          A senior product designer who&apos;s equal parts{' '}
          <span className="text-pf-accent">systems thinker</span> and
          craftsperson.
        </h1>
      </div>

      {/* Portrait + bio */}
      <div className="mx-auto grid max-w-pf grid-cols-[440px_1fr] gap-14 px-10 pb-[72px] max-[900px]:grid-cols-1 max-[900px]:gap-10 max-[640px]:px-6">
        <div className="flex h-[520px] items-center justify-center self-start rounded-[14px] border border-pf-border bg-pf-stripes max-[900px]:h-[360px]">
          <span className="font-mono-ui text-[13px] text-pf-placeholder">
            [ portrait ]
          </span>
        </div>
        <div className="max-w-[560px]">
          <p className="mb-[22px] text-[21px] leading-[1.55] text-pf-body-about">
            I&apos;m a senior product designer based in the San Francisco Bay
            Area. For ten years I&apos;ve worked at the seam where complex
            systems meet real people — analytics, AI tooling, marketing
            platforms — turning the parts that overwhelm users into the parts
            they trust.
          </p>
          <p className="mb-[22px] text-[21px] leading-[1.55] text-pf-body-about">
            I work end-to-end: framing the problem with research, shaping
            strategy with PM and eng, and sweating the pixels until the craft is
            undeniable. I care about teams as much as artifacts — I&apos;ve built
            design systems, run critique, and mentored designers into senior
            roles.
          </p>
          <p className="mb-[22px] text-[21px] leading-[1.55] text-pf-body-about">
            Before moving fully into design, I spent a few years in engineering.
            That background still shapes how I work — conversations with
            engineers feel less like translation and more like collaboration,
            and when I&apos;m building design systems I think about token
            structure from the implementation side, not just the design side.
          </p>
          <p className="mb-[22px] text-[21px] leading-[1.55] text-pf-body-about">
            Outside of work, I spend a lot of time with my daughter, drawing,
            gardening, and doing hands-on projects. Some of my clearest thinking
            on a stuck design problem has happened while doing something
            completely unrelated.
          </p>
          <div className="mt-2 flex flex-wrap gap-[10px]">
            {skills.map((s) => (
              <span
                key={s}
                className="rounded-full border border-pf-border bg-pf-chip px-[13px] py-[7px] text-[13px]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="mx-auto max-w-pf border-t border-pf-hairline px-10 py-14 max-[640px]:px-6">
        <div className="mb-7 font-mono-ui text-[13px] uppercase tracking-[0.12em] text-pf-muted-light">
          Experience
        </div>
        {experience.map((e) => (
          <div
            key={e.company}
            className="grid grid-cols-[1fr_1fr_120px] items-baseline border-t border-pf-hairline py-[22px] last:border-b max-[640px]:grid-cols-[1fr_auto] max-[640px]:gap-x-4"
          >
            <span className="text-[24px] font-medium">{e.company}</span>
            <span className="text-[16px] text-pf-secondary max-[640px]:col-span-2 max-[640px]:text-[15px]">
              {e.role}
            </span>
            <span className="text-right font-mono-ui text-[13px] text-pf-muted max-[640px]:col-start-2 max-[640px]:row-start-1">
              {e.dates}
            </span>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="mx-auto max-w-pf px-10 pb-14 max-[640px]:px-6">
        <div className="mb-7 font-mono-ui text-[13px] uppercase tracking-[0.12em] text-pf-muted-light">
          Education
        </div>
        {education.map((e) => (
          <div
            key={e.degree}
            className="grid grid-cols-[1fr_1fr_120px] items-baseline border-t border-pf-hairline py-[22px] last:border-b max-[640px]:grid-cols-[1fr_auto] max-[640px]:gap-x-4"
          >
            <span className="text-[24px] font-medium max-[640px]:text-[20px]">
              {e.degree}
            </span>
            <span className="text-[16px] text-pf-secondary max-[640px]:col-span-2 max-[640px]:text-[15px]">
              {e.school}
            </span>
            <span className="text-right font-mono-ui text-[13px] text-pf-muted max-[640px]:col-start-2 max-[640px]:row-start-1">
              {e.dates}
            </span>
          </div>
        ))}
      </div>

      {/* Dark CTA band */}
      <div className="bg-pf-ink text-white">
        <div className="mx-auto max-w-pf px-10 py-20 max-[640px]:px-6">
          <h2 className="mb-6 text-[48px] font-semibold leading-[1] tracking-[-0.025em] max-[900px]:text-[clamp(32px,7vw,48px)]">
            Open to Senior &amp; Staff roles.
          </h2>
          <div className="flex flex-wrap items-center gap-6 text-[17px]">
            <a
              href="mailto:yahuilee0618@gmail.com"
              className="font-medium text-pf-accent-dark"
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
