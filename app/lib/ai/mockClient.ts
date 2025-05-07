import { AIClient, AIGenerationOptions, AIGenerationResponse } from './types'

export class MockAIClient implements AIClient {
  private defaultOptions: AIGenerationOptions = {
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 1000,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0
  }

  private async simulateDelay(): Promise<void> {
    // Simula un ritardo di rete variabile tra 500ms e 2s
    const delay = Math.random() * 1500 + 500
    await new Promise(resolve => setTimeout(resolve, delay))
  }

  private generateMockContent(prompt: string): string {
    // Genera un contenuto simulato basato sul prompt
    return `# Contenuto Generato da AI

## Prompt Originale
\`\`\`
${prompt}
\`\`\`

## Contenuto Generato

Questo è un esempio di contenuto generato dinamicamente utilizzando AI. Il contenuto è stato generato in risposta al prompt fornito.

### Caratteristiche Principali
- Generazione dinamica dei contenuti
- Personalizzazione basata sul prompt
- Integrazione con modelli AI avanzati

### Vantaggi
1. Contenuti sempre aggiornati
2. Personalizzazione automatica
3. Scalabilità

> Nota: Questo è un contenuto di esempio generato per dimostrare la funzionalità.

## Prossimi Passi
- Integrazione con API AI reali
- Ottimizzazione dei prompt
- Personalizzazione avanzata`
  }

  private calculateMockUsage(prompt: string, content: string): AIGenerationResponse['metadata']['usage'] {
    // Simula il calcolo dei token
    const promptTokens = Math.ceil(prompt.length / 4)
    const completionTokens = Math.ceil(content.length / 4)
    return {
      promptTokens,
      completionTokens,
      totalTokens: promptTokens + completionTokens
    }
  }

  async generate(prompt: string, options?: AIGenerationOptions): Promise<AIGenerationResponse> {
    // Simula un ritardo di rete
    await this.simulateDelay()

    // Unisci le opzioni di default con quelle fornite
    const mergedOptions = { ...this.defaultOptions, ...options }

    // Genera il contenuto simulato
    const content = this.generateMockContent(prompt)

    // Calcola l'utilizzo simulato
    const usage = this.calculateMockUsage(prompt, content)

    return {
      content,
      metadata: {
        model: mergedOptions.model || 'gpt-4',
        usage,
        finishReason: 'stop',
        mock: true // Flag per indicare che è una risposta simulata
      }
    }
  }

  validateOptions(options?: AIGenerationOptions): boolean {
    if (!options) return true

    // Valida le opzioni di base
    if (options.temperature !== undefined && (options.temperature < 0 || options.temperature > 2)) {
      return false
    }

    if (options.maxTokens !== undefined && options.maxTokens < 1) {
      return false
    }

    if (options.topP !== undefined && (options.topP < 0 || options.topP > 1)) {
      return false
    }

    return true
  }
} 