type Field = { label: string; value: string }

type MetadataRowProps = {
  items: Field[]
}

export function MetadataRow({ items }: MetadataRowProps) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.label}>
          <p className="font-mono text-xs small-caps-meta text-[var(--color-muted)]">
            {item.label}
          </p>
          <p className="mt-2 font-sans text-base text-[var(--color-text)]">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  )
}
