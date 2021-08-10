/* 校验注册 */
import { ElFormItem } from 'element-plus';
import ElFormItemMixins from './mixins';

const install = function (app, options) {
  // 检查是否安装Element，插件是作用于Form-Item组件
  // const ElFormItemComponent = app.component(ElFormItem.name, ElFormItem);
  // if (!ElFormItemComponent) throw Error('please install element first, https://element.eleme.cn/#/');
  //
  // // 混入插件的mixins选项
  // const mixins = ElFormItemMixins(options)
  // ElFormItemComponent.mixin(mixins)

  const ElFormItemComponent = app.component(ElFormItem.name, ElFormItem)
  ElFormItemComponent.mixin(ElFormItemMixins(options))
  // app.mixin(ElFormItemMixins(options))
};

export default {
  install,
};
