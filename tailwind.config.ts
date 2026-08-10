import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Existing families (kept for the older, orphaned pages)
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-plex-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'monospace'],
        // Portfolio redesign families
        grotesk: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        'mono-ui': ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        // Portfolio redesign tokens (see design_handoff README)
        'pf-ink': '#23201a',
        'pf-body': '#46413a',
        'pf-body-about': '#3c372f',
        'pf-secondary': '#5f594f',
        'pf-muted': '#8c8579',
        'pf-muted-light': '#a39c8f',
        'pf-placeholder': '#adaca6',
        'pf-hairline': '#ebeae6',
        'pf-border': '#e4e2dc',
        'pf-accent': 'oklch(0.47 0.10 131)',
        'pf-accent-dark': 'oklch(0.78 0.12 128)',
        'pf-tag': '#efeeea',
        'pf-chip': '#fafaf8',
        'pf-dark': '#23201a',
      },
      maxWidth: {
        content: '720px',
        wide: '960px',
        hero: '900px',
        pf: '1200px',
      },
      spacing: {
        section: '120px',
      },
      letterSpacing: {
        eyebrow: '0.12em',
      },
      backgroundImage: {
        'pf-stripes':
          'repeating-linear-gradient(135deg,#edece8,#edece8 11px,#f4f3f0 11px,#f4f3f0 22px)',
      },
    },
  },
  plugins: [],
}

export default config
