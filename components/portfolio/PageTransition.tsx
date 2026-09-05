'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from 'react'

const IN_DURATION_MS = 800
const IN_STAGGER_MS = 160
const OUT_MS = 240
const MAX_STEPS = 8

type TransitionApi = {
  go: (href: string) => void
  exiting: boolean
  entering: boolean
  pageRef: RefObject<HTMLDivElement>
}

const TransitionCtx = createContext<TransitionApi | null>(null)

function hrefToString(href: ComponentProps<typeof Link>['href']): string {
  if (typeof href === 'string') return href
  return `${href.pathname ?? ''}${href.search ?? ''}${href.hash ?? ''}`
}

function isSamePath(href: string): boolean {
  const url = new URL(href, window.location.href)
  return (
    url.pathname === window.location.pathname &&
    url.search === window.location.search
  )
}

function staggerWait(count: number, duration: number, step: number) {
  const steps = Math.min(Math.max(count, 1), MAX_STEPS)
  return duration + (steps - 1) * step
}

function collectStaggerItems(root: HTMLElement): HTMLElement[] {
  const items: HTMLElement[] = []
  const add = (el: HTMLElement) => {
    if (!items.includes(el)) items.push(el)
  }

  const marked = root.querySelectorAll<HTMLElement>(
    '[data-stagger], [data-stagger-group]',
  )
  if (marked.length) {
    marked.forEach((el) => {
      if (el.hasAttribute('data-stagger-group')) {
        Array.from(el.children).forEach((child) => {
          if (child instanceof HTMLElement) add(child)
        })
      } else {
        add(el)
      }
    })
    return items
  }

  const page = root.firstElementChild
  if (!(page instanceof HTMLElement)) return items
  for (const child of Array.from(page.children)) {
    if (!(child instanceof HTMLElement)) continue
    const kids = Array.from(child.children).filter(
      (node): node is HTMLElement => node instanceof HTMLElement,
    )
    if (kids.length >= 2) items.push(...kids)
    else items.push(child)
  }
  return items
}

function markStaggerItems(root: HTMLElement) {
  const items = collectStaggerItems(root)
  const last = Math.min(Math.max(items.length, 1), MAX_STEPS) - 1

  items.forEach((el, index) => {
    el.style.setProperty('--pf-i', String(Math.min(index, MAX_STEPS - 1)))
    el.classList.add('pf-stagger-item')
  })

  return { items, count: last + 1 }
}

function unmarkStaggerItems(items: HTMLElement[]) {
  items.forEach((el) => {
    el.classList.remove('pf-stagger-item')
    el.style.removeProperty('--pf-i')
  })
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const pageRef = useRef<HTMLDivElement>(null)
  const [exiting, setExiting] = useState(false)
  const [entering, setEntering] = useState(pathname === '/')
  const [renderPath, setRenderPath] = useState(pathname)
  const pendingHref = useRef<string | null>(null)
  const staggerCount = useRef(1)

  if (pathname !== renderPath) {
    setRenderPath(pathname)
    setExiting(false)
    pendingHref.current = null
    setEntering(true)
  }

  useLayoutEffect(() => {
    const root = pageRef.current
    if (!root || !entering) return
    const { items, count } = markStaggerItems(root)
    staggerCount.current = count
    return () => unmarkStaggerItems(items)
  }, [entering, pathname])

  useEffect(() => {
    if (!entering) return
    const t = window.setTimeout(
      () => setEntering(false),
      staggerWait(staggerCount.current, IN_DURATION_MS, IN_STAGGER_MS) + 40,
    )
    return () => window.clearTimeout(t)
  }, [entering])

  useEffect(() => {
    if (!exiting || !pendingHref.current) return
    const href = pendingHref.current
    const t = window.setTimeout(() => {
      router.push(href)
    }, OUT_MS)
    return () => window.clearTimeout(t)
  }, [exiting, router])

  const go = useCallback(
    (href: string) => {
      if (exiting) return
      if (isSamePath(href)) {
        router.push(href)
        return
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        router.push(href)
        return
      }
      pendingHref.current = href
      setExiting(true)
    },
    [exiting, router],
  )

  return (
    <TransitionCtx.Provider value={{ go, exiting, entering, pageRef }}>
      {children}
    </TransitionCtx.Provider>
  )
}

export function PageTransition({ children }: { children: ReactNode }) {
  const ctx = useContext(TransitionCtx)

  return (
    <div
      ref={ctx ? ctx.pageRef : undefined}
      className={`pf-page${ctx?.exiting ? ' is-exiting' : ''}${ctx?.entering ? ' is-entering' : ''}`}
    >
      {children}
    </div>
  )
}

export function TransitionLink({
  href,
  onClick,
  children,
  ...props
}: ComponentProps<typeof Link>) {
  const ctx = useContext(TransitionCtx)

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented || !ctx) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (event.button !== 0) return
    const dest = hrefToString(href)
    if (isSamePath(dest)) return
    event.preventDefault()
    ctx.go(dest)
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}
