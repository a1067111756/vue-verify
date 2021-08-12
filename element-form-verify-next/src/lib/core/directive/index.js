/* 指令注册 */
import rules from './rules';

function install (Vue) {
  rules.map((rule) => {
    Vue.directive(rule.name, rule.callback);
  });

  return undefined
}

export default {
  install,
};
