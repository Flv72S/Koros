import { useState } from 'react'
import ResetButtons from './ResetButtons'
import FavoriteFilters from './FavoriteFilters'
import BooleanLogicToggle from './BooleanLogicToggle'
import { BooleanLogic } from '../hooks/usePersistentFilters'

interface ContentFiltersProps {
  selectedCategories: string[]
  priceRange: string
  categoryLogic: BooleanLogic
  onFiltersChange: (filters: {
    selectedCategories: string[]
    priceRange: string
    categoryLogic: BooleanLogic
  }) => void
  onResetFilters: () => void
  onRemoveCategory: (category: string) => void
  onUpdatePriceRange: (range: string) => void
}

export default function ContentFilters({
  selectedCategories,
  priceRange,
  categoryLogic,
  onFiltersChange,
  onResetFilters,
  onRemoveCategory,
  onUpdatePriceRange
}: ContentFiltersProps) {
  const allCategories = ['Corsi', 'E-book', 'Video', 'Audio', 'Template']

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category]
    
    onFiltersChange({
      selectedCategories: newCategories,
      priceRange,
      categoryLogic
    })
  }

  const handlePriceRangeChange = (range: string) => {
    onUpdatePriceRange(range)
    onFiltersChange({
      selectedCategories,
      priceRange: range,
      categoryLogic
    })
  }

  const handleLogicChange = (logic: BooleanLogic) => {
    onFiltersChange({
      selectedCategories,
      priceRange,
      categoryLogic: logic
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Categorie */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Categorie</h3>
          <div className="flex flex-wrap gap-2">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`
                  px-3 py-1 rounded-full text-sm font-medium
                  ${selectedCategories.includes(category)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                `}
                aria-pressed={selectedCategories.includes(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Logica Booleana */}
        {selectedCategories.length >= 2 && (
          <BooleanLogicToggle
            value={categoryLogic}
            onChange={handleLogicChange}
          />
        )}

        {/* Fascia di prezzo */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Fascia di prezzo</h3>
          <div className="flex flex-wrap gap-2">
            {['all', 'free', 'paid'].map((range) => (
              <button
                key={range}
                onClick={() => handlePriceRangeChange(range)}
                className={`
                  px-3 py-1 rounded-full text-sm font-medium
                  ${priceRange === range
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                `}
                aria-pressed={priceRange === range}
              >
                {range === 'all' ? 'Tutti' : range === 'free' ? 'Gratuiti' : 'A pagamento'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filtri Preferiti */}
      <FavoriteFilters
        selectedCategories={selectedCategories}
        priceRange={priceRange}
      />

      {/* Pulsanti di reset */}
      {(selectedCategories.length > 0 || priceRange !== 'all') && (
        <ResetButtons />
      )}
    </div>
  )
} 