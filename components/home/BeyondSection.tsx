import Image from 'next/image'

import { FileHead, displayFont, homeWrap } from '@/components/home/FileHead'
import { Reveal } from '@/components/home/Reveal'

const prompts = [
  { q: 'WHAT DO I DO FOR FUN?', a: 'Sketching & collage' },
  { q: 'WHAT KEEPS ME GOING?', a: 'Running marathons' },
  { q: 'WHAT AM I BUILDING AT HOME?', a: 'Tiny projects with my kid' },
]

const photos = [
  { src: '/home/fun_1.jpg', alt: 'Painting of a cat in a room' },
  { src: '/home/fun_2.jpg', alt: 'Brick building and trees' },
  { src: '/home/fun_3.jpg', alt: 'Collage sketchbook' },
  { src: '/home/fun_4.jpg', alt: 'Park in spring' },
  { src: '/home/fun_5.jpg', alt: 'Grace running a marathon' },
  { src: '/home/fun_6.jpg', alt: 'Craft project with her kid' },
]

export function BeyondSection() {
  return (
    <section
      id="beyond"
      className="relative scroll-mt-12 pb-[88px] pt-[140px] min-[641px]:pb-[120px]"
    >
      <FileHead label="beyond.txt" color="#B48CE0" tone="light" />
      <div
        className={`${homeWrap} grid items-center gap-[72px] min-[1001px]:grid-cols-[1fr_1.15fr]`}
      >
        <Reveal>
          <span className="mb-3.5 block font-space text-[12px] uppercase tracking-[0.16em] text-brand-accent">
            Outside the frame
          </span>
          <h2 className={`${displayFont} text-[clamp(34px,4.2vw,52px)]`}>Beyond work</h2>
          <div className="mt-[34px] grid gap-[26px]">
            {prompts.map((item) => (
              <div key={item.q}>
                <small className="mb-0.5 block text-[13px] tracking-[1px] text-brand-muted">
                  {item.q}
                </small>
                <b
                  className={`${displayFont} text-[23px] text-brand-accent min-[641px]:text-[26px]`}
                >
                  {item.a}
                </b>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={1}>
          <div className="grid grid-cols-3 gap-2.5">
            {photos.map((photo) => (
              <Image
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                width={372}
                height={372}
                className="aspect-square w-full rounded-[14px] object-cover transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:-rotate-1 hover:shadow-[0_16px_30px_rgba(40,16,34,0.15)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:rotate-0"
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
