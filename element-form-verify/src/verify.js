import Component from './component'
let ElFormItemComponent

const install = function (Vue) {
  // 添加指令
  // Vue.directive('v-length', {
  //   bind(el, binding, vnode, oldVnode) {
  //   }
  // })

  // Vue.directive('v-number', {
  //   bind(el, binding, vnode, oldVnode) {
  //   }
  // })

  // Vue.directive('v-int', {
  //   bind(el, binding, vnode, oldVnode) {
  //   }
  // })  

  // Vue.directive('v-float', {
  //   bind(el, binding, vnode, oldVnode) {
  //   }
  // })

  // Vue.directive('v-floatL', {
  //   bind(el, binding, vnode, oldVnode) {
  //   }
  // })


  // 注入组件
  ElFormItemComponent = Vue.component('AFormModelItem')
  if (!ElFormItemComponent) throw Error('please install ant-vue first, https://www.antdv.com/docs/vue/introduce-cn/')
  ElFormItemComponent.mixin(Component)
}

export default install