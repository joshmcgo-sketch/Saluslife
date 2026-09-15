import { useScrollProgress } from '../lib/hooks'

// Thin sage bar pinned to the very top that fills as you scroll the page.
export default function ScrollProgress() {
  const p = useScrollProgress()
  return (
    <div className="fixed inset-x-0 top-0 z-[70] h-[3px] bg-transparent">
      <div
        className="h-full bg-accent origin-left"
        style={{ transform: `scaleX(${p})`, transition: 'transform 80ms linear' }}
      />
    </div>
  )
}
