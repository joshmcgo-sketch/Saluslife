import { Link } from 'react-router-dom'
import Seal from './Seal'

// ── Social profiles ─────────────────────────────────────────────────────────
// Add your URLs here once the accounts exist. Leave a value as '' and the icon
// still shows but won't link anywhere yet.
const SOCIAL = {
  instagram: '', // e.g. 'https://www.instagram.com/saluslife'
  tiktok: '', // e.g. 'https://www.tiktok.com/@saluslife'
}

function SocialIcon({ href, label, children }) {
  const active = Boolean(href)
  return (
    <a
      href={href || '#'}
      aria-label={label}
      title={active ? label : `${label} (coming soon)`}
      target={active ? '_blank' : undefined}
      rel={active ? 'noopener noreferrer' : undefined}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-mute transition-colors hover:border-bone/40 hover:text-bone"
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer className="relative z-10 hairline mt-24">
      <div className="mx-auto max-w-content px-6 md:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <Seal size={30} />
              <span className="font-display text-lg font-semibold">Salus Life</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mute">
              An independent certification authority. We don't accept sponsorships and we don't
              sell placement. The mark is the product.
            </p>
          </div>

          <div>
            <div className="eyebrow mb-4">The Standard</div>
            <ul className="space-y-2.5 text-sm text-mute">
              <li><Link to="/standards?track=equipment" className="hover:text-bone">Equipment standard</Link></li>
              <li><Link to="/standards?track=nutrition" className="hover:text-bone">Nutrition standard</Link></li>
              <li><Link to="/standards?track=household" className="hover:text-bone">Household standard</Link></li>
              <li><Link to="/catalog" className="hover:text-bone">Marked products</Link></li>
              <li><Link to="/mission" className="hover:text-bone">Mission & method</Link></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-4">Contact</div>
            <ul className="space-y-2.5 text-sm text-mute">
              <li><a href="mailto:hello@saluslife.example" className="hover:text-bone">hello@saluslife.example</a></li>
              <li><Link to="/submit" className="hover:text-bone">Submit a product</Link></li>
            </ul>

            <div className="mt-5 flex items-center gap-2.5">
              <SocialIcon href={SOCIAL.instagram} label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="3.8" />
                  <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
                </svg>
              </SocialIcon>
              <SocialIcon href={SOCIAL.tiktok} label="TikTok">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </SocialIcon>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>Salus Life — investor demo with fictional test data.</span>
          <span>© {new Date().getFullYear()} Salus Life Standards</span>
          <span>Co-founded by Joshua McGovern & Stephen Schiele</span>
        </div>
      </div>
    </footer>
  )
}
