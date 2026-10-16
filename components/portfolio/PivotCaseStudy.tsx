'use client'

import { ProtectedCaseStudy } from '@/components/portfolio/ProtectedCaseStudy'

/** /work/pivot: password-gated Prediction Error Analysis case study (encrypted; plaintext in private/error-analysis/). */
export function PivotCaseStudy() {
  return <ProtectedCaseStudy slug="error-analysis" exportName="PivotCaseStudy" />
}
