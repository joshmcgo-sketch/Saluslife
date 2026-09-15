import ScoreRing from './ScoreRing'
import Reveal from './Reveal'
import { STATUS } from '../lib/score'

// Independent-scoring reference card, styled after the Oasis screenshot.
// Explicitly labelled as illustrative — NOT a claimed data partnership.
// Shows a headline lab score + per-analyte line items with pass/watch/flag
// semantic colour coding.
export default function ReferenceCard({ reference, productName }) {
  return (
    <div className="rounded-2xl border border-line bg-card shadow-card overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-[0.68rem] uppercase tracking-micro text-faint">
              Independent scoring reference
            </span>
          </div>
          <div className="mt-1 text-sm font-medium text-bone">Oasis-style lab profile</div>
        </div>
        <ScoreRing score={reference.score} size={64} stroke={5} />
      </div>

      <div className="px-5 py-4">
        <div className="mb-3 flex items-center justify-between text-[0.7rem] uppercase tracking-micro text-faint">
          <span>Analyte</span>
          <span>Result</span>
        </div>
        <ul className="divide-y divide-line/70">
          {reference.items.map((item, i) => {
            const s = STATUS[item.status]
            return (
              <Reveal as="li" key={item.label} delay={i * 60} className="flex items-center justify-between gap-4 py-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`h-2 w-2 shrink-0 rounded-full ${s.dot}`} />
                  <span className="truncate text-sm text-bone/90">{item.label}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm tabular-nums text-mute">{item.value}</span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[0.65rem] font-medium"
                    style={{ color: s.color, background: `${s.color}1A` }}
                  >
                    {s.label}
                  </span>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>

      <p className="border-t border-line px-5 py-3 text-[0.7rem] leading-relaxed text-faint">
        Illustrative reference only. Salus Life verdicts sit alongside independent lab science;
        figures shown are fabricated demo data and imply no partnership.
      </p>
    </div>
  )
}
