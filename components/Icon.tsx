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

const SPARKLE_PATH =
  'M14.5231 29.2759C12.6685 22.5706 7.42938 17.3315 0.724097 15.4769C0.240255 15.3431 0.240255 14.657 0.724097 14.5231C7.42938 12.6685 12.6685 7.42939 14.5231 0.724099C14.6569 0.240257 15.343 0.240257 15.4769 0.724099C17.3315 7.42939 22.5706 12.6685 29.2759 14.5231C29.7597 14.657 29.7597 15.343 29.2759 15.4769C22.5706 17.3315 17.3315 22.5706 15.4769 29.2759C15.343 29.7597 14.657 29.7597 14.5231 29.2759Z'

export function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 30" className={className ?? 'size-3'} aria-hidden>
      <path d={SPARKLE_PATH} fill="currentColor" />
    </svg>
  )
}
