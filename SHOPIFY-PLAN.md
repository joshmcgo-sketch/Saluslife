# Commerce plan — headless Shopify (reference, NOT built yet)

This captures the plan for turning Salus Life into a real store later, without
building/maintaining our own backend. Nothing here is implemented. Timing advice at the
bottom: this is a "once you're actually selling" phase, not a now thing.

## The idea in one line
Keep our custom React site exactly as it is; let **Shopify** be the commerce engine
behind it (products, cart, checkout, payments, accounts, orders, discounts, rewards).
This is called a **headless** setup.

## What stays the same
The whole custom site — design, Salus branding/logo, standards pages, mission, the
"anatomy of a pass" scroll, floating product marquee, and the GitHub → auto-deploy
pipeline. Only two things change under the hood: **where product data comes from** and
**what happens at checkout**.

## What Shopify handles (server + security)
In a headless setup Shopify is the server and takes on the heavy/risky parts:

- Payments + **PCI compliance** (we never touch card data)
- Customer accounts & passwords
- Order/customer data storage, backups
- Fraud detection, API rate limiting, HTTPS, the dangerous secret keys

Our site talks to Shopify through a **Storefront API token that is designed to be public**
(it can only read products and manage carts — not do admin damage), so nothing dangerous
sits in the frontend. Sensitive actions happen on Shopify's hosted checkout. **For a
normal store we may need no backend of our own at all.** Most of the security checklist
becomes Shopify's job.

## Managing products (easier than today)
- Manage products in the **Shopify admin dashboard** (point-and-click: name, price,
  photos, inventory, variants, discounts) — no code.
- The site pulls products live, so dashboard changes appear on the site **automatically —
  no code edit / push / redeploy.** (Today, product changes require editing `products.js`
  and redeploying — Shopify removes that.)
- **Certification data** (Salus score, rubric findings, "why it passed", lab profile)
  lives in Shopify **metafields** — custom fields on each product, editable in the
  dashboard. So one product holds both its commerce info and its Salus verdict.
- `SALUS20` and other coupons become real **Shopify discounts**; **rewards/points** come
  from a loyalty app (e.g. Smile.io) — configured in a dashboard, little/no custom code.

## Migration phases
- **Phase 0 — Set up Shopify (you) ~1–2 hrs + business setup.** Shopify account (~$39/mo),
  connect Shopify Payments (needs business entity + bank + tax info). Everything waits on
  this.
- **Phase 1 — Load catalog (you; I define metafields) ~half day.** Enter products; I set
  up the certification metafields.
- **Phase 2 — Connect site to Shopify (me) ~2–4 days.** Storefront API client; swap
  hardcoded `products.js` for live Shopify data incl. metafields. Pages render as they do
  now.
- **Phase 3 — Real cart + checkout (me) ~2–3 days.** Cart syncs to Shopify; checkout hands
  off to Shopify's secure hosted checkout.
- **Phase 4 — Accounts & order history (mostly Shopify) ~1–2 days.** Turn on Shopify
  customer accounts; link from the site.
- **Phase 5 — Rewards/points (app) ~few hrs.** Install + configure a loyalty app.
- **Phase 6 — Test & go live ~1 day.** Same GitHub deploy flow.

**Effort:** ~1–2 weeks of focused dev for a full integration (a lighter "Buy Button"
version is ~1 day to test selling one product). **Ongoing cost:** ~$39/mo Shopify +
~2.9% + 30¢/order + loyalty app (~$50/mo at scale). No servers for us to run or secure.

---

## Selling other brands' products (dropshipping / third-party fulfillment)
Model: the customer buys on our site, **we** take payment, and the order is routed to the
brand/supplier, who ships directly to the customer. We hold no inventory. Fits Salus Life
well — a curated store of *certified* products the brands fulfill.

### Cleanest case — the brand is also on Shopify
Use **Shopify Collective** (native feature). List their product on our site; an order
auto-sends to the supplier's Shopify, they ship, tracking flows back, money settles
(we keep our margin, they get wholesale). This is the "order automatically triggers to the
supplier" experience — but it requires **both stores on Shopify**.

### If the brand is NOT on Shopify (best → worst automation)
- **Dropshipping app** (DSers/Spocket/Modalyst) — only for suppliers in their networks.
- **Custom API/EDI integration** — connect to the supplier's ordering system so orders push
  automatically; per-supplier dev work; requires the supplier to support it.
- **Automatic order email** — Shopify emails the supplier the order instantly; works with
  any supplier who agrees; semi-automated.
- **Manual forwarding** — fine to start, doesn't scale.

There is **no universal "route to any brand" button** — each supplier connects via one of
the above.

### The real work is the business side, not the tech
- A **wholesale/dropship agreement** per brand: pricing, who owns returns + customer
  service, liability, and whether they'll accept automated orders.
- **Margins:** buy wholesale / sell retail, or an agreed commission.
- **One integration per supplier.**

## Independence caveat (recurring)
Earning a **margin on selling** products we also **certify** reintroduces the neutrality
question. Answerable (e.g. certification decided independently of any commercial deal and
published in full), but dropshipping ties revenue directly to sales of things we rate — so
have the governance story straight before doing it.

## Timing
Right destination, but only worth it once you've decided you're **actually selling** and
have the **fulfillment + business side + brand relationships** ready. Until then it's
premature. This doc exists so the path is known (~1–2 weeks of dev, a well-worn pattern —
not a scary custom build) whenever you pull the trigger.
