import { getDemoReplyForRequest } from '@/lib/graceLlm/demo'
import { splitFollowUps } from '@/lib/graceLlm/followUps'
import { buildSystemPrompt } from '@/lib/graceLlm/prompt'
import type {
  ChatTurn,
  GraceLlmErrorBody,
  GraceLlmRequest,
  GraceLlmSuccess,
} from '@/lib/graceLlm/types'

export const runtime = 'nodejs'

const MAX_MESSAGE_LENGTH = 2000
const MAX_TURNS = 24
const MAX_TOKENS = 700

const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.GRACE_LLM_CORS_ORIGIN || '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type',
}

function json(data: GraceLlmSuccess | GraceLlmErrorBody, status = 200) {
  return Response.json(data, { status, headers: corsHeaders })
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders })
}

function isContextType(value: unknown): value is GraceLlmRequest['contextType'] {
  return value === 'portfolio' || value === 'profile' || value === 'project'
}

function sanitizeTurns(input: unknown): ChatTurn[] | null {
  if (!Array.isArray(input)) return null
  const turns: ChatTurn[] = []
  for (const item of input.slice(-MAX_TURNS)) {
    if (!item || typeof item !== 'object') return null
    const role = (item as { role?: unknown }).role
    const content = (item as { content?: unknown }).content
    if (role !== 'user' && role !== 'assistant') return null
    if (typeof content !== 'string') return null
    const trimmed = content.trim()
    if (!trimmed || trimmed.length > MAX_MESSAGE_LENGTH) return null
    turns.push({ role, content: trimmed })
  }
  return turns
}

function parseRequest(body: unknown): GraceLlmRequest | { error: string } {
  if (!body || typeof body !== 'object') return { error: 'Invalid JSON body.' }
  const rec = body as Record<string, unknown>
  const messages = sanitizeTurns(rec.messages)
  if (!messages || messages.length === 0) {
    return { error: 'Send at least one user message.' }
  }
  if (messages[messages.length - 1].role !== 'user') {
    return { error: 'The latest message must come from the user.' }
  }
  if (!isContextType(rec.contextType)) {
    return { error: 'contextType must be portfolio, profile, or project.' }
  }
  if (typeof rec.currentPage !== 'string' || !rec.currentPage) {
    return { error: 'currentPage is required.' }
  }
  return {
    messages,
    currentPage: rec.currentPage,
    contextType: rec.contextType,
    projectId: typeof rec.projectId === 'string' ? rec.projectId : undefined,
    projectTitle: typeof rec.projectTitle === 'string' ? rec.projectTitle : undefined,
  }
}

async function completeWithAnthropic(
  apiKey: string,
  system: string,
  messages: ChatTurn[],
): Promise<string> {
  const model = process.env.ANTHROPIC_MODEL || 'claude-3-5-haiku-20241022'
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: MAX_TOKENS,
      temperature: 0.2,
      system,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    }),
  })
  const data = (await res.json()) as {
    error?: { message?: string }
    content?: { type: string; text?: string }[]
  }
  if (!res.ok) {
    throw new Error(data.error?.message || `Anthropic request failed (${res.status})`)
  }
  const text = data.content?.find((block) => block.type === 'text')?.text?.trim()
  if (!text) throw new Error('Anthropic returned an empty reply.')
  return text
}

async function completeWithOpenAI(
  apiKey: string,
  system: string,
  messages: ChatTurn[],
): Promise<string> {
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      max_tokens: MAX_TOKENS,
      messages: [{ role: 'system', content: system }, ...messages],
    }),
  })
  const data = (await res.json()) as {
    error?: { message?: string }
    choices?: { message?: { content?: string } }[]
  }
  if (!res.ok) {
    throw new Error(data.error?.message || `OpenAI request failed (${res.status})`)
  }
  const text = data.choices?.[0]?.message?.content?.trim()
  if (!text) throw new Error('OpenAI returned an empty reply.')
  return text
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON body.' }, 400)
  }

  const parsed = parseRequest(body)
  if ('error' in parsed) return json(parsed, 400)

  const anthropicKey = process.env.ANTHROPIC_API_KEY
  const openaiKey = process.env.OPENAI_API_KEY

  if (!anthropicKey && !openaiKey) {
    const demo = getDemoReplyForRequest(parsed)
    return json({
      reply: demo.reply,
      followUps: demo.followUps,
      mode: 'demo',
    })
  }

  const system = buildSystemPrompt(parsed)

  try {
    const raw = anthropicKey
      ? await completeWithAnthropic(anthropicKey, system, parsed.messages)
      : await completeWithOpenAI(openaiKey as string, system, parsed.messages)
    const { reply, followUps } = splitFollowUps(raw)
    return json({ reply, followUps, mode: 'live' })
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'The language model request failed.'
    return json({ error: message }, 502)
  }
}
