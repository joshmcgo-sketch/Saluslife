import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Seal from './Seal'
import SearchOverlay from './SearchOverlay'
import { useCart } from '../context/CartContext'

function SearchButton({ onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      aria-label="Search products"
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-line text-bone transition-colors hover:border-bone/40 ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    </button>
  )
}

function CartButton({ className = '' }) {
  const { count, openCart } = useCart()
  return (
    <button
      onClick={openCart}
      aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}
      className={`relative flex h-9 w-9 items-center justify-center rounded-full border border-line text-bone transition-colors hover:border-bone/40 ${className}`}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[0.6rem] font-semibold text-ink">
          {count}
        </span>
      )}
    </button>
  )
}

const LINKS = [
  { to: '/standards', label: 'Our Standard', end: true },
  { to: '/standards/equipment', label: 'Equipment' },
  { to: '/standards/nutrition', label: 'Nutrition' },
  { to: '/standards/household', label: 'Household' },
  { to: '/catalog', label: 'Marked products' },
  { to: '/mission', label: 'Mission' },
  { to: '/orders', label: 'My Orders' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  // On the landing page the nav is hidden and fades in once you scroll past the
  // full-screen hero. On every other page it stays visible.
  const [revealed, setRevealed] = useState(!isHome)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)
      setRevealed(!isHome || y > window.innerHeight * 0.15)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-ink/85 backdrop-blur-md border-b border-line' : 'border-b border-transparent'
      } ${revealed ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'}`}
    >
      <div className="mx-auto max-w-content px-6 md:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2.5 text-bone">
            <Seal size={26} />
            <span className="font-display text-[1.15rem] font-semibold tracking-tight">Salus Life</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-sm">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `transition-colors hover:text-bone ${isActive ? 'text-bone' : 'text-mute'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/submit"
              className="rounded-full border border-line px-4 py-1.5 text-sm text-bone/90 transition-colors hover:border-bone/40 hover:text-bone"
            >
              Submit a product
            </Link>
            <SearchButton onClick={() => setSearchOpen(true)} />
            <CartButton />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <SearchButton onClick={() => setSearchOpen(true)} />
            <CartButton />
            <button
              className="-mr-1 flex h-9 w-9 items-center justify-center rounded-full border border-line text-bone"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
            <div className="space-y-1">
              <span className={`block h-px w-4 bg-bone transition-transform ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
              <span className={`block h-px w-4 bg-bone transition-transform ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
            </div>
          </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-line bg-ink/95 backdrop-blur-md">
          <nav className="mx-auto max-w-content px-6 py-4 flex flex-col gap-4 text-sm">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) => (isActive ? 'text-bone' : 'text-mute')}
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/submit" className="text-accent-2">Submit a product →</Link>
          </nav>
        </div>
      )}
    </header>
    <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
