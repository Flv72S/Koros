import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface LayoutBProps {
  children: React.ReactNode
}

export default function LayoutB({ children }: LayoutBProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar variant="light" />
      <main className="flex-grow">
        {children}
      </main>
      <Footer variant="light" />
    </div>
  )
} 