import { useState } from 'react'
import { BooleanLogic } from '../hooks/usePersistentFilters'
import StatusAnnouncement from './StatusAnnouncement'

interface BooleanLogicToggleProps {
  value: BooleanLogic
  onChange: (value: BooleanLogic) => void
  className?: string
}

export default function BooleanLogicToggle({
  value,
  onChange,
  className = ''
}: BooleanLogicToggleProps) {
  const [announcement, setAnnouncement] = useState('')

  const handleChange = (newValue: BooleanLogic) => {
    onChange(newValue)
    setAnnouncement(
      newValue === 'AND'
        ? 'Modalità AND attivata: verranno mostrati solo i contenuti che appartengono a tutte le categorie selezionate'
        : 'Modalità OR attivata: verranno mostrati i contenuti che appartengono ad almeno una delle categorie selezionate'
    )
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700">Logica categorie:</span>
        <div className="flex rounded-md shadow-sm" role="group" aria-label="Selezione logica categorie">
          <button
            type="button"
            onClick={() => handleChange('OR')}
            className={`
              px-3 py-1.5 text-sm font-medium rounded-l-md
              ${value === 'OR'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
              }
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            `}
            aria-pressed={value === 'OR'}
          >
            Almeno una (OR)
          </button>
          <button
            type="button"
            onClick={() => handleChange('AND')}
            className={`
              px-3 py-1.5 text-sm font-medium rounded-r-md
              ${value === 'AND'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
              }
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            `}
            aria-pressed={value === 'AND'}
          >
            Tutte (AND)
          </button>
        </div>
      </div>

      <StatusAnnouncement message={announcement} />
    </div>
  )
} 