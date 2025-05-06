import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export type BooleanLogic = 'AND' | 'OR'

interface Filters {
  selectedCategories: string[]
  priceRange: string
  categoryLogic: BooleanLogic
}

const STORAGE_KEY = 'koros_content_filters'

export function usePersistentFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<Filters>({
    selectedCategories: [],
    priceRange: 'all',
    categoryLogic: 'OR'
  })
  const [isInitialized, setIsInitialized] = useState(false)
  const [announcement, setAnnouncement] = useState<string | null>(null)

  // Carica i filtri dal localStorage all'avvio
  useEffect(() => {
    const storedFilters = localStorage.getItem(STORAGE_KEY)
    if (storedFilters) {
      try {
        const parsedFilters = JSON.parse(storedFilters)
        // Assicurati che la logica booleana sia presente
        if (!parsedFilters.categoryLogic) {
          parsedFilters.categoryLogic = 'OR'
        }
        setFilters(parsedFilters)
      } catch (error) {
        console.error('Errore nel caricamento dei filtri:', error)
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  // Aggiorna i filtri quando cambiano i parametri URL
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    const priceParam = searchParams.get('price')
    const logicParam = searchParams.get('logic') as BooleanLogic | null

    setFilters(prev => ({
      selectedCategories: categoryParam ? categoryParam.split(',') : [],
      priceRange: priceParam || 'all',
      categoryLogic: logicParam || prev.categoryLogic
    }))
  }, [searchParams])

  // Salva i filtri nel localStorage quando cambiano
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters))
  }, [filters])

  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters(prev => {
      const updated = { ...prev, ...newFilters }
      
      // Aggiorna l'URL con i nuovi parametri
      const params = new URLSearchParams()
      
      if (updated.selectedCategories.length > 0) {
        params.set('category', updated.selectedCategories.join(','))
      }
      
      if (updated.priceRange !== 'all') {
        params.set('price', updated.priceRange)
      }

      if (updated.categoryLogic !== 'OR') {
        params.set('logic', updated.categoryLogic)
      }

      router.push(`?${params.toString()}`)
      
      return updated
    })
  }

  const resetFilters = () => {
    setFilters({
      selectedCategories: [],
      priceRange: 'all',
      categoryLogic: 'OR'
    })
  }

  const removeCategory = (category: string) => {
    setFilters(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.filter(c => c !== category)
    }))
    setAnnouncement(null)
  }

  const updatePriceRange = (range: string) => {
    setFilters(prev => ({
      ...prev,
      priceRange: range
    }))
    setAnnouncement(null)
  }

  return {
    filters,
    announcement,
    updateFilters,
    resetFilters,
    removeCategory,
    updatePriceRange
  }
} 