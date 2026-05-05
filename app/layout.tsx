import type { Metadata } from 'next'
import { Nunito, Bebas_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const nunito = Nunito({ 
  subsets: ["latin"],
  variable: '--font-nunito',
  weight: ['400', '600', '700', '800', '900']
});

const bebasNeue = Bebas_Neue({ 
  subsets: ["latin"],
  variable: '--font-display',
  weight: ['400']
});

export const metadata: Metadata = {
  title: 'Miles for Smiles 2026 - Fun Run Event',
  description: 'Bergabunglah dalam Miles for Smiles 2026! Fun Run 5K untuk kebaikan dan kesehatan. Daftarkan diri Anda sekarang!',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="bg-background">
      <body className={`${nunito.variable} ${bebasNeue.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
