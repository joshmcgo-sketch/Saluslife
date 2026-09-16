import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Production build for hosting (Vercel/Netlify): standard chunked output with
// hashed, cacheable assets and images served as separate files.
export default defineConfig({
  plugins: [react()],
})
