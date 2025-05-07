---
id: getting-started
title: Iniziare con Koros
description: Una guida rapida per iniziare a utilizzare Koros
author: Koros Team
lastUpdated: 2024-03-20
tags: [guida, tutorial, base]
---

# Benvenuto in Koros

Koros è una piattaforma moderna per la gestione dei contenuti che ti permette di creare, modificare e pubblicare contenuti in modo semplice ed efficiente.

## Caratteristiche principali

- Gestione dei contenuti in Markdown
- Supporto per contenuti dinamici
- Integrazione con CMS esterni
- Generazione di contenuti tramite AI

## Primi passi

1. **Installazione**
   ```bash
   npm install koros
   ```

2. **Configurazione**
   ```typescript
   import { Koros } from 'koros'

   const koros = new Koros({
     contentPath: './content',
     defaultLanguage: 'it'
   })
   ```

3. **Creazione del primo contenuto**
   ```markdown
   # Il mio primo contenuto
   
   Questo è un esempio di contenuto in Markdown.
   ```

## Supporto

Per qualsiasi domanda o assistenza, non esitare a contattarci:

- Email: support@koros.com
- Discord: [Server Koros](https://discord.gg/koros)
- GitHub: [Issues](https://github.com/koros/koros/issues) 