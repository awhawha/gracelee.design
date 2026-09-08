import type { Metadata } from 'next'
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
    <div className="font-sans text-primary">
      <div className="mx-auto max-w-pf px-10 pb-14 pt-10 max-[640px]:px-6 max-[640px]:pb-12 max-[640px]:pt-6">
        <h1 data-stagger className="type-header m-0 max-w-[14em]">
          A senior product designer who{' '}
          <em className="font-normal italic">builds systems</em> with craft.
        </h1>
      </div>

      <div className="mx-auto grid max-w-pf grid-cols-2 gap-16 px-10 pb-20 max-[900px]:grid-cols-1 max-[900px]:gap-10 max-[640px]:px-6 max-[640px]:pb-12">
        <div data-stagger>
          <img
            src="/images/profile.jpg"
            alt="Grace Lee"
            width={560}
            height={700}
            className="aspect-[4/5] w-full rounded-[12px] border border-surface-tertiary object-cover"
          />
        </div>
        <div data-stagger>
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
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className="type-cap rounded-full bg-surface-secondary px-[13px] py-[6px] text-secondary"
              >
                {s}
              </span>
            ))}
          </div>
          <a
            href="mailto:yahuilee0618@gmail.com"
            className="type-body mt-9 inline-block font-medium text-accent-primary underline-offset-[5px] hover:underline"
          >
            yahuilee0618@gmail.com
          </a>
        </div>
      </div>

      <div
        id="experience"
        className="mx-auto max-w-pf scroll-mt-8 border-t border-surface-tertiary px-10 py-14 max-[640px]:px-6"
      >
        <div className="type-cap mb-7 text-tertiary">Experience</div>
        <div data-stagger-group>
          {experience.map((e) => (
            <div
              key={e.company}
              className="grid grid-cols-[1fr_1fr_120px] items-baseline border-t border-surface-tertiary py-[22px] last:border-b max-[640px]:grid-cols-[1fr_auto] max-[640px]:gap-x-4"
            >
              <span className="type-header-sm">{e.company}</span>
              <span className="type-body-sm text-secondary max-[640px]:col-span-2">
                {e.role}
              </span>
              <span className="type-cap text-right text-tertiary max-[640px]:col-start-2 max-[640px]:row-start-1">
                {e.dates}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-pf px-10 pb-14 max-[640px]:px-6">
        <div className="type-cap mb-7 text-tertiary">Education</div>
        <div data-stagger-group>
          {education.map((e) => (
            <div
              key={e.degree}
              className="grid grid-cols-[1fr_1fr_120px] items-baseline border-t border-surface-tertiary py-[22px] last:border-b max-[640px]:grid-cols-[1fr_auto] max-[640px]:gap-x-4"
            >
              <span className="type-header-sm">{e.degree}</span>
              <span className="type-body-sm text-secondary max-[640px]:col-span-2">
                {e.school}
              </span>
              <span className="type-cap text-right text-tertiary max-[640px]:col-start-2 max-[640px]:row-start-1">
                {e.dates}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
