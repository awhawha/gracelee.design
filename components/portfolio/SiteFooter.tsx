/**
 * The global footer, rendered from the root layout: a slim copyright bar on the
 * deep-green ground. Contact lives in the site nav, so nothing else sits here.
 */
export function SiteFooter() {
  return (
    <footer className="bg-pf-footer">
      <div className="mx-auto max-w-pf px-10 py-8 max-[640px]:px-6">
        <div className="text-[13px] text-pf-footer-muted">© 2026 Grace Lee</div>
      </div>
    </footer>
  )
}
