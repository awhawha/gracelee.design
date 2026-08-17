import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CaseStudyGallery } from '@/components/portfolio/CaseStudyGallery'
import { ChapteredCaseStudy } from '@/components/portfolio/ChapteredCaseStudy'
import { ScrollytellingCaseStudy } from '@/components/portfolio/ScrollytellingCaseStudy'
import { caseStudyContent } from '@/lib/caseStudyContent'
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

  return (
    <div className="font-grotesk text-pf-ink">
      {/* Back link */}
      <div className="mx-auto max-w-pf px-10 pt-12 max-[640px]:px-6">
        <Link
          href="/"
          className="text-[14px] text-pf-muted transition-colors hover:text-pf-ink"
        >
          ← All projects
        </Link>
      </div>

      {project.sections ? (
        /* Scrollytelling: pinned media swaps to match the section being read */
        <ScrollytellingCaseStudy project={project} />
      ) : (
        /* Two-column grid: scrolling media (left) + pinned narrative (right) */
        <div className="mx-auto grid max-w-pf grid-cols-2 items-start gap-16 px-10 pt-10 max-[900px]:grid-cols-1 max-[900px]:gap-10 max-[640px]:px-6">
          {/* LEFT — media gallery (scrolls; images open in a lightbox) */}
          <CaseStudyGallery media={project.media} />

          {/* RIGHT — narrative (pinned) */}
          <div className="sticky top-[104px] self-start pb-20 max-[900px]:static max-[900px]:order-1 max-[900px]:pb-0">
          <div className="mb-4 font-mono-ui text-[12px] tracking-[0.04em] text-pf-muted">
            {project.client}
          </div>
          <h1 className="mb-6 text-[46px] font-semibold leading-[1.02] tracking-[-0.03em] max-[900px]:text-[clamp(32px,7vw,46px)]">
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
              className="mb-[22px] text-[17px] leading-[1.72] text-pf-body"
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
          <div className="my-[18px] mb-10 grid grid-cols-3 gap-6 border-y border-pf-hairline py-7">
            {project.metrics.map((mt) => (
              <div key={mt.label}>
                <div className="text-[34px] font-semibold tracking-[-0.02em] text-pf-accent">
                  {mt.value}
                </div>
                <div className="mt-1 text-[13px] text-pf-muted">{mt.label}</div>
              </div>
            ))}
          </div>
          <h3 className="mb-[14px] text-[20px] font-semibold tracking-[-0.01em]">
            My involvement
          </h3>
          <p className="mb-10 text-[17px] leading-[1.72] text-pf-body">
            {project.involvement}
          </p>
          <div className="mb-4 font-mono-ui text-[12px] tracking-[0.04em] text-pf-muted">
            Live version
          </div>
          <a
            href={project.liveUrl ?? 'https://gracelee.design'}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-[10px] border-[1.5px] border-pf-ink p-4 text-center text-[15px] font-medium text-pf-ink transition-colors hover:bg-pf-ink hover:text-white"
          >
            Visit live case study ↗
          </a>
          </div>
        </div>
      )}

      {/* Next project — light band, so the dark footer stays the only CTA */}
      <Link
        href={`/work/${next.id}`}
        className="group mt-10 block border-t border-pf-hairline transition-colors hover:bg-pf-chip"
      >
        <div className="mx-auto flex max-w-pf items-center justify-between gap-6 px-10 py-12 max-[640px]:px-6">
          <span className="text-[14px] text-pf-muted">Next — {next.client}</span>
          <span className="text-right text-[32px] font-medium tracking-[-0.02em] text-pf-ink transition-colors group-hover:text-pf-accent max-[640px]:text-[24px]">
            {next.homeTitle ?? next.title} →
          </span>
        </div>
      </Link>
    </div>
  )
}
