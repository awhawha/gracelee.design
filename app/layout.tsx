import type { Metadata } from 'next'
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Inter,
  Playfair_Display,
  Space_Grotesk,
} from 'next/font/google'
import Script from "next/script"
import { SiteFooter } from '@/components/portfolio/SiteFooter'
import { SiteNav } from '@/components/portfolio/SiteNav'

import '@/styles/globals.css'

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

// Reading face for case-study body copy; Space Grotesk stays on headings.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

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
  icons: {
    icon: [
      { url: '/favicon/32x32.svg', type: 'image/svg+xml', sizes: 'any' },
      { url: '/favicon/16x16.svg', type: 'image/svg+xml', sizes: '16x16' },
      { url: '/favicon/48x48.svg', type: 'image/svg+xml', sizes: '48x48' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
     
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${playfair.variable} ${plexSans.variable} ${plexMono.variable} min-h-screen font-grotesk text-pf-ink antialiased`}
      >
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YDFFENJ86V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YDFFENJ86V');
          `}
        </Script>
      </body>
    </html>
  )
}
