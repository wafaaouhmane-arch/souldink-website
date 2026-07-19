import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getItem, deleteItem } from '../lib/closetStore.js'
import { colorForCategory } from '../lib/constants.js'

function Tag({ children, color }) {
  if (!children) return null
  return (
    <span
      className="inline-block rounded-full px-3 py-1 font-sans text-sm font-medium"
      style={{ backgroundColor: `${color}17`, color }}
    >
      {children}
    </span>
  )
}

function ItemDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    getItem(id).then((found) => {
      if (found) setItem(found)
      else setNotFound(true)
    })
  }, [id])

  async function handleDelete() {
    if (!window.confirm(`Remove "${item.name}" from your closet?`)) return
    await deleteItem(id)
    navigate('/closet')
  }

  if (notFound) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center gap-4 bg-parchment px-6 text-center">
        <p className="font-sans text-brown-secondary">
          That item couldn't be found.
        </p>
        <Link
          to="/closet"
          className="font-sans text-sm font-medium text-fuchsia underline underline-offset-2"
        >
          Back to closet
        </Link>
      </main>
    )
  }

  if (!item) return null

  const catColor = colorForCategory(item.category)

  return (
    <main className="min-h-svh bg-parchment px-6 py-8">
      <div className="mx-auto w-full max-w-sm">
        <Link
          to="/closet"
          className="font-sans text-sm font-medium text-brown-secondary"
        >
          ← Back to closet
        </Link>

        <img
          src={item.photo}
          alt=""
          className="mt-4 aspect-square w-full rounded-xl object-cover"
        />

        <h1 className="mt-4 font-serif text-2xl text-brown-heading">
          {item.name}
        </h1>

        <div className="mt-3 flex flex-wrap gap-2">
          <Tag color={catColor}>{item.category}</Tag>
          <Tag color="#8A7052">{item.color}</Tag>
          <Tag color="#8A7052">{item.season}</Tag>
          <Tag color="#8A7052">{item.occasion}</Tag>
        </div>

        <p className="mt-6 font-sans text-xs text-brown-secondary">
          Added {new Date(item.dateAdded).toLocaleDateString()}
        </p>

        <button
          type="button"
          onClick={handleDelete}
          className="mt-8 w-full rounded-xl border-2 border-ivory px-4 py-3 font-sans text-sm font-semibold text-brown-secondary"
        >
          Remove from closet
        </button>
      </div>
    </main>
  )
}

export default ItemDetail
