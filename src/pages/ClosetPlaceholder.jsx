import { useEffect, useState } from 'react'
import StarMark from '../components/StarMark.jsx'

function ClosetPlaceholder() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('doulabot-profile')
    if (stored) setProfile(JSON.parse(stored))
  }, [])

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-parchment px-6 py-12 text-center">
      <StarMark size={40} className="mb-4" />
      <h1 className="font-serif text-3xl text-brown-heading">
        {profile ? `Welcome, ${profile.name}` : 'Welcome'}
      </h1>
      <p className="mt-2 max-w-sm font-sans text-brown-secondary">
        Your closet is empty for now — adding items is coming next.
      </p>
    </main>
  )
}

export default ClosetPlaceholder
