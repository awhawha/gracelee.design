const FOLLOW_UP_LINE = /^\s*FOLLOW_UP:\s*(.+?)\s*$/

/**
 * Pull `FOLLOW_UP: …` lines out of a model reply so they never render as prose.
 */
export function splitFollowUps(text: string): { reply: string; followUps: string[] } {
  const followUps: string[] = []
  const kept: string[] = []

  for (const line of text.split('\n')) {
    const match = line.match(FOLLOW_UP_LINE)
    if (match) {
      const question = match[1].replace(/^["“]|["”]$/g, '').trim()
      if (question) followUps.push(question)
      continue
    }
    kept.push(line)
  }

  return {
    reply: kept.join('\n').replace(/\n{3,}/g, '\n\n').trim(),
    followUps: Array.from(new Set(followUps)).slice(0, 3),
  }
}
