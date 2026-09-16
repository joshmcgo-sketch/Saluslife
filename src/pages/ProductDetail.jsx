import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Seal from '../components/Seal'
import Reveal from '../components/Reveal'
import ScoreRing from '../components/ScoreRing'
import ProductImage from '../components/ProductImage'
import ReferenceCard from '../components/ReferenceCard'
import ProductReviews from '../components/ProductReviews'
import QtyStepper from '../components/QtyStepper'
import { getProduct, productsByTrack } from '../data/products'
import { TRACKS } from '../data/standards'
import { scoreBand } from '../lib/score'
import { money } from '../lib/format'
import { useCart } from '../context/CartContext'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { add, openCart } = useCart()
  const [qty, setQty] = useState(1)
  const product = getProduct(id)

  if (!product) {
    return (
      <div className="mx-auto max-w-content px-6 py-32 text-center">
        <h1 className="font-display text-2xl text-bone">Product not found</h1>
        <Link to="/catalog" className="mt-4 inline-block text-accent-2 hover:text-bone">
          ← Back to the catalog
        </Link>
      </div>
    )
  }

  const track = TRACKS[product.track]
  const related = productsByTrack(product.track)
    .filter((p) => p.id !== product.id)
    .slice(0, 3)

  return (
    <article>
      {/* Breadcrumb + header */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-accent/[0.06] to-transparent" />
        <div className="relative mx-auto max-w-content px-6 md:px-8 pt-10">
          <Reveal>
            <div className="flex items-center gap-2 text-sm text-faint">
              <Link to="/catalog" className="hover:text-bone">Marked products</Link>
              <span>/</span>
              <Link to={`/standards/${track.id}`} className="hover:text-bone">{track.name}</Link>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="mt-6 flex flex-col gap-6 border-b border-line pb-10 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-[0.72rem] uppercase tracking-micro text-faint">{product.category}</div>
                <h1 className="mt-2 font-display text-[2.2rem] font-medium leading-tight tracking-tight text-bone md:text-[2.8rem]">
                  {product.name}
                </h1>
                <div className="mt-2 text-lg text-mute">{product.brand}</div>
                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5">
                    <Seal size={16} />
                    <span className="text-sm text-bone">Verified</span>
                    <span className="text-sm text-faint">· {product.testDate}</span>
                  </span>
                  <span className="text-sm text-mute">
                    Salus Life verdict:{' '}
                    <span className="font-medium text-pass">Pass</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-[0.72rem] uppercase tracking-micro text-faint">Salus Life score</div>
                  <div className="mt-1 text-sm text-mute">{scoreBand(product.score)}</div>
                </div>
                <ScoreRing score={product.score} size={88} stroke={6} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Side-by-side: sticky image (left) + scrolling verdict & reference (right) */}
      <section className="mx-auto max-w-content px-6 md:px-8 py-14">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          {/* LEFT — product image, sticky on desktop */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductImage icon={product.icon} src={product.image} alt={product.name} className="aspect-square w-full" />

            {/* Purchase */}
            <div className="mt-4 rounded-2xl border border-line bg-card p-5 shadow-card">
              <div className="flex items-end justify-between">
                <div>
                  <div className="font-display text-2xl text-bone">{money(product.price)}</div>
                  <div className="mt-0.5 text-xs text-faint">{product.priceNote}</div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-pass/12 px-2.5 py-1 text-[0.68rem] font-medium text-pass">
                  <span className="h-1.5 w-1.5 rounded-full bg-pass" /> In stock
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-mute">Quantity</span>
                <QtyStepper qty={qty} onChange={(q) => setQty(Math.max(1, q))} />
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <button
                  onClick={() => {
                    add(product.id, qty)
                    navigate('/checkout')
                  }}
                  className="w-full rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent-2"
                >
                  Buy now
                </button>
                <button
                  onClick={() => {
                    add(product.id, qty)
                    openCart()
                  }}
                  className="w-full rounded-full border border-line px-6 py-3 text-sm font-medium text-bone transition-colors hover:border-bone/40"
                >
                  Add to cart · {money(product.price * qty)}
                </button>
              </div>

              <div className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-xs text-faint">
                <Seal size={14} />
                Verified by Salus Life · free returns
              </div>
            </div>

            <p className="mt-3 px-1 text-sm leading-relaxed text-mute">{product.blurb}</p>
            <p className="mt-2 px-1 text-xs text-faint">
              Placeholder product · fabricated demo data · no real payment is taken.
            </p>
          </div>

          {/* RIGHT — scrolls past the sticky image */}
          <div className="space-y-12">
            {/* Why it passed */}
            <Reveal>
              <div className="eyebrow">Why it passed</div>
              <p className="mt-4 font-display text-[1.25rem] leading-[1.6] text-bone/95">
                {product.whyPassed}
              </p>
            </Reveal>

            {/* Rubric breakdown */}
            <div>
              <Reveal>
                <div className="eyebrow">Scored against the {track.name} rubric</div>
              </Reveal>
              <div className="mt-5 space-y-3">
                {track.rubric.map((item, i) => (
                  <Reveal key={item.title} delay={i * 60}>
                    <div className="rounded-2xl border border-line bg-card p-5 shadow-card">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <span className="font-display text-lg text-faint">{String(i + 1).padStart(2, '0')}</span>
                          <h3 className="text-[1.02rem] font-semibold text-bone">{item.title}</h3>
                        </div>
                        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-pass/12 px-2.5 py-1 text-[0.68rem] font-medium text-pass">
                          <span className="h-1.5 w-1.5 rounded-full bg-pass" />
                          Pass
                        </span>
                      </div>
                      <p className="mt-3 pl-8 text-[0.95rem] leading-relaxed text-mute">
                        {product.findings[i]}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Oasis-style independent reference */}
            <div>
              <Reveal>
                <div className="flex items-center justify-between">
                  <div className="eyebrow">Independent scoring reference</div>
                  <span className="text-[0.68rem] text-faint">Oasis-style</span>
                </div>
                <p className="mt-3 mb-5 max-w-md text-sm leading-relaxed text-mute">
                  Salus Life’s verdict sits alongside independent lab science. This reference profile is
                  illustrative demo data, styled after a third-party lab report — not a claimed
                  partnership.
                </p>
              </Reveal>
              <Reveal delay={80}>
                <ReferenceCard reference={product.reference} productName={product.name} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Customer reviews */}
      <section className="hairline">
        <div className="mx-auto max-w-content px-6 md:px-8 py-16">
          <Reveal>
            <div className="eyebrow">Customer reviews</div>
            <h2 className="mt-3 font-display text-xl text-bone">What buyers say about {product.name}</h2>
          </Reveal>
          <div className="mt-8">
            <ProductReviews productId={product.id} />
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="hairline">
          <div className="mx-auto max-w-content px-6 md:px-8 py-16">
            <Reveal>
              <div className="flex items-end justify-between">
                <h2 className="font-display text-xl text-bone">More marked {track.name.toLowerCase()}</h2>
                <Link to="/catalog" className="text-sm text-accent-2 hover:text-bone">All products →</Link>
              </div>
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 90}>
                  <Link
                    to={`/product/${p.id}`}
                    className="group flex items-center gap-4 rounded-2xl border border-line bg-card p-4 shadow-card transition-all duration-150 hover:-translate-y-1 hover:shadow-lift"
                  >
                    <ProductImage icon={p.icon} src={p.image} alt={p.name} className="h-16 w-16 shrink-0" rounded="rounded-xl" />
                    <div className="min-w-0">
                      <div className="text-[0.65rem] uppercase tracking-micro text-faint">{p.category}</div>
                      <div className="truncate font-display text-[1rem] text-bone">{p.name}</div>
                      <div className="mt-0.5 flex items-center gap-1.5 text-xs text-mute">
                        <Seal size={11} /> Verified · {p.score}/100
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
