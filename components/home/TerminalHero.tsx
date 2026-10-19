'use client'

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'

import { LineIcon } from '@/components/home/icons'
import { scrollToHomeSection } from '@/components/home/scroll'
import { displayFont } from '@/components/home/FileHead'

const LINE_1 = 'whoami'
const LINE_2 = 'git log --oneline career'
const RUN_LABEL = 'Run git log career to show my career timeline'
const LINE_MS = 80

type Boot = {
  play: boolean
  line1: string
  out: boolean
  prompt2: boolean
  line2: string
  ready: boolean
}

const READY: Boot = {
  play: false,
  line1: LINE_1,
  out: true,
  prompt2: true,
  line2: LINE_2,
  ready: true,
}

const career: {
  hash: string
  version: string
  detail: string
  now?: boolean
}[] = [
  {
    hash: 'build an AI-native museum site',
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

    setBoot({ play: true, line1: '', out: false, prompt2: false, line2: '', ready: false })

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
      setBoot((prev) => ({ ...prev, ready: true }))
    }
    void run()

    return () => {
      cancelled = true
      timers.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  // shown: -1 = not run yet; otherwise number of timeline rows revealed.
  const [shown, setShown] = useState(-1)
  const runTimers = useRef<number[]>([])
  const canRun = boot.ready && shown < 0
  const runRef = useRef<() => void>(() => {})

  runRef.current = () => {
    if (!canRun) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(career.length)
      return
    }
    setShown(0)
    for (let i = 1; i <= career.length; i += 1) {
      runTimers.current.push(window.setTimeout(() => setShown(i), i * LINE_MS))
    }
  }

  useEffect(() => {
    const timers = runTimers.current
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' || event.repeat) return
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return
      const el = event.target as HTMLElement | null
      if (el && (el.closest('input, textarea, select, button, a, [contenteditable="true"]'))) return
      runRef.current()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      timers.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  const ran = shown >= 0
  const done = shown >= career.length

  return (
    <header id="top" className="bg-brand-dark pt-12">
      <div className="grid min-h-[calc(100dvh-48px)] grid-rows-[38px_minmax(auto,1fr)_28px] bg-brand-dark">
        <div className="flex items-stretch border-b border-white/[0.06] bg-brand-dark">
          <div className="flex items-center border-t-2 border-brand-accent bg-brand-dark px-[18px] font-space text-[12px] text-white">
            zsh — grace
          </div>
        </div>

        <div className="grid min-h-0 grid-cols-1 font-space text-[15px] leading-[1.75] text-[#e8d8e3] min-[641px]:grid-cols-[40px_minmax(0,1fr)] min-[1001px]:grid-cols-[52px_minmax(0,1fr)]">
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

          <div className="flex w-full max-w-[1100px] flex-col justify-center px-[18px] min-[1001px]:max-w-none min-[1001px]:pl-[max(20px,calc(50%-654px))] min-[1001px]:pr-10 py-7 min-[641px]:px-[clamp(28px,5vw,96px)] min-[641px]:py-10">
            <div className="shrink-0 text-brand-soft">
              <PromptPrefix />
              <span>{boot.line1}</span>
            </div>

            <div className="mb-[22px] mt-1.5" style={fadeStyle(boot.play, boot.out)}>
              <div className="mb-4 mt-1.5 flex flex-col items-start gap-3 min-[641px]:flex-row min-[641px]:items-center min-[641px]:gap-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/home/grace.jpg"
                  alt="Grace Lee"
                  width={496}
                  height={496}
                  className="size-14 shrink-0 rounded-full border-[3px] border-brand-accent object-cover shadow-[0_0_24px_rgba(171,89,152,0.45)] min-[641px]:size-20"
                />
                <h1 className={`${displayFont} m-0 text-[clamp(52px,6vw,96px)] text-white min-[1001px]:whitespace-nowrap`}>
                  Hi, I’m <span className="brand-grad">Grace Lee</span>
                </h1>
              </div>
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

            <div style={fadeStyle(boot.play, boot.prompt2)}>
              <button
                type="button"
                onClick={() => runRef.current()}
                disabled={ran}
                aria-label={RUN_LABEL}
                aria-expanded={ran}
                className="-mx-2 block w-[calc(100%+16px)] px-2 text-left text-brand-soft transition-colors enabled:hover:bg-white/[0.06] focus-visible:bg-white/[0.06] focus-visible:outline focus-visible:outline-1 focus-visible:outline-brand-soft disabled:cursor-default"
              >
                <PromptPrefix />
                <span>{boot.line2}</span>
                {!ran ? (
                  <span aria-hidden className="home-caret ml-0.5 inline-block h-[19px] w-[9px] align-[-3px] bg-brand-soft" />
                ) : null}
                {boot.ready && !ran ? (
                  <span aria-hidden className="ml-3 inline-block whitespace-nowrap font-space text-[12px] text-[#8c6f84]">
                    ↵ press enter
                  </span>
                ) : null}
              </button>
            </div>

            {ran ? (
              <div aria-live="polite">
                <div className="mb-[22px] mt-1.5 text-[15px]">
                  {career.slice(0, shown).map((row) => (
                    <div key={row.hash} className="whitespace-normal">
                      <span className="text-[#e6c07b]">{row.hash}</span>{' '}
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
                {done ? (
                  <div className="text-brand-soft">
                    <PromptPrefix />
                    <span className="home-caret inline-block h-[19px] w-[9px] align-[-3px] bg-brand-soft" />
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

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
