# Koros

Koros è un'applicazione web moderna costruita con Next.js 14, TypeScript e Tailwind CSS, che offre un'esperienza utente personalizzata basata su diversi profili (B2C, Pro, B2B).

## Caratteristiche

- 🎨 Layout personalizzati per diversi profili utente
- 📱 Design responsive e mobile-first
- 🎯 Contenuti dinamici basati sul profilo utente
- 📝 Supporto per contenuti Markdown
- 🔄 Paginazione lato client
- 🍪 Gestione dei cookie per il profilo utente
- 🎭 Onboarding personalizzato

## Struttura del Progetto

```
app/
├── components/         # Componenti riutilizzabili
├── content/           # Contenuti Markdown e JSON
├── layouts/           # Layout per diversi profili
├── utils/             # Utility e helper
└── api/               # API routes
```

## Tecnologie

- Next.js 14
- TypeScript
- Tailwind CSS
- gray-matter (per i contenuti Markdown)
- cookies-next (per la gestione dei cookie)

## Installazione

1. Clona la repository:
```bash
git clone https://github.com/Flv72S/Koros.git
cd Koros
```

2. Installa le dipendenze:
```bash
npm install
```

3. Avvia il server di sviluppo:
```bash
npm run dev
```

4. Apri [http://localhost:3000](http://localhost:3000) nel tuo browser.

## Layout

Il progetto include tre layout principali:

- **Layout A (B2C)**: Design moderno e user-friendly per utenti consumer
- **Layout B (Pro)**: Interfaccia professionale per utenti business
- **Layout C (B2B)**: Design enterprise per grandi organizzazioni

## Contenuti

I contenuti possono essere gestiti in due modi:

1. File Markdown nella cartella `/content`
2. File JSON (`mockContents.json`) per contenuti di test

Ogni contenuto include:
- Titolo
- Descrizione
- Immagine
- Prezzo
- Caratteristiche
- Profili target

## Sviluppo

### Comandi Disponibili

- `npm run dev`: Avvia il server di sviluppo
- `npm run build`: Compila l'applicazione per la produzione
- `npm run start`: Avvia l'applicazione in produzione
- `npm run lint`: Esegue il linting del codice

### Struttura dei Componenti

- `Navbar`: Barra di navigazione responsive
- `Footer`: Footer con informazioni e link
- `Hero`: Sezione hero con call-to-action
- `Card`: Card per la visualizzazione dei contenuti
- `Pagination`: Componente di paginazione
- `OnboardingSelector`: Selettore del profilo utente

## Contribuire

1. Fork la repository
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit le tue modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## Licenza

Questo progetto è sotto licenza MIT. Vedi il file `LICENSE` per maggiori dettagli.

## Contatti

- Repository: [https://github.com/Flv72S/Koros](https://github.com/Flv72S/Koros) 