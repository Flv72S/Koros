import { useRouter, useSearchParams } from 'next/navigation'
import { useLayoutPreference } from './useLayoutPreference'
import { usePersistentFilters } from './usePersistentFilters'

export function useResetState() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { resetLayout } = useLayoutPreference()
  const { resetFilters } = usePersistentFilters()

  const softReset = () => {
    // Resetta solo i filtri
    resetFilters()
    
    // Aggiorna l'URL mantenendo la pagina corrente e l'ordinamento
    const params = new URLSearchParams(searchParams.toString())
    params.delete('category')
    params.delete('price')
    router.push(`?${params.toString()}`)
  }

  const hardReset = () => {
    // Resetta tutto
    resetFilters()
    resetLayout()
    
    // Aggiorna l'URL rimuovendo tutti i parametri
    router.push('/')
  }

  return {
    softReset,
    hardReset
  }
} 