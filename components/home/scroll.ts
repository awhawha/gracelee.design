export const HOME_SECTION_IDS = ['top', 'work', 'ai', 'beyond', 'contact'] as const

export type HomeSectionId = (typeof HOME_SECTION_IDS)[number]

const NAV_OFFSET = 48

let scrollLock: HomeSectionId | null = null

function sectionDocumentTop(id: HomeSectionId) {
  if (id === 'top') return 0
  const el = document.getElementById(id)
  if (!el) return 0
  return el.getBoundingClientRect().top + window.scrollY
}

/** True while a tab-click scroll is still in flight. Wheel and touch release it. */
export function scrollLockActive() {
  if (!scrollLock) return false
  const top = Math.max(0, sectionDocumentTop(scrollLock) - (scrollLock === 'top' ? 0 : NAV_OFFSET))
  const max = document.documentElement.scrollHeight - window.innerHeight
  const arrived =
    Math.abs(window.scrollY - top) < 3 || (top >= max - 2 && window.scrollY >= max - 2)
  if (arrived) scrollLock = null
  return scrollLock !== null
}

export function lockedSection() {
  return scrollLock
}

export function releaseScrollLock() {
  scrollLock = null
}

export function scrollToHomeSection(id: HomeSectionId) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const top =
    id === 'top' ? 0 : Math.max(0, sectionDocumentTop(id) - NAV_OFFSET)
  scrollLock = id
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
  const hash = `#${id}`
  if (window.location.hash !== hash) history.replaceState(null, '', hash)
}

/** Scrollspy: the section whose top has passed 35% of the viewport. */
export function activeHomeSection(): HomeSectionId {
  const marker = window.scrollY + window.innerHeight * 0.35
  let current: HomeSectionId = 'top'
  for (const id of HOME_SECTION_IDS) {
    const el = document.getElementById(id)
    if (!el) continue
    const top = el.getBoundingClientRect().top + window.scrollY
    if (top <= marker) current = id
  }
  const reachedEnd =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
  if (reachedEnd) return 'contact'
  return current
}
