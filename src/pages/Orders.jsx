import { useState } from 'react'
import Reveal from '../components/Reveal'
import Seal from '../components/Seal'

const CARRIERS = ['Meridian Parcel', 'Northbound Courier', 'Basis Logistics']
const STEPS = ['Order placed', 'Processing', 'Shipped', 'Out for delivery', 'Delivered']
const RETURN_REASONS = ['Doesn’t fit', 'Damaged or defective', 'Changed my mind', 'Other']

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

function Pill({ active, children, ...props }) {
  return (
    <button
      type="button"
      {...props}
      className={`rounded-full px-5 py-2 text-sm transition-colors ${
        active ? 'bg-bone text-ink' : 'border border-line text-mute hover:border-bone/30 hover:text-bone'
      }`}
    >
      {children}
    </button>
  )
}

function Field({ label, textarea, ...props }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-micro text-faint">{label}</span>
      <Tag
        {...props}
        className={`w-full rounded-xl border border-line bg-card px-4 py-2.5 text-sm text-bone placeholder:text-faint outline-none transition-colors focus:border-accent/60 ${
          textarea ? 'min-h-[100px] resize-y' : ''
        }`}
      />
    </label>
  )
}

const TABS = [
  { id: 'track', label: 'Track a shipment' },
  { id: 'return', label: 'Return an item' },
  { id: 'feedback', label: 'Comment or complaint' },
]

export default function Orders() {
  const [tab, setTab] = useState('track')

  return (
    <div className="mx-auto max-w-content px-6 md:px-8 py-16">
      <Reveal>
        <div className="eyebrow">My Orders</div>
        <h1 className="mt-3 font-display text-[2.2rem] font-medium tracking-tight text-bone">
          {tab === 'track' && 'Track your shipment'}
          {tab === 'return' && 'Start a return'}
          {tab === 'feedback' && 'Leave a comment or complaint'}
        </h1>
        <p className="mt-3 max-w-lg text-mute">
          {tab === 'track' && 'Enter the tracking number from your order confirmation to see where it is.'}
          {tab === 'return' && 'Tell us what you’re sending back and why, and we’ll email a return label.'}
          {tab === 'feedback' && 'Something wrong, or just something to say? We read every message.'}
        </p>
      </Reveal>

      <Reveal delay={60}>
        <div className="mt-8 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <Pill key={t.id} active={tab === t.id} onClick={() => setTab(t.id)}>
              {t.label}
            </Pill>
          ))}
        </div>
      </Reveal>

      <div className="mt-8">
        {tab === 'track' && <TrackPanel />}
        {tab === 'return' && <ReturnPanel />}
        {tab === 'feedback' && <FeedbackPanel />}
      </div>

      <div className="mt-10 flex items-center gap-1.5 text-xs text-faint">
        <Seal size={13} /> Every item shipped carries the Salus Life mark
      </div>
    </div>
  )
}

function TrackPanel() {
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
    <>
      <form onSubmit={handleSubmit} className="max-w-md">
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

      {result && (
        <Reveal delay={80}>
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
    </>
  )
}

function ReturnPanel() {
  const [orderNo, setOrderNo] = useState('')
  const [item, setItem] = useState('')
  const [reason, setReason] = useState(null)
  const [details, setDetails] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [refNo] = useState(() => 'RET-' + Math.floor(100000 + Math.random() * 900000))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!orderNo.trim()) return setError('Enter your order or tracking number.')
    if (!reason) return setError('Choose a reason for the return.')
    setError('')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Reveal>
        <div className="max-w-md rounded-2xl border border-line bg-card p-6 shadow-card sm:p-8">
          <h2 className="font-display text-lg text-bone">Return requested</h2>
          <p className="mt-2 text-sm text-mute">
            Reference <span className="text-bone">{refNo}</span>. We’ll email a prepaid return label
            within one business day.
          </p>
          <p className="mt-3 text-xs text-faint">This is a demo — no label will actually be sent.</p>
        </div>
      </Reveal>
    )
  }

  return (
    <Reveal>
      <form onSubmit={handleSubmit} className="max-w-md space-y-6">
        <Field
          label="Order or tracking number"
          value={orderNo}
          onChange={(e) => setOrderNo(e.target.value)}
          placeholder="e.g. SAL-482913"
        />
        <Field
          label="Item (optional)"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="What are you sending back?"
        />
        <div>
          <span className="mb-2.5 block text-xs uppercase tracking-micro text-faint">Reason</span>
          <div className="flex flex-wrap gap-2">
            {RETURN_REASONS.map((r) => (
              <Pill key={r} active={reason === r} onClick={() => setReason(r)}>
                {r}
              </Pill>
            ))}
          </div>
        </div>
        <Field
          label="Details (optional)"
          textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Anything else we should know?"
        />
        <Field
          label="Email (optional)"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
        />
        {error && <p className="text-sm text-fail">{error}</p>}
        <button
          type="submit"
          className="rounded-full bg-accent px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent-2"
        >
          Request return
        </button>
      </form>
    </Reveal>
  )
}

function FeedbackPanel() {
  const [type, setType] = useState('comment') // 'comment' | 'complaint'
  const [orderNo, setOrderNo] = useState('')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [refNo] = useState(() => 'MSG-' + Math.floor(100000 + Math.random() * 900000))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message.trim()) return setError('Enter a message before sending.')
    setError('')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Reveal>
        <div className="max-w-md rounded-2xl border border-line bg-card p-6 shadow-card sm:p-8">
          <h2 className="font-display text-lg text-bone">
            {type === 'complaint' ? 'Complaint received' : 'Comment received'}
          </h2>
          <p className="mt-2 text-sm text-mute">
            Reference <span className="text-bone">{refNo}</span>. Someone on the team reads every
            message that comes in.
          </p>
          <p className="mt-3 text-xs text-faint">This is a demo — no message was actually sent.</p>
        </div>
      </Reveal>
    )
  }

  return (
    <Reveal>
      <form onSubmit={handleSubmit} className="max-w-md space-y-6">
        <div>
          <span className="mb-2.5 block text-xs uppercase tracking-micro text-faint">Type</span>
          <div className="flex gap-2">
            <Pill active={type === 'comment'} onClick={() => setType('comment')}>
              Comment
            </Pill>
            <Pill active={type === 'complaint'} onClick={() => setType('complaint')}>
              Complaint
            </Pill>
          </div>
        </div>
        <Field
          label="Order or tracking number (optional)"
          value={orderNo}
          onChange={(e) => setOrderNo(e.target.value)}
          placeholder="e.g. SAL-482913"
        />
        <Field
          label="Message"
          textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={type === 'complaint' ? 'What went wrong?' : 'What’s on your mind?'}
        />
        <Field
          label="Email (optional)"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
        />
        {error && <p className="text-sm text-fail">{error}</p>}
        <button
          type="submit"
          className="rounded-full bg-accent px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent-2"
        >
          Send {type === 'complaint' ? 'complaint' : 'comment'}
        </button>
      </form>
    </Reveal>
  )
}
