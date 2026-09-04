import type { Metadata } from 'next'
import { Domine, Open_Sans } from 'next/font/google'
import Script from "next/script"
import { GraceLLM, GraceLLMProvider } from '@/components/grace-llm/GraceLLM'
import { HomeCursor } from '@/components/portfolio/HomeCursor'
import { SiteFooter } from '@/components/portfolio/SiteFooter'
import { SiteNav } from '@/components/portfolio/SiteNav'

import '@/styles/tokens.css'
import '@/styles/globals.css'

const domine = Domine({
  subsets: ['latin'],
  variable: '--font-domine',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
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
        className={`${domine.variable} ${openSans.variable} min-h-screen font-sans text-primary antialiased`}
      >
        <GraceLLMProvider>
          <HomeCursor />
          <div className="flex min-h-screen">
            <div className="flex min-h-screen min-w-0 flex-1 flex-col">
              <SiteNav />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
            <GraceLLM />
          </div>
        </GraceLLMProvider>

        <Script
          src="https://kit.fontawesome.com/934fe6c160.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
          data-auto-replace-svg="nest"
        />
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
