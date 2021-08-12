import Verify from './core/verify/index';
// import Directive from './core/directive';
import type { App } from 'vue';

const install = function (app: App, options: any[]) {
  // // 注入指令校验
  // Directive.install(app, options);
  //

  // 注入表单校验
  Verify.install(app, options || {});
};

export default install;
