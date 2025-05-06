import { useState, useCallback } from 'react'
import { MenuItem, Content } from '../lib/content/types'
import { ContentFactory } from '../lib/content/contentFactory'
import { ContentProvider } from '../lib/content/types'
import { useContentCache } from './useContentCache'

interface ContentLoaderState {
  content: Content | null
  isLoading: boolean
  error: string | null
}

interface UseContentLoaderOptions {
  provider: ContentProvider
  source: string
  type: string
  cacheTTL?: number // Time to live in milliseconds
}

export function useContentLoader({ provider, source, type, cacheTTL }: UseContentLoaderOptions) {
  const [state, setState] = useState<ContentLoaderState>({
    content: null,
    isLoading: true,
    error: null
  })
  const { getCachedContent, setCachedContent, invalidateContent } = useContentCache()

  const loadContent = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      // Prima controlla la cache
      const cachedContent = await getCachedContent(source, type)
      if (cachedContent) {
        setState(prev => ({
          ...prev,
          content: cachedContent,
          isLoading: false,
          error: null
        }))
        return
      }

      // Se non è in cache, carica dalla sorgente
      const factory = ContentFactory.getInstance()
      const newContent = await provider.loadContent(source)
      
      // Valida il contenuto
      if (!provider.validateContent(newContent)) {
        throw new Error('Contenuto non valido')
      }

      // Salva in cache
      await setCachedContent(source, type, newContent, cacheTTL)
      
      setState(prev => ({
        ...prev,
        content: newContent,
        isLoading: false,
        error: null
      }))
    } catch (err) {
      setState(prev => ({
        ...prev,
        content: null,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Errore nel caricamento del contenuto'
      }))
    }
  }, [provider, source, type, cacheTTL, getCachedContent, setCachedContent])

  const reloadContent = useCallback(async () => {
    // Invalida la cache prima di ricaricare
    await invalidateContent(source, type)
    await loadContent()
  }, [source, type, invalidateContent, loadContent])

  const saveContent = async (content: Content) => {
    try {
      const factory = ContentFactory.getInstance()
      const provider = factory.getProvider(source)
      await provider.saveContent(source, content)

      setState(prev => ({
        ...prev,
        content,
        error: null
      }))

      return true
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Errore nel salvataggio'
      }))
      return false
    }
  }

  return {
    ...state,
    saveContent,
    loadContent,
    reloadContent
  }
} 