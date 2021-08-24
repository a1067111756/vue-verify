import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import typescript from 'rollup-plugin-typescript2'
const path = require('path')

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  plugins: [
      vue(),
      typescript()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/lib/index.ts'),
      name: 'ElementFormVerifyNext',
      formats: ['es', 'umd', 'cjs']
    },
    rollupOptions: {
      external: ['vue', 'element-plus'],
      output: {
        globals: {
          'vue': 'Vue',
          'element-plus': 'ElementPlus'
        }
      }
    }
  }
})
