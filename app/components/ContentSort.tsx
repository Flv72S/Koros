import { useState, useRef, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

type SortOption = {
  value: string
  label: string
  ariaLabel: string
}

const sortOptions: SortOption[] = [
  { 
    value: 'price-asc', 
    label: 'Prezzo: dal più basso al più alto',
    ariaLabel: 'Ordina per prezzo crescente'
  },
  { 
    value: 'price-desc', 
    label: 'Prezzo: dal più alto al più basso',
    ariaLabel: 'Ordina per prezzo decrescente'
  },
  { 
    value: 'title-asc', 
    label: 'Titolo: A-Z',
    ariaLabel: 'Ordina per titolo in ordine alfabetico'
  },
  { 
    value: 'title-desc', 
    label: 'Titolo: Z-A',
    ariaLabel: 'Ordina per titolo in ordine alfabetico inverso'
  },
  { 
    value: 'date-desc', 
    label: 'Data: dal più recente',
    ariaLabel: 'Ordina per data di pubblicazione, dal più recente'
  },
  { 
    value: 'date-asc', 
    label: 'Data: dal meno recente',
    ariaLabel: 'Ordina per data di pubblicazione, dal meno recente'
  }
]

interface ContentSortProps {
  onSortChange: (sortValue: string) => void
}

export default function ContentSort({ onSortChange }: ContentSortProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<SortOption>(sortOptions[0])
  const buttonRef = useRef<HTMLButtonElement>(null)
  const listboxRef = useRef<HTMLUListElement>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Gestisce il focus trap
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Gestisce il click fuori dal menu
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        listboxRef.current && 
        !listboxRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Inizializza lo stato dal parametro URL
  useEffect(() => {
    const sortParam = searchParams.get('sort')
    if (sortParam) {
      const option = sortOptions.find(opt => opt.value === sortParam)
      if (option) {
        setSelectedOption(option)
      }
    }
  }, [searchParams])

  const handleOptionSelect = (option: SortOption) => {
    setSelectedOption(option)
    setIsOpen(false)
    onSortChange(option.value)

    // Aggiorna l'URL
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', option.value)
    params.set('page', '1') // Reset alla prima pagina
    router.push(`?${params.toString()}`)

    // Riporta il focus al pulsante
    buttonRef.current?.focus()
  }

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <span 
          id="sort-label" 
          className="text-sm font-medium text-gray-700"
        >
          Ordina per:
        </span>
        <div className="relative">
          <button
            ref={buttonRef}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-labelledby="sort-label"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedOption.label}
            <svg
              className={`ml-2 h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isOpen && (
            <ul
              ref={listboxRef}
              className="absolute z-10 mt-1 w-72 rounded-md bg-white shadow-lg max-h-60 overflow-auto focus:outline-none"
              role="listbox"
              aria-labelledby="sort-label"
              tabIndex={-1}
            >
              {sortOptions.map((option) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={selectedOption.value === option.value}
                  className={`
                    cursor-pointer select-none relative py-2 pl-3 pr-9
                    ${selectedOption.value === option.value 
                      ? 'bg-primary text-white' 
                      : 'text-gray-900 hover:bg-gray-50'
                    }
                  `}
                  onClick={() => handleOptionSelect(option)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleOptionSelect(option)
                    }
                  }}
                  tabIndex={0}
                >
                  <span className="block truncate">{option.label}</span>
                  {selectedOption.value === option.value && (
                    <span
                      className={`
                        absolute inset-y-0 right-0 flex items-center pr-4
                        ${selectedOption.value === option.value ? 'text-white' : 'text-primary'}
                      `}
                    >
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
} 