import Head from 'next/head'
import { SEO as SEOType } from '../config/menu'

interface SEOProps {
  seo: SEOType
  fallbackTitle?: string
  fallbackDescription?: string
}

export function SEO({ seo, fallbackTitle = 'Koros', fallbackDescription = 'Soluzioni digitali innovative per la crescita aziendale' }: SEOProps) {
  const title = seo?.title || fallbackTitle
  const description = seo?.description || fallbackDescription
  const keywords = seo?.keywords
  const robots = seo?.robots || 'index, follow'
  const canonicalUrl = seo?.canonicalUrl

  // Open Graph
  const ogTitle = seo?.ogTitle || title
  const ogDescription = seo?.ogDescription || description
  const ogImage = seo?.ogImage
  const ogType = seo?.ogType || 'website'

  // Twitter
  const twitterCard = seo?.twitterCard || 'summary_large_image'
  const twitterTitle = seo?.twitterTitle || title
  const twitterDescription = seo?.twitterDescription || description
  const twitterImage = seo?.twitterImage || ogImage

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:type" content={ogType} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      {twitterImage && <meta name="twitter:image" content={twitterImage} />}

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
  )
} 