import Link from 'next/link'

interface FooterProps {
  variant?: 'light' | 'dark'
}

export default function Footer({ variant = 'light' }: FooterProps) {
  const isDark = variant === 'dark'
  const textColor = isDark ? 'text-gray-300' : 'text-gray-600'
  const hoverColor = isDark ? 'hover:text-white' : 'hover:text-gray-900'
  const bgColor = isDark ? 'bg-gray-900' : 'bg-gray-50'
  const borderColor = isDark ? 'border-gray-800' : 'border-gray-200'

  return (
    <footer className={`${bgColor} border-t ${borderColor}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Koros</h3>
            <p className={textColor}>
              La tua piattaforma per la gestione efficiente dei processi aziendali.
            </p>
            <div className="flex space-x-4">
              <a href="#" className={textColor} aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="#" className={textColor} aria-label="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a href="#" className={textColor} aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Link Rapidi</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/prodotti" className={`${textColor} ${hoverColor}`}>
                  Prodotti
                </Link>
              </li>
              <li>
                <Link href="/prezzi" className={`${textColor} ${hoverColor}`}>
                  Prezzi
                </Link>
              </li>
              <li>
                <Link href="/contatti" className={`${textColor} ${hoverColor}`}>
                  Contatti
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Legale</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className={`${textColor} ${hoverColor}`}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/termini" className={`${textColor} ${hoverColor}`}>
                  Termini di Servizio
                </Link>
              </li>
              <li>
                <Link href="/cookie" className={`${textColor} ${hoverColor}`}>
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contatti</h3>
            <ul className="space-y-2">
              <li className={textColor}>
                <span className="font-medium">Email:</span> info@koros.com
              </li>
              <li className={textColor}>
                <span className="font-medium">Tel:</span> +39 123 456 7890
              </li>
              <li className={textColor}>
                <span className="font-medium">Indirizzo:</span> Via Roma 123, Milano
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className={`mt-8 pt-8 border-t ${borderColor} text-center ${textColor}`}>
          <p>&copy; {new Date().getFullYear()} Koros. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  )
} 