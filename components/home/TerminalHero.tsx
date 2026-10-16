'use client'

import { useLayoutEffect, useState, type CSSProperties } from 'react'

import { LineIcon } from '@/components/home/icons'
import { scrollToHomeSection } from '@/components/home/scroll'
import { displayFont } from '@/components/home/FileHead'

const LINE_1 = 'whoami'
const LINE_2 = 'git log --oneline career'

type Boot = {
  play: boolean
  line1: string
  line2: string
  out: boolean
  prompt2: boolean
  log: boolean
  cursor: boolean
}

const READY: Boot = {
  play: false,
  line1: LINE_1,
  line2: LINE_2,
  out: true,
  prompt2: true,
  log: true,
  cursor: true,
}

const career: {
  hash: string
  meta?: string
  version: string
  detail: string
  now?: boolean
}[] = [
  {
    hash: 'ship AI museum',
    meta: '(HEAD → main)',
    version: 'v5.0 Side project',
    detail: 'Museum of Children’s Books · 2026–now',
    now: true,
  },
  {
    hash: 'design enterprise AI tools',
    version: 'v4.0 Senior Product Designer',
    detail: 'dotData · 2019–2025',
  },
  {
    hash: 'design for engagement',
    version: 'v3.0 UX Designer',
    detail: 'Kahuna · 2016–2018',
  },
  {
    hash: 'engineer → designer',
    version: 'v2.0 MFA',
    detail: 'Academy of Art · 2013–2016',
  },
  {
    hash: 'write full-stack code',
    version: 'v1.0 Engineer',
    detail: 'Wislite · 2007–2013',
  },
]

const pills = [
  { icon: 'grid', label: 'SYSTEMATIC' },
  { icon: 'sparkles', label: 'CURIOUS' },
  { icon: 'code', label: 'BUILDER' },
] as const

// More rows than a tall window can show (12px type × 2.2 leading). The list is
// taken out of flow and clipped, so extra rows never grow the hero or scroll.
const GUTTER_LINE_COUNT = 200

function fadeStyle(play: boolean, visible: boolean): CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transition: play && visible ? 'opacity .5s' : 'none',
  }
}

function PromptPrefix() {
  return (
    <span className="text-[#8c6f84]">
      <span className="hidden min-[641px]:inline">grace@portfolio </span>
      {'~ % '}
    </span>
  )
}

export function TerminalHero() {
  const [boot, setBoot] = useState<Boot>(READY)

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const still = reduce || window.location.search.includes('static')
    if (still) return

    let cancelled = false
    const timers = new Set<number>()
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(() => {
          timers.delete(id)
          resolve()
        }, ms)
        timers.add(id)
      })

    const type = async (key: 'line1' | 'line2', text: string) => {
      for (let i = 1; i <= text.length; i += 1) {
        if (cancelled) return
        const slice = text.slice(0, i)
        setBoot((prev) => ({ ...prev, [key]: slice }))
        await wait(55)
      }
      await wait(250)
    }

    setBoot({
      play: true,
      line1: '',
      line2: '',
      out: false,
      prompt2: false,
      log: false,
      cursor: false,
    })

    const run = async () => {
      await wait(400)
      if (cancelled) return
      await type('line1', LINE_1)
      if (cancelled) return
      setBoot((prev) => ({ ...prev, out: true }))
      await wait(700)
      if (cancelled) return
      setBoot((prev) => ({ ...prev, prompt2: true }))
      await type('line2', LINE_2)
      if (cancelled) return
      setBoot((prev) => ({ ...prev, log: true }))
      await wait(300)
      if (cancelled) return
      setBoot((prev) => ({ ...prev, cursor: true }))
    }
    void run()

    return () => {
      cancelled = true
      timers.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  return (
    <header id="top" className="bg-brand-dark pt-12">
      <div className="grid min-h-[calc(100dvh-48px)] grid-rows-[38px_minmax(auto,1fr)_28px] bg-brand-dark">
        <div className="flex items-stretch border-b border-white/[0.06] bg-brand-dark">
          <div className="flex items-center border-t-2 border-brand-accent bg-brand-dark px-[18px] font-space text-[12px] text-white">
            zsh — grace
          </div>
        </div>

        <div className="grid min-h-0 grid-cols-1 font-space text-[15px] leading-[1.75] text-[#e8d8e3] min-[641px]:grid-cols-[40px_minmax(0,1fr)] min-[1001px]:grid-cols-[52px_minmax(0,1fr)_minmax(300px,26%)]">
          <div
            aria-hidden
            className="relative hidden min-h-0 overflow-hidden bg-brand-gutter min-[641px]:block"
          >
            <div className="absolute inset-0 overflow-hidden pt-7 text-right font-space text-[12px] leading-[2.2] text-[#5e4457] min-[1001px]:px-3">
              {Array.from({ length: GUTTER_LINE_COUNT }, (_, i) => (
                <div key={i} className="px-3 min-[1001px]:px-0">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="flex max-w-[1100px] flex-col justify-center px-[18px] py-7 min-[641px]:px-[clamp(28px,5vw,96px)] min-[641px]:py-10">
            <div className="shrink-0 text-brand-soft">
              <PromptPrefix />
              <span>{boot.line1}</span>
            </div>

            <div className="mb-[22px] mt-1.5" style={fadeStyle(boot.play, boot.out)}>
              <h1
                className={`${displayFont} mb-4 mt-1.5 text-[clamp(52px,6vw,96px)] text-white`}
              >
                Hi, I’m <span className="brand-grad">Grace Lee</span>
              </h1>
              <p className="max-w-[720px] font-inter text-[18px] leading-[1.6] text-[#d9c6d3]">
                I’m a senior product designer who started as a software engineer. I bring
                structure to complex data and AI workflows and stay curious about how people
                actually work. I’ve designed AI-powered machine learning tools at dotData, and I
                build my own too, like a museum of picture books where AI helps research the
                stories behind the illustrations.
              </p>
              <div className="mt-[18px] flex flex-wrap gap-2.5">
                {pills.map((pill) => (
                  <span
                    key={pill.label}
                    className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[rgba(229,155,211,0.55)] px-3.5 py-[7px] font-space text-[11px] tracking-[0.1em] text-brand-soft"
                  >
                    <LineIcon name={pill.icon} className="size-3.5" />
                    {pill.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-brand-soft" style={fadeStyle(boot.play, boot.prompt2)}>
              <PromptPrefix />
              <span>{boot.line2}</span>
            </div>

            <div
              className="mb-[22px] mt-1.5 text-[15px]"
              style={fadeStyle(boot.play, boot.log)}
            >
              {career.map((row) => (
                <div
                  key={row.hash}
                  className="whitespace-normal min-[1001px]:whitespace-nowrap"
                >
                  <span className="text-[#e6c07b]">{row.hash}</span>{' '}
                  {row.meta ? (
                    <span className="text-[#8c6f84]">{row.meta} </span>
                  ) : null}
                  <span className="font-bold text-white">{row.version}</span>
                  {' · '}
                  {row.detail}
                  {row.now ? (
                    <span className="ml-1.5 inline-block rounded-full bg-brand-accent px-[9px] py-0.5 align-[2px] font-inter text-[10px] font-bold leading-none text-white">
                      Now
                    </span>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="text-brand-soft" style={fadeStyle(boot.play, boot.cursor)}>
              <PromptPrefix />
              <span className="home-caret inline-block h-[19px] w-[9px] align-[-3px] bg-brand-soft" />
            </div>
          </div>

          <aside className="hidden flex-col justify-center border-l border-white/[0.06] bg-brand-side px-9 py-10 min-[1001px]:flex">
            <h2 className="mb-3.5 font-space text-[11px] font-normal tracking-[0.14em] text-[#8c6f84]">
              ABOUT.JSON
            </h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/home/grace.jpg"
              alt="Grace Lee"
              width={496}
              height={496}
              className="mb-[22px] mt-1 size-[180px] rounded-full border-[3px] border-brand-accent object-cover shadow-[0_0_40px_rgba(171,89,152,0.45)]"
            />
            <div className="font-space text-[13px] leading-[1.8]">
              {'{'}
              <br />
              &nbsp;&nbsp;
              <span className="text-brand-soft">&quot;role&quot;</span>
              {': '}
              <span className="text-[#a8d8a0]">&quot;Senior Product Designer&quot;</span>,
              <br />
              &nbsp;&nbsp;
              <span className="text-brand-soft">&quot;started_as&quot;</span>
              {': '}
              <span className="text-[#a8d8a0]">&quot;Software Engineer&quot;</span>,
              <br />
              &nbsp;&nbsp;
              <span className="text-brand-soft">&quot;focus&quot;</span>
              {': ['}
              <span className="text-[#a8d8a0]">&quot;data&quot;</span>
              {', '}
              <span className="text-[#a8d8a0]">&quot;AI workflows&quot;</span>
              {'],'}
              <br />
              &nbsp;&nbsp;
              <span className="text-brand-soft">&quot;builds&quot;</span>
              {': '}
              <span className="text-[#a8d8a0]">&quot;what she designs&quot;</span>
              <br />
              {'}'}
            </div>
          </aside>
        </div>

        <div className="flex items-center gap-5 overflow-x-auto whitespace-nowrap bg-brand-accent px-4 font-space text-[11px] text-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span>⎇ main</span>
          <span>v5.0</span>
          <span>UTF-8</span>
          <a
            href="#work"
            onClick={(event) => {
              event.preventDefault()
              scrollToHomeSection('work')
            }}
            className="ml-auto text-white"
          >
            scroll ↓ to see work
          </a>
        </div>
      </div>
    </header>
  )
}
