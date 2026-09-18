import Link from 'next/link'

import { HeroShader } from '@/components/portfolio/HeroShader'
import type { Project } from '@/lib/projects'

const cardClassName =
  'group relative -mx-4 block max-w-[1440px] rounded-[20px] p-4 outline-none transition-[background-color,transform] duration-500 ease-out hover:-translate-y-0.5 hover:bg-[var(--home-cream)] focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:-mx-6 md:p-6'

const ctaClassName =
  'inline-flex min-h-12 w-full items-center justify-center rounded-full border-2 px-6 py-3 text-[18px] leading-none min-[960px]:min-h-10 min-[960px]:w-auto min-[960px]:justify-start min-[960px]:px-4 min-[960px]:py-2 min-[960px]:text-[16px]'

function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href)
}

function CardBody({
  project,
  title,
  blurb,
  thumb,
  shader,
  external,
}: {
  project: Project
  title: string
  blurb: string
  thumb: Project['homeBandImage'] | Project['homeThumb']
  shader: Project['homeShader']
  external: boolean
}) {
  return (
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
        <div className="flex w-full flex-col gap-3 min-[960px]:w-auto min-[960px]:flex-row min-[960px]:items-center">
          <span className={`home-cta ${ctaClassName} border-black`}>
            <span className="home-cta-label">
              {external ? 'Visit Site' : 'View Case Study'}
            </span>
          </span>
          {project.homeStatus ? (
            <span
              aria-disabled="true"
              className={`home-cta-disabled relative z-10 ${ctaClassName} pointer-events-auto cursor-default border-[var(--home-ink-body)]/30 text-[var(--home-ink-body)]/50`}
            >
              {project.homeStatus}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export function HomeProjectCard({ project }: { project: Project }) {
  const title = project.homeTitle ?? project.title
  const blurb = project.homeBlurb ?? project.desc
  const thumb = project.homeBandImage ?? project.homeThumb
  const shader = project.homeShader
  const href = project.homeHref ?? `/work/${project.id}`
  const external = isExternalHref(href)
  const body = (
    <CardBody
      project={project}
      title={title}
      blurb={blurb}
      thumb={thumb}
      shader={shader}
      external={external}
    />
  )

  if (project.homeStatus) {
    return (
      <div className={cardClassName}>
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="absolute inset-0 z-0 rounded-[20px]"
          aria-label={external ? `Visit ${title}` : `View case study: ${title}`}
        />
        <div className="pointer-events-none relative">{body}</div>
      </div>
    )
  }

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClassName}
      >
        {body}
      </a>
    )
  }

  return (
    <Link href={href} className={cardClassName}>
      {body}
    </Link>
  )
}
