import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StarMark from '../components/StarMark.jsx'

const CLOSET_SIZES = [
  { value: 'small', label: 'Small', color: '#1F5C78' },
  { value: 'medium', label: 'Medium', color: '#B9760F' },
  { value: 'large', label: 'Large', color: '#2E6B4C' },
]

function Onboarding() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [closetSize, setClosetSize] = useState('')

  const canBegin = name.trim().length > 0 && closetSize

  function handleBegin(event) {
    event.preventDefault()
    if (!canBegin) return

    localStorage.setItem(
      'doulabot-profile',
      JSON.stringify({ name: name.trim(), closetSize }),
    )
    navigate('/closet')
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-parchment px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <StarMark size={36} className="mb-4" />
          <h1 className="font-serif text-4xl text-brown-heading">Doulabot</h1>
          <p className="mt-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-brown-secondary">
            Welcome to your Doulab
          </p>
          <p className="mt-4 font-sans text-brown-secondary">
            Let's get your wardrobe organized, one photo at a time.
          </p>
        </div>

        <form onSubmit={handleBegin} className="flex flex-col gap-6">
          <label className="flex flex-col gap-2">
            <span className="font-sans text-sm font-medium text-brown-heading">
              What should we call you?
            </span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              className="rounded-xl border-2 border-ivory bg-ivory px-4 py-3 font-sans text-brown-heading placeholder:text-brown-secondary focus:border-fuchsia focus:outline-none"
              autoComplete="name"
            />
          </label>

          <fieldset className="flex flex-col gap-2">
            <legend className="font-sans text-sm font-medium text-brown-heading">
              How big is your closet?
            </legend>
            <div className="flex gap-3">
              {CLOSET_SIZES.map((size) => {
                const selected = closetSize === size.value
                return (
                  <button
                    key={size.value}
                    type="button"
                    onClick={() => setClosetSize(size.value)}
                    className="flex-1 rounded-xl border px-3 py-3 font-sans text-sm font-medium transition-colors"
                    style={{
                      borderColor: selected ? size.color : '#DDD0BA',
                      borderWidth: selected ? '1.5px' : '1px',
                      backgroundColor: selected ? `${size.color}17` : 'transparent',
                      color: selected ? size.color : '#8A7052',
                    }}
                    aria-pressed={selected}
                  >
                    {size.label}
                  </button>
                )
              })}
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={!canBegin}
            className="mt-2 rounded-xl bg-fuchsia px-4 py-3 font-sans text-base font-semibold text-parchment transition-opacity disabled:opacity-40"
          >
            Begin
          </button>
        </form>
      </div>
    </main>
  )
}

export default Onboarding
