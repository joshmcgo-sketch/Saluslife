# Deploying Salus Life

The site is a static Vite + React app. Any static host works; Vercel is easiest.

## Vercel (recommended)

1. Go to **vercel.com** and **Sign in with GitHub**.
2. **Add New… → Project**, then **Import** the `Saluslife` repo.
3. Vercel auto-detects Vite. Leave the defaults:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**. In ~1 minute you get a live URL like `saluslife.vercel.app`.

Client-side routes (`/catalog`, `/product/...`) work because `vercel.json` rewrites
every path to `index.html`.

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
