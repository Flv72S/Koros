import { readFile } from 'fs/promises'
import { join } from 'path'
import { Content, ContentProvider, ContentMetadata } from '../types'

export class CMSProvider implements ContentProvider {
  private basePath: string

  constructor(basePath: string = 'public/content/cms') {
    this.basePath = basePath
  }

  async loadContent(source: string): Promise<Content> {
    try {
      // In una vera implementazione, qui faremmo una chiamata API al CMS
      // Per ora, leggiamo da un file JSON locale
      const fullPath = join(process.cwd(), this.basePath, `${source}.json`)
      const fileContent = await readFile(fullPath, 'utf-8')
      const data = JSON.parse(fileContent)

      // Trasforma la risposta nel formato Content
      const metadata: ContentMetadata = {
        id: data.id,
        title: data.title,
        description: data.description,
        lastUpdated: data.updatedAt,
        author: data.author,
        tags: data.tags
      }

      return {
        metadata,
        content: data.content,
        raw: data
      }
    } catch (error) {
      console.error('Errore nel caricamento dal CMS:', error)
      throw new Error('Impossibile caricare il contenuto dal CMS')
    }
  }

  async saveContent(source: string, content: Content): Promise<void> {
    try {
      // In una vera implementazione, qui faremmo una chiamata API al CMS
      // Per ora, simuliamo solo il successo
      console.log('Simulazione di salvataggio sul CMS:', {
        source,
        content: {
          title: content.metadata.title,
          description: content.metadata.description,
          content: content.content,
          tags: content.metadata.tags
        }
      })
    } catch (error) {
      console.error('Errore nel salvataggio sul CMS:', error)
      throw new Error('Impossibile salvare il contenuto sul CMS')
    }
  }

  validateContent(content: Content): boolean {
    return (
      content.metadata.id !== undefined &&
      content.metadata.title !== undefined &&
      content.content !== undefined
    )
  }
} 