import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserProfile } from '../utils/layoutResolver'

interface ProfileOption {
  id: UserProfile
  label: string
  description: string
  icon: React.ReactNode
}

const profileOptions: ProfileOption[] = [
  {
    id: 'b2c',
    label: 'Privato',
    description: 'Sono un utente privato che cerca soluzioni personali',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    id: 'pro',
    label: 'Professionista',
    description: 'Sono un professionista o consulente',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'b2b',
    label: 'Azienda',
    description: 'Rappresento un\'azienda o un\'organizzazione',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
]

export default function OnboardingSelector() {
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null)
  const router = useRouter()

  const handleProfileSelect = (profile: UserProfile) => {
    setSelectedProfile(profile)
  }

  const handleConfirm = async () => {
    if (!selectedProfile) return

    // Imposta il cookie
    document.cookie = `koros_profile=${selectedProfile}; max-age=${30 * 24 * 60 * 60}; path=/; sameSite=lax`

    // Reindirizza alla homepage
    router.push('/')
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-95 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Per chi stai usando Koros?
        </h1>

        <div className="space-y-4 mb-8">
          {profileOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleProfileSelect(option.id)}
              className={`w-full p-6 rounded-lg border-2 transition-all ${
                selectedProfile === option.id
                  ? 'border-primary bg-primary bg-opacity-5'
                  : 'border-gray-200 hover:border-primary hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${
                  selectedProfile === option.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {option.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold mb-1">{option.label}</h3>
                  <p className="text-gray-600">{option.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleConfirm}
            disabled={!selectedProfile}
            className={`px-8 py-3 rounded-lg font-semibold text-white ${
              selectedProfile
                ? 'bg-primary hover:bg-primary-dark'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Conferma e Continua
          </button>
        </div>
      </div>
    </div>
  )
} 