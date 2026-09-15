import { useState } from 'react'
import Reveal from '../components/Reveal'
import Seal from '../components/Seal'

const CARRIERS = ['Meridian Parcel', 'Northbound Courier', 'Basis Logistics']
const STEPS = ['Order placed', 'Processing', 'Shipped', 'Out for delivery', 'Delivered']

// Simple deterministic hash so the same tracking number always resolves to
// the same simulated status — there's no real order backend behind this demo.
function hashCode(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0
  }
  return h
}

function trackShipment(raw) {
  const code = raw.trim().toUpperCase()
  const h = hashCode(code)
  const carrier = CARRIERS[h % CARRIERS.length]
  const currentStep = h % STEPS.length
  const today = new Date()

  const steps = STEPS.map((label, i) => {
    if (i > currentStep) return { label, date: null, done: false }
    const date = new Date(today)
    date.setDate(date.getDate() - (currentStep - i))
    return { label, date, done: true }
  })

  const delivered = currentStep === STEPS.length - 1
  let estimatedDelivery = null
  if (!delivered) {
    estimatedDelivery = new Date(today)
    estimatedDelivery.setDate(estimatedDelivery.getDate() + (STEPS.length - 1 - currentStep))
  }

  return { code, carrier, currentStep, steps, delivered, estimatedDelivery }
}

function fmtDate(d) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function Orders() {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (trimmed.length < 4) {
      setError('Enter a valid tracking number to look it up.')
      setResult(null)
      return
    }
    setError('')
    setResult(trackShipment(trimmed))
  }

  return (
    <div className="mx-auto max-w-content px-6 md:px-8 py-16">
      <Reveal>
        <div className="eyebrow">My Orders</div>
        <h1 className="mt-3 font-display text-[2.2rem] font-medium tracking-tight text-bone">
          Track your shipment
        </h1>
        <p className="mt-3 max-w-lg text-mute">
          Enter the tracking number from your order confirmation to see where it is.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <form onSubmit={handleSubmit} className="mt-8 max-w-md">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. SAL-482913"
              className="flex-1 rounded-full border border-line bg-card px-4 py-2.5 text-sm text-bone placeholder:text-faint outline-none transition-colors focus:border-accent/60"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-accent-2"
            >
              Track
            </button>
          </div>
          {error && <p className="mt-2 text-xs text-fail">{error}</p>}
        </form>
      </Reveal>

      {result && (
        <Reveal delay={120}>
          <div className="mt-10 max-w-2xl rounded-2xl border border-line bg-card p-6 shadow-card sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-micro text-faint">Tracking number</div>
                <div className="mt-1 font-display text-lg text-bone">{result.code}</div>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-micro text-faint">Carrier</div>
                <div className="mt-1 text-sm text-bone">{result.carrier}</div>
              </div>
            </div>

            <div className="mt-4 text-sm">
              {result.delivered ? (
                <span className="text-pass">
                  Delivered {fmtDate(result.steps[result.steps.length - 1].date)}
                </span>
              ) : (
                <span className="text-watch">Estimated delivery {fmtDate(result.estimatedDelivery)}</span>
              )}
            </div>

            <div className="relative mt-8">
              <div className="pointer-events-none absolute bottom-2 left-2.5 top-2 w-px bg-line" />
              <div className="space-y-6">
                {result.steps.map((step, i) => {
                  const isCurrent = i === result.currentStep
                  const activeNotDelivered = isCurrent && !result.delivered
                  return (
                    <div key={step.label} className="relative flex items-start gap-3">
                      <span
                        className={`relative z-10 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-card ${
                          step.done
                            ? activeNotDelivered
                              ? 'text-watch ring-1 ring-watch/50'
                              : 'text-pass ring-1 ring-pass/50'
                            : 'text-faint ring-1 ring-line'
                        }`}
                      >
                        {step.done ? (
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full bg-line" />
                        )}
                      </span>
                      <div className="min-w-0 flex-1 pb-0.5">
                        <div className={`text-sm ${step.done ? 'text-bone' : 'text-faint'}`}>{step.label}</div>
                        {step.date && <div className="text-xs text-faint">{fmtDate(step.date)}</div>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Reveal>
      )}

      <p className="mt-10 max-w-lg text-xs text-faint">
        This is a demo — tracking data is simulated and no real shipment is being queried. Order
        numbers look like <span className="text-mute">SAL-XXXXXX</span> and are shown after checkout.
      </p>

      <div className="mt-6 flex items-center gap-1.5 text-xs text-faint">
        <Seal size={13} /> Every item shipped carries the Salus Life mark
      </div>
    </div>
  )
}
