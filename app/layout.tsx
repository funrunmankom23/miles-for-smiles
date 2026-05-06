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
  title: 'Miles for Smiles 2026 - Fun Run 5K Universitas Andalas',
  description: 'Miles for Smiles 2026 adalah event Fun Run 5K yang diselenggarakan di Universitas Andalas, Padang. Daftarkan diri sekarang dan berlari untuk kebaikan!',
  keywords: ['Miles for Smiles', 'fun run', 'lari', '5K', 'Universitas Andalas', 'Unand', 'Padang', 'event lari 2026', 'charity run'],
  authors: [{ name: 'Miles for Smiles Unand' }],
  metadataBase: new URL('https://miles-for-smiles-unand.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Miles for Smiles 2026 - Fun Run 5K Universitas Andalas',
    description: 'Miles for Smiles 2026 adalah event Fun Run 5K yang diselenggarakan di Universitas Andalas, Padang. Daftarkan diri sekarang dan berlari untuk kebaikan!',
    url: 'https://miles-for-smiles-unand.vercel.app',
    siteName: 'Miles for Smiles 2026',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Miles for Smiles 2026 - Fun Run 5K Universitas Andalas',
    description: 'Event Fun Run 5K di Universitas Andalas, Padang. Daftar sekarang!',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
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
