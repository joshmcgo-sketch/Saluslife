import { useEffect, useRef, useState } from 'react'
import Seal from './Seal'

const SEEN_KEY = 'salus-promo-seen'
const CODE = 'SALUS20'

// Sage "scratch to reveal" coating painted onto the canvas.
function paintCoating(ctx, w, h) {
  const g = ctx.createLinearGradient(0, 0, w, h)
  g.addColorStop(0, '#5c7563')
  g.addColorStop(0.5, '#3E5A46')
  g.addColorStop(1, '#33513f')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)
  // soft sheen streak
  ctx.globalAlpha = 0.16
  ctx.fillStyle = '#fff'
  ctx.save()
  ctx.translate(w * 0.22, 0)
  ctx.rotate(0.2)
  ctx.fillRect(0, -20, 46, h + 40)
  ctx.restore()
  ctx.globalAlpha = 1
  ctx.fillStyle = 'rgba(236,233,224,0.85)'
  ctx.font = '600 15px Inter, system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('SCRATCH TO REVEAL', w / 2, h / 2)
}

// First-visit scratch-off offer. Appears a moment after load, once per session.
// Scratch the sage panel → reveal 20% off → claim with email (stores the code
// so checkout auto-applies it). Closes on X, backdrop click, or Esc.
export default function PromoModal() {
  const [open, setOpen] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [emailStep, setEmailStep] = useState(false)
  const [claimed, setClaimed] = useState(false)
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1'
    } catch {
      /* private mode */
    }
    if (seen) return

    const show = () => setOpen(true)
    // On the landing (which has the scroll-expand intro) wait until the visitor
    // has scrolled past the intro before showing the coupon; elsewhere fall back
    // to a short timer.
    const hasIntro = document.querySelector('[data-intro]')
    if (hasIntro) {
      const onScroll = () => {
        if (window.scrollY > window.innerHeight * 0.72) {
          show()
          window.removeEventListener('scroll', onScroll)
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }
    const t = setTimeout(show, 1600)
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

  // Wire up the scratch canvas once the modal is open.
  useEffect(() => {
    if (!open) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    paintCoating(ctx, rect.width, rect.height)

    let down = false
    let finished = false
    const pos = (e) => {
      const b = canvas.getBoundingClientRect()
      const t = e.touches ? e.touches[0] : e
      return { x: t.clientX - b.left, y: t.clientY - b.top }
    }
    const scratch = (x, y) => {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      ctx.arc(x, y, 22, 0, 7)
      ctx.fill()
    }
    const pct = () => {
      const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      let clear = 0
      for (let i = 3; i < d.length; i += 40) if (d[i] < 128) clear++
      return clear / (d.length / 40)
    }
    const check = () => {
      if (!finished && pct() > 0.5) {
        finished = true
        canvas.style.transition = 'opacity 0.5s ease'
        canvas.style.opacity = '0'
        setRevealed(true)
      }
    }
    const onDown = (e) => {
      down = true
      const { x, y } = pos(e)
      scratch(x, y)
    }
    const onMove = (e) => {
      if (!down) return
      const { x, y } = pos(e)
      scratch(x, y)
    }
    const onUp = () => {
      if (down) {
        down = false
        check()
      }
    }
    canvas.addEventListener('pointerdown', onDown)
    canvas.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      canvas.removeEventListener('pointerdown', onDown)
      canvas.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [open])

  const claim = (e) => {
    e.preventDefault()
    setClaimed(true)
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
      aria-label="Scratch for 20% off your first order"
    >
      <div className="absolute inset-0 bg-black/50 animate-[fadeIn_.3s_ease]" onClick={dismiss} />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-line bg-raised p-8 text-center shadow-lift animate-[popIn_.35s_cubic-bezier(.16,1,.3,1)]">
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-faint transition-colors hover:bg-surface hover:text-bone"
        >
          ✕
        </button>

        {/* logo */}
        <div className="mx-auto mb-5 flex justify-center text-bone">
          <Seal size={58} />
        </div>

        {!claimed ? (
          <>
            <h2 className="font-display text-[1.9rem] leading-tight text-bone">A welcome offer</h2>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-mute">
              {revealed
                ? 'You unlocked your first-order discount.'
                : 'Scratch the panel to reveal your first-order discount.'}
            </p>

            {/* scratch card */}
            <div className="relative mx-auto mt-6 h-40 w-full overflow-hidden rounded-2xl border border-line">
              <div
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{
                  background:
                    'radial-gradient(120% 120% at 50% 0%, rgba(62,90,70,0.10), transparent 60%), #ECE9E0',
                }}
              >
                <div className="font-display text-[2.6rem] leading-none text-accent">20% OFF</div>
                <div className="mt-1 text-sm text-mute">your first order</div>
                <div className="mt-1.5 text-[0.62rem] text-faint">up to $50 · one-time use</div>
              </div>
              <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full"
                style={{ touchAction: 'none', cursor: 'grab' }}
              />
            </div>

            {/* claim flow (appears after scratching) */}
            {revealed &&
              (emailStep ? (
                <form onSubmit={claim} className="mt-5 flex flex-col gap-2.5">
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
                    Claim my code
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setEmailStep(true)}
                  className="mt-5 w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent-2"
                >
                  Claim my 20% →
                </button>
              ))}

            {!revealed && (
              <button
                onClick={dismiss}
                className="mt-4 text-xs text-faint underline-offset-2 transition-colors hover:text-mute hover:underline"
              >
                No thanks, I’ll pay full price
              </button>
            )}
          </>
        ) : (
          <>
            <h2 className="font-display text-[1.9rem] leading-tight text-bone">You’re in.</h2>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-mute">
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
          </>
        )}
      </div>
    </div>
  )
}
