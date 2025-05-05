import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface LayoutCProps {
  children: React.ReactNode
}

export default function LayoutC({ children }: LayoutCProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Navbar variant="dark" />
      <main className="flex-grow">
        {children}
      </main>
      <Footer variant="dark" />
    </div>
  )
} 