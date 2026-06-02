type SectionHeadingProps = {
  children: React.ReactNode
}

export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="font-display text-2xl tracking-wider">
      {children}
    </h2>
  )
}
