import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'hohai - Stuck anywhere? Use hohai',
  description: 'hohai motto: Stuck anywhere? Use hohai. One-stop solution for all your problems and partner to a school, parent, and student.',
  keywords: 'school management, college management, coaching institute, student ERP, attendance system, payment gateway, online courses, career counselling, hohai',
  authors: [{ name: 'hohai' }],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'hohai'
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
  themeColor: '#4f46e5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storedTheme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var shouldUseDark = storedTheme ? storedTheme === 'dark' : prefersDark;
                  document.documentElement.classList.toggle('dark', shouldUseDark);
                } catch (e) {}
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  )
} 