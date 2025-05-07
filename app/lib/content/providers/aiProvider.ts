import { Content, ContentProvider, ContentMetadata } from '../types'
import { AIClient, AIGenerationOptions } from '../../ai/types'
import { MockAIClient } from '../../ai/mockClient'

export class AIProvider implements ContentProvider {
  private client: AIClient
  private defaultOptions: AIGenerationOptions

  constructor(client?: AIClient, options: AIGenerationOptions = {}) {
    this.client = client || new MockAIClient()
    this.defaultOptions = {
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 1000,
      ...options
    }
  }

  async loadContent(source: string): Promise<Content> {
    try {
      // In una vera implementazione, qui recupereremmo il prompt da una fonte esterna
      // Per ora, usiamo il source come prompt
      const prompt = source

      // Genera il contenuto usando il client AI
      const response = await this.client.generate(prompt, this.defaultOptions)

      const metadata: ContentMetadata = {
        id: `ai-${Date.now()}`,
        title: 'Contenuto Generato da AI',
        description: 'Contenuto generato dinamicamente utilizzando AI',
        lastUpdated: new Date().toISOString(),
        author: 'AI Assistant',
        tags: ['ai', 'generato', 'dinamico'],
        aiPrompt: prompt,
        aiModel: response.metadata.model,
        aiParameters: this.defaultOptions
      }

      return {
        metadata,
        content: response.content,
        raw: {
          prompt,
          model: response.metadata.model,
          parameters: this.defaultOptions,
          usage: response.metadata.usage,
          mock: response.metadata.mock
        }
      }
    } catch (error) {
      console.error('Errore nella generazione del contenuto AI:', error)
      throw new Error('Impossibile generare il contenuto con AI')
    }
  }

  async saveContent(source: string, content: Content): Promise<void> {
    // In una vera implementazione, qui potremmo salvare il prompt o altri metadati
    console.log('Simulazione di salvataggio del contenuto AI:', {
      source,
      content: {
        title: content.metadata.title,
        description: content.metadata.description,
        content: content.content,
        aiPrompt: content.metadata.aiPrompt,
        aiModel: content.metadata.aiModel,
        aiParameters: content.metadata.aiParameters
      }
    })
  }

  validateContent(content: Content): boolean {
    return (
      content.metadata.id !== undefined &&
      content.metadata.title !== undefined &&
      content.content !== undefined &&
      content.metadata.aiPrompt !== undefined
    )
  }
} 