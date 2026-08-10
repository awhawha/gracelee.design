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
  decisions?: { num: string; name: string; text: string; media: CaseMedia }[]
  figures?: CaseMedia[]
  resolution?: string
}

export type CaseStudyContent = {
  eyebrow: string
  title: string
  tags: string[]
  subhead: string
  tldr: string
  metrics: { value: string; label: string; desc: string }[]
  heroImage: CaseMedia
  chapters: CaseChapter[]
  involvement: string
  next: { label: string; href: string }
}

const automl: CaseStudyContent = {
  eyebrow: 'dotData · AutoML platform',
  title: 'From isolated silos to a unified canvas',
  tags: ['Workflow redesign', 'Complex systems UX', 'Prototyping', 'Enterprise'],
  subhead:
    'Redesigning the enterprise data-import architecture: a fragmented 9-step wizard, rebuilt as a visual canvas.',
  tldr: 'I rebuilt a fragmented, 9-step import wizard into a single visual canvas — collapsing five isolated entry points into one unified flow. The payoff: fewer support tickets, half the time-to-value for enterprise analysts, and far lower long-term engineering maintenance cost.',
  metrics: [
    {
      value: '9 → 1',
      label: 'Consolidated workflow',
      desc: 'A 9-step wizard and five isolated entry points, replaced by one unified canvas.',
    },
    {
      value: '100%',
      label: 'First-attempt success',
      desc: 'Every user imported data unassisted during rigorous prototype validation.',
    },
    {
      value: '#1',
      label: 'Blocker resolved',
      desc: 'Cleared the top source of support tickets and the hidden dependencies slowing engineering.',
    },
  ],
  heroImage: {
    label: '[ case-dataimport_019.png — before / after architecture ]',
    caption:
      'The architecture shift: five isolated entry points (left) collapsed into a single unified canvas flow (right).',
  },
  involvement:
    "As the Lead Product Designer, I drove the full lifecycle — from reframing the systemic problem and segmenting the workflow to defining the cross-product interaction patterns. By using Object-Oriented Design as a cross-functional alignment artifact, I simplified the platform's underlying architecture alongside engineering and PM, establishing a scalable, vision-led foundation for every predictive-intelligence feature that followed.",
  next: { label: 'Museum of Children’s Books', href: '/work/museum' },
  chapters: [
    {
      kicker: '01 — The problem',
      heading: 'The cost of a fragmented mental model',
      body: [
        'dotData lets users build predictive models — but the legacy import flow was the bottleneck. A surge in support tickets and frustrated internal engineers signaled a deep architectural flaw, not a cosmetic one.',
        'The root cause: a rigid 8–9 step wizard split across five isolated entry points. Dependencies were hidden across screens, so one wrong move in step one meant starting over — users were trapped in a linear maze with no view of their data relationships.',
      ],
      quote: {
        text: '“The flow is too complex for me. I have no idea what I am doing — I don’t know where to start.”',
        who: 'Business analysts · user interviews',
      },
      figures: [
        {
          label: '[ Milestone 1.png — legacy 9-step wizard ]',
          caption:
            'The legacy flow: 8–9 fragmented steps across five entry points, with dependencies hidden from view.',
          img: '/images/automl/ch01-wizard.png',
          alt: 'dotData Configure Data Slots — the task creation screen',
          ratio: '2880 / 1690',
          fit: 'cover',
          bg: 'olive',
        },
      ],
    },
    {
      kicker: '02 — The solution',
      heading: 'A paradigm shift to a unified canvas',
      body: [
        'Band-aid UI fixes wouldn’t solve a structural problem. I dismantled the wizard and architected a new experience around one principle: a single unified flow — every object visible, every dependency explicit.',
      ],
      overview: {
        label: '[ Connect tables (auto).png — the canvas ]',
        caption:
          'One visual plane: add tables, define targets, and map relationships from a global vantage point.',
        img: '/images/automl/ch02-canvas.png',
        alt: 'The canvas: define target and map table relationships on one plane',
        ratio: '1441 / 846',
        fit: 'cover',
        bg: 'olive',
      },
      decisions: [
        {
          num: 'i',
          name: 'Every object visible',
          text: 'Users operate from a global view instead of disjointed screens — adding tables, defining targets, and mapping entity relationships on a single plane.',
          media: {
            label: '[ entity-relationship map ]',
            caption:
              'The full data model on one canvas, so users grasp the big picture at a glance.',
          },
        },
        {
          num: 'ii',
          name: 'Connect to surface dependencies',
          text: 'Connecting source and target tables — manually or via intelligent Auto-Connect — brings hidden dependencies to the surface and returns control to the user.',
          media: {
            label: '[ Connect table (Manual).png — linking tables ]',
            caption:
              'Manual or automatic connections make every dependency explicit, cutting cognitive load.',
          },
        },
      ],
    },
    {
      kicker: '03 — Validation',
      heading: 'Navigating “Blank Canvas Syndrome”',
      conflict: {
        label: 'The pushback',
        text: '“Won’t an open canvas leave users with no idea where to even begin?” My team was right to challenge it — and early testing proved the risk was real.',
      },
      body: [
        'Usability testing confirmed the tension: users loved the global visibility, but some didn’t realize tables needed connecting, or struggled to map target labels without prompts.',
      ],
      figures: [
        {
          label: '[ Canvas — User testing.png ]',
          caption:
            'Testing notes: on a free-form canvas, users stalled on choosing a Target and on whether tables needed linking.',
        },
      ],
      resolution:
        'Rather than retreat to the wizard, I scaffolded the canvas — progressive disclosure, stronger guidance for manual connections, and Auto-ER. Users grasped the logic fast, imported on the first attempt, and moved straight into evaluating models: the clarity of a guided experience with the power of a global architecture.',
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
  next: { label: 'AutoML data import', href: '/work/automl' },
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
  eyebrow: 'Side project · Museum of Children’s Books',
  title: 'Trading Figma for Claude Code: a human-AI content pipeline',
  tags: [
    'AI-Driven Design',
    'Prototyping in the Browser',
    'Human-AI Interaction',
    'CMS UX Redesign',
  ],
  subhead:
    'A self-initiated museum of children’s-book illustration, designed and built entirely in code with AI as a design partner instead of Figma.',
  tldr: 'The harder problem came after launch: producing content at the boundary of structured data and open-ended generation. I tested a CMS auto-fill button, then a closed AI knowledge base, before landing on a human-in-the-loop pipeline built in the Claude Code app — and learned the real answer isn’t GUI vs. LUI, but which interface should own which job.',
  metrics: [
    {
      value: '0',
      label: 'Hours in Figma',
      desc: 'Every screen designed and iterated directly in code, with AI as the collaborator instead of a canvas.',
    },
    {
      value: '3',
      label: 'Production models tested',
      desc: 'A CMS auto-fill button, a closed AI knowledge base, then a human-in-the-loop pipeline built in the Claude Code app.',
    },
    {
      value: '2',
      label: 'Interfaces, one pipeline',
      desc: 'A conversational LUI for research and generation, a visual GUI for validation — each doing what it’s built for.',
    },
  ],
  heroImage: {
    label: '[ museum-hero.png — the reading experience ]',
    caption:
      'Museum of Children’s Books: a gallery-first home for illustration craft, designed and built entirely in code.',
  },
  involvement:
    'Solo, end to end: concept, brand, the full web build, and — the real subject of this case study — the production tooling behind it. I designed every screen directly in code with AI as a collaborator, ran the CMS experiments, and built the Claude Code Skills that now generate and validate every book entry.',
  next: { label: 'Design System', href: '/work/dotds' },
  chapters: [
    {
      kicker: '01 — Origins',
      heading: 'A bold experiment: designing without Figma',
      body: [
        'Most children’s-book sites are built for parents choosing bedtime reading. I wanted something different: a home for the craft itself — illustration style, medium, technique — for illustrators and designers who need to reference a book’s visual language, not its plot. That material exists, but it’s scattered across blogs, out-of-print essays, and gallery notes, with nowhere to collect it.',
        'It doubled as a deliberate constraint test. With limited engineering depth and no Figma file, I wanted to see how far one person could take a full digital product with AI as a direct collaborator — from first sketch to shipped interaction — not as an assistant that speeds up a human-led process, but as the primary partner in it.',
      ],
      figures: [
        {
          label: '[ museum-home.png — the exhibition home ]',
          caption:
            'The entrance: artwork-forward, warm, and built for people who care about how the pictures are made.',
        },
      ],
    },
    {
      kicker: '02 — Process',
      heading: 'Do we still need Figma?',
      body: [
        'I started conventionally enough — concepts in a chat with Gemini and Claude, layout exploration in Claude’s design surface — before every idea moved into Claude Code for implementation. What I noticed was how much friction lived in the handoff: exporting a layout, describing it again, waiting for code to catch up.',
        'Claude Code turned out to hold enough context to do both jobs at once — reasoning through the design logic with me in conversation, and generating a working, high-fidelity prototype in the browser I could click through and A/B test immediately. The middle step, the back-and-forth packaging of ideas between tools, just stopped being necessary.',
        'That’s the shift I’d point to: as AI moves from producing static mockups to producing running, interactive code, designing in the browser surfaces technical limits earlier and shrinks the gap between design and engineering — there’s no longer a translation step between the two.',
      ],
      overview: {
        label: '[ tool-convergence.png — chat → design surface → code ]',
        caption:
          'The workflow that converged: concept chat and layout exploration folded into one continuous conversation with Claude Code.',
      },
    },
    {
      kicker: '03 — The core conflict',
      heading: 'Do we still need a traditional CMS backend?',
      conflict: {
        label: 'The question',
        text: '“Structured fields are safe. Open-ended analysis is where AI gets useful — and where it starts to hallucinate.” Two production experiments, each solving half the problem.',
      },
      body: [
        'Populating the museum meant writing about craft: medium, technique, visual influence — content that’s genuinely hard to source and easy for AI to get vague or wrong about. I ran two very different experiments to find out where it could actually be trusted.',
      ],
      decisions: [
        {
          num: 'A',
          name: 'Admin AI Refill button',
          text: 'I added an “AI Refill” button to the ordinary admin form. Type a title, and AI fetches the structured basics — author, year, ISBN. It worked well: the data was factual and low-risk, and because it stayed inside the familiar CMS screen, I could validate and correct it on sight. The moment I pushed it toward deep analysis — medium, technique, artistic lineage — it broke down: hallucinated detail, hollow prose, a different answer every run. The prompt was buried in code, too, so tuning it meant a redeploy every time.',
          media: {
            label: '[ admin-ai-refill.png — CMS auto-fill ]',
            caption:
              'The AI Refill button inside the ordinary admin form — reliable for structured fields, unreliable once analysis got open-ended.',
          },
        },
        {
          num: 'B',
          name: 'A closed AI knowledge base',
          text: 'I tried the opposite approach: scoping AI research to a fixed set of sources — specific sites, videos, official documents — using NotebookLM. Hallucination dropped sharply, and the analysis read like it came from someone who’d actually done the reading. But it broke the workflow instead: good answers had to be copied out by hand, one at a time, across a tab switch, into the CMS — and every new book meant re-uploading the same reference sources from scratch.',
          media: {
            label: '[ notebooklm-workflow.png — the copy-paste break ]',
            caption:
              'High-quality output, stuck behind a manual copy-paste bridge between two disconnected tools.',
          },
        },
      ],
    },
    {
      kicker: '04 — The solution',
      heading: 'A human-AI production line, built on Claude Code + Skill',
      conflict: {
        label: 'The bind',
        text: 'One tool couldn’t be trusted with open-ended writing. The other couldn’t be trusted with my time. Neither the admin button nor the closed knowledge base was going to scale.',
      },
      body: [
        'The fix wasn’t a better GUI — it was leaving the GUI for the Claude Code app itself. I turned the closed-retrieval idea into a custom Skill inside Claude Code: point it at a book, and it researches the book’s medium and technique on the web, returns the findings to the same conversation for me to review, and only writes to Supabase once I approve it. Human-in-the-loop stayed intact; the copy-paste bridge disappeared.',
        'Because the same session holds the full codebase, database access, and every article I’ve already written, tone fixes don’t require touching source code — I just say what’s wrong in plain language and the next output reflects it. And because I’m building on Claude Code’s own session and error-handling model rather than a hand-rolled agent, real production features come for free: multiple sessions running in parallel across different books, and a growing skill tree — an illustrator deep-dive skill, and a cover color-palette extractor that names each swatch to match the book’s mood.',
      ],
      quote: {
        text: '“#D4A373 → the dusk-colored earth of Where the Wild Things Are”',
        who: 'Auto-generated palette caption · cover color-extraction skill',
      },
      resolution:
        'The trade-off is real, and worth stating plainly: this only works if you’re comfortable working conversationally in an app like Claude Code instead of a visual interface, and letting AI operate directly against a live codebase and database means access control has to be designed deliberately from the start — not bolted on once a team is involved.',
    },
    {
      kicker: '05 — The hybrid interface',
      heading: 'LUI to produce, GUI to validate',
      body: [
        'Working this closely with Claude Code + Skill taught me something about what the admin backend is actually for. It doesn’t disappear — its job changes. A conversational interface is where I want ambiguous, wide-reaching work to happen: research, synthesis, naming a whole palette in one pass. But catching a typo, or judging whether a color pairing actually reads right, is a visual, immediate kind of decision — going back and forth in a chat about “the second word in paragraph two” is friction a click-and-edit GUI simply doesn’t have.',
      ],
      decisions: [
        {
          num: 'i',
          name: 'LUI — the production engine',
          text: 'Claude Code + Skill acts as researcher and writer: bulk retrieval, structured analysis, automatic palette naming, pushed straight to the database across as many books, and as many parallel sessions, as I need.',
          media: {
            label: '[ lui-claude-code.png — the skill in action ]',
            caption:
              'Requesting research and analysis for a new book, reviewed inline before anything writes to Supabase.',
          },
        },
        {
          num: 'ii',
          name: 'GUI — the validation layer',
          text: 'The admin screen becomes a real-preview dashboard: open the page, see it rendered as a reader would, click to adjust a word or a color, and give final approval — the last line of defense a chat window can’t replace.',
          media: {
            label: '[ admin-validation-dashboard.png — the final review ]',
            caption: 'The admin screen, now a validation dashboard rather than a writing tool.',
          },
        },
      ],
      quote: {
        text: '“The future of product design isn’t GUI versus LUI. It’s letting the LUI do wide, ambiguous exploration, and the GUI do precise, visual judgment — and designing the seam where a human moves between the two.”',
        who: 'Key takeaway',
      },
      resolution:
        'That seam is the design problem now: not choosing an interface, but deciding, feature by feature, which one earns the job.',
    },
  ],
}

export const caseStudyContent: Record<string, CaseStudyContent> = {
  automl,
  dotds: designSystem,
  museum,
}
