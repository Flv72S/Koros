import { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface LayoutAProps {
  children: ReactNode
}

export default function LayoutA({ children }: LayoutAProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
} 