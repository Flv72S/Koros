import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Costanti per la gestione dei cookie
const COOKIE_NAME = 'koros_profile'
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60 // 30 giorni in secondi

// Funzione per validare il profilo
function isValidProfile(profile: string): boolean {
  return ['b2c', 'pro', 'b2b'].includes(profile)
}

export function middleware(request: NextRequest) {
  // Ottieni il profilo dai query params
  const profile = request.nextUrl.searchParams.get('profile')

  // Se c'è un profilo valido nei query params, salvalo nel cookie
  if (profile && isValidProfile(profile)) {
    const response = NextResponse.next()
    
    // Imposta il cookie
    response.cookies.set({
      name: COOKIE_NAME,
      value: profile,
      maxAge: COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    })

    return response
  }

  return NextResponse.next()
}

// Configura il middleware per eseguirsi solo su determinate route
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 