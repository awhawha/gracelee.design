import {
  getPortfolioProject,
  portfolioKb,
  type PortfolioProject,
} from '@/data/portfolioContext'
import {
  getQuickPrompts,
  resolvePageContext,
  type ResolvedPageContext,
} from '@/lib/pageContext'
import { NOT_IN_KB_EN, NOT_IN_KB_ZH } from '@/lib/graceLlm/constants'
import type { GraceLlmRequest } from '@/lib/graceLlm/types'

export type DemoAnswer = {
  reply: string
  followUps: string[]
}

function answer(reply: string, followUps: string[]): DemoAnswer {
  return { reply, followUps: Array.from(new Set(followUps)).slice(0, 3) }
}

function normalize(text: string): string {
  return text.toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ').trim()
}

function looksChinese(text: string): boolean {
  return /[\u4e00-\u9fff]/.test(text)
}

function notInKb(question: string, ctx: ResolvedPageContext): DemoAnswer {
  const zh = looksChinese(question)
  const opener = zh ? NOT_IN_KB_ZH : NOT_IN_KB_EN
  const next = zh
    ? '你可以改問 Grace 的背景、AutoML 重設計、設計系統，或 Kahuna 行銷分析。'
    : 'I can tell you about Grace’s background, the AutoML redesign, the design system, or Kahuna marketing analytics.'
  return answer(`${opener} ${next}`, getQuickPrompts(ctx).slice(0, 3))
}

function relatedFollowUps(project: PortfolioProject): string[] {
  return project.relatedProjectIds
    .map((id) => getPortfolioProject(id))
    .filter((p): p is PortfolioProject => Boolean(p))
    .map((p) => `Tell me about ${p.title}`)
}

function projectFollowUps(
  project: PortfolioProject,
  asked: 'problem' | 'role' | 'collab' | 'impact' | 'process' | 'overview',
): string[] {
  const related = relatedFollowUps(project)
  const next: Record<typeof asked, string[]> = {
    problem: ["What was Grace's role?", 'What was the impact?'],
    role: ['How did she approach the process?', 'What was the impact?'],
    collab: ['What was the impact?', "What was Grace's role?"],
    impact: ['How did she approach the process?', ...related],
    process: ['What was the impact?', "What was Grace's role?"],
    overview: ["What was Grace's role?", 'What was the impact?'],
  }
  return [...next[asked], ...related]
}

function formatProjectOverview(project: PortfolioProject): DemoAnswer {
  return answer(
    `**${project.title}** · ${project.company}. ${project.challenge}`,
    projectFollowUps(project, 'overview'),
  )
}

function matchProjectFromQuestion(q: string): PortfolioProject | undefined {
  const aliases: { id: string; keys: string[] }[] = [
    { id: 'automl', keys: ['automl', 'auto ml', 'auto-ml', 'model-design', 'model design', 'canvas', 'workflow redesign'] },
    { id: 'dotds', keys: ['design system', 'token', 'handoff', 'v1', 'v2', 'css variable'] },
    { id: 'kahuna', keys: ['kahuna', 'marketing', 'campaign', 'targeting', 'audience', 'dashboard'] },
    { id: 'wislite', keys: ['wislite', 'banking', 'credit-review', '2007'] },
  ]
  const hit = aliases.find((alias) => alias.keys.some((key) => q.includes(key)))
  return hit ? getPortfolioProject(hit.id) : undefined
}

function isProblem(q: string): boolean {
  return /problem|challenge|solv|facing|need|pain|why did|why (the|this)|issue/.test(q) ||
    /問題|挑戰|痛點/.test(q)
}

function isRolesFit(q: string): boolean {
  return /role(s)? (is she|she is)|fit for|hiring|open to|looking for|職位|適合/.test(q)
}

function isRole(q: string): boolean {
  if (isRolesFit(q)) return false
  return /role|responsib|lead|own|what did grace|contribution/.test(q) ||
    /角色|負責|主導/.test(q)
}

function isProcess(q: string): boolean {
  if (/tell me about/.test(q) && !/process|approach|how did|method/.test(q)) {
    return false
  }
  return /process|approach|how did|method|research|interview|usability test/.test(q) ||
    /流程|研究|做法|方法/.test(q)
}

function isCollab(q: string): boolean {
  return /collaborat|engineer|pm |product manager|cross-functional|handoff|work with/.test(q) ||
    /合作|工程|跨職能/.test(q)
}

function isImpact(q: string): boolean {
  return /impact|outcome|result|metric|value|business|changed after|launch/.test(q) ||
    /影響|成果|產出|價值/.test(q)
}

function isBackground(q: string): boolean {
  if (/engineering background|show up/.test(q)) return false
  return /background|who is|about grace|experience|career|path|bio|profile|教育|背景|經歷/.test(q)
}

function isSkills(q: string): boolean {
  return /skill|strength|good at|speciali|expert|專長|技能/.test(q)
}

function isRecommend(q: string): boolean {
  return /which project|look at first|recommend|should i read|start with|documented project|shows that best|proud of/.test(q) ||
    /推薦|哪個專案|先看/.test(q)
}

function formatBackground(): DemoAnswer {
  const { profile, experience } = portfolioKb
  const lines = experience.map((e) => `- **${e.company}** — ${e.role} (${e.dates})`)
  return answer(
    [
      `${profile.name} is a ${profile.title} in the ${profile.location}, with ${profile.yearsExperience} years on enterprise analytics, data, and AI products.`,
      '',
      ...lines,
    ].join('\n'),
    ['Which projects should I look at first?'],
  )
}

function formatSkills(): DemoAnswer {
  return answer(
    'She is strongest on complex workflows, information architecture, data visualization, and token-driven design systems.',
    [
      'What roles is she a strong fit for?',
      'Which projects should I look at first?',
    ],
  )
}

function formatRoleFit(): DemoAnswer {
  return answer(
    'She is a strong fit for Senior Product Designer roles on enterprise / B2B products — especially analytics, data platforms, and AI, including teams that need design-systems fluency.',
    ['Which projects should I look at first?'],
  )
}

function formatRecommend(): DemoAnswer {
  return answer(
    [
      'Start with [AutoML workflow redesign](/work/automl) — 20+ configuration actions became 5 guided steps, with faster iteration and clearer decisions.',
      '',
      'Then [Analytics design system](/work/dotds) if you care about design–eng alignment, or [Campaign performance dashboard](/work/campaign) for data-viz and research.',
    ].join('\n'),
    [
      "What was Grace's role on AutoML?",
      'What was the AutoML impact?',
    ],
  )
}

function formatCollabGeneral(): DemoAnswer {
  return answer(
    [
      'She works with engineers on the system model first, and she aligns design artifacts to what ships.',
      '',
      'On [AutoML workflow redesign](/work/automl), canvas, defaults, and validation were shaped with product and engineering. On the [analytics design system](/work/dotds), semantic tokens map to front-end CSS variables.',
    ].join('\n'),
    [
      'Which project shows that best?',
      'What was the AutoML impact?',
    ],
  )
}

function formatProcessGeneral(): DemoAnswer {
  return answer(
    'She frames the problem with research, shapes the system with product and engineering, then tightens the interaction until people can trust it. AutoML is the clearest example: one canvas, defaults, and live validation instead of a fragmented setup.',
    [
      'Tell me about the AutoML workflow redesign',
      'How does she work with engineering?',
    ],
  )
}

function answerForProject(q: string, project: PortfolioProject): DemoAnswer {
  if (isProblem(q)) {
    return answer(project.challenge, projectFollowUps(project, 'problem'))
  }
  if (isRole(q)) {
    return answer(project.role, projectFollowUps(project, 'role'))
  }
  if (isCollab(q)) {
    return answer(project.collaboration, projectFollowUps(project, 'collab'))
  }
  if (isImpact(q)) {
    return answer(project.impact, projectFollowUps(project, 'impact'))
  }
  if (isProcess(q) || /research|targeting|token|canvas|schema/.test(q)) {
    return answer(project.process, projectFollowUps(project, 'process'))
  }
  return formatProjectOverview(project)
}

export function contextFromRequest(req: GraceLlmRequest): ResolvedPageContext {
  const resolved = resolvePageContext(req.currentPage)
  if (req.contextType) {
    return {
      ...resolved,
      type: req.contextType,
      projectId: req.projectId ?? resolved.projectId,
      projectTitle: req.projectTitle ?? resolved.projectTitle,
      hasKnowledgeBase: req.projectId
        ? Boolean(getPortfolioProject(req.projectId))
        : resolved.hasKnowledgeBase,
    }
  }
  return resolved
}

export function getDemoReply(question: string, ctx: ResolvedPageContext): DemoAnswer {
  const q = normalize(question)
  if (!q) {
    return answer(
      'Ask a question about Grace’s work, or pick one of the prompts above.',
      getQuickPrompts(ctx),
    )
  }

  if (isRolesFit(q)) return formatRoleFit()
  if (isRecommend(q)) return formatRecommend()
  if (isBackground(q)) return formatBackground()
  if (isSkills(q) && !isProcess(q) && !isCollab(q)) return formatSkills()

  const pageProject = ctx.projectId ? getPortfolioProject(ctx.projectId) : undefined
  const mentioned = matchProjectFromQuestion(q)

  if (isCollab(q) && !mentioned) return formatCollabGeneral()

  if (mentioned && mentioned.id !== pageProject?.id) {
    return answerForProject(q, mentioned)
  }
  if (pageProject) {
    return answerForProject(q, pageProject)
  }

  if (isCollab(q)) return formatCollabGeneral()
  if (isProcess(q)) return formatProcessGeneral()
  if (ctx.type === 'portfolio' && /work|overview|intro/.test(q)) {
    return formatBackground()
  }

  return notInKb(question, ctx)
}

/** Map a quick-prompt click to a stable demo answer (used when the API is absent). */
export function getDemoReplyForRequest(req: GraceLlmRequest): DemoAnswer {
  const last = [...req.messages].reverse().find((m) => m.role === 'user')
  const question = last?.content ?? ''
  return getDemoReply(question, contextFromRequest(req))
}
