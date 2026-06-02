import type { Metadata } from 'next'
import EnterpriseRedesignClient from '@/components/EnterpriseRedesignClient'

export const metadata: Metadata = {
  title: 'Enterprise AutoML Workflow Redesign',
}

export default function EnterpriseRedesignPage() {
  return <EnterpriseRedesignClient />
}
