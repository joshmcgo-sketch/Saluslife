import Seal from './Seal'

// Continuously scrolling band of words. Content is duplicated so the -50%
// keyframe loops seamlessly; pauses on hover. Purely decorative motion.
export default function Marquee({ items }) {
  const run = (
    <div className="marquee-track">
      {[0, 1].map((dup) => (
        <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
          {items.map((item) => (
            <span key={item} className="flex items-center">
              <span className="whitespace-nowrap px-8 font-display text-3xl text-bone/85 md:text-5xl">
                {item}
              </span>
              <Seal size={20} className="text-accent/70" />
            </span>
          ))}
        </div>
      ))}
    </div>
  )

  return (
    <div className="marquee relative overflow-hidden border-y border-line bg-surface/60 py-8">
      {run}
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  )
}
