import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addItem } from '../lib/closetStore.js'
import { CATEGORIES, SEASONS, OCCASIONS } from '../lib/constants.js'

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function AddItem() {
  const navigate = useNavigate()
  const [photo, setPhoto] = useState(null)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [color, setColor] = useState('')
  const [season, setSeason] = useState('')
  const [occasion, setOccasion] = useState('')
  const [saving, setSaving] = useState(false)

  const canSave = photo && name.trim().length > 0 && category && !saving

  async function handlePhotoChange(event) {
    const file = event.target.files?.[0]
    if (!file) return
    setPhoto(await readAsDataURL(file))
  }

  async function handleSave(event) {
    event.preventDefault()
    if (!canSave) return

    setSaving(true)
    await addItem({
      id: crypto.randomUUID(),
      photo,
      name: name.trim(),
      category,
      color: color.trim(),
      season,
      occasion,
      dateAdded: new Date().toISOString(),
    })
    navigate('/closet')
  }

  return (
    <main className="min-h-svh bg-parchment px-6 py-8">
      <div className="mx-auto w-full max-w-sm">
        <h1 className="font-serif text-2xl text-brown-heading">Add an item</h1>
        <p className="mt-1 font-sans text-sm text-brown-secondary">
          Snap a photo and add a few quick tags.
        </p>

        <form onSubmit={handleSave} className="mt-6 flex flex-col gap-5">
          <label className="flex flex-col gap-2">
            <span className="font-sans text-sm font-medium text-brown-heading">
              Photo
            </span>
            {photo ? (
              <img
                src={photo}
                alt=""
                className="aspect-square w-full rounded-xl object-cover"
              />
            ) : (
              <span className="flex aspect-square w-full items-center justify-center rounded-xl border-2 border-dashed border-ivory bg-ivory font-sans text-sm text-brown-secondary">
                Tap to take or choose a photo
              </span>
            )}
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handlePhotoChange}
              className="font-sans text-sm text-brown-secondary file:mr-3 file:rounded-lg file:border-0 file:bg-fuchsia file:px-3 file:py-2 file:font-sans file:text-sm file:font-semibold file:text-parchment"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-sans text-sm font-medium text-brown-heading">
              What is it?
            </span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Navy blue wool blazer"
              className="rounded-xl border-2 border-ivory bg-ivory px-4 py-3 font-sans text-brown-heading placeholder:text-brown-secondary focus:border-fuchsia focus:outline-none"
            />
          </label>

          <fieldset className="flex flex-col gap-2">
            <legend className="font-sans text-sm font-medium text-brown-heading">
              Category
            </legend>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => {
                const selected = category === c.value
                return (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setCategory(c.value)}
                    className="rounded-full border px-3 py-1.5 font-sans text-sm font-medium transition-colors"
                    style={{
                      borderColor: selected ? c.color : '#DDD0BA',
                      backgroundColor: selected ? `${c.color}17` : 'transparent',
                      color: selected ? c.color : '#8A7052',
                    }}
                    aria-pressed={selected}
                  >
                    {c.label}
                  </button>
                )
              })}
            </div>
          </fieldset>

          <label className="flex flex-col gap-2">
            <span className="font-sans text-sm font-medium text-brown-heading">
              Color
            </span>
            <input
              type="text"
              value={color}
              onChange={(event) => setColor(event.target.value)}
              placeholder="e.g. Navy"
              className="rounded-xl border-2 border-ivory bg-ivory px-4 py-3 font-sans text-brown-heading placeholder:text-brown-secondary focus:border-fuchsia focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-sans text-sm font-medium text-brown-heading">
              Season
            </span>
            <select
              value={season}
              onChange={(event) => setSeason(event.target.value)}
              className="rounded-xl border-2 border-ivory bg-ivory px-4 py-3 font-sans text-brown-heading focus:border-fuchsia focus:outline-none"
            >
              <option value="">Select a season</option>
              {SEASONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-sans text-sm font-medium text-brown-heading">
              Occasion
            </span>
            <select
              value={occasion}
              onChange={(event) => setOccasion(event.target.value)}
              className="rounded-xl border-2 border-ivory bg-ivory px-4 py-3 font-sans text-brown-heading focus:border-fuchsia focus:outline-none"
            >
              <option value="">Select an occasion</option>
              {OCCASIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            disabled={!canSave}
            className="mt-2 rounded-xl bg-fuchsia px-4 py-3 font-sans text-base font-semibold text-parchment transition-opacity disabled:opacity-40"
          >
            {saving ? 'Saving…' : 'Save to closet'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/closet')}
            className="font-sans text-sm text-brown-secondary underline underline-offset-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </main>
  )
}

export default AddItem
