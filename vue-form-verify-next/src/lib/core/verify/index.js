/* 校验注册 */
import ElFormItemVerify from './ElFormItemVerify.vue';

const install = function (app, options) {
  app.provide('elFormItemVerifyGlobalOption', options)
  app.component(ElFormItemVerify.name, ElFormItemVerify)
};

export default {
  install,
};
