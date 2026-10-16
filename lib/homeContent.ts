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
  metrics: { value: string; label: string }[]
  quote: { text: string; source: string } | null
  tags: string[]
  image: { img: string; width: number; height: number; alt: string } | null
}

/** Homepage-only featured copy. Case-study pages keep their own title and tags. */
const featuredCopy = {
  title:
    'I stopped designing around the ML pipeline and started designing around how analysts think.',
  summary:
    'As lead designer on dotData’s AutoML, I rebuilt its setup around the one thing every step was configuring: the training table. My biggest contribution was defining the interaction model, a single canvas where analysts see every table relationship and catch errors before they run. Analysts could now configure prediction tasks on their own instead of waiting days for expert help.',
  role: null,
  metrics: [
    { value: '20+ → 5', label: 'setup actions' },
    { value: 'Days → minutes', label: 'to configure a task' },
  ],
  quote: { text: 'I don\'t know what\'s my next step.', source: 'Customer support ticket, before the redesign' },
  tags: ['Research-Led Design', 'Systems Thinking', 'AI/ML UX', 'Interaction Design'],
}

/** Featured homepage project: AutoML media and role from the project record. */
export function getFeaturedWork(): FeaturedWork | null {
  const project = getProject('automl')
  if (!project) return null
  const image = project.homeBandImage ?? project.homeThumb

  return {
    href: caseStudyHref(project.id),
    eyebrow: project.client,
    title: featuredCopy.title,
    summary: featuredCopy.summary,
    role: featuredCopy.role,
    metrics: featuredCopy.metrics,
    quote: featuredCopy.quote,
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
