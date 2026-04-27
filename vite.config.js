import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'dsk-icon.png'],
      manifest: {
        name: 'Deep Sagar Karay Portfolio',
        short_name: 'DSK Portfolio',
        description: 'Cloud Architect & DevOps Engineer Portfolio',
        theme_color: '#141414',
        icons: [
          {
            src: 'dsk-icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'dsk-icon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons': ['lucide-react', 'react-icons'],
        },
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      }
    },
    reportCompressedSize: false
  },
  resolve: {
    alias: {
      '@': '/src',
    }
  },
  server: {
    // FIX: Removed aggressive 'Cache-Control: immutable' from dev server.
    // Previously this header was applied to ALL dev server responses including index.html,
    // which blocked HMR (hot module replacement) from working because browsers
    // cached the old JS bundles permanently.
    // Cache-Control for production build output is handled by Nginx (nginx.conf).
  }
})
