# Security posture

Salus Life is currently a **static front-end site** (React + Vite) hosted on GitHub
Pages. There is **no backend, no database, no authentication, no API keys, no server
code, and no file uploads.** That fact determines which security measures are relevant.

## Done / applicable now

- **HTTPS** — enforced by GitHub Pages by default (github.io). ✅
- **No secrets in the repo** — scanned; there are no API keys, tokens, or credentials
  committed. Client-side static sites ship all their code to the browser, so nothing
  secret should ever live here anyway.
- **`.env*` and key files git-ignored** — so secrets can't be committed later.
- **Content-Security-Policy** (via `<meta>` in `index.html`) — scripts, styles, fonts,
  and data are restricted to known sources; inline/injected external scripts are blocked.
  This is the main defense-in-depth against XSS for a static site.
- **Referrer-Policy** — `strict-origin-when-cross-origin` to limit referrer leakage.
- **XSS** — React escapes all rendered content by default. The single
  `dangerouslySetInnerHTML` renders a trusted local SVG asset (the Salus mark), never
  user input.
- **Production build** — Vite strips dev/debug tooling; no source maps or debug mode in
  the published output.

## Not applicable until there is a backend

These are important, but they protect a **server / database / auth system that does not
exist yet.** They become necessary when real checkout, accounts, or an admin/API are
built (e.g. on Stripe/Shopify or a custom backend):

| Item | Why it's N/A now |
| --- | --- |
| Auth / user permissions / protect admin routes | No accounts, no admin, no server to authorize against |
| SQL-injection / DB rules | No database |
| CSRF protection / secure cookies | No server sessions; the app uses `localStorage`, not cookies |
| CORS settings | The app makes no cross-origin API calls |
| Rate limiting | No API/server endpoints to rate-limit |
| Secure file uploads | No uploads |
| Spend cap | No paid cloud/API usage (GitHub Pages is free) |
| Hide API keys / check env vars | No keys or env secrets exist yet |

## Notes / limits of GitHub Pages

GitHub Pages cannot set custom HTTP response headers, so header-only protections
(`X-Frame-Options`, `X-Content-Type-Options: nosniff`, HSTS, `Permissions-Policy`) can't
be applied here. If the site moves to **Vercel, Netlify, or Cloudflare Pages**, add those
via the host's headers config for full coverage. `frame-ancestors` is included in the CSP
but is only enforced when delivered as a header, not via `<meta>`.

## When you build the real store

Use a managed provider (Stripe / Shopify) for payments and accounts — they handle PCI
compliance, CSRF, secure cookies, and rate limiting for you. Keep all secret keys in the
host's environment variables (never in this repo), and revisit the "not applicable" table
above item by item.

## Stripe (payments in progress)

The `stripe` dependency and the `?success` / `?canceled` / `?session_id` handling in
`src/pages/Checkout.jsx` are the start of a Stripe Checkout flow. **The one rule that must
not be broken:**

- The **secret key (`sk_live_…` / `sk_test_…`) must NEVER appear in this repo or in any
  file under `src/`.** Everything in the frontend is shipped to the browser, so a secret
  key here is public to every visitor.
- The server-side **`stripe`** package (now in `dependencies`) must **not** be imported
  into client code. It belongs only in a backend / serverless function.
- **Correct architecture:** a serverless function (Vercel/Netlify) holds the secret key in
  an env var, creates the Checkout Session, and returns its URL. The frontend redirects to
  that URL and reads the return params. Client code may use `@stripe/stripe-js` with the
  **publishable key (`pk_…`)** only — that key is safe to expose.
- GitHub Pages cannot run backend code, so shipping real payments means adding that
  serverless endpoint (and then env vars + CORS + Stripe webhook signature verification
  become relevant).
