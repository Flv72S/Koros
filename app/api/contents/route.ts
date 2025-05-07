import { NextResponse } from 'next/server'
import { getMarkdownContents } from '@/app/utils/markdown'

export async function GET() {
  try {
    const contents = await getMarkdownContents()
    return NextResponse.json(contents)
  } catch (error) {
    console.error('Errore nel recupero dei contenuti Markdown:', error)
    return NextResponse.json({ error: 'Errore nel recupero dei contenuti' }, { status: 500 })
  }
} 