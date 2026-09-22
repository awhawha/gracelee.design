/**
 * Public-surface flags. Flip these when a piece of work is ready to show again.
 * Hidden projects stay in the data (and at their URLs) so they can still be
 * previewed while iterating.
 */

export const GRACE_LLM_ENABLED = false

export const HIDDEN_PROJECT_IDS = [] as const

export function isProjectHidden(id: string): boolean {
  return (HIDDEN_PROJECT_IDS as readonly string[]).includes(id)
}
