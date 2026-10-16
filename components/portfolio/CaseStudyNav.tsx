'use client'

import { useEffect, useState, type MouseEvent } from 'react'

import { TransitionLink } from '@/components/portfolio/PageTransition'

export type CaseStudyNavTab = { id: string; label: string; color: string }

/**
 * Case-study version of the home EditorNav: same dark bar, window dots and tab
 * classes, but plain section labels and a back-to-home link. Active tab follows
 * scroll via IntersectionObserver; sections should carry `scroll-mt-12`.
 */
export function CaseStudyNav({ tabs }: { tabs: CaseStudyNavTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id)

  useEffect(() => {
    const els = tabs
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => el !== null)
    if (!els.length || typeof IntersectionObserver === 'undefined') return
    const visible = new Set<string>()
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target.id)
          else visible.delete(e.target.id)
        })
        const first = tabs.find((t) => visible.has(t.id))
        if (first) setActive(first.id)
      },
      // A band just under the 48px bar: whichever section crosses it is current.
      { rootMargin: '-56px 0px -55% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [tabs])

  const go = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById(id)
    if (!el) return
    event.preventDefault()
    setActive(id)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    history.replaceState(null, '', `#${id}`)
  }

  return (
    <nav
      aria-label="Case study sections"
      className="fixed inset-x-0 top-0 z-30 border-b border-white/[0.06] bg-brand-bar"
    >
      <div className="flex h-12 items-stretch px-4">
        <TransitionLink
          href="/"
          aria-label="Back to home"
          className="flex shrink-0 items-center gap-[7px] border-r border-white/[0.05] pr-[22px] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-brand-soft"
        >
          <span className="flex items-center gap-[7px]" aria-hidden>
            <span className="size-[11px] rounded-full bg-[#ff5f57]" />
            <span className="size-[11px] rounded-full bg-[#febc2e]" />
            <span className="size-[11px] rounded-full bg-[#28c840]" />
          </span>
          <span className="ml-2.5 font-space text-[13px] font-normal" aria-hidden>
            ←<span className="hidden min-[641px]:inline">
              {' '}
              gracelee<span className="text-brand-soft">.</span>design
            </span>
          </span>
        </TransitionLink>
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
