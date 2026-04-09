import Link from 'next/link'

export function Nav() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-bg)]">
      <nav className="mx-auto flex max-w-wide flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between md:py-8">
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-[var(--color-text)] transition-opacity hover:opacity-70"
        >
          Grace Lee
        </Link>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 font-sans text-sm text-[var(--color-text)]">
          <Link
            href="/about"
            className="no-underline decoration-1 underline-offset-[3px] hover:underline"
          >
            About
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline decoration-1 underline-offset-[3px] hover:underline"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  )
}
