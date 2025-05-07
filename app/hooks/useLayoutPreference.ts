import { useState, useEffect } from 'react'

export type LayoutType = 'grid' | 'list'

const STORAGE_KEY = 'koros_content_layout'
const DEFAULT_LAYOUT: LayoutType = 'grid'

export function useLayoutPreference() {
  const [layout, setLayout] = useState<LayoutType>(DEFAULT_LAYOUT)
  const [isInitialized, setIsInitialized] = useState(false)
  const [announcement, setAnnouncement] = useState<string | null>(null)

  // Inizializza il layout
  useEffect(() => {
    if (isInitialized) return

    const savedLayout = localStorage.getItem(STORAGE_KEY) as LayoutType | null
    if (savedLayout && (savedLayout === 'grid' || savedLayout === 'list')) {
      setLayout(savedLayout)
      setAnnouncement(`Layout impostato su ${savedLayout === 'grid' ? 'griglia' : 'lista'}`)
    }

    setIsInitialized(true)
  }, [isInitialized])

  // Salva il layout nel localStorage quando cambia
  useEffect(() => {
    if (!isInitialized) return
    localStorage.setItem(STORAGE_KEY, layout)
  }, [layout, isInitialized])

  const toggleLayout = () => {
    const newLayout = layout === 'grid' ? 'list' : 'grid'
    setLayout(newLayout)
    setAnnouncement(`Layout impostato su ${newLayout === 'grid' ? 'griglia' : 'lista'}`)
  }

  const resetLayout = () => {
    setLayout(DEFAULT_LAYOUT)
    localStorage.removeItem(STORAGE_KEY)
    setAnnouncement('Layout reimpostato su griglia')
  }

  return {
    layout,
    toggleLayout,
    resetLayout,
    announcement
  }
} 