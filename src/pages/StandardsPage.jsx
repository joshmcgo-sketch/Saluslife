import { Link } from 'react-router-dom'
import Seal from '../components/Seal'
import Reveal from '../components/Reveal'
import ProductImage from '../components/ProductImage'
import ProductCard from '../components/ProductCard'
import { TRACKS, PROCESS } from '../data/standards'
import { productsByTrack } from '../data/products'

export default function StandardsPage({ trackId }) {
  const track = TRACKS[trackId]
  const others = Object.values(TRACKS).filter((t) => t.id !== trackId)
  const products = productsByTrack(trackId)
  const count = products.length

  return (
    <>
      {/* Header — short, so the products below are visible immediately */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-accent/[0.06] to-transparent" />
        <div className="relative mx-auto max-w-content px-6 md:px-8 pt-14 pb-8">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="eyebrow">The Standard</span>
              {track.flagship && (
                <span className="rounded-full bg-accent/12 px-2.5 py-1 text-[0.65rem] font-medium text-accent-2">
                  Flagship category
                </span>
              )}
            </div>
            <h1 className="mt-4 max-w-3xl font-display text-[2.4rem] font-medium leading-[1.08] tracking-tight md:text-[3.1rem]">
              {track.name}: {track.tagline}
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Marked products in this track — the first thing you see */}
      <section>
        <div className="mx-auto max-w-content px-6 md:px-8 pb-16">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="eyebrow">
                {count} marked {track.name.toLowerCase()} product{count === 1 ? '' : 's'}
              </div>
              <Link to="/catalog" className="text-sm text-accent-2 hover:text-bone">
                All categories →
              </Link>
            </div>
          </Reveal>

          {products.length > 0 ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 90}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-mute">Nothing has cleared this standard yet.</p>
          )}
        </div>
      </section>

      {/* About this standard */}
      <section className="hairline bg-surface/60">
        <div className="mx-auto max-w-content px-6 md:px-8 py-16">
          <Reveal>
            <div className="eyebrow">About this standard</div>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-mute">{track.lede}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {others.map((o) => (
                <Link
                  key={o.id}
                  to={`/standards/${o.id}`}
                  className="rounded-full border border-line px-5 py-2.5 text-sm text-bone/90 transition-colors hover:border-bone/40"
                >
                  {o.name} standard →
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Rubric */}
      <section className="hairline">
        <div className="mx-auto max-w-content px-6 md:px-8 py-16">
          <Reveal>
            <h2 className="font-display text-[1.7rem] text-bone">The 5-part rubric</h2>
            <p className="mt-3 max-w-xl text-mute">
              Each item is scored independently. A product must clear every one to carry the mark —
              there is no partial credit, and a single fail condition ends the review.
            </p>
          </Reveal>

          <div className="mt-12 space-y-4">
            {track.rubric.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="grid gap-4 rounded-2xl border border-line bg-card p-6 shadow-card md:grid-cols-[auto_1fr] md:p-8">
                  <div className="flex items-start gap-4 md:w-16">
                    <span className="font-display text-3xl text-accent-2">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-bone">{item.title}</h3>
                    <p className="mt-2.5 max-w-2xl text-[0.98rem] leading-relaxed text-mute">
                      {item.summary}
                    </p>
                    <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-line/80 bg-ink/40 px-4 py-3">
                      <span className="mt-0.5 shrink-0 text-[0.62rem] font-semibold uppercase tracking-micro text-fail">
                        Pass bar
                      </span>
                      <p className="text-sm leading-relaxed text-bone/80">{item.passBar}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-surface/60">
        <div className="mx-auto max-w-content px-6 md:px-8 py-16">
          <Reveal>
            <div className="eyebrow">The process</div>
            <h2 className="mt-3 font-display text-[1.7rem] text-bone">Same four steps for every product</h2>
          </Reveal>
          <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, i) => (
              <Reveal key={step.num} delay={i * 90}>
                <div className="font-display text-2xl text-accent-2">{step.num}</div>
                <div className="mt-3 h-px w-10 bg-line" />
                <h4 className="mt-3 text-sm font-semibold text-bone">{step.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-mute">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hairline">
        <div className="mx-auto max-w-content px-6 md:px-8 py-16">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-line bg-gradient-to-br from-raised to-card p-8 md:flex-row md:items-center md:p-10">
              <div className="flex items-center gap-5">
                <div className="hidden shrink-0 sm:block">
                  <ProductImage icon={track.icon} className="h-20 w-20" rounded="rounded-xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Seal size={18} />
                    <span className="text-xs uppercase tracking-micro text-faint">Carries the mark</span>
                  </div>
                  <h3 className="mt-2 font-display text-xl text-bone">
                    See how real products scored against this rubric
                  </h3>
                </div>
              </div>
              <Link
                to="/catalog"
                className="shrink-0 rounded-full bg-bone px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
              >
                Browse the catalog →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
