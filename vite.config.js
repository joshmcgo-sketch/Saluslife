import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// On GitHub Pages the site is served from /Saluslife/ (the repo name); locally
// and on Vercel it's served from the root. GITHUB_ACTIONS is set in the Pages
// build only.
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/Saluslife/' : '/',
  plugins: [react()],
})
