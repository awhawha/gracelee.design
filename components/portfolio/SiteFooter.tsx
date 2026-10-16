'use client'

import { usePathname } from 'next/navigation'

/**
 * The global footer, rendered from the root layout.
 * The homepage has its own contact footer, so this one stays off `/`.
 */
export function SiteFooter() {
  const pathname = usePathname() || '/'
  if (pathname === '/') return null

  return (
    <footer>
      <div className="flex justify-center px-10 py-4 max-[640px]:px-6">
        <div className="font-sans text-[12px] tracking-[0.01em] text-[#b0aea8]">
          © 2026 Grace Lee
        </div>
      </div>
    </footer>
  )
}
