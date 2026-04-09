import type { Metadata } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans, Playfair_Display } from 'next/font/google'

import { Nav } from '@/components/Nav'

import '@/styles/globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const plexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-plex-sans',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Grace Lee — Product Designer',
    template: '%s — Grace Lee',
  },
  description:
    'Senior product designer specializing in enterprise AI, data platforms, and design systems. Bay Area.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${plexSans.variable} ${plexMono.variable} min-h-screen font-sans text-[var(--color-text)] antialiased`}
      >
        <Nav />
        <main>{children}</main>
        <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
          <div className="mx-auto max-w-wide px-6 py-12">
            <p className="text-[12px] text-[var(--color-muted)]">
              © 2026 Grace Lee
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
