/* 校验注册 */
import ElementUI from 'element-ui';
import ElFormItemMixins from './mixins';

const install = function (Vue, options) {
  // 检查是否安装Element，插件是作用于Form-Item组件
  const ElFormItemComponent = Vue.extend(ElementUI.FormItem);
  if (!ElFormItemComponent) throw Error('please install element first, https://element.eleme.cn/#/');

  // 混入插件的mixins选项
  ElFormItemComponent.mixin(ElFormItemMixins(options));
};

export default {
  install,
};
