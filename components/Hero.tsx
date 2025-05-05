interface HeroProps {
  title: string
  subtitle?: string
}

export default function Hero({ title, subtitle }: HeroProps) {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  )
} 