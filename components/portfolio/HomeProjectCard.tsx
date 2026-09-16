import Link from 'next/link'

import { HeroShader } from '@/components/portfolio/HeroShader'
import type { Project } from '@/lib/projects'

export function HomeProjectCard({ project }: { project: Project }) {
  const title = project.homeTitle ?? project.title
  const blurb = project.homeBlurb ?? project.desc
  const thumb = project.homeBandImage ?? project.homeThumb
  const shader = project.homeShader

  return (
    <Link
      href={`/work/${project.id}`}
      data-cursor="case-study"
      className="group -mx-4 block max-w-[1440px] rounded-[20px] p-4 outline-none transition-[background-color,transform] duration-500 ease-out hover:-translate-y-0.5 hover:bg-[var(--home-cream)] focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:-mx-6 md:p-6"
    >
      <div className="flex items-center gap-[60px] max-[960px]:flex-col max-[960px]:items-start max-[960px]:gap-8">
        <div className="relative min-w-0 flex-[820] basis-0 overflow-hidden max-[960px]:w-full max-[960px]:flex-none">
          {thumb ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumb.img}
              alt=""
              width={thumb.width}
              height={thumb.height}
              className="h-auto w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          ) : (
            <div className="aspect-[820/541] w-full overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
              <HeroShader colors={shader?.colors} fallback={shader?.fallback} />
            </div>
          )}
        </div>
        <div className="flex min-w-0 w-full max-w-[540px] flex-[540] basis-0 flex-col items-start gap-6 max-[960px]:flex-none">
          <div className="flex flex-col gap-2">
            <p className="m-0 text-[13px] font-medium tracking-[0.04em] text-[var(--home-ink-body)]">
              {project.company}
            </p>
            <h2 className="m-0 font-display text-[28px] font-bold leading-normal tracking-[0.01em] text-black">
              {title}
            </h2>
          </div>
          <p className="m-0 text-[18px] leading-[30px] text-[var(--home-ink-body)]">
            {blurb}
          </p>
        </div>
      </div>
    </Link>
  )
}
