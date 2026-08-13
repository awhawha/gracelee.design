import Link from 'next/link'

// Shared sticky top nav for the portfolio redesign.
// White-blur background, neutral hairline, text links only.
export function SiteNav() {
  return (
    <div className="sticky top-0 z-50 border-b border-pf-hairline bg-[rgba(255,255,255,0.88)] backdrop-blur-[10px]">
      <div className="mx-auto flex max-w-pf items-center justify-between px-10 py-[22px] max-[640px]:px-6">
        <Link
          href="/"
          className="font-grotesk text-[19px] font-semibold tracking-[-0.01em] text-pf-ink"
        >
          Grace Lee
        </Link>
        <div className="flex items-center gap-[30px] font-grotesk text-[14px] font-medium tracking-[0.01em] text-pf-muted max-[640px]:gap-4">
          <Link href="/" className="transition-colors hover:text-pf-ink max-[480px]:hidden">
            All projects
          </Link>
          <Link href="/about" className="transition-colors hover:text-pf-ink">
            About
          </Link>
          <a
            href="/images/gracelee-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-pf-ink"
          >
            Resume ↗
          </a>
          <a
            href="https://www.linkedin.com/in/yahuilee/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-pf-ink"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>
    </div>
  )
}
