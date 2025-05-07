import { useState, useEffect } from 'react'
import { UserProfile } from '@/types/layout'

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectProfile: (profile: UserProfile) => void
}

export default function ProfileModal({ isOpen, onClose, onSelectProfile }: ProfileModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !isOpen) return null

  const profiles: { id: UserProfile; label: string }[] = [
    { id: 'buyer', label: 'Buyer' },
    { id: 'giornalista', label: 'Giornalista' },
    { id: 'privato', label: 'Privato' },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-6">Select Your Profile</h2>
        <div className="space-y-4">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => onSelectProfile(profile.id)}
              className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors"
            >
              {profile.label}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  )
} 