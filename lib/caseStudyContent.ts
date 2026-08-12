// Content for the bespoke "chaptered" case studies (AutoML + Design System).
// These two pages share one layout (ChapteredCaseStudy); only the copy differs.
// Copy is lifted verbatim from the design handoffs. Striped placeholders carry
// the intended asset filename in their label until real exports are dropped in.

export type CaseMedia = {
  /** Mono label shown in the striped placeholder (when no real `img`). */
  label: string
  caption: string
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
  /** Backdrop behind the image. Olive `#d8dac9` by default; white for ch04. */
  bg?: 'olive' | 'white'
}

export type CaseChapter = {
  kicker: string
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
  /** Short feature cards rendered in a two-column grid. */
  features?: { name: string; text: string }[]
  /** Step chips rendered as a `a → b → c` flow strip. */
  flow?: string[]
  decisions?: {
    num: string
    name: string
    text: string
    media: CaseMedia
    /** Optional second media, stacked below the first. */
    media2?: CaseMedia
  }[]
  figures?: CaseMedia[]
  /** Highlighted result box (like `conflict`, but rendered after the body). */
  callout?: { label: string; text: string }
  /** Compact titled list, e.g. "What we continue to measure". */
  list?: { title: string; items: string[] }
  resolution?: string
}

export type CaseStudyContent = {
  eyebrow?: string
  title: string
  tags: string[]
  subhead?: string
  /** Compact hero: title → summary → tags, no eyebrow/subhead/"In short" label. */
  heroCompact?: boolean
  tldr: string
  metrics: { value: string; label: string; desc?: string }[]
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
    { value: '20 → 5', label: 'Configuration steps' },
    { value: '3 → 1', label: 'Screens consolidated into one canvas' },
    { value: '50% faster', label: 'Configuration time in usability testing' },
  ],
  involvement:
    'As Lead Product Designer, I drove the redesign end to end — problem framing, interaction design, prototyping, and usability testing — in close partnership with engineering and PM.',
  next: { label: 'Designing with AI Agents', href: '/work/museum' },
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
      kicker: '03 — The design',
      heading: 'One canvas for decisions and dependencies',
      body: [
        'I replaced the accordion-style flow with a single canvas. Configuration panels keep the work organized, while the canvas makes target tables, source tables, and their relationships visible together.',
      ],
      overview: {
        label: '[ final-canvas.png — the canvas ]',
        caption:
          'Target tables, source tables, and their relationships, visible together on one canvas.',
        img: '/images/automl/final-canvas.png',
        alt: 'The model-design canvas: configuration panel, target table, and relationship lines annotated on one plane',
        ratio: '5760 / 3380',
        fit: 'contain',
        bg: 'white',
      },
      features: [
        {
          name: 'Auto-schema',
          text: 'Suggests a starting schema from sample data.',
        },
        {
          name: 'Auto-connect',
          text: 'Recommends best-practice table relationships so users begin with a workable baseline.',
        },
        {
          name: 'Smart defaults',
          text: 'Prefills advanced settings and suggests time-related columns and prediction targets.',
        },
        {
          name: 'One place to iterate',
          text: 'Users can review, adjust, run, and return to the same canvas.',
        },
      ],
      flow: [
        'Upload tables',
        'Review schema',
        'Select target',
        'Auto-connect',
        'Run',
      ],
    },
    {
      kicker: '04 — Validation',
      heading: 'A confident starting point made the canvas usable',
      body: [
        'Early testing showed that visibility alone was not enough: a blank canvas could still leave users unsure how to proceed. I added guided prompts, recommended connections, and sensible defaults without bringing back the linear wizard.',
      ],
      callout: {
        label: 'The result',
        text: 'Configuration time was reduced by 50% in usability testing.',
      },
      list: {
        title: 'What we continue to measure',
        items: [
          'Time to configure',
          'Unassisted task completion after training',
          'Iteration after a first run',
          'Support tickets and new task creation',
        ],
      },
    },
  ],
}

const designSystem: CaseStudyContent = {
  eyebrow: 'dotData · Enterprise design system',
  title: 'From design debt to design velocity',
  tags: ['Design systems', 'Design ops', 'Design tokens', 'Design–eng workflow'],
  subhead:
    'Rebuilding a fragmented infrastructure into a centralized, token-driven design system that bridges design and engineering — ending years of technical debt.',
  tldr: 'I re-architected a chaotic Sketch + Zeplin + InVision toolchain into a single token-driven Figma ecosystem. A two-tiered library separates product-agnostic primitives from domain-specific logic, and Figma variables map directly to CSS — closing the implementation gap and turning the design system from a source of technical debt into a catalyst for engineering velocity.',
  metrics: [
    {
      value: '1',
      label: 'Single source of truth',
      desc: 'A fragmented Sketch + Zeplin + InVision toolchain consolidated into one Figma ecosystem.',
    },
    {
      value: '2-tier',
      label: 'Scalable architecture',
      desc: 'Studio Foundation (product-agnostic primitives) separated from Studio Components (domain logic).',
    },
    {
      value: 'Zero',
      label: 'Implementation gap',
      desc: 'Hard-coded dimensions replaced with native Auto Layout and semantic tokens mapped 1:1 to CSS variables.',
    },
  ],
  heroImage: {
    label: '[ design-system-1.png + component.png — tokens ↔ code ]',
    caption:
      'The system surface: design tokens and components on one side, the front-end variables they map to on the other.',
    img: '/images/ds/ds-hero-flat.png',
    alt: 'Design tokens mapping to components and front-end variables',
    ratio: '2000 / 1125',
    fit: 'cover',
    bg: 'olive',
  },
  involvement:
    'As the design system owner, I led both the original V1.0 (zero-to-one) and the V2.0 re-architecture — from diagnosing the cross-functional pain points and defining the token logic to structuring the two-tiered library and authoring the contribution rules. I drove this in close partnership with front-end engineering, treating the system as shared infrastructure rather than a design deliverable.',
  next: { label: 'AutoML model design', href: '/work/automl' },
  chapters: [
    {
      kicker: '01 — The evolution & the problem',
      heading: 'A zero-to-one win that became a maintenance trap',
      body: [
        'Two years earlier I led our first design system (V1.0), built in Sketch on Atomic Design principles. It was a genuine zero-to-one success — 50–60% of the team saved development time and worked more effectively.',
        'But as the enterprise suite scaled horizontally, V1.0 revealed a more insidious problem: a toolchain maintenance trap. Work was fragmented across Sketch for design, Zeplin for handoff, and InVision for prototyping, so updating a single component meant a grueling multi-step sync.',
      ],
      quote: {
        text: '“Which spec is the real source of truth for this sprint? Zeplin keeps showing me future iterations.”',
        who: 'Front-end engineers · sprint feedback',
      },
      figures: [
        {
          label: '[ How to update Zeplin spec.pdf — the legacy update flow ]',
          caption:
            'The legacy update flow: a multi-step Sketch → Zeplin → InVision synchronization for every single component change.',
          img: '/images/ds/ch01-legacy-flow-flat.png',
          alt: 'The legacy update flow across Sketch, Zeplin and InVision',
          ratio: '2000 / 785',
          fit: 'cover',
          bg: 'olive',
        },
      ],
    },
    {
      kicker: '02 — The strategy',
      heading: 'Tokenization & technical empathy',
      body: [
        'To win back engineering trust, the new system couldn’t just look good — it had to build well. I scrapped the fragmented workflow and rebuilt the system from scratch around a rigorous design-token logic.',
        'I translated arbitrary hex codes and hard-coded paddings into structured Primitive and Semantic tokens, mapping Figma variable names directly to their CSS counterparts (e.g. --button-primary-bg). When a designer changed a semantic token, engineers immediately understood its global impact on the codebase. I also enforced Figma Auto Layout to mirror Flexbox — an exercise in technical empathy that eliminated the responsive “guessing game” for developers.',
      ],
      overview: {
        label: '[ token reference chain ]',
        caption:
          'The three-tier token chain: a _component token resolves to a semantic token, which resolves to a raw _core value — so changing one semantic token cascades everywhere.',
        img: '/images/ds/ch02-token-chain-flat.png',
        alt: 'Token reference chain: component resolves to semantic resolves to core',
        ratio: '2000 / 878',
        fit: 'cover',
        bg: 'olive',
      },
    },
    {
      kicker: '03 — The architecture',
      heading: 'A two-tiered system built to scale',
      body: [
        'A common enterprise trap is mixing generic UI with complex, product-specific logic. To keep the system scalable, I split the library into two distinct tiers — and authored a Quick Start guide for designers and engineers so it would stay clean as the team grew.',
      ],
      decisions: [
        {
          num: 'i',
          name: 'Studio Foundation',
          text: 'The bedrock: system-level, product-agnostic building blocks — design tokens, primitive buttons, inputs, and layout shells. Stable, reusable across products, and independent of any dataset.',
          media: {
            label: '[ Foundation — tokens, primitives, layout shells ]',
            caption:
              'Studio Foundation: buttons, controls, color and spacing primitives — the product-agnostic blocks shared across every product.',
            img: '/images/ds/ch03-foundation.png',
            alt: 'Studio Foundation — buttons, controls, color and spacing primitives',
            ratio: '2000 / 1200',
            fit: 'cover',
            bg: 'olive',
          },
        },
        {
          num: 'ii',
          name: 'Studio Components',
          text: 'Domain-specific, data-aware patterns — model-analysis panels, entity-relationship tables, and the like. Separating these lets product features iterate fast without risking the core.',
          media: {
            label: '[ Components — data-aware product patterns ]',
            caption:
              'Studio Components: entity-relationship cards, table previews and evaluation charts (confusion matrix, ROC, Lift, prediction distribution) — data-aware patterns built on the foundation.',
            img: '/images/ds/ch03-components.png',
            alt: 'Studio Components — entity-relationship tables, confusion matrix, ROC/Lift, data preview',
            ratio: '2000 / 1200',
            fit: 'cover',
            bg: 'olive',
          },
        },
      ],
    },
    {
      kicker: '04 — The value & outcome',
      heading: 'From bottleneck to catalyst',
      body: [
        'This wasn’t a visual refresh — it was an operational transformation. Migrating to a single, token-driven ecosystem permanently resolved the version-control churn of the Zeplin and InVision days, and the token mapping plus Auto Layout constraints closed the implementation gap. Because every component now carried its own responsive rules, engineers stopped guessing spacing and reflow behavior or pinging design to confirm it — design-to-code drift largely disappeared and handoff stopped being a bottleneck.',
      ],
      figures: [
        {
          label: '[ clean screens.png — the unified UI ]',
          caption:
            'The result: dozens of clean, unified product screens — every experiment flow delivered from one token-driven system.',
          img: '/images/ds/ch04-clean.png',
          alt: 'A unified UI of clean product screens delivered from one token-driven system',
          ratio: '1302 / 1812',
          fit: 'contain',
          bg: 'white',
        },
      ],
      resolution:
        'Today the infrastructure powers the rapid delivery of complex AI-driven features, freeing the team to solve deep user problems instead of arguing over pixel measurements — the design system turned from technical debt into a catalyst for engineering velocity.',
    },
  ],
}

const museum: CaseStudyContent = {
  eyebrow: 'Self-initiated · Museum of Children’s Books',
  title: 'Designing with AI Agents',
  tags: [
    'Agentic Workflows',
    'Human-in-the-Loop AI',
    'Systems Design',
    'Production Tooling',
  ],
  subhead:
    'A human–AI production system for a children’s book museum — combining agentic research and generation with human review and visual validation.',
  tldr: 'I started with a simple question: how far could I take a digital product with AI as a direct design and engineering partner? The harder problem emerged after launch — building a reliable content workflow for research-heavy, open-ended material. After testing AI inside a traditional CMS and a closed knowledge base, I landed on a human-in-the-loop agentic workflow: AI handles research and production, while a visual interface gives me precise control over validation and approval.',
  metrics: [
    {
      value: '0',
      label: 'Hours in Figma',
      desc: 'Every screen designed and iterated directly in code, with AI as a direct collaborator throughout.',
    },
    {
      value: '3',
      label: 'Workflow models tested',
      desc: 'A CMS auto-fill button, a closed knowledge base, then a human-in-the-loop agentic workflow.',
    },
    {
      value: '3',
      label: 'Roles, one pipeline',
      desc: 'Agent, interface, and human — each owns a distinct part of research, generation, and approval.',
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
    'Solo, end to end. I defined the concept, designed and built the product directly in code, ran the AI/CMS workflow experiments, and developed the Claude Code Skills behind the production pipeline. My focus was not just generating content with AI, but designing where automation should act, where human judgment should intervene, and how the two interfaces connect.',
  next: { label: 'Design System', href: '/work/dotds' },
  chapters: [
    {
      kicker: '01 — Origins',
      heading: 'A visual reference for craft, and a constraint experiment',
      body: [
        'Most children’s-book sites are organized around stories and recommendations. I wanted to build something different: a visual reference for illustrators and designers, centered on craft — medium, technique, style, and influence.',
        'The museum also became a constraint experiment: could I design and ship a full product directly in code, with AI not just assisting the process, but participating in it?',
      ],
    },
    {
      kicker: '02 — Process',
      heading: 'Designing directly in code',
      body: [
        'I started conventionally — concepts in a chat with Gemini and Claude, layout exploration in Claude’s design surface — before every idea moved into Claude Code for implementation. What stood out was how much friction lived in the handoff: exporting a layout, describing it again, waiting for code to catch up.',
        'Designing in the browser collapsed much of the usual translation between design and implementation. With the product context, codebase, and working UI in the same environment, design reasoning and implementation became part of one continuous loop, instead of packaging an idea for one tool and unpacking it in another.',
      ],
      overview: {
        label: '[ tool-convergence.png — chat → design surface → code ]',
        caption:
          'For this solo project, AI compressed much of the usual design-to-implementation handoff into a tighter iterative loop.',
        img: '/images/museum/process.png',
        ratio: '1214 / 434',
        fit: 'cover',
        bg: 'white',
      },
    },
    {
      kicker: '03 — The core conflict',
      heading: 'Where AI could be trusted, and where it couldn’t',
      conflict: {
        label: 'The tension',
        text: 'Structured fields were easy for AI to fill in reliably. Open-ended research and interpretation were much harder — and grounding the model in a closed knowledge base improved reliability, but added friction to the workflow.',
      },
      body: [
        'The challenge wasn’t getting AI to generate content. It was deciding when I could trust it, what context it needed, and where human judgment still had to intervene. I ran two experiments to find out.',
      ],
      decisions: [
        {
          num: 'A',
          name: 'Admin AI Refill button',
          text: 'An “AI Refill” button in the ordinary admin form worked well for structured facts — author, year, ISBN — because I could validate them on sight. Pushed toward open-ended analysis of medium and technique, it broke down: hallucinated detail, vague prose, a different answer every run. The prompt was buried in code, too, so tuning it meant a redeploy each time.',
          media: {
            label: '[ admin-ai-refill.png — CMS auto-fill ]',
            caption:
              'Experiment A — AI inside the CMS. Structured metadata was easy to generate and easy to validate in place.',
            img: '/images/museum/experimentA-AI-refill.mp4',
            isVideo: true,
            ratio: '16 / 10',
          },
          media2: {
            label: '[ experimentA-AI-refill-failed.png — open-ended analysis breaks down ]',
            caption:
              'The same pattern broke down with open-ended analysis: the output became harder to verify, less consistent, and more sensitive to prompting.',
            img: '/images/museum/experimentA-AI-refill-failed.png',
            ratio: '1748 / 703',
            fit: 'cover',
            bg: 'white',
          },
        },
        {
          num: 'B',
          name: 'A closed knowledge base',
          text: 'Scoping AI research to a fixed set of sources with NotebookLM cut hallucination sharply, and the analysis read like it came from someone who’d actually done the reading. But it broke the workflow instead: every answer had to be copied out by hand into the CMS, and every new book meant re-uploading the same reference sources from scratch.',
          media: {
            label: '[ notebooklm-workflow.png — the copy-paste break ]',
            caption:
              'Experiment B — Grounding the model in a closed source set improved the research, but created a manual bridge back to the CMS.',
            img: '/images/museum/experimentB-NotebookLM.png',
            ratio: '2736 / 1836',
            fit: 'cover',
            bg: 'white',
          },
        },
      ],
    },
    {
      kicker: '04 — The solution',
      heading: 'From AI feature to agentic workflow',
      conflict: {
        label: 'The bind',
        text: 'One tool couldn’t be trusted with open-ended writing. The other couldn’t be trusted with my time. Neither was going to scale.',
      },
      body: [
        'The breakthrough was treating AI less like a feature inside the CMS and more like an agent operating across the workflow. Instead of filling one field at a time, it could research a book, synthesize findings, generate structured content, pause for human review, and write approved output directly to the database:',
        'Research → Synthesize → Generate structured content → Return for review → Human approval → Write to database.',
        'I implemented this as a custom Claude Code Skill: point it at a book, and it researches medium and technique on the web, returns its findings to the same conversation for me to review, and only writes to Supabase once I approve it. The human-in-the-loop checkpoint stayed intact — it’s just no longer a copy-paste bridge between two disconnected tools.',
        'Because the workflow runs inside the same environment as the codebase and database, it scales across multiple books and specialized tasks without a separate orchestration layer — an illustrator deep-dive skill, and a cover color-palette extractor that names each swatch to match the book’s mood, run alongside the original research skill.',
      ],
      quote: {
        text: '“#D4A373 → the dusk-colored earth of Where the Wild Things Are”',
        who: 'Auto-generated palette caption · cover color-extraction skill',
      },
      resolution:
        'The trade-off is real: this only works if you’re comfortable working conversationally instead of through a visual interface, and letting AI act directly on a live codebase and database means access control has to be designed in from the start — not added later.',
    },
    {
      kicker: '05 — The hybrid interface',
      heading: 'LUI to produce, GUI to validate',
      body: [
        'Working this closely with the agent taught me something about what the admin backend is actually for. It doesn’t disappear — its job changes. A conversational interface is where I want ambiguous, wide-reaching work to happen: research, synthesis, naming a whole palette in one pass. Catching a typo, or judging whether a color pairing actually reads right, is a different kind of decision — visual and immediate, in a way a chat window isn’t built for.',
        'The relationship that emerged wasn’t AI versus GUI. It was human ↔ agent ↔ interface, with each one responsible for a different part of the job.',
      ],
      decisions: [
        {
          num: 'i',
          name: 'Agent — exploration & production',
          text: 'Claude Code + Skill acts as researcher and writer: bulk retrieval, structured analysis, and automatic palette naming, pushed straight to the database across as many books, and as many parallel sessions, as I need.',
          media: {
            label: '[ lui-claude-code.png — the skill in action ]',
            caption:
              'Requesting research and analysis for a new book, reviewed inline before anything writes to Supabase.',
          },
        },
        {
          num: 'ii',
          name: 'GUI — judgment & control',
          text: 'The admin screen becomes a real-preview dashboard: open the page, see it rendered as a reader would, click to adjust a word or a color, and give final approval — the last line of defense a chat window can’t replace.',
          media: {
            label: '[ admin-validation-dashboard.png — the final review ]',
            caption: 'The admin screen, now a validation dashboard rather than a writing tool.',
          },
        },
        {
          num: 'iii',
          name: 'Human — intent & accountability',
          text: 'I set the direction, resolve the ambiguity the agent surfaces, and approve anything consequential before it reaches the live database — the agent and the interface do the work, but I stay responsible for it.',
          media: {
            label: '[ approval-checkpoint.png — the human review step ]',
            caption: 'Nothing writes to the database until a person signs off.',
          },
        },
      ],
      quote: {
        text: '“The design problem wasn’t GUI versus LUI. It was deciding which interface should own which job — and designing the handoff between them.”',
        who: 'Central insight',
      },
      resolution:
        'AI agents are strongest at exploration, synthesis, generation, and repetitive production work. Visual interfaces are strongest when someone needs to compare, inspect, correct, and approve. Human judgment stays responsible for intent, ambiguity, and consequential decisions. The most useful version of this product came from designing the handoff between all three — not forcing every task into one interface.',
    },
  ],
}

export const caseStudyContent: Record<string, CaseStudyContent> = {
  automl,
  dotds: designSystem,
  museum,
}
