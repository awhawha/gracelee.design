import { caseStudyContent } from '@/lib/caseStudyContent'
import { getProject, type Project } from '@/lib/projects'
import { isProjectHidden } from '@/lib/visibility'

/**
 * Homepage case-study link. Hidden projects stay in the data (and at their
 * URLs) but drop off the public homepage until visibility flips them back on.
 * Returns null when there is no case study yet — Prediction Error Analysis.
 */
export function caseStudyHref(id: string): string | null {
  if (!getProject(id) || isProjectHidden(id)) return null
  return `/work/${id}`
}

export type FeaturedWork = {
  href: string | null
  eyebrow: string
  title: string
  summary: string
  role: string | null
  metric: Project['metrics'][number] | null
  tags: string[]
  image: { img: string; width: number; height: number; alt: string } | null
}

function firstParagraph(value: string | string[] | undefined): string | null {
  if (!value) return null
  return Array.isArray(value) ? value[0] ?? null : value
}

/** Featured homepage project: AutoML, from the case study and project record. */
export function getFeaturedWork(): FeaturedWork | null {
  const project = getProject('automl')
  if (!project) return null
  const study = caseStudyContent.automl
  const summary =
    firstParagraph(study.tldr) ?? project.homeBlurb ?? project.homeSubtitle ?? project.desc
  const image = project.homeBandImage ?? project.homeThumb

  return {
    href: caseStudyHref(project.id),
    eyebrow: project.client,
    title: study.title || project.homeTitle || project.headline || project.title,
    summary,
    role: study.meta?.find((item) => item.label === 'Role')?.value ?? null,
    metric: project.metrics[0] ?? null,
    tags: project.tags.length ? project.tags : study.tags,
    image: image
      ? {
          img: image.img,
          width: image.width,
          height: image.height,
          // The band image is decorative inside a link that already names the project.
          // The case-study hero alt describes a different file (hero-desk).
          alt: '',
        }
      : null,
  }
}
