# Homepage di Koros

La homepage di Koros è una pagina dinamica che permette agli utenti di esplorare e filtrare i contenuti in modo efficiente e personalizzato. Questo documento descrive le principali funzionalità implementate.

## Funzionalità Principali

### 1. Sistema di Filtraggio
- **Filtri per Categoria**
  - Selezione multipla di categorie (Corsi, E-book, Video, Audio, Template)
  - Interfaccia a pulsanti toggle con feedback visivo
  - Persistenza delle selezioni nel localStorage

- **Filtri per Prezzo**
  - Tre opzioni: Tutti, Gratuiti, A pagamento
  - Interfaccia intuitiva con pulsanti toggle
  - Integrazione con il sistema di filtri per categoria

### 2. Persistenza del Layout
- **Visualizzazione a Griglia/Lista**
  - Toggle tra due modalità di visualizzazione
  - Layout a griglia (default): ottimizzato per la scansione visiva
  - Layout a lista: ottimizzato per la lettura dettagliata
  - Persistenza della preferenza nel localStorage

### 3. Sistema di Reset
- **Reset Filtri (Soft)**
  - Ripristina solo i filtri attivi
  - Mantiene layout e ordinamento
  - Preserva la posizione di paginazione
  - Aggiorna l'URL mantenendo i parametri non correlati ai filtri

- **Reset Tutto (Hard)**
  - Ripristina l'intero stato della pagina
  - Rimuove tutti i filtri attivi
  - Reimposta il layout alla visualizzazione predefinita
  - Cancella le preferenze salvate nel localStorage
  - Riporta alla homepage con URL pulito

### 4. Ordinamento dei Contenuti
- **Opzioni di Ordinamento**
  - Prezzo (crescente/decrescente)
  - Titolo (A-Z/Z-A)
  - Data (recente/vecchio)
  - Persistenza della selezione nell'URL

### 5. Paginazione
- Navigazione tra le pagine dei risultati
- Mantenimento dello stato durante il filtraggio
- Reset alla prima pagina al cambio dei filtri

## Accessibilità

Tutte le funzionalità sono state implementate seguendo le linee guida WCAG 2.1:

- **Navigazione da Tastiera**
  - Focus visibile su tutti gli elementi interattivi
  - Supporto per la navigazione con Tab
  - Gestione degli eventi da tastiera

- **Screen Reader**
  - Attributi ARIA appropriati
  - Annunci di stato per le azioni
  - Etichette descrittive per i controlli

- **Feedback Visivo**
  - Stati attivi e hover chiari
  - Contrasto adeguato
  - Indicatori di stato per le selezioni

## Persistenza dei Dati

Il sistema utilizza il localStorage per mantenere le preferenze dell'utente:

- **Chiavi di Storage**
  - `koros_content_filters`: stato dei filtri
  - `koros_content_layout`: preferenza di layout

- **Gestione degli Stati**
  - Priorità ai parametri URL rispetto al localStorage
  - Fallback intelligente in caso di dati mancanti
  - Pulizia automatica dei dati non validi

## Struttura dei Componenti

```
app/
├── components/
│   ├── Card.tsx              # Card del contenuto (supporta griglia/lista)
│   ├── ContentFilters.tsx    # Sistema di filtraggio
│   ├── ContentSort.tsx       # Ordinamento dei contenuti
│   ├── LayoutToggle.tsx      # Toggle layout griglia/lista
│   ├── ResetButtons.tsx      # Pulsanti di reset
│   └── StatusAnnouncement.tsx # Annunci di stato per screen reader
├── hooks/
│   ├── useLayoutPreference.ts # Gestione preferenza layout
│   ├── usePersistentFilters.ts # Gestione filtri persistenti
│   └── useResetState.ts      # Logica di reset
└── page.tsx                  # Homepage principale
```

## Considerazioni Tecniche

- **Performance**
  - Memoizzazione dei contenuti filtrati
  - Aggiornamento efficiente dell'URL
  - Gestione ottimizzata del localStorage

- **Manutenibilità**
  - Hooks personalizzati per la logica di business
  - Componenti modulari e riutilizzabili
  - Separazione chiara delle responsabilità

- **Estensibilità**
  - Facile aggiunta di nuovi filtri
  - Supporto per nuovi layout
  - Struttura preparata per funzionalità future

## Prossimi Sviluppi

- [ ] Implementazione dei filtri preferiti
- [ ] Logica booleana avanzata per i filtri
- [ ] Miglioramento della gestione degli errori
- [ ] Ottimizzazione delle performance per grandi dataset 