export type ContentSource = 'markdown' | 'cms' | 'ai'

export interface ContentMetadata {
  id: string
  title: string
  description?: string
  lastUpdated: string
  author?: string
  tags?: string[]
  aiPrompt?: string // Prompt utilizzato per generare il contenuto
  aiModel?: string // Modello AI utilizzato
  aiParameters?: Record<string, any> // Parametri aggiuntivi per la generazione
}

export interface Content {
  metadata: ContentMetadata
  content: string
  raw?: any // Per contenuti non testuali (es. JSON da CMS)
}

export interface ContentProvider {
  loadContent(source: string): Promise<Content>
  saveContent(source: string, content: Content): Promise<void>
  validateContent(content: Content): boolean
}

export interface MenuItem {
  id: string
  label: string
  slug: string
  description?: string
  contentSource: ContentSource
  contentPath: string
  aiPrompt?: string // Prompt per la generazione del contenuto
  aiModel?: string // Modello AI da utilizzare
  aiParameters?: Record<string, any> // Parametri aggiuntivi per la generazione
  children?: MenuItem[]
  isActive: boolean
  order: number
  metadata?: ContentMetadata
} 