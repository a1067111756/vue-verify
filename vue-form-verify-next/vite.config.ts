import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

export default defineConfig({
  plugins: [
      vue()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/lib/index.js'),
      name: 'ElementFormVerify',
      formats: ['es', 'umd', 'cjs']
    },
    rollupOptions: {
      external: ['vue', 'element-ui'],
      output: {
        globals: {
          'vue': 'Vue',
          'element-plus': 'ElementPlus'
        }
      }
    }
  }
})
