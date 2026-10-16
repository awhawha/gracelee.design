import type { Metadata } from 'next'
import { AutomlCaseStudy } from '@/components/portfolio/AutomlCaseStudy'
import { AUTOML_CASE_TITLE } from '@/lib/automlCaseTitle'

export const metadata: Metadata = {
  title: AUTOML_CASE_TITLE,
  description: 'Password-protected case study: redesigning AutoML setup at dotData.',
}

export default function AutomlCaseStudyPage() {
  return <AutomlCaseStudy />
}
