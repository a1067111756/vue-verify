import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import ElementFormVerify from '../../element-form-verify/dist/element-form-verify.common'

Vue.use(Element)
Vue.use(ElementFormVerify)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
