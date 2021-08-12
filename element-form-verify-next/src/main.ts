import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import ElementFormVerify from './lib/index'

createApp(App)
    .use(ElementPlus)
    .use(ElementFormVerify)
    .mount('#app')
