'use client'

import * as React from 'react'
import * as jsxRuntime from 'react/jsx-runtime'
import { useCallback, useEffect, useRef, useState, type ComponentType, type FormEvent } from 'react'

import * as LightboxModule from '@/components/Lightbox'
import * as CaseStudyNavModule from '@/components/portfolio/CaseStudyNav'
import * as caseStudyKit from '@/components/portfolio/caseStudyKit'
import * as automlCaseTitle from '@/lib/automlCaseTitle'
import * as pivotCaseTitle from '@/lib/pivotCaseTitle'

/**
 * Password gate for confidential case studies (AutoML, Error Analysis).
 * Each page is encrypted under public/protected/<slug>/; plaintext lives in the gitignored private/ folder.
 * Re-encrypt after edits with `npm run encrypt:protected` (encrypts every page in one run with one salt,
 * so a single derived key unlocks all of them for the browser session).
 */

// One session entry for all protected pages: "<salt>:<derived key>" (never the password).
const SESSION_KEY = 'case-unlock-v1'

const MODULES: Record<string, unknown> = {
  react: React,
  'react/jsx-runtime': jsxRuntime,
  '@/components/Lightbox': LightboxModule,
  '@/components/portfolio/CaseStudyNav': CaseStudyNavModule,
  '@/components/portfolio/caseStudyKit': caseStudyKit,
  '@/lib/automlCaseTitle': automlCaseTitle,
  '@/lib/pivotCaseTitle': pivotCaseTitle,
}



type Meta = { iterations: number; salt: string; iv: string }
type Payload = { v: number; code: string; media: { file: string; type: string }[] }

const b64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0))
const toB64 = (b: ArrayBuffer) => btoa(String.fromCharCode(...Array.from(new Uint8Array(b))))

async function fetchBytes(url: string) {
  const res = await fetch(url, { cache: 'no-cache' })
  if (!res.ok) throw new Error(`Could not load ${url}`)
  return res.arrayBuffer()
}

async function deriveRawKey(password: string, meta: Meta) {
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits'])
  return crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: b64(meta.salt), iterations: meta.iterations }, base, 256)
}

class WrongPassword extends Error {}

async function unlock(slug: string, exportName: string, raw: ArrayBuffer, meta: Meta): Promise<{ Page: ComponentType; urls: string[] }> {
  const key = await crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['decrypt'])
  let payload: Payload
  try {
    const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(meta.iv) }, key, await fetchBytes(`/protected/${slug}/${slug}.enc`))
    payload = JSON.parse(new TextDecoder().decode(plain))
  } catch (e) {
    if (e instanceof Error && e.message.startsWith('Could not load')) throw e
    throw new WrongPassword()
  }
  const urls = await Promise.all(
    payload.media.map(async ({ file, type }) => {
      const buf = new Uint8Array(await fetchBytes(`/protected/${slug}/${file}`))
      const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: buf.slice(0, 12) }, key, buf.slice(12))
      return URL.createObjectURL(new Blob([plain], { type }))
    }),
  )
  const mod: { exports: Record<string, unknown> } = { exports: {} }
  const req = (name: string) => {
    if (!(name in MODULES)) throw new Error(`Unknown module ${name}`)
    return MODULES[name]
  }
  // The decrypted code is our own compiled component (scripts/encrypt-protected.js), authenticated by AES-GCM.
  // eslint-disable-next-line no-new-func
  new Function('require', 'module', 'exports', '__m', payload.code)(req, mod, mod.exports, (i: number) => urls[i])
  const Page = (mod.exports[exportName] ?? mod.exports.default) as ComponentType | undefined
  if (!Page) throw new Error(`Encrypted page has no ${exportName} export`)
  return { Page, urls }
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </svg>
  )
}

export function ProtectedCaseStudy({ slug, exportName }: { slug: string; exportName: string }) {
  const [Page, setPage] = useState<ComponentType | null>(null)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [checking, setChecking] = useState(true)
  const urlsRef = useRef<string[]>([])

  const open = useCallback(async (getRaw: (meta: Meta) => Promise<ArrayBuffer>) => {
    const meta = (await (await fetch(`/protected/${slug}/${slug}.json`, { cache: 'no-cache' })).json()) as Meta
    const raw = await getRaw(meta)
    const result = await unlock(slug, exportName, raw, meta)
    urlsRef.current = result.urls
    try {
      sessionStorage.setItem(SESSION_KEY, `${meta.salt}:${toB64(raw)}`)
    } catch {}
    setPage(() => result.Page)
  }, [slug, exportName])

  // Remembered unlock for this browser session (stores the derived key, never the password).
  useEffect(() => {
    let stored: string | null = null
    try {
      stored = sessionStorage.getItem(SESSION_KEY)
    } catch {}
    if (!stored) {
      setChecking(false)
      return
    }
    const [salt, raw] = stored.split(':')
    open(async (meta) => {
      if (meta.salt !== salt) throw new WrongPassword()
      return b64(raw).buffer as ArrayBuffer
    })
      .catch(() => {
        try {
          sessionStorage.removeItem(SESSION_KEY)
        } catch {}
      })
      .finally(() => setChecking(false))
  }, [open])

  useEffect(() => () => urlsRef.current.forEach((u) => URL.revokeObjectURL(u)), [])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!password || busy) return
    setBusy(true)
    setError('')
    try {
      await open((meta) => deriveRawKey(password, meta))
    } catch (err) {
      setError(err instanceof WrongPassword ? 'Incorrect password. Please try again.' : 'Something went wrong loading this page. Please refresh and try again.')
      setBusy(false)
    }
  }

  if (Page) return <Page />

  return (
    <div
      data-page-motion="none"
      className="flex min-h-screen items-center justify-center bg-brand-dark px-6 font-inter"
      style={{ backgroundImage: 'radial-gradient(ellipse 45% 50% at 50% 48%, rgba(171,89,152,0.14), rgba(0,0,0,0) 70%)' }}
    >
      <form onSubmit={onSubmit} className={`w-full max-w-[300px] text-center transition-opacity ${checking ? 'opacity-0' : 'opacity-100'}`} aria-busy={busy || checking}>
        <div className="mx-auto flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-brand-soft">
          <LockIcon />
        </div>
        <h1 className="m-0 mt-6 font-grotesk text-[22px] font-bold text-white">Protected Work</h1>
        <p className="m-0 mt-2 text-[14px] leading-[1.55] text-[#c9b6c4]">
          This case study is password protected.
          <br />
          Enter the password to continue.
        </p>
        <label htmlFor="case-password" className="sr-only">
          Password
        </label>
        <input
          id="case-password"
          type="password"
          autoComplete="current-password"
          autoFocus
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            if (error) setError('')
          }}
          placeholder="Password"
          aria-invalid={!!error}
          aria-describedby={error ? 'case-password-error' : undefined}
          className="mt-9 block h-[42px] w-full rounded-[7px] border border-white/[0.12] bg-black/20 px-3 font-space text-[13px] text-white caret-brand-soft outline-none transition-colors placeholder:text-[#8c6f84] focus:border-brand-soft focus:ring-1 focus:ring-brand-soft/50"
        />
        {error && (
          <p id="case-password-error" role="alert" className="m-0 mt-2 text-left text-[12px] text-[#f0a3b5]">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="mt-3 flex h-[42px] w-full items-center justify-center rounded-[7px] bg-brand-accent text-[14px] font-semibold text-white transition-[filter,opacity] hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
        >
          {busy ? 'Unlocking…' : 'View Case Study →'}
        </button>
      </form>
    </div>
  )
}
