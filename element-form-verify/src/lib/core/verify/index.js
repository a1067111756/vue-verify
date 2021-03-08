/* 校验注册 */
import ElementUI from 'element-ui';
import ElFormItemMixins from './mixins';

const install = function (Vue, options) {
  // 注入组件 - 验证作用，使用于form-item标签
  const ElFormItemComponent = Vue.extend(ElementUI.FormItem);
  if (!ElFormItemComponent) throw Error('please install element first, https://element.eleme.cn/#/');
  ElFormItemComponent.mixin(ElFormItemMixins(options));
};

export default {
  install,
};
