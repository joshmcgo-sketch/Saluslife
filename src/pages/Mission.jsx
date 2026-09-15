import { Link } from 'react-router-dom'
import Seal from '../components/Seal'
import Reveal from '../components/Reveal'

function Pillar({ n, title, children }) {
  return (
    <Reveal delay={n * 90} className="flex gap-5">
      <div className="font-display text-xl text-accent-2">{String(n + 1).padStart(2, '0')}</div>
      <div>
        <h3 className="text-base font-semibold text-bone">{title}</h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-mute">{children}</p>
      </div>
    </Reveal>
  )
}

export default function Mission() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-accent/[0.06] to-transparent" />
        <div className="relative mx-auto max-w-content px-6 md:px-8 pt-20 pb-14">
          <Reveal>
            <div className="eyebrow">Mission &amp; method</div>
            <h1 className="mt-4 max-w-3xl font-display text-[2.4rem] font-medium leading-[1.08] tracking-tight md:text-[3.2rem]">
              The wellness industry has no mechanism to verify its own claims. We’re building one.
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Problem */}
      <section className="hairline">
        <div className="mx-auto grid max-w-content gap-14 px-6 md:px-8 py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="eyebrow">The problem</div>
            <h2 className="mt-3 font-display text-[1.9rem] leading-tight text-bone">
              The best-marketed product wins — not the best-made one.
            </h2>
          </Reveal>
          <div className="space-y-6 text-[1.02rem] leading-relaxed text-mute">
            <Reveal delay={80}>
              <p>
                Sourcing and ingredient claims are self-reported. “Clean,” “natural,” and
                “third-party tested” mean whatever the brand printing them wants them to mean, and
                nobody is checking. Greenwashing isn’t an edge case in wellness — it’s the operating
                model.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p>
                Durable goods are worse. Saunas, cold plunges, and recovery tech have{' '}
                <span className="text-bone">literally no independent scoring at all.</span> There is
                no incumbent standard to trust and none to argue with. A buyer comparing two infrared
                saunas has nothing to go on but the marketing, so the company with the biggest ad
                budget wins — regardless of what’s actually inside the cabin.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p>
                The result is a market where credibility is purchased, not earned. We think the fix
                isn’t another curated storefront or affiliate list. It’s a testing authority with a
                public seal — closer to UL or Leaping Bunny than to a marketplace.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission line — the commitment */}
      <section className="hairline bg-surface/60">
        <div className="mx-auto max-w-content px-6 md:px-8 py-20">
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-8 w-14 text-bone">
              <Seal size={56} />
            </div>
            <p className="font-display text-[1.6rem] leading-[1.4] text-bone md:text-[2rem]">
              “We don’t accept sponsorships and we don’t sell placement. If your product can survive
              independent testing, we want it — and if it can’t, no amount of budget changes that.”
            </p>
          </Reveal>
        </div>
      </section>

      {/* How we stay independent */}
      <section>
        <div className="mx-auto max-w-content px-6 md:px-8 py-20">
          <Reveal>
            <div className="eyebrow">How we stay independent</div>
            <h2 className="mt-3 max-w-xl font-display text-[1.9rem] leading-tight text-bone">
              The mark is the product. Commerce follows the authority — never the other way around.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <Pillar n={0} title="No pay-to-play, ever">
              No sponsorships, no paid placement, no certification fees at this stage. A standard that
              charges the companies it judges isn’t a standard — it’s a storefront with a badge.
            </Pillar>
            <Pillar n={1} title="Credibility before monetization">
              The standard has to earn trust before it earns revenue. We’d rather certify ten products
              nobody can dispute than a hundred nobody believes.
            </Pillar>
            <Pillar n={2} title="Binary verdicts, published in full">
              Pass or fail — no partial credit, no conditional passes. And every decision is published
              with its reasoning, so anyone can check our work and hold us to it.
            </Pillar>
            <Pillar n={3} title="Independent by construction">
              We lean on independent labs for the chemistry and physics, and add the sourcing and
              transparency review labs don’t do. Refusal to disclose is a fail, not a neutral unknown.
            </Pillar>
          </div>
        </div>
      </section>

      {/* Why equipment first */}
      <section className="hairline">
        <div className="mx-auto grid max-w-content gap-10 px-6 md:px-8 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="eyebrow">Where we start</div>
            <h2 className="mt-3 font-display text-[1.9rem] leading-tight text-bone">
              Equipment is the flagship. Nutrition comes second.
            </h2>
            <p className="mt-5 text-[1.02rem] leading-relaxed text-mute">
              We’re launching with saunas, cold plunges, and recovery tech precisely because no
              independent standard exists there to compete with. It’s the category where a credible
              mark is worth the most and where the vacuum is most obvious. Nutrition already has
              independent lab scorers to lean on; durable wellness goods have nobody.
            </p>
          </Reveal>
          <Reveal delay={120} className="flex flex-col justify-center gap-4">
            <Link
              to="/standards/equipment"
              className="group flex items-center justify-between rounded-2xl border border-line bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div>
                <div className="text-xs uppercase tracking-micro text-faint">Flagship</div>
                <div className="mt-1 font-display text-lg text-bone">The Equipment standard</div>
              </div>
              <span className="text-accent-2 transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/standards/nutrition"
              className="group flex items-center justify-between rounded-2xl border border-line bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div>
                <div className="text-xs uppercase tracking-micro text-faint">Secondary</div>
                <div className="mt-1 font-display text-lg text-bone">The Nutrition standard</div>
              </div>
              <span className="text-accent-2 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
