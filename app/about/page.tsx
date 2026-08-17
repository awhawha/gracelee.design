import type { Metadata } from 'next'
import { FloatingOrbs } from '@/components/portfolio/FloatingOrbs'

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
    // `relative z-0` scopes the fixed orb layer to this page: the sections
    // below sit at z-10, so the orbs stay behind the copy.
    <div className="relative z-0 font-grotesk text-pf-ink">
      <FloatingOrbs />

      {/* H1 */}
      <div className="relative z-10 mx-auto max-w-pf px-10 pb-14 pt-24 max-[640px]:px-6">
        <h1 className="m-0 max-w-[900px] text-[62px] font-semibold leading-[1.04] tracking-[-0.03em] max-[900px]:text-[clamp(38px,8vw,62px)]">
          A senior product designer who builds systems with craft.
        </h1>
      </div>

      {/* Portrait + bio */}
      <div className="relative z-10 mx-auto grid max-w-pf grid-cols-[440px_1fr] gap-14 px-10 pb-[72px] max-[900px]:grid-cols-1 max-[900px]:gap-10 max-[640px]:px-6">
        <div className="flex justify-center self-start max-[900px]:justify-start">
          <img
            src="/images/profile.jpg"
            alt="Grace Lee"
            width={390}
            height={390}
            className="h-[390px] w-[390px] rounded-full object-cover max-[900px]:h-[280px] max-[900px]:w-[280px]"
          />
        </div>
        <div className="max-w-[520px]">
          <p className="mb-[22px] text-[18px] leading-[1.65] text-pf-body-about">
            I&apos;m a senior product designer based in the San Francisco Bay
            Area with 9+ years of experience across analytics, data, and AI
            products. I turn complex systems into clear, trusted experiences for
            the people who use them.
          </p>
          <p className="mb-[22px] text-[18px] leading-[1.65] text-pf-body-about">
            I work end to end: framing problems through research, shaping
            strategy with product and engineering, and refining details until
            the experience feels cohesive. I&apos;ve built design systems and
            mentored designers.
          </p>
          <p className="mb-[22px] text-[18px] leading-[1.65] text-pf-body-about">
            My engineering background makes collaboration with developers feel
            like shared problem-solving. In design-system work, I connect design
            intent to implementation through semantic tokens, components, and
            clear usage rules.
          </p>
          <p className="mb-[22px] text-[18px] leading-[1.65] text-pf-body-about">
            Outside of work, I spend a lot of time with my daughter, drawing,
            gardening, and doing hands-on projects.
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
          {/* Contact — the site's only email, since the footer carries none */}
          <a
            href="mailto:yahuilee0618@gmail.com"
            className="mt-9 inline-block text-[18px] font-medium text-pf-accent underline-offset-[5px] hover:underline"
          >
            yahuilee0618@gmail.com
          </a>
        </div>
      </div>

      {/* Experience */}
      <div className="relative z-10 mx-auto max-w-pf border-t border-pf-hairline px-10 py-14 max-[640px]:px-6">
        <div className="mb-7 font-mono-ui text-[12px] tracking-[0.04em] text-pf-muted">
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
      <div className="relative z-10 mx-auto max-w-pf px-10 pb-14 max-[640px]:px-6">
        <div className="mb-7 font-mono-ui text-[12px] tracking-[0.04em] text-pf-muted">
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

    </div>
  )
}
