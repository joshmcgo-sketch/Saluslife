import SalusMark from './SalusMark'

// The Salus Life mark. Kept as `Seal` so every existing call site (nav, badges,
// stamps, footer) renders the goddess Salus figure without changes. `accent`
// and `muted` are accepted for backwards compatibility and no longer used.
export default function Seal({ size = 48, className = '' }) {
  return <SalusMark size={size} className={className} />
}
