import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface MarkdownContent {
  id: string
  title: string
  description: string
  image: string
  profileTarget: string[]
  price: string
  features: string[]
  content: string
  slug: string
}

export async function getMarkdownContents(): Promise<MarkdownContent[]> {
  const contentDirectory = path.join(process.cwd(), 'app/content')
  const files = fs.readdirSync(contentDirectory)
  
  const markdownFiles = files.filter(file => file.endsWith('.md'))
  
  const contents = markdownFiles.map(file => {
    const filePath = path.join(contentDirectory, file)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      id: data.id || file.replace('.md', ''),
      title: data.title,
      description: data.description,
      image: data.image,
      profileTarget: Array.isArray(data.profileTarget) ? data.profileTarget : [data.profileTarget],
      price: data.price,
      features: Array.isArray(data.features) ? data.features : [],
      content,
      slug: file.replace('.md', '')
    }
  })
  
  return contents
}

export async function getMarkdownContentBySlug(slug: string): Promise<MarkdownContent | null> {
  const contents = await getMarkdownContents()
  return contents.find(content => content.slug === slug) || null
}

export async function getMarkdownContentsByProfile(profile: string): Promise<MarkdownContent[]> {
  const contents = await getMarkdownContents()
  return contents.filter(content => content.profileTarget.includes(profile))
} 