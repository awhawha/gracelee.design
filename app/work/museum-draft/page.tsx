import type { Metadata } from 'next'
import { MuseumDraftStudy } from '@/components/portfolio/MuseumDraftStudy'

export const metadata: Metadata = {
  title: 'In a Nutshell Books case study draft',
  description:
    'Draft case study for a human-in-the-loop curation system for a digital picture-book museum.',
  robots: { index: false, follow: false },
}

export default function MuseumDraftPage() {
  return <MuseumDraftStudy />
}
