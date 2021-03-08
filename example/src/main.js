import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// eslint-disable-next-line 
import ElementFormVerify from '../../element-form-verify/dist/element-form-verify.umd.min'

Vue.use(Element)
Vue.use(ElementFormVerify)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
