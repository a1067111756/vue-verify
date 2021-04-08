/* 指令校验规则 */
export default [
  {
    name: 'regex',
    callback: {
      update: (el, binding) => {
        // 参数检查
        const regex = binding.value
        if (Object.prototype.toString.call(regex) !== '[object RegExp]') {
          console.warn(`v-regex指令参数只支持字面量正则，当前绑定参数：${binding.value}，绑定无效`)
          return
        }

        // input目标
        const target = el.getElementsByTagName('input')[0]
        
        // 处理中文输入法
        let inputLock = false
        target.addEventListener('compositionstart', function () {
          inputLock = true
        })
        target.addEventListener('compositionend', function () {
          inputLock = false
          this.value = this.value.replace(regex, '')
        })

        // 正则过滤输入
        target.addEventListener('input', function () {
          if (inputLock) return
          this.value = this.value.replace(regex, '')
        })

        // 触发vue的双向绑定
        target.addEventListener('blur', function () {
          target.dispatchEvent(new Event('change'))
          target.dispatchEvent(new Event('input'))
        })        
      }
    }
  },
  {
    name: 'length',
    callback: {
      update: (el, binding) => {
        // 参数检查
        const maxlength = parseInt(binding.value)
        if (isNaN(maxlength)) {
          console.warn(`v-length指令参数只能是正整数，当前绑定参数：${binding.value}，绑定无效`)
          return
        }
        
        // input目标
        const target = el.getElementsByTagName('input')[0]

        // 处理中文输入法
        let inputLock = false
        target.addEventListener('compositionstart', function () {
          inputLock = true
        })
        target.addEventListener('compositionend', function () {
          inputLock = false
          if (this.value.length > maxlength) {
            this.value = this.value.slice(0, maxlength)
          }
        })

        // 监听输入事件
        target.oninput = function () {
          if (inputLock || this.value.length <= maxlength) return
          this.value = this.value.slice(0, maxlength)
        }

        // 触发vue的双向绑定
        target.addEventListener('blur', function () {
          target.dispatchEvent(new Event('change'))
          target.dispatchEvent(new Event('input'))
        })         
      }
    }
  },
  {
    name: 'precision',
    callback: {
      bind: (el, binding) => {
        // 参数检查
        const precision = parseInt(binding.value)
        if (isNaN(precision)) {
          console.warn(`v-precision指令参数只能是正整数，当前绑定参数：${binding.value}，绑定无效`)
          return
        }

        // input目标
        const target = el.getElementsByTagName('input')[0]

        // 监听失焦事件
        target.addEventListener('blur', function () {
          const value = parseFloat(this.value.trim())
          
          // 输入内容进行检查
          if (isNaN(value)) {
            console.warn(`v-precision指令只能检测数字类型string | number, 当前参数内容：${value}，请对输入内容进行限制`)
            return
          }

          // 处理完成重新赋值输入框
          this.value = parseFloat(value.toFixed(precision))
          target.dispatchEvent(new Event('change'))
          target.dispatchEvent(new Event('input'))
        })
      },
    },
  },
  {
    name: 'max',
    callback: {
      bind: (el, binding) => {
        // 参数检查
        const max = parseInt(binding.value)
        if (isNaN(max)) {
          console.warn(`v-max指令参数只能是正整数，当前绑定参数：${binding.value}，绑定无效`)
          return
        }

        // input目标
        const target = el.getElementsByTagName('input')[0]

        // 监听失焦事件
        target.addEventListener('blur', function () {
          const value = parseFloat(this.value.trim())

          // 输入内容进行检查
          if (isNaN(value)) {
            console.warn(`v-max指令只能检测数字类型string | number, 当前参数内容：${value}，请对输入内容进行限制`)
            return 
          }

          if (value > max) {
            this.value = max
            target.dispatchEvent(new Event('change'))
            target.dispatchEvent(new Event('input'))            
          }          
        })
      }
    }
  },
  {
    name: 'min',
    callback: {
      bind: (el, binding) => {
        // 参数检查
        const min = parseInt(binding.value)
        if (isNaN(min)) {
          console.warn(`v-min指令参数只能是正整数，当前绑定参数：${binding.value}，绑定无效`)
          return
        }

        // input目标
        const target = el.getElementsByTagName('input')[0]

        // 监听失焦事件
        target.addEventListener('blur', function () {
          const value = parseFloat(this.value.trim())

          // 输入内容进行检查
          if (isNaN(value)) {
            console.warn(`v-min指令只能检测数字类型string | number, 当前参数内容：${value}，请对输入内容进行限制`)
            return 
          }

          if (value < min) {
            this.value = min
            target.dispatchEvent(new Event('change'))
            target.dispatchEvent(new Event('input'))            
          }          
        })
      }
    }
  },
  {
    name: 'number',
    callback: {
      bind: (el, binding) => {
        // 指令参数
        const { arg, value } = binding

        // input目标
        const target = el.getElementsByTagName('input')[0]

        // 监听失焦事件
        target.addEventListener('blur', function () {
          // 参数指令相关的策略
          const argStrategy = {
            // 最大精确度
            precision(content, precision) {
              // 参数检查
              precision = parseFloat(precision)
              if (isNaN(precision)) {
                console.warn(`v-number:precision指令参数只能是正整数，当前绑定参数：${binding.value}，绑定无效`)
                return content
              }
              return parseFloat(content.toFixed(precision))
            },
            // 最大值
            max(content, max) {
              max = parseFloat(max)
              if (isNaN(max)) {
                console.warn(`v-number:max指令参数只能是正整数，当前绑定参数：${binding.value}，绑定无效`)
                return content
              }
              return content > max ? max : content
            },
            // 最小值
            min(content, min) {
              min = parseFloat(min)
              if (isNaN(min)) {
                console.warn(`v-number:min指令参数只能是正整数，当前绑定参数：${binding.value}，绑定无效`)
                return content
              }
              return content < min ? min : content
            },
          }

          // 内容过滤
          let content = parseFloat(this.value.trim())
          if (content === '' || isNaN(content)) {
            console.warn(`v-number指令只能检测数字类型string | number, 当前内容：${this.value}`)
            this.value = null
            target.dispatchEvent(new Event('change'))
            target.dispatchEvent(new Event('input'))            
            return
          }

          // 指令策略过滤
          if (Object.prototype.hasOwnProperty.call(argStrategy, arg)) {
            content = argStrategy[arg](content, value)
          }

          // 处理完成重新赋值输入框
          this.value = content
          // 触发vue的双向绑定
          target.dispatchEvent(new Event('change'))
          target.dispatchEvent(new Event('input'))
        })
      }
    }
  }
]
