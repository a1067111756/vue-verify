/* 常用验证规则 */
const typeStrategy = {
  // 字符串是默认类型
  string: {
    message: '请输入字符串!',
    check: value => typeof value === 'string',
  },
  // 判断是否是number, 这里判断包括(正、负)整数&&(正、负)浮点数
  number: {
    message: '请输入整数或者小数!',
    check: value =>  /^\d*\.?\d+$/.test(value),
  },  
  // 判断是否是整数, 这里判断包括(正、负)整数
  int: {
    message: '请输入整数!',
    check: value =>  /^\d+$/.test(value),
  },  
  // 判断是否是小数, 这里判断包括(正、负)浮点数
  float: {
    message: '请输入小数!',
    check: value =>  /^\d*\.\d+$/.test(value)
  },
  // 判断是否是指定小数位小数
  // floatL: {
  //   message: '请输入小数!',
  //   check: ([value, len]) =>  {
  //     return /^\d*\.\d+$/.test(value)
  //   }
  // }
}

// 是否允许为空
const canBeEmpty = () => ({ 
  required: false,
  trigger: 'blur'
})

// 数据类型 - 默认是string
const type = (type) => ({
  required: true,
  trigger: 'blur',
  validator: (rule, value, callback) => {
    let strategy = typeStrategy[type]
    return strategy.check(value)
      ? callback()
      : callback(new Error(strategy.message))
  }
})

// 文本长度
const length = (len) => ({ 
  type: 'string',
  required: true,
  trigger: 'blur',
  min: parseInt(len),
  max: parseInt(len),
  message: `请输入${len}个字符内容`
})

// 最小文本长度
const minLen = (len) => ({ 
  type: 'string',
  required: true,
  trigger: 'blur',
  min: parseInt(len),
  message: `输入内容应大于${len}个字符`
})

// 最大文本长度
const maxLen = (len) => ({ 
  type: 'string',
  required: true,
  trigger: 'blur',
  min: parseInt(len),
  message: `输入内容应小于${len}个字符`
})

// 数字大于
const gt = (val) => ({ 
  required: true,
  trigger: 'blur',
  validator: (rule, value, callback) => {
    let strategy = typeStrategy['number']
    if (!strategy.check(value)) {
      return callback(new Error(strategy.message))
    }
    if (value <= parseFloat(val)) {
      return callback(new Error(`输入内容应大于${val}`))
    }    

    callback()
  }
})

// 数字大于等于
const gte = (val) => ({ 
  required: true,
  trigger: 'blur',
  validator: (rule, value, callback) => {
    let strategy = typeStrategy['number']
    if (!strategy.check(value)) {
      return callback(new Error(strategy.message))
    }
    if (value < parseFloat(val)) {
      return callback(new Error(`输入内容应大于等于${val}`))
    }    

    callback()
  }
})

// 数字小于
const lt = (val) => ({ 
  required: true,
  trigger: 'blur',
  validator: (rule, value, callback) => {
    let strategy = typeStrategy['number']
    if (!strategy.check(value)) {
      return callback(new Error(strategy.message))
    }
    if (value >= parseFloat(val)) {
      return callback(new Error(`输入内容应小于${val}`))
    }    

    callback()
  }
})

// 数字小于等于e
const lte = (val) => ({ 
  required: true,
  trigger: 'blur',
  validator: (rule, value, callback) => {
    let strategy = typeStrategy['number']
    if (!strategy.check(value)) {
      return callback(new Error(strategy.message))
    }
    if (value > parseFloat(val)) {
      return callback(new Error(`输入内容应小于等于${val}`))
    }    

    callback()
  }
})

// 手机号
const phone = () => ({ 
  required: true,
  trigger: 'blur',
  validator: (rule, value, callback) => {
    let strategy = typeStrategy['number']
    if (value.toString().length !== 11) {
      return callback(new Error('手机号应该为11位数字'))
    }    
    if (!strategy.check(value)) {
      return callback(new Error('手机号应该为11位数字'))
    }
    if (!/^1[0-9]{10}$/.test(value)) {
      return callback(new Error('请输入正确的手机号'))
    }    

    callback()
  }
})

// 邮箱
const email = () => ({
  type: 'email', 
  required: true,
  trigger: 'blur',
  message: '请输入正确的邮箱号'
})

// url链接
const url = () => ({
  type: 'url', 
  required: true,
  trigger: 'blur',
  message: '请输入正确的url'
})

// 时间格式

export default {
  gt,
  lt,
  gte,
  lte,
  url,
  type,
  length,
  minLen,
  maxLen,
  phone,
  email,
  canBeEmpty
}