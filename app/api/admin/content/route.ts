import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function POST(request: Request) {
  try {
    const { path, content } = await request.json()

    // Verifica che il percorso sia valido e sicuro
    if (!path.startsWith('/content/')) {
      return NextResponse.json(
        { error: 'Percorso non valido' },
        { status: 400 }
      )
    }

    // Costruisci il percorso completo del file
    const fullPath = join(process.cwd(), 'public', path)

    // Salva il contenuto
    await writeFile(fullPath, content, 'utf-8')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Errore nel salvataggio del contenuto:', error)
    return NextResponse.json(
      { error: 'Errore nel salvataggio del contenuto' },
      { status: 500 }
    )
  }
} 