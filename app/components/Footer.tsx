import Link from 'next/link'

export default function Footer() {
  return (
    <footer 
      className="bg-gray-900 text-white"
      role="contentinfo"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sezione Azienda */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Azienda</h2>
            <nav aria-label="Link aziendali">
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/chi-siamo"
                    className="text-gray-300 hover:text-white focus:outline-none focus:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  >
                    Chi siamo
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/lavora-con-noi"
                    className="text-gray-300 hover:text-white focus:outline-none focus:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  >
                    Lavora con noi
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blog"
                    className="text-gray-300 hover:text-white focus:outline-none focus:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Sezione Prodotti */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Prodotti</h2>
            <nav aria-label="Link prodotti">
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/prodotti/soluzioni"
                    className="text-gray-300 hover:text-white focus:outline-none focus:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  >
                    Soluzioni
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/prodotti/prezzi"
                    className="text-gray-300 hover:text-white focus:outline-none focus:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  >
                    Prezzi
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/prodotti/casi-studio"
                    className="text-gray-300 hover:text-white focus:outline-none focus:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  >
                    Casi studio
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Sezione Supporto */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Supporto</h2>
            <nav aria-label="Link supporto">
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/supporto/faq"
                    className="text-gray-300 hover:text-white focus:outline-none focus:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/supporto/documentazione"
                    className="text-gray-300 hover:text-white focus:outline-none focus:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  >
                    Documentazione
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/supporto/contatti"
                    className="text-gray-300 hover:text-white focus:outline-none focus:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                  >
                    Contatti
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Sezione Social */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Seguici</h2>
            <nav aria-label="Link social media">
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white focus:outline-none focus:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                    aria-label="Seguici su LinkedIn (si apre in una nuova finestra)"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a 
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white focus:outline-none focus:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                    aria-label="Seguici su Twitter (si apre in una nuova finestra)"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a 
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white focus:outline-none focus:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                    aria-label="Seguici su Facebook (si apre in una nuova finestra)"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} Koros. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  )
} 