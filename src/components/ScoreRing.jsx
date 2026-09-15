import { useInView, useCountUp } from '../lib/hooks'
import { scoreColor } from '../lib/score'

// Radial score indicator that animates its arc + counts the number up from 0.
// Matches the Oasis-style reference: green (strong), amber (acceptable),
// coral (below bar).
export default function ScoreRing({
  score,
  size = 72,
  stroke = 5,
  showTotal = true,
  className = '',
}) {
  const [ref, inView] = useInView({ threshold: 0.4 })
  const value = useCountUp(score, { active: inView, duration: 1200 })
  const color = scoreColor(score)

  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(100, value)) / 100
  const offset = c * (1 - pct)

  return (
    <div ref={ref} className={`relative shrink-0 ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(28,30,25,0.12)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 90ms linear' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-display tabular-nums leading-none"
          style={{ fontSize: size * 0.32, color }}
        >
          {value}
        </span>
        {showTotal && (
          <span className="text-[0.6rem] leading-none text-faint mt-0.5">/100</span>
        )}
      </div>
    </div>
  )
}
