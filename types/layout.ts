export type UserProfile = 'buyer' | 'giornalista' | 'privato'

export type LayoutType = 'A' | 'B' | 'C'

export interface LayoutConfig {
  profile: UserProfile
  layout: LayoutType
}

// Mock configuration for layout mapping
export const layoutConfig: Record<UserProfile, LayoutType> = {
  buyer: 'A',
  giornalista: 'B',
  privato: 'C',
} 