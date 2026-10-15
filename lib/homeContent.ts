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

/** Homepage-only featured copy. Case-study pages keep their own title and tags. */
const featuredCopy = {
  title:
    'I turned a data-scientist-only setup into 5 guided steps business analysts run themselves.',
  summary:
    "dotData's AutoML setup took 20+ configuration actions and a data scientist on call. I redesigned it into 5 guided steps so analysts can create and iterate on prediction tasks themselves.",
  tags: ['Workflow Redesign', 'Complex Systems UX', 'Enterprise AI', 'Prototyping'],
}

/** Featured homepage project: AutoML media and role from the project record. */
export function getFeaturedWork(): FeaturedWork | null {
  const project = getProject('automl')
  if (!project) return null
  const study = caseStudyContent.automl
  const image = project.homeBandImage ?? project.homeThumb

  return {
    href: caseStudyHref(project.id),
    eyebrow: project.client,
    title: featuredCopy.title,
    summary: featuredCopy.summary,
    role: study.meta?.find((item) => item.label === 'Role')?.value ?? null,
    metric: project.metrics[0] ?? null,
    tags: featuredCopy.tags,
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
