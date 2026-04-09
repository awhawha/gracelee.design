import Image from 'next/image'
import Link from 'next/link'

type CaseStudyCardProps = {
  number: string
  title: string
  description: string
  tags: string[]
  href: string
  surface?: boolean
  /** First card on home: same top padding as surface cards (pt-12); 48px bottom before bg transition */
  isFirst?: boolean
  /** When set, shows hero image instead of the placeholder block */
  imageSrc?: string
  imageAlt?: string
}

export function CaseStudyCard({
  number,
  title,
  description,
  tags,
  href,
  surface = false,
  isFirst = false,
  imageSrc,
  imageAlt = '',
}: CaseStudyCardProps) {
  const articlePadding = isFirst
    ? 'px-6 pt-12 pb-12'
    : surface
      ? 'px-6 pt-12 pb-section'
      : 'px-6 py-section'

  return (
    <Link
      href={href}
      className={`group block outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-4 ${
        surface
          ? 'bg-[var(--color-bg)] focus-visible:ring-offset-[var(--color-bg)]'
          : 'bg-[var(--color-surface)] focus-visible:ring-offset-[var(--color-surface)]'
      }`}
    >
      <article className={`mx-auto max-w-wide ${articlePadding}`}>
        <div className="max-w-content">
          <p className="font-mono text-sm text-[var(--color-muted)]">{number}</p>
          <h2 className="mt-3 font-display text-[2.25rem] leading-tight tracking-tight text-[var(--color-text)] md:text-[2.5rem]">
            {title}
          </h2>
          <p className="mt-4 font-sans text-lg leading-relaxed text-[var(--color-muted)]">
            {description}
          </p>
          <p className="mt-5 font-mono text-xs font-medium uppercase text-[var(--color-muted)]">
            {tags.join('  ·  ')}
          </p>
        </div>
        <div className="mt-8 h-auto w-full overflow-visible">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1600}
              height={900}
              className="block h-auto w-full max-w-full [object-fit:unset] transition-transform duration-300 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 1100px) 100vw, 1100px"
              unoptimized
            />
          ) : (
            <div className="flex w-full scale-100 items-center justify-center bg-[var(--color-border)] py-24 transition-transform duration-300 ease-out group-hover:scale-[1.02]">
              <span className="font-mono text-[12px] tracking-[0.1em] text-[#999]">
                [ image placeholder ]
              </span>
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
