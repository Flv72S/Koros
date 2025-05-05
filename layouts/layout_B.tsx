import { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface LayoutBProps {
  children: ReactNode
}

export default function LayoutB({ children }: LayoutBProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-6 py-8">
          <aside className="col-span-3 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Sidebar</h2>
            {/* Add sidebar content here */}
          </aside>
          <main className="col-span-9">
            {children}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
} 