'use client'

import { useEffect, useState, type MouseEvent } from 'react'

import {
  activeHomeSection,
  lockedSection,
  releaseScrollLock,
  scrollLockActive,
  scrollToHomeSection,
  type HomeSectionId,
} from '@/components/home/scroll'

const tabs: { id: HomeSectionId; label: string; color: string }[] = [
  { id: 'top', label: 'whoami.sh', color: '#a8d8a0' },
  { id: 'work', label: 'work/', color: '#e6c07b' },
  { id: 'ai', label: 'ai-workflow.md', color: '#E59BD3' },
  { id: 'beyond', label: 'beyond.txt', color: '#B48CE0' },
  { id: 'contact', label: 'contact.json', color: '#7fc4e8' },
]

export function EditorNav() {
  const [active, setActive] = useState<HomeSectionId>('top')

  useEffect(() => {
    const sync = () => {
      if (scrollLockActive()) {
        const locked = lockedSection()
        if (locked) setActive(locked)
        return
      }
      setActive(activeHomeSection())
    }
    const onUserScroll = () => {
      releaseScrollLock()
      sync()
    }
    sync()
    window.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('wheel', onUserScroll, { passive: true })
    window.addEventListener('touchmove', onUserScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', sync)
      window.removeEventListener('wheel', onUserScroll)
      window.removeEventListener('touchmove', onUserScroll)
    }
  }, [])

  const go = (id: HomeSectionId) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setActive(id)
    scrollToHomeSection(id)
  }

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 top-0 z-30 border-b border-white/[0.06] bg-brand-bar"
    >
      <div className="flex h-12 items-stretch px-4">
        <a
          href="#top"
          onClick={go('top')}
          className="flex shrink-0 items-center gap-[7px] pr-[22px] text-white"
        >
          <span className="flex items-center gap-[7px]" aria-hidden>
            <span className="size-[11px] rounded-full bg-[#ff5f57]" />
            <span className="size-[11px] rounded-full bg-[#febc2e]" />
            <span className="size-[11px] rounded-full bg-[#28c840]" />
          </span>
          <span className="ml-2.5 hidden font-space text-[13px] font-normal min-[641px]:inline">
            grace<span className="text-brand-soft">.</span>dev
          </span>
        </a>
        <div className="flex min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => {
            const on = active === tab.id
            return (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                onClick={go(tab.id)}
                aria-current={on ? 'true' : undefined}
                className={`flex shrink-0 items-center gap-2 whitespace-nowrap border-r border-t-2 border-r-white/[0.05] px-3 font-space text-[11.5px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-brand-soft min-[641px]:px-[18px] min-[641px]:text-[12.5px] ${
                  on
                    ? 'border-t-brand-accent bg-brand-dark text-white'
                    : 'border-t-transparent text-[#8c6f84] hover:bg-white/[0.04] hover:text-[#e8d8e3]'
                }`}
              >
                <span
                  className="inline-block size-2 shrink-0 rounded-[2px]"
                  style={{ backgroundColor: tab.color }}
                  aria-hidden
                />
                {tab.label}
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
