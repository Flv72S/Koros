import { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface LayoutCProps {
  children: ReactNode
}

export default function LayoutC({ children }: LayoutCProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome to Koros
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Your personalized content experience
            </p>
          </div>
          <main className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
} 