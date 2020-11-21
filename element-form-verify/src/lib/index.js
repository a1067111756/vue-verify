import Verify from './core/verify';
import Directive from './core/directive';

const install = function (Vue) {
  // 注入指令校验
  Directive.install(Vue);

  // 注入表单校验
  Verify.install(Vue);
};

export default install;
