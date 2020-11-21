import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import VerifyPlugin from './verify'

Vue.use(Antd)
Vue.use(VerifyPlugin)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
