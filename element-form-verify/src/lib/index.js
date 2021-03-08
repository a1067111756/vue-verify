import Verify from './core/verify';
import Directive from './core/directive';

const install = function (Vue, options) {
  // 注入指令校验
  Directive.install(Vue, options);

  // 注入表单校验
  Verify.install(Vue, {
    alias: '全局错误提示', // 校验出错时的默认提示
    customRules: { // 自定义规则
      phone: (phone, { canBeEmpty }) => ({
        trigger: 'blur',
        validator: (rule, value, callback) => {
          if (canBeEmpty && !value) return callback()
          
          if (value.toString().length !== 11) {
            return callback(new Error('啦啦啦手机号应该为11位数字'))
          }
          if (!__isNumber(value)) {
            return callback(new Error('啦啦手机号应该为11位数字'))
          }
          if (!/^1[3-9]\d{9}$/.test(value)) {
            return callback(new Error('啦请输入正确的手机号'))
          }
          return callback()
        }        
      }) 
    }, 
  });
};

export default install;
