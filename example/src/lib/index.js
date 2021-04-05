import Verify from './core/verify';
import Directive from './core/directive';

const install = function (Vue, options) {
  // 注入指令校验
  Directive.install(Vue, options);

  // 注入表单校验
  Verify.install(Vue, options || {});
};

export default install;
