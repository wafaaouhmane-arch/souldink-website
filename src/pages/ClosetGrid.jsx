import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StarMark from '../components/StarMark.jsx'
import { getAllItems } from '../lib/closetStore.js'
import { colorForCategory } from '../lib/constants.js'

function ClosetGrid() {
  const [profile, setProfile] = useState(null)
  const [items, setItems] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('doulabot-profile')
    if (stored) setProfile(JSON.parse(stored))
    getAllItems().then((all) => {
      all.sort((a, b) => b.dateAdded.localeCompare(a.dateAdded))
      setItems(all)
    })
  }, [])

  const loading = items === null
  const empty = !loading && items.length === 0

  return (
    <main className="min-h-svh bg-parchment px-6 py-8 pb-28">
      <div className="mx-auto w-full max-w-md">
        <div className="flex items-center gap-3">
          <StarMark size={28} />
          <div>
            <h1 className="font-serif text-2xl text-brown-heading">
              {profile ? `${profile.name}'s Doulab` : 'Your Doulab'}
            </h1>
            {!loading && !empty && (
              <p className="font-sans text-sm text-brown-secondary">
                {items.length} item{items.length === 1 ? '' : 's'} catalogued
              </p>
            )}
          </div>
        </div>

        {empty && (
          <div className="mt-16 flex flex-col items-center text-center">
            <p className="max-w-sm font-sans text-brown-secondary">
              Your closet is empty for now — add your first item to start
              cataloguing.
            </p>
            <Link
              to="/add-item"
              className="mt-6 rounded-xl bg-fuchsia px-5 py-3 font-sans text-base font-semibold text-parchment"
            >
              Add your first item
            </Link>
          </div>
        )}

        {!loading && !empty && (
          <div className="mt-6 grid grid-cols-2 gap-4">
            {items.map((item) => (
              <Link
                key={item.id}
                to={`/item/${item.id}`}
                className="flex flex-col gap-2"
              >
                <img
                  src={item.photo}
                  alt=""
                  className="aspect-square w-full rounded-xl object-cover"
                />
                <div>
                  <p className="truncate font-serif text-base text-brown-heading">
                    {item.name}
                  </p>
                  {item.category && (
                    <span
                      className="mt-1 inline-block rounded-full px-2 py-0.5 font-sans text-xs font-medium"
                      style={{
                        backgroundColor: `${colorForCategory(item.category)}17`,
                        color: colorForCategory(item.category),
                      }}
                    >
                      {item.category}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {!empty && (
        <Link
          to="/add-item"
          aria-label="Add an item"
          className="fixed bottom-8 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-fuchsia font-sans text-3xl leading-none text-parchment"
        >
          +
        </Link>
      )}
    </main>
  )
}

export default ClosetGrid
