import { HomeProjectCard } from '@/components/portfolio/HomeProjectCard'
import { TransitionLink } from '@/components/portfolio/PageTransition'
import { homeProjects } from '@/lib/projects'

export default function HomePage() {
  return (
    <div className="home-page font-sans text-black">
      <section className="bg-[var(--home-cream)] px-6 pb-16 pt-28 max-[640px]:pb-12 md:px-10 md:pb-20 md:pt-[195px]">
        <div className="mx-auto flex max-w-[var(--home-hero-max)] items-start gap-6 max-[640px]:flex-col">
          <div
            data-stagger
            className="shrink-0 rounded-full bg-[rgba(191,183,183,0.22)] p-[5px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/profile.jpg"
              alt="Grace Lee"
              width={80}
              height={80}
              className="size-20 rounded-full object-cover"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            <h1
              data-stagger
              className="m-0 max-w-[622px] font-display text-[32px] font-normal leading-normal tracking-[0.01em] text-[var(--home-ink)]"
            >
              <span className="font-bold">Senior Product Designer </span>
              making complex B2B workflows clearer for users and scalable for
              teams.
            </h1>
            <p
              data-stagger
              className="m-0 text-[18px] leading-[30px] text-[var(--home-ink-body)]"
            >
              With 9+ years of experience across enterprise analytics, data, and
              AI products, I turn technical complexity into trusted experiences.
              My work spans data visualization and complex interaction design,
              guided AutoML workflows and design systems—all grounded in an
              engineering mindset and close collaboration with product and
              engineering.
            </p>
            <TransitionLink
              data-stagger
              href="/about"
              className="home-about-link text-[16px] font-medium text-[var(--home-ink)]"
            >
              More about me
            </TransitionLink>
          </div>
        </div>
      </section>

      <section id="work" className="px-6 py-[60px] max-[640px]:px-6 md:px-10">
        <div className="mx-auto flex w-full max-w-[var(--home-work-max)] flex-col gap-[60px]">
          <p className="m-0 text-[24px] font-medium text-black">Selected works</p>
          <div data-stagger-group className="flex flex-col gap-[60px]">
            {homeProjects.map((p) => (
              <HomeProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
