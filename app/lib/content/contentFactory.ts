import { ContentProvider, ContentSource } from './types'
import { MarkdownProvider } from './providers/markdownProvider'
import { CMSProvider } from './providers/cmsProvider'
import { AIProvider } from './providers/aiProvider'

export class ContentFactory {
  private static instance: ContentFactory
  private providers: Map<ContentSource, ContentProvider>

  private constructor() {
    this.providers = new Map()
    
    // Inizializza i provider di default
    this.providers.set('markdown', new MarkdownProvider())
    this.providers.set('cms', new CMSProvider())
    this.providers.set('ai', new AIProvider())
  }

  static getInstance(): ContentFactory {
    if (!ContentFactory.instance) {
      ContentFactory.instance = new ContentFactory()
    }
    return ContentFactory.instance
  }

  getProvider(source: ContentSource): ContentProvider {
    const provider = this.providers.get(source)
    if (!provider) {
      throw new Error(`Provider non disponibile per la sorgente: ${source}`)
    }
    return provider
  }

  registerProvider(source: ContentSource, provider: ContentProvider): void {
    this.providers.set(source, provider)
  }
} 