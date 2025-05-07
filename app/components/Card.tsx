import { useLayoutPreference } from '../hooks/useLayoutPreference'

interface CardProps {
  id: string
  title: string
  description: string
  image: string
  price: number
  category: string[]
}

export default function Card({ id, title, description, image, price, category }: CardProps) {
  const { layout } = useLayoutPreference()

  if (layout === 'list') {
    return (
      <article
        className="flex gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        aria-labelledby={`card-title-${id}`}
      >
        <div className="flex-shrink-0 w-32 h-32">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="flex-grow">
          <h3
            id={`card-title-${id}`}
            className="text-lg font-semibold text-gray-900 mb-2"
          >
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {category.map((cat) => (
                <span
                  key={cat}
                  className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
            <span className="text-lg font-semibold text-primary">
              {price === 0 ? 'Gratuito' : `${price}€`}
            </span>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
      aria-labelledby={`card-title-${id}`}
    >
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3
          id={`card-title-${id}`}
          className="text-lg font-semibold text-gray-900 mb-2"
        >
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {category.map((cat) => (
              <span
                key={cat}
                className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
          <span className="text-lg font-semibold text-primary">
            {price === 0 ? 'Gratuito' : `${price}€`}
          </span>
        </div>
      </div>
    </article>
  )
} 