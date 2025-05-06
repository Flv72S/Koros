import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { mainMenu } from './config/menu'
import { findMenuItemBySlug } from './config/menu'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Koros - Consulenza e Formazione',
  description: 'Consulenza e formazione aziendale di qualità',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <header className="bg-white shadow-sm">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <a href="/" className="text-2xl font-bold text-primary">
                    Koros
                  </a>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {mainMenu.map((item) => (
                    <a
                      key={item.id}
                      href={item.slug}
                      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-primary"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Koros</h3>
                <p className="text-gray-600">
                  Consulenza e formazione aziendale di qualità
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contatti</h3>
                <p className="text-gray-600">
                  Email: info@koros.it<br />
                  Tel: +39 123 456 7890
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Link Utili</h3>
                <ul className="space-y-2">
                  {mainMenu.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.slug}
                        className="text-gray-600 hover:text-primary"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
} 