import { useMemo, useState } from 'react'
import Reveal from '../components/Reveal'
import ProductCard from '../components/ProductCard'
import { PRODUCTS, GROUP_META } from '../data/products'

const FILTERS = [{ id: 'all', label: 'All products' }, ...GROUP_META]

export default function Catalog() {
  const [filter, setFilter] = useState('all')

  const products = useMemo(() => {
    const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.group === filter)
    return [...list].sort((a, b) => b.score - a.score)
  }, [filter])

  return (
    <section>
      <div className="mx-auto max-w-content px-6 md:px-8 pt-16 pb-20">
        <Reveal className="text-center">
          <h1 className="font-display text-[2.4rem] font-medium leading-tight tracking-tight md:text-[3rem]">
            Marked products
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-mute">
            Every product here cleared its full rubric and carries the mark. Fabricated test data for
            this demo — sorted by score, most rigorous first.
          </p>
        </Reveal>

        {/* Filter pills */}
        <Reveal delay={100}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {FILTERS.map((f) => {
              const active = filter === f.id
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`rounded-full px-5 py-2 text-sm transition-colors ${
                    active
                      ? 'bg-bone text-ink'
                      : 'border border-line text-mute hover:border-bone/30 hover:text-bone'
                  }`}
                >
                  {f.label}
                  <span className={`ml-2 text-xs ${active ? 'text-ink/50' : 'text-faint'}`}>
                    {f.id === 'all' ? PRODUCTS.length : PRODUCTS.filter((p) => p.group === f.id).length}
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 90}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
