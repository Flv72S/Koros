import { useCallback, useEffect, useRef } from 'react'
import { Content } from '../lib/content/types'
import { ContentCache } from '../lib/cache/contentCache'

// Singleton instance
const contentCache = new ContentCache()

export function useContentCache() {
  const cacheRef = useRef(contentCache)

  // Funzione per ottenere il contenuto dalla cache
  const getCachedContent = useCallback(async (source: string, type: string): Promise<Content | null> => {
    return cacheRef.current.get(source, type)
  }, [])

  // Funzione per memorizzare il contenuto nella cache
  const setCachedContent = useCallback(async (
    source: string,
    type: string,
    content: Content,
    ttl?: number
  ): Promise<void> => {
    await cacheRef.current.set(source, type, content, ttl)
  }, [])

  // Funzione per invalidare un contenuto specifico
  const invalidateContent = useCallback(async (source: string, type: string): Promise<void> => {
    await cacheRef.current.invalidate(source, type)
  }, [])

  // Funzione per invalidare tutti i contenuti di un certo tipo
  const invalidateByType = useCallback(async (type: string): Promise<void> => {
    await cacheRef.current.invalidateByType(type)
  }, [])

  // Funzione per invalidare tutta la cache
  const invalidateAll = useCallback(async (): Promise<void> => {
    await cacheRef.current.invalidateAll()
  }, [])

  // Funzione per ottenere le statistiche della cache
  const getCacheStats = useCallback(() => {
    return cacheRef.current.getStats()
  }, [])

  // Effetto per la pulizia della cache quando il componente viene smontato
  useEffect(() => {
    return () => {
      // Qui potremmo implementare una logica di persistenza della cache
      // se necessario in futuro
    }
  }, [])

  return {
    getCachedContent,
    setCachedContent,
    invalidateContent,
    invalidateByType,
    invalidateAll,
    getCacheStats
  }
} 