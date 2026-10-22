import type { Metadata } from 'next'
import { MuseumCaseStudy } from '@/components/portfolio/MuseumCaseStudy'
import { MUSEUM_CASE_TITLE } from '@/lib/museumCaseTitle'

export const metadata: Metadata = {
  title: MUSEUM_CASE_TITLE,
  description:
    'A Traditional Chinese picture-book museum built solo, with an AI research workflow that cut production time from 7–11 hours to about 2–3 hours per book.',
}

export default function MuseumCaseStudyPage() {
  return <MuseumCaseStudy />
}
