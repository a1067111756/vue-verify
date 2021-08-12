/* 校验注册 */
import type { App } from 'vue';
import ElFormItemVerify from './ElFormItemVerify.vue';

const install: any = function (app: App, options: any) {
  app.provide('elFormItemVerifyGlobalOption', options)
  app.component(ElFormItemVerify.name, ElFormItemVerify)
};

export default {
  install,
};
