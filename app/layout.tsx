import type { Metadata } from 'next'
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google'
import { LanguageProvider } from '@/components/providers/LanguageProvider'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import GrainOverlay from '@/components/GrainOverlay'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "L'Elite — Exclusive Concierge",
  description:
    'VIP Tickets, Luxury Hospitality & Private Event Access in Europas exklusivsten Destinationen.',
  openGraph: {
    title: "L'Elite — Exclusive Concierge",
    description:
      'VIP Tickets, Luxury Hospitality & Private Event Access in Europas exklusivsten Destinationen.',
    locale: 'de_DE',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body>
        <LanguageProvider>
          <SmoothScrollProvider>
            {children}
            <GrainOverlay />
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
