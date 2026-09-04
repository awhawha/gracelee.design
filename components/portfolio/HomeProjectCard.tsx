import Link from 'next/link'

import { HeroShader } from '@/components/portfolio/HeroShader'
import type { Project } from '@/lib/projects'

export function HomeProjectCard({ project }: { project: Project }) {
  const title = project.homeTitle ?? project.title
  const shader = project.homeShader

  return (
    <Link
      href={`/work/${project.id}`}
      data-cursor="case-study"
      className="group relative isolate block min-h-[min(52vh,560px)] overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white max-[640px]:min-h-[320px]"
    >
      <HeroShader
        colors={shader?.colors}
        fallback={shader?.fallback}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/55 via-black/10 to-transparent"
        aria-hidden
      />
      <h2 className="absolute bottom-8 left-8 z-[2] m-0 max-w-[16ch] font-sans text-[28px] font-semibold leading-[1.15] tracking-[-0.03em] text-white [text-shadow:0_1px_18px_rgba(0,0,0,0.35)] max-[640px]:bottom-6 max-[640px]:left-6 max-[640px]:text-[22px]">
        {title}
      </h2>
    </Link>
  )
}
