'use client'

import { usePathname } from 'next/navigation'
import { GraceLlmToggle, useGraceLlmUi } from '@/components/grace-llm/GraceLLM'
import { Icon, SparkleIcon } from '@/components/Icon'
import { TransitionLink } from '@/components/portfolio/PageTransition'
import { GRACE_LLM_ENABLED } from '@/lib/visibility'

const navItems = [
  { href: '/', label: 'Home', id: 'home' as const },
  { href: '/about', label: 'About', id: 'about' as const },
  {
    href: '/images/yahui-grace-lee-resume.pdf',
    label: 'Resume',
    id: 'resume' as const,
    external: true,
  },
]

function isActive(id: (typeof navItems)[number]['id'], pathname: string) {
  if (id === 'home') return pathname === '/'
  if (id === 'about') return pathname === '/about'
  return false
}

export function SiteNav() {
  const pathname = usePathname() || '/'
  const isHome = pathname === '/'
  const { state } = useGraceLlmUi()

  return (
    <header
      className={`z-20 flex w-full items-center justify-between px-[clamp(1.5rem,3.8vw,66px)] py-6 max-[640px]:px-6 max-[640px]:py-5 ${
        isHome ? 'absolute inset-x-0 top-0' : 'relative'
      }`}
    >
      <TransitionLink
        href="/"
        className="font-sans text-[20px] font-semibold tracking-[0.01em] text-[#1b2406] max-[640px]:text-[18px]"
      >
        Grace Lee
      </TransitionLink>
      <div className="flex items-center gap-2">
        <nav
          aria-label="Primary"
          className={`flex items-center rounded-full px-1.5 py-1.5 ${
            isHome ? 'bg-white/10' : 'bg-[var(--home-cream)]'
          }`}
        >
          {navItems.map((item) => {
            const active = isActive(item.id, pathname)
            const linkClass = `rounded-full px-4 py-2 font-sans text-[18px] tracking-[0.005em] max-[640px]:px-3 max-[640px]:text-[15px] ${
              active
                ? 'border border-white bg-white/30 text-black'
                : 'text-[#626262]'
            }`
            if (item.external) {
              return (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {item.label}
                </a>
              )
            }
            return (
              <TransitionLink key={item.id} href={item.href} className={linkClass}>
                {item.label}
              </TransitionLink>
            )
          })}
        </nav>
        {GRACE_LLM_ENABLED ? (
          <GraceLlmToggle className="inline-flex items-center gap-2 rounded-full bg-[var(--home-ink)] px-4 py-3 font-sans text-[clamp(14px,1.2vw,16px)] text-white/80 hover:text-white max-[640px]:px-3 max-[640px]:py-2.5">
            <SparkleIcon />
            Ask Grace
            {state === 'open' ? (
              <Icon name="fa-xmark" className="text-[12px] opacity-70" />
            ) : null}
          </GraceLlmToggle>
        ) : null}
      </div>
    </header>
  )
}
