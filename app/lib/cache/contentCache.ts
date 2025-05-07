import { Content } from '../content/types'

interface CacheEntry {
  content: Content
  timestamp: number
  expiresAt: number
}

interface CacheOptions {
  ttl?: number // Time to live in milliseconds
  maxSize?: number // Maximum number of entries
}

export class ContentCache {
  private cache: Map<string, CacheEntry>
  private readonly defaultTTL: number = 5 * 60 * 1000 // 5 minuti
  private readonly maxSize: number

  constructor(options: CacheOptions = {}) {
    this.cache = new Map()
    this.maxSize = options.maxSize || 100 // Default: 100 entries
  }

  private generateKey(source: string, type: string): string {
    return `${type}:${source}`
  }

  private isExpired(entry: CacheEntry): boolean {
    return Date.now() > entry.expiresAt
  }

  private cleanup(): void {
    // Rimuove le entry scadute
    for (const [key, entry] of this.cache.entries()) {
      if (this.isExpired(entry)) {
        this.cache.delete(key)
      }
    }

    // Se la cache è ancora troppo grande, rimuove le entry più vecchie
    if (this.cache.size > this.maxSize) {
      const entries = Array.from(this.cache.entries())
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp)
      const entriesToRemove = entries.slice(0, entries.length - this.maxSize)
      entriesToRemove.forEach(([key]) => this.cache.delete(key))
    }
  }

  async get(source: string, type: string): Promise<Content | null> {
    const key = this.generateKey(source, type)
    const entry = this.cache.get(key)

    if (!entry) {
      return null
    }

    if (this.isExpired(entry)) {
      this.cache.delete(key)
      return null
    }

    return entry.content
  }

  async set(source: string, type: string, content: Content, ttl?: number): Promise<void> {
    const key = this.generateKey(source, type)
    const now = Date.now()

    this.cache.set(key, {
      content,
      timestamp: now,
      expiresAt: now + (ttl || this.defaultTTL)
    })

    this.cleanup()
  }

  async invalidate(source: string, type: string): Promise<void> {
    const key = this.generateKey(source, type)
    this.cache.delete(key)
  }

  async invalidateAll(): Promise<void> {
    this.cache.clear()
  }

  async invalidateByType(type: string): Promise<void> {
    for (const key of this.cache.keys()) {
      if (key.startsWith(`${type}:`)) {
        this.cache.delete(key)
      }
    }
  }

  getStats(): { size: number; maxSize: number } {
    return {
      size: this.cache.size,
      maxSize: this.maxSize
    }
  }
} 