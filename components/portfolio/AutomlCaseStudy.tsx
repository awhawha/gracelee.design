'use client'

import { ProtectedCaseStudy } from '@/components/portfolio/ProtectedCaseStudy'

/**
 * /work/automl: password-gated AutoML case study (encrypted; plaintext in private/automl/).
 * Layout primitives are re-exported here so other case studies' imports keep working.
 */
export * from '@/components/portfolio/caseStudyKit'

export function AutomlCaseStudy() {
  return <ProtectedCaseStudy slug="automl" exportName="AutomlCaseStudy" />
}
