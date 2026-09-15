import { Link } from 'react-router-dom'
import Seal from './Seal'

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
              <li><Link to="/standards/equipment" className="hover:text-bone">Equipment standard</Link></li>
              <li><Link to="/standards/nutrition" className="hover:text-bone">Nutrition standard</Link></li>
              <li><Link to="/standards/household" className="hover:text-bone">Household standard</Link></li>
              <li><Link to="/catalog" className="hover:text-bone">Marked products</Link></li>
              <li><Link to="/mission" className="hover:text-bone">Mission & method</Link></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-4">Contact</div>
            <ul className="space-y-2.5 text-sm text-mute">
              <li><a href="mailto:hello@saluslife.example" className="hover:text-bone">hello@saluslife.example</a></li>
              <li><Link to="/catalog" className="hover:text-bone">Submit a product</Link></li>
            </ul>
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
