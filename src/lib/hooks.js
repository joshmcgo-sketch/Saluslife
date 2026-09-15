import { useEffect, useRef, useState } from 'react'

/**
 * Fire once when an element scrolls into view.
 * Returns [ref, inView].
 */
export function useInView({ threshold = 0.16, rootMargin = '0px 0px -8% 0px', once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            if (once) obs.unobserve(entry.target)
          } else if (!once) {
            setInView(false)
          }
        })
      },
      { threshold, rootMargin },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, inView]
}

/**
 * Current vertical scroll position (rAF-throttled). Drives hero parallax.
 */
export function useScrollY() {
  const [y, setY] = useState(typeof window === 'undefined' ? 0 : window.scrollY)
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setY(window.scrollY)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return y
}

/**
 * Fraction of the page scrolled, 0 → 1. Drives the top progress bar.
 */
export function useScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    let ticking = false
    const update = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setP(max > 0 ? Math.min(1, h.scrollTop / max) : 0)
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return p
}

/**
 * Count a number up from `start` to `target` once `active` becomes true.
 * Respects prefers-reduced-motion (snaps to target).
 */
export function useCountUp(target, { duration = 1100, start = 0, active = true } = {}) {
  const [value, setValue] = useState(start)
  const frame = useRef(null)

  useEffect(() => {
    if (!active) return
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setValue(target)
      return
    }

    let startTime = null
    const easeOut = (t) => 1 - Math.pow(1 - t, 3)

    const step = (ts) => {
      if (startTime === null) startTime = ts
      const p = Math.min((ts - startTime) / duration, 1)
      setValue(Math.round(start + (target - start) * easeOut(p)))
      if (p < 1) frame.current = requestAnimationFrame(step)
    }
    frame.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame.current)
  }, [target, duration, start, active])

  return value
}
