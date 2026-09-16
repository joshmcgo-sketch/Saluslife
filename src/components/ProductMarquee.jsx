import { Link } from 'react-router-dom'
import ProductImage from './ProductImage'
import ScoreRing from './ScoreRing'
import { PRODUCTS } from '../data/products'

// Continuously scrolling row of product tiles — each shows the product image
// with its rating in the top-right corner, and name/brand below. Content is
// duplicated so the -50% marquee keyframe loops seamlessly; pauses on hover.
export default function ProductMarquee({ products = PRODUCTS, duration = 70 }) {
  return (
    <div className="marquee relative mt-14 overflow-hidden md:mt-16">
      <div className="marquee-track" style={{ animationDuration: `${duration}s` }}>
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
            {products.map((p) => (
              <Link
                key={`${dup}-${p.id}`}
                to={`/product/${p.id}`}
                className="group mx-2.5 w-44 shrink-0 sm:w-52"
                tabIndex={dup === 1 ? -1 : 0}
              >
                <div className="relative overflow-hidden rounded-2xl border border-line bg-card shadow-card transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lift">
                  <ProductImage
                    icon={p.icon}
                    src={p.image}
                    alt={p.name}
                    className="aspect-[4/5] w-full"
                    rounded="rounded-none"
                  />
                  {/* rating — score ring in the top-right corner */}
                  <div className="absolute right-2 top-2 rounded-full bg-raised/95 p-1 shadow-sm ring-1 ring-line/60 backdrop-blur-sm">
                    <ScoreRing score={p.score} size={38} stroke={3.5} showTotal={false} />
                  </div>
                </div>
                <div className="mt-3 px-1">
                  <div className="text-[0.58rem] uppercase tracking-micro text-faint">{p.category}</div>
                  <div className="truncate font-display text-[0.98rem] leading-snug text-bone">{p.name}</div>
                  <div className="truncate text-xs text-mute">{p.brand}</div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* edge fades into the page */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent md:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent md:w-28" />
    </div>
  )
}
