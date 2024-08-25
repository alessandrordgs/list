import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Unfonts from 'unplugin-fonts/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  Unfonts({
    google: {
      preconnect: false,
      injectTo: 'head-prepend',
      // text: 'ViteAwsom',
      display: 'swap',

      families: [{
        name: 'Nunito',
        styles: 'wght@200..1000',
        defer: true
      }]
    }
  })

  ],
})
