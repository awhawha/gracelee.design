#!/usr/bin/env node
/**
 * Encrypts the private case studies (AutoML, Error Analysis) for the public repo.
 *
 *   npm run encrypt:protected      (password from AUTOML_PASSWORD in the shell env or .env.automl)
 *
 * Per page <slug>:
 * Input  (gitignored): private/<dir>/<Name>.content.tsx; media: private/<dir>/public/<path>, else public/<path>
 * Output (committed):  public/protected/<slug>/<slug>.json (salt, iterations, iv; no secrets)
 *                      public/protected/<slug>/<slug>.enc  (AES-256-GCM: compiled page code + media list)
 *                      public/protected/<slug>/<random>.bin (AES-256-GCM: each media file)
 *                      components/portfolio/<name>Classes.generated.ts (Tailwind class names only)
 * Key: PBKDF2-SHA256(password, random 16-byte salt, 600k iterations), one salt shared by all pages in a run
 * (so one unlock opens every page). New salt/IVs every run; always encrypts all pages together.
 */
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const ts = require('typescript')

const root = path.join(__dirname, '..')
const PAGES = [
  { slug: 'automl', label: 'AutoML', src: 'private/automl/AutomlCaseStudy.content.tsx', classes: 'components/portfolio/automlClasses.generated.ts', constName: 'AUTOML_CLASSES' },
  { slug: 'error-analysis', label: 'Error Analysis', src: 'private/error-analysis/PivotCaseStudy.content.tsx', classes: 'components/portfolio/errorAnalysisClasses.generated.ts', constName: 'ERROR_ANALYSIS_CLASSES' },
]
const ITERATIONS = 600000
const ALLOWED_IMPORTS = [
  'react',
  'react/jsx-runtime',
  '@/components/Lightbox',
  '@/components/portfolio/CaseStudyNav',
  '@/components/portfolio/caseStudyKit',
  '@/lib/automlCaseTitle',
  '@/lib/pivotCaseTitle',
]
const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.mp4': 'video/mp4', '.webm': 'video/webm', '.svg': 'image/svg+xml' }

function readPassword() {
  if (process.env.AUTOML_PASSWORD) return process.env.AUTOML_PASSWORD
  const envFile = path.join(root, '.env.automl')
  if (fs.existsSync(envFile)) {
    for (const line of fs.readFileSync(envFile, 'utf8').split('\n')) {
      const m = line.match(/^\s*AUTOML_PASSWORD\s*=\s*(.*)\s*$/)
      if (m) return m[1].replace(/^(['"])(.*)\1$/, '$2')
    }
  }
  console.error('AUTOML_PASSWORD is not set (shell env or .env.automl).')
  process.exit(1)
}

function seal(key, buf) {
  const iv = crypto.randomBytes(12)
  const c = crypto.createCipheriv('aes-256-gcm', key, iv)
  const ct = Buffer.concat([c.update(buf), c.final(), c.getAuthTag()])
  return { iv, ct }
}

const password = readPassword()
if (password.length < 8) console.warn('Warning: password is shorter than 8 characters.')

// One salt/key for every page in this run, so one unlock opens all protected pages.
const salt = crypto.randomBytes(16)
const key = crypto.pbkdf2Sync(password, salt, ITERATIONS, 32, 'sha256')

for (const pg of PAGES) {
const SRC = path.join(root, pg.src)
const PRIVATE_PUBLIC = path.join(root, path.dirname(pg.src), 'public')
const OUT = path.join(root, 'public/protected', pg.slug)
const CLASSES = path.join(root, pg.classes)
if (!fs.existsSync(SRC)) { console.error(`Missing ${pg.src}`); process.exit(1) }
const source = fs.readFileSync(SRC, 'utf8')

// Imports must be resolvable by the gate at runtime.
for (const m of source.matchAll(/from\s+['"]([^'"]+)['"]/g)) {
  if (!ALLOWED_IMPORTS.includes(m[1])) {
    console.error(`Unsupported import "${m[1]}". Allowed: ${ALLOWED_IMPORTS.join(', ')} (add it to the gate's module map and ALLOWED_IMPORTS).`)
    process.exit(1)
  }
}

// Tailwind classes used only in the private file must still exist in the public CSS.
const classes = new Set()
for (const m of source.matchAll(/className=(?:\{`([\s\S]*?)`\}|"([^"]*)"|\{'([^']*)'\})/g)) {
  const raw = m[1] ?? m[2] ?? m[3]
  // Quoted strings inside ${...} (e.g. ternaries) are classes too.
  for (const q of raw.matchAll(/'([^']*)'/g)) for (const t of q[1].split(/\s+/)) if (t) classes.add(t)
  const s = raw.replace(/\$\{[\s\S]*?\}/g, ' ').replace(/'[^']*'/g, ' ')
  for (const t of s.split(/\s+/)) if (t && !t.includes('$') && !t.includes('?')) classes.add(t)
}

let code = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
}).outputText

fs.rmSync(OUT, { recursive: true, force: true })
fs.mkdirSync(OUT, { recursive: true })

const media = []
const index = new Map()
code = code.replace(/(["'])(\/(?:images|motions|home|videos)\/[^"']+\.[a-z0-9]+)\1/gi, (_, _q, url) => {
  if (!index.has(url)) {
    const local = [path.join(PRIVATE_PUBLIC, url), path.join(root, 'public', url)].find((p) => fs.existsSync(p))
    if (!local) { console.error(`Media not found: ${url}`); process.exit(1) }
    const file = crypto.randomBytes(8).toString('hex') + '.bin'
    const { iv, ct } = seal(key, fs.readFileSync(local))
    fs.writeFileSync(path.join(OUT, file), Buffer.concat([iv, ct]))
    index.set(url, media.length)
    media.push({ file, type: MIME[path.extname(url).toLowerCase()] || 'application/octet-stream' })
    if (local.startsWith(path.join(root, 'public'))) console.warn(`Note: ${url} is also in public/ (unencrypted, already public).`)
  }
  return `__m(${index.get(url)})`
})

const payload = Buffer.from(JSON.stringify({ v: 1, code, media }), 'utf8')
const { iv, ct } = seal(key, payload)
fs.writeFileSync(path.join(OUT, `${pg.slug}.enc`), ct)
fs.writeFileSync(
  path.join(OUT, `${pg.slug}.json`),
  JSON.stringify({ v: 1, kdf: 'PBKDF2-SHA256', iterations: ITERATIONS, salt: salt.toString('base64'), iv: iv.toString('base64') }, null, 2) + '\n',
)
fs.writeFileSync(
  CLASSES,
  `// Generated by scripts/encrypt-protected.js. Tailwind class names used by the encrypted ${pg.label} page,\n` +
    '// kept here so Tailwind still generates them. Contains no case-study content.\n' +
    `export const ${pg.constName} = ${JSON.stringify([...classes].sort().join(' '))}\n`,
)
console.log(`Encrypted ${pg.label} case study: ${media.length} media files -> ${path.relative(root, OUT)}/`)
}
