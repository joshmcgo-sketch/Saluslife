import { useEffect, useState } from 'react'

const MAX_LEN = 500
const MAX_NAME_LEN = 60

// Local fallback only — used when /api/reviews isn't reachable (e.g. the
// GitHub Pages mirror, which can't run backend code). The real, shared
// reviews live in Upstash Redis behind api/reviews.js.
function localKey(productId) {
  return `salus-reviews-${productId}`
}

function loadLocalReviews(productId) {
  try {
    const raw = localStorage.getItem(localKey(productId))
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveLocalReviews(productId, reviews) {
  try {
    localStorage.setItem(localKey(productId), JSON.stringify(reviews))
  } catch {
    /* ignore */
  }
}

function Star({ filled, size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <path d="M12 3.5l2.6 5.3 5.9.85-4.25 4.15 1 5.85L12 16.9l-5.25 2.75 1-5.85L3.5 9.65l5.9-.85L12 3.5Z" />
    </svg>
  )
}

function StarRow({ value, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5 text-accent">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} filled={n <= Math.round(value)} size={size} />
      ))}
    </div>
  )
}

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function ProductReviews({ productId }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [offline, setOffline] = useState(false)

  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetch(`/api/reviews?productId=${encodeURIComponent(productId)}`)
      .then((res) => {
        if (!res.ok) throw new Error('bad response')
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        setReviews(data.reviews || [])
        setOffline(false)
      })
      .catch(() => {
        if (cancelled) return
        // No shared backend reachable here — fall back to this browser's
        // own local copy so the feature still works, just not shared.
        setReviews(loadLocalReviews(productId))
        setOffline(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [productId])

  const average = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0

  const resetForm = () => {
    setRating(0)
    setName('')
    setComment('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (rating < 1) {
      setError('Choose a star rating before submitting.')
      return
    }
    setError('')
    setSubmitting(true)

    const trimmedName = name.trim().slice(0, MAX_NAME_LEN) || 'Anonymous'
    const trimmedComment = comment.trim().slice(0, MAX_LEN)

    if (offline) {
      const review = { id: Date.now(), rating, name: trimmedName, comment: trimmedComment, date: new Date().toISOString() }
      const next = [review, ...reviews]
      setReviews(next)
      saveLocalReviews(productId, next)
      resetForm()
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, rating, name: trimmedName, comment: trimmedComment }),
      })
      const data = await res.json()
      if (!res.ok || !data.review) throw new Error(data.error || 'Could not submit review.')
      setReviews((prev) => [data.review, ...prev])
      resetForm()
    } catch {
      setError('Could not submit your review — try again in a moment.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-2xl text-bone">{reviews.length ? average.toFixed(1) : '—'}</span>
          <StarRow value={average} />
        </div>
        <span className="text-sm text-faint">
          {loading ? 'Loading reviews…' : `${reviews.length} review${reviews.length === 1 ? '' : 's'}`}
        </span>
      </div>

      {offline && !loading && (
        <p className="mt-2 text-xs text-faint">
          Reviews aren’t syncing right now — yours will only show on this device.
        </p>
      )}

      {reviews.length > 0 && (
        <ul className="mt-6 space-y-4">
          {reviews.map((r) => (
            <li key={r.id} className="rounded-2xl border border-line bg-card p-5">
              <div className="flex items-center justify-between gap-3">
                <StarRow value={r.rating} size={14} />
                <span className="text-xs text-faint">{fmtDate(r.date)}</span>
              </div>
              <div className="mt-2 text-sm font-medium text-bone">{r.name}</div>
              {r.comment && <p className="mt-1 text-sm leading-relaxed text-mute">{r.comment}</p>}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="mt-8 max-w-md rounded-2xl border border-line bg-card p-5 shadow-card">
        <div className="text-sm font-medium text-bone">Leave a review</div>

        <div className="mt-3 flex items-center gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              aria-label={`${n} star${n === 1 ? '' : 's'}`}
              className={`transition-colors ${(hover || rating) >= n ? 'text-accent' : 'text-line'}`}
            >
              <Star filled={(hover || rating) >= n} size={22} />
            </button>
          ))}
        </div>

        <label className="mt-4 block">
          <span className="mb-1.5 block text-xs uppercase tracking-micro text-faint">Name (optional)</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={MAX_NAME_LEN}
            placeholder="Alex Rivera"
            className="w-full rounded-xl border border-line bg-raised px-4 py-2.5 text-sm text-bone placeholder:text-faint outline-none transition-colors focus:border-accent/60"
          />
        </label>

        <label className="mt-4 block">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs uppercase tracking-micro text-faint">Comment</span>
            <span className="text-xs text-faint">
              {comment.length}/{MAX_LEN}
            </span>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, MAX_LEN))}
            maxLength={MAX_LEN}
            placeholder="What stood out about it?"
            className="min-h-[90px] w-full resize-y rounded-xl border border-line bg-raised px-4 py-2.5 text-sm text-bone placeholder:text-faint outline-none transition-colors focus:border-accent/60"
          />
        </label>

        {error && <p className="mt-2 text-xs text-fail">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-4 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-accent-2 disabled:opacity-60"
        >
          {submitting ? 'Submitting…' : 'Submit review'}
        </button>
      </form>
    </div>
  )
}
