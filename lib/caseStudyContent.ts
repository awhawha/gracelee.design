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
  /** Group label above `decisions`, e.g. "What I learned". */
  decisionsTitle?: string
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
  /**
   * Label/value pairs for the sticky sidebar rail (company, role, scope…).
   * Kept short — the rail is ~260px wide, so two lines per value at most.
   */
  meta?: { label: string; value: string }[]
  /** Optional rail CTA, e.g. a live site. Omitted when there is nothing to link. */
  link?: { label: string; href: string }
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
  /**
   * Render `heroImage` directly under the title, unframed and full width —
   * for photographic openers. Otherwise it sits framed below the metrics.
   */
  heroImageFirst?: boolean
  chapters: CaseChapter[]
  involvement: string
  next: { label: string; href: string }
}

const automl: CaseStudyContent = {
  title:
    'Making AutoML Self-Serve: From Fragmented Data Setup to Confident Model Runs',
  // Tags and metric cards are intentionally empty: the rail carries the framing
  // and the Outcomes chapter carries the numbers.
  tags: [],
  meta: [
    { label: 'Company', value: 'dotData' },
    { label: 'Industry', value: 'Enterprise AI, AutoML platform' },
    { label: 'Role', value: 'Sr Product Designer' },
    {
      label: 'Scope',
      value: 'Research, prototyping, visualization, interaction design',
    },
    { label: 'Team', value: 'Product, Data Science' },
    { label: 'Focus', value: 'Clarity, control, and confidence' },
  ],
  heroCompact: true,
  tldr: [
    'I led the end-to-end design of an AutoML setup experience that enabled Business Analysts to configure and run their first experiment with less reliance on Customer Support.',
    'The work consolidated a fragmented, three-page workflow into a guided, single-surface flow that inferred data schemas, suggested table relationships, and made time-aware data configuration approachable through sensible defaults and just-in-time explanations. By balancing automation with user validation and editability, the experience reduced initial model setup from roughly 30 minutes to 10 minutes while giving non-technical users more confidence to build and rerun models independently.',
  ],
  metrics: [],
  heroImage: {
    label: '[ automl/hero-desk.png — the guided setup in place ]',
    caption:
      'Defining a prediction target in the redesigned AutoML setup: target table, target column, and value mapping in one panel.',
    img: '/images/automl/hero-desk.png',
    alt: 'A laptop on a desk showing the redesigned AutoML define-target panel',
    ratio: '1448 / 1086',
    fit: 'cover',
  },
  heroImageFirst: true,
  involvement:
    'I led design across research, prototyping, visualization, and interaction design, partnering with product and data science teams to define a trustworthy, intuitive configuration feature.',
  next: { label: 'Building a Design System for Scale', href: '/work/dotds' },
  chapters: [
    {
      heading: 'The context',
      body: [
        'Business Analysts were expected to use AutoML with limited machine-learning expertise, yet configuring a first model required navigating three disconnected workflows and often relying on Customer Support for guidance. The hardest parts were understanding how tables related to one another and defining time-aware data settings correctly.',
        'To make AutoML truly self-serve, we needed to turn this expert-led setup process into a guided workflow that users could validate, adjust, and rerun with confidence.',
      ],
      conflict: {
        label: 'Design challenge',
        text: 'Design a scalable AutoML configuration experience that enables non-technical Business Analysts to prepare data, validate table relationships, and configure time-aware prediction settings with clarity and control — turning an expert-led workflow into a confident path to a first model run.',
      },
    },
    {
      heading: 'The problem',
      body: [
        'Setting up a model was fragmented across three separate workflows: defining data sources and schemas, creating a use case, and configuring the model design task. Users had to manually connect tables, map fields, and configure time-based data logic — tasks that required machine-learning knowledge most Business Analysts did not have.',
        'As a result, users often relied on Customer Support to configure or iterate on a model. Even when they could proceed independently, they lacked confidence that their table relationships and time settings were correct.',
      ],
      figures: [
        {
          label: '[ automl/before-redesign.png — the legacy setup ]',
          caption:
            'Before: importing data sources, selecting a target schema, and configuring data slots each lived in a separate place, so no screen showed how the setup fit together.',
          img: '/images/automl/before-redesign.png',
          alt: 'The legacy flow — data source import, target schema selection, and data slot configuration on three separate screens',
          ratio: '5760 / 3380',
          fit: 'contain',
          bg: 'gradient',
        },
      ],
      list: {
        title: 'Key pain points',
        items: [
          'Fragmented setup: critical configuration was spread across three pages, making the workflow difficult to follow.',
          'Hidden ML complexity: table relationships, data availability, and prediction timing were unfamiliar concepts for non-technical users.',
          'Limited confidence to iterate: users could run a model, but did not know what to adjust when they needed to rerun it.',
        ],
      },
    },
    {
      heading: 'Research and discovery',
      body: [
        'To understand where users got stuck, I interviewed Customer Support to learn about common customer use cases and recurring setup questions. I also partnered with the Head of Data Science to map the underlying ML workflow, and observed users configuring models to identify repetitive tasks, points of confusion, and moments that required expert intervention.',
      ],
      decisionsTitle: 'What I learned',
      decisions: [
        {
          num: '01',
          name: 'Configuration knowledge lived with experts',
          text: 'Business Analysts could define a business goal, but often needed Customer Support or Data Science to translate it into valid data relationships and model settings.',
        },
        {
          num: '02',
          name: 'Time-aware data setup lacked a clear mental model',
          text: 'Users did not know how prediction timing, relationship timing, and data availability affected a model, making them unsure whether their configuration was valid.',
        },
        {
          num: '03',
          name: 'Automation needed to remain inspectable',
          text: 'Users wanted help connecting tables and applying defaults, but needed to validate and adjust recommendations rather than accept a black-box configuration.',
        },
        {
          num: '04',
          name: 'Iteration should not require a restart',
          text: 'When a model needed to be rerun, users needed to adjust a specific setting and continue — not repeat the entire setup process.',
        },
      ],
    },
    {
      heading: 'Design strategy',
      body: [
        'I structured the redesigned experience around four principles: reduce unnecessary setup, preserve user control, explain complexity in context, and support iteration.',
      ],
      decisionsTitle: 'Four principles',
      decisions: [
        {
          num: '01',
          name: 'Start with smart defaults',
          text: 'Infer data types and apply sensible defaults so users can begin configuring a model without needing to understand every technical parameter upfront.',
        },
        {
          num: '02',
          name: 'Automate, then let users validate',
          text: 'Suggest table relationships automatically to reduce manual mapping, while allowing users to inspect, edit, and confirm every connection.',
        },
        {
          num: '03',
          name: 'Explain complexity in context',
          text: 'Use inline explanations for advanced concepts — such as prediction timing, relationship timing, and data availability — only when users need to make a decision.',
        },
        {
          num: '04',
          name: 'Design for iteration, not one-time setup',
          text: 'Keep configuration editable after a model run, so users can adjust inputs and rerun a model without rebuilding the workflow from scratch.',
        },
      ],
    },
    {
      heading: 'The solution: a guided AutoML workflow',
      body: [
        'The redesign consolidated three disconnected setup experiences into one guided workflow. Rather than asking users to understand the entire ML configuration model upfront, the interface moved from data preparation to model run through a sequence of focused decisions.',
      ],
      overview: {
        label: '[ automl/after-redesign.png — the guided flow ]',
        caption:
          'After: the same decisions on one surface — three separate setup workflows became a single flow users can move through, validate, and return to.',
        img: '/images/automl/after-redesign.png',
        alt: 'The redesigned flow — one guided setup with target definition and table relationships visible together',
        ratio: '5760 / 3380',
        fit: 'contain',
        bg: 'gradient',
      },
      decisions: [
        {
          num: '01',
          name: 'Upload and validate data',
          text: 'The system inferred data types on upload, allowing users to validate the schema instead of defining it manually. This reduced the initial setup burden while keeping users informed about how their data would be used.',
          media: {
            label: '[ automl/add-tables.png — table import and validation ]',
            caption:
              'Selecting already-uploaded tables or importing a new CSV. Each column’s type is inferred from the sample data and shown with its distribution, so users confirm the schema here — or open the table later to edit it.',
            img: '/images/automl/add-tables.png',
            alt: 'Add tables dialog: a list of uploaded tables with import status beside a preview of inferred column types and value distributions',
            ratio: '2880 / 1936',
            fit: 'contain',
            bg: 'gradient',
          },
        },
        {
          num: '02',
          name: 'Define the prediction goal',
          text: 'Users selected a target table, target column, and prediction time in one place. When table mapping was required, it appeared within the same step rather than as a separate workflow.',
          media: {
            label: '[ automl/define-prediction-goal.png — define target ]',
            caption:
              'Target table, target column, prediction type, value mapping, entity ID, and prediction time in one panel — with “What is prediction time?” available inline, and the tables it refers to still visible on the canvas.',
            img: '/images/automl/define-prediction-goal.png',
            alt: 'Define target panel — target table, target column, target value mapping, entity ID, and prediction time — beside the connected tables on the canvas',
            ratio: '2880 / 2116',
            fit: 'contain',
            bg: 'gradient',
          },
        },
        {
          num: '03',
          name: 'Connect tables with guided validation',
          text: 'An auto-connect action suggested table relationships based on the uploaded data. Users could inspect, edit, or remove each suggested connection, balancing automation with the control needed to trust the configuration.',
          media: {
            label: '[ automl/connect-tables.png — auto-connect ]',
            caption:
              'Auto-connect proposes relationships from the uploaded data and reports what it added; hovering a connection shows the columns it joined on, with edit and remove beside them.',
            img: '/images/automl/connect-tables.png',
            alt: 'Canvas showing connected tables, a confirmation that three connections have been added, and a hovered connection revealing its joined columns with edit and delete controls',
            ratio: '2560 / 1664',
            fit: 'contain',
            bg: 'gradient',
          },
          media2: {
            label: '[ er-error-validation.png — validation ]',
            caption:
              'Validation names what is missing and offers the action that fixes it, instead of failing at run time.',
            img: '/images/er-error-validation.png',
            alt: 'Validation panel listing an undefined target and unconnected tables, each with a corrective action',
            ratio: '1280 / 832',
            fit: 'contain',
            bg: 'gradient',
          },
        },
        {
          num: '04',
          name: 'Configure, run, and iterate',
          text: 'Time-aware settings appeared in context through defaults and inline explanations. After running a model, users could return to any configuration step, make a targeted adjustment, and rerun — without rebuilding the setup from scratch.',
          media: {
            label: '[ solution-3-contextual-config.png — time-aware settings ]',
            caption:
              'Time match, time range, and search range explained where the decision happens — with a default range inferred from the detected time column and an interactive timeline for manual setup.',
            img: '/images/solution-3-contextual-config.png',
            alt: 'Time-aware configuration with inline explanations, real-data examples, and an interactive prediction timeline',
            ratio: '2824 / 1061',
            fit: 'contain',
            bg: 'gradient',
          },
        },
      ],
      figures: [
        {
          label: '[ final-canvas.png — the configured workflow ]',
          caption:
            'The result: target, source tables, and their relationships stay visible while the model is configured, run, and adjusted.',
          img: '/images/automl/final-canvas.png',
          alt: 'The model-design canvas: configuration panel, target table, and relationship lines annotated on one plane',
          ratio: '5760 / 3380',
          fit: 'contain',
          bg: 'gradient',
        },
      ],
    },
    {
      heading: 'Outcomes',
      body: [],
      callout: {
        label: 'Outcome',
        text: 'Initial model setup dropped from roughly 30 minutes to 10 minutes for common configurations.',
      },
      list: {
        title: 'What changed',
        items: [
          'Consolidated a fragmented three-page setup process into one guided AutoML workflow.',
          'Enabled Business Analysts to validate data, configure table relationships, and run a first model with less reliance on Customer Support.',
          'Made iteration more efficient by allowing users to edit and rerun a configuration without starting over.',
        ],
      },
      resolution:
        'This work established a more scalable foundation for self-serve AutoML — translating expert configuration knowledge into an experience that non-technical users could understand, validate, and act on.',
    },
  ],
}

const designSystem: CaseStudyContent = {
  title: 'Building a design system people could use consistently',
  tags: ['Design systems', 'Design–engineering workflow'],
  meta: [
    { label: 'Company', value: 'dotData' },
    { label: 'Industry', value: 'Enterprise AI, B2B SaaS' },
    { label: 'Role', value: 'Design system owner (solo designer)' },
    {
      label: 'Scope',
      value: 'Token and library architecture, component design, governance',
    },
    { label: 'Team', value: 'Front-end engineering, Product teams' },
  ],
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
  meta: [
    { label: 'Project', value: 'Museum of Children’s Books (self-initiated)' },
    { label: 'Focus', value: 'Agentic workflows, human-in-the-loop AI' },
    { label: 'Role', value: 'Solo — design and build' },
    {
      label: 'Scope',
      value: 'Product concept, AI workflow design, front-end build',
    },
    { label: 'Built with', value: 'Claude Code Skills, agentic drafting pipeline' },
  ],
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
