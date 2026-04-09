type SectionHeadingProps = {
  children: React.ReactNode
}

export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] underline decoration-[var(--color-accent)] decoration-2 underline-offset-[8px]">
      {children}
    </h2>
  )
}
