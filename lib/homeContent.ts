import { getProject } from '@/lib/projects'
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
