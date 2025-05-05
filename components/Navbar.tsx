import { useState, useEffect } from 'react'
import { UserProfile } from '@/types/layout'
import ProfileModal from './ProfileModal'

export default function Navbar() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const storedProfile = localStorage.getItem('korosUserProfile') as UserProfile
    if (storedProfile) {
      setUserProfile(storedProfile)
    } else {
      setIsModalOpen(true)
    }
  }, [])

  const handleProfileSelect = (profile: UserProfile) => {
    setUserProfile(profile)
    localStorage.setItem('korosUserProfile', profile)
    setIsModalOpen(false)
  }

  const handleProfileChange = () => {
    setIsModalOpen(true)
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold">Koros</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {userProfile && (
              <button
                onClick={handleProfileChange}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Profile: {userProfile}
              </button>
            )}
          </div>
        </div>
      </div>

      <ProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectProfile={handleProfileSelect}
      />
    </nav>
  )
} 