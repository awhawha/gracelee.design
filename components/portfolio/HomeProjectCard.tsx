import Link from 'next/link'

import { HeroShader } from '@/components/portfolio/HeroShader'
import type { Project } from '@/lib/projects'

export function HomeProjectCard({ project }: { project: Project }) {
  const title = project.homeTitle ?? project.title
  const shader = project.homeShader
  const thumb = project.homeThumb

  return (
    <Link
      href={`/work/${project.id}`}
      data-cursor="case-study"
      className="group relative block self-start pb-6 outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="relative aspect-[2/1] w-full overflow-hidden transition-opacity duration-300 ease-out group-hover:opacity-60 group-focus-visible:opacity-60 motion-reduce:transition-none">
        {thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb.img}
            alt=""
            width={thumb.width}
            height={thumb.height}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ) : (
          <HeroShader colors={shader?.colors} fallback={shader?.fallback} />
        )}
      </div>
      <h2 className="type-header-md mb-0 mt-4 text-primary">{title}</h2>
      <p className="type-cap mt-2 uppercase text-tertiary">{project.client}</p>
    </Link>
  )
}
