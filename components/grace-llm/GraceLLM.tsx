'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getDemoReplyForRequest } from '@/lib/graceLlm/demo'
import { splitFollowUps } from '@/lib/graceLlm/followUps'
import { isInternalHref, linkifyProjectTitles } from '@/lib/graceLlm/linkify'
import type { ChatTurn, GraceLlmRequest, GraceLlmSuccess } from '@/lib/graceLlm/types'
import { Icon, SparkleIcon } from '@/components/Icon'
import {
  getQuickPrompts,
  getWelcomeMessage,
  resolvePageContext,
  type ResolvedPageContext,
} from '@/lib/pageContext'

type UiMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  followUps?: string[]
}

type PanelState = 'default' | 'open' | 'closed'

type GraceLlmUi = {
  state: PanelState
  setState: (state: PanelState) => void
}

const GraceLlmUiContext = createContext<GraceLlmUi | null>(null)

export function GraceLLMProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PanelState>('default')
  return (
    <GraceLlmUiContext.Provider value={{ state, setState }}>
      {children}
    </GraceLlmUiContext.Provider>
  )
}

export function useGraceLlmUi() {
  const ctx = useContext(GraceLlmUiContext)
  if (!ctx) {
    throw new Error('GraceLLM must be used within GraceLLMProvider')
  }
  return ctx
}

/** Dock control: opens the sidebar, or closes it when already open. */
export function GraceLlmToggle({
  className,
  children,
}: {
  className?: string
  children?: ReactNode
}) {
  const { state, setState } = useGraceLlmUi()
  const isOpen = state === 'open'

  return (
    <button
      type="button"
      onClick={() => setState(isOpen ? 'closed' : 'open')}
      aria-expanded={isOpen}
      aria-controls="grace-llm-panel"
      className={`${state === 'default' ? 'md:hidden' : ''} ${
        className ?? 'transition-colors hover:text-primary'
      }`}
    >
      {children ?? 'Ask Grace'}
    </button>
  )
}

const ENDPOINT = process.env.NEXT_PUBLIC_GRACE_LLM_ENDPOINT || '/api/grace-llm'

function newId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `m-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function focusableWithin(root: HTMLElement): HTMLElement[] {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true')
}

const INLINE_TOKEN =
  /(\*\*\[[^\]]+\]\(\/[^)]+\)\*\*|\[[^\]]+\]\(\/[^)]+\)|\*\*[^*]+\*\*)/g

function ProjectLink({
  href,
  label,
  bold,
}: {
  href: string
  label: string
  bold?: boolean
}) {
  return (
    <Link
      href={href}
      className={`font-medium text-accent-primary underline decoration-accent-primary underline-offset-[3px] transition-colors hover:text-accent-secondary hover:decoration-accent-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary ${
        bold ? 'font-semibold' : ''
      }`}
    >
      {label}
    </Link>
  )
}

function parseMarkdownLink(
  part: string,
): { href: string; label: string; bold: boolean } | null {
  const boldLink = part.match(/^\*\*\[([^\]]+)\]\((\/[^)]+)\)\*\*$/)
  if (boldLink && isInternalHref(boldLink[2])) {
    return { label: boldLink[1], href: boldLink[2], bold: true }
  }
  const link = part.match(/^\[([^\]]+)\]\((\/[^)]+)\)$/)
  if (link && isInternalHref(link[2])) {
    return { label: link[1], href: link[2], bold: false }
  }
  return null
}

function inlineMarkdown(text: string): ReactNode[] {
  const parts = linkifyProjectTitles(text).split(INLINE_TOKEN)
  return parts.map((part, i) => {
    const linked = parseMarkdownLink(part)
    if (linked) {
      return (
        <ProjectLink
          key={i}
          href={linked.href}
          label={linked.label}
          bold={linked.bold}
        />
      )
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-medium text-primary">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <span key={i}>{part}</span>
  })
}

function PromptList({
  prompts,
  onSelect,
  className,
  title,
}: {
  prompts: string[]
  onSelect: (prompt: string) => void
  className?: string
  title?: string
}) {
  if (prompts.length === 0) return null
  return (
    <div className={title ? 'mt-5 border-t border-surface-tertiary pt-4' : undefined}>
      {title ? (
        <p className="mb-2 font-sans text-[11px] tracking-[0.06em] text-tertiary">
          {title}
        </p>
      ) : null}
    <ul className={className ?? 'space-y-1'}>
      {prompts.map((prompt, index) => (
        <li
          key={prompt}
          className="grace-llm-in-item"
          style={{ animationDelay: `${160 + index * 110}ms` }}
        >
          <button
            type="button"
            onClick={() => onSelect(prompt)}
            className="group -mx-2 flex w-[calc(100%+1rem)] items-start gap-2 rounded-lg px-2 py-1.5 text-left text-[14px] leading-snug text-secondary transition-colors hover:bg-surface-secondary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
          >
            <span className="mt-px text-[12px] text-tertiary transition-colors group-hover:text-accent-primary">
              <Icon name="fa-arrow-right" />
            </span>
            <span>{prompt}</span>
          </button>
        </li>
      ))}
    </ul>
    </div>
  )
}

function AssistantBody({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/)
  return (
    <div className="space-y-3">
      {blocks.map((block, i) => {
        const lines = block.split('\n').filter((line) => line.trim().length > 0)
        const listItems = lines.filter((line) => /^[-•*]|\d+\./.test(line.trim()))
        if (listItems.length >= 2 && listItems.length === lines.length) {
          return (
            <ul key={i} className="list-disc space-y-1.5 pl-4">
              {lines.map((line, j) => (
                <li key={j} className="text-[14.5px] leading-[1.6] text-secondary">
                  {inlineMarkdown(line.replace(/^[-•*]\s+/, '').replace(/^\d+\.\s+/, ''))}
                </li>
              ))}
            </ul>
          )
        }
        return (
          <p key={i} className="text-[14.5px] leading-[1.65] text-secondary">
            {lines.map((line, j) => (
              <span key={j}>
                {j > 0 ? <br /> : null}
                {inlineMarkdown(line)}
              </span>
            ))}
          </p>
        )
      })}
    </div>
  )
}

function payloadFrom(
  ctx: ResolvedPageContext,
  messages: UiMessage[],
): GraceLlmRequest {
  return {
    messages: messages.map((m): ChatTurn => ({ role: m.role, content: m.content })),
    currentPage: ctx.currentPage,
    contextType: ctx.type,
    projectId: ctx.projectId,
    projectTitle: ctx.projectTitle,
  }
}

async function requestReply(
  ctx: ResolvedPageContext,
  messages: UiMessage[],
): Promise<GraceLlmSuccess> {
  const body = payloadFrom(ctx, messages)
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    const contentType = res.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      const demo = getDemoReplyForRequest(body)
      return { reply: demo.reply, followUps: demo.followUps, mode: 'demo' }
    }
    const data = (await res.json()) as GraceLlmSuccess & { error?: string }
    if (res.ok && data.reply) {
      return {
        reply: data.reply,
        followUps: data.followUps,
        mode: data.mode ?? 'live',
      }
    }
    if (res.status >= 500) {
      throw new Error(data.error || 'GraceLLM could not complete that request.')
    }
    const demo = getDemoReplyForRequest(body)
    return {
      reply: data.reply || demo.reply,
      followUps: data.followUps ?? demo.followUps,
      mode: 'demo',
    }
  } catch (err) {
    if (err instanceof Error && /could not complete/i.test(err.message)) throw err
    const demo = getDemoReplyForRequest(body)
    return { reply: demo.reply, followUps: demo.followUps, mode: 'demo' }
  }
}

function panelClass(state: PanelState): string {
  const base =
    'grace-llm-panel flex flex-col overflow-hidden border-l border-surface-tertiary bg-surface-primary print:hidden fixed inset-0 z-[60] h-dvh md:sticky md:top-0 md:z-auto md:h-dvh md:shrink-0 md:self-start'
  if (state === 'open') {
    return `${base} translate-y-0 opacity-100 md:w-[340px] md:translate-y-0`
  }
  if (state === 'closed') {
    return `${base} pointer-events-none translate-y-full opacity-0 md:w-0 md:translate-y-0 md:border-l-transparent`
  }
  return `${base} pointer-events-none translate-y-full opacity-0 md:w-[340px] md:translate-y-0 md:opacity-100 md:pointer-events-auto`
}

export function GraceLLM() {
  const pathname = usePathname() || '/'
  const context = resolvePageContext(pathname)
  const { state, setState } = useGraceLlmUi()
  const titleId = useId()
  const panelRef = useRef<HTMLElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const prevContextRef = useRef(context.currentPage)
  const contextTimerRef = useRef<number | null>(null)

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<UiMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [contextNotice, setContextNotice] = useState<string | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const lastUserRef = useRef<string | null>(null)
  const inflightRef = useRef(false)

  const welcome = getWelcomeMessage(context)
  const prompts = getQuickPrompts(context)
  const canSend = input.trim().length > 0 && !loading
  const empty = messages.length === 0
  const presented = state === 'open' || (state === 'default' && isDesktop)

  const showNotice = useCallback((label: string) => {
    setContextNotice(label)
    if (contextTimerRef.current) window.clearTimeout(contextTimerRef.current)
    contextTimerRef.current = window.setTimeout(() => setContextNotice(null), 4200)
  }, [])

  useEffect(() => {
    if (prevContextRef.current === context.currentPage) return
    prevContextRef.current = context.currentPage
    if (messages.length > 0) {
      showNotice(`Context updated: ${context.contextLabel}`)
    }
  }, [context.currentPage, context.contextLabel, messages.length, showNotice])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const sync = () => setIsDesktop(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    return () => {
      if (contextTimerRef.current) window.clearTimeout(contextTimerRef.current)
    }
  }, [])

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    if (presented) panel.removeAttribute('inert')
    else panel.setAttribute('inert', '')
  }, [presented])

  useEffect(() => {
    const node = logRef.current
    if (!node) return
    node.scrollTop = node.scrollHeight
  }, [messages, loading, contextNotice])

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (state === 'closed') return
      event.preventDefault()
      setState('closed')
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [state, setState])

  // Focus trap only for the mobile full-screen view.
  useEffect(() => {
    if (state !== 'open') return
    const panel = panelRef.current
    if (!panel) return

    const mq = window.matchMedia('(max-width: 767px)')
    if (!mq.matches) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const nodes = focusableWithin(panel)
      if (nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [state])

  const send = useCallback(
    async (raw: string, opts?: { retry?: boolean }) => {
      const text = raw.trim()
      if (!text || inflightRef.current) return

      setError(null)
      lastUserRef.current = text
      inflightRef.current = true

      const userMessage: UiMessage = { id: newId(), role: 'user', content: text }
      const nextMessages = opts?.retry ? messages : [...messages, userMessage]

      if (!opts?.retry) {
        setMessages(nextMessages)
        setInput('')
      }
      setLoading(true)

      try {
        const result = await requestReply(context, nextMessages)
        const parsed = splitFollowUps(result.reply)
        setMessages((current) => [
          ...current,
          {
            id: newId(),
            role: 'assistant',
            content: parsed.reply,
            followUps:
              result.followUps && result.followUps.length > 0
                ? result.followUps
                : parsed.followUps,
          },
        ])
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Something went wrong. Please try again.',
        )
      } finally {
        inflightRef.current = false
        setLoading(false)
      }
    },
    [context, messages],
  )

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    void send(input)
  }

  const onComposerKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void send(input)
    }
  }

  const clearChat = () => {
    setMessages([])
    setError(null)
    lastUserRef.current = null
  }

  return (
    <aside
      ref={panelRef}
      id="grace-llm-panel"
      className={panelClass(state)}
      aria-labelledby={titleId}
      aria-hidden={!presented}
    >
      <div className="flex h-full min-h-0 w-full flex-col md:w-[340px] md:min-w-[340px]">
      <header className="flex items-center justify-between gap-3 px-5 pb-3 pt-[max(1.25rem,env(safe-area-inset-top))]">
        <div className="min-w-0">
          <p
            id={titleId}
            className="flex items-center gap-1.5 font-sans text-[15px] font-semibold tracking-[-0.02em] text-primary"
          >
            <SparkleIcon className="size-3.5" />
            GraceLLM
          </p>
          <p className="mt-0.5 truncate text-[12px] text-tertiary">
            {context.askAboutLabel}
          </p>
        </div>
        <div className="flex shrink-0 items-center">
          <button
            type="button"
            onClick={clearChat}
            className="flex h-9 w-9 items-center justify-center rounded-full text-tertiary transition-colors hover:bg-surface-secondary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
            aria-label="Reset conversation"
          >
            <Icon name="fa-arrow-rotate-left" className="text-[14px]" />
          </button>
          <button
            type="button"
            onClick={() => setState('closed')}
            className="flex h-9 w-9 items-center justify-center rounded-full text-tertiary transition-colors hover:bg-surface-secondary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
            aria-label="Hide GraceLLM"
          >
            <Icon name="fa-xmark" className="text-[16px]" />
          </button>
        </div>
      </header>

      {contextNotice ? (
        <p
          role="status"
          className="px-5 pb-2 font-sans text-[11px] tracking-[0.02em] text-secondary"
        >
          {contextNotice}
        </p>
      ) : null}

      <div
        ref={logRef}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-2"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        aria-busy={loading}
      >
        {empty ? null : (
          <ul className="space-y-4 pb-4">
            {messages.map((message) => (
              <li key={message.id} className="flex flex-col">
                {message.role === 'user' ? (
                  <div className="ml-6 self-end rounded-[14px] rounded-br-md bg-primary px-3.5 py-2.5 text-[14.5px] leading-[1.55] text-white">
                    <span className="sr-only">You: </span>
                    {message.content}
                  </div>
                ) : (
                  <div className="grace-llm-in">
                    <p
                      className="mb-1.5 font-sans text-[10px] tracking-[0.08em] text-tertiary"
                      aria-hidden="true"
                    >
                      GraceLLM
                    </p>
                    <span className="sr-only">GraceLLM: </span>
                    <AssistantBody text={message.content} />
                    {message.followUps && message.followUps.length > 0 ? (
                      <PromptList
                        title="Ask next"
                        prompts={message.followUps}
                        onSelect={(prompt) => void send(prompt)}
                        className="space-y-1"
                      />
                    ) : null}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        {loading ? (
          <p className="mt-2 font-sans text-[12px] text-tertiary">Thinking…</p>
        ) : null}

        {error ? (
          <div
            role="alert"
            className="mt-3 rounded-[14px] border border-surface-tertiary bg-surface-secondary px-3.5 py-3"
          >
            <p className="text-[13.5px] leading-relaxed text-secondary">{error}</p>
            <button
              type="button"
              className="mt-2 font-sans text-[13px] font-medium text-accent-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
              onClick={() => {
                if (lastUserRef.current) void send(lastUserRef.current, { retry: true })
              }}
            >
              Retry
            </button>
          </div>
        ) : null}
      </div>

      <div className="px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2">
        {empty ? (
          <div className="mb-5">
            <p className="font-sans text-[22px] font-medium leading-snug tracking-[-0.02em] text-primary">
              Ask away.
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-tertiary">
              {welcome}
            </p>
            <PromptList
              prompts={prompts}
              onSelect={(prompt) => void send(prompt)}
              className="mt-5 space-y-1"
            />
          </div>
        ) : null}

        <form onSubmit={onSubmit}>
          <label htmlFor="grace-llm-input" className="sr-only">
            Message GraceLLM
          </label>
          <div className="flex items-end gap-2 rounded-xl border border-surface-tertiary bg-[#f8f7f4] px-3 py-1.5 focus-within:border-primary">
            <textarea
              ref={inputRef}
              id="grace-llm-input"
              name="grace-llm-message"
              rows={1}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={onComposerKeyDown}
              placeholder="Ask about Grace…"
              enterKeyHint="send"
              autoComplete="off"
              className="max-h-28 min-h-[32px] flex-1 resize-none bg-transparent py-1 font-sans text-[14.5px] leading-[1.45] text-primary placeholder:text-tertiary focus:outline-none"
            />
            <button
              type="submit"
              disabled={!canSend}
              className="mb-px flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary disabled:cursor-not-allowed disabled:opacity-25"
              aria-label="Send message"
            >
              <Icon name="fa-arrow-up" className="text-[12px]" />
            </button>
          </div>
          <span className="sr-only">Enter to send, Shift+Enter for a new line</span>
        </form>
      </div>
      </div>
    </aside>
  )
}
