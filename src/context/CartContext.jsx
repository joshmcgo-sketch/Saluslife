import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getProduct } from '../data/products'

const CartCtx = createContext(null)
const STORAGE_KEY = 'threshold-cart-v1'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    } catch {
      return []
    }
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* ignore storage failures (e.g. private mode) */
    }
  }, [items])

  const add = useCallback((id, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id)
      if (existing) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i))
      return [...prev, { id, qty }]
    })
  }, [])

  const setQty = useCallback((id, qty) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    )
  }, [])

  const remove = useCallback((id) => setItems((prev) => prev.filter((i) => i.id !== id)), [])
  const clear = useCallback(() => setItems([]), [])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  // Join cart lines with product data (drops any stale ids gracefully).
  const detailed = useMemo(
    () =>
      items
        .map((i) => {
          const product = getProduct(i.id)
          return product ? { ...i, product, lineTotal: product.price * i.qty } : null
        })
        .filter(Boolean),
    [items],
  )

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items])
  const subtotal = useMemo(() => detailed.reduce((s, l) => s + l.lineTotal, 0), [detailed])

  const value = {
    items,
    detailed,
    count,
    subtotal,
    add,
    setQty,
    remove,
    clear,
    isOpen,
    openCart,
    closeCart,
  }

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export function useCart() {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
