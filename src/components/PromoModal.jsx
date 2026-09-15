import { useEffect, useState } from 'react'
import Seal from './Seal'

const SEEN_KEY = 'salus-promo-seen'
const CODE = 'SALUS20'

// First-visit email-capture offer. Appears a moment after load, once per
// session (dismiss / sign-up sets a flag so it doesn't nag). Closes on X,
// backdrop click, or Esc.
export default function PromoModal() {
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1'
    } catch {
      /* private mode */
    }
    if (seen) return
    const t = setTimeout(() => setOpen(true), 1600)
    return () => clearTimeout(t)
  }, [])

  const dismiss = () => {
    setOpen(false)
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  // Lock scroll + Esc-to-close while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && dismiss()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const submit = (e) => {
    e.preventDefault()
    setDone(true)
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
      sessionStorage.setItem('salus-promo-code', CODE) // checkout auto-applies it
    } catch {
      /* ignore */
    }
  }

  const copy = () => {
    try {
      navigator.clipboard?.writeText(CODE)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* ignore */
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="20% off your first order"
    >
      <div className="absolute inset-0 bg-black/50 animate-[fadeIn_.3s_ease]" onClick={dismiss} />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-line bg-raised p-8 text-center shadow-lift animate-[popIn_.35s_cubic-bezier(.16,1,.3,1)]">
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-faint transition-colors hover:bg-surface hover:text-bone"
        >
          ✕
        </button>

        {!done ? (
          <>
            <div className="mx-auto mb-5 flex justify-center text-bone">
              <Seal size={64} />
            </div>
            <div className="text-[0.72rem] font-medium uppercase tracking-micro text-faint">
              First-order offer
            </div>
            <h2 className="mt-2 font-display text-[1.9rem] leading-tight text-bone">
              Take 20% off your
              <br /> first certified order.
            </h2>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-mute">
              Join the list for your code — and be first to know when a new product earns the Salus
              Life mark.
            </p>

            <form onSubmit={submit} className="mt-6 flex flex-col gap-2.5">
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
                Reveal my 20% code
              </button>
            </form>

            <button
              onClick={dismiss}
              className="mt-4 text-xs text-faint underline-offset-2 transition-colors hover:text-mute hover:underline"
            >
              No thanks, I’ll pay full price
            </button>
          </>
        ) : (
          <>
            <div className="mx-auto mb-5 flex justify-center text-bone">
              <Seal size={64} />
            </div>
            <h2 className="font-display text-[1.9rem] leading-tight text-bone">You’re in.</h2>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-mute">
              Here’s 20% off your first order. Enter it at checkout.
            </p>

            <button
              onClick={copy}
              className="group mx-auto mt-6 flex w-full items-center justify-between gap-3 rounded-xl border border-dashed border-accent/50 bg-accent/[0.06] px-5 py-4"
            >
              <span className="font-display text-2xl tracking-[0.15em] text-accent">{CODE}</span>
              <span className="text-xs font-medium text-accent-2 group-hover:text-accent">
                {copied ? 'Copied ✓' : 'Copy'}
              </span>
            </button>

            <button
              onClick={dismiss}
              className="mt-5 w-full rounded-full bg-bone px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.02]"
            >
              Start browsing
            </button>
            <p className="mx-auto mt-4 max-w-xs text-[0.7rem] leading-relaxed text-faint">
              One-time code · 20% off your first order, up to a $50 maximum discount. Demo offer.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
