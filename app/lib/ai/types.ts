export interface AIGenerationOptions {
  model?: string
  temperature?: number
  maxTokens?: number
  topP?: number
  frequencyPenalty?: number
  presencePenalty?: number
  stop?: string[]
  [key: string]: any // Per supportare opzioni specifiche di diversi provider
}

export interface AIGenerationResponse {
  content: string
  metadata: {
    model: string
    usage: {
      promptTokens: number
      completionTokens: number
      totalTokens: number
    }
    finishReason?: string
    [key: string]: any // Per supportare metadati specifici di diversi provider
  }
}

export interface AIClient {
  generate(prompt: string, options?: AIGenerationOptions): Promise<AIGenerationResponse>
  validateOptions(options?: AIGenerationOptions): boolean
} 