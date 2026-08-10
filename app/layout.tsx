import type { Metadata } from 'next'
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Playfair_Display,
  Space_Grotesk,
} from 'next/font/google'
import Script from "next/script"
import { SiteNav } from '@/components/portfolio/SiteNav'

import '@/styles/globals.css'

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-space-grotesk',
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
     
      <body
        className={`${spaceGrotesk.variable} ${playfair.variable} ${plexSans.variable} ${plexMono.variable} min-h-screen font-grotesk text-pf-ink antialiased`}
      >
        <SiteNav />
        <main>{children}</main>

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
