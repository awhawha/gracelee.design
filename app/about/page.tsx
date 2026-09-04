import type { Metadata } from 'next'
import { FloatingOrbs } from '@/components/portfolio/FloatingOrbs'
import { experience } from '@/lib/experience'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Grace Lee — senior product designer with an engineering background, based in the San Francisco Bay Area.',
}

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
    <div className="relative z-0 font-sans text-primary">
      <FloatingOrbs />

      {/* H1 */}
      <div className="relative z-10 mx-auto max-w-pf px-10 pb-14 pt-24 max-[640px]:px-6">
        <h1 className="type-display m-0 max-w-[900px]">
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
          <p className="type-body mb-[22px] text-secondary">
            I&apos;m a senior product designer based in the San Francisco Bay
            Area with 9+ years of experience across analytics, data, and AI
            products. I turn complex systems into clear, trusted experiences for
            the people who use them.
          </p>
          <p className="type-body mb-[22px] text-secondary">
            I work end to end: framing problems through research, shaping
            strategy with product and engineering, and refining details until
            the experience feels cohesive. I&apos;ve built design systems and
            mentored designers.
          </p>
          <p className="type-body mb-[22px] text-secondary">
            My engineering background makes collaboration with developers feel
            like shared problem-solving. In design-system work, I connect design
            intent to implementation through semantic tokens, components, and
            clear usage rules.
          </p>
          <p className="type-body mb-[22px] text-secondary">
            Outside of work, I spend a lot of time with my daughter, drawing,
            gardening, and doing hands-on projects.
          </p>
          <div className="mt-2 flex flex-wrap gap-[10px]">
            {skills.map((s) => (
              <span
                key={s}
                className="rounded-full border border-surface-tertiary bg-surface-secondary px-[13px] py-[7px] text-[13px]"
              >
                {s}
              </span>
            ))}
          </div>
          {/* Contact — the site's only email, since the footer carries none */}
          <a
            href="mailto:yahuilee0618@gmail.com"
            className="mt-9 inline-block text-[18px] font-medium text-accent-primary underline-offset-[5px] hover:underline"
          >
            yahuilee0618@gmail.com
          </a>
        </div>
      </div>

      {/* Experience */}
      <div
        id="experience"
        className="relative z-10 mx-auto max-w-pf scroll-mt-8 border-t border-surface-tertiary px-10 py-14 max-[640px]:px-6"
      >
        <div className="type-cap mb-7 text-tertiary">
          Experience
        </div>
        {experience.map((e) => (
          <div
            key={e.company}
            className="grid grid-cols-[1fr_1fr_120px] items-baseline border-t border-surface-tertiary py-[22px] last:border-b max-[640px]:grid-cols-[1fr_auto] max-[640px]:gap-x-4"
          >
            <span className="text-[24px] font-medium">{e.company}</span>
            <span className="text-[16px] text-secondary max-[640px]:col-span-2 max-[640px]:text-[15px]">
              {e.role}
            </span>
            <span className="text-right font-sans text-[13px] text-tertiary max-[640px]:col-start-2 max-[640px]:row-start-1">
              {e.dates}
            </span>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="relative z-10 mx-auto max-w-pf px-10 pb-14 max-[640px]:px-6">
        <div className="type-cap mb-7 text-tertiary">
          Education
        </div>
        {education.map((e) => (
          <div
            key={e.degree}
            className="grid grid-cols-[1fr_1fr_120px] items-baseline border-t border-surface-tertiary py-[22px] last:border-b max-[640px]:grid-cols-[1fr_auto] max-[640px]:gap-x-4"
          >
            <span className="text-[24px] font-medium max-[640px]:text-[20px]">
              {e.degree}
            </span>
            <span className="text-[16px] text-secondary max-[640px]:col-span-2 max-[640px]:text-[15px]">
              {e.school}
            </span>
            <span className="text-right font-sans text-[13px] text-tertiary max-[640px]:col-start-2 max-[640px]:row-start-1">
              {e.dates}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
}
