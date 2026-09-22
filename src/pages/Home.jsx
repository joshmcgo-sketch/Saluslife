import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import Seal from '../components/Seal'
import Reveal from '../components/Reveal'
import ProductCard from '../components/ProductCard'
import ProductImage from '../components/ProductImage'
import ScoreRing from '../components/ScoreRing'
import Marquee from '../components/Marquee'
import WaitlistModal from '../components/WaitlistModal'
import { useInView } from '../lib/hooks'
import { STATUS } from '../lib/score'
import { PROCESS, TRACKS } from '../data/standards'
import { PRODUCTS } from '../data/products'

// Full-field hero: several faded rows of product cut-outs drifting slowly at
// slightly different speeds, alternating direction. Each row's content is
// duplicated so the -50% keyframe loops seamlessly (no stop/reset).
const rotate = (arr, n) => arr.slice(n).concat(arr.slice(0, n))
const FIELD = [
  { dir: 'left', dur: 82, items: rotate(PRODUCTS, 0).slice(0, 12) },
  { dir: 'right', dur: 96, items: rotate(PRODUCTS, 4).slice(0, 12) },
  { dir: 'left', dur: 74, items: rotate(PRODUCTS, 8).slice(0, 12) },
  { dir: 'right', dur: 104, items: rotate(PRODUCTS, 12).slice(0, 12) },
  { dir: 'left', dur: 88, items: rotate(PRODUCTS, 16).slice(0, 12) },
  { dir: 'right', dur: 78, items: rotate(PRODUCTS, 20).slice(0, 12) },
]

function GalleryRow({ items, dir, dur }) {
  return (
    <div className={`hero-row ${dir}`} aria-hidden="true" style={{ animationDuration: `${dur}s` }}>
      {[0, 1].map((dup) => (
        <div key={dup} className="flex shrink-0 items-center">
          {items.map((p) => (
            <img
              key={`${dup}-${p.id}`}
              src={p.image}
              alt=""
              loading="lazy"
              className="mx-4 h-20 w-24 shrink-0 object-contain opacity-50 sm:h-24 sm:w-28 md:h-28 md:w-36 lg:h-32 lg:w-40"
              style={{ filter: 'drop-shadow(0 10px 12px rgba(28,30,25,0.12))' }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

// Scroll-expand intro: opens on a dark green backdrop with the SALUS LIFE
// wordmark + "Most products don't clear the bar." over a small framed window of
// the scrolling product field; scrolling expands the window to full screen and
// reveals the landing, finishing with "These did." Landing page only.
function Hero() {
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const trackRef = useRef(null)
  const frameRef = useRef(null)
  const innerRef = useRef(null)
  const brandRef = useRef(null)
  const titleRef = useRef(null)
  const overlayRef = useRef(null)
  const hintRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v)
    const smooth = (a, b, x) => {
      const t = clamp((x - a) / (b - a || 1e-6), 0, 1)
      return t * t * (3 - 2 * t)
    }
    const SW = 42,
      SH = 58,
      SR = 26,
      ZOOM = 1.15,
      DIST = 1.2
    let current = 0,
      target = 0,
      raf = 0

    const apply = (p) => {
      const e = smooth(0, 1, p)
      const w = SW + (100 - SW) * e
      const h = SH + (100 - SH) * e
      const ix = Math.max(0, (100 - w) / 2)
      const iy = Math.max(0, (100 - h) / 2)
      const r = SR + (0 - SR) * e
      if (frameRef.current) {
        frameRef.current.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`
        frameRef.current.style.boxShadow = `0 40px 80px -30px rgba(0,0,0,${0.5 * (1 - e)})`
      }
      if (innerRef.current) innerRef.current.style.transform = `scale(${ZOOM + (1 - ZOOM) * e})`
      const out = smooth(0.35, 0.82, p)
      if (titleRef.current) {
        titleRef.current.style.opacity = `${1 - out}`
        titleRef.current.style.transform = `translateY(${-26 * out}px) scale(${1 + 0.05 * out})`
      }
      const inn = smooth(0.62, 1, p)
      if (overlayRef.current) {
        overlayRef.current.style.opacity = `${inn}`
        overlayRef.current.style.transform = `translateY(${18 * (1 - inn)}px)`
        overlayRef.current.style.pointerEvents = inn > 0.5 ? 'auto' : 'none'
      }
      if (hintRef.current) hintRef.current.style.opacity = `${1 - smooth(0, 0.14, p)}`
      if (brandRef.current) {
        const bf = smooth(0, 0.22, p)
        brandRef.current.style.opacity = `${1 - bf}`
        brandRef.current.style.transform = `translateY(${-10 * bf}px)`
      }
    }
    const read = () => clamp(-track.getBoundingClientRect().top / (window.innerHeight * DIST), 0, 1)
    const tick = () => {
      current += (target - current) * 0.12
      if (Math.abs(target - current) < 0.0005) current = target
      apply(current)
      raf = current !== target ? requestAnimationFrame(tick) : 0
    }
    const onScroll = () => {
      target = read()
      if (reduce) {
        current = target
        apply(current)
        return
      }
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onResize = () => {
      target = read()
      current = target
      apply(current)
    }
    target = read()
    current = target
    apply(current)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // Clicking the window opens it (smooth-scrolls to the fully-expanded point).
  const openByClick = () =>
    window.scrollTo({ top: window.innerHeight * 1.25, behavior: 'smooth' })

  return (
    <>
      <section ref={trackRef} className="relative -mt-16 h-[250vh]">
        <div
          className="sticky top-0 grid h-screen place-items-center overflow-hidden"
          style={{ background: 'radial-gradient(120% 100% at 50% 0%, #33472f, #0f1710 70%)' }}
        >
          {/* crest + wordmark above the box */}
          <div
            ref={brandRef}
            className="pointer-events-none absolute left-0 right-0 top-[7%] z-[4] flex flex-col items-center gap-2.5 text-ink/95"
          >
            <Seal size={48} />
            <span
              className="font-display text-[clamp(1.4rem,3.2vw,2.2rem)] font-semibold tracking-[0.34em]"
              style={{ paddingLeft: '0.34em' }}
            >
              SALUS&nbsp;LIFE
            </span>
          </div>

          {/* expanding frame */}
          <div
            ref={frameRef}
            onClick={openByClick}
            className="absolute inset-0 cursor-pointer overflow-hidden bg-ink"
            style={{
              clipPath: 'inset(21% 29% 21% 29% round 26px)',
              boxShadow: '0 40px 80px -30px rgba(0,0,0,0.5)',
            }}
          >
            {/* scrolling product field */}
            <div ref={innerRef} className="absolute inset-0" style={{ transform: 'scale(1.15)', transformOrigin: 'center' }}>
              <div className="absolute inset-0 flex flex-col justify-around py-1.5">
                {FIELD.map((r, i) => (
                  <GalleryRow key={i} items={r.items} dir={r.dir} dur={r.dur} />
                ))}
              </div>
            </div>

            {/* intro line (fades out) */}
            <div
              ref={titleRef}
              className="absolute inset-0 z-[2] grid place-items-center"
              style={{
                background:
                  'radial-gradient(42% 46% at 50% 50%, rgba(236,233,224,0.94), rgba(236,233,224,0.55) 55%, rgba(236,233,224,0))',
              }}
            >
              <span className="max-w-[11em] px-[6vw] text-center font-display text-[clamp(1.6rem,3.2vw,2.9rem)] font-medium leading-[1.02] tracking-[-0.02em] text-bone">
                Most products don’t clear the bar.
              </span>
            </div>

            {/* revealed landing (fades in) */}
            <div
              ref={overlayRef}
              className="absolute inset-0 z-[3] flex flex-col items-center justify-center px-6 text-center opacity-0"
              style={{
                background:
                  'radial-gradient(46% 52% at 50% 50%, rgba(236,233,224,0.95), rgba(236,233,224,0.66) 52%, rgba(236,233,224,0.05))',
              }}
            >
              <div className="mb-4 flex justify-center text-bone">
                <Seal size={64} />
              </div>
              <h1 className="font-display text-[clamp(2.6rem,7vw,5.4rem)] font-medium italic leading-none tracking-[-0.02em] text-accent">
                These did.
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-lg font-medium leading-relaxed text-bone/90">
                A standard, and the small number of products rigorous enough to meet it. No
                sponsorships, no pay-to-list.
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setWaitlistOpen(true)
                }}
                className="mx-auto mt-6 block rounded-full bg-accent px-8 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-accent-2"
              >
                Join the waitlist
              </button>
            </div>
          </div>

          {/* scroll hint on the dark backdrop */}
          <div
            ref={hintRef}
            className="pointer-events-none absolute bottom-[6%] left-0 right-0 z-[4] text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink/85"
          >
            Scroll or tap to open
          </div>
        </div>
      </section>
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </>
  )
}

// Scroll-driven dissection: sticky product on the left, its lab internals and
// rubric reveal line-by-line on the right, and a PASS stamp lands on the image
// once the verdict scrolls into view.
function AnatomyOfAPass() {
  const product = PRODUCTS.find((p) => p.id === 'aurora-infrared-sauna')
  const track = TRACKS[product.track]
  const [verdictRef, verdictIn] = useInView({ threshold: 0.55 })
  const firstLine = product.whyPassed.split('. ')[0] + '.'

  const darkChip = 'rgba(28,30,25,0.74)'

  return (
    <section className="border-t border-line bg-surface/40">
      <div className="mx-auto max-w-content px-6 md:px-8 py-24 md:py-28">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className="font-display text-sm text-faint">01</span>
            <span className="text-[0.72rem] font-medium uppercase tracking-micro text-faint">
              Anatomy of a pass
            </span>
          </div>
          <h2 className="mt-4 max-w-2xl font-display text-[2rem] leading-[1.05] tracking-tight md:text-[2.7rem]">
            Scroll one verdict, top to bottom.
          </h2>
          <p className="mt-4 max-w-xl text-mute">
            A single certified product, opened up — the independent lab profile, every rubric point,
            and the binary verdict at the end. Nothing summarized, nothing hidden.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Sticky product */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative overflow-hidden rounded-3xl border border-line shadow-card">
              <ProductImage
                icon={product.icon}
                src={product.image}
                alt={product.name}
                className="aspect-[4/5] w-full"
                rounded="rounded-none"
              />
              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
                <div
                  className="rounded-xl px-3.5 py-2 backdrop-blur-sm"
                  style={{ background: darkChip }}
                >
                  <div className="text-[0.58rem] uppercase tracking-micro text-white/60">
                    {product.category}
                  </div>
                  <div className="text-sm font-medium text-white">{product.name}</div>
                  <div className="text-xs text-white/60">{product.brand}</div>
                </div>
              </div>

              {/* PASS stamp — lands when the verdict scrolls in */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div
                  className="transition-all duration-700 ease-out"
                  style={{
                    opacity: verdictIn ? 1 : 0,
                    transform: `scale(${verdictIn ? 1 : 1.35}) rotate(-9deg)`,
                  }}
                >
                  <div
                    className="flex flex-col items-center rounded-2xl border-2 px-9 py-5 backdrop-blur-sm"
                    style={{ background: 'rgba(28,30,25,0.8)', borderColor: 'rgba(63,143,94,0.85)' }}
                  >
                    <Seal size={28} className="text-pass" />
                    <div className="mt-2 font-display text-[2rem] leading-none tracking-[0.08em] text-pass">
                      PASS
                    </div>
                    <div className="mt-1.5 text-xs text-white/70">
                      {product.score} / 100 · {product.testDate}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Revealing internals */}
          <div>
            <Reveal>
              <div className="text-[0.72rem] font-medium uppercase tracking-micro text-faint">
                Independent lab profile
              </div>
              <p className="mt-1.5 text-sm text-mute">What the testing actually found inside it.</p>
            </Reveal>
            <div className="mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
              {product.reference.items.map((item, i) => {
                const s = STATUS[item.status]
                return (
                  <Reveal key={item.label} delay={i * 40}>
                    <div className="flex items-center justify-between gap-4 px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                        <span className="text-[0.95rem] text-bone">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm tabular-nums text-mute">{item.value}</span>
                        <span
                          className="rounded-full px-2 py-0.5 text-[0.65rem] font-medium"
                          style={{ color: s.color, background: `${s.color}1A` }}
                        >
                          {s.label}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>

            <Reveal>
              <div className="mb-5 mt-12 text-[0.72rem] font-medium uppercase tracking-micro text-faint">
                Every rubric point, cleared
              </div>
            </Reveal>
            <div className="space-y-3">
              {track.rubric.map((item, i) => (
                <Reveal key={item.title} delay={i * 40}>
                  <div className="flex items-start gap-3.5 rounded-xl border border-line bg-card px-5 py-4">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pass/15">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#3F8F5E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <div>
                      <div className="text-[0.95rem] font-medium text-bone">{item.title}</div>
                      <div className="mt-1 text-sm leading-relaxed text-mute">{product.findings[i]}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Verdict */}
            <div ref={verdictRef} className="mt-12 rounded-2xl border border-pass/40 bg-pass/[0.07] p-7">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-[0.72rem] font-medium uppercase tracking-micro text-pass">Verdict</div>
                  <div className="mt-2 font-display text-2xl text-bone">Cleared all five. Mark issued.</div>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-mute">{firstLine}</p>
                  <Link
                    to={`/product/${product.id}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent-2 hover:text-bone"
                  >
                    Read the full published verdict
                    <span aria-hidden>→</span>
                  </Link>
                </div>
                <ScoreRing score={product.score} size={96} stroke={6} className="shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustStrip() {
  const stats = [
    { k: 'Binary', v: 'Pass or fail — no partial credit' },
    { k: '$0', v: 'To be considered — submissions are free' },
    { k: 'Published', v: 'Full reasoning behind every verdict' },
  ]
  return (
    <section className="hairline">
      <div className="mx-auto grid max-w-content grid-cols-1 divide-y divide-line border-x border-line md:grid-cols-3 md:divide-x md:divide-y-0">
        {stats.map((s, i) => (
          <Reveal key={s.k} delay={i * 100} className="px-6 py-8 md:px-8">
            <div className="font-display text-2xl text-bone">{s.k}</div>
            <div className="mt-1.5 text-sm text-mute">{s.v}</div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function StandardsTeaser() {
  const tracks = [TRACKS.equipment, TRACKS.nutrition, TRACKS.household]
  return (
    <section className="mx-auto max-w-content px-6 md:px-8 py-24">
      <Reveal>
        <div className="eyebrow">The Standard</div>
        <h2 className="mt-3 max-w-xl font-display text-[2rem] leading-tight text-bone md:text-[2.4rem]">
          One mark, held to the right test for each thing it certifies.
        </h2>
        <p className="mt-4 max-w-xl text-mute">
          Equipment, nutrition, and household products fail for different reasons, so each is held
          to its own standard — not one generic checklist stretched to cover everything.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {tracks.map((t, i) => (
          <Reveal key={t.id} delay={i * 120}>
            <Link
              to={`/standards/${t.id}`}
              className="group flex h-full flex-col rounded-2xl border border-line bg-card p-8 shadow-card transition-all duration-150 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-center justify-between">
                <span className="eyebrow">{t.name}</span>
                {t.flagship && (
                  <span className="rounded-full bg-accent/12 px-2.5 py-1 text-[0.65rem] font-medium text-accent-2">
                    Flagship category
                  </span>
                )}
              </div>
              <h3 className="mt-3 font-display text-2xl text-bone">{t.tagline}</h3>
              <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-mute">{t.lede}</p>
              <div className="mt-6 flex items-center gap-2 text-sm text-accent-2">
                Read the 5-part standard
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="hairline bg-surface/60">
      <div className="mx-auto max-w-content px-6 md:px-8 py-24">
        <Reveal>
          <div className="eyebrow">How it works</div>
          <h2 className="mt-3 max-w-lg font-display text-[2rem] leading-tight text-bone md:text-[2.4rem]">
            How a product earns the mark
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step, i) => (
            <Reveal key={step.num} delay={i * 100}>
              <div className="flex flex-col">
                <div className="font-display text-3xl text-accent-2">{step.num}</div>
                <div className="mt-4 h-px w-10 bg-line" />
                <h4 className="mt-4 text-base font-semibold text-bone">{step.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-mute">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Featured() {
  const featured = PRODUCTS.filter((p) =>
    ['aurora-infrared-sauna', 'loch-ard-spring-water', 'meridian-cold-plunge-xl', 'northfield-grass-fed-whey'].includes(p.id),
  )
  return (
    <section className="mx-auto max-w-content px-6 md:px-8 py-24">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow">Marked products</div>
            <h2 className="mt-3 font-display text-[2rem] leading-tight text-bone md:text-[2.4rem]">
              A sample of what’s cleared so far
            </h2>
          </div>
          <Link to="/catalog" className="text-sm text-accent-2 hover:text-bone">
            View the full catalog →
          </Link>
        </div>
        <p className="mt-4 max-w-xl text-sm text-mute">
          Illustrative entries with fabricated test data for this demo — not live listings.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((p, i) => (
          <Reveal key={p.id} delay={i * 90}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function BrandsCTA() {
  return (
    <section className="mx-auto max-w-content px-6 md:px-8 pb-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-card p-10 md:p-14 shadow-card">
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl">
              <h2 className="font-display text-[1.8rem] leading-tight text-bone md:text-[2.1rem]">
                Brands don’t buy the mark. They earn it.
              </h2>
              <p className="mt-4 text-mute">
                We don’t accept sponsorships and we don’t sell placement. If your product can survive
                independent testing, we want it — and if it can’t, no amount of budget changes that.
              </p>
            </div>
            <Link
              to="/submit"
              className="shrink-0 rounded-full bg-bone px-7 py-3.5 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
            >
              Submit a product
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <AnatomyOfAPass />
      <StandardsTeaser />
      <Marquee
        items={[
          'Sourced',
          'Lab-tested',
          'Disclosed',
          'Independent',
          'Published',
          'Verified',
          'No pay-to-list',
        ]}
      />
      <Process />
      <Featured />
      <BrandsCTA />
    </>
  )
}
