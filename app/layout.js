// 'use client'
import { AuthProvider } from '@/components/provider'
import './globals.css'
import { Inter } from 'next/font/google'
import { title } from '@/lib/config'
// import { SessionProvider } from 'next-auth/react'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title,
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <AuthProvider>
          {/* <SessionProvider> */}
          {children}
          {/* </SessionProvider> */}
        </AuthProvider>
      </body>
    </html >
  )
}
