import { useEffect, useState } from 'react'
import Seal from './Seal'

// Waitlist email capture, opened from the hero's "Join the waitlist" button.
export default function WaitlistModal({ open, onClose }) {
  const [joined, setJoined] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Join the waitlist"
    >
      <div className="absolute inset-0 bg-black/50 animate-[fadeIn_.3s_ease]" onClick={onClose} />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-line bg-raised p-8 text-center shadow-lift animate-[popIn_.35s_cubic-bezier(.16,1,.3,1)]">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-faint transition-colors hover:bg-surface hover:text-bone"
        >
          ✕
        </button>

        <div className="mx-auto mb-5 flex justify-center text-bone">
          <Seal size={58} />
        </div>

        {!joined ? (
          <>
            <h2 className="font-display text-[1.9rem] leading-tight text-bone">Join the waitlist</h2>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-mute">
              Be first to know when a new product earns the Salus Life mark — and get early access.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setJoined(true)
              }}
              className="mt-6 flex flex-col gap-2.5"
            >
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="w-full rounded-full border border-line bg-card px-5 py-3 text-center text-sm text-bone placeholder:text-faint outline-none transition-colors focus:border-accent/60"
              />
              <button
                type="submit"
                className="w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent-2"
              >
                Join the waitlist
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="font-display text-[1.9rem] leading-tight text-bone">You’re on the list.</h2>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-mute">
              Thanks — we’ll email you at each new verdict and when early access opens.
            </p>
            <button
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-bone px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.02]"
            >
              Done
            </button>
          </>
        )}
      </div>
    </div>
  )
}
