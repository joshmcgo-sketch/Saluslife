/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // "Meadow" — a light, editorial palette (paper + muted sage + near-black
      // ink). Token ROLES are kept so existing classes still hold:
      //   ink   = page background (now light paper)
      //   bone  = primary text     (now near-black)
      //   accent = interactive/CTA (deep sage) with `text-ink` as its label
      colors: {
        ink: '#ECE9E0', // page background (warm paper)
        surface: '#E4E1D6', // alternating section background
        card: '#FBFAF4', // card surface
        raised: '#FFFFFF', // elevated surface
        line: '#D9D4C6', // hairline borders
        bone: '#1C1E19', // primary text (near-black, warm)
        mute: '#575A4E', // secondary text
        faint: '#8A8D80', // tertiary text
        accent: '#3E5A46', // interactive / CTA (deep sage)
        'accent-2': '#4C6E58', // hover / links
        pass: '#3F8F5E',
        watch: '#B07D1E',
        fail: '#C6503A',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        content: '1280px',
      },
      boxShadow: {
        card: 'inset 0 1px 0 rgba(255,255,255,0.02), 0 8px 24px -14px rgba(0,0,0,0.7)',
        lift: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 44px -18px rgba(0,0,0,0.8)',
        ring: '0 0 0 1px rgba(94,134,234,0.35), 0 12px 34px -12px rgba(94,134,234,0.28)',
      },
      letterSpacing: {
        micro: '0.18em',
      },
    },
  },
  plugins: [],
}
