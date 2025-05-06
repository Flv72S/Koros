import { mainMenu, findMenuItemBySlug } from '../config/menu'
import ContentPage from '../components/ContentPage'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
}

export default function DynamicPage({ params }: PageProps) {
  // Costruisci il percorso completo
  const fullPath = '/' + params.slug
  const menuItem = findMenuItemBySlug(fullPath, mainMenu)

  if (!menuItem) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <section className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {menuItem.label}
        </h1>
        {menuItem.description && (
          <p className="text-xl text-gray-600 mb-8">
            {menuItem.description}
          </p>
        )}
        <ContentPage menuItem={menuItem} />
      </section>

      {menuItem.children && menuItem.children.length > 0 && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {menuItem.children.map(child => (
            <div
              key={child.id}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {child.label}
              </h2>
              {child.description && (
                <p className="text-gray-600 mb-4">
                  {child.description}
                </p>
              )}
              <a
                href={child.slug}
                className="text-primary hover:text-primary-dark font-medium"
              >
                Scopri di più →
              </a>
            </div>
          ))}
        </section>
      )}
    </div>
  )
} 