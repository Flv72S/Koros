import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BooleanLogic } from './usePersistentFilters'

interface FavoriteFilter {
  id: string
  name: string
  selectedCategories: string[]
  priceRange: string
  categoryLogic: BooleanLogic
  createdAt: number
}

const STORAGE_KEY = 'koros_content_favorites'

export function useFavoriteFilters() {
  const [favorites, setFavorites] = useState<FavoriteFilter[]>([])
  const router = useRouter()

  // Carica i preferiti dal localStorage all'avvio
  useEffect(() => {
    const storedFavorites = localStorage.getItem(STORAGE_KEY)
    if (storedFavorites) {
      try {
        const parsedFavorites = JSON.parse(storedFavorites)
        // Assicurati che la logica booleana sia presente per tutti i preferiti
        const favoritesWithLogic = parsedFavorites.map((fav: FavoriteFilter) => ({
          ...fav,
          categoryLogic: fav.categoryLogic || 'OR'
        }))
        setFavorites(favoritesWithLogic)
      } catch (error) {
        console.error('Errore nel caricamento dei preferiti:', error)
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  // Salva i preferiti nel localStorage quando cambiano
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const saveFavorite = (
    name: string,
    selectedCategories: string[],
    priceRange: string,
    categoryLogic: BooleanLogic
  ) => {
    const newFavorite: FavoriteFilter = {
      id: crypto.randomUUID(),
      name,
      selectedCategories,
      priceRange,
      categoryLogic,
      createdAt: Date.now()
    }

    setFavorites(prev => [...prev, newFavorite])
  }

  const deleteFavorite = (id: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id))
  }

  const applyFavorite = (favorite: FavoriteFilter) => {
    // Aggiorna l'URL con i parametri del preferito
    const params = new URLSearchParams()
    
    if (favorite.selectedCategories.length > 0) {
      params.set('category', favorite.selectedCategories.join(','))
    }
    
    if (favorite.priceRange !== 'all') {
      params.set('price', favorite.priceRange)
    }

    if (favorite.categoryLogic !== 'OR') {
      params.set('logic', favorite.categoryLogic)
    }

    router.push(`?${params.toString()}`)
  }

  const isDuplicateName = (name: string) => {
    return favorites.some(fav => fav.name.toLowerCase() === name.toLowerCase())
  }

  return {
    favorites,
    saveFavorite,
    deleteFavorite,
    applyFavorite,
    isDuplicateName
  }
} 