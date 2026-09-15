import rawFigure from '../assets/salus.svg?raw'

// Salus — Roman goddess of health — traced from the classical Pompeii engraving
// and set inside a thin double-ring medallion, forming the Salus Life crest.
// Everything inherits `currentColor`, so the mark recolors with its context.

// Nest the traced figure as a fixed-size, centered inner <svg> within the seal.
const figure = rawFigure.replace(
  /width="100%"\s+height="100%"/,
  'x="32" y="16.5" width="36" height="67"',
)

const CREST_HTML = `
<svg viewBox="0 0 100 100" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="48" stroke="currentColor" stroke-width="1.5"/>
  <circle cx="50" cy="50" r="41.5" stroke="currentColor" stroke-width="0.75" opacity="0.5"/>
  ${figure}
</svg>`

export default function SalusMark({ size = 48, className = '', title = 'Salus Life' }) {
  return (
    <span
      role="img"
      aria-label={title}
      className={className}
      style={{ display: 'inline-block', height: size, width: size, lineHeight: 0 }}
      dangerouslySetInnerHTML={{ __html: CREST_HTML }}
    />
  )
}
