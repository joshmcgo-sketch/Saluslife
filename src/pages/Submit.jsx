import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Seal from '../components/Seal'
import { GROUP_META } from '../data/products'

function Field({ label, textarea, ...props }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-micro text-faint">{label}</span>
      <Tag
        {...props}
        className={`w-full rounded-xl border border-line bg-card px-4 py-2.5 text-sm text-bone placeholder:text-faint outline-none transition-colors focus:border-accent/60 ${
          textarea ? 'min-h-[110px] resize-y' : ''
        }`}
      />
    </label>
  )
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

export default function Submit() {
  const [category, setCategory] = useState(null)
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [description, setDescription] = useState('')
  const [tested, setTested] = useState(null) // 'yes' | 'no' | null
  const [summary, setSummary] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [refNo] = useState(() => 'SUB-' + Math.floor(100000 + Math.random() * 900000))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!category) return setError('Choose a category for your product.')
    if (!name.trim()) return setError('Enter your name.')
    if (!company.trim()) return setError('Enter your company.')
    if (!description.trim()) return setError('Describe the item.')
    if (!tested) return setError('Let us know if it’s been third-party tested.')
    setError('')
    setSubmitted(true)
    window.scrollTo({ top: 0 })
  }

  // ── Submitted state ─────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="mx-auto max-w-content px-6 md:px-8 py-24 text-center">
        <Reveal>
          <div className="mx-auto mb-6 w-14 text-bone">
            <Seal size={56} />
          </div>
          <h1 className="font-display text-[2rem] text-bone">Submission received</h1>
          <p className="mx-auto mt-3 max-w-md text-mute">
            Thanks — reference <span className="text-bone">{refNo}</span> is in the review queue.
            We independently verify every submission against the right standard before any verdict
            is issued.
          </p>
          <p className="mx-auto mt-4 max-w-md text-xs text-faint">
            This is a demo — nothing was actually sent or reviewed.
          </p>
          <Link
            to="/catalog"
            className="mt-8 inline-block rounded-full bg-bone px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
          >
            Back to the catalog
          </Link>
        </Reveal>
      </div>
    )
  }

  // ── Submission form ─────────────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-content px-6 md:px-8 py-16">
      <Reveal>
        <div className="eyebrow">Submit a product</div>
        <h1 className="mt-3 font-display text-[2.2rem] font-medium tracking-tight text-bone">
          Nominate a product for review
        </h1>
        <p className="mt-3 max-w-lg text-mute">
          Submissions are free — there’s no fee to be considered, and no guarantee of a pass.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <form onSubmit={handleSubmit} className="mt-10 max-w-xl space-y-8">
          <div>
            <span className="mb-2.5 block text-xs uppercase tracking-micro text-faint">Category</span>
            <div className="flex flex-wrap gap-2">
              {GROUP_META.map((g) => (
                <Pill key={g.id} active={category === g.id} onClick={() => setCategory(g.id)}>
                  {g.label}
                </Pill>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Rivera"
            />
            <Field
              label="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Cedar & Stone Co."
            />
          </div>

          <Field
            label="Item description"
            textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What is it, what does it claim, and why should it clear the bar?"
          />

          <div>
            <span className="mb-2.5 block text-xs uppercase tracking-micro text-faint">
              Has it been third-party tested?
            </span>
            <div className="flex gap-2">
              <Pill active={tested === 'yes'} onClick={() => setTested('yes')}>
                Yes
              </Pill>
              <Pill active={tested === 'no'} onClick={() => setTested('no')}>
                No
              </Pill>
            </div>
          </div>

          {tested === 'yes' && (
            <Field
              label="Testing summary"
              textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Who tested it, what was measured, and what came back?"
            />
          )}

          {error && <p className="text-sm text-fail">{error}</p>}

          <button
            type="submit"
            className="rounded-full bg-accent px-7 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent-2"
          >
            Submit for review
          </button>
        </form>
      </Reveal>
    </div>
  )
}
