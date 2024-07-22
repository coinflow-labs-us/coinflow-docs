import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dotenv from 'dotenv'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

dotenv.config()

export default defineConfig({
  plugins: [vue(), vueJsx(), nodePolyfills()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  }
})
