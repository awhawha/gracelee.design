/**
 * Route → GraceLLM context map.
 *
 * Keep `projectId` in sync with `data/portfolioContext.ts`. When a live
 * case-study slug does not have its own KB entry (e.g. Kahuna's two pages
 * share `kahuna`), point both paths at the shared id.
 */

import { getPortfolioProject, type ContextType } from '@/data/portfolioContext'

export type PageContextMapping = {
  type: ContextType
  projectId?: string
  /** Override when the URL slug should not use the KB title. */
  title?: string
}

export const PAGE_CONTEXT_MAP: Record<string, PageContextMapping> = {
  '/': { type: 'portfolio' },
  '/about': { type: 'profile' },
  '/experiments': { type: 'portfolio' },
  '/work/automl': { type: 'project', projectId: 'automl' },
  '/work/dotds': { type: 'project', projectId: 'dotds' },
  '/work/campaign': { type: 'project', projectId: 'kahuna' },
  '/work/filters': { type: 'project', projectId: 'kahuna' },
  '/work/pivot': { type: 'project', projectId: 'pivot', title: 'In-product pivot analysis' },
  '/work/museum': { type: 'project', projectId: 'museum', title: 'Designing with AI Agents' },
  '/enterprise-redesign': { type: 'project', projectId: 'automl' },
  '/design-system': { type: 'project', projectId: 'dotds' },
}

export type ResolvedPageContext = {
  type: ContextType
  currentPage: string
  projectId?: string
  projectTitle?: string
  hasKnowledgeBase: boolean
  /** Header line, e.g. "Ask Grace about her work". */
  askAboutLabel: string
  /** Short label for the context-updated notice. */
  contextLabel: string
}

function normalizePath(pathname: string): string {
  if (!pathname) return '/'
  if (pathname === '/') return '/'
  return pathname.replace(/\/+$/, '') || '/'
}

export function resolvePageContext(pathname: string): ResolvedPageContext {
  const currentPage = normalizePath(pathname)
  const mapped = PAGE_CONTEXT_MAP[currentPage]

  const workMatch = currentPage.match(/^\/work\/([^/]+)$/)
  const slug = workMatch?.[1]
  const type: ContextType = mapped?.type ?? (slug ? 'project' : 'portfolio')
  const projectId = mapped?.projectId ?? (type === 'project' ? slug : undefined)

  const kbProject = projectId ? getPortfolioProject(projectId) : undefined
  const projectTitle = kbProject?.title ?? mapped?.title ?? undefined
  const hasKnowledgeBase = type === 'project' ? Boolean(kbProject) : true

  if (type === 'project') {
    return {
      type,
      currentPage,
      projectId,
      projectTitle,
      hasKnowledgeBase,
      askAboutLabel: projectTitle
        ? `Ask Grace about: ${projectTitle}`
        : 'Ask Grace about this project',
      contextLabel: projectTitle ?? 'Project page',
    }
  }

  if (type === 'profile') {
    return {
      type,
      currentPage,
      hasKnowledgeBase: true,
      askAboutLabel: 'Ask Grace about her background',
      contextLabel: 'Background & experience',
    }
  }

  return {
    type: 'portfolio',
    currentPage,
    hasKnowledgeBase: true,
    askAboutLabel: 'Ask Grace about her work',
    contextLabel: 'Portfolio overview',
  }
}

export function getWelcomeMessage(ctx: ResolvedPageContext): string {
  if (ctx.type === 'project' && ctx.hasKnowledgeBase && ctx.projectTitle) {
    return `Hi — I’m GraceLLM. This chat is focused on ${ctx.projectTitle}. Ask about the problem, Grace’s role, the process, or the outcome.`
  }
  if (ctx.type === 'project' && ctx.projectTitle) {
    return `Hi — I’m GraceLLM. ${ctx.projectTitle} isn’t fully indexed yet. I can still answer from Grace’s documented work — AutoML, the design system, Kahuna, or her background.`
  }
  if (ctx.type === 'profile') {
    return 'Hi — I’m GraceLLM. Ask about Grace’s career path, how she works with product and engineering, or what she’s strongest at.'
  }
  return 'Hi — I’m GraceLLM. Ask which project to read first, or how she works with engineering.'
}

export function getQuickPrompts(ctx: ResolvedPageContext): string[] {
  if (ctx.type === 'project' && ctx.hasKnowledgeBase) {
    if (ctx.projectId === 'dotds') {
      return [
        'Why did the design system need a redesign?',
        "What was Grace's role?",
        'How did design and engineering stay aligned?',
        'What changed after launch?',
      ]
    }
    if (ctx.projectId === 'kahuna') {
      return [
        'What problem were marketers facing?',
        'How did research shape the solution?',
        'How did she make complex targeting usable?',
        'What was the outcome?',
      ]
    }
    if (ctx.projectId === 'wislite') {
      return [
        'What did Grace do at Wislite?',
        'How does this engineering background show up now?',
        'What kinds of products did she build?',
        'Which later projects should I read next?',
      ]
    }
    return [
      'What problem did this project solve?',
      "What was Grace's role?",
      'How did she approach the process?',
      'What was the impact?',
    ]
  }

  if (ctx.type === 'project') {
    return [
      "What's Grace's background?",
      'Which documented projects should I read?',
      'How does she work with engineering?',
      'What roles is she a strong fit for?',
    ]
  }

  if (ctx.type === 'profile') {
    return [
      'Walk me through her career path.',
      'Which projects should I look at first?',
      'How does she work with engineering?',
      'What roles is she a strong fit for?',
    ]
  }

  return [
    'Which projects should I look at first?',
    'Tell me about the AutoML workflow redesign',
    'How does she work with engineering?',
    'What roles is she a strong fit for?',
  ]
}
