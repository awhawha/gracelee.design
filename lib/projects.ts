// Portfolio project data.
//
// Source of truth for the Home work-index, the /work/[slug] case studies, and
// the next-project footer. Copy is lifted verbatim from the design handoff
// prototype. Structured so it can later move to MDX/CMS without touching the
// view layer — see the README "State Management" section.

export type MediaItem = {
  kind: 'image' | 'video'
  /** Box height in px (from the design data). */
  height: number
  /** Monospace label shown inside the striped placeholder. */
  label: string
  /** Caption rendered below the media. */
  caption: string
  /**
   * Real asset path under /public. When omitted, the slot renders as a striped
   * placeholder box (the design's intentional media placeholder).
   */
  src?: string
  /**
   * Optional group id. Consecutive media sharing the same group render as a
   * single slide carousel in the gallery instead of separate stacked blocks.
   */
  group?: string
}

export type Metric = {
  value: string
  label: string
}

/**
 * A body paragraph. Either plain text, or a paragraph with a bold lead-in
 * (rendered as "**lead:** text") — used for named lists like interaction patterns.
 */
export type Para = string | { lead: string; text: string }

/**
 * A scrollytelling beat: while these paragraphs are read, the pinned media
 * panel shows these media items. Indices reference the project's flat `paras`
 * and `media` arrays (kept as the single source of truth — no duplication).
 * When a project defines `sections`, its case study uses the synced
 * (sticky-media) layout; otherwise it falls back to the scrolling gallery.
 */
export type ScrollSection = { paras: number[]; media: number[] }

export type Project = {
  id: string
  company: string
  /** Eyebrow shown on the case study, e.g. "dotData · AutoML platform". */
  client: string
  /** Short label for the home work-index row. */
  title: string
  /** Optional longer headline used as the case-study H1; falls back to `title`. */
  headline?: string
  desc: string
  /**
   * Optional overrides for the Home "Selected work" list only — lets the
   * index row read differently from the case-study title/dek without
   * touching case-study content (H1, metadata, next-project link).
   */
  homeTitle?: string
  homeSubtitle?: string
  tags: string[]
  paras: Para[]
  /** Optional scrollytelling map; enables the synced sticky-media layout. */
  sections?: ScrollSection[]
  metrics: Metric[]
  involvement: string
  media: MediaItem[]
  /** External "Visit live case study" link. */
  liveUrl?: string
}

export const projects: Project[] = [
  {
    id: 'automl',
    company: 'dotData',
    client: 'Enterprise AI · dotData · Senior Product Designer',
    title: 'AutoML Redesign',
    headline:
      'Redesigning enterprise AutoML: reducing time-to-value for business analysts by 50%',
    desc: 'Reimagining the automated ML workflow',
    homeTitle: 'Reimagining AutoML',
    homeSubtitle:
      'Making automated ML workflows easier to understand and control.',
    tags: ['Workflow redesign', 'Complex systems UX', 'Prototyping', 'Enterprise AI'],
    paras: [
      'At dotData, I led the end-to-end redesign of the multi-table data onboarding and configuration experience to transform the platform from a service-heavy tool into a true self-service SaaS product. The urgency was clear: out of 80 business analysts trained on our legacy platform, fewer than five remained active, effectively freezing market growth. Qualitative discovery revealed that while machine learning workflows are inherently non-linear and iterative, our rigid, 3-step legacy wizard hid critical schema dependencies, trapping users in frustrating “debugging loops” and causing catastrophic compute-time waste.',
      'To realign our technical and product roadmap, I leveraged Object-Oriented Design (OOD) to map out every systemic data relationship. This foundational shift allowed me to partner deeply with lead engineers to remove legacy configuration noise (such as manual data-type mapping) and replace our fragmented structure with a single canvas workspace. By introducing an interactive spatial layout, we eliminated invisible dependencies, providing non-technical analysts with full contextual visibility over table relationships and preventing late-stage configuration failures.',
      'To make the high-density canvas intuitive, I established three scalable interaction patterns:',
      {
        lead: 'Adaptive Workspaces',
        text: 'A progressive disclosure onboarding state that eliminates “blank-canvas anxiety” by dynamically guiding users through initial data imports without rigid step constraints.',
      },
      {
        lead: 'Dense Entity Cards',
        text: 'Space-efficient table elements featuring fixed-height scroll containers and context-aware hover relationship previews to maximize data density while suppressing visual noise.',
      },
      {
        lead: 'Semantic Auto-Connect',
        text: 'A knowledge-free data linking system utilizing system intelligence, pre-filled smart defaults, and concrete, real-data configuration pipelines embedded directly in place.',
      },
      'We validated the canvas architecture through usability testing and post-launch telemetry, achieving immediate business and user validation: a 45% reduction in import configuration support tickets, a 50% acceleration in time-to-value (slashing configuration time from 10 to 5 minutes), and a 100% unassisted completion rate for complex ML schemas. Crucially, the experience re-engaged our enterprise sales pipeline, empowering account executives to proactively demo the data onboarding module as a key competitive moat in major sales cycles.',
    ],
    metrics: [
      { value: '−45%', label: 'import config support tickets' },
      { value: '−50%', label: 'config time (10→5 min)' },
      { value: '100%', label: 'unassisted completion' },
    ],
    involvement:
      'As the Lead Product Designer, I drove the full platform lifecycle from systemic problem reframing and workflow segmentation to defining our cross-product interaction patterns. By utilizing OOD as a cross-functional alignment artifact, I actively simplified the platform’s underlying technical architecture alongside engineering and product management stakeholders, establishing a scalable, vision-led interaction foundation that paved the way for all subsequent predictive intelligence properties across the platform.',
    media: [
      {
        kind: 'image',
        src: '/images/Enterprise_Redesign1.png',
        label: '[ canvas workspace ]',
        height: 400,
        caption:
          'The single canvas workspace — table relationships visible live, replacing the old one-way wizard.',
      },
      {
        kind: 'image',
        src: '/images/OOUX-before.png',
        label: '[ OOUX — before ]',
        height: 360,
        group: 'ooux',
        caption:
          'Before: five isolated entry points — a mistake in step one meant starting over from scratch.',
      },
      {
        kind: 'image',
        src: '/images/OOUX-after.png',
        label: '[ OOUX — after ]',
        height: 360,
        group: 'ooux',
        caption:
          'After: a single unified flow, with unnecessary configuration fields removed.',
      },
      {
        kind: 'image',
        src: '/images/concept-v1.png',
        label: '[ concept v1 ]',
        height: 360,
        group: 'concepts',
        caption: 'Concept v1 — merging the isolated entry points into a guided setup wizard.',
      },
      {
        kind: 'image',
        src: '/images/concept-v2.png',
        label: '[ concept v2 ]',
        height: 360,
        group: 'concepts',
        caption: 'Concept v2 — visualizing the entity-relationship view.',
      },
      {
        kind: 'image',
        src: '/images/concept-v3.png',
        label: '[ concept v3 ]',
        height: 360,
        group: 'concepts',
        caption:
          'Concept v3 — a flexible canvas showing all table relationships dynamically on one screen.',
      },
      {
        kind: 'video',
        src: '/videos/solution-1-disable-state.mp4',
        label: '[ solution 1 ]',
        height: 440,
        caption:
          '[VIDEO] Solution 1 — Guided entry via adaptive states: the import panel opens active while later zones stay disabled.',
      },
      {
        kind: 'video',
        src: '/videos/solution-2-real-time-exploration.mp4',
        label: '[ solution 2 ]',
        height: 440,
        caption:
          '[VIDEO] Solution 2 — Real-time table exploration: hovering a connection surfaces an inline ER preview without cluttering the canvas.',
      },
      {
        kind: 'image',
        src: '/images/solution-3-contextual-config.png',
        label: '[ solution 3 ]',
        height: 360,
        caption:
          'Solution 3 — Semantic auto-connect with contextual, pre-filled configuration and real-data examples.',
      },
      {
        kind: 'video',
        src: '/videos/er-data-quality-check.mp4',
        label: '[ agentic AI concept ]',
        height: 440,
        caption:
          '[VIDEO] Bonus, speculative — reimagining the flow with agentic AI, prototyped in Cursor.',
      },
    ],
  },
  {
    id: 'pivot',
    company: 'dotData',
    client: 'dotData · AutoML platform',
    title: 'Pivot Table Analysis',
    desc: 'Exploratory analysis without the spreadsheet',
    tags: ['Data viz', 'IA', 'Interaction'],
    paras: [
      'Analysts were exporting to spreadsheets to slice data the product already held. I designed an in-product pivot experience — fast, direct, and visual — so exploration stayed where the data lived.',
      'I focused on the manipulation model: drag-to-group, inline aggregation, and instant charting, with sensible defaults that made the first useful view appear in seconds.',
    ],
    metrics: [
      { value: '−65%', label: 'spreadsheet exports' },
      { value: '3×', label: 'queries per session' },
      { value: '12s', label: 'to first insight' },
    ],
    involvement:
      'Designer leading the pivot and exploration experience — interaction model, data visualization, and the empty-to-insight first run.',
    media: [
      {
        kind: 'image',
        src: '/images/er-table-preview.png',
        label: '[ pivot builder ]',
        height: 420,
        caption:
          'Drag-to-group and inline aggregation — building a view without leaving the product.',
      },
      {
        kind: 'image',
        label: '[ instant charting ]',
        height: 360,
        caption:
          'Every pivot is one click from a chart, so patterns surface as you explore.',
      },
      {
        kind: 'video',
        src: '/videos/real-time-table-exploration.mp4',
        label: '[ exploration flow ]',
        height: 420,
        caption: '[VIDEO] Slicing a dataset live — the manipulation model in action.',
      },
    ],
  },
  {
    id: 'dotds',
    company: 'dotData',
    client: 'Design Systems · dotData · Solo Product Designer',
    title: 'Design System',
    headline: 'A design system with logic-driven, three-layer tokens',
    desc: 'Logic-driven tokens that align design and engineering',
    homeTitle: 'Building a Design System for Scale',
    homeSubtitle: 'A token-driven system connecting design and engineering.',
    tags: ['Design systems', 'Token architecture', 'Design–dev alignment', 'Governance'],
    paras: [
      'We were redesigning multiple workflows at once, but the design infrastructure couldn’t keep up. Designers picked inconsistent tokens, engineers guessed at implementation intent, and the codebase kept accumulating hard-coded styles. I built a three-layer token architecture from scratch that gave both sides a shared language.',
      'The missing piece was a private Component-token layer between the Semantic tokens and the UI. Instead of a button reaching for a semantic color and hoping it’s right, it uses --button-bg, which maps to the correct semantic token for that context: primitives carry raw values, semantics carry meaning, and component tokens carry intent.',
      'I treated adoption as a design problem too — keeping component tokens private and scoped, leaving general semantic tokens available for in-between cases, and rolling out progressively instead of forcing a hard cutover. The architecture lives in Figma, aligned to engineering naming, so developers read the token logic directly in Dev Mode.',
    ],
    metrics: [
      { value: '5→2', label: 'steps in design→dev handoff' },
      { value: '↓', label: 'eng spec questions (weekly→monthly)' },
      { value: '3-layer', label: 'token architecture' },
    ],
    involvement:
      'Solo product designer on the system — I audited the existing UI and codebase, designed the three-layer token architecture, defined the governance model for what gets promoted to a component token, and aligned everything to engineering’s naming in Figma Dev Mode.',
    media: [
      {
        kind: 'image',
        src: '/images/design-system1.png',
        label: '[ token architecture ]',
        height: 400,
        caption:
          'The three-layer token architecture, connecting primitives through semantics to implementation-ready components.',
      },
      {
        kind: 'image',
        src: '/images/audit-finding.png',
        label: '[ audit findings ]',
        height: 360,
        caption:
          'The audit: similar colors with different hex values, components living in three files, and no clear source of truth.',
      },
      {
        kind: 'image',
        src: '/images/token-conflict.png',
        label: '[ token conflict ]',
        height: 360,
        caption:
          'Two designers reaching for different tokens on the same component — the semantic layer was abstract enough to read multiple ways.',
      },
      {
        kind: 'image',
        src: '/images/ds-third-layer.png',
        label: '[ component tokens ]',
        height: 360,
        caption:
          'Adding a private component-token layer: each UI element maps to the right semantic token — encoding intent, not just color.',
      },
      {
        kind: 'image',
        src: '/images/ds-devmode.png',
        label: '[ dev mode handoff ]',
        height: 360,
        caption:
          'The architecture lives in Figma, aligned to engineering naming, so developers read token logic directly in Dev Mode — no separate spec docs.',
      },
    ],
  },
  {
    id: 'campaign',
    company: 'Kahuna',
    client: 'Kahuna · Marketing analytics',
    title: 'Campaign Performance',
    desc: 'Performance analytics for modern marketers',
    tags: ['B2B SaaS', 'Data viz', 'Dashboards'],
    paras: [
      'Marketers at Kahuna drowned in metrics but struggled to answer the only question that mattered: is this campaign working? I redesigned the performance surface around decisions, not data dumps.',
      'I structured the view to lead with outcome and trend, then let marketers drill into channel and segment — so the dashboard told a story instead of listing numbers.',
    ],
    metrics: [
      { value: '3×', label: 'weekly active use' },
      { value: '−45%', label: 'time to read results' },
      { value: '9', label: 'enterprise rollouts' },
    ],
    involvement:
      'Lead designer for campaign analytics — information architecture, data visualization, and interaction, with PM and data science.',
    media: [
      {
        kind: 'image',
        label: '[ performance overview ]',
        height: 420,
        caption:
          'Outcome and trend first — the answer to "is this working?" sits at the top.',
      },
      {
        kind: 'image',
        label: '[ channel drill-down ]',
        height: 360,
        caption:
          'Drill into channel and segment without losing the thread of the story.',
      },
      {
        kind: 'video',
        label: '[ dashboard walkthrough ]',
        height: 420,
        caption: '[VIDEO] A guided tour of the redesigned performance surface.',
      },
    ],
  },
  {
    id: 'filters',
    company: 'Kahuna',
    client: 'Kahuna · Marketing analytics',
    title: 'Filter Editors',
    desc: 'Composing complex audience filters',
    tags: ['Interaction', 'Complex forms', 'UX'],
    paras: [
      'Building an audience meant nesting conditions — and/or logic, time windows, behavioral rules — in an editor that intimidated everyone but specialists. I redesigned it so anyone could compose a filter with confidence.',
      'I designed a visual logic builder with readable grouping, live audience counts, and reversible edits, turning a fragile power-user tool into an everyday one.',
    ],
    metrics: [
      { value: '2.4×', label: 'filters built / week' },
      { value: '−52%', label: 'support tickets' },
      { value: '90%', label: 'self-serve success' },
    ],
    involvement:
      'Designer for the audience filter editor — interaction model, logic visualization, and the live-count feedback loop.',
    media: [
      {
        kind: 'image',
        label: '[ logic builder ]',
        height: 440,
        caption:
          'Readable and/or grouping that makes complex audience logic legible at a glance.',
      },
      {
        kind: 'video',
        label: '[ building a filter ]',
        height: 420,
        caption:
          '[VIDEO] Composing a nested audience with live counts and reversible edits.',
      },
      {
        kind: 'image',
        label: '[ live audience count ]',
        height: 340,
        caption:
          'Every change updates the audience size instantly — no guessing, no dead ends.',
      },
    ],
  },
  {
    id: 'museum',
    company: 'Side project',
    client: 'Side project · Museum of Children’s Books',
    title: 'Designing with AI Agents',
    desc: 'A human–AI production system for a children’s book museum',
    homeTitle: 'Designing a Human–AI Production Workflow',
    homeSubtitle:
      'Using AI agents to turn a children’s book museum into a production-ready digital experience.',
    tags: [
      'AI-Driven Design',
      'Prototyping in the Browser',
      'Human-AI Interaction',
      'CMS UX Redesign',
    ],
    paras: [
      "A self-initiated concept: a digital museum celebrating children's book illustration. I wanted to design something warm and tactile — a counterweight to the dense enterprise work I do by day.",
      'I built the brand, the exhibition structure, and a reading experience that lets the artwork breathe, treating each illustrator like a gallery show rather than a catalog entry.',
    ],
    metrics: [
      { value: '24', label: 'illustrators featured' },
      { value: '6', label: 'curated exhibitions' },
      { value: '∞', label: 'bedtime re-reads' },
    ],
    involvement:
      'Everything — concept, brand identity, art direction, and the full web experience. A playground for craft on my own terms.',
    media: [
      {
        kind: 'image',
        label: '[ exhibition home ]',
        height: 440,
        caption:
          'The entrance — artwork-forward, warm, and unmistakably for children and the people who read to them.',
      },
      {
        kind: 'image',
        label: '[ illustrator gallery ]',
        height: 400,
        caption: 'Each illustrator gets a gallery show, with room for the work to breathe.',
      },
      {
        kind: 'video',
        label: '[ reading experience ]',
        height: 420,
        caption: '[VIDEO] Turning pages — a reading mode designed to feel like the real thing.',
      },
    ],
  },
]

export type CompanyGroup = {
  company: string
  meta: string
  projects: Project[]
}

const groupDefs: { company: string; meta: string; ids: string[] }[] = [
  { company: 'dotData', meta: 'AutoML & analytics platform', ids: ['automl', 'dotds'] },
  { company: 'Side project', meta: 'Self-initiated', ids: ['museum'] },
]

const byId: Record<string, Project> = Object.fromEntries(
  projects.map((p) => [p.id, p]),
)

/** Home work-index groups, derived from `company` (per the README). */
export const groups: CompanyGroup[] = groupDefs.map((g) => ({
  company: g.company,
  meta: g.meta,
  projects: g.ids.map((id) => byId[id]),
}))

/**
 * Home "Selected work" list — a single flat list (no per-company grouping),
 * in the same order the grouped index previously rendered.
 */
export const homeProjects: Project[] = groups.flatMap((g) => g.projects)

export function getProject(slug: string): Project | undefined {
  return byId[slug]
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.id)
}

/** The next project in order, wrapping around (for the case-study footer). */
export function getNextProject(slug: string): Project {
  const idx = Math.max(0, projects.findIndex((p) => p.id === slug))
  return projects[(idx + 1) % projects.length]
}
