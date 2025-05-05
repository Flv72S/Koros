import { useState } from 'react'
import Link from 'next/link'

interface NavbarProps {
  variant?: 'light' | 'dark'
}

export default function Navbar({ variant = 'light' }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isDark = variant === 'dark'
  const textColor = isDark ? 'text-white' : 'text-gray-900'
  const hoverColor = isDark ? 'hover:text-gray-300' : 'hover:text-gray-600'
  const bgColor = isDark ? 'bg-gray-900' : 'bg-white'
  const borderColor = isDark ? 'border-gray-800' : 'border-gray-200'

  return (
    <nav className={`${bgColor} border-b ${borderColor} sticky top-0 z-50`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className={`text-xl font-bold ${textColor}`}>
            Koros
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`${textColor} ${hoverColor}`}>
              Home
            </Link>
            <Link href="/prodotti" className={`${textColor} ${hoverColor}`}>
              Prodotti
            </Link>
            <Link href="/prezzi" className={`${textColor} ${hoverColor}`}>
              Prezzi
            </Link>
            <Link href="/contatti" className={`${textColor} ${hoverColor}`}>
              Contatti
            </Link>
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
              Inizia Ora
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 ${textColor}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`${textColor} ${hoverColor}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/prodotti"
                className={`${textColor} ${hoverColor}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Prodotti
              </Link>
              <Link
                href="/prezzi"
                className={`${textColor} ${hoverColor}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Prezzi
              </Link>
              <Link
                href="/contatti"
                className={`${textColor} ${hoverColor}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contatti
              </Link>
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark w-full">
                Inizia Ora
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 