import Button from './Button'

interface HeroProps {
  title: string
  description: string
  ctaText?: string
  ctaLink?: string
  variant?: 'light' | 'dark'
}

export default function Hero({
  title,
  description,
  ctaText = 'Inizia Ora',
  ctaLink = '/registrazione',
  variant = 'light'
}: HeroProps) {
  const isDark = variant === 'dark'
  const textColor = isDark ? 'text-white' : 'text-gray-900'
  const bgColor = isDark ? 'bg-gray-900' : 'bg-gray-50'

  return (
    <section className={`${bgColor} py-20`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${textColor}`}>
            {title}
          </h1>
          <p className={`text-xl mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {description}
          </p>
          <Button
            href={ctaLink}
            variant={isDark ? 'light' : 'primary'}
            size="lg"
          >
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  )
} 