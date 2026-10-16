import type { Metadata } from 'next'
import { PivotCaseStudy } from '@/components/portfolio/PivotCaseStudy'
import { PIVOT_CASE_TITLE } from '@/lib/pivotCaseTitle'

export const metadata: Metadata = {
  title: PIVOT_CASE_TITLE,
  description:
    'A segment-level pivot analysis that lets analysts isolate weak segments, see which features drive errors, and rerun the experiment without leaving the product.',
}

export default function PivotCaseStudyPage() {
  return <PivotCaseStudy />
}
