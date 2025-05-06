import { useLayoutPreference, LayoutType } from '../hooks/useLayoutPreference'

interface LayoutToggleProps {
  className?: string
}

export default function LayoutToggle({ className = '' }: LayoutToggleProps) {
  const { layout, toggleLayout } = useLayoutPreference()

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <button
        type="button"
        onClick={toggleLayout}
        className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label={`Cambia layout in ${layout === 'grid' ? 'lista' : 'griglia'}`}
      >
        {layout === 'grid' ? (
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
        )}
      </button>
      <span className="text-sm text-gray-600">
        {layout === 'grid' ? 'Griglia' : 'Lista'}
      </span>
    </div>
  )
} 