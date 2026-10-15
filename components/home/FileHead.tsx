export const homeWrap = 'mx-auto w-full max-w-[1160px] px-5 min-[641px]:px-8'

export const displayFont =
  'font-grotesk font-bold leading-[1.08] tracking-[-0.015em]'

export function FileHead({
  label,
  color,
  tone,
}: {
  label: string
  color: string
  tone: 'light' | 'dark'
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 z-[2] flex h-[34px] items-center gap-2 border-b font-space text-[12px] ${
        tone === 'light'
          ? 'border-brand-line bg-[#f6eef3] text-brand-muted'
          : 'border-white/[0.07] bg-black/[0.12] text-[#8c6f84]'
      }`}
      style={{ paddingInline: 'max(24px, calc((100% - 1160px) / 2 + 32px))' }}
    >
      <span
        className="inline-block size-2 shrink-0 rounded-[2px]"
        style={{ backgroundColor: color }}
        aria-hidden
      />
      {label}
    </div>
  )
}
