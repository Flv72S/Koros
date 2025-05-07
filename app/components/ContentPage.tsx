import React from 'react'
import { useContentLoader } from '../hooks/useContentLoader'
import { MenuItem } from '../lib/content/types'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface ContentPageProps {
  menuItem: MenuItem
}

export default function ContentPage({ menuItem }: ContentPageProps) {
  const { content, isLoading, error, saveContent } = useContentLoader(menuItem)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    )
  }

  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 text-xl">Nessun contenuto disponibile</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose prose-lg max-w-none">
        <h1>{content.metadata.title}</h1>
        {content.metadata.description && (
          <p className="text-gray-600">{content.metadata.description}</p>
        )}
        
        <div className="mt-8">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {content.content}
          </ReactMarkdown>
        </div>

        <footer className="mt-8 text-sm text-gray-500">
          <p>Ultimo aggiornamento: {new Date(content.metadata.lastUpdated).toLocaleDateString()}</p>
          {content.metadata.author && (
            <p>Autore: {content.metadata.author}</p>
          )}
        </footer>
      </article>
    </div>
  )
} 