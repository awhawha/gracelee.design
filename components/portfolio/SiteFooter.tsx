/**
 * The global footer, rendered from the root layout.
 * Contact lives in the site nav, so nothing else sits here.
 */
export function SiteFooter() {
  return (
    <footer>
      <div className="flex justify-center px-10 py-4 max-[640px]:px-6">
        <div className="font-sans text-[12px] tracking-[0.01em] text-[#b0aea8]">
          @2026 Grace Lee
        </div>
      </div>
    </footer>
  )
}
