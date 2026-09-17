import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import ProductImage from '../components/ProductImage'
import Seal from '../components/Seal'
import Reveal from '../components/Reveal'
import { money } from '../lib/format'

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-micro text-faint">{label}</span>
      <input
        {...props}
        className="w-full rounded-xl border border-line bg-card px-4 py-2.5 text-sm text-bone placeholder:text-faint outline-none transition-colors focus:border-accent/60"
      />
    </label>
  )
}

const PROMO = { code: 'SALUS20', rate: 0.2, cap: 50 }

export default function Checkout() {
  const { detailed, subtotal, clear } = useCart()
  const [searchParams] = useSearchParams()
  const stripeSuccess = searchParams.get('success') === 'true'
  const stripeCanceled = searchParams.get('canceled') === 'true'
  const stripeSessionId = searchParams.get('session_id')

  const [placed, setPlaced] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [orderNo] = useState(() => 'SAL-' + Math.floor(100000 + Math.random() * 900000))

  const [codeInput, setCodeInput] = useState('')
  const [applied, setApplied] = useState(false)
  const [codeError, setCodeError] = useState('')

  // A real Stripe payment finished — clear the cart now that it's actually paid for.
  useEffect(() => {
    if (stripeSuccess) {
      clear()
      window.scrollTo({ top: 0 })
    }
  }, [stripeSuccess])

  // Auto-apply the code if it was claimed from the first-visit popup.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('salus-promo-code')
      if (saved && saved.toUpperCase() === PROMO.code) {
        setCodeInput(PROMO.code)
        setApplied(true)
      }
    } catch {
      /* ignore */
    }
  }, [])

  const applyCode = () => {
    if (codeInput.trim().toUpperCase() === PROMO.code) {
      setApplied(true)
      setCodeError('')
    } else {
      setApplied(false)
      setCodeError('That code isn’t recognized.')
    }
  }
  const removeCode = () => {
    setApplied(false)
    setCodeInput('')
    setCodeError('')
  }

  // 20% off, capped at a $50 maximum discount. Tax applies after the discount.
  const discount = applied ? Math.min(Math.round(subtotal * PROMO.rate), PROMO.cap) : 0
  const shipping = subtotal > 250 || subtotal === 0 ? 0 : 25
  const tax = Math.round((subtotal - discount) * 0.0725)
  const total = subtotal - discount + shipping + tax

  // ── Order confirmed state ───────────────────────────────────────────────
  const showConfirmed = placed || stripeSuccess
  const displayOrderNo = stripeSuccess ? stripeSessionId : orderNo

  if (showConfirmed) {
    return (
      <div className="mx-auto max-w-content px-6 md:px-8 py-24 text-center">
        <Reveal>
          <div className="mx-auto mb-6 w-14 text-bone">
            <Seal size={56} />
          </div>
          <h1 className="font-display text-[2rem] text-bone">Order confirmed</h1>
          <p className="mx-auto mt-3 max-w-md text-mute">
            Thank you. A confirmation for order <span className="text-bone">{displayOrderNo}</span> is
            on its way. Every item you bought carries the Salus Life mark.
          </p>
          <p className="mx-auto mt-4 max-w-md text-xs text-faint">
            {stripeSuccess
              ? 'Paid via Stripe checkout, test mode — no real card was charged.'
              : 'This is a demo — no payment was taken and nothing will ship.'}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/catalog"
              className="inline-block rounded-full bg-bone px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
            >
              Back to the catalog
            </Link>
            <Link
              to="/orders"
              className="inline-block rounded-full border border-line px-6 py-3 text-sm text-bone transition-colors hover:border-bone/40"
            >
              Track your order
            </Link>
          </div>
        </Reveal>
      </div>
    )
  }

  // ── Empty cart ──────────────────────────────────────────────────────────
  if (detailed.length === 0) {
    return (
      <div className="mx-auto max-w-content px-6 md:px-8 py-24 text-center">
        <h1 className="font-display text-2xl text-bone">Your cart is empty</h1>
        <p className="mt-3 text-mute">Add a marked product to check out.</p>
        <Link
          to="/catalog"
          className="mt-6 inline-block rounded-full border border-line px-6 py-3 text-sm text-bone transition-colors hover:border-bone/40"
        >
          Browse products
        </Link>
      </div>
    )
  }

  // ── Checkout form + order summary ───────────────────────────────────────
  return (
    <div className="mx-auto max-w-content px-6 md:px-8 py-14">
      <Reveal>
        <div className="flex items-center gap-2 text-sm text-faint">
          <Link to="/catalog" className="hover:text-bone">Catalog</Link>
          <span>/</span>
          <span className="text-mute">Checkout</span>
        </div>
        <h1 className="mt-4 font-display text-[2.2rem] font-medium tracking-tight text-bone">Checkout</h1>
      </Reveal>

      {stripeCanceled && (
        <p className="mt-6 rounded-xl border border-line bg-card px-4 py-3 text-sm text-mute">
          Checkout canceled — your cart is still here whenever you’re ready.
        </p>
      )}

      <form
        onSubmit={async (e) => {
          e.preventDefault()
          setSubmitting(true)
          try {
            const res = await fetch('/api/create-checkout-session', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                items: detailed.map((line) => ({
                  name: line.product.name,
                  price: line.product.price,
                  qty: line.qty,
                })),
              }),
            })
            const data = await res.json()
            if (!res.ok || !data.url) throw new Error(data.error || 'Checkout is unavailable.')
            window.location.href = data.url
          } catch {
            // No checkout API here (e.g. the GitHub Pages mirror, which can't
            // run server code) or the request failed — fall back to the
            // simulated confirmation so checkout never hard-breaks.
            setPlaced(true)
            clear()
            window.scrollTo({ top: 0 })
          } finally {
            setSubmitting(false)
          }
        }}
        className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]"
      >
        {/* Left — details */}
        <div className="space-y-8">
          <section>
            <h2 className="mb-4 font-display text-lg text-bone">Contact</h2>
            <Field label="Email" type="email" required placeholder="you@email.com" />
          </section>

          <section>
            <h2 className="mb-4 font-display text-lg text-bone">Shipping address</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" required placeholder="Alex" />
              <Field label="Last name" required placeholder="Rivera" />
              <div className="sm:col-span-2">
                <Field label="Address" required placeholder="123 Cedar St" />
              </div>
              <Field label="City" required placeholder="Portland" />
              <Field label="ZIP" required placeholder="97201" />
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-display text-lg text-bone">Payment</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Card number" placeholder="4242 4242 4242 4242" inputMode="numeric" />
              </div>
              <Field label="Expiry" placeholder="12 / 28" />
              <Field label="CVC" placeholder="123" inputMode="numeric" />
            </div>
            <p className="mt-3 text-xs text-faint">
              Demo checkout — no real card is processed. Don’t enter real card details.
            </p>
          </section>
        </div>

        {/* Right — order summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-line bg-card p-6 shadow-card">
            <h2 className="font-display text-lg text-bone">Order summary</h2>
            <ul className="mt-5 space-y-4">
              {detailed.map((line) => (
                <li key={line.id} className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <ProductImage icon={line.product.icon} src={line.product.image} alt={line.product.name} className="h-14 w-14" rounded="rounded-lg" />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-raised px-1 text-[0.65rem] text-bone ring-1 ring-line">
                      {line.qty}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm text-bone">{line.product.name}</div>
                    <div className="text-xs text-faint">{line.product.brand}</div>
                  </div>
                  <span className="text-sm tabular-nums text-mute">{money(line.lineTotal)}</span>
                </li>
              ))}
            </ul>

            {/* Discount code */}
            <div className="mt-5 border-t border-line pt-4">
              {applied ? (
                <div className="flex items-center justify-between rounded-xl border border-pass/40 bg-pass/[0.06] px-4 py-2.5">
                  <div className="flex items-center gap-2 text-sm">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3F8F5E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                    <span className="font-medium text-bone">{PROMO.code}</span>
                    <span className="text-mute">applied</span>
                  </div>
                  <button type="button" onClick={removeCode} className="text-xs text-faint transition-colors hover:text-fail">
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2">
                    <input
                      value={codeInput}
                      onChange={(e) => setCodeInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          applyCode()
                        }
                      }}
                      placeholder="Discount code"
                      className="flex-1 rounded-full border border-line bg-card px-4 py-2 text-sm uppercase tracking-wide text-bone placeholder:normal-case placeholder:tracking-normal placeholder:text-faint outline-none transition-colors focus:border-accent/60"
                    />
                    <button
                      type="button"
                      onClick={applyCode}
                      className="shrink-0 rounded-full border border-line px-5 py-2 text-sm text-bone transition-colors hover:border-bone/40"
                    >
                      Apply
                    </button>
                  </div>
                  {codeError && <p className="mt-1.5 text-xs text-fail">{codeError}</p>}
                </div>
              )}
            </div>

            <div className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
              <Row label="Subtotal" value={money(subtotal)} />
              {discount > 0 && (
                <Row label={`Discount (${PROMO.code})`} value={`−${money(discount)}`} accent />
              )}
              <Row label="Shipping" value={shipping === 0 ? 'Free' : money(shipping)} />
              <Row label="Estimated tax" value={money(tax)} />
              <div className="flex items-center justify-between border-t border-line pt-3 text-base">
                <span className="text-bone">Total</span>
                <span className="font-display tabular-nums text-bone">{money(total)}</span>
              </div>
              {discount > 0 && (
                <p className="pt-1 text-[0.7rem] text-faint">
                  20% off your first order, up to a ${PROMO.cap} maximum discount.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent-2 disabled:opacity-60"
            >
              {submitting ? 'Redirecting…' : `Place order · ${money(total)}`}
            </button>
            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-faint">
              <Seal size={13} /> Every item carries the Salus Life mark
            </div>
          </div>

          {/* Independence note — certify-and-sell */}
          <div className="mt-4 rounded-2xl border border-line bg-card/60 p-5">
            <div className="flex items-center gap-2">
              <Seal size={16} />
              <span className="text-xs uppercase tracking-micro text-faint">Why you can trust this</span>
            </div>
            <p className="mt-3 text-[0.82rem] leading-relaxed text-mute">
              A product’s verdict is decided before it is ever offered for sale, and brands pay
              nothing to be certified. We don’t take sponsorships or sell placement, and selling a
              product can’t change or upgrade its score — a fail stays a fail. Every verdict is
              published in full so you can check our reasoning yourself.
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

function Row({ label, value, accent }) {
  return (
    <div className="flex items-center justify-between">
      <span className={accent ? 'text-pass' : 'text-mute'}>{label}</span>
      <span className={`tabular-nums ${accent ? 'text-pass' : 'text-bone/90'}`}>{value}</span>
    </div>
  )
}
