import Vue from 'vue';
import UiVerify from '@/lib/index';
import ElementUI from 'element-ui';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(UiVerify);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
