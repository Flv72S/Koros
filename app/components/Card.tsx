interface CardProps {
  id: number
  title: string
  description: string
  image: string
  price: string
  features: string[]
}

export default function Card({ title, description, image, price, features }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="aspect-w-16 aspect-h-9 bg-gray-100">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="mb-4">
          <span className="text-2xl font-bold text-primary">€{price}</span>
          <span className="text-gray-500 text-sm">/mese</span>
        </div>
        
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-600">
              <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
        
        <button className="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
          Inizia Ora
        </button>
      </div>
    </div>
  )
} 