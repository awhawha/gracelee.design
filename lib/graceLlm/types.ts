import type { ContextType } from '@/data/portfolioContext'

export type ChatRole = 'user' | 'assistant'

export type ChatTurn = {
  role: ChatRole
  content: string
}

export type GraceLlmRequest = {
  messages: ChatTurn[]
  currentPage: string
  contextType: ContextType
  projectId?: string
  projectTitle?: string
}

export type GraceLlmSuccess = {
  reply: string
  mode: 'live' | 'demo'
  followUps?: string[]
}

export type GraceLlmErrorBody = {
  error: string
}
