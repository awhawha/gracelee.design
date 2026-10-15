import { AiSection } from '@/components/home/AiSection'
import { BeyondSection } from '@/components/home/BeyondSection'
import { ContactSection } from '@/components/home/ContactSection'
import { EditorNav } from '@/components/home/EditorNav'
import { TerminalHero } from '@/components/home/TerminalHero'
import { WorkSection } from '@/components/home/WorkSection'

export function HomePage() {
  return (
    <div
      data-page-motion="none"
      className="home-terminal overflow-x-hidden bg-brand-bg font-inter text-brand-ink"
    >
      <EditorNav />
      <TerminalHero />
      <WorkSection />
      <AiSection />
      <BeyondSection />
      <ContactSection />
    </div>
  )
}
