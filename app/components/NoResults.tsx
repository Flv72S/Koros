interface NoResultsProps {
  selectedCategories: string[]
  priceRange: string
  onResetFilters: () => void
  onRemoveCategory: (category: string) => void
  onUpdatePriceRange: (range: string) => void
}

export default function NoResults({
  selectedCategories,
  priceRange,
  onResetFilters,
  onRemoveCategory,
  onUpdatePriceRange
}: NoResultsProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm p-8 text-center"
      role="alert"
      aria-live="polite"
    >
      <div className="mb-6">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
          role="img"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="mt-4 text-2xl font-semibold text-gray-900">
          Nessun contenuto trovato
        </h2>
        <p className="mt-2 text-gray-600">
          Non ci sono contenuti che corrispondono ai filtri selezionati.
        </p>
      </div>

      <div className="space-y-4">
        {/* Categorie attive */}
        {selectedCategories.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Categorie selezionate:
            </h3>
            <div 
              className="flex flex-wrap gap-2 justify-center"
              role="list"
              aria-label="Categorie selezionate"
            >
              {selectedCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => onRemoveCategory(category)}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  aria-label={`Rimuovi categoria ${category}`}
                >
                  {category}
                  <svg
                    className="ml-1.5 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Range di prezzo attivo */}
        {priceRange !== 'all' && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Range di prezzo attivo:
            </h3>
            <div className="flex justify-center">
              <button
                onClick={() => onUpdatePriceRange('all')}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                aria-label={`Rimuovi filtro prezzo: ${
                  priceRange === 'free' ? 'Gratis' :
                  priceRange === 'under50' ? 'Meno di 50 euro' :
                  priceRange === '50to200' ? 'Da 50 a 200 euro' :
                  'Più di 200 euro'
                }`}
              >
                {priceRange === 'free' && 'Gratis'}
                {priceRange === 'under50' && '< 50 €'}
                {priceRange === '50to200' && '50-200 €'}
                {priceRange === 'over200' && '> 200 €'}
                <svg
                  className="ml-1.5 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Pulsante reset */}
        <div className="pt-4">
          <button
            onClick={onResetFilters}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            aria-label="Reimposta tutti i filtri"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reimposta tutti i filtri
          </button>
        </div>
      </div>
    </div>
  )
} 