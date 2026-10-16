import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/QWE_HERO/',
  server: {
    // The repo lives on sshfs, where inotify misses events (new folders in particular).
    watch: { usePolling: true, interval: 300 },
  },
  optimizeDeps: {
    // Pre-bundle lazily imported deps up front: discovering them at runtime
    // re-optimizes mid-session and leaves the open tab with two React copies.
    include: [
      'react-markdown',
      'remark-gfm',
      'shiki/core',
      'shiki/engine/javascript',
      'shiki/themes/github-light.mjs',
      'shiki/themes/github-dark.mjs',
      ...['tsx', 'typescript', 'jsx', 'javascript', 'json', 'bash', 'css', 'html', 'python', 'sql', 'yaml', 'diff', 'markdown'].map(
        (lang) => `shiki/langs/${lang}.mjs`,
      ),
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
