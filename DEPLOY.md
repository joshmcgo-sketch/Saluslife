# Deploying Salus Life

The frontend is a Vite + React app. Checkout is backed by one real serverless
function (`api/create-checkout-session.js`), which is why Vercel — not a
plain static host — is what's actually live in production; GitHub Pages
still mirrors the frontend but can't run that function (see below).

## Vercel (production)

1. Go to **vercel.com** and **Sign in with GitHub**.
2. **Add New… → Project**, then **Import** the `Saluslife` repo.
3. Vercel auto-detects Vite. Leave the defaults:
   - Build command: `npm run build`
   - Output directory: `dist`
4. **Settings → Environment Variables**: add `STRIPE_SECRET_KEY` (a Stripe
   secret key — `sk_test_...` for testing, `sk_live_...` once ready to take
   real payments). Required for checkout to work; never commit this key.
5. Click **Deploy**. In ~1 minute you get a live URL like `saluslife.vercel.app`.

Client-side routes (`/catalog`, `/product/...`) work because `vercel.json` rewrites
every path to `index.html`.

### Checkout backend
`api/create-checkout-session.js` reads the cart from the frontend, creates a
real Stripe Checkout Session server-side (the secret key never reaches the
browser), and redirects to it. It's deliberately minimal — no order database,
no webhook — Stripe's own success/cancel redirect is the only signal the
frontend acts on. See `scripts/` for standalone Stripe Connect scripts used
to set up and test a connected seller account.

### GitHub Pages mirror
The `.github/workflows/deploy.yml` Actions workflow also builds and deploys
the frontend to GitHub Pages. That copy has no backend, so its checkout form
automatically falls back to a simulated "order confirmed" screen instead of
a real Stripe redirect (see the `catch` block in `src/pages/Checkout.jsx`).
Vercel is the deployment with working real checkout.

### Automatic updates
Every push to the `main` branch triggers a new deploy automatically. Whoever is
looking at the live URL always sees the latest version — no downloading files.

### Custom domain
In the Vercel project: **Settings → Domains → Add**, enter your domain (e.g.
`saluslife.com`), and follow the DNS instructions.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to /dist
npm run preview  # serve the built /dist locally
```
