import { useState } from 'react'
import { useFavoriteFilters } from '../hooks/useFavoriteFilters'
import SaveFavoriteModal from './SaveFavoriteModal'
import StatusAnnouncement from './StatusAnnouncement'

interface FavoriteFiltersProps {
  selectedCategories: string[]
  priceRange: string
  className?: string
}

export default function FavoriteFilters({
  selectedCategories,
  priceRange,
  className = ''
}: FavoriteFiltersProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const { favorites, saveFavorite, deleteFavorite, applyFavorite } = useFavoriteFilters()

  const handleSave = (name: string) => {
    saveFavorite(name, selectedCategories, priceRange)
    setAnnouncement(`Filtri salvati come "${name}"`)
  }

  const handleApply = (favorite: typeof favorites[0]) => {
    applyFavorite(favorite)
    setAnnouncement(`Applicati i filtri "${favorite.name}"`)
  }

  const handleDelete = (favorite: typeof favorites[0]) => {
    deleteFavorite(favorite.id)
    setAnnouncement(`Rimosso il preferito "${favorite.name}"`)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Filtri Preferiti</h3>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-primary hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Salva filtri attuali come preferiti"
        >
          <svg
            className="w-4 h-4 mr-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
          Salva Preferiti
        </button>
      </div>

      {favorites.length > 0 ? (
        <ul className="space-y-2" role="list">
          {favorites.map((favorite) => (
            <li
              key={favorite.id}
              className="flex items-center justify-between p-2 bg-white rounded-md shadow-sm hover:bg-gray-50"
            >
              <button
                type="button"
                onClick={() => handleApply(favorite)}
                className="flex-1 text-left px-2 py-1 text-sm text-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                aria-label={`Applica filtri "${favorite.name}"`}
              >
                {favorite.name}
              </button>
              <button
                type="button"
                onClick={() => handleDelete(favorite)}
                className="ml-2 p-1 text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
                aria-label={`Elimina preferito "${favorite.name}"`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 italic">
          Nessun filtro preferito salvato
        </p>
      )}

      <SaveFavoriteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        selectedCategories={selectedCategories}
        priceRange={priceRange}
      />

      <StatusAnnouncement message={announcement} />
    </div>
  )
} 