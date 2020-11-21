// 正则验证 - 当前只支持字面量正则
export const regexp = (regexp) => ({
  trigger: 'blur',
  validator: (rule, value, callback) => (regexp.test(value)
    ? callback()
    : callback(new Error('当前数不合法'))),
})

// 手机号
export const phone = (val, canBeEmpty) => ({
  trigger: 'blur',
  validator: (rule, value, callback) => {
    if (canBeEmpty && !value) return callback()
    
    if (value.toString().length !== 11) {
      return callback(new Error('手机号应该为11位数字'))
    }
    if (!__isNumber(value)) {
      return callback(new Error('手机号应该为11位数字'))
    }
    if (!/^1[0-9]{10}$/.test(value)) {
      return callback(new Error('请输入正确的手机号'))
    }
    return callback()
  }
})

// 邮箱
export const email = () => ({
  type: 'email',
  trigger: 'blur',
  message: '请输入正确的邮箱号',
})

// 身份证
export const idCard = () => ({
  trigger: 'blur',
  validator: (rule, value, callback) => {
    if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
      return callback(new Error('请输入正确的身份证号'))
    }
    return callback()
  }
})

// url链接
export const url = () => ({
  type: 'url',
  trigger: 'blur',
  message: '请输入正确的url',
})

// 密码
export const password = (val, canBeEmpty) => ({
  trigger: 'blur',
  validator: (rule, value, callback) => {
    if (canBeEmpty && !value) return callback()
    if (!/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,20}$/.test(value)) {
      return callback(new Error('密码长度为6-20个字符，必须包含字母和数字!'))
    }
    return callback()
  }
})

const __isNumber = (value) => /^-?\d*\.?\d+$/.test(value)