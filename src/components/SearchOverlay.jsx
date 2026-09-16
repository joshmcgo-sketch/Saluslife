import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductImage from './ProductImage'
import { PRODUCTS } from '../data/products'

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  // Reset the query, lock scroll, and focus the input whenever it opens.
  useEffect(() => {
    if (!isOpen) return
    setQuery('')
    const t = setTimeout(() => inputRef.current?.focus(), 10)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      clearTimeout(t)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  const q = query.trim().toLowerCase()
  const results = q
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      ).slice(0, 8)
    : []

  const goTo = (id) => {
    onClose()
    navigate(`/product/${id}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (results[0]) goTo(results[0].id)
  }

  return (
    <div className={`fixed inset-0 z-[70] ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      {/* Scrim */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {/* Panel */}
      <div
        className={`absolute inset-x-0 top-0 mx-auto max-w-xl px-4 pt-20 transition-all duration-300 ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-lift">
          <form onSubmit={handleSubmit} className="flex items-center gap-3 border-b border-line px-5 py-4">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-faint">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products by name, brand, or category…"
              className="w-full bg-transparent text-sm text-bone placeholder:text-faint outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="shrink-0 text-xs text-faint transition-colors hover:text-bone"
            >
              Esc
            </button>
          </form>

          <div className="max-h-[60vh] overflow-y-auto">
            {q && results.length === 0 && (
              <p className="px-5 py-8 text-center text-sm text-mute">No products match “{query}”.</p>
            )}
            {results.map((p) => (
              <button
                key={p.id}
                onClick={() => goTo(p.id)}
                className="flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-card"
              >
                <ProductImage icon={p.icon} src={p.image} alt={p.name} className="h-11 w-11 shrink-0" rounded="rounded-lg" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm text-bone">{p.name}</div>
                  <div className="text-xs text-faint">
                    {p.brand} · {p.category}
                  </div>
                </div>
              </button>
            ))}
            {!q && (
              <p className="px-5 py-8 text-center text-sm text-faint">
                Start typing to search marked products.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
