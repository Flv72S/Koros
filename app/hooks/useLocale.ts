import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Locale, locales, getDefaultLocale, getLocale, isValidLocale } from '../config/i18n'

export function useLocale() {
  const router = useRouter()
  const [currentLocale, setCurrentLocale] = useState<Locale>(getDefaultLocale())

  // Inizializza la lingua corrente
  useEffect(() => {
    // Prova a ottenere la lingua dall'URL
    const pathLocale = router.asPath.split('/')[1]
    if (isValidLocale(pathLocale)) {
      const locale = getLocale(pathLocale)
      if (locale) {
        setCurrentLocale(locale)
        return
      }
    }

    // Prova a ottenere la lingua dal localStorage
    const savedLocale = localStorage.getItem('locale')
    if (savedLocale && isValidLocale(savedLocale)) {
      const locale = getLocale(savedLocale)
      if (locale) {
        setCurrentLocale(locale)
        return
      }
    }

    // Prova a ottenere la lingua dal browser
    const browserLocale = navigator.language.split('-')[0]
    if (isValidLocale(browserLocale)) {
      const locale = getLocale(browserLocale)
      if (locale) {
        setCurrentLocale(locale)
        return
      }
    }

    // Usa la lingua predefinita
    setCurrentLocale(getDefaultLocale())
  }, [router.asPath])

  // Funzione per cambiare lingua
  const changeLocale = useCallback(async (newLocale: Locale) => {
    // Salva la lingua nel localStorage
    localStorage.setItem('locale', newLocale.code)

    // Aggiorna la lingua corrente
    setCurrentLocale(newLocale)

    // Aggiorna l'URL
    const currentPath = router.asPath
    const unlocalizedPath = currentPath.split('/').slice(2).join('/')
    const newPath = `/${newLocale.code}/${unlocalizedPath}`

    // Usa replace per evitare di aggiungere una nuova voce nella cronologia
    await router.replace(newPath, undefined, { locale: newLocale.code })
  }, [router])

  return {
    currentLocale,
    locales,
    changeLocale
  }
} 