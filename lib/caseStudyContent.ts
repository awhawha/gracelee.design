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
  /** Optional one-liner under `decisionsTitle`. */
  decisionsIntro?: string
  /** Horizontal cards, or numbered rows that map to an annotated figure. */
  decisionsLayout?: 'cards' | 'numbered'
  decisions?: {
    num: string
    name: string
    text: string
    /** Optional — decisions can be text-only. */
    media?: CaseMedia
    /** Optional second media, stacked below the first. */
    media2?: CaseMedia
    /** Side-by-side / sliding row of panels. */
    gallery?: CaseMedia[]
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
  involvement?: string
  prev: { label: string; href: string }
  next: { label: string; href: string }
}

const automl: CaseStudyContent = {
  // Matches the Home selected-works card: company kicker + homepage title.
  eyebrow: 'dotData',
  title: 'Simplifying AutoML setup for business analysts',
  // Tags and metric cards are intentionally empty: the rail carries the framing
  // and the Outcomes chapter carries the design-change results.
  tags: [],
  meta: [
    { label: 'Company', value: 'dotData' },
    { label: 'Industry', value: 'Enterprise AI, AutoML platform' },
    { label: 'Role', value: 'Sr Product Designer' },
    {
      label: 'Scope',
      value: 'Research, prototyping, visualization, interaction design',
    },
    { label: 'Team', value: '1 PM, 4 Engineers, 1 Data Scientist' },
    { label: 'Timeline', value: '6 months' },
  ],
  heroCompact: true,
  tldr: [
    'dotData Enterprise is an AutoML platform for business analysts with limited data-science expertise. I redesigned the configuration workflow so they could create and iterate on prediction tasks themselves — reducing reliance on the Data Science team, and making post-training adoption possible.',
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
  prev: { label: 'Audience filter editor', href: '/work/filters' },
  next: { label: 'dotData design system', href: '/work/dotds' },
  chapters: [
    {
      kicker: '01 — The problem',
      heading: 'Trained analysts still could not create a prediction task',
      body: [
        'Setting up a prediction task was split across data sources, use-case setup, and model configuration. People could finish training, then still could not run a task on their own.',
      ],
      decisionsTitle: 'Workflow friction was limiting adoption',
      decisionsLayout: 'cards',
      decisions: [
        {
          num: '01',
          name: 'Low post-training adoption',
          text: 'Fewer than 5 of 50+ trained users created a prediction task independently after training.',
        },
        {
          num: '02',
          name: 'High dependency on expert support',
          text: '4 of 7 existing customers needed ongoing Data Science support; 2 customers had no active users.',
        },
        {
          num: '03',
          name: 'Friction concentrated early in the workflow',
          text: 'Japan CS support tickets from 2022–2023 showed data preparation and task creation accounted for 60% of all feedback (44 of 73 items).',
        },
      ],
    },
    {
      kicker: '02 — Research',
      heading:
        'Unclear actions, unfamiliar terms, and errors that arrived too late',
      body: [
        'To find where people got stuck, I interviewed four data scientists on the US team. They supported the seven existing customers directly — acting as customer support — so they were the closest proxy for how the product was actually used. Each conversation walked a customer’s pain points, how the DS team currently worked around the setup, and where a business analyst still needed them to step in.',
        'Separately, I analyzed customer feedback Japan CS had logged as support tickets from 2022 to 2023. 60% of that feedback (44 of 73 items) sat in data preparation and task creation. Three struggles showed up again and again.',
      ],
      decisionsLayout: 'cards',
      decisions: [
        {
          num: '01',
          name: 'Unclear actions',
          text: 'People could not tell what to do next. “The upload and import buttons are confusing. I don’t know what’s my next step.”',
        },
        {
          num: '02',
          name: 'Unfamiliar terminology',
          text: 'Data-science language appeared before they had a first successful run. “What does using the target as a source mean? How does it affect the task?”',
        },
        {
          num: '03',
          name: 'Feedback came too late',
          text: 'Mistakes only showed up after an experiment ran. “I want to see a warning when I make a mistake while connecting tables.”',
        },
      ],
    },
    {
      kicker: '03 — Diagnosis',
      heading: 'Three disconnected pages hid the cost of every decision',
      body: [
        'The issue was not simply that setup happened across three pages. Each page asked Business Analysts to make a data decision without enough context to understand its downstream effect. They could not see how target selection, table relationships, and time settings worked together; they learned about invalid choices only after a run; and advanced controls appeared before they had built a working mental model.',
        'The design challenge was to make a technically connected workflow understandable and recoverable without hiding the controls people needed to trust their model setup.',
      ],
      overview: {
        label: '[ automl/old-design.png — the existing task screen ]',
        caption:
          'The existing task-creation screen, annotated to the three structural failures below.',
        img: '/images/automl/old-design.png',
        alt: 'Annotated legacy AutoML task screen marking 1 fragmented configuration, 2 errors after run, and 3 advanced settings appearing too early',
        ratio: '3304 / 1750',
        fit: 'contain',
        bg: 'gradient',
      },
      decisionsLayout: 'numbered',
      decisions: [
        {
          num: '1',
          name: 'Configuration was fragmented across three dense pages',
          text: 'Users had to configure data, targets, and relationships in separate views, without seeing how those decisions affected one another.',
        },
        {
          num: '2',
          name: 'Errors surfaced after running an experiment',
          text: 'There was no way to validate the setup incrementally, so every iteration was expensive.',
        },
        {
          num: '3',
          name: 'Advanced configuration appeared too early',
          text: 'Unfamiliar terminology and advanced settings showed up before anyone could complete a first experiment.',
        },
      ],
    },
    {
      kicker: '04 — Explorations',
      heading: 'Put the training table at the center of the experience',
      body: [
        'Two decisions shaped the system. I started from how users think about the work, not how the pipeline processes it.',
        'Every wizard step was configuring the same flat training table. So I asked: why isn’t that table the center of the experience?',
      ],
      beforeAfter: {
        before: {
          img: '/images/automl/wizard.png',
          alt: 'Wizard flow for selecting a target table, with stepped navigation for target table, target column, source tables, and advanced configuration',
          label: 'Wizard',
        },
        after: {
          img: '/images/automl/canvas.png',
          alt: 'Canvas workspace with a target table card, a live data preview, and a configure-target panel on the right',
          label: 'Canvas',
        },
        caption:
          'A wizard was faster for a first-time, linear path — but it hid relationships, and a mistake meant starting over. The canvas was chosen because it matches how users think about the task: the table is the object, and relationships stay visible while they configure, validate, and come back.',
      },
      overview: {
        label: '[ automl/table-selection-iteration.png — table context range ]',
        caption:
          'v1 name only → v4 list → v7 list + preview → Final combine. The range I was deciding across, not the only mocks.',
        img: '/images/automl/table-selection-iteration.png',
        alt: 'Four table-selection explorations labeled v1, v4, v7, and Final, moving from a name-only canvas control to a combined list and preview',
        ratio: '5034 / 958',
        fit: 'contain',
        bg: 'gradient',
      },
      decisionsTitle: 'How much table context is enough?',
      decisionsIntro:
        'One of the main challenges was how to add tables to the canvas easily, but with enough context. I tried several versions to find the least context people still needed to pick the right table.',
      decisionsLayout: 'cards',
      decisions: [
        {
          num: '01',
          name: 'Name only',
          text: 'v1. Lowest noise, but users could not judge whether they had the right table.',
        },
        {
          num: '02',
          name: 'Name plus selected fields, click to preview',
          text: 'v4. Extra context, but the sample data still sat one click away — easy to skip when someone was already unsure of the next step.',
        },
        {
          num: '03',
          name: 'Combine selection and preview',
          text: 'Final, shipped. Choosing a table and seeing its schema and sample data happened together, so people could confirm they had the right data before they connected anything.',
        },
      ],
    },
    {
      kicker: '05 — The solution',
      heading: 'One canvas, four interactions that made it self-serve',
      body: [
        'The canvas is the container. These four interactions are what made it usable for non-experts.',
      ],
      overview: {
        label: '[ automl/after-redesign.png — the guided flow ]',
        caption:
          'The same decisions on one surface — three separate setup workflows became a single flow users can move through, validate, and return to.',
        img: '/images/automl/after-redesign.png',
        alt: 'The redesigned flow — one guided setup with target definition and table relationships visible together',
        ratio: '5760 / 3380',
        fit: 'contain',
        bg: 'gradient',
      },
      decisions: [
        {
          num: '01',
          name: 'A guided, end-to-end task-creation flow',
          text: 'One surface takes people from selecting tables to a runnable experiment. Next actions stay obvious; later steps stay in view instead of locked behind a wizard.',
          media: {
            label: '[ automl/end-to-end.mp4 — guided task creation ]',
            caption:
              'Walking the full setup on one canvas, from adding tables to a runnable experiment.',
            img: '/images/automl/end-to-end.mp4',
            alt: 'Screen recording of the guided AutoML task-creation flow on the canvas',
            isVideo: true,
            ratio: '2124 / 1376',
            fit: 'contain',
            bg: 'gradient',
          },
        },
        {
          num: '02',
          name: 'Pre-run validation and recovery',
          text: 'Running an experiment first checks the setup. If something is wrong, execution stops and the UI names the fix — not a failure after compute.',
          media: {
            label: '[ automl/run-validation.mp4 — pre-run validation ]',
            caption:
              'Validation names what is missing and offers the action that fixes it, instead of failing at run time.',
            img: '/images/automl/run-validation.mp4',
            alt: 'Screen recording of pre-run validation blocking an experiment and showing corrective actions',
            isVideo: true,
            ratio: '2124 / 1376',
            fit: 'contain',
            bg: 'gradient',
          },
        },
        {
          num: '03',
          name: 'Jump to the configuration that needs changing',
          text: 'After a run, users open the exact setting they want to revise instead of clicking through every step again.',
          media: {
            label: '[ automl/edit-er-configuration.mp4 — jump to edit ]',
            caption:
              'Opening a table relationship from the canvas and editing it in place.',
            img: '/images/automl/edit-er-configuration.mp4',
            alt: 'Screen recording of jumping from the canvas into an entity-relationship configuration to edit it',
            isVideo: true,
            ratio: '2124 / 1382',
            fit: 'contain',
            bg: 'gradient',
          },
        },
        {
          num: '04',
          name: 'Contextual configuration panels',
          text: 'Each decision appears where it is meaningful — target definition, table relationships, or advanced time controls — with defaults and inline explanation instead of one giant form.',
          gallery: [
            {
              label: '[ automl/contextual-panel-define-targer.png — define target ]',
              caption:
                'Define target: entity ID and prediction time, explained in the same panel.',
              img: '/images/automl/contextual-panel-define-targer.png',
              alt: 'Define target panel with entity ID chips and an illustrated explanation of prediction time',
            },
            {
              label:
                '[ automl/contextual-panel-relationship.png — table relationships ]',
              caption:
                'Add entity relationship: join keys, time range, and an interactive timeline.',
              img: '/images/automl/contextual-panel-relationship.png',
              alt: 'Add entity relationship panel with table join fields, time-range options, and a historical-data timeline',
            },
            {
              label:
                '[ automl/contextual-panel-advanced-settings.png — advanced settings ]',
              caption:
                'Advanced settings stay available, but they no longer block the first successful run.',
              img: '/images/automl/contextual-panel-advanced-settings.png',
              alt: 'Advanced settings panel for imputation, outlier removal, model algorithms, and resource units',
            },
          ],
        },
      ],
      figures: [
        {
          label: '[ automl/final-canvas.png — the configured workflow ]',
          title: 'The configured canvas',
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
      kicker: '06 — Design system',
      heading: 'Recurring workflow behaviors became shared patterns',
      body: [
        'I extracted list selection, table-card states (default / selected / target / error), and actionable feedback (required / warning / recommended). Those patterns later fed the product design system.',
      ],
      figures: [
        {
          label: '[ automl/design-system.png — workflow patterns ]',
          caption:
            'Selection, table-card, and feedback states, mapped onto the token system used across the product.',
          img: '/images/automl/design-system.png',
          alt: 'Design-system sheet showing list selection, table card states, actionable feedback states, and a token hierarchy',
          ratio: '2120 / 1098',
          fit: 'contain',
          bg: 'gradient',
        },
      ],
    },
    {
      kicker: '07 — Outcomes',
      heading: 'From 20+ configuration actions to 5 guided steps',
      body: [],
      decisionsTitle: 'What changed',
      decisionsLayout: 'cards',
      decisions: [
        {
          num: '01',
          name: 'Fewer configuration actions',
          text: 'Reduced 20+ configuration actions to 5 guided steps.',
        },
        {
          num: '02',
          name: 'Faster iteration',
          text: 'Users could revise one setting and rerun, instead of rebuilding the setup.',
        },
        {
          num: '03',
          name: 'Clearer decisions',
          text: 'Each choice sat next to the table it affected.',
        },
      ],
      list: {
        title: 'What I will measure after customers upgrade',
        items: [
          'Task completion rate',
          'Support requests per customer',
          'Time to first successful experiment',
        ],
      },
    },
    {
      kicker: '08 — What I learned',
      heading: 'Involving engineering early made the canvas possible',
      body: [
        'This was a highly collaborative project. Bringing engineering in early mattered in both directions.',
      ],
      decisionsLayout: 'cards',
      decisions: [
        {
          num: '01',
          name: 'Align on the pain before the solution',
          text: 'Sharing research findings early meant we agreed on the user problems — unclear next steps, unfamiliar terms, errors after the run — before anyone committed to a layout.',
        },
        {
          num: '02',
          name: 'Learn the limits and the possibilities in time to change course',
          text: 'Knowing technical constraints and what was newly possible let me adjust the design quickly, instead of discovering a blocker in handoff.',
        },
        {
          num: '03',
          name: 'Give engineering time to plan the hard change',
          text: 'The canvas was a large architectural shift. Early alignment let engineers plan for it, rather than treating it as a late UI request.',
        },
        {
          num: '04',
          name: 'Ship one flow in slices',
          text: 'This stayed one configuration flow. We did not wait for a perfect canvas: concept and workshop first, then an internal MVP broken into features, then ticketed iteration, then a customer-upgrade release.',
        },
      ],
    },
  ],
}

const designSystem: CaseStudyContent = {
  eyebrow: 'dotData',
  title: 'Creating a token-driven system for product teams',
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
    label: '[ ds/ds-hero.png — the component library ]',
    caption:
      'The component library: buttons, inputs, tabs, and form controls on a shared system surface.',
    img: '/images/ds/ds-hero.png',
    alt: 'Design system component library showing buttons, inputs, tabs, and form controls',
    ratio: '2 / 1',
    fit: 'cover',
  },
  heroImageFirst: true,
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
  eyebrow: 'In a Nutshell Books',
  title: 'Designing a human-in-the-loop AI content workflow',
  tags: [],
  meta: [
    { label: 'Project', value: 'In a Nutshell Books' },
    { label: 'Role', value: 'End-to-end product designer and builder' },
    { label: 'Timeline', value: '3 months' },
    {
      label: 'Scope',
      value:
        'Product strategy, UX/UI, content model, research workflow, frontend, backend, database, and AI workflows',
    },
    {
      label: 'Tools',
      value:
        'Cursor, Claude Code, Claude, Gemini, NotebookLM, Supabase, Vercel, GitHub',
    },
  ],
  link: { label: 'Visit the museum', href: 'https://inanutshellbooks.studio/' },
  heroCompact: true,
  tldr: [
    'In a Nutshell Books is a living personal museum of children’s books. It began after my daughter was born and I started collecting picture books—not only as books to read together, but as objects of illustration, visual storytelling, and creative practice.',
    'Most available book reviews are written for parents and focus on what children can learn. I wanted a different kind of resource: one that could help me understand why an illustrator made particular choices, how a book’s visual language works, and what makes it worth returning to.',
    'Over three months, I designed and built a bilingual collection experience that now includes 65 books, 32 illustrators, and 7 emerging exhibition rooms. As the collection grew, the project evolved from a public-facing museum into an AI-assisted workflow for researching, analyzing, and curating new acquisitions.',
  ],
  metrics: [
    { value: '65', label: 'books' },
    { value: '32', label: 'illustrators' },
    { value: '7', label: 'emerging exhibition rooms' },
  ],
  heroImage: {
    label: '[ museum/in-a-nutshell-books-hero.png — the museum and its collection admin ]',
    caption:
      'The public museum beside the collection admin: Book of the Day on the site, and the book records behind it.',
    img: '/images/museum/in-a-nutshell-books-hero.png',
    alt: 'In a Nutshell Books: the collection admin beside the public Book of the Day on desktop and mobile',
  },
  heroImageFirst: true,
  prev: { label: 'Audience filter editor', href: '/work/filters' },
  next: { label: 'AutoML workflow redesign', href: '/work/automl' },
  chapters: [
    {
      kicker: '01 — The problem',
      heading: 'Researching one picture book deeply is slow and fragmented',
      body: [
        'I used web search, author interviews, publisher pages, museum archives, book reviews, and tools like ChatGPT and NotebookLM. The outputs were often interesting, but difficult to trust, inconsistent in depth, and disconnected from the rest of my collection. I also had to repeatedly copy information between tools and manually check whether a suggested book already existed in the museum.',
      ],
      list: {
        title: 'Two opportunities',
        items: [
          'A public experience: create a better way to browse, read, and return to a growing collection.',
          'A research workflow: turn behind-the-scenes research and acquisition work into a more reliable AI-assisted process.',
        ],
      },
    },
    {
      kicker: '02 — The museum',
      heading: 'Building the museum before adding AI',
      body: [
        'I first focused on the collection experience: browsing books, discovering recent acquisitions, finding illustrators, and reading visual analysis in a format that feels editorial rather than instructional.',
        'As the collection grew, I changed the information architecture in response to my own use.',
      ],
      decisions: [
        {
          num: '01',
          name: 'From a timeline to a searchable collection',
          text: 'A chronological view was attractive at first, but it did not scale with a collection designed to keep growing. I moved toward browsing and search patterns that support discovery across books, illustrators, and exhibition contexts.',
        },
        {
          num: '02',
          name: 'From a split analysis layout to a long-form reading experience',
          text: 'Early AI-generated analyses were short and generic, so a two-column layout felt sufficient. Once I developed deeper, sourced analysis, the content needed more room. I redesigned the book page with a focused hero and a longer editorial reading flow beneath it.',
        },
      ],
      bodyAfter: [
        'The public museum gave the AI workflows a real destination: research was no longer an isolated answer in a chat window; it became material that could be reviewed, structured, and preserved in the collection.',
      ],
      figures: [
        {
          label: '[ museum/hero.png — Book of the Day ]',
          caption:
            'The public reading surface: a focused book hero, then room underneath for a longer editorial analysis.',
          img: '/images/museum/hero.png',
          alt: 'Book of the Day for Where the Wild Things Are, with the cover, bilingual title, and a short prompt to enter the book',
          ratio: '3704 / 1854',
          fit: 'cover',
          bg: 'white',
        },
      ],
    },
    {
      kicker: '03 — The workflow',
      heading: 'Designing a research workflow that earns trust',
      body: [
        'My first attempt was an “AI generate” button in the editor. It could fill factual fields reasonably well, but it produced vague analysis and made it hard to tell which claims were grounded in evidence.',
        'I tried NotebookLM next. The output quality improved when I supplied source material, but the research setup had to be repeated for every book.',
      ],
      figuresRow: true,
      figures: [
        {
          label: '[ museum/experimentA-AI-refill.mp4 — AI generate in the editor ]',
          caption:
            'The first attempt: an AI generate control in the editor. Factual fields filled in; the analysis stayed vague.',
          img: '/images/museum/experimentA-AI-refill.mp4',
          isVideo: true,
          ratio: '16 / 10',
        },
        {
          label: '[ museum/experimentB-NotebookLM.png — NotebookLM ]',
          caption:
            'NotebookLM improved the writing when I supplied sources, but the setup had to be repeated for every book.',
          img: '/images/museum/experimentB-NotebookLM.png',
          alt: 'A NotebookLM notebook used to research a picture book before pasting findings back into the museum',
          ratio: '16 / 10',
          fit: 'contain',
          bg: 'white',
        },
      ],
    },
    {
      heading: 'A reusable /new-book skill',
      body: [
        'The final approach was a reusable /new-book skill. Its goal is not to make every book page sound complete. Its goal is to build a trustworthy draft that a curator can review.',
      ],
      decisionsTitle: 'The workflow',
      decisions: [
        {
          num: '01',
          name: 'Match voice, not facts',
          text: 'The workflow reads my existing writing to align with the museum’s editorial voice. These examples guide tone only; they are never treated as factual evidence.',
        },
        {
          num: '02',
          name: 'Search existing research first',
          text: 'It searches my research notes using the Chinese title, English title, author, and illustrator. Existing observations are given priority.',
        },
        {
          num: '03',
          name: 'Research with an explicit source hierarchy',
          text: 'It prioritizes author interviews, official publishers, museums, research institutions, and award organizations. Retail pages and Wikipedia may support basic bibliographic details, but not analysis or claims about artistic intention.',
        },
        {
          num: '04',
          name: 'Ground every factual claim',
          text: 'Each factual statement added to a draft keeps a source URL. If sources conflict, the workflow marks the item as uncertain instead of choosing a convenient answer.',
        },
        {
          num: '05',
          name: 'Avoid invented visual analysis',
          text: 'If I have not seen a book’s interior pages, the system does not describe a specific spread, composition, or colour decision. If an image resembles a technique, it uses effect-based language rather than claiming an unverified production method.',
        },
        {
          num: '06',
          name: 'Check for duplicates before creating a record',
          text: 'The workflow checks the authenticated collection database, including drafts and unpublished books. If a record already exists, it updates that draft instead of producing a duplicate.',
        },
        {
          num: '07',
          name: 'Keep a human approval step',
          text: 'The output is a draft, not a published page. I review it before the book enters the museum.',
        },
      ],
      bodyAfter: [
        'This changed my relationship with AI. Instead of asking it to write an authoritative interpretation, I designed it to reveal evidence, preserve uncertainty, and make a repeatable research process easier to review.',
      ],
      figures: [
        {
          label: '[ museum/admin-draft.png — a draft awaiting review ]',
          caption:
            'The output of the workflow: a draft in the admin, still unpublished, waiting for a curator to review it.',
          img: '/images/museum/admin-draft.png',
          alt: 'Admin editor showing a picture-book draft with structured analysis cards, not yet published',
          ratio: '1024 / 548',
          fit: 'contain',
          bg: 'white',
        },
      ],
    },
    {
      kicker: '04 — An example',
      heading: 'From a thin recommendation to a grounded book record',
      body: [
        'When I asked the Curatorial Advisor to recommend books similar to Leo Lionni, it returned titles connected by broad stylistic language such as “bright colours” or “cut-paper collage.”',
        'That was not enough. A collector does not only need to know whether a book resembles another book; they need to know why it belongs in this particular collection.',
        'For example, the workflow for Have You Seen My Duckling? identified that an existing draft already existed, corrected the Chinese title, avoided creating an unsupported illustrator record, and prepared a sourced research draft rather than pretending to know unverified details.',
      ],
      list: {
        title: 'Distinctions it preserved',
        items: [
          'It did not claim to have seen specific interior spreads when it had not.',
          'It did not label a material when the source terminology did not match the museum’s taxonomy.',
          'It used the official Caldecott record when it conflicted with an autobiographical date.',
          'It separated documented author intent from visual interpretation.',
        ],
      },
      resolution:
        'The result was not merely a richer page. It was a research trail that could be reviewed, edited, and retained with the collection.',
    },
    {
      kicker: '05 — Curatorial Advisor',
      heading: 'Designing the Curatorial Advisor',
      body: [
        'The Curatorial Advisor helps identify books to consider for the museum and adds selected titles to a review queue.',
        'Its current interface lets me ask for recommendations, inspect brief rationales, select titles, and send them into a draft workflow. This was a meaningful improvement over searching across the web and manually copying suggestions into my database.',
        'Building it exposed an important product limitation: the agent currently receives a thin, flat list of book records—title, year, author, category, and a one-sentence introduction—plus the current conversation. With this limited context, it can reliably identify surface similarities, but it cannot make a strong curatorial argument about what the museum is missing.',
        'The next version should help the curator specify an acquisition lens—such as a missing medium, period, narrative device, illustrator lineage, or exhibition contrast—and show the rationale in a structured way.',
      ],
      quote: {
        text: 'What role could this book play in the collection?',
        who: 'The question the next version should answer, beyond “Which books are similar to Leo Lionni?”',
      },
      list: {
        title: 'Structured rationale',
        items: [
          'What it connects to',
          'What gap it fills',
          'What it would add or challenge',
          'What evidence supports the recommendation',
          'What remains uncertain',
        ],
      },
    },
    {
      kicker: '06 — Validation',
      heading: 'What I have validated',
      body: [
        'A collection-first experience can make deeper picture-book research feel worth preserving.',
        'Structured, sourced drafts are substantially more useful than one-off generated articles.',
        'AI is most useful when it reduces research and duplicate-checking work without hiding uncertainty.',
        'Human review is essential when writing about artistic intention, visual technique, and editorial interpretation.',
        'This project is currently a self-directed, live prototype rather than a tested product for external users.',
      ],
    },
    {
      heading: 'What I would validate next',
      body: [],
      list: {
        title: 'Next',
        items: [
          'Test the Curatorial Advisor with 3–5 picture-book collectors to learn how they define a meaningful “collection gap.”',
          'Add richer collection metadata and an explicit acquisition brief, so recommendations can be justified by curatorial value rather than stylistic similarity.',
          'Bring the research skill into the product workflow, so a curator does not need to switch between the website and an external coding environment.',
          'Test whether parents and collectors value the same forms of analysis, reading guidance, and discovery.',
        ],
      },
    },
    {
      heading: 'Reflection',
      body: [
        'This project taught me that AI-native product design is not about adding a chat interface to an existing workflow.',
        'The harder and more valuable work is deciding what the system may claim, what evidence it needs, where uncertainty should remain visible, and when a person must make the final judgment. I designed In a Nutshell Books as both a museum and a working system: a place to discover children’s books, and a way to research and curate them with more care.',
      ],
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
  prev: { label: 'dotData design system', href: '/work/dotds' },
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
  next: { label: 'AutoML workflow redesign', href: '/work/automl' },
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
