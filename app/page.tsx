import type { Metadata } from 'next'

import { HomePage } from '@/components/home/HomePage'

export const metadata: Metadata = {
  description:
    'Product designer who started as a software engineer. I bring structure to complex data and AI workflows, and build what I design.',
}

export default function Page() {
  return <HomePage />
}
