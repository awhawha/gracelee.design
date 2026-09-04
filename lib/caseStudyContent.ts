// Content for the bespoke "chaptered" case studies.
// These pages share one layout (ChapteredCaseStudy); only the copy differs.
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
  prev: { label: string; href: string }
  next: { label: string; href: string }
}

const automl: CaseStudyContent = {
  // Eyebrow repeats the name the Home index uses, so a project reads the same
  // in both places; the title below carries the descriptive line.
  eyebrow: 'AutoML workflow redesign',
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
  prev: { label: 'Designing with AI Agents', href: '/work/museum' },
  next: { label: 'Analytics design system', href: '/work/dotds' },
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
  eyebrow: 'Analytics design system',
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
    'I consolidated a fragmented design-to-engineering workflow into a token-driven Figma system, giving teams one shared source of truth and cutting engineering spec questions from about once a week to once a month after they could self-serve in Figma Dev Mode. As adoption grew, I introduced component-level tokens to make intended design choices the default.',
  ],
  metrics: [
    {
      label: 'One source of truth',
      desc: 'Sketch, Zeplin, and InVision consolidated into Figma.',
    },
    {
      label: 'Weekly → monthly spec questions',
      desc: 'Engineers could inspect tokens directly in Figma Dev Mode.',
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
  prev: { label: 'AutoML workflow redesign', href: '/work/automl' },
  next: {
    label: 'Campaign performance dashboard',
    href: '/work/campaign',
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
  eyebrow: 'Designing with AI Agents',
  title: 'Designing a human–AI content production system',
  tags: ['Agentic workflows', 'Human-in-the-loop AI', 'AI product design'],
  meta: [
    { label: 'Project', value: 'Museum of Children’s Books (self-initiated)' },
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
  prev: { label: 'Audience filter editor', href: '/work/filters' },
  next: { label: 'AutoML workflow redesign', href: '/work/automl' },
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

const campaign: CaseStudyContent = {
  eyebrow: 'Campaign performance dashboard',
  title:
    'Redesigning Kahuna’s campaign dashboard so marketers could find the insight, not just the numbers',
  tags: [],
  meta: [
    { label: 'Company', value: 'Kahuna' },
    { label: 'Industry', value: 'Marketing analytics, B2B SaaS' },
    { label: 'Role', value: 'UX Designer' },
    {
      label: 'Scope',
      value: 'Research, IA, data viz, interaction, visual design',
    },
    { label: 'Team', value: 'Product, Design, Engineering' },
  ],
  heroCompact: true,
  tldr: [
    'I redesigned Kahuna’s campaign performance dashboard so marketers could answer “is this campaign working?” without drowning in metrics, inconsistent toggles, or a filter bar that ate the first two rows of the screen.',
    'Research with 13 campaign managers and marketing heads shaped a left-rail filter, a smaller set of high-level KPIs, and a visualization model that could add channels without splitting the story across charts.',
  ],
  metrics: [],
  heroImage: {
    label: '[ kahuna/final-trend.png — redesigned trend view ]',
    caption:
      'The redesigned performance overview: outcome tiles first, a comparable trend chart, and filters that stay visible on the left.',
    img: '/images/kahuna/final-trend.png',
    alt: 'Kahuna Analyze Messages dashboard in trend view, with a left filter rail, KPI tiles, and a multi-metric line chart',
    ratio: '2550 / 1524',
    fit: 'cover',
  },
  heroImageFirst: true,
  involvement:
    'I led UX for the campaign performance dashboard — research synthesis, information architecture, data visualization, and visual design — partnering with product and front-end engineering. Tara led development; David was the senior designer on the team; Justin oversaw the project.',
  prev: { label: 'Analytics design system', href: '/work/dotds' },
  next: { label: 'Audience filter editor', href: '/work/filters' },
  chapters: [
    {
      heading: 'The context',
      body: [
        'Campaign managers send campaigns to onboard new users, drive engagement, or retain people who are slipping away. After launch, they need to know whether delivery is on track and whether the campaign is actually working.',
        'My goal was a campaign performance dashboard that made those insights easy to find — not a wall of numbers that required a specialist to interpret.',
      ],
      conflict: {
        label: 'Design challenge',
        text: 'Design a performance surface that leads with decisions, stays scannable as Kahuna adds channels, and keeps the selected filters in view — so marketers can move from “is this working?” to “what should we change?” without fighting the UI.',
      },
    },
    {
      kicker: '01 — The problem',
      heading: 'The dashboard was hard to read and harder to trust',
      body: [
        'Customer feedback clustered around two issues: confusing interaction, and missing or poorly presented KPIs. Some tiles were static and some were toggles, with no visual distinction. Channels were icons. Split charts made it difficult to compare an overall trend. Finding a specific campaign meant scrolling an infinite list. Date range ate the first two rows.',
      ],
      figures: [
        {
          label: '[ kahuna/problem-current.png — annotated legacy dashboard ]',
          caption:
            'The existing Campaign Performance dashboard, annotated with the five issues that kept coming up in customer feedback.',
          img: '/images/kahuna/problem-current.png',
          alt: 'Legacy Kahuna Campaign Performance dashboard with numbered callouts on KPI tiles, split charts, campaign list, and date range',
          ratio: '2880 / 2112',
          fit: 'contain',
          bg: 'gradient',
        },
      ],
      list: {
        title: 'What was breaking down',
        items: [
          'KPI tiles mixed static cards with hidden toggles — new users did not know what they could click.',
          'Channel icons were hard to recognize, especially once more than a couple of channels were in play.',
          'Splitting channels into separate charts made it difficult to compare and read the overall trend.',
          'An infinite-scroll campaign list made a specific campaign hard to find.',
          'Date range and filter controls took too much vertical space before any insight appeared.',
        ],
      },
    },
    {
      kicker: '02 — Research',
      heading: 'What campaign managers and marketing heads actually needed to see',
      body: [
        'To understand how marketers monitored a campaign, and where the current workflow failed them, we interviewed six campaign managers and seven heads of marketing.',
      ],
      quote: {
        text: 'We have different goals for different campaigns, but I mostly care about the conversion rate.',
        who: 'Head of Marketing',
      },
      figuresRow: true,
      figures: [
        {
          label: '[ kahuna/persona-campaign-manager.jpg ]',
          caption:
            'Catherine, Campaign Manager — she analyzes campaigns in aggregate, then dives into the data to test hypotheses for the next one.',
          img: '/images/kahuna/persona-campaign-manager.jpg',
          alt: 'Persona sheet for Catherine Morgan, Campaign Manager',
          ratio: '3492 / 2628',
          fit: 'contain',
          bg: 'white',
        },
        {
          label: '[ kahuna/persona-head-of-marketing.jpg ]',
          caption:
            'Daniel, Head of Marketing — he watches high-level engagement, goals, and conversion, then maps the trend back to business strategy.',
          img: '/images/kahuna/persona-head-of-marketing.jpg',
          alt: 'Persona sheet for Daniel, Head of Marketing',
          ratio: '3492 / 2628',
          fit: 'contain',
          bg: 'white',
        },
      ],
      summary: [
        {
          name: 'Campaign Manager',
          text: 'Needs aggregate and detailed metrics, then uses past-campaign data to form hypotheses for the next send.',
        },
        {
          name: 'Head of Marketing',
          text: 'Needs high-level engagement, goals, and conversion — and a trend that can be presented to the executive team.',
        },
      ],
      list: {
        title: 'Key findings',
        items: [
          'Both audiences care about the numbers — the disagreement is which numbers, and at what altitude.',
          'Heads of marketing read high-level metrics and trend to set strategy.',
          'Campaign managers watch delivery, test hypotheses, and judge whether the campaign is effective.',
        ],
      },
    },
    {
      kicker: '03 — Design goals',
      heading: 'Simplify the interaction, then make it scale',
      body: [
        'Kahuna planned to offer more channels. The current interface could not absorb that growth. We used the research, the existing pain points, and that business constraint to prioritize what to fix first.',
      ],
      decisionsTitle: 'What we set out to improve',
      decisions: [
        {
          num: '01',
          name: 'Remove hidden interaction',
          text: 'Eliminate togglable KPI tiles and other controls that looked static until someone happened to click them.',
        },
        {
          num: '02',
          name: 'Give filters a real home',
          text: 'Clean up and relocate date range and filter selection so they no longer consumed the first two rows of the dashboard.',
        },
        {
          num: '03',
          name: 'Make the campaign list searchable',
          text: 'Replace infinite scroll with a list people could scan, search, and keep in context.',
        },
        {
          num: '04',
          name: 'Design for more channels',
          text: 'Build a layout and KPI model that could add SMS — and whatever came next — without splitting the story across charts.',
        },
      ],
    },
    {
      kicker: '04 — Filter placement',
      heading: 'Where does the filter live?',
      body: [
        'Campaign managers review performance and use it to plan the next send — so they need to know what is currently filtered. On the existing dashboard, those controls took the first two rows.',
        'I sketched three placements, then reviewed them with product managers and the design team.',
      ],
      figures: [
        {
          label: '[ kahuna/problem-filters.png — filters eating the top of the page ]',
          caption:
            'The current screen: date range, type, and channel occupied the first two rows before any KPI or chart appeared.',
          img: '/images/kahuna/problem-filters.png',
          alt: 'Legacy dashboard with date range presets and type and channel checkboxes spanning the top of the page',
          ratio: '1470 / 536',
          fit: 'contain',
          bg: 'gradient',
        },
        {
          label: '[ kahuna/filter-sketch.png — three filter placements ]',
          caption:
            'Early sketches: expand-in-place, a popup panel, and a fixed left rail. The question was not only space — it was whether the selected filters stayed visible.',
          img: '/images/kahuna/filter-sketch.png',
          alt: 'Hand-drawn sketches of three dashboard filter placements: accordion, popup, and fixed left panel',
          ratio: '2000 / 1250',
          fit: 'contain',
          bg: 'white',
        },
      ],
      decisionsTitle: 'Three options',
      decisions: [
        {
          num: '01',
          name: 'Expand in place',
          text: 'A filter toggle reveals the panel and pushes content down. It saves space, but the main view jumps, and collapsed filters disappear — people can no longer see what they selected.',
          media: {
            label: '[ kahuna/filter-01.png ]',
            caption: 'Filter options expand as a full-width bar above the KPI row.',
            img: '/images/kahuna/filter-01.png',
            alt: 'Wireframe of a dashboard with a full-width filter bar that pushes KPIs and the chart down',
            ratio: '914 / 848',
            fit: 'contain',
            bg: 'white',
          },
        },
        {
          num: '02',
          name: 'Popup panel',
          text: 'A toggle opens filters as an overlay. It also saves space, but it covers the data, hides the current selection when closed, and sits in a weak spot in the hierarchy — changing a filter affects both KPIs and the chart.',
          media: {
            label: '[ kahuna/filter-02.png ]',
            caption: 'Filter options as a popup over the main content.',
            img: '/images/kahuna/filter-02.png',
            alt: 'Wireframe of a dashboard with a filter popup covering the lower-right of the chart',
            ratio: '457 / 344',
            fit: 'contain',
            bg: 'white',
          },
        },
        {
          num: '03',
          name: 'Fixed left rail',
          text: 'Filters stay on the left. It uses more width, but the selection is always visible, and changing a filter and reading the result happen in the same glance. We shipped this one: hiding filters saved space, but most people preferred to see what they had selected.',
          media: {
            label: '[ kahuna/filter-03.png ]',
            caption: 'A persistent left panel keeps type and channel in view beside the dashboard.',
            img: '/images/kahuna/filter-03.png',
            alt: 'Wireframe of a dashboard with a fixed left filter rail beside KPI tiles and a chart',
            ratio: '457 / 344',
            fit: 'contain',
            bg: 'white',
          },
        },
      ],
    },
    {
      kicker: '05 — KPI tiles',
      heading: 'High-level metrics, not a tile for every channel',
      body: [
        'Across Kahuna’s analytics dashboards, some KPI tiles toggled series on the chart and some did not. Customer Success told us most people never realized the difference.',
        'Scalability made it worse. More channels meant more breakdowns, and some metrics only existed for one channel — unsubscribe for email, for example. Showing every metric as a tile would not hold.',
      ],
      figures: [
        {
          label: '[ kahuna/kpi-inconsistent.png — tiles that look clickable, and aren’t ]',
          caption:
            'On the engagement dashboard, some tiles were static and some were toggles. The interaction was not labeled, so the pattern could not be learned.',
          img: '/images/kahuna/kpi-inconsistent.png',
          alt: 'Audience Engagement dashboard with annotations marking which KPI tiles can toggle the chart and which cannot',
          ratio: '2768 / 840',
          fit: 'contain',
          bg: 'white',
        },
        {
          label: '[ kahuna/kpi-versions.png — tile density explorations ]',
          caption:
            'Iterations: two rows of mixed positive and negative metrics, a horizontal scroller, and the direction we shipped — five high-level tiles with negative metrics grouped as Attritions.',
          img: '/images/kahuna/kpi-versions.png',
          alt: 'Four KPI tile layout explorations, ending with Delivered, Engagement, Responses, Primary Goals, and Attritions',
          ratio: '2562 / 2692',
          fit: 'contain',
          bg: 'white',
        },
        {
          label: '[ kahuna/kpi-toggle.gif — show channel breakdown ]',
          caption:
            'A Show Channels toggle reveals per-channel counts on the tiles without adding a tile per channel. Detail lives on the individual campaign.',
          img: '/images/kahuna/kpi-toggle.gif',
          alt: 'KPI row with a Show Channels toggle revealing Push, In-App, Email, and SMS breakdowns',
          ratio: '2444 / 540',
          fit: 'contain',
          bg: 'white',
        },
      ],
      callout: {
        label: 'What we shipped',
        text: 'Show only high-level KPIs. Bucket negative metrics as Attritions. Use a channel toggle for breakdowns. If someone needs the long tail of metrics, they open the specific campaign.',
      },
    },
    {
      kicker: '06 — Visual design',
      heading: 'One component set, so every analytics view could scale',
      body: [
        'To make the redesign scale beyond this dashboard, I inventoried reusable pieces, standardized color and layout, and cleaned up the rest of the analytics surfaces so they shared one visual language.',
      ],
      figures: [
        {
          label: '[ kahuna/visual-components.png — KPI, legend, and chart pieces ]',
          caption:
            'The component kit: KPI tiles with and without channel breakdown, clickable legends, chart popovers, and a split palette for positive versus negative metrics.',
          img: '/images/kahuna/visual-components.png',
          alt: 'Visual specification for Kahuna KPI tiles, legends, chart popovers, and metric color palette',
          ratio: '3866 / 1972',
          fit: 'contain',
          bg: 'gradient',
        },
        {
          label: '[ kahuna/visual-all-dashboards.png — analytics, aligned ]',
          caption:
            'Applying the same layout, color, and tile language across Kahuna’s analytics dashboards so none of them felt like a one-off.',
          img: '/images/kahuna/visual-all-dashboards.png',
          alt: 'A composite of Kahuna analytics dashboards after visual cleanup',
          ratio: '9414 / 4386',
          fit: 'contain',
          bg: 'gradient',
        },
        {
          label: '[ kahuna/prototype-hifi.png — high-fidelity prototype ]',
          caption:
            'The high-fidelity prototype of Analyze Messages: left-rail filters, five outcome tiles, and a single comparable trend.',
          img: '/images/kahuna/prototype-hifi.png',
          alt: 'High-fidelity Kahuna Analyze Messages prototype in trend view',
          ratio: '2850 / 1412',
          fit: 'contain',
          bg: 'gradient',
        },
        {
          label: '[ kahuna/prototype.mp4 — interactive flow ]',
          title: 'High-fidelity prototype',
          caption:
            'Walking the redesigned dashboard: changing filters, reading the tiles, and moving between trend and list.',
          img: '/images/kahuna/prototype.mp4',
          alt: 'Video walkthrough of the Kahuna campaign performance prototype',
          isVideo: true,
          ratio: '16 / 9',
          fit: 'contain',
          bg: 'gradient',
        },
      ],
    },
    {
      kicker: '07 — Final',
      heading: 'Trend for the story, list for the campaign',
      body: [
        'The shipped dashboard has two complementary views. Trend answers whether performance is moving. List finds a specific campaign and keeps name and status in view while scrolling.',
      ],
      decisionsTitle: 'Key interactions',
      decisions: [
        {
          num: '01',
          name: 'Filters update immediately',
          text: 'Changing type, channel, or date range updates the tiles and chart in place, so the left rail is a control surface rather than a form to submit.',
          media: {
            label: '[ kahuna/interaction-filter.gif ]',
            caption: 'Adjusting filters and watching the dashboard respond without a page reload.',
            img: '/images/kahuna/interaction-filter.gif',
            alt: 'Screen recording of Kahuna dashboard filters updating KPI tiles and the chart immediately',
            ratio: '600 / 307',
            fit: 'contain',
            bg: 'white',
          },
        },
        {
          num: '02',
          name: 'Legend, chart, and KPI stay linked',
          text: 'Clicking a legend shows or hides the series. Hovering the chart lights the matching KPI top bar, so the relationship between tile and line is visible rather than implied.',
          media: {
            label: '[ kahuna/interaction-chart.gif ]',
            caption: 'Legend clicks and chart hover highlighting the related KPI tile.',
            img: '/images/kahuna/interaction-chart.gif',
            alt: 'Screen recording of chart hover and legend interaction lighting the matching KPI top bar',
            ratio: '600 / 399',
            fit: 'contain',
            bg: 'white',
          },
        },
        {
          num: '03',
          name: 'A list that stays oriented',
          text: 'The campaign table pins header, name, and status, so scrolling through hundreds of campaigns does not lose the row you were trying to compare.',
          media: {
            label: '[ kahuna/interaction-list.gif ]',
            caption: 'Campaign list view with a fixed header, name, and status column.',
            img: '/images/kahuna/interaction-list.gif',
            alt: 'Screen recording of the Kahuna campaign list with sticky header and status while scrolling',
            ratio: '600 / 472',
            fit: 'contain',
            bg: 'white',
          },
        },
      ],
      figuresRow: true,
      figures: [
        {
          label: '[ kahuna/final-trend.png — trend view ]',
          caption: 'Trend view — outcome first, then a comparable chart across channels.',
          img: '/images/kahuna/final-trend.png',
          alt: 'Final Kahuna campaign dashboard in trend view',
          ratio: '2550 / 1524',
          fit: 'contain',
          bg: 'gradient',
        },
        {
          label: '[ kahuna/final-list.png — list view ]',
          caption: 'List view — find a campaign, keep status in view, expand a cross-channel row for detail.',
          img: '/images/kahuna/final-list.png',
          alt: 'Final Kahuna campaign dashboard in list view with a sortable campaign table',
          ratio: '2880 / 1720',
          fit: 'contain',
          bg: 'gradient',
        },
      ],
      resolution:
        'The redesign gave marketers a performance surface they could scan: filters they could see, KPIs they could trust, and a path from business outcome down to a single campaign — without waiting for Kahuna to stop adding channels.',
    },
  ],
}

const filters: CaseStudyContent = {
  eyebrow: 'Audience filter editor',
  title:
    'Turning AND/OR audience logic into blocks marketers could build without SQL',
  tags: [],
  meta: [
    { label: 'Company', value: 'Kahuna' },
    { label: 'Industry', value: 'Marketing analytics, B2B SaaS' },
    { label: 'Role', value: 'UX Designer' },
    {
      label: 'Scope',
      value: 'Research, interaction, prototyping, engineering pairing',
    },
    { label: 'Team', value: 'Product, Design, Engineering' },
  ],
  heroCompact: true,
  tldr: [
    'I redesigned Kahuna’s segment filter editor so marketers could compose nested AND/OR audiences in the campaign flow — without dropping into SQL, and without a wizard whose colors, icons, and edit rules they could not trust.',
    'Competitive analysis and internal tests pushed us toward a block model: a group is a group, AND/OR can sit inside or between blocks, and a Done action collapses the set into plain English with the relationship drawn as a tree.',
  ],
  metrics: [],
  heroImage: {
    label: '[ filter/hero.jpg — nested AND/OR blocks ]',
    caption:
      'The redesigned editor: searchable event and attribute rows, AND/OR between and inside groups, and a Done action that collapses a block into a sentence.',
    img: '/images/filter/hero.jpg',
    alt: 'Kahuna segment filter editor showing nested Brand and Price conditions with AND and OR connectors',
    ratio: '2348 / 1163',
    fit: 'cover',
  },
  heroImageFirst: true,
  involvement:
    'I led the interaction redesign — competitive analysis, prototyping, and iteration with product and internal marketers — then paired with a front-end engineer to specify the micro-interactions for implementation.',
  prev: { label: 'Campaign performance dashboard', href: '/work/campaign' },
  next: { label: 'Designing with AI Agents', href: '/work/museum' },
  chapters: [
    {
      heading: 'The context',
      body: [
        'When a marketer creates a campaign, they have to name the people it is for — by demographics, product behavior, user attributes, or a mix. That definition lived in the segment filter editor, inside the campaign-creation flow.',
        'My goal was to rethink the workflow and the interaction so targeting the right group did not require a specialist.',
      ],
      conflict: {
        label: 'Design challenge',
        text: 'Give marketers a way to build nested AND/OR segments in place — including groupings most tools could not express — without sending them to a SQL editor they did not know how to use.',
      },
    },
    {
      kicker: '01 — The problem',
      heading: 'Anything beyond AND meant writing SQL',
      body: [
        'The in-flow editor only supported AND once a marketer added more than two criteria: people who match A and B. OR, or anything nested, meant leaving the campaign and writing the logic directly in the filter editor. Most marketers did not know how to write that script.',
        'Without a flexible segment, campaigns spoke to the wrong people — and engagement dropped.',
      ],
      figures: [
        {
          label: '[ filter/problem-workflow.png — the current filter wizard ]',
          caption:
            'The existing editor was a colored wizard: Event → Function → Operator → Value. Each step was a new screen, and the Libra icon for dynamic parameters was easy to miss.',
          img: '/images/filter/problem-workflow.png',
          alt: 'Seven-step Kahuna filter wizard showing event, function, operator, and value selection with colored breadcrumbs',
          ratio: '6098 / 3468',
          fit: 'contain',
          bg: 'gradient',
        },
      ],
      list: {
        title: 'What Customer Success kept hearing',
        items: [
          'Confusing navigation — it was unclear what event, function, operator, and value each meant.',
          'Inconsistent interaction — some steps let you change a value after choosing it; others did not.',
          'Wrong use of color — red and yellow were meant as highlights, but people read them as errors.',
          'An invisible power feature — the Libra icon created a dynamic segment without multiple campaigns, and most people never noticed it.',
        ],
      },
    },
    {
      kicker: '02 — Research',
      heading: 'What other editors allowed — and where they stopped',
      body: [
        'I looked at how competing platforms structured filter logic, to see which interactions felt clear and which common cases they still could not express.',
      ],
      decisionsTitle: 'Competitive notes',
      decisions: [
        {
          num: '01',
          name: 'Appboy — clear blocks, limited grouping',
          text: 'Intuitive structure, drag-and-drop reorder, and an estimated audience size. AND/OR existed, but OR only inside a block and AND only between blocks — so (A and B) or (C and D) was impossible.',
          media: {
            label: '[ filter/competitive-appboy.png ]',
            caption: 'Appboy’s segment filters: an OR group with a reachable-user estimate underneath.',
            img: '/images/filter/competitive-appboy.png',
            alt: 'Appboy Segment Details with an OR filter group and total reachable users estimate',
            ratio: '2030 / 1056',
            fit: 'contain',
            bg: 'white',
          },
        },
        {
          num: '02',
          name: 'Leanplum — reads as a sentence, AND only',
          text: 'Multiple values in one criterion, and the criteria formed a sentence as you built them. More than two different criteria still collapsed to AND.',
          media: {
            label: '[ filter/competitive-leanplum.png ]',
            caption: 'Leanplum’s filter reads as a sentence, with extra values added inside a single criterion.',
            img: '/images/filter/competitive-leanplum.png',
            alt: 'Leanplum Users filter reading All Users WHERE First-time users AND City is San Francisco',
            ratio: '2376 / 748',
            fit: 'contain',
            bg: 'white',
          },
        },
      ],
    },
    {
      kicker: '03 — Observation',
      heading: 'Grouping is the product, not a detail',
      body: [
        'Once AND and OR sit in the same filter, grouping changes the result. (A and B) or (C and D) is not the same as A and (B or C) and D — and most platforms could not express the first.',
        'A typical case: (Favorite Brand is Nike and Price is under 50) or (Favorite Brand is Adidas and Price is under 60). After talking it through with product, we decided to let people place AND/OR anywhere, not only in a prescribed nest.',
      ],
      figures: [
        {
          label: '[ filter/logic.png — two ways to group the same letters ]',
          caption:
            'The same four criteria, two groupings, two audiences. The editor had to make that difference visible, not just possible.',
          img: '/images/filter/logic.png',
          alt: 'Hand-lettered comparison of (A and B) or (C and D) versus A and (B or C) and D',
          ratio: '1549 / 154',
          fit: 'contain',
          bg: 'gradient',
        },
      ],
      callout: {
        label: 'Design decision',
        text: 'Open the flexibility: AND and OR can be added inside a block or between blocks, so marketers can describe the grouping they actually mean.',
      },
    },
    {
      kicker: '04 — Ideation',
      heading: 'A block should feel like a group',
      body: [
        'I prototyped two directions and tested them with product managers and internal marketers. Solution 1 won: a block meant a group, and AND/OR could be added inside or outside it. Solution 2 put too many options on the first screen — people stalled.',
      ],
      decisionsTitle: 'Two prototypes',
      decisions: [
        {
          num: '01',
          name: 'Blocks as groups',
          text: 'A card is a group. + AND / + OR inside the card nest; the same actions below the card add a sibling. Testers read the structure without a tutorial.',
          media: {
            label: '[ filter/idea-01.gif ]',
            caption: 'Solution 1 — a group card with nested AND/OR and sibling AND/OR underneath.',
            img: '/images/filter/idea-01.gif',
            alt: 'Prototype of a filter group card with AND and OR actions inside and below the block',
            ratio: '470 / 520',
            fit: 'contain',
            bg: 'white',
          },
        },
        {
          num: '02',
          name: 'A canvas with Add Filter / Add Group',
          text: 'A global AND/OR toggle plus separate buttons to add a filter or a nested group. More complete on paper, too many starting moves in the test.',
          media: {
            label: '[ filter/idea-02.gif ]',
            caption: 'Solution 2 — an empty canvas with AND/OR in the header and Add Filter / Add Group.',
            img: '/images/filter/idea-02.gif',
            alt: 'Prototype of an empty filter canvas with AND OR toggle and add filter or add group buttons',
            ratio: '470 / 522',
            fit: 'contain',
            bg: 'white',
          },
        },
      ],
    },
    {
      kicker: '05 — Iteration',
      heading: 'Collapse the block so the tree can be read',
      body: [
        'Once a segment got deep, the nested fields were hard to scan. Connecting lines between the first two criteria and the third were easy to miss. I ran several rounds with product on how a finished group should look.',
      ],
      figures: [
        {
          label: '[ filter/iteration-open.png — everything open at once ]',
          caption:
            'A fully expanded nest. The logic is there, but the grouping is easy to lose — especially the line that separates the first pair from the third criterion.',
          img: '/images/filter/iteration-open.png',
          alt: 'Fully expanded nested filter with AND and OR connectors and multiple property rows open',
          ratio: '891 / 703',
          fit: 'contain',
          bg: 'white',
        },
        {
          label: '[ filter/collapse-01.png — iteration v1, brackets ]',
          caption:
            'v1 previewed the filter as nested parentheses. Feedback: hard to jump from preview back to the right row, and brackets did not show structure.',
          img: '/images/filter/collapse-01.png',
          alt: 'Iteration v1 with edit mode on the left and a parenthesis-heavy preview on the right',
          ratio: '1981 / 1330',
          fit: 'contain',
          bg: 'white',
        },
        {
          label: '[ filter/collapse-02.png — iteration v2, sentences ]',
          caption:
            'v2 converted each row to plain English. Helpful, but still unclear that the logic was A or (B and C).',
          img: '/images/filter/collapse-02.png',
          alt: 'Iteration v2 collapsing filter rows into underlined plain-English sentences',
          ratio: '1980 / 1330',
          fit: 'contain',
          bg: 'white',
        },
        {
          label: '[ filter/collapse-03.png — iteration v3, Done plus a tree ]',
          caption:
            'v3: a Done button inside the block. Completing a set collapses it to plain English, with lines that draw the relationship. Testers could finally see the structure.',
          img: '/images/filter/collapse-03.png',
          alt: 'Iteration v3 showing a Done click collapsing an edit block into a tree of plain-English criteria',
          ratio: '1981 / 1330',
          fit: 'contain',
          bg: 'white',
        },
      ],
      callout: {
        label: 'What we shipped',
        text: 'Edit one block at a time. Hit Done, and the set collapses to a sentence with a visible tree. A pencil opens that block again without unfolding everything else.',
      },
    },
    {
      kicker: '06 — Interaction',
      heading: 'The small behaviors that made the model usable',
      body: [
        'The structure only held if the micro-interactions were tight. These three were the ones testers felt most.',
      ],
      decisionsTitle: 'Key interactions',
      decisions: [
        {
          num: '01',
          name: 'Edit one block at a time',
          text: 'Done or the pencil collapses the current block into plain English so the rest of the tree stays readable while you work.',
          media: {
            label: '[ filter/interaction-edit.gif ]',
            caption: 'Opening a block to edit, then collapsing it back to a sentence.',
            img: '/images/filter/interaction-edit.gif',
            alt: 'Filter editor collapsing an edited block into a plain-English summary',
            ratio: '600 / 415',
            fit: 'contain',
            bg: 'white',
          },
        },
        {
          num: '02',
          name: 'Validate on blur',
          text: 'Clicking outside the block runs validation, so incomplete rows surface before the marketer thinks the segment is done.',
          media: {
            label: '[ filter/interaction-validation.gif ]',
            caption: 'Leaving a block triggers validation on unfinished fields.',
            img: '/images/filter/interaction-validation.gif',
            alt: 'Filter editor validating an incomplete nested property when the cursor leaves the block',
            ratio: '600 / 415',
            fit: 'contain',
            bg: 'white',
          },
        },
        {
          num: '03',
          name: 'Autofocus and autocomplete',
          text: 'Opening Event or attribute puts focus in search immediately, with autocomplete as you type — the old wizard’s four labeled steps, in one field.',
          media: {
            label: '[ filter/interaction-search.gif ]',
            caption: 'Search opens focused, with autocomplete for events and attributes.',
            img: '/images/filter/interaction-search.gif',
            alt: 'Event or attribute dropdown with autofocus search and autocomplete',
            ratio: '600 / 400',
            fit: 'contain',
            bg: 'white',
          },
        },
      ],
    },
    {
      kicker: '07 — Final',
      heading: 'A filter marketers could read back to themselves',
      body: [
        'After the tests, I paired with a front-end engineer on the interaction spec so the nested lines, Done collapse, and validation behaved the same in product as they had in the prototype.',
      ],
      figures: [
        {
          label: '[ filter/collapse-done.png — edit and summary, side by side ]',
          caption:
            'The shipped pattern: build in fields, Done, read the tree. The grouping is visible without parentheses.',
          img: '/images/filter/collapse-done.png',
          alt: 'Side-by-side edit and collapsed summary states of a nested Kahuna segment filter',
          ratio: '1831 / 703',
          fit: 'contain',
          bg: 'white',
        },
        {
          label: '[ filter/final.mp4 — high-fidelity prototype ]',
          title: 'High-fidelity prototype',
          caption:
            'Building a nested audience: search an attribute, add AND/OR, Done to collapse, keep going.',
          img: '/images/filter/final.mp4',
          alt: 'Video of the Kahuna segment filter editor prototype',
          isVideo: true,
          ratio: '16 / 9',
          fit: 'contain',
          bg: 'gradient',
        },
      ],
      resolution:
        'Marketers could describe the audience they meant — including (A and B) or (C and D) — without writing SQL, and could still read the logic after the block was closed.',
    },
  ],
}

export const caseStudyContent: Record<string, CaseStudyContent> = {
  automl,
  dotds: designSystem,
  museum,
  campaign,
  filters,
}
