import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CaseStudyGallery } from '@/components/portfolio/CaseStudyGallery'
import { CaseStudyShell } from '@/components/portfolio/CaseStudyShell'
import { ChapteredCaseStudy } from '@/components/portfolio/ChapteredCaseStudy'
import { ScrollytellingCaseStudy } from '@/components/portfolio/ScrollytellingCaseStudy'
import { caseStudyContent } from '@/lib/caseStudyContent'
import type { Project } from '@/lib/projects'
import { getAllSlugs, getNextProject, getProject } from '@/lib/projects'

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

  // AutoML and Design System use the bespoke, chaptered case-study layout.
  const chaptered = caseStudyContent[params.slug]
  if (chaptered) return <ChapteredCaseStudy content={chaptered} />

  const next = getNextProject(project.id)

  if (project.sections) {
    /* Scrollytelling: pinned media swaps to match the section being read */
    return (
      <div className="font-grotesk text-pf-ink">
        <div className="mx-auto max-w-pf px-10 pt-12 max-[640px]:px-6">
          <Link
            href="/"
            className="text-[14px] text-pf-muted transition-colors hover:text-pf-ink"
          >
            ← All projects
          </Link>
        </div>
        <ScrollytellingCaseStudy project={project} />
        <NextProject next={next} />
      </div>
    )
  }

  return (
    <div className="font-grotesk text-pf-ink">
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
        <h1 className="mb-6 text-[50px] font-semibold leading-[1.05] tracking-[-0.03em] max-[900px]:text-[clamp(34px,7vw,50px)]">
          {project.headline ?? project.title}
        </h1>
        <div className="mb-9 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-pf-tag px-[13px] py-[6px] text-[13px] text-pf-secondary"
            >
              {t}
            </span>
          ))}
        </div>
        {project.paras.map((p, i) => (
          <p
            key={i}
            className="mb-[22px] max-w-[820px] text-[17px] leading-[1.72] text-pf-body"
          >
            {typeof p === 'string' ? (
              p
            ) : (
              <>
                <span className="text-pf-ink">{p.lead}:</span> {p.text}
              </>
            )}
          </p>
        ))}
        <div className="my-[18px] mb-12 grid grid-cols-3 gap-8 border-y border-pf-hairline py-8 max-[640px]:grid-cols-1 max-[640px]:gap-5">
          {project.metrics.map((mt) => (
            <div key={mt.label}>
              <div className="text-[36px] font-semibold leading-none tracking-[-0.02em] text-pf-accent">
                {mt.value}
              </div>
              <div className="mt-[10px] text-[13px] text-pf-muted">
                {mt.label}
              </div>
            </div>
          ))}
        </div>

        {/* Media reads full width of the column; images open in a lightbox */}
        <CaseStudyGallery media={project.media} />

        <section className="mt-14 border-t border-pf-hairline pb-20 pt-12">
          <h3 className="mb-[14px] text-[20px] font-semibold tracking-[-0.01em]">
            My involvement
          </h3>
          <p className="max-w-[820px] text-[17px] leading-[1.72] text-pf-body">
            {project.involvement}
          </p>
        </section>
      </CaseStudyShell>

      <NextProject next={next} />
    </div>
  )
}

/** Light band between the case study and the dark site footer. */
function NextProject({ next }: { next: Project }) {
  return (
    <Link
      href={`/work/${next.id}`}
      className="group block border-t border-pf-hairline transition-colors hover:bg-pf-chip"
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-10 py-12 max-[640px]:px-6">
        <span className="text-[14px] text-pf-muted">Next — {next.client}</span>
        <span className="text-right text-[32px] font-medium tracking-[-0.02em] text-pf-ink transition-colors group-hover:text-pf-accent max-[640px]:text-[24px]">
          {next.homeTitle ?? next.title} →
        </span>
      </div>
    </Link>
  )
}
