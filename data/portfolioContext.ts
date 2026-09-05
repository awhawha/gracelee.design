/**
 * GraceLLM knowledge base — the only source the assistant may answer from.
 *
 * To add a project later:
 *  1. Append a `PortfolioProject` to `projects` below (unique `id`).
 *  2. If it has a case-study URL, add that path in `lib/pageContext.ts`.
 *  3. Demo answers and the LLM prompt pick up the new fields automatically.
 */

export type ContextType = 'portfolio' | 'profile' | 'project'

export type PortfolioLink = {
  href: string
  label: string
}

export type EducationEntry = {
  degree: string
  school: string
  dates: string
}

export type PortfolioProfile = {
  name: string
  preferredName: string
  title: string
  yearsExperience: string
  location: string
  summary: string[]
  strengths: string[]
  skills: string[]
  suitableRoles: string[]
  education: EducationEntry[]
  contact: {
    email: string
    linkedin: string
    resume: string
  }
}

export type ExperienceEntry = {
  id: string
  company: string
  role: string
  dates: string
  summary: string
}

export type PortfolioProject = {
  id: string
  title: string
  company: string
  dates?: string
  role: string
  challenge: string
  process: string
  collaboration: string
  impact: string
  tools: string[]
  links: PortfolioLink[]
  relatedProjectIds: string[]
}

export type PortfolioKnowledgeBase = {
  profile: PortfolioProfile
  experience: ExperienceEntry[]
  projects: PortfolioProject[]
}

export const portfolioKb: PortfolioKnowledgeBase = {
  profile: {
    name: 'Ya-Hui (Grace) Lee',
    preferredName: 'Grace',
    title: 'Senior Product Designer',
    yearsExperience: '9+',
    location: 'San Francisco Bay Area',
    summary: [
      'Senior Product Designer with 9+ years of experience, focused on enterprise analytics, data, and AI products.',
      'Turns complex, interdependent workflows into clear, trusted user experiences.',
      'Has an engineering background and works closely with product and engineering.',
    ],
    strengths: [
      'Product strategy for complex systems',
      'Interaction design for dense, interdependent workflows',
      'Information architecture',
      'Data visualization',
      'Design systems and token-driven handoff',
      'Usability testing and user interviews',
    ],
    skills: [
      'Product Strategy',
      'Interaction Design',
      'Information Architecture',
      'Complex Workflows',
      'Data Visualization',
      'Design Systems',
      'Usability Testing',
      'User Interviews',
      'Figma Variables / Dev Mode',
      'HTML/CSS',
      'Claude Code',
    ],
    suitableRoles: [
      'Senior Product Designer',
      'Enterprise / B2B product design roles',
      'Analytics, data platform, and AI product design roles',
      'Design-systems-fluent product design roles',
    ],
    education: [
      {
        degree: 'MFA, Web Design & New Media',
        school: 'Academy of Art University',
        dates: '2013—2016',
      },
      {
        degree: 'BA, Information Management',
        school: 'Tamkang University',
        dates: '2003—2007',
      },
    ],
    contact: {
      email: 'yahuilee0618@gmail.com',
      linkedin: 'https://www.linkedin.com/in/yahuilee/',
      resume: '/images/yahui-grace-lee-resume.pdf',
    },
  },
  experience: [
    {
      id: 'dotdata',
      company: 'dotData',
      role: 'Senior Product Designer',
      dates: '2019—2025',
      summary:
        'Led end-to-end product design for enterprise AutoML and analytics: workflow redesign, design-system architecture, and close collaboration with product and engineering.',
    },
    {
      id: 'kahuna',
      company: 'Kahuna',
      role: 'UX Designer',
      dates: '2016—2018',
      summary:
        'Designed marketing analytics experiences so non-technical marketers could go from business metrics to operational detail, and build advanced targeting without SQL.',
    },
    {
      id: 'wislite',
      company: 'Wislite Technology',
      role: 'Interaction Designer & Software Engineer',
      dates: '2007—2013',
      summary:
        'Built full-stack enterprise applications for banking, credit-review, and education clients. This engineering and data-modeling background still shapes how Grace works with engineering on complex product decisions.',
    },
  ],
  projects: [
    {
      id: 'automl',
      title: 'AutoML workflow redesign',
      company: 'dotData',
      dates: '2019–2025',
      role: 'Led the end-to-end redesign — product strategy, interaction design, testing, and cross-functional collaboration.',
      challenge:
        'The original experience was a fragmented, multi-page setup flow. Users struggled to see data relationships, dependencies, and validation state.',
      process:
        'Redesigned the flow as a guided model-design canvas that brings data relationships, dependencies, and validation into a single workspace. Introduced auto-schema, recommended table connections, sensible defaults, and real-time validation.',
      collaboration:
        'Worked across product and engineering to shape the canvas model, defaults, and validation behavior so business analysts could complete a runnable setup with confidence.',
      impact:
        'Reduced 20+ configuration actions to 5 guided steps. Supported faster iteration. Improved decision clarity.',
      tools: ['Figma', 'Usability testing', 'Prototyping'],
      links: [{ href: '/work/automl', label: 'AutoML case study' }],
      relatedProjectIds: ['dotds', 'kahuna'],
    },
    {
      id: 'dotds',
      title: 'Analytics design system V1 / V2',
      company: 'dotData',
      dates: '2019–2025',
      role: 'Led the V1.0 and V2.0 design-system re-architecture.',
      challenge:
        'Design and engineering handoff was fragmented, without a consistent shared source of truth.',
      process:
        'Built a token-driven Figma library and aligned semantic tokens to front-end CSS variables so design intent and implementation shared one language.',
      collaboration:
        'Partnered with engineering to map semantic tokens to CSS variables and keep the Figma library aligned with the front-end source of truth.',
      impact:
        'Specification-related questions dropped by about 50%.',
      tools: ['Figma', 'Figma Variables', 'Dev Mode', 'CSS variables', 'Design tokens'],
      links: [{ href: '/work/dotds', label: 'Design system case study' }],
      relatedProjectIds: ['automl'],
    },
    {
      id: 'kahuna',
      title: 'Marketing analytics',
      company: 'Kahuna',
      dates: '2016–2018',
      role: 'UX design, research synthesis, and collaboration with front-end engineering.',
      challenge:
        'Marketers needed to trace from high-level business metrics down to operational detail. Non-technical users also struggled to build complex audience targeting.',
      process:
        'Interviewed 13 campaign managers and marketing heads, then redesigned the campaign-performance dashboard around a persistent left-rail filter, a smaller set of high-level KPIs, and negative metrics grouped as Attritions so new channels could be added without splitting the trend. Separately, redesigned the segment filter editor so nested AND/OR logic lived in collapsible blocks — not SQL — after competitive analysis showed most tools could not express (A and B) or (C and D).',
      collaboration:
        'Worked with product, design, and front-end engineering to evaluate filter placements, standardize analytics components, and implement the dashboard and the block-based targeting model.',
      impact:
        'Gave marketers a scannable path from business outcome to a single campaign, and a way to build advanced targeting logic without writing SQL.',
      tools: ['Figma', 'User interviews', 'Data visualization'],
      links: [
        { href: '/work/campaign', label: 'Campaign performance case study' },
        { href: '/work/filters', label: 'Audience filter editor case study' },
      ],
      relatedProjectIds: ['automl', 'dotds'],
    },
    {
      id: 'wislite',
      title: 'Enterprise applications at Wislite Technology',
      company: 'Wislite Technology',
      dates: '2007–2013',
      role: 'Interaction Designer & Software Engineer.',
      challenge:
        'Enterprise clients in banking, credit-review, and education needed full-stack applications with reliable data modeling and interaction design.',
      process:
        'Designed and built full-stack enterprise applications, covering both interaction design and software engineering.',
      collaboration:
        'Worked as a designer-engineer on client applications, which is the foundation for how Grace partners with engineering on complex product decisions today.',
      impact:
        'This engineering and data-modeling background continues to strengthen Grace’s ability to discuss complex product decisions with engineering teams.',
      tools: ['HTML', 'CSS', 'Enterprise application development', 'Data modeling'],
      links: [],
      relatedProjectIds: ['automl', 'dotds'],
    },
  ],
}

export function getPortfolioProject(id: string): PortfolioProject | undefined {
  return portfolioKb.projects.find((project) => project.id === id)
}

export function serializeKnowledgeBase(): string {
  return JSON.stringify(portfolioKb, null, 2)
}
