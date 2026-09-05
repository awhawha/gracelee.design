'use client'

import { usePathname } from 'next/navigation'
import { GraceLlmToggle, useGraceLlmUi } from '@/components/grace-llm/GraceLLM'
import { Icon, SparkleIcon } from '@/components/Icon'
import { TransitionLink } from '@/components/portfolio/PageTransition'

const glassPill =
  'pf-liquid-glass inline-flex items-center rounded-full font-sans text-[14px] font-medium tracking-[0.01em] max-[640px]:text-[13px]'

const navChip =
  'pf-nav-item rounded-full px-3 py-1.5 max-[640px]:px-2.5 max-[640px]:py-1'

const navItems = [
  { href: '/', label: 'Home', id: 'home' as const },
  { href: '/#work', label: 'Projects', id: 'project' as const },
  { href: '/about', label: 'About', id: 'about' as const },
  {
    href: '/images/yahui-grace-lee-resume.pdf',
    label: 'Resume',
    id: 'resume' as const,
    external: true,
  },
]

function isActive(
  id: (typeof navItems)[number]['id'],
  pathname: string,
) {
  if (id === 'home') return pathname === '/'
  if (id === 'project') return pathname.startsWith('/work')
  if (id === 'about') return pathname === '/about'
  return false
}

function SiteDock() {
  const pathname = usePathname() || '/'
  const { state } = useGraceLlmUi()
  const sidebarInset = state !== 'closed'

  return (
    <div
      className={`pointer-events-none fixed bottom-16 left-1/2 z-50 flex w-max max-w-[calc(100%-24px)] -translate-x-1/2 items-center gap-2.5 max-[640px]:bottom-12 motion-safe:transition-[left] motion-safe:duration-[420ms] motion-safe:ease-out ${
        sidebarInset ? 'md:left-[calc((100vw-340px)/2)]' : ''
      }`}
    >
      <nav
        aria-label="Primary"
        className={`${glassPill} pointer-events-auto gap-4 px-5 py-3 max-[640px]:px-3.5 max-[640px]:py-2.5`}
      >
        {navItems.map((item) => {
          const active = isActive(item.id, pathname)
          const linkClass = `${navChip}${active ? ' is-active text-white' : ''}`
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
      <GraceLlmToggle
        className={`${glassPill} pointer-events-auto gap-2 px-4 py-3 text-white/70 hover:text-white max-[640px]:gap-1.5 max-[640px]:px-3 max-[640px]:py-2.5`}
      >
        <SparkleIcon />
        Ask Grace
        {state === 'open' ? (
          <Icon name="fa-xmark" className="text-[12px] opacity-70" />
        ) : null}
      </GraceLlmToggle>
    </div>
  )
}

export function SiteNav() {
  return (
    <>
      <div className="relative z-20 flex w-full items-center px-10 py-6 max-[640px]:px-6 max-[640px]:py-5">
        <TransitionLink
          href="/"
          className="font-sans text-[19px] font-semibold tracking-[-0.01em] text-primary"
        >
          Grace Lee
        </TransitionLink>
      </div>
      <SiteDock />
    </>
  )
}
