import { ReactNode } from 'react'
import LayoutA from '../layouts/layout_A'
import LayoutB from '../layouts/layout_B'
import LayoutC from '../layouts/layout_C'

export type UserProfile = 'b2c' | 'pro' | 'b2b'

interface LayoutResolverProps {
  children: ReactNode
  profile: UserProfile
}

export function LayoutResolver({ children, profile }: LayoutResolverProps) {
  switch (profile) {
    case 'b2c':
      return <LayoutA>{children}</LayoutA>
    case 'pro':
      return <LayoutB>{children}</LayoutB>
    case 'b2b':
      return <LayoutC>{children}</LayoutC>
    default:
      // Fallback al layout B2C come default
      return <LayoutA>{children}</LayoutA>
  }
}

// Helper per ottenere il profilo dai query params
export function getProfileFromQuery(query: { profile?: string }): UserProfile {
  const validProfiles: UserProfile[] = ['b2c', 'pro', 'b2b']
  const profile = query.profile as UserProfile
  
  if (profile && validProfiles.includes(profile)) {
    return profile
  }
  
  return 'b2c' // Default al B2C se non specificato o invalido
} 