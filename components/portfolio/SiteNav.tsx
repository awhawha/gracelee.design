import Link from 'next/link'

// Shared sticky top nav for the portfolio redesign.
// White-blur background, neutral hairline, plum "Get in touch" CTA.
export function SiteNav() {
  return (
    <div className="sticky top-0 z-50 border-b border-pf-hairline bg-[rgba(255,255,255,0.88)] backdrop-blur-[10px]">
      <div className="mx-auto flex max-w-pf items-center justify-between px-10 py-[22px] max-[640px]:px-6">
        <Link
          href="/"
          className="font-grotesk text-[19px] font-bold tracking-[-0.01em] text-pf-ink"
        >
          Grace Lee
        </Link>
        <div className="flex items-center gap-[30px] font-grotesk text-[13px] font-semibold uppercase tracking-[0.08em] text-pf-muted max-[640px]:gap-4">
          <Link href="/" className="transition-colors hover:text-pf-ink max-[480px]:hidden">
            All projects
          </Link>
          <Link href="/about" className="transition-colors hover:text-pf-ink">
            About
          </Link>
          <a
            href="mailto:yahuilee0618@gmail.com"
            className="rounded-full bg-pf-accent px-[18px] py-[9px] font-semibold tracking-[0.04em] text-white"
          >
            Get in touch
          </a>
        </div>
      </div>
    </div>
  )
}
