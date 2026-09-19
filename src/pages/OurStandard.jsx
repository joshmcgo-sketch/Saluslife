import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { TRACKS, PROCESS } from '../data/standards'

const VALID_TRACK_IDS = new Set(Object.keys(TRACKS))

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

export default function OurStandard() {
  const [searchParams] = useSearchParams()
  const [trackId, setTrackId] = useState(() => {
    const t = searchParams.get('track')
    return VALID_TRACK_IDS.has(t) ? t : 'equipment'
  })
  const track = TRACKS[trackId]

  return (
    <div>
      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-accent/[0.06] to-transparent" />
        <div className="relative mx-auto max-w-content px-6 md:px-8 pt-16 pb-10 text-center">
          <Reveal>
            <div className="eyebrow">Our Standard</div>
            <h1 className="mt-3 font-display text-[2.4rem] font-medium leading-tight tracking-tight md:text-[3rem]">
              One mark, three rubrics.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-mute">
              Equipment, nutrition, and household products fail for different reasons, so each is
              held to its own 5-part standard — not one generic checklist stretched to cover
              everything.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Toggle */}
      <Reveal delay={60}>
        <div className="mx-auto flex max-w-content flex-wrap justify-center gap-2 px-6 md:px-8">
          {Object.values(TRACKS).map((t) => (
            <Pill key={t.id} active={trackId === t.id} onClick={() => setTrackId(t.id)}>
              {t.name}
            </Pill>
          ))}
        </div>
      </Reveal>

      {/* Selected standard's explanation */}
      <section className="mx-auto max-w-content px-6 md:px-8 py-14">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            {track.flagship && (
              <span className="rounded-full bg-accent/12 px-2.5 py-1 text-[0.65rem] font-medium text-accent-2">
                Flagship category
              </span>
            )}
            <span className="text-xs uppercase tracking-micro text-faint">{track.tagline}</span>
          </div>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mute">{track.lede}</p>
          <Link
            to={`/standards/${track.id}`}
            className="mt-5 inline-flex items-center gap-1.5 text-sm text-accent-2 hover:text-bone"
          >
            See marked {track.name.toLowerCase()} products →
          </Link>
        </Reveal>

        <div className="mt-10 space-y-4">
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
      </section>

      {/* Process — shared across every standard, not toggled */}
      <section className="hairline bg-surface/60">
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
    </div>
  )
}
