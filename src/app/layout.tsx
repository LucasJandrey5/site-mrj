import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MRJ Tecnologia',
  description: 'Assistência técnica especializada em eletrônica industrial em Chapecó, SC.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
