import Verify from './core/verify';
// import Directive from './core/directive';

const install = function (app, options) {
  // // 注入指令校验
  // Directive.install(app, options);
  //
  // // 注入表单校验
  Verify.install(app, options || {});
};

export default install;
