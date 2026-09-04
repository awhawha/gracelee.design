import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-domine)', 'Georgia', 'serif'],
        sans: ['var(--font-open-sans)', 'system-ui', 'sans-serif'],
        // Legacy `font-mono` (dates, tokens) maps to Open Sans.
        mono: ['var(--font-open-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Values live in styles/tokens.css — change them there.
        // CSS variables so a single :root edit restyles the site.
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        tertiary: 'var(--text-tertiary)',
        surface: {
          primary: 'var(--surface-primary)',
          secondary: 'var(--surface-secondary)',
          tertiary: 'var(--surface-tertiary)',
        },
        accent: {
          primary: 'var(--accent-primary)',
          secondary: 'var(--accent-secondary)',
          tertiary: 'var(--accent-tertiary)',
        },
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
        // Soft cream-to-sage wash exported from Paper (app.paper.design), used
        // as the backdrop behind cut-out case-study screenshots. Pair with the
        // `bg-[#dddfae]` fallback for browsers without oklab conic-gradients.
        'pf-paper':
          'conic-gradient(in oklab from 120.84deg at 43.51% 42.74%, oklab(89.9% -0.017 0.053) 0%, oklab(89% -0.022 0.061) 50%, 88.42%, oklab(87.8% -0.024 0.043) 100%)',
      },
    },
  },
  plugins: [],
}

export default config
