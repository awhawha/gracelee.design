import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Icon } from '@/components/Icon'
import { CaseStudyGallery } from '@/components/portfolio/CaseStudyGallery'
import { CaseStudyShell } from '@/components/portfolio/CaseStudyShell'
import { ChapteredCaseStudy } from '@/components/portfolio/ChapteredCaseStudy'
import { ScrollytellingCaseStudy } from '@/components/portfolio/ScrollytellingCaseStudy'
import { caseStudyContent } from '@/lib/caseStudyContent'
import type { Project } from '@/lib/projects'
import { getAllSlugs, getNextProject, getPreviousProject, getProject } from '@/lib/projects'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Metadata {
  const project = getProject(params.slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.desc,
  }
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string }
}) {
  const project = getProject(params.slug)
  if (!project) notFound()

  // Chaptered case studies (AutoML, Design System, Museum, Campaign, Filters, …).
  const chaptered = caseStudyContent[params.slug]
  if (chaptered) return <ChapteredCaseStudy content={chaptered} />

  const next = getNextProject(project.id)
  const prev = getPreviousProject(project.id)

  if (project.sections) {
    /* Scrollytelling: pinned media swaps to match the section being read */
    return (
      <div className="font-sans text-primary">
        <div className="mx-auto max-w-pf px-10 pt-12 max-[640px]:px-6">
          <Link
            href="/"
            className="type-cap inline-flex items-center gap-1.5 text-tertiary transition-colors hover:text-primary"
          >
            <Icon name="fa-arrow-left" />
            All projects
          </Link>
        </div>
        <ScrollytellingCaseStudy project={project} />
        <AdjacentProjects prev={prev} next={next} />
      </div>
    )
  }

  return (
    <div className="font-sans text-primary">
      {/* Same frame as the chaptered case studies: sticky metadata rail (left)
          + narrative and media in one reading column (right). */}
      <CaseStudyShell
        meta={project.meta}
        link={
          project.liveUrl
            ? { label: 'Visit live case study', href: project.liveUrl }
            : undefined
        }
      >
        {/* No client eyebrow here — the rail already carries company and context */}
        <h1 className="type-header mb-6">
          {project.headline ?? project.title}
        </h1>
        <div className="mb-9 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="type-cap rounded-full bg-surface-secondary px-[13px] py-[6px] text-secondary"
            >
              {t}
            </span>
          ))}
        </div>
        {project.paras.map((p, i) => (
          <p
            key={i}
            className="type-body mb-[22px] max-w-[820px] text-secondary"
          >
            {typeof p === 'string' ? (
              p
            ) : (
              <>
                <span className="text-primary">{p.lead}:</span> {p.text}
              </>
            )}
          </p>
        ))}
        <div className="my-[18px] mb-12 grid grid-cols-3 gap-8 border-y border-surface-tertiary py-8 max-[640px]:grid-cols-1 max-[640px]:gap-5">
          {project.metrics.map((mt) => (
            <div key={mt.label}>
              <div className="type-header-md text-accent-primary">
                {mt.value}
              </div>
              <div className="type-cap mt-[10px] text-tertiary">
                {mt.label}
              </div>
            </div>
          ))}
        </div>

        {/* Media reads full width of the column; images open in a lightbox */}
        <CaseStudyGallery media={project.media} />

        <section className="mt-14 border-t border-surface-tertiary pb-20 pt-12">
          <h3 className="type-header-sm mb-[14px]">
            My involvement
          </h3>
          <p className="type-body max-w-[820px] text-secondary">
            {project.involvement}
          </p>
        </section>
      </CaseStudyShell>

      <AdjacentProjects prev={prev} next={next} />
    </div>
  )
}

/** Light band between the case study and the dark site footer. */
function AdjacentProjects({
  prev,
  next,
}: {
  prev: Project
  next: Project
}) {
  return (
    <nav className="border-t border-surface-tertiary">
      <div className="mx-auto flex max-w-[1280px] items-start justify-between gap-8 px-10 py-12 max-[640px]:flex-col max-[640px]:gap-8 max-[640px]:px-6">
        <Link
          href={`/work/${prev.id}`}
          className="group min-w-0 max-w-[22rem] max-[640px]:max-w-none"
        >
          <span className="type-cap block text-tertiary">Previous project</span>
          <span className="type-header-md mt-2 inline-flex items-center gap-2 text-primary transition-colors group-hover:text-accent-primary">
            <Icon name="fa-arrow-left" />
            {prev.homeTitle ?? prev.title}
          </span>
        </Link>
        <Link
          href={`/work/${next.id}`}
          className="group min-w-0 max-w-[22rem] text-right max-[640px]:max-w-none max-[640px]:self-end"
        >
          <span className="type-cap block text-tertiary">Next project</span>
          <span className="type-header-md mt-2 inline-flex items-center justify-end gap-2 text-primary transition-colors group-hover:text-accent-primary">
            {next.homeTitle ?? next.title}
            <Icon name="fa-arrow-right" />
          </span>
        </Link>
      </div>
    </nav>
  )
}
