// Product imagery. If a real photo (`src`) is supplied it fills the frame;
// otherwise an elegant monochrome line-art stand-in (keyed by `icon`) is drawn
// so nothing ever shows a broken image.

const paths = {
  sauna: (
    <g>
      <path d="M18 40 L50 20 L82 40" />
      <path d="M24 40 L24 76 L76 76 L76 40" />
      <path d="M34 76 L34 52 L50 52 L50 76" />
      <path d="M50 52 L66 52 L66 76" />
      <line x1="58" y1="40" x2="58" y2="48" />
      <line x1="66" y1="40" x2="66" y2="48" />
    </g>
  ),
  barrel: (
    <g>
      <ellipse cx="50" cy="50" rx="34" ry="26" />
      <path d="M30 28 Q50 22 70 28" />
      <path d="M30 72 Q50 78 70 72" />
      <line x1="16" y1="50" x2="84" y2="50" opacity="0.5" />
      <rect x="42" y="40" width="16" height="20" rx="2" />
    </g>
  ),
  plunge: (
    <g>
      <path d="M22 42 L26 74 Q26 78 30 78 L70 78 Q74 78 74 74 L78 42" />
      <ellipse cx="50" cy="42" rx="28" ry="9" />
      <path d="M30 48 Q50 56 70 48" opacity="0.6" />
      <path d="M34 40 Q40 30 46 40" opacity="0.7" />
      <path d="M52 40 Q58 30 64 40" opacity="0.7" />
    </g>
  ),
  recovery: (
    <g>
      <rect x="40" y="20" width="20" height="34" rx="6" />
      <rect x="36" y="54" width="28" height="12" rx="4" />
      <line x1="50" y1="66" x2="50" y2="80" />
      <circle cx="50" cy="34" r="6" opacity="0.6" />
    </g>
  ),
  boots: (
    <g>
      <path d="M38 22 L62 22 L60 60 L40 60 Z" />
      <path d="M40 60 L36 78 L64 78 L60 60" />
      <line x1="40" y1="34" x2="60" y2="34" opacity="0.5" />
      <line x1="40" y1="46" x2="60" y2="46" opacity="0.5" />
    </g>
  ),
  bottle: (
    <g>
      <path d="M44 18 L56 18 L56 28 Q64 34 64 46 L64 78 Q64 82 60 82 L40 82 Q36 82 36 78 L36 46 Q36 34 44 28 Z" />
      <line x1="36" y1="52" x2="64" y2="52" opacity="0.5" />
      <rect x="42" y="14" width="16" height="5" rx="1" />
    </g>
  ),
  capsule: (
    <g>
      <rect x="30" y="42" width="40" height="16" rx="8" transform="rotate(-32 50 50)" />
      <line x1="50" y1="50" x2="63" y2="42" transform="rotate(-32 50 50)" opacity="0.6" />
      <circle cx="50" cy="50" r="30" opacity="0.15" />
    </g>
  ),
  bar: (
    <g>
      <rect x="26" y="40" width="48" height="20" rx="4" />
      <path d="M26 46 L74 46" opacity="0.4" />
      <path d="M36 40 L36 60 M50 40 L50 60 M64 40 L64 60" opacity="0.4" />
      <path d="M22 44 L26 40 L26 60 L22 64 Z" opacity="0.6" />
    </g>
  ),
  meat: (
    <g>
      <path d="M32 40 Q28 60 44 68 Q64 76 72 56 Q78 40 62 34 Q44 28 32 40 Z" />
      <path d="M46 46 Q54 50 52 60" opacity="0.5" />
      <circle cx="42" cy="50" r="2" opacity="0.6" />
    </g>
  ),
  oil: (
    <g>
      <path d="M46 20 L54 20 L54 30 L60 36 L60 78 Q60 82 56 82 L44 82 Q40 82 40 78 L40 36 L46 30 Z" />
      <path d="M40 58 Q50 64 60 58" opacity="0.55" />
      <circle cx="50" cy="68" r="4" opacity="0.5" />
    </g>
  ),
  seed: (
    <g>
      <ellipse cx="42" cy="46" rx="7" ry="11" transform="rotate(-20 42 46)" />
      <ellipse cx="58" cy="52" rx="7" ry="11" transform="rotate(24 58 52)" />
      <ellipse cx="50" cy="62" rx="7" ry="11" />
      <line x1="42" y1="40" x2="42" y2="52" opacity="0.5" />
    </g>
  ),
}

export default function ProductImage({
  icon = 'bottle',
  src,
  alt = '',
  className = '',
  rounded = 'rounded-2xl',
}) {
  // Real photo path.
  if (src) {
    return (
      <div
        className={`relative overflow-hidden ${rounded} ${className}`}
        style={{ background: '#E6E3D8' }}
      >
        <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    )
  }

  // Line-art fallback.
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${rounded} ${className}`}
      style={{
        background:
          'radial-gradient(120% 120% at 50% 12%, rgba(62,90,70,0.12), rgba(0,0,0,0.015) 42%, rgba(0,0,0,0) 70%), #E6E3D8',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(28,30,25,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(28,30,25,0.05) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      <svg
        viewBox="0 0 100 100"
        className="relative w-[46%] max-w-[150px]"
        fill="none"
        stroke="rgba(28,30,25,0.55)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths[icon] || paths.bottle}
      </svg>
    </div>
  )
}
