import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Scout App',
        short_name: 'Scout',
        description: 'Relatórios de scouting',
        lang: 'pt-BR',
        theme_color: '#1e1e1e',
        background_color: '#f4f4f2',
        display: 'standalone',
        icons: [
          { src: 'icone-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icone-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
})