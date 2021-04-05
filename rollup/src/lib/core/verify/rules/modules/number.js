// 数字大于
export const gt = (val, { canBeEmpty }) => ({
  trigger: 'blur',
  validator: (rule, value, callback) => {
    if (Object.prototype.toString.call(val) !== '[object Number]') {
      console.error(`gt校验的参数只能是number类型，当前类型： ${ Object.prototype.toString.call(val) }`)
      return callback()
    }

    if (canBeEmpty && !value) return callback()    

    if (!__isNumber(value)) {
      return callback(new Error('请输入数字字符'))
    }

    if (value <= parseFloat(val)) {
      return callback(new Error(`输入内容应大于${val}`))
    }

    callback()
  }
})

// 数字大于等于
export const gte = (val, { canBeEmpty }) => ({
  trigger: 'blur',
  validator: (rule, value, callback) => {
    if (Object.prototype.toString.call(val) !== '[object Number]') {
      console.error(`gt校验的参数只能是number类型，当前类型： ${ Object.prototype.toString.call(val) }`)
      return callback()
    }

    if (canBeEmpty && !value) return callback()  

    if (!__isNumber(value)) {
      return callback(new Error('请输入数字字符'))
    }
    if (value < parseFloat(val)) {
      return callback(new Error(`输入内容应大于等于${val}`))
    }

    callback()
  }
})

// 数字小于
export const lt = (val, { canBeEmpty }) => ({
  trigger: 'blur',
  validator: (rule, value, callback) => {
    if (Object.prototype.toString.call(val) !== '[object Number]') {
      console.error(`gt校验的参数只能是number类型，当前类型： ${ Object.prototype.toString.call(val) }`)
      return callback()
    }

    if (canBeEmpty && !value) return callback()  

    if (!__isNumber(value)) {
      return callback(new Error('请输入数字字符'))
    }

    if (value >= parseFloat(val)) {
      return callback(new Error(`输入内容应小于${val}`))
    }

    callback()
  }
})

// 数字小于等于
export const lte = (val, { canBeEmpty }) => ({
  trigger: 'blur',
  validator: (rule, value, callback) => {
    if (Object.prototype.toString.call(val) !== '[object Number]') {
      console.error(`gt校验的参数只能是number类型，当前类型： ${ Object.prototype.toString.call(val) }`)
      return callback()
    }

    if (canBeEmpty && !value) return callback()  

    if (!__isNumber(value)) {
      return callback(new Error('请输入数字字符'))
    }
    if (value > parseFloat(val)) {
      return callback(new Error(`输入内容应小于等于${val}`))
    }

    callback()
  }
})

const __isNumber = (value) => /^-?\d*\.?\d+$/.test(value)

export default {
  gt,
  gte,
  lt,
  lte
}
