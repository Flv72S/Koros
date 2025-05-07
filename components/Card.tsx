interface CardProps {
  image: string
  title: string
  description: string
  category?: string
}

export default function Card({ image, title, description, category }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6">
        {category && (
          <span className="inline-block px-3 py-1 text-sm font-medium text-primary-600 bg-primary-50 rounded-full mb-2">
            {category}
          </span>
        )}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
} 