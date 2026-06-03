import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'

// Standard alias imports for my core layout pieces
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ClientProviders from "@/components/ClientProviders"
import "./styles/globals.css" 

const inter = Inter({ 
  subsets: ["latin"], 
  variable: '--font-sans' 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: '--font-serif' 
});

export const metadata: Metadata = {
  title: 'Beleza Natural Hair Clinic | Simple & Real Hair Care',
  description: 'Helping you understand your natural curls, coils, and waves. Simple, clear, and practical routines built specifically for your unique hair journey.',
  generator: 'v0.app',
  themeColor: '#a7f3d0',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="min-h-screen bg-background text-foreground antialiased flex flex-col font-sans">
        {/* We wrap the app logic inside our new client supervisor container */}
        <ClientProviders>
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </ClientProviders>
        <Analytics />
      </body>
    </html>
  )
}