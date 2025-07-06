import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HOHAI - Tech Solutions & Digital Innovation',
  description: 'HOHAI provides cutting-edge tech solutions including mobile apps, web applications, and professional websites. Transform your business with our innovative digital solutions.',
  keywords: 'tech solutions, mobile apps, web development, professional websites, digital innovation, HOHAI',
  authors: [{ name: 'HOHAI' }],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'HOHAI'
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#dc2626',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
} 