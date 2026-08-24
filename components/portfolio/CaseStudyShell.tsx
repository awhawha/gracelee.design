import type { ReactNode } from 'react'
import Link from 'next/link'

/** One label/value pair in the sticky rail, e.g. "Role — Lead Product Designer". */
export type CaseMetaItem = { label: string; value: string }

/**
 * Shared case-study frame: a sticky metadata rail on the left, the narrative on
 * the right. The rail's grid cell (not the pinned block inside it) carries the
 * border, so the divider runs the full page height while the rail stays pinned.
 *
 * ≤1080px the two columns stack and the rail becomes a fact sheet above the
 * title: a 3-up grid, then 2-up, then a compact label/value list on phones so
 * it does not push the headline off the first screen.
 */
export function CaseStudyShell({
  meta,
  link,
  children,
}: {
  meta?: CaseMetaItem[]
  link?: { label: string; href: string }
  children: ReactNode
}) {
  return (
    <div className="mx-auto grid max-w-[1280px] grid-cols-[264px_minmax(0,1fr)] gap-x-16 px-10 max-[1080px]:grid-cols-1 max-[1080px]:gap-x-0 max-[640px]:px-6">
      <div className="border-r border-pf-hairline max-[1080px]:border-b max-[1080px]:border-r-0 max-[520px]:border-b-0">
        <div className="sticky top-[92px] pb-16 pr-10 pt-10 max-[1080px]:static max-[1080px]:pb-8 max-[1080px]:pr-0">
          <Link
            href="/"
            className="text-[14px] font-medium text-pf-muted transition-colors hover:text-pf-ink"
          >
            ← All projects
          </Link>

          {meta && (
            <dl className="mt-8 max-[1080px]:grid max-[1080px]:grid-cols-3 max-[1080px]:gap-x-10 max-[760px]:grid-cols-2 max-[520px]:block">
              {meta.map((m) => (
                <div
                  key={m.label}
                  className="border-b border-pf-hairline py-[13px] max-[1080px]:py-[11px] max-[520px]:flex max-[520px]:items-baseline max-[520px]:justify-between max-[520px]:gap-5"
                >
                  <dt className="font-mono-ui text-[11px] uppercase tracking-[0.08em] text-pf-muted max-[520px]:shrink-0">
                    {m.label}
                  </dt>
                  <dd className="mt-[6px] text-[14px] font-medium leading-[1.45] text-pf-ink max-[520px]:mt-0 max-[520px]:text-right">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {link && (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 block rounded-full bg-pf-accent px-4 py-[11px] text-center text-[14px] font-medium text-white transition-opacity hover:opacity-90 max-[1080px]:mt-6 max-[1080px]:max-w-[260px]"
            >
              {link.label} ↗
            </a>
          )}
        </div>
      </div>

      <div className="min-w-0 pt-10 max-[1080px]:pt-9">{children}</div>
    </div>
  )
}
