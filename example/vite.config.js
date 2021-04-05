import { defineConfig } from 'vite'
import path from 'path'
const { createVuePlugin } = require('vite-plugin-vue2')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin(/*options*/)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  }
})
