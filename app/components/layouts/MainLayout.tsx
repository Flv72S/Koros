import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { findMenuItemBySlug } from '../../config/menu'
import { getLocaleFromPath } from '../../config/i18n'
import { SEO } from '../SEO'
import { Header } from '../Header'
import { Footer } from '../Footer'
import { LocaleSelector } from '../LocaleSelector'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter()
  const currentPath = router.asPath
  const locale = getLocaleFromPath(currentPath)
  const unlocalizedPath = locale ? currentPath.slice(locale.length + 2) : currentPath
  const menuItem = findMenuItemBySlug(unlocalizedPath)

  return (
    <>
      <SEO seo={menuItem?.seo} />
      <div className="min-h-screen flex flex-col">
        <Header>
          <div className="flex items-center space-x-4">
            <LocaleSelector />
          </div>
        </Header>
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
} 