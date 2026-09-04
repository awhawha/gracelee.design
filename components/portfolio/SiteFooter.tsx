/**
 * The global footer, rendered from the root layout: a slim copyright bar on the
 * deep-green ground. Contact lives in the site nav, so nothing else sits here.
 */
export function SiteFooter() {
  return (
    <footer className="bg-accent-secondary">
      <div className="mx-auto max-w-pf px-10 py-4 max-[640px]:px-6">
        <div className="font-sans text-[13px] text-accent-tertiary">© 2026 Grace Lee</div>
      </div>
    </footer>
  )
}
