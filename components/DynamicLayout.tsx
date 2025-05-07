import { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { UserProfile, LayoutType } from '@/types/layout'
import { layoutConfig } from '@/types/layout'

interface DynamicLayoutProps {
  children: ReactNode
  userProfile: UserProfile
}

export default function DynamicLayout({ children, userProfile }: DynamicLayoutProps) {
  const layoutType = layoutConfig[userProfile]
  
  // Dynamically import the layout component
  const LayoutComponent = dynamic(() => import(`@/layouts/layout_${layoutType.toLowerCase()}`), {
    loading: () => <div>Loading layout...</div>,
  })

  return <LayoutComponent>{children}</LayoutComponent>
} 