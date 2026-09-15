import { Link } from 'react-router-dom'
import ProductImage from './ProductImage'
import ScoreRing from './ScoreRing'
import Seal from './Seal'
import { useCart } from '../context/CartContext'
import { money } from '../lib/format'

// Catalog card. Hover-lifts ~4px with a soft shadow increase (~150ms ease-out),
// matching the Thrive grid interaction reference. Includes a quick add-to-cart.
export default function ProductCard({ product }) {
  const { add, openCart } = useCart()

  const quickAdd = (e) => {
    e.preventDefault() // don't follow the card link
    e.stopPropagation()
    add(product.id)
    openCart()
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block rounded-2xl border border-line bg-card p-3 shadow-card transition-all duration-150 ease-out hover:-translate-y-1 hover:border-line/80 hover:shadow-lift"
    >
      <div className="relative">
        <ProductImage icon={product.icon} src={product.image} alt={product.name} className="aspect-[4/3] w-full" />
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-line/80 bg-ink/70 px-2.5 py-1 backdrop-blur-sm">
          <Seal size={13} />
          <span className="text-[0.65rem] font-medium text-bone/90">Verified</span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-3 px-2 pt-4">
        <div className="min-w-0">
          <div className="text-[0.68rem] uppercase tracking-micro text-faint">{product.category}</div>
          <h3 className="mt-1 font-display text-[1.05rem] leading-snug text-bone">{product.name}</h3>
          <div className="mt-0.5 text-sm text-mute">{product.brand}</div>
        </div>
        <ScoreRing score={product.score} size={52} stroke={4} showTotal={false} />
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-line px-2 pb-1 pt-3">
        <div className="font-display text-lg text-bone">{money(product.price)}</div>
        <button
          onClick={quickAdd}
          className="rounded-full border border-line px-4 py-1.5 text-sm text-bone transition-colors hover:border-accent/60 hover:text-accent-2"
        >
          Add to cart
        </button>
      </div>
    </Link>
  )
}
