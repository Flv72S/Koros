import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface LayoutAProps {
  children: React.ReactNode
}

export default function LayoutA({ children }: LayoutAProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar variant="light" />
      <main className="flex-grow">
        {children}
      </main>
      <Footer variant="light" />
    </div>
  )
} 