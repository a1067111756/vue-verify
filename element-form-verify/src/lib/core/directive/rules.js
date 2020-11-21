/* 指令校验规则 */
export default [
  {
    name: 'regex',
    callback: {
      update: (el, binding) => {
        // 正则规则
        const regex = binding.value;
        // input目标
        const target = el.getElementsByTagName('input')[0];
        // 监听输入事件 - 存在bug， oninput在中文输入法下会导致输入多出生效导致maxlength失效
        target.oninput = function () {
          this.value = this.value.replace(regex, '');
        };
      },
    },
  },
  {
    name: 'length',
    callback: {
      update: (el, binding) => {
        // 正则规则
        const maxlength = binding.value;
        // input目标
        const target = el.getElementsByTagName('input')[0];
        // 监听输入事件
        target.oninput = function () {
          this.value = this.value.splice(0, maxlength);
        };
      },
    },
  },
  {
    name: 'number',
    callback: {
      bind: (el, binding) => {
        // 指令参数
        const { arg, value } = binding;

        // input目标
        const target = el.getElementsByTagName('input')[0];

        // 监听失焦事件
        target.addEventListener('blur', function () {
          // 参数指令相关的策略
          const argStrategy = {
            // 最大精确度
            precision(content, precision) {
              precision = parseFloat(precision);
              if (isNaN(precision)) {
                console.warn(`v-number:precision指令参数只能是string | number, 当前参数类型：${typeof precision}`);
                return content;
              }
              return parseFloat(content.toFixed(precision));
            },
            // 最大值
            max(content, max) {
              max = parseFloat(max);
              if (isNaN(max)) {
                console.warn(`v-number:max指令参数只能是string | number, 当前参数类型：${typeof max}`);
                return content;
              }
              return content > max ? max : content;
            },
            // 最小值
            min(content, min) {
              min = parseFloat(min);
              if (isNaN(min)) {
                console.warn(`v-number:min指令参数只能是string | number, 当前参数类型：${typeof min}`);
                return content;
              }
              return content < min ? min : content;
            },
          };

          // 内容过滤
          let content = parseFloat(this.value.trim());
          if (content === '' || isNaN(content)) {
            console.warn(`v-number指令参数只能是数字型string和number, 当前内容：${this.value}`);
            this.value = null;
            return;
          }

          // 指令策略过滤
          if (Object.prototype.hasOwnProperty.call(argStrategy, arg)) {
            content = argStrategy[arg](content, value);
          }

          // 处理完成重新赋值输入框
          this.value = content;
          // 触发vue的双向绑定
          target.dispatchEvent(new Event('change'));
          target.dispatchEvent(new Event('input'));
        });
      },
    },
  },
  {
    name: 'precision',
    callback: {
      bind: (el, binding) => {
        // 指令参数
        const { value } = binding;

        // input目标
        const target = el.getElementsByTagName('input')[0];

        // 监听失焦事件
        target.addEventListener('blur', function () {
          const content = parseFloat(this.value.trim());

          const precision = parseFloat(value);
          if (isNaN(precision)) {
            console.warn(`v-precision指令参数只能是string | number, 当前参数内容：${value}`);
            return this.value = content;
          }

          // 处理完成重新赋值输入框
          this.value = parseFloat(content.toFixed(precision));
          // 触发vue的双向绑定
          target.dispatchEvent(new Event('change'));
          target.dispatchEvent(new Event('input'));
        });
      },
    },
  },
  {
    name: 'max',
    callback: {
      bind: (el, binding) => {
        // 指令参数
        const { value } = binding;

        // input目标
        const target = el.getElementsByTagName('input')[0];

        // 监听失焦事件
        target.addEventListener('blur', function () {
          const content = parseFloat(this.value.trim());

          const max = parseFloat(value);
          if (isNaN(max)) {
            console.warn(`v-max指令参数只能是string | number, 当前参数内容：${value}`);
            return this.value = content;
          }

          // 处理完成重新赋值输入框
          this.value = content > max ? max : content;
          // 触发vue的双向绑定
          target.dispatchEvent(new Event('change'));
          target.dispatchEvent(new Event('input'));
        });
      },
    },
  },
  {
    name: 'min',
    callback: {
      bind: (el, binding) => {
        // 指令参数
        const { value } = binding;

        // input目标
        const target = el.getElementsByTagName('input')[0];

        // 监听失焦事件
        target.addEventListener('blur', function () {
          const content = parseFloat(this.value.trim());
          const min = parseFloat(value);
          if (isNaN(min)) {
            console.warn(`v-max指令参数只能是string | number, 当前参数内容：${value}`);
            return this.value = content;
          }

          // 处理完成重新赋值输入框
          this.value = content < min ? min : content;
          // 触发vue的双向绑定
          target.dispatchEvent(new Event('change'));
          target.dispatchEvent(new Event('input'));
        });
      },
    },
  },
];
