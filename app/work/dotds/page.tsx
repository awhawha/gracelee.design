import type { Metadata } from 'next'
import { DsCaseStudy } from '@/components/portfolio/DsCaseStudy'
import { DS_CASE_TITLE } from '@/lib/dsCaseTitle'

export const metadata: Metadata = {
  title: DS_CASE_TITLE,
  description:
    'A three-layer token system in Figma, matched to engineering’s CSS variables, that cut design-spec and audit tickets by two-thirds.',
}

export default function DsCaseStudyPage() {
  return <DsCaseStudy />
}
