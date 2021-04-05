const path = require('path')
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import vuePlugin from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import commonjs from '@rollup/plugin-commonjs'
import requireContext from 'rollup-plugin-require-context';
import { nodeResolve } from '@rollup/plugin-node-resolve'

module.exports = {
  input: path.resolve(__dirname, './src/lib/index.js'), // 入口文件
  output: [
    { // 打包umd格式文件
      file: path.resolve(__dirname, './dist/bundle.umd.js'), // 输出路劲
      format: 'umd', // umd - 统一兼容模式 cjs - commonJs模式 ejs - es6模式
      name: 'ElementFormVerify', // 对外暴露的顶级变量
      sourcemap: true, // 开启sorcemap
      globals: {  // 全局变量
        'vue': 'Vue',
        'element-ui': 'ElementUI'
      }    
    },
    { // 打包es格式文件
      file: path.resolve(__dirname, './dist/bundle.es.js'), // 输出路劲
      format: 'es', // umd - 统一兼容模式 cjs - commonJs模式 ejs - es6模式
      name: 'ElementFormVerify', // 对外暴露的顶级变量
      sourcemap: true, // 开启sorcemap 
      globals: {  // 全局变量
        'vue': 'Vue',
        'element-ui': 'ElementUI'
      }      
    },
    { // 打包es格式文件
      file: path.resolve(__dirname, './dist/bundle.common.js'), // 输出路劲
      format: 'cjs', // umd - 统一兼容模式 cjs - commonJs模式 es - es6模式
      name: 'ElementFormVerify', // 对外暴露的顶级变量
      sourcemap: true, // 开启sorcemap 
      globals: {  // 全局变量
        'vue': 'Vue',
        'element-ui': 'ElementUI'
      }      
    }    
  ],
  // 排除打包的资源
  external: ['vue', 'element-ui'],
  // 插件
  plugins: [
    commonjs(),
    nodeResolve(), 
    babel(),
    json(),
    vuePlugin(),
    postcss(),
    requireContext()
  ]
}