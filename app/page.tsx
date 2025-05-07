import { mainMenu, findMenuItemBySlug } from './config/menu'
import ContentPage from './components/ContentPage'

export default function Home() {
  const homeItem = findMenuItemBySlug('/', mainMenu)

  if (!homeItem) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Benvenuto su Koros
        </h1>
        <p className="text-gray-600">
          Siamo in fase di aggiornamento del sito. Torna presto!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <section className="text-center py-12 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg">
        <h1 className="text-4xl font-bold mb-4">
          Consulenza e Formazione di Qualità
        </h1>
        <p className="text-xl max-w-2xl mx-auto">
          Trasformiamo le sfide aziendali in opportunità di crescita attraverso
          consulenza strategica e formazione professionale.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {mainMenu
          .filter(item => item.id !== 'home')
          .map(item => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {item.label}
              </h2>
              <p className="text-gray-600 mb-4">
                {item.description}
              </p>
              <a
                href={item.slug}
                className="text-primary hover:text-primary-dark font-medium"
              >
                Scopri di più →
              </a>
            </div>
          ))}
      </section>

      <ContentPage menuItem={homeItem} />
    </div>
  )
} 