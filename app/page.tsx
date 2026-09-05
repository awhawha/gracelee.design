import { HomeProjectCard } from '@/components/portfolio/HomeProjectCard'
import { experience } from '@/lib/experience'
import { homeProjects } from '@/lib/projects'

export default function HomePage() {
  return (
    <div className="font-sans text-primary">
      <section className="grid grid-cols-2 items-start gap-16 px-10 pb-20 pt-10 max-[900px]:grid-cols-1 max-[900px]:gap-10 max-[640px]:px-6 max-[640px]:pb-12 max-[640px]:pt-6">
        <h1 data-stagger className="type-header m-0 max-w-[11em]">
          I&apos;m Grace, a product designer who{' '}
          <em className="font-normal italic">builds systems</em>.
        </h1>
        <ul
          data-stagger
          className="m-0 grid list-none grid-cols-[6.75rem_minmax(0,1fr)_minmax(0,1.4fr)] gap-x-5 gap-y-3 p-0 text-[13px] leading-snug text-secondary max-[640px]:grid-cols-[5.75rem_1fr] max-[640px]:gap-x-3"
        >
          {experience.map((e) => (
            <li key={e.company} className="contents">
              <span className="text-tertiary">{e.dates}</span>
              <span className="text-primary">{e.company}</span>
              <span className="max-[640px]:col-span-2 max-[640px]:col-start-2 max-[640px]:-mt-1">
                {e.role}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="work"
        data-stagger-group
        className="grid grid-cols-2 gap-2 p-2 max-[900px]:grid-cols-1 max-[640px]:gap-1.5 max-[640px]:p-1.5"
      >
        {homeProjects.map((p) => (
          <HomeProjectCard key={p.id} project={p} />
        ))}
      </section>
    </div>
  )
}
