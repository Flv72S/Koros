# Koros - Progetto Web

## Panoramica delle Funzionalità:
- [x] Supporto multilingua (i18n)
  - Gestione completa di più lingue (italiano, inglese)
  - Rilevamento automatico della lingua preferita
  - URL localizzati (es. `/it/chi-siamo`, `/en/about-us`)
  - Selettore di lingua con bandiere e nomi nativi
  - Persistenza della selezione della lingua

- [x] Generazione contenuti AI
  - Integrazione con modelli AI per la generazione di contenuti
  - Supporto per diversi provider AI (OpenAI, ecc.)
  - Configurazione flessibile dei parametri di generazione
  - Caching dei contenuti generati
  - Validazione e gestione degli errori

- [x] Ottimizzazione SEO
  - Metadati SEO configurabili per ogni pagina
  - Supporto per Open Graph e Twitter Cards
  - URL canonici per ogni lingua
  - Tag hreflang per indicare le versioni alternative
  - Gestione automatica dei metadati per contenuti dinamici

- [x] Caching dei contenuti
  - Cache lato client per contenuti statici
  - Cache lato server per contenuti dinamici
  - Invalidazione intelligente della cache
  - Gestione della cache per contenuti AI

- [x] Persistenza del layout di visualizzazione
  - Salvataggio delle preferenze di layout
  - Ripristino automatico delle impostazioni
  - Supporto per diversi temi

- [x] Modalità di reset soft/hard
  - Reset soft: mantiene le preferenze utente
  - Reset hard: ripristina tutte le impostazioni
  - Conferma prima del reset

- [x] Salvataggio dei filtri come "preferiti"
  - Salvataggio automatico dei filtri usati frequentemente
  - Gestione dei filtri preferiti
  - Ripristino rapido dei filtri salvati

- [x] Filtraggio avanzato combinato
  - Logica booleana per le categorie
  - Filtri multipli
  - Salvataggio delle combinazioni di filtri

- [x] Gestione autonoma del menu di navigazione
  - Generazione automatica del menu
  - Supporto per sottomenu
  - Gestione delle autorizzazioni

## Struttura del Progetto:

### Organizzazione delle cartelle:
```
app/
├── components/           # Componenti React riutilizzabili
│   ├── SEO.tsx          # Gestione metadati SEO
│   ├── LocaleSelector.tsx # Selettore lingua
│   └── layouts/         # Layout dell'applicazione
├── config/              # File di configurazione
│   ├── i18n.ts         # Configurazione lingue
│   └── menu.ts         # Configurazione menu e SEO
├── hooks/              # Custom React hooks
│   ├── useLocale.ts    # Hook gestione lingua
│   └── useContentLoader.ts # Hook caricamento contenuti
├── lib/                # Librerie e utility
│   ├── ai/            # Gestione AI
│   ├── cache/         # Sistema di caching
│   └── content/       # Gestione contenuti
└── pages/             # Pagine dell'applicazione
```

### Componenti Principali:
- `ContentPage`: Gestisce la visualizzazione dei contenuti con supporto multilingua
- `LayoutToggle`: Permette di cambiare il layout di visualizzazione
- `useContentLoader`: Hook per il caricamento e la gestione dei contenuti
- `LocaleSelector`: Componente per la selezione della lingua
- `SEO`: Gestisce i metadati SEO per ogni pagina
- `FilterManager`: Gestisce i filtri e le preferenze dell'utente

### Configurazioni:
- `app/config/i18n.ts`: Configurazione delle lingue supportate
- `app/config/menu.ts`: Configurazione del menu e dei metadati SEO
- `app/lib/ai/types.ts`: Configurazione dei provider AI
- `app/lib/cache/config.ts`: Configurazione del sistema di caching

## Guida all'Installazione:

1. Clona il repository:
```bash
git clone https://github.com/your-username/koros.git
cd koros
```

2. Installa le dipendenze:
```bash
npm install
```

3. Configura le variabili d'ambiente:
```bash
cp .env.example .env.local
```

4. Avvia il server di sviluppo:
```bash
npm run dev
```

## Configurazione Dettagliata:

### Aggiungere una Nuova Lingua:
1. Aggiorna `app/config/i18n.ts`:
```typescript
export const locales: Locale[] = [
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    direction: 'ltr',
    flag: '🇫🇷'
  }
]
```

2. Crea la struttura dei contenuti:
```
content/
  ├── it/
  │   └── home.md
  └── fr/
      └── home.md
```

### Configurazione SEO:
```typescript
// app/config/menu.ts
{
  id: 'home',
  label: 'Home',
  slug: '/',
  contentSource: 'markdown',
  contentPath: 'home.md',
  seo: {
    title: 'Koros - Soluzioni Digitali',
    description: '...',
    keywords: '...',
    ogTitle: '...',
    ogDescription: '...'
  }
}
```

### Setup Generazione AI:
```typescript
// app/config/menu.ts
{
  id: 'ai-content',
  contentSource: 'ai',
  aiPrompt: 'Genera un articolo su...',
  aiModel: 'gpt-4',
  aiParameters: {
    temperature: 0.7,
    maxTokens: 1000
  }
}
```

### Configurazione Cache:
```typescript
// app/lib/cache/config.ts
export const cacheConfig = {
  ttl: 3600, // Time to live in seconds
  maxSize: 1000, // Maximum number of items
  storage: 'localStorage' // or 'sessionStorage'
}
```

### Configurazione Filtri Preferiti:
```typescript
// app/lib/filters/config.ts
export const filterConfig = {
  maxFavorites: 10,
  autoSave: true,
  persistence: 'localStorage'
}
```

## Esempi di Utilizzo:

### Cambio Lingua:
```typescript
const { changeLocale } = useLocale()
changeLocale(newLocale)
```

### Generazione Contenuti:
```typescript
const { content, loading, error } = useContentLoader({
  provider: new AIProvider(),
  source: 'prompt',
  type: 'ai'
})
```

### Gestione SEO:
```typescript
<SEO
  seo={menuItem.seo}
  fallbackTitle="Titolo di Default"
  fallbackDescription="Descrizione di Default"
/>
```

### Salvataggio Filtri:
```typescript
const { saveFilter, loadFilter } = useFilterManager()
saveFilter('myFilter', { category: 'tech', sort: 'newest' })
const filter = loadFilter('myFilter')
```

### Cambio Layout:
```typescript
const { setLayout } = useLayoutManager()
setLayout('grid') // or 'list', 'compact'
```

## Best Practices:

### SEO:
- Mantieni i titoli sotto i 60 caratteri
- Usa descrizioni uniche per ogni pagina
- Includi parole chiave rilevanti
- Configura correttamente i meta tag social

### Contenuti AI:
- Valida sempre i contenuti generati
- Usa prompt chiari e specifici
- Implementa il caching per contenuti statici
- Gestisci gli errori appropriatamente

### Internazionalizzazione:
- Usa nomi nativi per le lingue
- Mantieni una struttura coerente dei contenuti
- Implementa fallback appropriati
- Considera le differenze culturali

### Gestione Cache:
- Imposta TTL appropriati
- Implementa strategie di invalidazione
- Monitora l'utilizzo della cache
- Gestisci il fallback quando la cache è vuota

## Informazioni per Contribuire:

1. Fork il repository
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit le tue modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## Licenza:
Questo progetto è sotto la licenza MIT. Vedi il file `LICENSE` per maggiori dettagli.

## Supporto:
Per supporto, email support@koros.com o apri un issue nel repository.
