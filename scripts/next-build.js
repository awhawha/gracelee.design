#!/usr/bin/env node
/**
 * Static export (GitHub Pages) cannot include App Router Route Handlers.
 * Stash `app/api` for the default `output: 'export'` build, then restore it.
 * Set DISABLE_STATIC_EXPORT=true to keep the API route and skip `output: 'export'`.
 */
const { spawnSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const apiDir = path.join(root, 'app', 'api')
const stashDir = path.join(root, '.api-stash')
const staticExport = process.env.DISABLE_STATIC_EXPORT !== 'true'

function stashApi() {
  if (!fs.existsSync(apiDir)) return false
  if (fs.existsSync(stashDir)) fs.rmSync(stashDir, { recursive: true, force: true })
  fs.renameSync(apiDir, stashDir)
  return true
}

function restoreApi() {
  if (!fs.existsSync(stashDir)) return
  if (fs.existsSync(apiDir)) fs.rmSync(apiDir, { recursive: true, force: true })
  fs.renameSync(stashDir, apiDir)
}

let didStash = false
try {
  if (staticExport) didStash = stashApi()
  const nextBin = path.join(root, 'node_modules', '.bin', 'next')
  const result = spawnSync(nextBin, ['build'], {
    cwd: root,
    stdio: 'inherit',
    env: process.env,
  })
  process.exitCode = result.status === null ? 1 : result.status
} finally {
  if (didStash) restoreApi()
}
