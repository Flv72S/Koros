import { useState, useEffect, useRef } from 'react'
import { useFavoriteFilters } from '../hooks/useFavoriteFilters'

interface SaveFavoriteModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string) => void
  selectedCategories: string[]
  priceRange: string
}

export default function SaveFavoriteModal({
  isOpen,
  onClose,
  onSave,
  selectedCategories,
  priceRange
}: SaveFavoriteModalProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const modalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { isDuplicateName } = useFavoriteFilters()

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      setError('Inserisci un nome per il preferito')
      return
    }

    if (isDuplicateName(name)) {
      setError('Esiste già un preferito con questo nome')
      return
    }

    onSave(name)
    setName('')
    setError('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        />

        <div
          ref={modalRef}
          className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
        >
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={onClose}
              aria-label="Chiudi"
            >
              <span className="sr-only">Chiudi</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3
                className="text-lg font-semibold leading-6 text-gray-900"
                id="modal-title"
              >
                Salva Filtri Preferiti
              </h3>

              <form onSubmit={handleSubmit} className="mt-4">
                <div>
                  <label
                    htmlFor="favorite-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nome del preferito
                  </label>
                  <div className="mt-1">
                    <input
                      ref={inputRef}
                      type="text"
                      id="favorite-name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value)
                        setError('')
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      placeholder="Inserisci un nome per il preferito"
                      aria-invalid={error ? 'true' : 'false'}
                      aria-describedby={error ? 'error-message' : undefined}
                    />
                  </div>
                  {error && (
                    <p
                      className="mt-2 text-sm text-red-600"
                      id="error-message"
                      role="alert"
                    >
                      {error}
                    </p>
                  )}
                </div>

                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:ml-3 sm:w-auto"
                  >
                    Salva
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary sm:mt-0 sm:w-auto"
                    onClick={onClose}
                  >
                    Annulla
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 