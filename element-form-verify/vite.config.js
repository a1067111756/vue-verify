import path from 'path'
import { defineConfig } from 'vite'
const { createVuePlugin } = require('vite-plugin-vue2')

export default defineConfig({
  plugins: [
    createVuePlugin()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
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
          'element-ui': 'ElementUI'
        }
      }
    }
  }
})
