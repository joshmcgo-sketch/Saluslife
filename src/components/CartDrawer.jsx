import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import ProductImage from './ProductImage'
import QtyStepper from './QtyStepper'
import Seal from './Seal'
import { money } from '../lib/format'

export default function CartDrawer() {
  const { isOpen, closeCart, detailed, subtotal, count, setQty, remove } = useCart()

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [isOpen])

  return (
    <div className={`fixed inset-0 z-[60] ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      {/* Scrim */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {/* Panel */}
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-line bg-surface shadow-lift transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div className="flex items-center gap-2">
            <h2 className="font-display text-lg text-bone">Your cart</h2>
            <span className="rounded-full bg-card px-2 py-0.5 text-xs text-mute">{count}</span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-8 w-8 items-center justify-center rounded-full text-mute transition-colors hover:bg-card hover:text-bone"
          >
            ✕
          </button>
        </div>

        {detailed.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <Seal size={44} className="text-faint" />
            <p className="text-mute">Your cart is empty.</p>
            <Link
              to="/catalog"
              onClick={closeCart}
              className="rounded-full border border-line px-5 py-2.5 text-sm text-bone transition-colors hover:border-bone/40"
            >
              Browse marked products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-4">
                {detailed.map((line) => (
                  <li key={line.id} className="flex gap-3">
                    <Link to={`/product/${line.id}`} onClick={closeCart} className="shrink-0">
                      <ProductImage icon={line.product.icon} src={line.product.image} alt={line.product.name} className="h-16 w-16" rounded="rounded-xl" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <Link
                            to={`/product/${line.id}`}
                            onClick={closeCart}
                            className="block truncate font-display text-[0.98rem] text-bone hover:text-accent-2"
                          >
                            {line.product.name}
                          </Link>
                          <div className="text-xs text-faint">{line.product.brand}</div>
                        </div>
                        <button
                          onClick={() => remove(line.id)}
                          className="shrink-0 text-xs text-faint transition-colors hover:text-fail"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <QtyStepper qty={line.qty} onChange={(q) => setQty(line.id, q)} size="sm" />
                        <span className="text-sm tabular-nums text-bone">{money(line.lineTotal)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-line px-5 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-mute">Subtotal</span>
                <span className="tabular-nums text-bone">{money(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-faint">Shipping & taxes calculated at checkout.</p>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="mt-4 block rounded-full bg-accent px-6 py-3 text-center text-sm font-medium text-ink transition-colors hover:bg-accent-2"
              >
                Checkout · {money(subtotal)}
              </Link>
              <button
                onClick={closeCart}
                className="mt-2 block w-full text-center text-xs text-faint transition-colors hover:text-bone"
              >
                Continue browsing
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
