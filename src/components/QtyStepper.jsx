// Small +/- quantity control used in the cart drawer and checkout.
export default function QtyStepper({ qty, onChange, size = 'md' }) {
  const pad = size === 'sm' ? 'h-7 w-7 text-sm' : 'h-8 w-8'
  return (
    <div className="inline-flex items-center rounded-full border border-line">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(qty - 1)}
        className={`${pad} flex items-center justify-center rounded-full text-mute transition-colors hover:text-bone`}
      >
        −
      </button>
      <span className="w-7 text-center text-sm tabular-nums text-bone">{qty}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(qty + 1)}
        className={`${pad} flex items-center justify-center rounded-full text-mute transition-colors hover:text-bone`}
      >
        +
      </button>
    </div>
  )
}
