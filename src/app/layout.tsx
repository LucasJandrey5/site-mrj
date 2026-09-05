import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Sora } from 'next/font/google'
import { Footer } from '@/components/layout/Footer'
import { Nav } from '@/components/layout/Nav'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'
import { LenisProvider } from '@/components/motion/LenisProvider'
import { company } from '@/data/company'
import './globals.css'

const sora = Sora({ subsets: ['latin'], variable: '--font-sora', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' })

const defaultTitle = `${company.name} | ${company.tagline} em Chapecó`

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: { default: defaultTitle, template: `%s | ${company.name}` },
  description: company.description,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: company.name,
    title: defaultTitle,
    description: company.description,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: `${company.name}: ${company.tagline}` }],
  },
  twitter: { card: 'summary_large_image', title: defaultTitle, description: company.description, images: ['/og.jpg'] },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="flex min-h-svh flex-col">
        {/* Ponto único de inserção de analytics (GA4 ou Plausible) quando o cliente decidir. */}
        <LenisProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </LenisProvider>
      </body>
    </html>
  )
}
