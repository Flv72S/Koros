import { ReactNode } from 'react'
import { LayoutResolver, UserProfile } from './utils/layoutResolver'
import { headers } from 'next/headers'
import { cookies } from 'next/headers'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

interface RootLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Koros Base',
  description: 'A dynamic content platform with personalized layouts',
}

// Costanti per la gestione dei cookie
const COOKIE_NAME = 'koros_profile'
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60 // 30 giorni in secondi

// Funzione per validare il profilo
function isValidProfile(profile: string): profile is UserProfile {
  return ['b2c', 'pro', 'b2b'].includes(profile)
}

// Funzione per ottenere il profilo da query params o cookie
function getProfileFromRequest(): UserProfile {
  // Ottieni i query params dall'URL
  const headersList = headers()
  const url = headersList.get('x-url') || ''
  const searchParams = new URL(url).searchParams
  const queryProfile = searchParams.get('profile')

  // Se c'è un profilo valido nei query params, usalo
  if (queryProfile && isValidProfile(queryProfile)) {
    return queryProfile
  }

  // Altrimenti, prova a recuperare dal cookie
  const cookieStore = cookies()
  const cookieProfile = cookieStore.get(COOKIE_NAME)?.value

  if (cookieProfile && isValidProfile(cookieProfile)) {
    return cookieProfile
  }

  // Default a B2C se nessun profilo valido è trovato
  return 'b2c'
}

export default function RootLayout({ children }: RootLayoutProps) {
  const profile = getProfileFromRequest()

  return (
    <html lang="it">
      <body className={`${inter.variable} font-sans`}>
        <LayoutResolver profile={profile}>
          {children}
        </LayoutResolver>
      </body>
    </html>
  )
} 