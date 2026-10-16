import { FileHead, displayFont, homeWrap } from '@/components/home/FileHead'
import { LineIcon } from '@/components/home/icons'
import { Reveal } from '@/components/home/Reveal'

export function ContactSection() {
  return (
    <footer
      id="contact"
      className="relative scroll-mt-12 overflow-hidden bg-brand-dark pt-[150px] text-center text-white"
    >
      <FileHead label="contact.json" color="#7fc4e8" tone="dark" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[120px] left-1/2 z-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[rgba(171,89,152,0.28)] blur-[80px]"
      />
      <div className={`${homeWrap} relative z-[1]`}>
        <Reveal>
          <span className="mb-3.5 block font-space text-[12px] uppercase tracking-[0.16em] text-brand-soft">
            Let’s connect
          </span>
          <h2
            className={`${displayFont} mx-auto mb-[18px] mt-1 max-w-[900px] text-[clamp(40px,6vw,72px)]`}
          >
            Let’s build <span className="brand-grad">something</span> together
          </h2>
          <p className="text-[18px] text-brand-dim">
            Say hi. I’d love to hear what you’re working on.
          </p>
          <div className="mt-[34px] flex flex-wrap justify-center gap-7">
            <a
              href="mailto:yahuilee0618@gmail.com"
              className="inline-flex items-center gap-2 border-b border-white/25 pb-1 text-white transition-colors hover:border-brand-soft hover:text-brand-soft"
            >
              <LineIcon name="mail" />
              yahuilee0618@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/yahuilee/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-b border-white/25 pb-1 text-white transition-colors hover:border-brand-soft hover:text-brand-soft"
            >
              <LineIcon name="linkedin" />
              LinkedIn
            </a>
            <a
              href="/images/yahui-grace-lee-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-b border-white/25 pb-1 text-white transition-colors hover:border-brand-soft hover:text-brand-soft"
            >
              Resume <span aria-hidden>↗</span>
            </a>
          </div>
        </Reveal>
      </div>
      <div className="mt-20 border-t border-white/[0.08] py-[22px] min-[641px]:mt-[120px]">
        <div
          className={`${homeWrap} flex flex-wrap justify-between gap-2 font-space text-[12px] text-[#8c6f84]`}
        >
          <span>© 2026 Grace Lee</span>
          <span>Designed and built by me</span>
        </div>
      </div>
    </footer>
  )
}
