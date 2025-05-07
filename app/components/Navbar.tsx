import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Gestisce la chiusura del menu quando si clicca fuori
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Gestisce il focus quando il menu si apre/chiude
  useEffect(() => {
    if (isMenuOpen) {
      // Sposta il focus al primo link del menu
      const firstLink = menuRef.current?.querySelector('a')
      firstLink?.focus()
    } else {
      // Riporta il focus al pulsante del menu
      buttonRef.current?.focus()
    }
  }, [isMenuOpen])

  // Gestisce la chiusura del menu con ESC
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <nav 
      className="bg-white shadow-sm"
      role="navigation"
      aria-label="Navigazione principale"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/"
            className="text-xl font-bold text-primary"
            aria-label="Koros - Torna alla home"
          >
            Koros
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/prodotti"
              className="text-gray-700 hover:text-primary focus:outline-none focus:text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            >
              Prodotti
            </Link>
            <Link 
              href="/servizi"
              className="text-gray-700 hover:text-primary focus:outline-none focus:text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            >
              Servizi
            </Link>
            <Link 
              href="/contatti"
              className="text-gray-700 hover:text-primary focus:outline-none focus:text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            >
              Contatti
            </Link>
          </div>

          {/* Pulsante Menu Mobile */}
          <button
            ref={buttonRef}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Chiudi menu" : "Apri menu"}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
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

        {/* Menu Mobile */}
        <div
          ref={menuRef}
          id="mobile-menu"
          className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
          role="menu"
          aria-label="Menu mobile"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/prodotti"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 focus:outline-none focus:text-primary focus:bg-gray-50 focus:ring-2 focus:ring-primary focus:ring-offset-2"
              role="menuitem"
            >
              Prodotti
            </Link>
            <Link
              href="/servizi"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 focus:outline-none focus:text-primary focus:bg-gray-50 focus:ring-2 focus:ring-primary focus:ring-offset-2"
              role="menuitem"
            >
              Servizi
            </Link>
            <Link
              href="/contatti"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 focus:outline-none focus:text-primary focus:bg-gray-50 focus:ring-2 focus:ring-primary focus:ring-offset-2"
              role="menuitem"
            >
              Contatti
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 