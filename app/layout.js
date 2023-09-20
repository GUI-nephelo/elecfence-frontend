
import './globals.css'
import { Inter } from 'next/font/google'
import { SessionProvider } from "next-auth/react"


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <html lang="zh">
        <body className={inter.className}>{children}</body>
      </html>
    </SessionProvider>
  )
}
