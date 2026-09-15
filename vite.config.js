import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build` inlines all JS + CSS into a single dist/index.html so it can
// be shared as one openable file (double-click, no server needed).
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
})
