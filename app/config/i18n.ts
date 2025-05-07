import { z } from 'zod'

// Schema per la validazione delle configurazioni delle lingue
export const LocaleSchema = z.object({
  code: z.string().length(2), // Codice ISO 639-1 (es. 'it', 'en')
  name: z.string(), // Nome della lingua nella lingua stessa (es. 'Italiano', 'English')
  nativeName: z.string(), // Nome della lingua nella lingua nativa (es. 'Italiano', 'English')
  direction: z.enum(['ltr', 'rtl']).default('ltr'),
  flag: z.string().optional(), // Codice emoji della bandiera (es. '🇮🇹', '🇬🇧')
  isDefault: z.boolean().default(false)
})

export type Locale = z.infer<typeof LocaleSchema>

// Configurazione delle lingue supportate
export const locales: Locale[] = [
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    direction: 'ltr',
    flag: '🇮🇹',
    isDefault: true
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    flag: '🇬🇧'
  }
]

// Funzione per ottenere la lingua predefinita
export function getDefaultLocale(): Locale {
  return locales.find(locale => locale.isDefault) || locales[0]
}

// Funzione per ottenere una lingua specifica
export function getLocale(code: string): Locale | undefined {
  return locales.find(locale => locale.code === code)
}

// Funzione per validare un codice lingua
export function isValidLocale(code: string): boolean {
  return locales.some(locale => locale.code === code)
}

// Funzione per ottenere il percorso del contenuto localizzato
export function getLocalizedPath(path: string, locale: string): string {
  // Se il percorso è già localizzato, lo restituisce così com'è
  if (path.startsWith(`/${locale}/`)) {
    return path
  }

  // Altrimenti, aggiunge il prefisso della lingua
  return `/${locale}${path}`
}

// Funzione per ottenere il percorso del contenuto non localizzato
export function getUnlocalizedPath(path: string): string {
  // Rimuove il prefisso della lingua se presente
  const localePrefix = locales.map(locale => `/${locale.code}/`).find(prefix => path.startsWith(prefix))
  if (localePrefix) {
    return path.slice(localePrefix.length - 1)
  }
  return path
}

// Funzione per ottenere la lingua dal percorso
export function getLocaleFromPath(path: string): string | undefined {
  const localePrefix = locales.map(locale => `/${locale.code}/`).find(prefix => path.startsWith(prefix))
  if (localePrefix) {
    return localePrefix.slice(1, -1) // Rimuove gli slash
  }
  return undefined
}

// Funzione per ottenere il percorso localizzato per una voce di menu
export function getLocalizedMenuItemPath(slug: string, locale: string): string {
  // Se lo slug è già localizzato, lo restituisce così com'è
  if (slug.startsWith(`/${locale}/`)) {
    return slug
  }

  // Se lo slug è la root, aggiunge solo la lingua
  if (slug === '/') {
    return `/${locale}`
  }

  // Altrimenti, aggiunge il prefisso della lingua
  return `/${locale}${slug}`
}

// Funzione per ottenere lo slug non localizzato
export function getUnlocalizedMenuItemPath(slug: string): string {
  // Se lo slug è solo la lingua, restituisce la root
  if (locales.some(locale => slug === `/${locale.code}`)) {
    return '/'
  }

  // Rimuove il prefisso della lingua se presente
  const localePrefix = locales.map(locale => `/${locale.code}`).find(prefix => slug.startsWith(prefix))
  if (localePrefix) {
    return slug.slice(localePrefix.length)
  }
  return slug
} 