import { z } from 'zod'
import { MenuItem } from '../lib/content/types'

// Schema di validazione per i metadati SEO
export const SEOSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.string().optional(),
  robots: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
  ogType: z.string().optional(),
  twitterCard: z.string().optional(),
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
  twitterImage: z.string().optional(),
  canonicalUrl: z.string().optional()
})

export type SEO = z.infer<typeof SEOSchema>

// Schema di validazione per le voci di menu
export const MenuItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  contentSource: z.enum(['markdown', 'cms', 'ai']),
  contentPath: z.string(),
  aiPrompt: z.string().optional(),
  aiModel: z.string().optional(),
  aiParameters: z.record(z.any()).optional(),
  seo: SEOSchema.optional(),
  children: z.array(z.lazy(() => MenuItemSchema)).optional(),
  isActive: z.boolean().default(true),
  order: z.number().default(0)
})

export type MenuItem = z.infer<typeof MenuItemSchema>

// Configurazione del menu principale
export const mainMenu: MenuItem[] = [
  {
    id: 'home',
    label: 'Home',
    slug: '/',
    description: 'Pagina principale di Koros',
    contentSource: 'markdown',
    contentPath: 'home.md',
    seo: {
      title: 'Koros - Soluzioni Digitali Innovative',
      description: 'Koros offre soluzioni digitali innovative per la crescita aziendale. Scopri i nostri servizi di consulenza, formazione e sviluppo software.',
      keywords: 'koros, digital, innovazione, consulenza, formazione, software',
      robots: 'index, follow',
      ogTitle: 'Koros - Soluzioni Digitali Innovative',
      ogDescription: 'Scopri le soluzioni digitali innovative di Koros per la crescita aziendale',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: 'Koros - Soluzioni Digitali Innovative',
      twitterDescription: 'Scopri le soluzioni digitali innovative di Koros per la crescita aziendale'
    },
    order: 0
  },
  {
    id: 'chi-siamo',
    label: 'Chi Siamo',
    slug: '/chi-siamo',
    description: 'La nostra storia e i nostri valori',
    contentSource: 'cms',
    contentPath: 'chi-siamo',
    seo: {
      title: 'Chi Siamo | Koros',
      description: 'Scopri la storia, la missione e i valori di Koros. Un team di esperti dedicati all\'innovazione e alla crescita aziendale.',
      keywords: 'koros, storia, missione, valori, team, innovazione',
      robots: 'index, follow',
      ogTitle: 'Chi Siamo | Koros',
      ogDescription: 'Scopri la storia e i valori di Koros',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: 'Chi Siamo | Koros',
      twitterDescription: 'Scopri la storia e i valori di Koros'
    },
    order: 1
  },
  {
    id: 'ai-content',
    label: 'Contenuto AI',
    slug: '/ai-content',
    description: 'Contenuto generato dinamicamente con AI',
    contentSource: 'ai',
    contentPath: 'Genera un articolo introduttivo sulla nostra azienda, includendo la nostra missione, visione e valori principali.',
    aiPrompt: 'Genera un articolo introduttivo sulla nostra azienda, includendo la nostra missione, visione e valori principali.',
    aiModel: 'gpt-4',
    aiParameters: {
      temperature: 0.7,
      maxTokens: 1000
    },
    seo: {
      title: 'Contenuto AI | Koros',
      description: 'Esplora contenuti generati dinamicamente con AI su Koros. Scopri come l\'intelligenza artificiale sta trasformando il modo in cui creiamo e condividiamo informazioni.',
      keywords: 'koros, ai, intelligenza artificiale, contenuti dinamici, innovazione',
      robots: 'index, follow',
      ogTitle: 'Contenuto AI | Koros',
      ogDescription: 'Esplora contenuti generati con AI su Koros',
      ogType: 'article',
      twitterCard: 'summary_large_image',
      twitterTitle: 'Contenuto AI | Koros',
      twitterDescription: 'Esplora contenuti generati con AI su Koros'
    },
    order: 2
  },
  {
    id: 'servizi',
    label: 'I Nostri Servizi',
    slug: '/servizi',
    description: 'Soluzioni personalizzate per la crescita aziendale',
    contentSource: 'markdown',
    contentPath: 'servizi.md',
    seo: {
      title: 'I Nostri Servizi | Koros',
      description: 'Scopri i servizi di consulenza strategica, formazione professionale e sviluppo software di Koros. Soluzioni personalizzate per la crescita aziendale.',
      keywords: 'koros, servizi, consulenza, formazione, software, crescita aziendale',
      robots: 'index, follow',
      ogTitle: 'I Nostri Servizi | Koros',
      ogDescription: 'Scopri i servizi di Koros per la crescita aziendale',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterTitle: 'I Nostri Servizi | Koros',
      twitterDescription: 'Scopri i servizi di Koros per la crescita aziendale'
    },
    children: [
      {
        id: 'consulenza',
        label: 'Consulenza Strategica',
        slug: '/servizi/consulenza',
        description: 'Consulenza strategica e organizzativa per la crescita aziendale',
        contentSource: 'markdown',
        contentPath: 'servizi/consulenza.md',
        seo: {
          title: 'Consulenza Strategica | Koros',
          description: 'Servizi di consulenza strategica e organizzativa per la crescita aziendale. Soluzioni personalizzate per ottimizzare i processi e migliorare le performance.',
          keywords: 'koros, consulenza strategica, organizzazione, crescita aziendale, ottimizzazione',
          robots: 'index, follow',
          ogTitle: 'Consulenza Strategica | Koros',
          ogDescription: 'Servizi di consulenza strategica per la crescita aziendale',
          ogType: 'service',
          twitterCard: 'summary_large_image',
          twitterTitle: 'Consulenza Strategica | Koros',
          twitterDescription: 'Servizi di consulenza strategica per la crescita aziendale'
        },
        order: 0
      },
      {
        id: 'formazione',
        label: 'Formazione Professionale',
        slug: '/servizi/formazione',
        description: 'Percorsi formativi personalizzati per team e manager',
        contentSource: 'markdown',
        contentPath: 'servizi/formazione.md',
        seo: {
          title: 'Formazione Professionale | Koros',
          description: 'Percorsi formativi personalizzati per team e manager. Sviluppa le competenze del tuo team con i nostri corsi professionali.',
          keywords: 'koros, formazione, corsi, team, manager, competenze',
          robots: 'index, follow',
          ogTitle: 'Formazione Professionale | Koros',
          ogDescription: 'Percorsi formativi personalizzati per team e manager',
          ogType: 'service',
          twitterCard: 'summary_large_image',
          twitterTitle: 'Formazione Professionale | Koros',
          twitterDescription: 'Percorsi formativi personalizzati per team e manager'
        },
        order: 1
      }
    ],
    order: 3
  },
  {
    id: 'contatti',
    label: 'Contatti',
    slug: '/contatti',
    description: 'Come raggiungerci',
    contentSource: 'markdown',
    contentPath: 'contatti.md',
    order: 4
  },
  {
    id: 'blog',
    label: 'Blog',
    slug: '/blog',
    description: 'Articoli e approfondimenti sulla consulenza e formazione',
    contentSource: 'markdown',
    contentPath: 'blog/index.md',
    children: [
      {
        id: 'consulenza-blog',
        label: 'Consulenza',
        slug: '/blog/consulenza',
        description: 'Articoli sulla consulenza aziendale',
        contentSource: 'markdown',
        contentPath: 'blog/consulenza.md',
        order: 0
      },
      {
        id: 'formazione-blog',
        label: 'Formazione',
        slug: '/blog/formazione',
        description: 'Articoli sulla formazione professionale',
        contentSource: 'markdown',
        contentPath: 'blog/formazione.md',
        order: 1
      }
    ],
    order: 5
  }
]

// Funzione di utilità per validare il menu
export function validateMenu(menu: MenuItem[]): boolean {
  try {
    z.array(MenuItemSchema).parse(menu)
    return true
  } catch (error) {
    console.error('Errore di validazione del menu:', error)
    return false
  }
}

// Funzione per trovare una voce di menu per slug
export function findMenuItemBySlug(slug: string, menu: MenuItem[] = mainMenu): MenuItem | undefined {
  for (const item of menu) {
    if (item.slug === slug) return item
    if (item.children) {
      const found = findMenuItemBySlug(slug, item.children)
      if (found) return found
    }
  }
  return undefined
}

// Funzione per ottenere il percorso completo di una voce di menu
export function getMenuItemPath(slug: string, menu: MenuItem[] = mainMenu): MenuItem[] {
  const path: MenuItem[] = []
  
  function findPath(currentSlug: string, items: MenuItem[]): boolean {
    for (const item of items) {
      if (item.slug === currentSlug) {
        path.push(item)
        return true
      }
      if (item.children) {
        if (findPath(currentSlug, item.children)) {
          path.unshift(item)
          return true
        }
      }
    }
    return false
  }

  findPath(slug, menu)
  return path
}

export const menuItems: MenuItem[] = [
  {
    id: 'getting-started',
    label: 'Iniziare',
    slug: 'getting-started',
    description: 'Una guida rapida per iniziare',
    contentSource: 'markdown',
    contentPath: 'getting-started.md',
    isActive: true,
    order: 1
  },
  {
    id: 'features',
    label: 'Caratteristiche',
    slug: 'features',
    description: 'Scopri le caratteristiche principali',
    contentSource: 'markdown',
    contentPath: 'features.md',
    isActive: true,
    order: 2
  },
  {
    id: 'api',
    label: 'API',
    slug: 'api',
    description: 'Documentazione API',
    contentSource: 'markdown',
    contentPath: 'api.md',
    isActive: true,
    order: 3
  },
  {
    id: 'examples',
    label: 'Esempi',
    slug: 'examples',
    description: 'Esempi di utilizzo',
    contentSource: 'markdown',
    contentPath: 'examples.md',
    isActive: true,
    order: 4
  }
] 