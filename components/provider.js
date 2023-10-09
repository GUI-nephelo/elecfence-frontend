'use client'

import { SessionProvider } from "next-auth/react"
import { CookiesProvider } from 'react-cookie'

export function AuthProvider({ children }) {
    return <SessionProvider>{children}</SessionProvider>
}

export function MyCookiesProvider({ children }) {
    return <CookiesProvider defaultSetOptions={{ path: '/' }}>{children}</CookiesProvider>
}