import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductImage from './ProductImage'
import { PRODUCTS } from '../data/products'

// Broad, less-descriptive words (e.g. "food") jump straight to a category or
// standard page instead of only matching individual product/brand names.
const SECTIONS = [
  { to: '/catalog?group=equipment', label: 'Equipment', hint: 'Category', keys: ['equipment', 'gear'] },
  { to: '/catalog?group=food', label: 'Food', hint: 'Category', keys: ['food', 'foods', 'perishable', 'perishables', 'groceries'] },
  { to: '/catalog?group=supplements', label: 'Supplements', hint: 'Category', keys: ['supplement', 'supplements', 'vitamin', 'vitamins'] },
  { to: '/catalog?group=drinks', label: 'Water & Drinks', hint: 'Category', keys: ['drink', 'drinks', 'water', 'beverage', 'beverages'] },
  { to: '/catalog?group=cleaning', label: 'Cleaning', hint: 'Category', keys: ['cleaning', 'clean'] },
  { to: '/standards/household', label: 'Household standard', hint: 'Standard', keys: ['household'] },
  { to: '/standards/nutrition', label: 'Nutrition standard', hint: 'Standard', keys: ['nutrition'] },
]

function matchSections(q) {
  if (q.length < 2) return []
  return SECTIONS.filter((s) => s.keys.some((k) => k.includes(q) || q.includes(k)))
}

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
  const sectionResults = q ? matchSections(q) : []
  const results = q
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      ).slice(0, 6)
    : []

  const goTo = (id) => {
    onClose()
    navigate(`/product/${id}`)
  }

  const goToSection = (to) => {
    onClose()
    navigate(to)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // A broad category/standard word wins over an incidental product match.
    if (sectionResults[0]) goToSection(sectionResults[0].to)
    else if (results[0]) goTo(results[0].id)
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
            {q && sectionResults.length === 0 && results.length === 0 && (
              <p className="px-5 py-8 text-center text-sm text-mute">No matches for “{query}”.</p>
            )}

            {sectionResults.length > 0 && (
              <div className="border-b border-line py-2">
                {sectionResults.map((s) => (
                  <button
                    key={s.to}
                    onClick={() => goToSection(s.to)}
                    className="flex w-full items-center gap-3 px-5 py-2.5 text-left transition-colors hover:bg-card"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line text-mute">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 7h4l2-2h6l2 2h4v12H3z" />
                      </svg>
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm text-bone">{s.label}</div>
                      <div className="text-xs text-faint">{s.hint}</div>
                    </div>
                    <span className="shrink-0 text-faint">→</span>
                  </button>
                ))}
              </div>
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
                Start typing to search marked products — or a category like “food” or “equipment”.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
