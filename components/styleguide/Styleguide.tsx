'use client'

import { useEffect, useRef, useState } from 'react'

type Swatch = {
  token: string
  cssVar: string
  tw: string
  usage: string
  sampleClass?: string
}

const textColors: Swatch[] = [
  {
    token: 'primary',
    cssVar: '--text-primary',
    tw: 'bg-primary',
    sampleClass: 'text-primary',
    usage: 'Headings, chrome, primary text, dark fills. Was pf-ink.',
  },
  {
    token: 'secondary',
    cssVar: '--text-secondary',
    tw: 'bg-secondary',
    sampleClass: 'text-secondary',
    usage: 'Body copy, tags, subheads. Was pf-body, pf-body-about, pf-secondary.',
  },
  {
    token: 'tertiary',
    cssVar: '--text-tertiary',
    tw: 'bg-tertiary',
    sampleClass: 'text-tertiary',
    usage: 'Eyebrows, captions, inactive, placeholders. Was pf-muted, pf-muted-light, pf-placeholder.',
  },
]

const surfaceColors: Swatch[] = [
  {
    token: 'primary',
    cssVar: '--surface-primary',
    tw: 'bg-surface-primary',
    usage: 'Page background. Was pf-bg.',
  },
  {
    token: 'secondary',
    cssVar: '--surface-secondary',
    tw: 'bg-surface-secondary',
    usage: 'Chips, tags, hover bands. Was pf-chip + pf-tag.',
  },
  {
    token: 'tertiary',
    cssVar: '--surface-tertiary',
    tw: 'bg-surface-tertiary',
    usage: 'Rules and frames. Was pf-hairline + pf-border.',
  },
]

const accentColors: Swatch[] = [
  {
    token: 'primary',
    cssVar: '--accent-primary',
    tw: 'bg-accent-primary',
    sampleClass: 'text-accent-primary',
    usage: 'Links, metrics, active marks. Was pf-accent.',
  },
  {
    token: 'secondary',
    cssVar: '--accent-secondary',
    tw: 'bg-accent-secondary',
    usage: 'Footer band, strong sage fills. Was pf-footer.',
  },
  {
    token: 'tertiary',
    cssVar: '--accent-tertiary',
    tw: 'bg-accent-tertiary',
    usage: 'Washes and footer copyright. Was pf-footer-muted + olive tints.',
  },
]

const typeRoles: {
  className: string
  sample: string
  usage: string
}[] = [
  {
    className: 'type-display',
    sample: 'Hi, I am Grace.',
    usage: 'Page heroes. Home + About H1.',
  },
  {
    className: 'type-header',
    sample: 'Building a design system people could use consistently',
    usage: 'Case-study H1.',
  },
  {
    className: 'type-header-md',
    sample: 'Where it started',
    usage: 'Chapters, work index, next-case.',
  },
  {
    className: 'type-header-sm',
    sample: 'My involvement',
    usage: 'In-chapter subheads.',
  },
  {
    className: 'type-body-lg',
    sample: 'Senior product designer and design systems practitioner.',
    usage: 'Hero dek.',
  },
  {
    className: 'type-body',
    sample: 'I work end to end: framing problems through research, then shaping strategy with product and engineering.',
    usage: 'Default reading. About + work body.',
  },
  {
    className: 'type-body-sm',
    sample: 'Component tokens define the functional role of each UI element, so designers apply logic, not just color.',
    usage: 'Case-study longform.',
  },
  {
    className: 'type-cap',
    sample: 'Selected work',
    usage: 'Section labels.',
  },
]

function CssVarValue({ name }: { name: string }) {
  const [value, setValue] = useState('…')

  useEffect(() => {
    const read = () =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    setValue(read() || '—')
  }, [name])

  return <span className="font-sans text-[12px] text-secondary">{value}</span>
}

function TypeMeta({ className }: { className: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [meta, setMeta] = useState('…')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const s = getComputedStyle(el)
    setMeta(
      `${s.fontSize} · ${s.fontWeight} · lh ${s.lineHeight} · ${s.letterSpacing}`,
    )
  }, [className])

  return (
    <span className="relative font-sans text-[12px] text-tertiary">
      <span
        ref={ref}
        className={className}
        aria-hidden
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 0,
          whiteSpace: 'nowrap',
        }}
      >
        Hg
      </span>
      {meta}
    </span>
  )
}

export function Styleguide() {
  return (
    <div className="font-sans text-primary">
      <header className="mx-auto max-w-pf px-10 pb-10 pt-8 max-[640px]:px-6">
        <p className="type-cap text-tertiary">Internal · noindex</p>
        <h1 className="type-display mt-4">Styleguide</h1>
        <p className="type-body mt-6 max-w-[640px] text-secondary">
          Live tokens for this site. Edit{' '}
          <span className="font-sans text-[14px] text-primary">
            styles/tokens.css
          </span>{' '}
          to change a color or heading — this page and the rest of the site
          update together.
        </p>
      </header>

      <section className="mx-auto max-w-pf px-10 pb-20 max-[640px]:px-6">
        <h2 className="type-header-md border-t border-surface-tertiary pt-10">Text</h2>
        <p className="type-body mt-3 mb-10 max-w-[640px] text-tertiary">
          Three gray roles. Use{' '}
          <span className="font-sans text-[13px]">text-primary</span>,{' '}
          <span className="font-sans text-[13px]">text-secondary</span>,{' '}
          <span className="font-sans text-[13px]">text-tertiary</span>
          — or <span className="font-sans text-[13px]">bg-primary</span> for
          dark fills.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {textColors.map((c) => (
            <div key={c.token} className="min-w-0">
              <div
                className={`h-20 rounded-[10px] border border-surface-tertiary ${c.tw}`}
              />
              <div className="mt-3 font-sans text-[13px] tracking-[0.01em]">
                text-{c.token}
              </div>
              <div className="mt-1">
                <CssVarValue name={c.cssVar} />
              </div>
              <p className={`type-body mt-3 ${c.sampleClass}`}>
                The work has to hold up in production.
              </p>
              <p className="mt-2 text-[13px] leading-[1.45] text-tertiary">
                {c.usage}
              </p>
            </div>
          ))}
        </div>

        <h2 className="type-header-md mt-16 border-t border-surface-tertiary pt-10">
          Surface
        </h2>
        <p className="type-body mt-3 mb-10 max-w-[640px] text-tertiary">
          Three flats.{' '}
          <span className="font-sans text-[13px]">bg-surface-primary</span>,{' '}
          <span className="font-sans text-[13px]">bg-surface-secondary</span>,{' '}
          <span className="font-sans text-[13px]">border-surface-tertiary</span>.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {surfaceColors.map((c) => (
            <div key={c.token} className="min-w-0">
              <div
                className={`h-20 rounded-[10px] border border-surface-tertiary ${c.tw}`}
              />
              <div className="mt-3 font-sans text-[13px] tracking-[0.01em]">
                surface-{c.token}
              </div>
              <div className="mt-1">
                <CssVarValue name={c.cssVar} />
              </div>
              <p className="mt-2 text-[13px] leading-[1.45] text-tertiary">
                {c.usage}
              </p>
            </div>
          ))}
        </div>

        <h2 className="type-header-md mt-16 border-t border-surface-tertiary pt-10">
          Accent
        </h2>
        <p className="type-body mt-3 mb-10 max-w-[640px] text-tertiary">
          Three sage roles.{' '}
          <span className="font-sans text-[13px]">text-accent-primary</span>,{' '}
          <span className="font-sans text-[13px]">bg-accent-secondary</span>,{' '}
          <span className="font-sans text-[13px]">bg-accent-tertiary</span>.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {accentColors.map((c) => (
            <div key={c.token} className="min-w-0">
              <div
                className={`h-20 rounded-[10px] border border-surface-tertiary ${c.tw}`}
              />
              <div className="mt-3 font-sans text-[13px] tracking-[0.01em]">
                accent-{c.token}
              </div>
              <div className="mt-1">
                <CssVarValue name={c.cssVar} />
              </div>
              {c.sampleClass ? (
                <p className={`type-body mt-3 ${c.sampleClass}`}>
                  Open to Senior Product Designer roles
                </p>
              ) : null}
              <p className="mt-2 text-[13px] leading-[1.45] text-tertiary">
                {c.usage}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-pf px-10 pb-24 max-[640px]:px-6">
        <h2 className="type-header-md border-t border-surface-tertiary pt-10">Type</h2>
        <p className="type-body mt-3 mb-10 max-w-[640px] text-tertiary">
          Eight roles: one display, three headers, three bodies, one cap.
          Faces: Domine on display and headers, Open Sans on body, cap, and meta.
        </p>
        <div className="divide-y divide-surface-tertiary border-y border-surface-tertiary">
          {typeRoles.map((t) => (
            <div
              key={t.className}
              className="grid grid-cols-[minmax(0,1fr)_220px] items-end gap-8 py-8 max-[700px]:grid-cols-1 max-[700px]:gap-3"
            >
              <p className={`m-0 ${t.className}`}>{t.sample}</p>
              <div className="pb-1 max-[700px]:pb-0">
                <div className="font-sans text-[13px]">{t.className}</div>
                <div className="mt-1">
                  <TypeMeta className={t.className} />
                </div>
                <p className="mt-1 text-[13px] text-tertiary">{t.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-pf px-10 pb-28 max-[640px]:px-6">
        <p className="type-cap text-tertiary">Legacy</p>
        <p className="type-body mt-4 max-w-[640px] text-secondary">
          Older case-study pages still use{' '}
          <span className="font-sans text-[14px]">--color-*</span> variables
          in <span className="font-sans text-[14px]">globals.css</span>.
          Type now maps to the same two faces: /design-system, /experiments, and
          /enterprise-redesign.
        </p>
      </section>
    </div>
  )
}
