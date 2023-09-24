'use client'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '电子围栏数据系统',
  description: '',
}

export default function RootLayout({ children }) {
  return (
      <html lang="zh">
        <body className={inter.className}>
          {children}
        </body>
      </html>
  )
}
