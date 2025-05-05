'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { getCookie } from 'cookies-next'
import OnboardingSelector from './components/OnboardingSelector'
import Card from './components/Card'
import Hero from './components/Hero'
import Pagination from './components/Pagination'
import LayoutResolver from './layouts/layoutResolver'
import { MarkdownContent } from './utils/markdown'

interface MockContent {
  id: number
  title: string
  description: string
  image: string
  profileTarget: string[]
  price: string
  features: string[]
}

interface UnifiedContent {
  id: string
  title: string
  description: string
  image: string
  profileTarget: string[]
  price: string
  features: string[]
  content?: string
  slug?: string
}

const ITEMS_PER_PAGE = 6

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<string | null>(null)
  const [unifiedContent, setUnifiedContent] = useState<UnifiedContent[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const searchParams = useSearchParams()

  // Calcola i contenuti da mostrare per la pagina corrente
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
  const currentItems = unifiedContent.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(unifiedContent.length / ITEMS_PER_PAGE)

  useEffect(() => {
    const profile = getCookie('koros_profile')
    if (profile) {
      setUserProfile(profile as string)
    } else {
      setShowOnboarding(true)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (userProfile) {
      // Carica i contenuti mock
      fetch('/content/mockContents.json')
        .then(res => res.json())
        .then(data => {
          const mockContents = data.contents as MockContent[]
          
          // Carica i contenuti Markdown
          fetch('/api/contents')
            .then(res => res.json())
            .then(markdownContents => {
              // Unifica i contenuti, dando priorità ai mock
              const unified = [...mockContents]
              
              // Aggiungi i contenuti Markdown solo se non esistono già nel mock
              markdownContents.forEach((mdContent: MarkdownContent) => {
                const exists = unified.some(content => content.id === mdContent.id)
                if (!exists) {
                  unified.push(mdContent)
                }
              })
              
              // Filtra per profilo
              const filtered = unified.filter(content =>
                content.profileTarget.includes(userProfile)
              )
              
              setUnifiedContent(filtered)
              // Resetta la pagina corrente quando cambiano i contenuti
              setCurrentPage(1)
            })
            .catch(error => {
              console.error('Errore nel caricamento dei contenuti Markdown:', error)
              // In caso di errore, usa solo i contenuti mock
              const filtered = mockContents.filter(content =>
                content.profileTarget.includes(userProfile)
              )
              setUnifiedContent(filtered)
              setCurrentPage(1)
            })
        })
        .catch(error => {
          console.error('Errore nel caricamento dei contenuti mock:', error)
        })
    }
  }, [userProfile])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (isLoading) {
    return (
      <LayoutResolver>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </LayoutResolver>
    )
  }

  if (showOnboarding) {
    return (
      <LayoutResolver>
        <OnboardingSelector />
      </LayoutResolver>
    )
  }

  return (
    <LayoutResolver>
      <Hero
        title="Benvenuto su Koros"
        description="Scopri le nostre soluzioni personalizzate per le tue esigenze"
        ctaText="Esplora i Prodotti"
        ctaLink="/prodotti"
      />
      
      <section id="content-section" className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentItems.map((content) => (
            <Card
              key={content.id}
              id={parseInt(content.id)}
              title={content.title}
              description={content.description}
              image={content.image}
              price={content.price}
              features={content.features}
            />
          ))}
        </div>

        {unifiedContent.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Nessun contenuto disponibile
            </h2>
            <p className="text-gray-600">
              Non ci sono contenuti disponibili per il tuo profilo al momento.
            </p>
          </div>
        )}

        {unifiedContent.length > 0 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </section>

      {/* Link per testare i layout */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center space-x-4">
          <a
            href="/?profile=b2c"
            className="text-primary hover:text-primary-dark"
          >
            Test B2C
          </a>
          <a
            href="/?profile=pro"
            className="text-primary hover:text-primary-dark"
          >
            Test Pro
          </a>
          <a
            href="/?profile=b2b"
            className="text-primary hover:text-primary-dark"
          >
            Test B2B
          </a>
        </div>
      </div>
    </LayoutResolver>
  )
} 