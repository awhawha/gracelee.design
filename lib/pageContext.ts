/**
 * Route → GraceLLM context map.
 *
 * Keep `projectId` in sync with `data/portfolioContext.ts`. When a live
 * case-study slug does not have its own KB entry (e.g. Kahuna's two pages
 * share `kahuna`), point both paths at the shared id. Project-page prompt
 * pools are keyed by path in `PROJECT_PROMPT_POOLS`.
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
  '/work/campaign': { type: 'project', projectId: 'kahuna', title: 'Campaign performance dashboard' },
  '/work/filters': { type: 'project', projectId: 'kahuna', title: 'Audience filter editor' },
  '/work/pivot': { type: 'project', projectId: 'pivot', title: 'In-product pivot analysis' },
  '/work/museum': { type: 'project', projectId: 'museum', title: 'In a Nutshell Books' },
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
  const projectTitle = mapped?.title ?? kbProject?.title ?? undefined
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
    return `Hi — I’m GraceLLM. ${ctx.projectTitle} isn’t fully indexed yet. I can still answer from Grace’s documented work — AutoML, the design system, Kahuna, In a Nutshell Books, or her background.`
  }
  if (ctx.type === 'profile') {
    return 'Hi — I’m GraceLLM. Ask about Grace’s career path, how she works with product and engineering, or what she’s strongest at.'
  }
  return 'Hi — I’m GraceLLM. Ask which project to read first, or how she works with engineering.'
}

const AUTOML_PROMPTS = [
  'Tell me about the AutoML workflow redesign',
  'What problem were business analysts facing?',
  'Why did the old multi-page setup fail?',
  'How did the model-design canvas work?',
  "What was Grace's role on AutoML?",
  'How did she work with product and engineering?',
  'What was the outcome of the AutoML redesign?',
  'How did auto-schema and table connections help?',
  'How did the redesign help analysts run a first model?',
]

const DOTDS_PROMPTS = [
  'Tell me about the dotData design system',
  'Why did the design system need a redesign?',
  'What was wrong with the old handoff?',
  'How did the token-driven library work?',
  "What was Grace's role?",
  'How did design and engineering stay aligned?',
  'How did semantic tokens map to CSS variables?',
  'What changed after launch?',
  'What was the impact on spec questions?',
]

const CAMPAIGN_PROMPTS = [
  'Tell me about the campaign performance dashboard',
  'What problem were marketers facing?',
  'How did research with campaign managers shape the solution?',
  'Why move filters to a left rail?',
  'How did she make KPIs scannable?',
  "What was Grace's role?",
  'What was the outcome of the dashboard redesign?',
  'How did Attritions keep the trend chart readable?',
  'How could marketers tell if a campaign was working?',
]

const FILTERS_PROMPTS = [
  'Tell me about the audience filter editor',
  'Why was complex targeting hard for marketers?',
  'How did nested AND/OR become visual blocks?',
  'What did competitive analysis show?',
  'How could marketers build targeting without SQL?',
  "What was Grace's role?",
  'What was the outcome of the filter editor?',
  'How did collapsible blocks make logic readable?',
  'How did she work with engineering on the interactions?',
]

const MUSEUM_PROMPTS = [
  'Tell me about In a Nutshell Books',
  'Why was picture-book research hard to trust?',
  'How does the /new-book skill earn trust?',
  'What can the Curatorial Advisor do today?',
  'What would the next version of recommendations need?',
  'What did she validate, and what is still untested?',
  "What was Grace's role?",
  'Where does human review stay in the workflow?',
]

const PIVOT_PROMPTS = [
  'Tell me about in-product pivot analysis',
  'Why were analysts exporting to spreadsheets?',
  'How did the pivot manipulation model work?',
  'How did drag-to-group change exploration?',
  "What was Grace's role?",
  'What was the outcome?',
  'How did she get to a first insight quickly?',
  'Why keep exploration inside the product?',
]

const WISLITE_PROMPTS = [
  'What did Grace do at Wislite?',
  'How does this engineering background show up now?',
  'What kinds of products did she build?',
  'How did she work as both designer and engineer?',
  'What was the outcome of that chapter?',
  'Which later projects should I read next?',
  'How does data modeling still shape her work?',
  'What roles is she a strong fit for because of this?',
]

const PROJECT_PROMPT_POOLS: Record<string, string[]> = {
  '/work/automl': AUTOML_PROMPTS,
  '/enterprise-redesign': AUTOML_PROMPTS,
  '/work/dotds': DOTDS_PROMPTS,
  '/design-system': DOTDS_PROMPTS,
  '/work/campaign': CAMPAIGN_PROMPTS,
  '/work/filters': FILTERS_PROMPTS,
  '/work/museum': MUSEUM_PROMPTS,
  '/work/pivot': PIVOT_PROMPTS,
}

function genericProjectPrompts(title: string): string[] {
  return [
    `Tell me about ${title}`,
    `What problem did ${title} solve?`,
    `What was Grace's role?`,
    `How did she approach the process?`,
    `What was the outcome of ${title}?`,
    `How did she work with engineering on this?`,
    'What made this project distinctive?',
    'Which related project should I read next?',
  ]
}

function projectPromptKey(ctx: ResolvedPageContext): string | undefined {
  if (PROJECT_PROMPT_POOLS[ctx.currentPage]) return ctx.currentPage
  if (ctx.projectId === 'automl') return '/work/automl'
  if (ctx.projectId === 'dotds') return '/work/dotds'
  if (ctx.projectId === 'kahuna') return '/work/campaign'
  if (ctx.projectId === 'wislite') return 'wislite'
  if (ctx.projectId === 'museum') return '/work/museum'
  if (ctx.projectId === 'pivot') return '/work/pivot'
  return undefined
}

export function getQuickPromptPool(ctx: ResolvedPageContext): string[] {
  if (ctx.type === 'project') {
    const key = projectPromptKey(ctx)
    if (key === 'wislite') return WISLITE_PROMPTS
    if (key && PROJECT_PROMPT_POOLS[key]) return PROJECT_PROMPT_POOLS[key]
    if (ctx.projectTitle) return genericProjectPrompts(ctx.projectTitle)
    return genericProjectPrompts('this project')
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

function shuffle<T>(items: T[]): T[] {
  const next = [...items]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const current = next[i]
    next[i] = next[j]
    next[j] = current
  }
  return next
}

/** Pick 6–8 prompts from a pool, shuffled. Smaller pools return everything. */
export function sampleQuickPrompts(
  pool: string[],
  min = 6,
  max = 8,
): string[] {
  if (pool.length <= min) return shuffle(pool)
  const hi = Math.min(max, pool.length)
  const lo = Math.min(min, hi)
  const count = lo + Math.floor(Math.random() * (hi - lo + 1))
  return shuffle(pool).slice(0, count)
}

