import Vue from 'vue'
import App from './App.vue'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import ElementFormVerify from '@/lib/index'

Vue.use(Element)
Vue.use(ElementFormVerify)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
