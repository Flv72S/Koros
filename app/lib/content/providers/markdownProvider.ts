import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { Content, ContentProvider, ContentMetadata } from '../types'
import matter from 'gray-matter'

export class MarkdownProvider implements ContentProvider {
  private basePath: string

  constructor(basePath: string = 'public/content') {
    this.basePath = basePath
  }

  async loadContent(source: string): Promise<Content> {
    try {
      const fullPath = join(process.cwd(), this.basePath, source)
      const fileContent = await readFile(fullPath, 'utf-8')
      
      // Estrai i metadati dal frontmatter
      const { data, content } = matter(fileContent)
      
      const metadata: ContentMetadata = {
        id: data.id || source,
        title: data.title || '',
        description: data.description,
        lastUpdated: data.lastUpdated || new Date().toISOString(),
        author: data.author,
        tags: data.tags
      }

      return {
        metadata,
        content,
        raw: data
      }
    } catch (error) {
      console.error('Errore nel caricamento del contenuto markdown:', error)
      throw new Error('Impossibile caricare il contenuto')
    }
  }

  async saveContent(source: string, content: Content): Promise<void> {
    try {
      const fullPath = join(process.cwd(), this.basePath, source)
      
      // Prepara il frontmatter
      const frontmatter = {
        id: content.metadata.id,
        title: content.metadata.title,
        description: content.metadata.description,
        lastUpdated: new Date().toISOString(),
        author: content.metadata.author,
        tags: content.metadata.tags
      }

      // Genera il contenuto markdown con frontmatter
      const markdownContent = matter.stringify(content.content, frontmatter)
      
      await writeFile(fullPath, markdownContent, 'utf-8')
    } catch (error) {
      console.error('Errore nel salvataggio del contenuto markdown:', error)
      throw new Error('Impossibile salvare il contenuto')
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