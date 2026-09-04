import { portfolioKb } from '@/data/portfolioContext'

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function isInternalHref(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//')
}

/**
 * Wrap documented project titles in markdown links using the first case-study
 * href. Skips titles that are already linked. Wislite has no case study, so it
 * is left as plain text.
 */
export function linkifyProjectTitles(text: string): string {
  const named = portfolioKb.projects
    .filter((project) => {
      const href = project.links[0]?.href
      return Boolean(href && isInternalHref(href))
    })
    .sort((a, b) => b.title.length - a.title.length)

  let next = text
  for (const project of named) {
    const href = project.links[0].href
    const pattern = new RegExp(`(?<!\\[)${escapeRegExp(project.title)}(?!\\]\\()`, 'g')
    next = next.replace(pattern, `[${project.title}](${href})`)
  }
  return next
}
