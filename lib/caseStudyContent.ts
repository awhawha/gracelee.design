// Content for the bespoke "chaptered" case studies (AutoML + Design System).
// These two pages share one layout (ChapteredCaseStudy); only the copy differs.
// Copy is lifted verbatim from the design handoffs. Striped placeholders carry
// the intended asset filename in their label until real exports are dropped in.

export type CaseMedia = {
  /** Mono label shown in the striped placeholder (when no real `img`). */
  label: string
  /** Mono label rendered above the frame, e.g. for a supporting detail shot. */
  title?: string
  caption: string
  /**
   * Caps the figure width, e.g. '720px', for detail shots that should read as
   * an inset rather than another full-width system view.
   */
  maxW?: string
  isVideo?: boolean
  /** Real exported asset under /public. When set, renders a framed image. */
  img?: string
  alt?: string
  /** Frame aspect ratio, e.g. '2000 / 785'. Defaults to the caller's ratio. */
  ratio?: string
  /** How the image sits in the frame. */
  fit?: 'contain' | 'cover'
  /** Frame padding (olive shows through), e.g. '2%'. */
  pad?: string
  /**
   * Backdrop behind the image. Olive `#d8dac9` by default; white for ch04;
   * `gradient` for the Paper wash, which cut-out (transparent) exports sit on.
   */
  bg?: 'olive' | 'white' | 'gradient'
}

/**
 * A swimlane flow: the sequence reads left to right, while the lanes show who
 * acts at each step — so the human-in-the-loop gates are visible at a glance.
 */
export type CasePipeline = {
  /** Lane rows, top to bottom. `tone` drives the fill treatment. */
  lanes: { key: string; name: string; tone: 'agent' | 'surface' | 'human' }[]
  steps: {
    name: string
    /** What each lane does at this step; lanes left out render as a gap. */
    acts: { lane: string; text: string }[]
    /** Marks a human-in-the-loop gate above the step. */
    checkpoint?: string
  }[]
  caption?: string
}

export type CaseChapter = {
  /** Optional eyebrow above the heading; omit for label-free chapters. */
  kicker?: string
  heading: string
  body: string[]
  quote?: { text: string; who: string }
  conflict?: { label: string; text: string }
  overview?: CaseMedia
  /** Side-by-side before/after comparison with labels and a shared caption. */
  beforeAfter?: {
    before: { img: string; alt: string; label: string }
    after: { img: string; alt: string; label: string }
    caption?: string
  }
  /**
   * Borderless equal columns under a figure — no heading of their own, styled
   * like the key outcomes so they read as supporting detail rather than
   * competing with the visual above them.
   */
  summary?: { name: string; text: string }[]
  /** Swimlane flow: the same sequence, plus who acts and what guards each step. */
  pipeline?: CasePipeline
  decisions?: {
    num: string
    name: string
    text: string
    /** Optional — decisions can be text-only. */
    media?: CaseMedia
    /** Optional second media, stacked below the first. */
    media2?: CaseMedia
  }[]
  /** Body paragraphs that read after the `decisions` list rather than before it. */
  bodyAfter?: string[]
  figures?: CaseMedia[]
  /** Lay `figures` out side by side instead of stacked. Collapses on mobile. */
  figuresRow?: boolean
  /**
   * Highlighted result box (like `conflict`, but rendered after the body).
   * Without a `label` it reads as a bare outcome statement.
   */
  callout?: { label?: string; text: string }
  /** Compact titled list, e.g. "What we continue to measure". */
  list?: { title: string; items: string[] }
  resolution?: string
}

export type CaseStudyContent = {
  eyebrow?: string
  title: string
  tags: string[]
  subhead?: string
  /** Compact hero: title → summary → tags, no subhead/"In short" label. */
  heroCompact?: boolean
  /**
   * One paragraph, or several (first is the lead, the rest render smaller).
   * Omit for a hero that carries only title, subhead, tags and metrics.
   */
  tldr?: string | string[]
  /** Cards: with `value` a big metric number renders; without, `label` is the card title. */
  metrics: { value?: string; label: string; desc?: string }[]
  heroImage?: CaseMedia
  chapters: CaseChapter[]
  involvement: string
  next: { label: string; href: string }
}

const automl: CaseStudyContent = {
  title: 'From configuration maze to a guided model-design canvas',
  tags: ['Enterprise UX', 'Complex workflows'],
  heroCompact: true,
  tldr: 'I consolidated a multi-screen model-configuration workflow into one guided canvas, helping analysts understand dependencies, start with a runnable setup, and iterate independently.',
  metrics: [
    {
      label: 'A shorter path to first run',
      desc: 'A multi-screen configuration flow was consolidated into five actions.',
    },
    {
      label: '3 screens, one canvas',
      desc: 'Users can configure the model while keeping tables and dependencies visible together.',
    },
    {
      label: '50% faster configuration',
      desc: 'In usability testing, participants completed model-task setup in half the time.',
    },
  ],
  heroImage: {
    label: '[ automl/hero.png — guided model-design canvas ]',
    caption:
      'The guided canvas: target definition, table relationships, and validation in one workspace.',
    img: '/images/automl/hero.png',
    alt: 'Model-design canvas with the define-target panel, connected tables, and a validation message',
    ratio: '4000 / 2250',
    fit: 'contain',
    bg: 'gradient',
  },
  involvement:
    'As Lead Product Designer, I drove the redesign end to end — problem framing, interaction design, prototyping, and usability testing — in close partnership with engineering and PM.',
  next: { label: 'Building a Design System for Scale', href: '/work/dotds' },
  chapters: [
    {
      kicker: '01 — The problem',
      heading: 'Users could complete steps—but not predict their impact',
      body: [
        'Creating a model task required users to import data, define schemas, select a target, connect tables, and configure advanced settings across separate screens.',
        'Users could learn the workflow. What they could not see was how one setting affected the next—for example, how target selection changed required relationships or how table connections affected the model.',
      ],
      quote: {
        text: '“I don’t know what these settings will affect next.”',
        who: 'Business analysts · user interviews',
      },
    },
    {
      kicker: '02 — The insight',
      heading: 'Model design is an iteration loop, not a linear checklist',
      body: [
        'The issue was not simply where to begin. Users needed to understand the relationships between their decisions, run a first version with confidence, then return to adjust it without relying on a data scientist.',
        'So I replaced the accordion-style flow with a single canvas. Configuration panels keep the work organized, while the canvas makes target tables, source tables, and their relationships visible together.',
      ],
      beforeAfter: {
        before: {
          img: '/images/automl/before-redesign.png',
          alt: 'Old flow — data sources, use case, and task configuration stacked across three separate screens',
          label: 'Old flow — multiple screens, disconnected steps',
        },
        after: {
          img: '/images/automl/after-redesign.png',
          alt: 'New flow — the model-design canvas with target and table relationships visible together',
          label: 'New flow — one visible, iterative canvas',
        },
        caption:
          'Disconnected configuration steps became one canvas users can return to and adjust.',
      },
    },
    {
      kicker: '03 — What testing changed',
      heading: 'Visibility alone was not enough',
      body: [
        'The first canvas made data relationships visible, but testing showed that some users still did not know how to begin. They hesitated over whether tables needed connecting and how to choose a target.',
        'That changed the direction: the canvas needed to preserve its global view while also giving users a credible starting point.',
      ],
    },
    {
      kicker: '04 — The final design',
      heading: 'A canvas with a confident starting point',
      body: [
        'The final canvas keeps the whole data model in view and opens with a recommended setup rather than an empty plane. Users can run a first model from it, then return to the same canvas to refine it.',
      ],
      overview: {
        label: '[ final-canvas.png — the canvas ]',
        caption:
          'Target tables, source tables, and their relationships, visible together on one canvas.',
        img: '/images/automl/final-canvas.png',
        alt: 'The model-design canvas: configuration panel, target table, and relationship lines annotated on one plane',
        ratio: '5760 / 3380',
        fit: 'contain',
        bg: 'gradient',
      },
      summary: [
        {
          name: 'A ready starting point',
          text: 'Auto-schema suggests an initial structure from sample data.',
        },
        {
          name: 'Recommended connections',
          text: 'Auto-connect proposes table relationships so users do not start from a blank model.',
        },
        {
          name: 'Sensible defaults',
          text: 'Suggested target, time-related fields, and advanced settings reduce setup effort.',
        },
      ],
      callout: {
        text: 'Configuration time was reduced by 50% in usability testing.',
      },
    },
  ],
}

const designSystem: CaseStudyContent = {
  title: 'Building a design system people could use consistently',
  tags: ['Design systems', 'Design–engineering workflow'],
  heroCompact: true,
  tldr: [
    'I consolidated a fragmented design-to-engineering workflow into a token-driven Figma system, giving teams one shared source of truth and cutting specification-related questions by roughly half. As adoption grew, I introduced component-level tokens to make intended design choices the default.',
  ],
  metrics: [
    {
      label: 'One source of truth',
      desc: 'Sketch, Zeplin, and InVision consolidated into Figma.',
    },
    {
      label: '~50% fewer spec questions',
      desc: 'Engineers could inspect tokens directly in Dev Mode.',
    },
    {
      label: 'Better defaults, fewer overrides',
      desc: 'Component-level tokens encoded intended styles into reusable patterns.',
    },
  ],
  heroImage: {
    label: '[ design-system-1.png + component.png — tokens ↔ code ]',
    caption:
      'The system surface: design tokens and components on one side, the front-end variables they map to on the other.',
    img: '/images/ds/ds-hero-flat.png',
    alt: 'Design tokens mapping to components and front-end variables',
    ratio: '1912 / 1113',
    fit: 'contain',
    bg: 'gradient',
  },
  involvement:
    'As design system owner, I led the V1.0 and V2.0 re-architecture: defining token and library architecture, aligning with front-end engineering, and evolving governance as adoption exposed gaps.',
  next: {
    label: 'Designing a Human–AI Production Workflow',
    href: '/work/museum',
  },
  chapters: [
    {
      kicker: '01 — The problem',
      heading: 'A design system spread across too many tools',
      body: [
        'I had previously led dotData’s first design system in Sketch. As the product suite grew, maintaining it became difficult.',
        'Handoff was spread across Sketch, Zeplin, and InVision, creating version drift and repeated clarification with engineering. The problem was not just missing components; we lacked a dependable way to communicate design decisions.',
      ],
      quote: {
        text: '“Which spec is the real source of truth for this sprint?”',
        who: 'Front-end engineers · sprint feedback',
      },
      figures: [
        {
          label: '[ How to update Zeplin spec.pdf — the legacy update flow ]',
          caption:
            'A component change had to be synchronized across Sketch, Zeplin, and InVision before engineering could implement it confidently.',
          img: '/images/ds/ch01-legacy-flow-flat.png',
          alt: 'The legacy update flow across Sketch, Zeplin and InVision',
          ratio: '2000 / 785',
          fit: 'contain',
          bg: 'gradient',
        },
      ],
    },
    {
      kicker: '02 — The foundation',
      heading: 'One shared language for design and code',
      body: [
        'I rebuilt the system in Figma and replaced hard-coded values with a token architecture. Core tokens defined raw values such as color, spacing, and typography; semantic tokens expressed intended roles, such as text-primary or surface-secondary.',
        'I aligned with front-end engineering on the implementation direction. Figma variable names mapped to CSS variables, and the core and semantic token layers were implemented in code.',
      ],
      overview: {
        label: '[ token reference chain ]',
        caption:
          'Component decisions resolve through semantic roles to core values, making both intent and global impact clear.',
        img: '/images/ds/ch02-token-chain-flat.png',
        alt: 'Token reference chain: component resolves to semantic resolves to core',
        ratio: '1844 / 810',
        fit: 'contain',
        bg: 'gradient',
      },
    },
    {
      kicker: '03 — The architecture',
      heading: 'Separate foundations from product-specific patterns',
      body: ['I split the library into two tiers.'],
      decisions: [
        {
          num: 'i',
          name: 'Studio Foundation',
          text: 'Shared tokens, controls, and layout patterns.',
        },
        {
          num: 'ii',
          name: 'Studio Components',
          text: 'Data-aware product patterns such as entity cards, tables, and evaluation charts.',
        },
      ],
      bodyAfter: [
        'This protected the shared foundation while giving product teams room to evolve complex workflows. Contribution guidance clarified where new patterns belonged.',
        'Within these components, I also defined behavior for real data. For example, ER cards kept long field names to one line with ellipsis truncation, preserving a consistent card height and scanning rhythm across different schemas and states.',
      ],
      figures: [
        {
          label: '[ Foundation and Components — the two tiers ]',
          caption:
            'Studio Foundation holds buttons, controls and color primitives shared across every product; Studio Components builds data-aware patterns — entity-relationship cards, table previews and evaluation charts — on top of it.',
          img: '/images/ds/ch03-foundation.png',
          alt: 'Studio Foundation — buttons, controls and color primitives — beside Studio Components — entity-relationship cards, table preview and evaluation charts',
          ratio: '4000 / 2250',
          fit: 'contain',
          bg: 'gradient',
        },
        {
          label: '[ ER card — one-line truncation behavior ]',
          title: 'Component behavior: handling real data',
          caption:
            'ER cards preserve a consistent scanning rhythm across schemas and states. Long field names are constrained to one line and truncate with an ellipsis, while the text region flexes within the available card width.',
          img: '/images/ds/component-behavior.jpg',
          alt: 'ER card variants beside the inspected text style, showing one-line clamp with ellipsis truncation',
          ratio: '1826 / 1226',
          fit: 'contain',
          bg: 'white',
          maxW: '720px',
        },
      ],
    },
    {
      kicker: '04 — Adoption and outcome',
      heading: 'Make the intended choice the default',
      body: [
        'A shared library improved handoff and reduced specification questions, but it did not guarantee consistent use. Documentation and peer review helped, but neither scaled reliably.',
        'I introduced component-level tokens so reusable components carried their intended styles by default. This reduced unnecessary overrides and made system guidance part of the design workflow rather than something teams had to remember.',
        'The system replaced fragmented handoff with a shared, token-driven workflow. Core and semantic tokens were implemented with engineering; component-level tokens were ready on the design side when I left.',
      ],
    },
  ],
}

const museum: CaseStudyContent = {
  title: 'Designing a human–AI content production system',
  tags: ['Agentic workflows', 'Human-in-the-loop AI', 'AI product design'],
  subhead:
    'A draft-first workflow for a children’s-book museum: agents research and generate structured drafts, while editors review, revise, and manually publish content.',
  metrics: [
    {
      label: 'Code-first design',
      desc: 'Designed and built the product directly in code, with AI as a design and engineering collaborator.',
    },
    {
      label: '3 workflow models tested',
      desc: 'Tested CMS generation, a closed knowledge base, and an agentic draft-production workflow.',
    },
    {
      label: '2 human checkpoints',
      desc: 'Drafts are reviewed in conversation and again in the admin interface before anyone publishes.',
    },
  ],
  heroImage: {
    label: '[ museum-hero.png — the reading experience ]',
    caption:
      'The museum itself: a visual-first archive of children’s-book illustration and craft.',
    img: '/images/museum/hero.png',
    alt: 'Museum of Children’s Books — the Book of the Day feature, showing Where the Wild Things Are',
    ratio: '3704 / 1854',
    fit: 'cover',
    bg: 'white',
  },
  involvement:
    'Solo, end to end. I defined the product concept, designed and built the experience directly in code, tested AI/CMS workflow models, and developed the Claude Code Skills behind the draft-production pipeline. My focus was designing where automation should act, where human judgment should intervene, and how the handoff between them should work.',
  next: { label: 'Reimagining AutoML', href: '/work/automl' },
  chapters: [
    {
      kicker: '01 — The opportunity',
      heading: 'Building a visual archive with AI as a production partner',
      body: [
        'The museum is a visual reference for illustrators and designers, organized around craft: medium, technique, style, and influence.',
        'I used the project to explore a second question: how far could AI participate directly in product design and implementation? Designing in code with the product context, working UI, and codebase in one environment created a tighter loop between design reasoning and implementation.',
      ],
      overview: {
        label: '[ tool-convergence.png — chat → design surface → code ]',
        caption:
          'Concepting, design, and implementation collapsed into one continuous loop.',
        img: '/images/museum/process.png',
        ratio: '1214 / 434',
        fit: 'cover',
        bg: 'white',
        maxW: '760px',
      },
    },
    {
      kicker: '02 — The problem',
      heading: 'AI could generate content, but not earn trust',
      body: [
        'Structured metadata, such as author, year, and ISBN, was easy for AI to generate and validate. Open-ended research on medium and technique was less reliable: outputs could be vague, inconsistent, or difficult to verify.',
        'A closed knowledge base improved grounding, but introduced a manual copy-paste bridge back to the CMS. The design problem was not simply how to generate content, but where AI could be trusted and where human judgment needed to intervene.',
      ],
      figuresRow: true,
      figures: [
        {
          label: '[ admin-ai-refill.mp4 — CMS auto-fill ]',
          caption: 'Experiment A — an AI refill button inside the CMS form.',
          img: '/images/museum/experimentA-AI-refill.mp4',
          isVideo: true,
          ratio: '16 / 10',
        },
        {
          label: '[ notebooklm-workflow.png — the copy-paste break ]',
          caption:
            'Experiment B — a closed knowledge base, grounded but disconnected from the CMS.',
          img: '/images/museum/experimentB-NotebookLM.png',
          ratio: '16 / 10',
          fit: 'contain',
          bg: 'white',
        },
      ],
    },
    {
      kicker: '03 — The system',
      heading: 'Agent produces, interface validates, human decides',
      body: [
        'Rather than treating AI as a feature inside a CMS, I designed it as an agent operating across the production workflow. A custom Claude Code Skill researches a book, synthesizes findings, and generates structured content as a draft.',
        'The workflow moves from research to draft generation, human review, admin editing, and manual publishing. This preserves speed without allowing unreviewed content to become public.',
      ],
      pipeline: {
        lanes: [
          { key: 'agent', name: 'AI agent', tone: 'agent' },
          { key: 'interface', name: 'Admin interface', tone: 'surface' },
          { key: 'human', name: 'Human', tone: 'human' },
        ],
        steps: [
          {
            name: 'Research',
            acts: [{ lane: 'agent', text: 'Researches with sources' }],
          },
          {
            name: 'Generate draft',
            acts: [{ lane: 'agent', text: 'Creates structured fields' }],
          },
          {
            name: 'Human review',
            checkpoint: 'Human gate',
            acts: [
              { lane: 'human', text: 'Verifies claims and refines the draft' },
            ],
          },
          {
            name: 'Save to admin',
            acts: [
              { lane: 'agent', text: 'Saves a draft' },
              { lane: 'interface', text: 'Draft appears in workspace' },
            ],
          },
          {
            name: 'Editor review/edit',
            checkpoint: 'Human gate',
            acts: [
              { lane: 'interface', text: 'Shows draft in context' },
              { lane: 'human', text: 'Corrects facts and wording' },
            ],
          },
          {
            name: 'Manual publish',
            acts: [{ lane: 'human', text: 'Publishes deliberately' }],
          },
        ],
        caption:
          'The workflow makes source grounding, draft status, and human publishing control explicit at each handoff.',
      },
      bodyAfter: [
        'The agent handles research, synthesis, and draft production. The admin interface makes drafts visible in context for review and correction. Human judgment remains responsible for resolving ambiguity and publishing approved content.',
        'The same pipeline supports specialized skills—such as illustrator research and cover color-palette extraction—without a separate orchestration layer.',
      ],
      callout: {
        label: 'Where it stands',
        text: 'The review experience is still evolving. The project revealed that agent output needs a purpose-built validation flow—not just a standard CMS form—to make editorial review fast and reliable.',
      },
    },
  ],
}

export const caseStudyContent: Record<string, CaseStudyContent> = {
  automl,
  dotds: designSystem,
  museum,
}
