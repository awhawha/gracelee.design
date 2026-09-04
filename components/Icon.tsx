type IconProps = {
  name: string
  className?: string
}

/** Font Awesome 7 solid icon. The kit script is loaded from the root layout. */
export function Icon({ name, className }: IconProps) {
  return (
    <i
      className={['fa-solid', name, className].filter(Boolean).join(' ')}
      aria-hidden
    />
  )
}
